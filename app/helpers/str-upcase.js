import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(string) {
  if (_.isString(string)) {
    return string.toUpperCase();
  }
});
