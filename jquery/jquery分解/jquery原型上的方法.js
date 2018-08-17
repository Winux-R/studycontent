jQuery.fn = jQuery.prototype = {
  jquery: version,
  //为了保证原型的完整性，将jQuery对象指向constructor
  constructor: jQuery,
  selector: "",
  length: 0,
  toArray: function () {
    return slice.call(this);
  },
  get: function (num) {
    return num != null ?
      (num < 0 ? this[num + this.length] : this[num]) :
      slice.call(this);
  },
  pushStack: function (elems) {
    var ret = jQuery.merge(this.constructor(), elems);
    ret.prevObject = this;
    ret.context = this.context;
    return ret;
  },
  each: function (callback, args) {
    return jQuery.each(this, callback, args);
  },
  map: function (callback) {
    return this.pushStack(jQuery.map(this, function (elem, i) {
      return callback.call(elem, i, elem);
    }));
  },
  slice: function () {
    return this.pushStack(slice.apply(this, arguments));
  },
  first: function () {
    return this.eq(0);
  },
  last: function () {
    return this.eq(-1);
  },
  eq: function (i) {
    var len = this.length,
      j = +i + (i < 0 ? len : 0);
    return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
  },
  end: function () {
    return this.prevObject || this.constructor(null);
  },
  push: push,
  sort: deletedIds.sort,
  splice: deletedIds.splice,
};