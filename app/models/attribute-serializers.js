var Serializers = {};

Serializers.Boolean = {
  serialize: function(data) {
    return Boolean(data); // Make sure it's a before serializing it
  },

  deserialize: function(data) {
    var type = typeof data;
    if (type === "boolean") {
      return data;
    } else if (type === "string") {
      return data.match(/^true$|^t$|^1$/i) !== null;
    } else if (type === "number") {
      return data === 1;
    } else {
      return false;
    }
  }
};

export default Serializers;
