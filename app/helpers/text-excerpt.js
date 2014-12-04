import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(string, length) {
  if (typeof length === "object") {
    var length = 50;
  }

  return string.slice(0, length) + "...";
});
