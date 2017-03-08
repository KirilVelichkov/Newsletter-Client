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
                        });
                } else {
                    context.redirect('#/home');
                }
            }).catch(() => {
                context.redirect('#/home');
            });
    }
}