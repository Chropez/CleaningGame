import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',
  classes: computed('class', function() {
    let classNames = this.get('classNames');
    return `main-content ${classNames}`;
  })
});
