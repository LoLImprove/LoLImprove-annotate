import Ember from "ember";
import Fixtures from 'lolimprove-annotate/fixtures';

/*
 * LoLImprove.Annotate.ReplaysShowController
 */
export default Ember.Controller.extend({
  //  user: Fixtures.user,
  setDefault: function() {
    this.set('isAnalysing', false);
    this.set('isCurrentAnalyst', false);
  }.on('init'),

  currentUser: function() {
    return Fixtures.user;
  },

  greetings: function() {
    console.log('greeting');
    return 'Hello' + this.get('replay.matchup');
  }.property('model.matchup')
});
