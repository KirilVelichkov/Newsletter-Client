'use strict';

class ArticleController {
    constructor(articleData, template) {
        this.articleData = articleData;
        this.template = template;
    }

    loadArticleTemplate(content, context, id) {
        let $content = content;
        let _this = this;
        let article;

        _this.articleData.getArticle(id)
            .then((foundArticle) => {
                article = foundArticle;
                article.category = foundArticle.category.toLowerCase().replace(/(^| )(\w)/g, function (x) {
                    return x.toUpperCase();
                });

                return _this.template.getTemplate('singe-article-template');
            })
            .then((template) => {
                $content.html(template(article));
                $('#search-box').focus();
            });
    }
}