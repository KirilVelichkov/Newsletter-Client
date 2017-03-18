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
                $('#username').focus();
                $('#register-modal').click();

                $('#register-form').submit(function (evt) {
                    evt.preventDefault();

                    var formData = new FormData($(this)[0]);

                    _this.userData.register(formData)
                        .then((result) => {
                            $('#registerModal').modal('hide');
                            $('.modal-backdrop').hide();
                            context.redirect('#/home');
                        });

                    return false;
                });

                $('#modal-close-button').on('click', () => {
                    $('#registerModal').modal('hide');
                    $('.modal-backdrop').hide();
                    context.redirect('#/home');
                });
            });
    }

    loadLoginTemplate(content, context) {
        let $content = content;
        let _this = this;

        this.template.getTemplate('login-template')
            .then((resultTemplate) => {
                $content.html(resultTemplate);
                $('#username').focus();
                $('#login-modal').click();

                $('#login-form').submit(function (evt) {
                    evt.preventDefault();

                    let data = {
                        username: $('#username').val(),
                        password: $('#password').val()
                    };

                    _this.userData.login(data)
                        .then((result) => {

                            if (result.success) {
                                localStorage.setItem('jwt-token', result.token);
                                _this.utils.toggleUserControlElements();
                                $('#loginModal').modal('hide');
                                $('.modal-backdrop').hide();
                                context.redirect('#/home');
                            } else {
                                $('.login-error span')
                                    .fadeIn(200)
                                    .fadeOut(200)
                                    .fadeIn(200)
                                    .fadeOut(200)
                                    .fadeIn(200)
                                    .removeClass('hidden');
                            }
                        });

                    return false;
                });

                $('#modal-close-button').on('click', () => {
                    $('#loginModal').modal('hide');
                    $('.modal-backdrop').hide();
                    context.redirect('#/home');
                });
            });
    }

    loadUpdateSettingsTemplate(content, context) {
        let $content = content;
        let _this = this;
        console.log('sss');

        _this.template.getTemplate('update-settings-template')
            .then((resultTemplate) => {
                $content.html(resultTemplate);
                $('#email').focus();

                $('#updateSettings-form').submit(function (evt) {
                    evt.preventDefault();

                    var formData = new FormData($(this)[0]);

                    // TODO add validation
                    _this.userData.updateSettings(formData)
                        .then((result) => {
                            console.log(result);

                            context.redirect('#/home');
                        });

                    return false;
                });
            });
    }
}