import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model({ game_id }) {
    return this.store.findRecord('game', game_id);
  },

  actions: {
    onBack() {
      this.transitionTo('index');
    }
  }
});
