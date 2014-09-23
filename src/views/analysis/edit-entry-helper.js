Ember.Yannotate.EditEntryHelper = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  },
  focusOut: function() {
    console.log('focused out');
    this.get('parentView').send('saveEntry');
  }
});

Ember.Handlebars.helper('edit-entry', Ember.Yannotate.EditEntryHelper);
