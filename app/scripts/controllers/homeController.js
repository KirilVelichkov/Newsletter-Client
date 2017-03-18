'use strict';

//db.getCollection('articles').find({'$or':[{title: {$regex: 'Spoqewrqwereqrrt',$options: 'i' }},{tags:{$regex: 'tag',$options: 'i' }}]})


class HomeController {
    constructor(homeData, template, utils) {
        this.homeData = homeData;
        this.template = template;
        this.utils = utils;
    }

    loadHomePageTemplate(content, context, pageNumber, pageSize) {
        let $content = content;
        let _this = this;
        let articles;
        let articlesCount;

        _this.homeData.getArticlesCount()
            .then((count) => {
                articlesCount = count;
                return articlesCount;
            })
            .then(() => {
                return _this.homeData.getAllArticles(pageNumber, pageSize);
            })
            .then((foundArticles) => {
                articles = _this.utils.sortArticles(foundArticles);

                return _this.template.getTemplate('home-template');
            })
            .then((template) => {
                let count = Math.round(articlesCount / pageSize);
                let pageNumbers = Array.from({ length: count }, (v, k) => k + 1);

                $content.html(template({ articles, pageNumbers, pageSize, count, pagination: true }));
                $('#search-box').focus();
            });
    }

    loadFilteredHomePageTemplate(content, context, filter) {
        let $content = content;
        let _this = this;
        let articles;

        this.homeData.getFilteredArticles(filter)
            .then((foundArticles) => {
                articles = _this.utils.sortArticles(foundArticles);

                return this.template.getTemplate('home-template');
            })
            .then((template) => {
                $content.html(template({ articles, pagination: false }));
                $('#search-box').focus();
            });
    }

    loadArticlesByCategory(content, context, category, pageNumber, pageSize) {
        let $content = content;
        let _this = this;
        let articles;
        let articlesCount;

        this.homeData.getArticlesCountByCategory(category)
            .then((count) => {
                articlesCount = count;
                return articlesCount;
            })
            .then(() => {
                return _this.homeData.getArticlesByCategory(category, pageNumber, pageSize);
            })
            .then((foundArticles) => {
                articles = _this.utils.sortArticles(foundArticles);
                return this.template.getTemplate('article-category-template');
            })
            .then((template) => {
                let count = Math.round(articlesCount / pageSize);
                let pageNumbers = Array.from({ length: count }, (v, k) => k + 1);

                category = category.toLowerCase().replace(/(^| )(\w)/g, function (x) {
                    return x.toUpperCase();
                });
                console.log(pageNumbers);

                $content.html(template({ articles, category, pageNumbers, pageSize, count, pagination: true }));
                $('#search-box').focus();
            });
    }
}