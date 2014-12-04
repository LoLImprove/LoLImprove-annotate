import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(string) {
  return string.toUpperCase();
});
