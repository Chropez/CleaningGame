import Ember from 'ember';

const {
  Component,
  computed: { not }
} = Ember;

export default Component.extend({
  classNames: 'cg-fab-button',
  warn: not('secondary')
});
