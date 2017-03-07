import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  Route
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  // model({ game_id }) {
  //   return this.store.findRecord('game', game_id);
  // },

  // afterModel(game) {
  //   return game.get('players');
  // },

  actions: {
    onBack() {
      this.transitionTo('index');
    }
  }
});
