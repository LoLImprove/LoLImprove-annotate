import Ember from "ember";

/*
 * LoLImprove.Annotate.ReplayShowRoute
 */
export default  Ember.Route.extend({
  model: function() {
    return Ember.Object.create({name: 'Mathew'});
  },
  setupController: function(controller, model) {
     controller.set('model', model);
  }
});
