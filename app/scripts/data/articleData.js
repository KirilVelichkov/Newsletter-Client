'use strict';

class ArticleData {
    constructor(requester) {
        this.requester = requester;
    }

    getArticle(id) {
        return this.requester.getJSON(`/api/article/article/${id}`);
    }
}