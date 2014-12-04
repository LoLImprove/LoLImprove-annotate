import config from './config/environment';
import Router from 'lolimprove-annotate/services/router';
import AnnotateMounter from 'lolimprove-annotate/services/routes-mounter';

Router.reopen({
  location: config.locationType
});

Router.map(function() {
  Router.mount(AnnotateMounter, { path: "/replays" }, this);
});

export default Router;
