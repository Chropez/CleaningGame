import Ember from 'ember';

const {
  inject: { service },
  Route
} = Ember;

export default Route.extend({
  session: service(),

  beforeModel() {
      let isAuthenticated = this.get('session.isAuthenticated');
      if (isAuthenticated) {
        this.transitionTo('index');
      }
  },

  actions: {
    login(name) {
      this.get('session').authenticate('authenticator:cleaning-game', name);
    }
  }
});
