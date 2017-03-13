import Ember from 'ember';
import { GameState } from 'cleaning-game/models/game';

const {
  Component,
  computed: { lt }
} = Ember;

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
