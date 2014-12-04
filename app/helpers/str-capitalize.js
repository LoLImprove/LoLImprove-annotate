import Ember from "ember";

// TODO: Extract
function __isString(string) {
  if (typeof string === "string") {
    return true;
  } else {
    throw "Trying to use string method on " + (typeof string);
  }

}

export default Ember.Handlebars.makeBoundHelper(function(string) {
  if (__isString(string)) {
    return string.capitalize();
  }
});
