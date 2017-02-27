'use strict';

var router = Sammy('#content', function () {
  let $content = $('#content');
  let requester = new Requester();
  let testData = new TestData(requester);
  let template = new HandlebarsTemplates();

  let testController = new TestController(testData, template);

  this.get('#/', function (context) {
    context.redirect('#/home');
  });

  this.get('#/home', function (context) {

  });

  this.get('#/aaa', function (context) {
    console.log('aaa');

    testController.aaa($content);
  });
});
$('#register').submit(function (evt) {

  evt.preventDefault();
  var formData = new FormData($(this)[0]);
  let requester = new Requester();
  requester.postWithFile('http://localhost:1337/api/auth/register', formData)
    .then(console.log);

  // $.ajax({
  //   url: 'http://localhost:1337/api/auth/register',
  //   type: 'POST',
  //   data: formData,
  //   async: false,
  //   cache: false,
  //   contentType: false,
  //   enctype: 'multipart/form-data',
  //   processData: false,
  //   success: function (response) {
  //     console.log(response);
  //   }
  // });
  return false;
});
$('#login').submit(function () {
  $.post($(this).attr('action'), $(this).serialize(), function (json) {
    localStorage.setItem('jwt-token', json.token);
  }, 'json');
  return false;
});
$('#logout').submit(function () {
  let requester = new Requester();
  requester.postJSON('http://localhost:1337/api/auth/logout', {});
  return false;
});
router.run('#/');