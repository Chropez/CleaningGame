import Ember from 'ember';
import animalId from 'npm:animal-id';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const {
  inject: { service },
  Route
} = Ember;

export default Route.extend(ApplicationRouteMixin, {
  session: service(),

  model() {
    return animalId.getId();
  },

  redirect() {
    let isAuthenticated = this.get('session.isAuthenticated');
    if (!isAuthenticated) {
      this.transitionTo('login');
    }
  }
});
