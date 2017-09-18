import Component from '@ember/component';
import { lt } from '@ember/object/computed';
import { GameState } from 'cleaning-game/models/game';

export default Component.extend({
  classNames: 'cg-game-new',
  hasTooFewPlayers: lt('game.players.length', 2),
  actions: {
    startPlaying() {
      let game = this.get('game');
      game.set('state', GameState.AddingTasks);
      game.save();
    }
  }
});
