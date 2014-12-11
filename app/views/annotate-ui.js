import Ember from "ember";

/*
 * LoLImprove.Annotate.AnnotateUIComponent
 */
export default Ember.View.extend({
  layoutName: 'annotate-ui',

  init: function() {
    this._super();
    this.set('isCurrentAnalyst', false);
  },

  insertVideo: function() {
    var self = this,
        replay = self.get("controller.replay"),
        replayId = replay.get('video_id');

    console.log('Asking for user');
    replay.get('user');
    console.log('The end.');
    //console.log(replay.user);
    /* Youtube Annotation system (annotate) */
    $('#annotate-player').yannotate({
      videoId: replayId,
      dimensions: 'relative',
      onPlayerStarted: function() {
        self.set('isAnalysing', true);
      }
    });

    if (replay.user_id == this.get("controller.currentUser")) {
      this.set('isCurrentAnalyst', true);
    }

  }.observes('controller.replay.isLoaded'),

  didInsertElement: function() {
  },

  actions: {
    startAnalysis: function() {
      this.set('isAnalysing', true);
      YoutubeAPI.player.playVideo();
    },
    addGeneralComment: function() {
      console.log('Adding general comment');
    },
    addTimeLineEntry: function() {
      console.log(YoutubeAPI.player.getCurrentTime());
    }
  }
});
