Ember.Yannotate.YannotateComponent = Ember.Component.extend({
  layoutName: 'components/yannotate',
  init: function() {
    this._super();

    this.current_user = this.get("user");
    this.replay = this.get("replay");
  },

  didInsertElement: function() {
    var self = this,
        replayId = self.get("replay").video_id;

    $('#yannotate-player').yannotate({
      videoId: replayId,
      dimensions: 'relative',
      onPlayerStarted: function() {
        self.set('isAnalysing', true);
      }
    });
  },
  actions: {
    startAnalysis: function() {
      this.set('isAnalysing', true);
      YoutubeAPI.player.playVideo();
    },
    addTimeLineEntry: function() {
      console.log(YoutubeAPI.player.getCurrentTime())
    }
  }
});

Ember.Handlebars.helper('yannotate-ui', Ember.Yannotate.YannotateComponent)
