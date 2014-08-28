/*
 * Public: Youtube Iframe API Object
 */
var YoutubeIframeAPI = (function() {
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
  console.log('PlayerStatechange');
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
function onYouTubeIframeAPIReady() {
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

var YoutubeAPI = new YoutubeIframeAPI();
