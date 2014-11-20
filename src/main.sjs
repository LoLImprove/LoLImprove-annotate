LoLImprove = window.LoLImprove || Ember.Namespace.create();

LoLImprove.Annotate = Ember.Namespace.create();
LoLImprove.Annotate.VERSION = '0.0.1';

if (Ember.libraries) {
  Ember.libraries.register('LoLImprove Annotate', LoLImprove.Annotate.VERSION);
}

/* All of this LoLImprove module dependencies are required here, not using ES6 export/import */

// Lib dependencies
require('build/src/lib/jquery-yannotate');
require('build/src/lib/youtube');

// Components
require('build/src/components/annotate-component');

// Views
require('build/src/views/views');

// View specific helpers
require('build/src/views/analysis/edit-entry-helper');

// Format Helpers
require('build/src/helpers/format-helpers');
