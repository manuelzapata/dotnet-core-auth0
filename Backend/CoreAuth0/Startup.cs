using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreAuth0.Auth;
using CoreAuth0.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CoreAuth0
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());

            //Enable authentication middleware
            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseMvc();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            //Register repositories
            services.AddScoped<ICommunityRepository, MockCommunityRepository>();

            //Setup authorization and authentication
            ConfigureAuth(services);
        }

        private void ConfigureAuth(IServiceCollection services) {

            string domain = Configuration["Authentication:Domain"];
            domain = $"https://{domain}/";

            //Authentication service
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = domain;
                options.Audience = Configuration["Authentication:Audience"];
            });

            //Configure scopes as policies
            services.AddAuthorization(options =>
            {
                var authorizationConfiguration = new AuthConfiguration();
                Configuration.GetSection("Authorization").Bind(authorizationConfiguration);

                if (authorizationConfiguration.Scopes != null)
                {

                    foreach (string scope in authorizationConfiguration.Scopes)
                    {
                        options.AddPolicy(scope, policy => policy.Requirements.Add(new ScopeRequirement(scope, domain)));
                    }

                }

            });

            //Register the scope authorization handler
            services.AddSingleton<IAuthorizationHandler, ScopeHandler>();

        }

    }
}
