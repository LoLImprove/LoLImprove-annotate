import Ember from 'ember';

/*
 * LoLImprove.Annotate.PlayerView
 */

export default Ember.View.extend({
  templateName: 'player',
  classNames: ['li-player'],

  setAPI: function() {
    this.playerApi = YoutubeAPI;
  }.on('init'),

  insertVideo: function() {
    var controller = this.get('controller'),
        replay   = controller.get('replay'),
        replayId = replay.get('video_id');

    console.log(replay.get('user'));

    /* Youtube Annotation system (annotate) */
    $('#annotate-player').yannotate({
      videoId: replayId,
      dimensions: 'relative',
      onPlayerStarted: function() {
        controller.set('isAnalysing', true);
      }
    });

    if (replay.user_id == controller.get("currentUser")) {
      controller.set('isCurrentAnalyst', true);
    }

  }.observes('controller.replay.isLoaded'),

  start: function() {
    this.playerApi.player.playVideo();
  },

  actions: {
  }
});
