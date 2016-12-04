import Ember from 'ember';
import animalId from 'npm:animal-id';

const {
  inject: { service },
  Route
} = Ember;

export default Route.extend({
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
