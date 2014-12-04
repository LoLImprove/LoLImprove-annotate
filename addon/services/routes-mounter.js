/*
 * LoLImprove.Annotate.RoutesMounter
 */
export default function(router, opts) {
  var root_path = opts.path,
      show_path = '/:replay_id';

  router.resource('replays', { path: root_path }, function() {
    this.route('show', { path: show_path }, function() {
      this.route('analysis', { path: '/analysis/:id' });
    });
  });

}
