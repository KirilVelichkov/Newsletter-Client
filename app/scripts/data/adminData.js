'use strict';

class AdminData {
    constructor(requester) {
        this.requester = requester;
    }

    createArticle(data) {
        return this.requester.postWithFile('/api/article/create', data);
    }
}