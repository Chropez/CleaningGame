import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cg-game/view-estimate-result', 'Integration | Component | cg game/view estimate result', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cg-game/view-estimate-result}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cg-game/view-estimate-result}}
      template block text
    {{/cg-game/view-estimate-result}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
