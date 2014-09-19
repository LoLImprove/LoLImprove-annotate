/* Require everything pls */

Ember.Yannotate = Ember.Namespace.create()
Ember.Yannotate.VERSION = '0.0.1'

if (Ember.libraries) {
  Ember.libraries.register('Ember Yannotate', Ember.Yannotate.VERSION)
}

require('build/src/component');
require('build/src/views');

require('build/src/lib/jquery-yannotate');
require('build/src/lib/youtube');
