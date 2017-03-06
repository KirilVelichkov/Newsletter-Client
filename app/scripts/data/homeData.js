'use strict';
const REQUEST_URL = 'http://localhost:1337';

class HomeData {
    constructor(requester) {
        this.requester = requester;
    }

    getAllArticles() {
        return this.requester.getJSON(REQUEST_URL + '/api/article/all');
    }
}