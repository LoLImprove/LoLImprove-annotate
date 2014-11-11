/* Require everything pls */

Ember.Yannotate = Ember.Namespace.create()
Ember.Yannotate.VERSION = '0.0.1'

if (Ember.libraries) {
  Ember.libraries.register('Ember Yannotate', Ember.Yannotate.VERSION)
}


// Lib dependencies
require('build/src/lib/jquery-yannotate');
require('build/src/lib/youtube');

// Components
require('build/src/components/yannotate-component');

// Views
require('build/src/views/views');

// View specific helpers
require('build/src/views/analysis/edit-entry-helper');

// Format Helpers
require('build/src/helpers/format-helpers');
