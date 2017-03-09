import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const {
  inject: { service },
  Route
} = Ember;

export default Route.extend(ApplicationRouteMixin, {
  session: service(),

  redirect() {
    let isAuthenticated = this.get('session.isAuthenticated');
    if (!isAuthenticated) {
      this.transitionTo('login');
    }
  }
});
