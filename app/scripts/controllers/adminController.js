'use strict';

class AdminController {
    constructor(adminData, template) {
        this.adminData = adminData;
        this.template = template;
    }

    loadAdminTemplate(content, context) {
        var $content = content;
        var _this = this;

        this.template.getTemplate('admin-template')
            .then((resultTemplate) => {
                $content.html(resultTemplate);

                $('#create-article-form').submit(function (evt) {
                    evt.preventDefault();

                    var formData = new FormData($(this)[0]);

                    _this.adminData.createArticle(formData)
                        .then((result) => {
                            if (result.success) {
                                $('#create-article-form')[0].reset();
                            }
                        });

                    return false;
                });
            });
    }
}