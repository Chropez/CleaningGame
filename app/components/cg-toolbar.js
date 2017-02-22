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
  tall: false
});
