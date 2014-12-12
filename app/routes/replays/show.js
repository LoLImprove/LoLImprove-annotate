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
      var view = this.container.lookup('view:loading').append();
      this.router.one('didTransition', view, 'destroy');

      return true;
    }
  }
});
