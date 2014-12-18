import Ember from "ember";
import Serializers from "./attribute-serializers";

var Bool = Serializers.Boolean;

var GeneralCommentModel = Ember.Model.extend({
  id:          Ember.attr(Number),
  content:     Ember.attr(String),
  created_at:  Ember.attr(Date),
  updated_at:  Ember.attr(Date),

  user: Ember.belongsTo("user", { key: 'user_id' }),
  analysis: Ember.belongsTo("analysis", { key: 'analysis_id' }),
  //comments: Ember.hasMany("comment", { key: 'comments_ids' })
});

GeneralCommentModel.reopenClass({
  modelName: 'general-note',
  url: '/general_note',
  adapter: Ember.RESTAdapter.create()
});

export default GeneralCommentModel;
