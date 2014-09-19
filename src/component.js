Ember.Yannotate.YannotateComponent = Ember.Component.extend({
  layoutName: 'components/yannotate',
  actions: {
    hello: function(name) {
      console.log("Hello", name);
    }
  },

  init: function() {
    console.log('init', this.get('person'));
  },

  didInsertElement: function() {
    $('#player').yannotate({
      videoId: 'cEA7YFDGumY',
      dimensions: 'relative',
    });
  }

});

Ember.Handlebars.helper('yannotate-ui', Ember.Yannotate.YannotateComponent)
