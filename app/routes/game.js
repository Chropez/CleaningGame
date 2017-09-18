import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { GameStateOrder } from 'cleaning-game/models/game';

export default Route.extend(AuthenticatedRouteMixin, {
  model({ game_id }) {
    return this.store.findRecord('game', game_id);
  },

  // afterModel() {
  //   return new Promise((resolve) => {
  //     later(() => {
  //       resolve();
  //     }, 3000);
  //   });
  // },

  actions: {
    onBack() {
      this.transitionTo('index');
    },

    goToPrevStatus(game) {
      let gameState = game.get('state');

      let currStep = GameStateOrder.indexOf(gameState);
      let prevState = GameStateOrder[currStep - 1];
      game.set('state', prevState);
      game.save();
    }
  }
});
