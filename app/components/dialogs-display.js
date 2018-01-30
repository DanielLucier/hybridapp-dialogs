import Component from '@ember/component';

export default Component.extend({
  playerName: 'Player One',
  numGuess: 0,
  playerGuess: 0,
  numPlayerGuess: 0,
  maxPlayerGuess: 3,
  init(){
    this._super(...arguments);
    this.introduction(this)
  },

introduction(component){
  navigator.notification.prompt(
    "Please, enter your first name", //Introduction - prompt message
    function setPlayerName (results){ //Introduction - prompt callback
      component.set('playerName', results.input1);
      navigator.notification.confirm(
        "Would you like to play a game?", //Greetings - confirm message
        function( index ) { //Greetings - confirm callback
          switch( index ) {
            case 1: //Greetings - if button one was pressed
              component.numberGuessGame(component);
              break;
            case 2: //Greetings - if button two was pressed
              break;
          }
        },
        "Greetings " + component.get('playerName'), //Greetings - confirm title
        ["Yes", "No"] //Greetings - confirm button text
      );
    },
    "Introduction", //Introduction - prompt title
    ["Hello!"], //Introduction - prompt button text
    ""
  );
},

numberGuessGame(component){
  component.set('numGuess', Math.floor((Math.random() *10) +1)); //randomly set number to be guessed
  navigator.notification.prompt(
    "What is your guess?", //Number Guess Game - prompt message
    function playerGuess (results){ //Number Guess Game - prompt callback
      component.set('playerGuess', results.input1);
      //Correct Player Guess
      if (component.get('playerGuess') == component.get('numGuess')){
        navigator.notification.confirm(
          "Would you like to play again?", //Correct Player Guess - confirm message
          function( index ) { //Correct Player Guess - confirm callback
            switch ( index ) {
              case 1: //Correct Player Guess - if button one is pressed
                component.numberGuessGame(component);
                break;
              case 2: //Correct Player Guess - if button two is pressed
                break;
            }
          },
          "Congratulations!! " + component.get('numGuess') + " is the number I was thinking of!", //Correct Player Guess - confirm title
          ["Play Again", "Exit"] //Correct Player Guess - confirm button text
        );
      }
      else {
        //Incorrect Player Guess
        navigator.notification.confirm(
        "Better luck next time!", //Incorrect Player Guess - prompt message
        function( index ) { ////Incorrect Player Guess - prompt callback
          switch ( index ) {
            case 1: //Incorrect Player Guess - if button one is pressed
              component.numberGuessGame(component);
              break;
            case 2: //Incorrect Player Guess - if button two is pressed
              break;
          }
        },
        "Sorry, the number I was thinking of is " + component.get('numGuess') + ".", //Incorrect Player Guess - prompt title
        ["Play Again", "Exit"] //Incorrect Player Guess - prompt button text
      );
    }
  },
  "I'm thinking of a number between 1 and 10...", //Number Guess Game - prompt title
  ["Guess"] //Number Guess Game - prompt button text
  );
},

});
