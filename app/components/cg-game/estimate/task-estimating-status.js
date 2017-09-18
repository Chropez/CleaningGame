import Component from '@ember/component';
import { not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';
import { GameState } from 'cleaning-game/models/game';

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
