import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { GameState } from 'cleaning-game/models/game';

const {
  Route
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  model({ game_id }) {
    return this.store.findRecord('game', game_id);
  },
  actions: {
    onBack() {
      this.transitionTo('index');
    },

    goToPrevStatus(game) {
      let gameState = game.get('state');
      let gameStates= [];

      let gameStateIndex;
      let i = 0;

      for (let state in GameState) {
        if (GameState.hasOwnProperty(state)) {
          let currState = GameState[state];
          gameStates.push(currState);
          if (gameState === currState) {
            gameStateIndex = i;
          }
          i++;
        }
      }

      let prevStatus = gameStates[gameStateIndex - 1];
      game.set('state', prevStatus);
      game.save();
    }
  }
});
