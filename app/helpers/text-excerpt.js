import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(string, length) {
  if (_.isString(string)) {
    if (typeof length === "object") {
      var length = 50; // Default value
    }
    return string.slice(0, length) + "...";
  }
});
