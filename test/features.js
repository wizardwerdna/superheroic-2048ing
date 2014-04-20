'use strict';
// jshint newcap: false
describe('Superheroic 2048', function(){
  var page = {
    element: $(),
    find: function(spec){return page.element.find(spec);},
    score: function(){
      return parseInt(page.find('.score-container').text());
    },
    best: function(){
      return parseInt(page.find('.best-container').text());
    },
    tiles: function(){
      return page.find('.tile');
    },
    tile: function(tile){
      var match = tile.className
        .match(/tile-([0-9]+).*tile-position-([1-4])-([1-4])/);
      expect(match[1]).toBe($(tile).find('.tile-inner').text());
      return {
        x: parseInt(match[2])-1,
        y: parseInt(match[3])-1,
        score: parseInt(match[1])
      };
    }
  };

  var DemoPage1 = {
    score: 123,
    best: 321,
    tiles: [
      {x: 0, y:0, score: 2},
      {x: 0, y:1, score: 4}
    ],
    won: false,
    over: false
  },

  DemoPage2 = {
    score: 1123,
    best: 1321,
    tiles: [
      {x: 1, y:0, score: 4},
      {x: 1, y:1, score: 8}
    ],
    won: false,
    over: false
  };

  describe('FEATURE: display game state', function(){
    it('SCENARIO: a fresh game', function(){
      GIVEN_2048PageFor(DemoPage1);
      THEN_2048PageShouldConformTo(DemoPage1);
    });

    it('SCENARIO: another fresh game', function(){
      GIVEN_2048PageFor(DemoPage2);
      THEN_2048PageShouldConformTo(DemoPage2);
    });

    it('SCENARIO: game won', function(){
      var conditions = {won: true, over: true};
      GIVEN_2048PageFor(angular.extend(DemoPage1, conditions));
      THEN_2048PageShouldConformTo(angular.extend(DemoPage1, conditions));
    });

    it('SCENARIO: game over', function(){
      var conditions = {won: false, over: true};
      GIVEN_2048PageFor(angular.extend(DemoPage1, conditions));
      THEN_2048PageShouldConformTo(angular.extend(DemoPage1, conditions));
    });
  });

  function GIVEN_2048PageFor(_state_){
    module('app', 'index.html', function($provide){
      $provide.value('state', angular.copy(_state_));
    });
    inject(function($compile, $rootScope, $templateCache){
      page.element = $compile($templateCache.get('index.html'))($rootScope);
      $rootScope.$digest();
    });
  }

  function THEN_2048PageShouldConformTo(state){
    if (state.won) {
      expect(page.element.find('.game-message')).toHaveClass('game-won');
      expect(page.element.find('.game-message p').text()).toBe('You won!');
      expect(page.element.find('.game-message')).not.toHaveClass('game-over');
    } else if (state.over) {
      expect(page.element.find('.game-message')).toHaveClass('game-over');
      expect(page.element.find('.game-message p').text()).toBe('Game over!');
      expect(page.element.find('.game-message')).not.toHaveClass('game-won');
    } else {
      expect(page.score()).toBe(state.score);
      expect(page.best()).toBe(state.best);
      expect(page.tiles().get().map(page.tile)).to$Equal(state.tiles);
      expect(page.element.find('.game-message')).not.toHaveClass('game-won');
      expect(page.element.find('.game-message')).not.toHaveClass('game-over');
      expect(page.element.find('.game-message p').text()).toBe('');
    }
  }
});
