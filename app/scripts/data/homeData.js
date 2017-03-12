'use strict';

class HomeData {
    constructor(requester) {
        this.requester = requester;
    }

    getAllArticles() {
        return this.requester.getJSON('/api/article/all');
    }

    getFilteredArticles(filter) {
        return this.requester.getJSON(`/api/article/search/${filter}`);
    }

    getArticlesByCategory(category) {
        return this.requester.getJSON(`/api/article/category/${category}`);
    }
}