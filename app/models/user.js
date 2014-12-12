import Ember from "ember";
import Serializers from "./attribute-serializers";

var Bool = Serializers.Boolean;

var UserModel = Ember.Model.extend({
  id:              Ember.attr(Number),
  avatar:          Ember.attr(String),
  email:           Ember.attr(String),
  name:            Ember.attr(String),
  league:          Ember.attr(String),
  role:            Ember.attr(String),
  life_points:     Ember.attr(Number),
  verified:        Ember.attr(Bool),
  last_request_at: Ember.attr(Date),
  created_at:      Ember.attr(Date),
  updated_at:      Ember.attr(Date),

  replays: Ember.hasMany("replay", { key: 'replay_ids' })
  //analyses: Ember.hasMany("analysis", { key: 'analyses_ids' })
});

UserModel.reopenClass({
  url: '/users',
  adapter: Ember.RESTAdapter.create()
});

export default UserModel;
