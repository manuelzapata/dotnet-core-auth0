const config = {
    auth: {
        domain: 'YOUR-AUTH0-DOMAIN.auth0.com',
        clientId: 'YOUR-AUTH0-APPLICATION-CLIENT-ID',
        //This URL must be registered in Auth0, in the application settings
        callbackUrl: 'http://localhost:3000/auth-callback',
        apiAudience: 'https://YOUR-AUDIENCE-API-IDENTIFIER'
    },
    apiUrl: 'YOUR-BACKEND-BASE-URL'
};

export default config;