import { resolve, reject } from 'rsvp';
import { inject as service } from '@ember/service';
import Base from 'ember-simple-auth/authenticators/base';

/* global localStorage */
const USER_ID_KEY = 'cg_user_id_key';

export default Base.extend({
  store: service(),
  session: service(),

  restore() {
    if (!this.hasSavedUser()) {
      return reject();
    }

    return this.getCurrentUser().then((user) => {
      this.setCurrentUser(user);
    }).catch(() => {
      localStorage.removeItem(USER_ID_KEY);
      return reject();
    });
  },

  authenticate(name) {
    if (!this.hasSavedUser()) {
      return this.createUser(name).then((user) => {
        this.setCurrentUser(user);
        resolve(user);
      });
    }

    // shouldn't get here

    // eslint-disable-next-line no-console
    console.error('Tried authenticating already logged in user');
    this.invalidate();
    // return this.getCurrentUser().then((user) => {
    //   localStorage.setItem(USER_ID_KEY, user.get('id'));
    //   return resolve(user);
    // })
    // .catch(() => {
    //   return this.createUser(name).then((user) => {
    //     this.setCurrentUser(user);
    //     resolve(user);
    //   });
    // });
  },

  invalidate() {
    // @todo remove user?
    localStorage.removeItem(USER_ID_KEY);
    this.get('session').invalidate();
    return resolve();
  },

  createUser(name) {
    return this.get('store').createRecord('user', { name }).save();
  },

  getCurrentUser() {
    let id = localStorage.getItem(USER_ID_KEY);
    return this.get('store').findRecord('user', id);
  },

  hasSavedUser() {
    return localStorage.getItem(USER_ID_KEY) !== null;
  },

  setCurrentUser(user) {
    this.set('session.currentUser', user);
    localStorage.setItem(USER_ID_KEY, user.get('id'));
  }
});
