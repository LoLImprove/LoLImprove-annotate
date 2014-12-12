import Ember from "ember";
import Serializers from "./attribute-serializers";

var Bool = Serializers.Boolean;

var ReplayModel = Ember.Model.extend({
  id:          Ember.attr(Number),
  champion:    Ember.attr(String),
  lane:        Ember.attr(String),
  matchup:     Ember.attr(String),
  kda:         Ember.attr(String),
  victory:     Ember.attr(Bool),
  description: Ember.attr(String),
  duration:    Ember.attr(String),
  patch:       Ember.attr(String),
  video_id:    Ember.attr(String),
  replay_file: Ember.attr(String),
  created_at:  Ember.attr(Date),
  updated_at:  Ember.attr(Date),

  user: Ember.belongsTo("user", { key: 'user_id' }),
  analyses: Ember.hasMany("analysis", {key: 'analyses_ids'}),

  matchResult: function() {
    return this.get('victory') ? 'victory' : 'defeat';
  }.property('victory')
});

ReplayModel.reopenClass({
  url: '/replays',
  adapter: Ember.RESTAdapter.create()
});

export default ReplayModel;
