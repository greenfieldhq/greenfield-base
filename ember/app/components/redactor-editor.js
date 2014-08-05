import Ember from 'ember';

var RedactorEditorComponent = Ember.Component.extend({ 
  tagName: 'div',
  init: function() {
    this._super();

    this.on("focusOut", this, this._elementValueDidChange);
    this.on("change", this, this._elementValueDidChange);
    this.on("paste", this, this._elementValueDidChange);
    this.on("cut", this, this._elementValueDidChange);
    this.on("input", this, this._elementValueDidChange);
  },
  _updateElementValue: Ember.observer(function() {
    var $el, value;
    value = Ember.get(this, "content.body");
    $el = this.$().context;
    if ($el && value !== $el.innerHTML) {
      return $el.innerHTML = value;
    }
  }, "value"),
  _elementValueDidChange: function() {
    var $el;
    $el = this.$().context;
    return Ember.set(this, "content.body", $el.innerHTML);
  },
  didInsertElement: function() {
    this.$().redactor({
      air: true
    });
    this._updateElementValue();
  }
});

export default RedactorEditorComponent;
