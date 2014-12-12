import Ember from 'ember';

/*
 * LoLImprove.Annotate.ReplayContainerView
 */

export default Ember.View.extend({
  templateName: 'annotate-replay',
  classNames: ['li-replay-container'],
  fullDescription: false,

  actions: {
    toggleDescription: function() {
      this.set('fullDescription', !this.get('fullDescription'));
    },

    startAnalysis: function() {
      var controller = this.get('controller'),
          player     = this.container.lookup('view:player');

      controller.set('isAnalysing', true);
      player.start();
    },
    addGeneralComment: function() {
      console.log('Adding general comment');
    },
    addTimeLineEntry: function() {
      console.log(YoutubeAPI.player.getCurrentTime());
    }
  }
});
