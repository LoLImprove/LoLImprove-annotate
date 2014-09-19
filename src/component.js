Ember.Yannotate.YannotateComponent = Ember.Component.extend({
  layoutName: 'components/yannotate',
  actions: {
  },

  init: function() {
    this.current_user = this.get("user");
    this.replay = this.get("replay");
  },

  didInsertElement: function() {
    $('#yannotate-player').yannotate({
      videoId: this.get("replay").video_id,
      dimensions: 'relative',
    });
  }

});

Ember.Handlebars.helper('yannotate-ui', Ember.Yannotate.YannotateComponent)
