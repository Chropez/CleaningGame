import Component from '@ember/component';
import { or } from 'ember-decorators/object/computed';
import { computed } from 'ember-decorators/object';
import env from '../config/environment';

export default class ShareGameLinkComponent extends Component {
  // showDialog

  @computed
  isIPhone() {
    return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
  }

  @computed
  isAndroid() {
    return !!navigator.userAgent.toLowerCase().match(/(android)/g);
  }

  @or('isIPhone', 'isAndroid')
  isPhone

  @computed('game.id')
  smsLinkUrl() {
    let separator = this.get('isAndroid') ? '?' : '&';
    let url = this.get('linkUrl');
    return `sms:${separator}body=Ska vi spela städspelet? Joina här ${url}`;
  }

  @computed('game.id')
  linkUrl() {
    return `${window.location.origin}${env.rootURL}game/${this.get('game.id')}`;
  }
}
