'use strict';
angular.module('app', [])

.controller('AppVM', function(state, game){
  this.state = state;

  this.keydown = function(event){
    game.turn(event.which);
  };

  this.gameMessageClass = function(){
    if (state.won) {
      return 'game-won';
    } else if (state.over) {
      return 'game-over';
    } else {
      return '';
    }
  };
})

.value('state', {})

.factory('game', function(){
  return {
    LEFT: 37,
    turn: function(key){
      console.log('turn', key);
    }
  };
});

;
