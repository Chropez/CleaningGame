import Ember from 'ember';
import animalId from 'npm:animal-id';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const {
  inject: { service },
  Route
} = Ember;

export default Route.extend(ApplicationRouteMixin, {
  session: service(),

  beforeModel() {
    // let session = this.get('session');
    //
    // if (session.get('isLoggedIn')) {
    //   return;
    // }
    //
    // let user = session.fetch();
    //
    // if (!user) {
    //   // user isn't logged in
    //   return this.transitionTo('login');
    // }
    //
    // return user;
  },

  model() {
    return animalId.getId();
  },

  afterModel() {

  }
});
