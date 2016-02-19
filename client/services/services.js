angular.module('myApp.services', [])

.factory('courseraFactory', function($http) {
  var startGame = function() {
    return $http({
      method: 'POST',
      url: 'http://hangman.coursera.org/hangman/game',
      data: {
        email: "royceleung@gmail.com"
      }
    }).then(function(res) {
      return res.data;
    });
  };

  var guessLetter = function(key, letter) {
    return $http({
      method: 'POST',
      url: 'http://hangman.coursera.org/hangman/game/' + key,
      data: {
        guess: letter
      }
    }).then(function(res) {
      return res.data;
    })
  }

  return {
    startGame: startGame,
    guessLetter: guessLetter
  }
});