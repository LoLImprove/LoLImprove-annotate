import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(date) {
  if (_.isDate(date)) {
    return moment(date).fromNow();
  }
});
