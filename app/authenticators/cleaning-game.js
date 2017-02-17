import Base from 'ember-simple-auth/authenticators/base';
import Ember from 'ember';

/* global localStorage */
const USER_ID_KEY = 'cg_user_id_key';

const {
  RSVP: { resolve },
  inject: { service }
} = Ember;

export default Base.extend({
  store: service(),

  restore() {

  },
  authenticate(name) {
    let id = localStorage.getItem(USER_ID_KEY);

    if (id === null) {
      return this.createUser(name);
    }

    let store = this.get('store');
    return store.findRecord('user', id).then((user) => {
      return resolve(user);
    })
    .catch(() => {
      return this.createUser(name);
    });
  },

  invalidate() {

  },

  createUser(name) {
    return this.get('store').createRecord('user', { name }).save();
  }

});
