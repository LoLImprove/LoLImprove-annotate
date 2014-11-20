LoLImprove.Annotate.PlayerContainer =  Ember.View.extend({
  templateName: 'annotate-player',
  classNames: ['ember-yannotate-container']
});

LoLImprove.Annotate.AnalysesContainer =  Ember.View.extend({
  templateName: 'analyses-container',
  classNames: ['analyses-container']
});

LoLImprove.Annotate.GeneralComment =  Ember.View.extend({
  templateName: 'analysis/general-comment',
  classNames: ['general-comment']
});

LoLImprove.Annotate.Timeline =  Ember.View.extend({
  tagName: 'ul',
  templateName: 'analysis/timeline',
  classNames: ['timeline']
});

LoLImprove.Annotate.TimelineEntry =  Ember.View.extend({
  tagName: 'li',
  templateName: 'analysis/timeline-entry',
  classNames: ['timeline-entry'],
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
