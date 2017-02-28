'use strict';

class UserData {
    constructor(requester) {
        this.requester = requester;
    }

    register(data) {
        return this.requester.postWithFile(REQUEST_URL + '/api/auth/register', data);
    }

    login(data) {
        return this.requester.postJSON(REQUEST_URL + '/api/auth/login', data);
    }

    updateSettings(data) {
        return this.requester.putWithFile(REQUEST_URL + '/api/users/updateSettings', data);
    }
}