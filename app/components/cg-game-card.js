import Ember from 'ember';

const {
  Component,
  computed,
  computed: {
    gt,
    mapBy,
    filter,
    or
  },
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: 'cg-game-card',
  session: service(),

  playerUsers: mapBy('game.players', 'user'),
  hasOtherPlayers: gt('game.players.length', 1),

  otherUsers: filter('playerUsers.@each.id', function(user) {
    let currentUserId = this.get('session.currentUser.id');
    return user.get('id') !== currentUserId;
  }),

  otherUsersNames: mapBy('otherUsers', 'name'),

  playersText: computed('playerUsers.@each.id', function() {
    let hasOtherPlayers = this.get('hasOtherPlayers');
    if (!hasOtherPlayers) {
      return `Bara du i spelet`;
    }

    let userNames = this.get('otherUsersNames');
    let text = '';

    userNames.forEach((userName, index) => {
      if (index === userNames.length - 1 && index !== 0) {
        text += ' och '
      } else if (index !== 0) {
        text += ', ';
      }
      text += userName;
    })
    return `Med ${text}`;
  }),

  isIPhone: computed(function() {
    return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
  }),

  isAndroid: computed(function() {
    return !!navigator.userAgent.toLowerCase().match(/(android)/g);
  }),

  isPhone: or('isIPhone', 'isAndroid'),

  smsLinkUrl: computed('game.id', function() {
    let separator = this.get('isAndroid') ? '?' : '&';
    let url = this.get('linkUrl');
    return `sms:${separator}body=Ska vi spela städspelet? Joina här ${url}`;
  }),

  linkUrl: computed('game.id', function() {
    return `${window.location.href}${this.get('game.id')}`;
  }),

  actions: {
    shareGame() {
      this.toggleProperty('showShareDialog');
    }
  }
});
