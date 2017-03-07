import Ember from 'ember';
import { GameState } from 'cleaning-game/models/game';

const {
  Component
} = Ember;

export default Component.extend({
  classNames: 'cg-game-new',
  actions: {
    startPlaying() {
      let game = this.get('game');
      game.set('state', GameState.AddingTasks);
      game.save();
    }
  }
});
