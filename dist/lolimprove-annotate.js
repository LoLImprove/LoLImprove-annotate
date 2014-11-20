(function() {

LoLImprove = window.LoLImprove || Ember.Namespace.create();
LoLImprove.Annotate = Ember.Namespace.create();
LoLImprove.Annotate.VERSION = '0.0.1';
if (Ember.libraries) {
    Ember.libraries.register('LoLImprove Annotate', LoLImprove.Annotate.VERSION);
}
/* All of this LoLImprove module dependencies are required here, not using ES6 export/import */
// Lib dependencies


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
  YoutubeAPI.setPlayerElement(playerElement[0]);

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


YoutubeIframeAPI.prototype.setPlayerElement = (function(el) {
  this.video.element = el;
});

YoutubeIframeAPI.prototype.scale = (function(height, width) {
  this.video.height = height;
  this.video.width = width;
});

YoutubeIframeAPI.prototype.createPlayer = (function() {
  if (this.video.id) {
    this.player = new YT.Player(this.video.element.id, {
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

// Components


})();
(function() {

LoLImprove.Annotate.AnnotateComponent = Ember.Component.extend({
  layoutName: 'components/annotate',

  init: function() {
    this._super();

    this.current_user = this.get("user");
    this.replay = this.get("replay");
    this.set('isCurrentAnalyst', false);
  },

  didInsertElement: function() {
    var self = this,
        replayId = self.get("replay").video_id;

    /* Youtube Annotation system (annotate) */
    $('#annotate-player').yannotate({
      videoId: replayId,
      dimensions: 'relative',
      onPlayerStarted: function() {
        self.set('isAnalysing', true);
      }
    });

    if (this.replay.user.id == this.user.id) {
      this.set('isCurrentAnalyst', true);
    }

  },

  actions: {
    startAnalysis: function() {
      this.set('isAnalysing', true);
      YoutubeAPI.player.playVideo();
    },
    addGeneralComment: function() {
      console.log('Adding general comment');
    },
    addTimeLineEntry: function() {
      console.log(YoutubeAPI.player.getCurrentTime());
    }
  }
});

Ember.Handlebars.helper('annotate-ui', LoLImprove.Annotate.AnnotateComponent);


})();
(function() {

// Views


})();
(function() {

LoLImprove.Annotate.PlayerContainer =  Ember.View.extend({
  templateName: 'annotate-player',
  classNames: ['ember-yannotate-container']
});

LoLImprove.Annotate.AnalysesContainer =  Ember.View.extend({
  templateName: 'analyses-container',
  classNames: ['analyses-container']
});

LoLImprove.Annotate.GeneralComment =  Ember.View.extend({
  templateName: 'analysis/general-comment',
  classNames: ['general-comment']
});

LoLImprove.Annotate.Timeline =  Ember.View.extend({
  tagName: 'ul',
  templateName: 'analysis/timeline',
  classNames: ['timeline']
});

LoLImprove.Annotate.TimelineEntry =  Ember.View.extend({
  tagName: 'li',
  templateName: 'analysis/timeline-entry',
  classNames: ['timeline-entry'],
  isEditingEntry: false,
  actions: {
    editEntry: function() {
      this.set('isEditingEntry', true);
    },
    saveEntry: function() {
      this.set('isEditingEntry', false);
      // TODO: Do ajax stuff or ember-model stuff
    }
  }
});


})();
(function() {

// View specific helpers


})();
(function() {

LoLImprove.Annotate.EditEntryHelper = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  },
  focusOut: function() {
    console.log('focused out');
    this.get('parentView').send('saveEntry');
  }
});

Ember.Handlebars.helper('edit-entry', LoLImprove.Annotate.EditEntryHelper);


})();
(function() {

// Format Helpers


})();
(function() {

Ember.Handlebars.registerBoundHelper('capitalize', function (string) {
    if (__isString(string)) {
        return string.capitalize();
    }
    ;
});
Ember.Handlebars.registerBoundHelper('upcase', function (string) {
    if (__isString(string)) {
        return string.toUpperCase();
    }
    ;
});
Ember.Handlebars.registerBoundHelper('excerpt', function (string, length) {
    if (typeof length == 'object') {
        var length = 50;
    }
    return string.slice(0, length) + '...';
});
function __isString(string) {
    if (typeof string === 'string') {
        return true;
    } else {
        throw 'Trying to use string method on ' + typeof string;
    }
}

})();
(function() {

Ember.TEMPLATES["analyses-container"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n  <div class=\"analysis\">\n    <div class=\"analyst-information\">\n      ");
  data.buffer.push(escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "analysis.user.name", options) : helperMissing.call(depth0, "capitalize", "analysis.user.name", options))));
  data.buffer.push("\n      <strong>");
  data.buffer.push(escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "analysis.user.league", options) : helperMissing.call(depth0, "capitalize", "analysis.user.league", options))));
  data.buffer.push("</strong>\n    </div>\n\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "LoLImprove.Annotate.GeneralComment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "LoLImprove.Annotate.Timeline", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("\n  </div>\n");
  return buffer;
  }

  stack1 = helpers.each.call(depth0, "analysis", "in", "replay.analyses", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["analysis/general-comment"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"analysis-general-comment\">\n  ");
  data.buffer.push(escapeExpression((helper = helpers.capitalize || (depth0 && depth0.capitalize),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "analysis.content.general.content", options) : helperMissing.call(depth0, "capitalize", "analysis.content.general.content", options))));
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["analysis/timeline-entry"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\n    ");
  data.buffer.push(escapeExpression((helper = helpers['edit-entry'] || (depth0 && depth0['edit-entry']),options={hash:{
    'class': ("edit-entry"),
    'value': ("entry.content")
  },hashTypes:{'class': "STRING",'value': "ID"},hashContexts:{'class': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "edit-entry", options))));
  data.buffer.push("\n  ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    <span class=\"comment\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editEntry", {hash:{
    'on': ("doubleClick"),
    'target': ("view")
  },hashTypes:{'on': "STRING",'target': "STRING"},hashContexts:{'on': depth0,'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "entry.content", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\n  ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n    ");
  stack1 = helpers['if'].call(depth0, "view.isEditingEntry", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n      <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveEntry", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Save</button>\n    ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n      <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editEntry", {hash:{
    'target': ("view")
  },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Edit</button>\n    ");
  return buffer;
  }

  data.buffer.push("<strong>");
  stack1 = helpers._triageMustache.call(depth0, "entry.time", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</strong>\n<div class=\"timeline-entry-block\">\n  ");
  stack1 = helpers['if'].call(depth0, "view.isEditingEntry", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  ");
  stack1 = helpers['if'].call(depth0, "isCurrentAnalyst", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["analysis/timeline"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n  ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "LoLImprove.Annotate.TimelineEntry", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("\n");
  return buffer;
  }

  stack1 = helpers.each.call(depth0, "entry", "in", "analysis.content.timeline", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["annotate-player"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
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

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n        <li><a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Edit</a></li>\n      ");
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
  data.buffer.push("</strong>\n</div>\n\n<div class=\"replay-container\">\n  <div id=\"annotate-player\"></div>\n</div>\n\n<div class=\"replay-data\">\n\n  <div class=\"player-information\">\n    <h3>");
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
  stack1 = helpers['if'].call(depth0, "isAnalysing", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n    <ul>\n      <li><a href=\"#\">Download LPR</a></li>\n      <li><a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Report</a></li>\n      ");
  stack1 = helpers['if'].call(depth0, "isCurrentAnalyst", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </ul>\n  </div>\n</div> <!-- replay-information -->\n");
  return buffer;
  
});

Ember.TEMPLATES["components/annotate"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression(helpers.view.call(depth0, "LoLImprove.Annotate.PlayerContainer", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "LoLImprove.Annotate.AnalysesContainer", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  return buffer;
  
});

})();