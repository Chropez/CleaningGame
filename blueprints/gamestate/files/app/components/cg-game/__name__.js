import Ember from 'ember';
//import { GameState } from 'cleaning-game/models/game';

const {
  Component
} = Ember;

export default Component.extend({
  classNames: '__name__',
  actions: {
    next() {
      // let game = this.get('game');
      // game.set('state', GameState.Estimating);
      // game.save();
    }
  }
});
