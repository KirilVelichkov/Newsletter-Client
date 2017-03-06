'use strict';

class UserController {
    constructor(userData, template, utils) {
        this.userData = userData;
        this.template = template;
        this.utils = utils;
    }

    loadRegisterTemplate(content, context) {
        let $content = content;
        let _this = this;

        this.template.getTemplate('register-template')
            .then((resultTemplate) => {
                $content.html(resultTemplate);

                $('#register-form').submit(function (evt) {
                    evt.preventDefault();

                    var formData = new FormData($(this)[0]);

                    // TODO add validation
                    _this.userData.register(formData)
                        .then((result) => {
                            console.log(result);

                            context.redirect('#/home');
                        });

                    return false;
                });
            });
    }

    loadLoginTemplate(content, context) {
        let $content = content;
        let _this = this;

        this.template.getTemplate('login-template')
            .then((resultTemplate) => {
                $content.html(resultTemplate);

                $('#login-form').submit(function (evt) {
                    evt.preventDefault();

                    let data = {
                        username: $('#username').val(),
                        password: $('#password').val()
                    };

                    // TODO add validation
                    _this.userData.login(data)
                        .then((result) => {

                            if (result.success) {
                                localStorage.setItem('jwt-token', result.token);
                                _this.utils.toggleUserControlElements();
                                context.redirect('#/home');
                            } else {
                                alert('invalid username or password!');
                            }
                        });

                    return false;
                });
            });
    }

    loadUpdateSettingsTemplate(content, context) {
        let $content = content;
        let _this = this;

        _this.template.getTemplate('update-settings-template')
            .then((resultTemplate) => {
                $content.html(resultTemplate);

                $('#updateSettings-form').submit(function (evt) {
                    evt.preventDefault();

                    var formData = new FormData($(this)[0]);

                    // TODO add validation
                    _this.userData.updateSettings(formData)
                        .then((result) => {
                            console.log(result);


                        });

                    return false;
                });
            });
    }
}