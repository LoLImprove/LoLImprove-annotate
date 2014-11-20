Ember.Handlebars.registerBoundHelper('capitalize', function(string) {
  return string.capitalize() if __isString(string);
});

Ember.Handlebars.registerBoundHelper('upcase', function(string) {
  return string.toUpperCase() if __isString(string);
});

Ember.Handlebars.registerBoundHelper('excerpt', function(string, length) {
  if (typeof length == "object") {
    var length = 50;
  }

  return string.slice(0, length) + "...";
});

function __isString(string) {
  if (typeof string === "string") {
    return true;
  } else {
    throw "Trying to use string method on " + (typeof string);
  }

}
