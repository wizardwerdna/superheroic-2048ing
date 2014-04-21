'use strict';
angular.module('app', [])

.controller('AppVM', function(state){
  this.state = state;

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

;
