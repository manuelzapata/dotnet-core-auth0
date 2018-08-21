using Microsoft.AspNetCore.Authorization;
using System;
using System.Threading.Tasks;

namespace CoreAuth0.Auth
{
    public class ScopeHandler : AuthorizationHandler<ScopeRequirement>
    {

        /// <summary>
        /// Validates whether the user has the specified claim.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="requirement"></param>
        /// <returns></returns>
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement)
        {
            const string ScopeClaimName = "scope";

            //Return if the user does not have the scope claim.
            if (!context.User.HasClaim(claim => claim.Type == ScopeClaimName && claim.Issuer == requirement.Issuer))
            {
                return Task.CompletedTask;
            }

            var scopes = context.User.FindFirst(claim => claim.Type == ScopeClaimName && claim.Issuer == requirement.Issuer).Value.Split(' ');

            //Check if the scope array contains the requires scope
            if (Array.IndexOf<string>(scopes, requirement.Scope) >= 0)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }

    }
}
