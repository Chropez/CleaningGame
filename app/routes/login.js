import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

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
