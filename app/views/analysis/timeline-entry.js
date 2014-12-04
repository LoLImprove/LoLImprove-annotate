import Ember from "ember";

/*
 * LoLImprove.Annotate.TimelineEntryView
 */
export default Ember.View.extend({
  tagName: 'li',
  templateName: 'analysis/timeline-entry',
  classNames: ['li-timeline-entry'],
  isEditingEntry: false,
  actions: {
    editEntry: function() {
      this.set('isEditingEntry', true);
    },
    saveEntry: function() {
      this.set('isEditingEntry', false);
      // TODO: Do ajax stuff or ember-model stuff
    }
  }
});
