import Ember from "ember";

Ember.Model.reopen({
  /*
   * Creates a relationMap for each association on a model.
   *
   *   For this to work you need to provide a modelName property on your models:
   *
   *     MyModel = Model.extend();
   *
   *     MyModel.modelName = 'my-model'; // <--- Do not forget !
   *
   *     MyModel.url = 'some/resource/url';
   *     MyModel.adapter = SomeAdapter.create();
   *
   *
   *   If we have a `replay` model with a `user` relation and a `analysis` relation,
   *   for each of these relation, a `relationsMap` property will be set.
   *   On each model it will look like this :
   *
   *     relationsMap: {
   *       replay: 2,
   *       // probably some other relations ...
   *     }
   *
   *   It can be accessed from any record with :
   *   `record.get('relationsMap')`
   *   or
   *   `record._reference.relationsMap`
   *
   */
  createRelationsMap: function() {
    var relations = this.constructor.getRelationships();
    var self = this;

    _.each(relations, function(relation) {
      var isHasMany = (Ember.Inflector.inflector.pluralize(relation) == relation),
          _key      = isHasMany ? relation + '.@each' : relation + '.isLoaded'; // bit hackish

      Ember.addObserver(self, _key, self, function() {
        var primaryKey = Ember.get(this.constructor, 'primaryKey'),
            id = self.get(primaryKey);

        if (isHasMany) {
          _.each(this.get( relation + '.content'), function(record) {
            self._setRecordRelationMap(record, self.constructor.modelName, id);
          });
        } else {
          var record = this.get(relation);
          self._setRecordRelationMap(record, self.constructor.modelName, id);
        }
      });
    });

    this.set('_isMapped', true);
  },

  _setRecordRelationMap: function(record, relation, id) {
    var _relations = record.relationsMap || {}
    _relations[Ember.Inflector.inflector.singularize(relation)] = id;
    Ember.set(record, 'relationsMap', _relations);
    return _relations;
  },
});

/*
 * If the relations are not mapped yet, we call the createRelationsMap method when the object is populated.
 */
export default Ember.Model.extend({
  setIsMapped: function() { this.set('_isMapped', false); }.on('init'),
  _setRelationMap: function() { if (!this.get('_isMapped')) { this.createRelationsMap.apply(this); } }.observes('_data')
})
