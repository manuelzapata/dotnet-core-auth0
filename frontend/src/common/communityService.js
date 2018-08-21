import config from './config';

export default class CommunityService {

    constructor(authService) {
        this.authService = authService;
    }

    getAll() {

        const url = `${config.apiUrl}/communities`;
        const options = {
            headers: {
                Authorization: `Bearer ${this.authService.getAccessToken()}`
            }
        };

        const promise = fetch(url, options).then(response => response.json());
        return promise;

    }

};