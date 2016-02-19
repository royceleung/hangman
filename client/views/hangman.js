angular.module('myApp.hangman', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider.when('/hangman', {
    templateUrl: '/views/hangman.html',
    controller: 'hangmanCtrl'
  });
})

.controller('hangmanCtrl', function($scope, courseraFactory) {

  var letters = 'abcdefghijklmnopqrstuvwxyz';
  var gameKey;
  $scope.phrase;            //the word the user is trying to guess
  $scope.allLetters = {};   //counter for whether a letter has been guessed yet
  $scope.gameState = 'alive';
  $scope.numTries;
  
  /** scope functions **/

  $scope.initGame = function() {
    //resets all the letters to 0
    for(var i = 0; i< letters.length; i++) {
      $scope.allLetters[letters[i]] = 0;
    }

    //api call to start new game
    courseraFactory.startGame().then(function(res) {
      gameKey = res.game_key;
      updateCurrentGame(res);
    });
  }

  $scope.guessLetter = function(guess) {
    $scope.allLetters[guess] = 1;
    
    //api call to guess a letter for current game
    courseraFactory.guessLetter(gameKey, guess).then(function(res) {
      updateCurrentGame(res);
    })
  }

  /** helper functions **/

  var guessFirstLetter = function(word) {
    $scope.guessLetter(word[0].toLowerCase());
  }

  var updateCurrentGame = function(newState) {
    $scope.phrase = newState.phrase.split('');
    $scope.gameState = newState.state;
    $scope.numTries = parseInt(newState.num_tries_left) + 1;
  }
  
  /** voice commands **/

  if(annyang) {
    var commands = {
      ':word please': guessFirstLetter,
      'new game please': $scope.initGame
    };
    annyang.addCommands(commands);
    // Start listening.
    annyang.start();
  }

});