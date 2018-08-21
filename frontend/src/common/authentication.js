import { WebAuth } from 'auth0-js';
import config from './config';

const ACCESS_TOKEN = 'access_token';
const ID_TOKEN = 'id_token';
const EXPIRES_AT = 'expires_at';
const SCOPES = 'scopes';
const IDENTITY_PROVIDER_ID = 'identity_provider_id';
const IDENTITY_EMAIL = 'identity_email';
const REDIRECT_URI = 'redirect_uri';

export class AuthenticationService {

    constructor() {
        const authConfig = config.auth;

        const redirectURI = config.auth.callbackUrl;

        this.authProxy = new WebAuth({
            domain: authConfig.domain,
            clientID: authConfig.clientId,
            redirectUri: redirectURI,
            audience: authConfig.apiAudience,
            responseType: 'token id_token',
            scope: 'openid profile email'
        });
    }

    login() {
        this.authProxy.authorize();
    }

    handleAuthentication() {

        const promise = new Promise((resolve, reject) => {

            this.authProxy.parseHash((error, authResult) => {
                if(authResult && authResult.accessToken && authResult.idToken) {
                    this.setSession(authResult);
                    resolve();
                } else if(error) {
                    console.log('Error parsing authentication response', error);
                    reject(error);
                }
            });

        });

        return promise;
    }

    handleAuthenticationError = (error) => {
        console.log('Error authenticating', error);
    }

    setSession(authResult) {
        //Set the time that the access token will expire at.
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem(ACCESS_TOKEN, authResult.accessToken);
        localStorage.setItem(ID_TOKEN, authResult.idToken);
        localStorage.setItem(EXPIRES_AT, expiresAt);
        localStorage.setItem(SCOPES, authResult.scope);
        localStorage.setItem(IDENTITY_PROVIDER_ID, authResult.idTokenPayload.sub);
        localStorage.setItem(IDENTITY_EMAIL, authResult.idTokenPayload.email);
    }

    logout() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(ID_TOKEN);
        localStorage.removeItem(EXPIRES_AT);
        localStorage.removeItem(SCOPES);
        localStorage.removeItem(IDENTITY_PROVIDER_ID);
        localStorage.removeItem(IDENTITY_EMAIL);
    }

    isAuthenticated() {
        return authenticationHelper.isAuthenticated();
    }

    getRedirectURI() {
        return localStorage.getItem(REDIRECT_URI);
    }

    saveRedirectURI(){

        let uri = window.location.pathname;
        if(!uri || uri === '/') return;

        const queryString = window.location.search;
        if(queryString) {
            uri += queryString;
        }

        localStorage.setItem(REDIRECT_URI, uri);
    }

    removeRedirectURI() {
        localStorage.removeItem(REDIRECT_URI);
    }

    getAccessToken() {
        return authenticationHelper.getAccessToken();
    }
}

export const authenticationHelper = {
    getAccessToken() {
        const result = localStorage.getItem(ACCESS_TOKEN);
        return result;
    },

    getIdToken() {
        const result = localStorage.getItem(ID_TOKEN);
        return result;
    },

    getIdentityProviderId() {
        const result = localStorage.getItem(IDENTITY_PROVIDER_ID);
        return result;
    },

    getIdentityEmail() {
        const result = localStorage.getItem(IDENTITY_EMAIL);
        return result;
    },

    isAuthenticated() {
        const expiresAt = JSON.parse(localStorage.getItem(EXPIRES_AT));
        return new Date().getTime() < expiresAt;
    }

};