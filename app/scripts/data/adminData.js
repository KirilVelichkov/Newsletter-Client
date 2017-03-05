'use strict';
const REQUEST_URL = 'http://localhost:1337';

class AdminData {
    constructor(requester) {
        this.requester = requester;
    }

    createArticle(data) {
        return this.requester.postWithFile(REQUEST_URL + '/api/article/create', data);
    }
}