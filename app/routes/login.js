import Ember from 'ember';

const {
  inject: { service },
  Route
} = Ember;

export default Route.extend({
  session: service(),
  actions: {
    login(name) {
      this.get('session').authenticate('authenticator:cleaning-game', name);
    }
  }
});
