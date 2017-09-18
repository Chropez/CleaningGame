import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  session: service(),

  redirect() {
    let isAuthenticated = this.get('session.isAuthenticated');
    if (!isAuthenticated) {
      this.transitionTo('login');
    }
  }
});
