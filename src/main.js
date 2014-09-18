/* Require everything pls */

Ember.Yannotate = Ember.Namespace.create()
Ember.Yannotate.VERSION = '0.0.1'

if (Ember.libraries) {
  Ember.libraries.register('Ember Yannotate', Ember.Yannotate.VERSION)
}
