'use strict';

class ArticleData {
    constructor(requester) {
        this.requester = requester;
    }

    getArticle(id) {
        return this.requester.getJSON(`/api/article/article/${id}`);
    }

    replyToComment(articleId, commentId, comment) {
        return this.requester.postJSON(`/api/article/replyComment/${articleId}/${commentId}`, comment);
    }

    addComment(articleId, comment) {
        return this.requester.postJSON(`/api/article/addComment/${articleId}`, comment);
    }
}