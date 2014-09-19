Ember.Handlebars.registerBoundHelper('capitalize', function(string) {
  return string.capitalize();
});

Ember.Handlebars.registerBoundHelper('upcase', function(string) {
  return string.toUpperCase();
});

Ember.Handlebars.registerBoundHelper('excerpt', function(string, length) {
  if (typeof length == "object")
    length = 50

  return string.slice(0, length) + "...";
});
