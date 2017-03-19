import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: '',
  classes: computed('class', function() {
    let classNames = this.get('classNames');
    return `main-content ${classNames}`;
  })
});
