'use strict';

class HomeData {
    constructor(requester) {
        this.requester = requester;
    }

    getArticlesCount() {
        return this.requester.getJSON('/api/article/all/count');
    }

    getArticlesCountByCategory(category) {
        return this.requester.getJSON(`/api/article/all/count/${category}`);
    }

    getAllArticles(pageNumber, pageSize) {
        return this.requester.getJSON(`/api/article/all/pageAndSize/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    getFilteredArticles(filter) {
        return this.requester.getJSON(`/api/article/search/${filter}`);
    }

    getArticlesByCategory(category, pageNumber, pageSize) {
        return this.requester.getJSON(`/api/article/category/?category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
}