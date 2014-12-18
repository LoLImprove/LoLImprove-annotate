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
    var relations  = this.constructor.getRelationships(),
        modelName  = this.constructor.modelName,
        primaryKey = Ember.get(this.constructor, 'primaryKey'),
        id   = Ember.get(this, primaryKey),
        self = this;

    _.each(relations, function(relation) {
      var isHasMany = (Ember.Inflector.inflector.pluralize(relation) === relation),
          _key      = isHasMany ? relation + '.@each' : relation; // bit hackish

      //console.log(relation, isHasMany);

      if (isHasMany) {
        Ember.addObserver(self, _key, self, function() {
          // Here we go through each 'empty' relation and set the relationMap
          _.each(this.get( relation + '.content'), function(record) {
            self._logRelationMap(modelName, relation ,id);
            self._setRecordRelationMap(record, modelName, id);
          });
        });
      } else {
        self.addObserver(_key, self, function() {
          /* In the case of a belongsTo association we can not access the record
           * We go through the adapter instead, hooking in when the getParentId is called
           * to set the relationMap property on the record.
           */
          var relationAdapter = this.container.lookup('model:' + relation).constructor.adapter;
          var getParentIdFunc = relationAdapter.get('getParentId');

          relationAdapter.set('getParentId', function(record, relationName) {
            self._logRelationMap(modelName, relation ,id);
            self._setRecordRelationMap(record, modelName, id); // Maybe conditional ? Need to see how it when record gets updated, etc...
            return getParentIdFunc(record, relationName);
          });
        });
      }
    });

    this.set('_isMapped', true);
  },

  /* Sets the relationMap property on a record */
  _setRecordRelationMap: function(record, relation, id) {
    var _relations = record.relationsMap || {};
    _relations[Ember.Inflector.inflector.singularize(relation)] = id;
    Ember.set(record, 'relationsMap', _relations);
    return _relations;
  },

  /* Debug log */
  _logRelationMap: function(model, relation, id) {
    console.debug('Setting relationMap for ' + model + '#' + id + ' -> ' + relation);
  },
});

/*
 * If the relations are not mapped yet, we call the createRelationsMap method 5when the object is populated.
 */
export default Ember.Model.extend({
  setIsMapped: function() { this.set('_isMapped', false); }.on('init'),
  _setRelationMap: function() { if (!this.get('_isMapped')) { this.createRelationsMap.apply(this); } }.on('init')
})
