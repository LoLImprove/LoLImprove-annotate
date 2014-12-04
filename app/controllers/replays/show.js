import Ember from "ember";
import Fixtures from 'lolimprove-annotate/fixtures';

/*
 * LoLImprove.Annotate.ReplaysShowController
 */
export default Ember.Controller.extend({
  user: Fixtures.user,
  replay: Fixtures.replay,
  greetings: function() {
    return 'Hello' + this.get('model.name');
  }.property('model.name')
});
