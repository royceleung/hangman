angular.module('myApp', [
  'myApp.services',
  'myApp.hangman',
  'ngRoute'
  ])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .otherwise({
      redirectTo: '/hangman'
    });

  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
})
