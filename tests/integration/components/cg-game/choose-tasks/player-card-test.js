import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cg-game/choose-tasks/player-card', 'Integration | Component | cg game/choose tasks/player card', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cg-game/choose-tasks/player-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cg-game/choose-tasks/player-card}}
      template block text
    {{/cg-game/choose-tasks/player-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
