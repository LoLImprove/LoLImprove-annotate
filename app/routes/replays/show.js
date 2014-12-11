import Ember from "ember";

/*
 * LoLImprove.Annotate.ReplayShowRoute
 */
export default Ember.Route.extend({
  model: function() {
    return this.get('store').modelFor('replay').find(2);
  },
  setupController: function(controller, model) {
    controller.set('replay', model);
  },

  actions: {
    loading: function(transition, originRoute) {
      console.log('loading...');
      // substate implementation when returning `true`
      return true;
    }
  }
});
