import Ember from "ember";
import Utils from "./helpers-utils";

export default Ember.Handlebars.makeBoundHelper(function(string, length) {
  if (Utils.isString(string)) {
    if (typeof length === "object") {
      var length = 50; // Default value
    }
    return string.slice(0, length) + "...";
  }
});
