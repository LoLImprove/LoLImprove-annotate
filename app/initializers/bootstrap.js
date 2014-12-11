import Ember from "ember";

export default {
  name: 'bootstrap',
  initialize: function(container, app) {
    /* Needed for the new models to have a container defined */
    Ember.Model.reopen({
      init: function() {
        this.container = container;
        this._super();
      }
    });
  }
};
