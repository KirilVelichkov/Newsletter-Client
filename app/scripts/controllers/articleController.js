'use strict';

class ArticleController {
    constructor(articleData, template, utils) {
        this.articleData = articleData;
        this.template = template;
        this.utils = utils;
    }

    loadArticleTemplate(content, context, id) {
        let $content = content;
        let _this = this;
        let article;
        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        _this.articleData.getArticle(id)
            .then((foundArticle) => {
                article = foundArticle;

                let date = new Date(article.date);

                article.date = {
                    month: months[date.getMonth()],
                    day: date.getDate()
                };

                article.author = foundArticle.author.toUpperCase();

                article.tags.forEach(function (tag, index) {
                    article.tags[index] = tag.toUpperCase();
                }, this);

                article.comments.forEach(function (comment, index) {
                    let date = new Date(comment.date);

                    article.comments[index].date = {
                        month: months[date.getMonth()],
                        day: date.getDate()
                    };

                    article.comments[index].author = article.comments[index].author.toUpperCase();

                    article.comments[index].replies.forEach(function (repliesComment, repliesIndex) {
                        let repliesDate = new Date(repliesComment.date);
                        article.comments[index].replies[repliesIndex].date = {
                            month: months[repliesDate.getMonth()],
                            day: repliesDate.getDate()
                        };

                        article.comments[index].replies[repliesIndex].author =
                            article.comments[index].replies[repliesIndex].author.toUpperCase();

                    });

                });

                return _this.template.getTemplate('singe-article-template');
            })
            .then((template) => {
                let category = article.category.toLowerCase().replace(/(^| )(\w)/g, function (x) {
                    return x.toUpperCase();
                });

                $content.html(template({ article, category }));
                $('#search-box').focus();

                _this.utils.isUserLogged()
                    .then((user) => {
                        if (user) {
                            $('.add-comment-toggler').removeClass('hidden');
                        } else {
                            $('.add-comment-toggler').addClass('hidden');
                        }
                    })
                    .catch(() => {
                        $('.add-comment-toggler').addClass('hidden');
                    });

                $('.da-image-container').on('mouseenter', function () {
                    $(this).addClass('image-large');
                });

                $('.da-image-container').on('mouseout', function () {
                    $(this).removeClass('image-large');
                });

                $('.custom-form-submit').on('click', function (evt) {
                    evt.preventDefault();

                    let content = $(this).parent('div').prev('textarea').val();
                    let articleId = context.params.id;
                    let commentId = $(this).data('id');

                    let data = {
                        content
                    };

                    _this.articleData.replyToComment(articleId, commentId, data)
                        .then((result) => {
                            if (result.success) {
                                window.refreshState();
                            }
                        });


                    return false;
                });

                $('#submit-comment').on('click', function (evt) {
                    evt.preventDefault();

                    let content = $('#comment-box').val();
                    let articleId = context.params.id;

                    let data = {
                        content
                    };

                    _this.articleData.addComment(articleId, data)
                        .then((result) => {
                            if (result.success) {
                                window.refreshState();
                            }
                        });

                    return false;
                });

                $('.reply-comment-button').on('click', function () {
                    $('.reply-comment-container').hide();
                    $(this).parent('.comments-list-item').next('div.reply-comment-container').animate({ 'opacity': 'show', 'paddingTop': 0 });
                });
            });
    }
}