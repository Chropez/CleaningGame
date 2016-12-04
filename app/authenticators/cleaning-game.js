import Base from 'ember-simple-auth/authenticators/base';
import Ember from 'ember';

const {
  RSVP: { resolve }
} = Ember;

export default Base.extend({
  restore(data) {

  },
  authenticate(name) {
    console.log(`authenticaten ${name}`);
    return resolve();
  },

  invalidate(data) {

  }
});
