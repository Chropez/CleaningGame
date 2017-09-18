import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),
  classNames: 'cg-toolbar',
  showBackButton: notEmpty('onBack'),
  tall: false
});
