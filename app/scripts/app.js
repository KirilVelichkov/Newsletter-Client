'use strict';

var router = Sammy('#content', function (context) {
  let $content = $('#content');


  let requester = new Requester();
  let template = new HandlebarsTemplate();

  let utils = new Utils(requester);
  
  let userData = new UserData(requester);
  let adminData = new AdminData(requester);

  let userController = new UserController(userData, template, utils);
  let adminController = new AdminController(adminData, template);

  this.get('/', function (context) {
    context.redirect('#/home');
  });

  this.get('#/home', function (context) {

  });

  this.get('#/admin', function (context) {
    adminController.loadAdminTemplate($content, context);
  });

  this.get('#/register', function (context) {
    userController.loadRegisterTemplate($content, context);
  });

  this.get('#/login', function (context) {
    userController.loadLoginTemplate($content, context);
  });

  this.get('#/update-settings', function (context) {
    userController.loadUpdateSettingsTemplate($content, context);
  });

  utils.toggleUserControlElements();

  $('#logout').on('click', function () {
    localStorage.removeItem('jwt-token');
    utils.toggleUserControlElements();
  });

});

router.run('#/');