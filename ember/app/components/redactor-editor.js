import Ember from 'ember';

var RedactorEditorComponent = Ember.Component.extend({
  tagName: 'div',
  minHeight: 400,

  init: function() {
    this._super();

    this.on("focusOut", this, this._elementValueDidChange);
    this.on("change", this, this._elementValueDidChange);
    this.on("paste", this, this._elementValueDidChange);
    this.on("cut", this, this._elementValueDidChange);
    this.on("input", this, this._elementValueDidChange);
  },

  _updateElementValue: Ember.observer(function() {
    var value = Ember.get(this, "body");
    var $el = this.$().context;
    if (typeof value === 'undefined') {
      return $el.innerHTML = '';
    }
    if ($el && value !== $el.innerHTML) {
      return $el.innerHTML = value;
    }
  }, "body"),

  _elementValueDidChange: function() {
    var $el = this.$().context;
    return Ember.set(this, "body", $el.innerHTML);
  },

  didInsertElement: function() {
    this.$().redactor({
      minHeight: this.minHeight
    });
    this._updateElementValue();
  }
});

export default RedactorEditorComponent;
