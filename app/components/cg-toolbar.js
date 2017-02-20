import Ember from 'ember';

const {
  Component,
  computed: { notEmpty },
  inject: { service }
} = Ember;

export default Component.extend({
  session: service(),
  classNames: 'cg-toolbar',
  showBackButton: notEmpty('onBack'),

  actions: {
    logout() {
      this.get('session').invalidate();
    },

    changeName(/*newName*/) {
      console.log('not implemented');
    }
  }
});
