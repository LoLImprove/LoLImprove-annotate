import Ember from "ember";
import Model from "lolimprove-annotate/lib/lolimprove-model";
import Serializers from "./attribute-serializers";

var Bool = Serializers.Boolean;

var ReplayModel = Model.extend({
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
  modelName: 'replay',
  url: '/replays',
  adapter: Ember.RESTAdapter.create()
});

export default ReplayModel;
