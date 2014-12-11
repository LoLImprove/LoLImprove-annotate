import Ember from "ember";
import Utils from "./helpers-utils";

export default Ember.Handlebars.makeBoundHelper(function(string) {
  if (Utils.isString(string)) {
    return string.toUpperCase();
  }
});
