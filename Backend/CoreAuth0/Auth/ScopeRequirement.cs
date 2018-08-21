﻿using Microsoft.AspNetCore.Authorization;
using System;

namespace CoreAuth0.Auth
{
    public class ScopeRequirement: IAuthorizationRequirement
    {

        public string Issuer { get; }
        public string Scope { get; }

        public ScopeRequirement(string scope, string issuer)
        {
            Scope = scope ?? throw new ArgumentNullException(nameof(scope));
            Issuer = issuer ?? throw new ArgumentNullException(nameof(issuer));
        }

    }
}
