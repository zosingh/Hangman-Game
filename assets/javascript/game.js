var hangman = {
  
  dictionary: [
    'khaleesi', 'warg', 'dothraki', 'valyrian', 'greyscale', 'maester', 
    'hound', 'lannister', 'stark', 'wildling', 'dragons', 'direwolf',
    'giants', 'sigil', 'longclaw', 'oathkeeper', 'targaryen', 'greyjoy'
  ],
  
  numberOfGuessesLeft: 6,
  wins: 0,
  losses: 0,
  numberOfCorrectGuesses: 0,
  currentWord: '',
  gamePlayArray: [],
  guesses: [],
  userInput: '',

  printTo: function(element, message) {
    document.getElementById(element).innerHTML = message;
  },

  printDirections: function(directions) {
    this.printTo(
      'directions',
      '<h2 class="hidden-xs visible-sm-* visible-md-* visible-lg-*">' +
      directions + '</h2><h4 class="visible-xs-* hidden-sm hidden-md ' +
      'hidden-lg"><strong>' + directions + '</strong></h4>'
    );
  },

  getWord: function() {
    this.currentWord =
      this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
  },

  initializeGamePlayArray: function() {
    for (var i = 0; i < this.currentWord.length; i++) {
      this.gamePlayArray.push('__');
    }
    return this.gamePlayArray;
  },

  printGamePlayArray: function() {
    this.printTo('game-play', this.gamePlayArray.join(' '));
  },

  printWins: function() {
    this.printTo('wins', '<p><strong>Wins:</strong> ' + this.wins + '</p>');
  },

  printLosses: function() {
    this.printTo('losses', '<p><strong>Losses:</strong> ' + this.losses +
                 '</p>');
  },

  printGuesses: function() {
    this.printTo('guesses', '<p><strong># of guesses remaining:</strong> ' +
                 this.numberOfGuessesLeft + '</p><p><strong>Letters already ' +
                 'guessed:' + '</strong></p>' + this.guesses.join(' '));
  },

  printStats: function() {
    this.printWins();
    this.printLosses();
    this.printGuesses();
  },

  startGame: function() {
      this.printTo('hangman',
                   '<img class="col-xs-12" src="assets/images/Hangman-0.png">');
      this.printTo('game-board', '<div class="lead text-success" id="wins">' +
                   '</div><div class="lead text-danger" id="losses"></div>' +
                   '<div id="game-play"></div><div style="height: 20px;">' +
                   '</div><div class="lead text-warning" id="guesses"></div>');
      this.printDirections('Choose a letter to make a guess');
      this.getWord();
      this.gamePlayArray = this.initializeGamePlayArray();
      this.printGamePlayArray();
      this.printStats();
  },

  isAlpha: function(input) {
    var keyA = 65;
    var keyZ = 90;
    if (input >= keyA && input <= keyZ) {
      return true;
    }
  },

  validateUserInput: function(input) {
    if (!this.isAlpha(input.keyCode)) {
      return;
    }

    this.userInput = String.fromCharCode(input.keyCode).toLowerCase();

    if (this.guesses.indexOf(this.userInput) != -1) {
      alert('You have already chosen that letter. You know nothing! Now choose again!');
      return;
    }
    return this.userInput;
  },

  updateGamePlayArray: function() {
    for (var i = 0; i < this.currentWord.length; i++) {
      if (this.currentWord[i] === this.userInput) {
        this.gamePlayArray[i] = this.userInput;
      }
    }
  },

  printHangman: function() {
    this.printTo('hangman',
                 '<img class="col-xs-12" src="assets/images/Hangman-' +
                 (this.guesses.length - this.numberOfCorrectGuesses) + '.png">');
  },

  updateGameWithGuess: function() {
    if (this.currentWord.indexOf(this.userInput) != -1) {
      this.updateGamePlayArray();
      this.numberOfCorrectGuesses += 1;
      this.printGamePlayArray();
    } 
    else {
      this.numberOfGuessesLeft--;
      this.printHangman();
    }
  },

  userWon: function() {
    if (this.gamePlayArray.join('') === this.currentWord) {
      return true;
    }
  },

  userLost: function() {
    if (this.numberOfGuessesLeft <= 0) {
      return true;
    }
  },

  showResult: function(divId, bootstrapClass, message) {
    this.printDirections('Press any key to play again!');
    this.printTo(divId, '<h1 class=' + bootstrapClass + '>' + message + '</h1>');
  },

  checkResult: function() {
    if (this.userWon()) {
      this.wins += 1;
      this.showResult('wins', 'text-success', 'You win!');
    }

    if (this.userLost()) {
      this.losses += 1;
      this.printTo('game-play', 'the word was: ' + this.currentWord);
      this.showResult('losses', 'text-danger', 'You lose!');
    }
  },

  getUserInput: function(event) {
    this.userInput = this.validateUserInput(event);
    if (this.userInput === undefined) {
      return;
    }

    this.guesses.push(this.userInput);
    this.updateGameWithGuess();
    this.printStats();
    this.checkResult();
  },

  resetGame: function() {
    this.numberOfGuessesLeft = 6;
    this.numberOfCorrectGuesses = 0;
    this.guesses = [];
    this.gamePlayArray = [];
    this.startGame();
  }
};

document.onkeyup = function(event) {
  if (hangman.currentWord === '') {
    hangman.startGame();
  } else if (hangman.userWon() || hangman.userLost()) {
    hangman.resetGame();
  } else {
    hangman.getUserInput(event);
  }
};