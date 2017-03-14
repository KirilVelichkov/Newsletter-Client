'use strict';

var router = Sammy('#content', function (context) {
  let $content = $('#content');

  let requester = new Requester();
  let template = new HandlebarsTemplate();

  let utils = new Utils(requester);

  let userData = new UserData(requester);
  let articleData = new ArticleData(requester);
  let adminData = new AdminData(requester);
  let homeData = new HomeData(requester);

  let homeController = new HomeController(homeData, template, utils);
  let articleController = new ArticleController(articleData, template, utils);
  let userController = new UserController(userData, template, utils);
  let adminController = new AdminController(adminData, template, utils);

  this.get('/', function (context) {
    context.redirect('#/home/1&5');
  });

  this.get('#/home', function (context) {
    context.redirect('#/home/1&5');
  });

  this.get('#/home/?:pageNumber&:pageSize', function (context) {
    let pageNumber = this.params.pageNumber;
    let pageSize = this.params.pageSize;

    homeController.loadHomePageTemplate($content, context, pageNumber, pageSize);
  });

  this.get('#/home/search/?:query', function (context) {
    let filter = this.params.query;

    homeController.loadFilteredHomePageTemplate($content, context, filter);
  });

  this.get('#/home/category/?:category&:pageNumber&:pageSize', function (context) {
    let category = this.params.category;
    let pageNumber = this.params.pageNumber;
    let pageSize = this.params.pageSize;
    
    homeController.loadArticlesByCategory($content, context, category, pageNumber, pageSize);
  });

  this.get('#/article/?:id', function (context) {
    let id = this.params.id;

    articleController.loadArticleTemplate($content, context, id);
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

  this.get('#/profile', function (context) {
    userController.loadUpdateSettingsTemplate($content, context);
  });

  this.get('', function (context) {
    context.redirect('#/home');
  });

  utils.toggleUserControlElements();

  $('#logout').on('click', function () {
    localStorage.removeItem('jwt-token');
    utils.toggleUserControlElements();
  });

  $('#search-box').keyup(function (e) {
    if (e.keyCode === 13) {
      var searchQuery = $('#search-box').val();

      window.location.replace(`#/home/search/${searchQuery}`);
    }
  });

  $('.nav-link').on('click', function () {
    $('.nav-link').each(function () {
      $(this).removeClass('nav-link-active');
    });

    $(this).addClass('nav-link-active');
  });

});

window.refreshState = () => router.refresh();
router.run('#/');