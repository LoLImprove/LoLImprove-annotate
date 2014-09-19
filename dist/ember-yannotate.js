(function() {

/* Require everything pls */

Ember.Yannotate = Ember.Namespace.create()
Ember.Yannotate.VERSION = '0.0.1'

if (Ember.libraries) {
  Ember.libraries.register('Ember Yannotate', Ember.Yannotate.VERSION)
}


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

  // Callback
  YoutubeAPI.onPlayerStarted = this.opts.onPlayerStarted;

  this.setVideoDimensions();

  if (YoutubeAPI.ready && YoutubeAPI.player === undefined) {
    YoutubeAPI.createPlayer();
  }
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
  this.ready = false;
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
  switch(event.data) {
  case YT.PlayerState.ENDED:
    //
    break;
  case YT.PlayerState.PLAYING:
    YoutubeAPI.onPlayerStarted();
    break;
  case YT.PlayerState.PAUSED:
    //
    break;
  case YT.PlayerState.BUFFERING:
    //
    break;
  case YT.PlayerState.CUED:
      //
    break;
  }
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

YoutubeIframeAPI.prototype.createPlayer = (function() {
  if (this.video.id) {
    this.player = new YT.Player('yannotate-player', {
      height: this.video.height,
      width: this.video.width,
      videoId: this.video.id,
      playerVars: {
        autohide: 1,
        wmode: 'transparent',
        theme: 'light'
      },
      events: {
        'onReady': this.onPlayerReady,
        'onStateChange': this.onPlayerStateChange
      }
    });
  }
});

// When the Youtube Iframe API is loaded, a global variable is set.
window.onYouTubeIframeAPIReady = function() {
  YoutubeAPI.ready = true;
  YoutubeAPI.createPlayer();
};


// Bootstraps the Youtube API and the player

window.YoutubeAPI = new window._YoutubeIframeAPI();


})();
(function() {

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


})();
(function() {

Ember.Yannotate.YannotateComponent = Ember.Component.extend({
  layoutName: 'components/yannotate',
  init: function() {
    this._super();

    this.current_user = this.get("user");
    this.replay = this.get("replay");
  },

  didInsertElement: function() {
    var self = this,
        replayId = self.get("replay").video_id;

    $('#yannotate-player').yannotate({
      videoId: replayId,
      dimensions: 'relative',
      onPlayerStarted: function() {
        self.set('isAnalysing', true);
      }
    });
  },
  actions: {
    startAnalysis: function() {
      this.set('isAnalysing', true);
      YoutubeAPI.player.playVideo();
    },
    addTimeLineEntry: function() {
      console.log(YoutubeAPI.player.getCurrentTime())
    }
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
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n      <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addGeneralComment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Add a general comment</button>\n      <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addTimeLineEntry", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Add an entry to timeline</button>\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n      <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "startAnalysis", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Analyse !</button>\n    ");
  return buffer;
  }

  data.buffer.push("<div class=\"replay-header\">\n  <h2>");
  data.buffer.push(escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "replay.champion", options) : helperMissing.call(depth0, "capitalize", "replay.champion", options))));
  data.buffer.push(" vs ");
  data.buffer.push(escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "replay.matchup", options) : helperMissing.call(depth0, "capitalize", "replay.matchup", options))));
  data.buffer.push(" - ");
  data.buffer.push(escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "replay.lane", options) : helperMissing.call(depth0, "capitalize", "replay.lane", options))));
  data.buffer.push(" lane</h2>\n  <strong class=\"replay-match-result\">");
  data.buffer.push(escapeExpression((helper = helpers.upcase || (depth0 && depth0.upcase),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "replay.result", options) : helperMissing.call(depth0, "upcase", "replay.result", options))));
  data.buffer.push("</strong>\n</div>\n\n<div class=\"replay-container\">\n  <div id=\"yannotate-player\"></div>\n</div>\n\n<div class=\"replay-data\">\n\n  <div class=\"player-information\">\n    <h3>");
  data.buffer.push(escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "replay.user.name", options) : helperMissing.call(depth0, "capitalize", "replay.user.name", options))));
  data.buffer.push("</h3>\n    <strong class=\"player-league\">");
  data.buffer.push(escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "replay.user.league", options) : helperMissing.call(depth0, "capitalize", "replay.user.league", options))));
  data.buffer.push("</strong>\n  </div>\n\n  <div class=\"replay-description\">\n    ");
  data.buffer.push(escapeExpression((helper = helpers.excerpt || (depth0 && depth0.excerpt),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "replay.description", options) : helperMissing.call(depth0, "excerpt", "replay.description", options))));
  data.buffer.push("\n  </div>\n\n  <div class=\"replay-information\">\n    <ul>\n      <li>");
  stack1 = helpers._triageMustache.call(depth0, "replay.kda.k", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("/");
  stack1 = helpers._triageMustache.call(depth0, "replay.kda.d", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("//");
  stack1 = helpers._triageMustache.call(depth0, "replay.kda.a", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n      <li>");
  stack1 = helpers._triageMustache.call(depth0, "replay.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n      <li>");
  stack1 = helpers._triageMustache.call(depth0, "replay.patch", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n    </ul>\n  </div>\n\n  <div class=\"replay-toolbar\">\n    ");
  stack1 = helpers._triageMustache.call(depth0, "poney", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  stack1 = helpers['if'].call(depth0, "isAnalysing", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n</div> <!-- replay-information -->\n");
  return buffer;
  
});

})();