'use strict';

class AdminData {
    constructor(requester) {
        this.requester = requester;
    }

    createArticle(data) {
        return this.requester.postWithFile('/api/article/create', data);
    }

    getAllArticles() {
        return this.requester.getJSON('/api/article/all');
    }

    updateArticle(articleId, data) {
        return this.requester.putWithFile(`/api/article/update/${articleId}`, data);
    }
}