import Ember from "ember";

/*
 * LoLImprove.Annotate.TimelineView
 */
export default Ember.CollectionView.extend({
  tagName: 'ul',
  classNames: ['li-timeline'],
  itemViewClass: 'analysis/timeline-entry'
});
