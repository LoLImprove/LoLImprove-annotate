import Ember from "ember";

/*
 * LoLImprove.Annotate.EditEntryHelper
 */
export default Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  },
  focusOut: function() {
    console.log('focused out');
    this.get('parentView').send('saveEntry');
  }
});
