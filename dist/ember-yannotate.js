(function() {

/* Require everything pls */

Ember.Yannotate = Ember.Namespace.create()
Ember.Yannotate.VERSION = '0.0.1'

if (Ember.libraries) {
  Ember.libraries.register('Ember Yannotate', Ember.Yannotate.VERSION)
}


})();
(function() {

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


})();
(function() {

Ember.Yannotate.PlayerContainer =  Ember.View.extend({
  templateName: 'yannotate-player',
  classNames: ['ember-yannotate-container']
});

Ember.Yannotate.AnnotationsContainer =  Ember.View.extend({
  classNames: ['ember-yannotate-container']
});


})();
(function() {

/*
 * Options
 *   - dimensions : 'default' | 'relative' | 'widthxheight'
 *     Example : { dimensions: '1024x768' }
 *
 *     If 'relative' is chosen, the dimensions will
 *     vary according to the screen size
 *
 *
 *   - videoId : the id of the Youtube Video as a String.
 *     Example : { videoId: 'cEA7YFDGumY' }
 */
$.fn.yannotate = function(opts) {
  new window._Yannotate(this, opts);
  return this;
}

Yannotate = window._Yannotate = (function(playerElement, opts) {
  this.opts = opts;

  YoutubeAPI.loadVideoById(this.opts.videoId);
  this.setVideoDimensions();
});

Yannotate.prototype.setVideoDimensions = (function() {
  if (this.opts.dimensions === undefined || this.opts.dimensions == 'default') {
    YoutubeAPI.scale(600, 800);
  } else if (this.opts.dimensions == 'relative') {
    YoutubeAPI.scale(((screen.height / 1.19936170213) / 1.65), ((screen.width / 1.37142857143) / 1.65));
    //    YoutubeAPI.scale(screen.height / 1.40625, screen.width / 1.875);
  } else if (dimensions = this.opts.dimensions.match(/(\d+)(?:\*|x)(\d+)/)) {
    YoutubeAPI.scale(dimensions[2], dimensions[1]);
  }

});


})();
(function() {

/*
 * Public: Youtube Iframe API Object
 */
var YoutubeIframeAPI = window._YoutubeIframeAPI = (function() {
  // Loads Youtube IFrame Player API asynchronously.
  var  firstScriptTag = document.getElementsByTagName('script')[0],
       tag            = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  this.video = {};
});

/*
 * Private: Callback called when the player is ready
 */
YoutubeIframeAPI.prototype.onPlayerReady = (function(event) {
});

/*
 * Private: Callback called when the player's state changes
 */
YoutubeIframeAPI.prototype.onPlayerStateChange = (function(event) {
   //
});


YoutubeIframeAPI.prototype.stopOnClick = (function(element) {
  var self = this;

  $(element).on('click', function() {
      self.player.stopVideo();
  })
});

YoutubeIframeAPI.prototype.loadVideoById = (function(id) {
  this.video.id = id;
});

YoutubeIframeAPI.prototype.scale = (function(height, width) {
  this.video.height = height;
  this.video.width = width;
});


// When the Youtube Iframe API is loaded, a global variable is set.
window.onYouTubeIframeAPIReady = function() {
  YoutubeAPI.player = new YT.Player('player', {
    height: YoutubeAPI.video.height,
    width: YoutubeAPI.video.width,
    videoId: YoutubeAPI.video.id,
    playerVars: {
      autohide: 1,
      wmode: 'transparent',
      theme: 'light'
    },
    events: {
      'onReady': YoutubeAPI.onPlayerReady,
      'onStateChange': YoutubeAPI.onPlayerStateChange
    }
  });
};

// Bootstraps the Youtube API and the player

window.YoutubeAPI = new window._YoutubeIframeAPI();


})();
(function() {

Ember.TEMPLATES["components/yannotate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Yannotate.PlayerContainer", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Yannotate.AnnotationsContainer", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  return buffer;
  
});

Ember.TEMPLATES["yannotate-player"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div id=\"player\"></div>");
  
});

})();