'use strict';

var router = Sammy('#content', function () {
  let $content = $('#content');

  let requester = new Requester();
  let template = new HandlebarsTemplate();

  let userData = new UserData(requester);

  let userController = new UserController(userData, template);

  this.get('/', function (context) {
    context.redirect('#/home');
  });

  this.get('#/home', function (context) {
    $content.html('<h1>Welcome home</h1>');
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
});


// $('#logout').submit(function () {
//   let requester = new Requester();
//   requester
//     .postJSON('http://localhost:1337/api/auth/logout', { username: 'kur za tebe' })
//     .then((rez) => {
//       console.log(rez);

//       requester.getJSON('http://localhost:1337/api/auth/getLoggedUser')
//         .then(console.log);
//     });
//   return false;
// });
router.run('#/');