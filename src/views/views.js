Ember.Yannotate.PlayerContainer =  Ember.View.extend({
  templateName: 'yannotate-player',
  classNames: ['ember-yannotate-container']
});

Ember.Yannotate.AnalysesContainer =  Ember.View.extend({
  templateName: 'analyses-container',
  classNames: ['analyses-container']
});

Ember.Yannotate.GeneralComment =  Ember.View.extend({
  templateName: 'analysis/general-comment',
  classNames: ['general-comment']
});

Ember.Yannotate.Timeline =  Ember.View.extend({
  tagName: 'ul',
  templateName: 'analysis/timeline',
  classNames: ['timeline']
});

Ember.Yannotate.TimelineEntry =  Ember.View.extend({
  tagName: 'li',
  templateName: 'analysis/timeline-entry',
  classNames: ['timeline-entry'],
  isEditingEntry: false,
  actions: {
    editEntry: function() {
      this.set('isEditingEntry', true);
    },
    saveEntry: function() {
      console.log('saving the world');
      this.set('isEditingEntry', false);
    }
  }
});
