import Ember from "ember";

var get = Ember.get,
    set = Ember.set;

/*
 * This RESTAdapter makes heavy use of the record.relationsMap property.
 * This property is defined through the use of the createRelationsMap method which definition can be found in the `lib/lolimprove-model.js` file.
 */
var RESTNestedAdapter = Ember.RESTAdapter.extend({

  getParentId: function(record, relationName) {
    var idMap = record._reference.relationsMap || record.relationsMap
    if (idMap) {
      return idMap[relationName];
    } else {
      console.log(record, relationName);
      throw new Error('Ember.RESTNestedAdapter requires your model to have a relationsMap property.');
    }
  },

  find: function(record, id) {
    var url  = this.buildURL(record.constructor, record, id),
        self = this;

    return this.ajax(url).then(function(data) {
      self.didFind(record, id, data);
      return record;
    });
  },

  findAll: function(klass, records) {
    var url  = this.buildURL(klass, records[0]),
        self = this;

    return this.ajax(url).then(function(data) {
      self.didFindAll(klass, records, data);
      return records;
    });
  },

  findQuery: function(klass, records, params) {
    var url = this.buildURL(klass, records[0]),
    self = this;

    return this.ajax(url, params).then(function(data) {
      self.didFindQuery(klass, records, params, data);
      return records;
    });
  },

  createRecord: function(record) {
    var url = this.buildURL(record.constructor, record),
    self = this;

    return this.ajax(url, record.toJSON(), "POST").then(function(data) {
      self.didCreateRecord(record, data);
      return record;
    });
  },

  deleteRecord: function(record) {
    var primaryKey = get(record.constructor, 'primaryKey'),
    url = this.buildURL(record.constructor, record, get(record, primaryKey)),
    self = this;

    return this.ajax(url, record.toJSON(), "DELETE").then(function(data) {  // TODO: Some APIs may or may not return data
      self.didDeleteRecord(record, data);
    });
  },

  saveRecord: function(record) {
    var primaryKey = get(record.constructor, 'primaryKey'),
    url = this.buildURL(record.constructor, record, get(record, primaryKey)),
    self = this;

    return this.ajax(url, record.toJSON(), "PUT").then(function(data) {  // TODO: Some APIs may or may not return data
      self.didSaveRecord(record, data);
      return record;
    });
  },

  buildURL: function(klass, record, id) {
    var urlRoot = get(klass, 'url');
    var urlSuffix = get(klass, 'urlSuffix') || '';

    if (!urlRoot) { throw new Error('Ember.RESTNestedAdapter requires a `url` property to be specified'); }

    var parentName = this._getDynamicSegmentAssociatedModel(urlRoot);
    if (parentName) {
      var parent = this.getParentId(record, parentName);
      if (parent) {
        /*var parentPrimaryKey = get(parent.constructor, 'primaryKey');
        var parentId = get(parent, parentPrimaryKey);*/
        urlRoot = this._processDynamicSegment(urlRoot, parent);
      }
    }

    if (!Ember.isEmpty(id)) {
      return urlRoot + "/" + id + urlSuffix;
    } else {
      return urlRoot + urlSuffix;
    }
  },

  _getDynamicSegmentAssociatedModel: function(url) {
    var matches = url.match(/:\w+/);

    function getModelFromString(str) {
      /* :post_id => post, :analysis_post_id => analysis-post */
      return str.replace(/^:/, '').split('_').slice(0, -1).join('-');
    };

    return matches ? getModelFromString(matches[0]) : null;
  },
  // Matches /url/:dynamic_segment/something
  _processDynamicSegment: function(url, id) {
    var matches = url.match(/:\w+/);
    if (matches) {
      var segment = matches[0];
      return url.replace(segment, id);
    } else {
      throw new Error('Ember.RESTNestedAdapter `url` requires a dynamic segment');
    }
  }
});

export default RESTNestedAdapter;
