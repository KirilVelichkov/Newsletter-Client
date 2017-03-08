'use strict';

class UserData {
    constructor(requester) {
        this.requester = requester;
    }

    register(data) {
        return this.requester.postWithFile('/api/auth/register', data);
    }

    login(data) {
        return this.requester.postJSON('/api/auth/login', data);
    }

    updateSettings(data) {
        return this.requester.putWithFile('/api/users/updateSettings', data);
    }
}