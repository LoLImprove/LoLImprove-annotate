import Ember from "ember";
import Model from "lolimprove-annotate/lib/lolimprove-model";
import RESTNestedAdapter from "lolimprove-annotate/adapters/rest-nested-adapter";
import Serializers from "./attribute-serializers";

var GeneralCommentModel = Model.extend({
  id:          Ember.attr(Number),
  content:     Ember.attr(String),
  created_at:  Ember.attr(Date),
  updated_at:  Ember.attr(Date),

  user: Ember.belongsTo("user", { key: 'user_id' }),
  analysis: Ember.belongsTo("analysis", { key: 'analysis_id' }),
  //comments: Ember.hasMany("comment", { key: 'comments_ids' })
});

GeneralCommentModel.reopenClass({
  modelName: 'generalComment',
  url: '/analyses/:analysis_id/general_note',
  adapter: RESTNestedAdapter.create()
});

export default GeneralCommentModel;
