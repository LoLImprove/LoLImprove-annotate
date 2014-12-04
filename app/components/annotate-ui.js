import Ember from "ember";

/*
 * LoLImprove.Annotate.AnnotateUIComponent
 */
export default Ember.Component.extend({
  layoutName: 'components/annotate',

  init: function() {
    this._super();

    this.set('isCurrentAnalyst', false);
  },

  didInsertElement: function() {
    var self = this,
        replayId = self.get("replay").video_id;

    /* Youtube Annotation system (annotate) */
    $('#annotate-player').yannotate({
      videoId: replayId,
      dimensions: 'relative',
      onPlayerStarted: function() {
        self.set('isAnalysing', true);
      }
    });

    if (this.replay.user.id == this.user.id) {
      this.set('isCurrentAnalyst', true);
    }

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
