'use strict';

class AdminController {
    constructor(adminData, template, utils) {
        this.adminData = adminData;
        this.template = template;
        this.utils = utils;
    }

    loadAdminTemplate(content, context) {
        let $content = content;
        let _this = this;
        let articles;

        this.utils.getUserRoles()
            .then((result) => {

                if (result.indexOf('admin') != -1) {

                    this.template.getTemplate('admin-template')
                        .then((resultTemplate) => {
                            $content.html(resultTemplate);

                            $('#create-article-form').submit(function (evt) {
                                evt.preventDefault();

                                var formData = new FormData($(this)[0]);

                                _this.adminData.createArticle(formData)
                                    .then((result) => {
                                        console.log(result);

                                        if (result.success) {
                                            $('#create-article-form')[0].reset();
                                        }
                                    });

                                return false;
                            });


                            $('.tab').on('click', function (evt) {
                                evt.preventDefault();

                                $('.tab').each(function () {
                                    $(this).removeClass('tab-active');
                                });

                                $(this).addClass('tab-active');

                                let index = $('.tab').index(this);

                                $('.tab-content').addClass('hidden');

                                $('.tab-content').eq(index).removeClass('hidden');

                                _this.adminData.getAllArticles()
                                    .then((foundArticles) => {
                                        articles = foundArticles;

                                        return _this.template.getTemplate('edit-articles-template');
                                    })
                                    .then((template) => {
                                        $('#articles').html(template({ articles }));

                                        $('*[id*=ID]').change(function (event) {
                                            let reader = new FileReader();
                                            let $image = $(this).siblings('img');

                                            reader.onload = function (e) {
                                                $image.attr('src', e.target.result);
                                            };
                                            reader.readAsDataURL(this.files[0]);
                                        });

                                        $('.edit-article-form').submit(function (evt) {
                                            evt.preventDefault();

                                            let self = this;
                                            let articleId = $(this).data('id');
                                            console.log(articleId);


                                            let formData = new FormData($(this)[0]);

                                            _this.adminData.updateArticle(articleId, formData)
                                                .then((result) => {
                                                    if (result.success) {
                                                        $(self).prev().removeClass('hidden');
                                                    }
                                                });
                                            return false;
                                        });
                                    });

                                return false;
                            });
                        });
                } else {
                    context.redirect('#/home');
                }
            }).catch(() => {
                context.redirect('#/home');
            });
    }
}