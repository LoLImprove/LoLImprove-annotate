import Ember from "ember";
import RESTNestedAdapter from "lolimprove-annotate/adapters/rest-nested-adapter";

var AnalysisModel = Ember.Model.extend({
  id:          Ember.attr(Number),
  votes:       Ember.attr(Number),
  status:      Ember.attr(String),
  created_at:  Ember.attr(Date),
  updated_at:  Ember.attr(Date),

  user: Ember.belongsTo("user", { key: 'user_id' }),
  replay: Ember.belongsTo("replay", { key: 'replay_id' }),
  generalComment: Ember.belongsTo("general-comment", { key: 'general_note_id' }),

  //timelineEntries: Ember.hasMany("timeline-entries", {key: 'timeline_entries_ids'})
});

AnalysisModel.reopenClass({
  modelName: 'analysis',
  url: '/replays/:replay_id/analyses',
  adapter: RESTNestedAdapter.create()
});

export default AnalysisModel;
