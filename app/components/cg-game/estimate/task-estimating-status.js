import Ember from 'ember';
import { GameState } from 'cleaning-game/models/game';

const {
  Component,
  computed: {
    not
  },
  inject: { service },
  RSVP: { all }
} = Ember;

export default Component.extend({
  disableNext: not('allPlayersDoneEstimating'),
  gameService: service(),
  actions: {
    next() {
      let game = this.get('game');
      all(this.get('gameService').setTaskAverageEstimate(game)).then(() => {
        game.set('state', GameState.ViewingEstimateResult);
        game.save();
      });
    }
  }
});
