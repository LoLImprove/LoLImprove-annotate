import Ember from "ember";

var AnalysisModel = Ember.Model.extend({
  id:          Ember.attr(Number),
  votes:       Ember.attr(Number),
  status:      Ember.attr(String),
  created_at:  Ember.attr(Date),
  updated_at:  Ember.attr(Date),

  user: Ember.belongsTo("user", { key: 'user_id' }),
  replay: Ember.belongsTo("replay", { key: 'replay_id' }),
  generalNote: Ember.belongsTo("generalNote", { key: 'general_note_id' }),
  timelineEntries: Ember.hasMany("timeline-entries", {key: 'timeline_entries_ids'})
});

AnalysisModel.reopenClass({
  url: '/analyses',
  adapter: Ember.RESTAdapter.create()
});

export default AnalysisModel;
