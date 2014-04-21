'use strict';
describe('Controller AppVM', function(){
  var vm;
  var mockState = { mock: 'state' };
  var mockEvent = { mock: 'event', which: {mock: 'which'} };
  var mockGame;
  beforeEach(function(){
    module('app');
    mockGame = jasmine.createSpyObj('mockGame', ['turn']);
    inject(function($controller){
      vm = $controller('AppVM', {
        state: mockState,
        game: mockGame
      });
    });
  });
  it('should expose state', function(){
    expect(vm.state).toBe(mockState);
  });
  it('should handle keydown', function(){
    vm.keydown(mockEvent);
    expect(mockGame.turn).toHaveBeenCalledWith(mockEvent.which);
  });
  describe('gameMessageClass', function(){

    it('should handle won game', function(){
      mockState.won = true;
      mockState.over = true;
      expect(vm.gameMessageClass()).toBe('game-won');
    });

    it('should handle over game', function(){
      mockState.won = false;
      mockState.over = true;
      expect(vm.gameMessageClass()).toBe('game-over');
    });

    it('should handle unwon, unover game', function(){
      mockState.won = false;
      mockState.over = false;
      expect(vm.gameMessageClass()).toBe('');
    });

  });
});
