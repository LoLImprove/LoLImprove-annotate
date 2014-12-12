import Ember from "ember";
import Fixtures from 'lolimprove-annotate/fixtures';

/*
 * LoLImprove.Annotate.ReplaysShowController
 */
export default Ember.Controller.extend({
  isAnalysing: false,
  isCurrentAnalyst: false,

  currentUser: function() {
    return Fixtures.user;
  }
});
