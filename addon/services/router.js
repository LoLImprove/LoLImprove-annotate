import Ember from 'ember';

/*
 * LoLImprove.Router
 * -----------------
 *
 *   LoLImprove.Router#mount(module, opts, context)
 *
 *     Allows LoLImprove modules to be mounted at any URL.
 *
 *     - mounter: A Mounter Function, that sets the routes for the module using the Ember.Router.DSL
 *     - opts:
 *         - path: The url to moun the module to, as a String.
 *     - dsl: The context (this) from the LoLImprove.Router.Map method (Ember.Router.DSL Object).
 *
 *     Returns nothing.
 *
 *     Example:
 *       import Router from 'lolimprove/router';
 *       import Mounter from 'lolimprove-annotate/services/routes-mounter';
 *
 *       Router.map(function() {
 *         Router.mount(Mounter, { path: "/replays" }, this);
 *       });
 *       // Will mount and load the module at the /replays path.
 *
 */
var Router = Ember.Router.extend();

Router.reopenClass({
  mount: function(mounter, opts, dsl) {
    mounter(dsl, opts);
  }
});

export default Router;
