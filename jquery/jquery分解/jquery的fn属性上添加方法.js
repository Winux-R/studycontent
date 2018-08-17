jQuery.fn.extend({
  find: function (selector) {
    var i, ret = [], self = this, len = self.length;
    if (typeof selector !== "string") {
      return this.pushStack(jQuery(selector).filter(function () {
        for (i = 0; i < len; i++) {
          if (jQuery.contains(self[i], this)) {
            return true;
          }
        }
      }));
    }
    for (i = 0; i < len; i++) {
      jQuery.find(selector, self[i], ret);
    }
    ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
    ret.selector = this.selector ? this.selector + " " + selector : selector;
    return ret;
  },
  filter: function (selector) {
    return this.pushStack(winnow(this, selector || [], false));
  },
  not: function (selector) {
    return this.pushStack(winnow(this, selector || [], true));
  },
  is: function (selector) {
    return !!winnow(
      this,
      typeof selector === "string" && rneedsContext.test(selector) ?
        jQuery(selector) :
        selector || [],
      false
    ).length;
  },
  has: function (target) {
    var i,
      targets = jQuery(target, this),
      len = targets.length;
    return this.filter(function () {
      for (i = 0; i < len; i++) {
        if (jQuery.contains(this, targets[i])) {
          return true;
        }
      }
    });
  },
  closest: function (selectors, context) {
    var cur,
      i = 0,
      l = this.length,
      matched = [],
      pos = rneedsContext.test(selectors) || typeof selectors !== "string" ?
        jQuery(selectors, context || this.context) :
        0;
    for (; i < l; i++) {
      for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
        if (cur.nodeType < 11 && (pos ?
            pos.index(cur) > -1 :
            cur.nodeType === 1 &&
            jQuery.find.matchesSelector(cur, selectors))) {
          matched.push(cur);
          break;
        }
      }
    }
    return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
  },
  index: function (elem) {
    if (!elem) {
      return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
    }
    if (typeof elem === "string") {
      return jQuery.inArray(this[0], jQuery(elem));
    }
    return jQuery.inArray(
      elem.jquery ? elem[0] : elem, this);
  },
  add: function (selector, context) {
    return this.pushStack(
      jQuery.unique(
        jQuery.merge(this.get(), jQuery(selector, context))
      )
    );
  },
  addBack: function (selector) {
    return this.add(selector == null ?
      this.prevObject : this.prevObject.filter(selector)
    );
  },
  data: function (key, value) {
    var i, name, data,
      elem = this[0],
      attrs = elem && elem.attributes;
    if (key === undefined) {
      if (this.length) {
        data = jQuery.data(elem);
        if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
          i = attrs.length;
          while (i--) {
            if (attrs[i]) {
              name = attrs[i].name;
              if (name.indexOf("data-") === 0) {
                name = jQuery.camelCase(name.slice(5));
                dataAttr(elem, name, data[name]);
              }
            }
          }
          jQuery._data(elem, "parsedAttrs", true);
        }
      }
      return data;
    }
    if (typeof key === "object") {
      return this.each(function () {
        jQuery.data(this, key);
      });
    }
    return arguments.length > 1 ?
      this.each(function () {
        jQuery.data(this, key, value);
      }) :
      elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined;
  },
  removeData: function (key) {
    return this.each(function () {
      jQuery.removeData(this, key);
    });
  },
  queue: function (type, data) {
    var setter = 2;
    if (typeof type !== "string") {
      data = type;
      type = "fx";
      setter--;
    }
    if (arguments.length < setter) {
      return jQuery.queue(this[0], type);
    }
    return data === undefined ?
      this :
      this.each(function () {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
  },
  dequeue: function (type) {
    return this.each(function () {
      jQuery.dequeue(this, type);
    });
  },
  clearQueue: function (type) {
    return this.queue(type || "fx", []);
  },
  promise: function (type, obj) {
    var tmp,
      count = 1,
      defer = jQuery.Deferred(),
      elements = this,
      i = this.length,
      resolve = function () {
        if (!(--count)) {
          defer.resolveWith(elements, [elements]);
        }
      };
    if (typeof type !== "string") {
      obj = type;
      type = undefined;
    }
    type = type || "fx";
    while (i--) {
      tmp = jQuery._data(elements[i], type + "queueHooks");
      if (tmp && tmp.empty) {
        count++;
        tmp.empty.add(resolve);
      }
    }
    resolve();
    return defer.promise(obj);
  },
  on: function (types, selector, data, fn, one) {
    var type, origFn;
    if (typeof types === "object") {
      if (typeof selector !== "string") {
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        this.on(type, selector, data, types[type], one);
      }
      return this;
    }
    if (data == null && fn == null) {
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        fn = data;
        data = undefined;
      } else {
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return this;
    }
    if (one === 1) {
      origFn = fn;
      fn = function (event) {
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return this.each(function () {
      jQuery.event.add(this, types, fn, data, selector);
    });
  },
  one: function (types, selector, data, fn) {
    return this.on(types, selector, data, fn, 1);
  },
  off: function (types, selector, fn) {
    var handleObj, type;
    if (types && types.preventDefault && types.handleObj) {
      handleObj = types.handleObj;
      jQuery(types.delegateTarget).off(
        handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
        handleObj.selector,
        handleObj.handler
      );
      return this;
    }
    if (typeof types === "object") {
      for (type in types) {
        this.off(type, selector, types[type]);
      }
      return this;
    }
    if (selector === false || typeof selector === "function") {
      fn = selector;
      selector = undefined;
    }
    if (fn === false) {
      fn = returnFalse;
    }
    return this.each(function () {
      jQuery.event.remove(this, types, fn, selector);
    });
  },
  trigger: function (type, data) {
    return this.each(function () {
      jQuery.event.trigger(type, data, this);
    });
  },
  triggerHandler: function (type, data) {
    var elem = this[0];
    if (elem) {
      return jQuery.event.trigger(type, data, elem, true);
    }
  },
  text: function (value) {
    return access(this, function (value) {
      return value === undefined ?
        jQuery.text(this) :
        this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
    }, null, value, arguments.length);
  },
  append: function () {
    return this.domManip(arguments, function (elem) {
      if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
        var target = manipulationTarget(this, elem);
        target.appendChild(elem);
      }
    });
  },
  prepend: function () {
    return this.domManip(arguments, function (elem) {
      if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
        var target = manipulationTarget(this, elem);
        target.insertBefore(elem, target.firstChild);
      }
    });
  },
  before: function () {
    return this.domManip(arguments, function (elem) {
      if (this.parentNode) {
        this.parentNode.insertBefore(elem, this);
      }
    });
  },
  after: function () {
    return this.domManip(arguments, function (elem) {
      if (this.parentNode) {
        this.parentNode.insertBefore(elem, this.nextSibling);
      }
    });
  },
  remove: function (selector, keepData) {
    var elem,
      elems = selector ? jQuery.filter(selector, this) : this,
      i = 0;
    for (; (elem = elems[i]) != null; i++) {
      if (!keepData && elem.nodeType === 1) {
        jQuery.cleanData(getAll(elem));
      }
      if (elem.parentNode) {
        if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
          setGlobalEval(getAll(elem, "script"));
        }
        elem.parentNode.removeChild(elem);
      }
    }
    return this;
  },
  empty: function () {
    var elem,
      i = 0;
    for (; (elem = this[i]) != null; i++) {
      if (elem.nodeType === 1) {
        jQuery.cleanData(getAll(elem, false));
      }
      while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
      }
      if (elem.options && jQuery.nodeName(elem, "select")) {
        elem.options.length = 0;
      }
    }
    return this;
  },
  clone: function (dataAndEvents, deepDataAndEvents) {
    dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
    deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
    return this.map(function () {
      return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
    });
  },
  html: function (value) {
    return access(this, function (value) {
      var elem = this[0] || {},
        i = 0,
        l = this.length;
      if (value === undefined) {
        return elem.nodeType === 1 ?
          elem.innerHTML.replace(rinlinejQuery, "") :
          undefined;
      }
      if (typeof value === "string" && !rnoInnerhtml.test(value) &&
        (support.htmlSerialize || !rnoshimcache.test(value)) &&
        (support.leadingWhitespace || !rleadingWhitespace.test(value)) &&
        !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
        value = value.replace(rxhtmlTag, "<$1></$2>");
        try {
          for (; i < l; i++) {
            elem = this[i] || {};
            if (elem.nodeType === 1) {
              jQuery.cleanData(getAll(elem, false));
              elem.innerHTML = value;
            }
          }
          elem = 0;
        } catch (e) {
        }
      }
      if (elem) {
        this.empty().append(value);
      }
    }, null, value, arguments.length);
  },
  replaceWith: function () {
    var arg = arguments[0];
    this.domManip(arguments, function (elem) {
      arg = this.parentNode;
      jQuery.cleanData(getAll(this));
      if (arg) {
        arg.replaceChild(elem, this);
      }
    });
    return arg && (arg.length || arg.nodeType) ? this : this.remove();
  },
  detach: function (selector) {
    return this.remove(selector, true);
  },
  domManip: function (args, callback) {
    args = concat.apply([], args);
    var first, node, hasScripts,
      scripts, doc, fragment,
      i = 0,
      l = this.length,
      set = this,
      iNoClone = l - 1,
      value = args[0],
      isFunction = jQuery.isFunction(value);
    if (isFunction ||
      (l > 1 && typeof value === "string" &&
        !support.checkClone && rchecked.test(value))) {
      return this.each(function (index) {
        var self = set.eq(index);
        if (isFunction) {
          args[0] = value.call(this, index, self.html());
        }
        self.domManip(args, callback);
      });
    }
    if (l) {
      fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first;
      }
      if (first) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);
            if (hasScripts) {
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(this[i], node, i);
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;
          jQuery.map(scripts, restoreScript);
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") &&
              !jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src) {
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""));
              }
            }
          }
        }
        fragment = first = null;
      }
    }
    return this;
  },
  css: function (name, value) {
    return access(this, function (elem, name, value) {
      var styles, len,
        map = {},
        i = 0;
      if (jQuery.isArray(name)) {
        styles = getStyles(elem);
        len = name.length;
        for (; i < len; i++) {
          map[name[i]] = jQuery.css(elem, name[i], false, styles);
        }
        return map;
      }
      return value !== undefined ?
        jQuery.style(elem, name, value) :
        jQuery.css(elem, name);
    }, name, value, arguments.length > 1);
  },
  show: function () {
    return showHide(this, true);
  },
  hide: function () {
    return showHide(this);
  },
  toggle: function (state) {
    if (typeof state === "boolean") {
      return state ? this.show() : this.hide();
    }
    return this.each(function () {
      if (isHidden(this)) {
        jQuery(this).show();
      } else {
        jQuery(this).hide();
      }
    });
  },
  fadeTo: function (speed, to, easing, callback) {
    return this.filter(isHidden).css("opacity", 0).show()
      .end().animate({opacity: to}, speed, easing, callback);
  },
  animate: function (prop, speed, easing, callback) {
    var empty = jQuery.isEmptyObject(prop),
      optall = jQuery.speed(speed, easing, callback),
      doAnimation = function () {
        var anim = Animation(this, jQuery.extend({}, prop), optall);
        if (empty || jQuery._data(this, "finish")) {
          anim.stop(true);
        }
      };
    doAnimation.finish = doAnimation;
    return empty || optall.queue === false ?
      this.each(doAnimation) :
      this.queue(optall.queue, doAnimation);
  },
  stop: function (type, clearQueue, gotoEnd) {
    var stopQueue = function (hooks) {
      var stop = hooks.stop;
      delete hooks.stop;
      stop(gotoEnd);
    };
    if (typeof type !== "string") {
      gotoEnd = clearQueue;
      clearQueue = type;
      type = undefined;
    }
    if (clearQueue && type !== false) {
      this.queue(type || "fx", []);
    }
    return this.each(function () {
      var dequeue = true,
        index = type != null && type + "queueHooks",
        timers = jQuery.timers,
        data = jQuery._data(this);
      if (index) {
        if (data[index] && data[index].stop) {
          stopQueue(data[index]);
        }
      } else {
        for (index in data) {
          if (data[index] && data[index].stop && rrun.test(index)) {
            stopQueue(data[index]);
          }
        }
      }
      for (index = timers.length; index--;) {
        if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
          timers[index].anim.stop(gotoEnd);
          dequeue = false;
          timers.splice(index, 1);
        }
      }
      if (dequeue || !gotoEnd) {
        jQuery.dequeue(this, type);
      }
    });
  },
  finish: function (type) {
    if (type !== false) {
      type = type || "fx";
    }
    return this.each(function () {
      var index,
        data = jQuery._data(this),
        queue = data[type + "queue"],
        hooks = data[type + "queueHooks"],
        timers = jQuery.timers,
        length = queue ? queue.length : 0;
      data.finish = true;
      jQuery.queue(this, type, []);
      if (hooks && hooks.stop) {
        hooks.stop.call(this, true);
      }
      for (index = timers.length; index--;) {
        if (timers[index].elem === this && timers[index].queue === type) {
          timers[index].anim.stop(true);
          timers.splice(index, 1);
        }
      }
      for (index = 0; index < length; index++) {
        if (queue[index] && queue[index].finish) {
          queue[index].finish.call(this);
        }
      }
      delete data.finish;
    });
  },
  val: function (value) {
    var hooks, ret, isFunction,
      elem = this[0];
    if (!arguments.length) {
      if (elem) {
        hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
        if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
          return ret;
        }
        ret = elem.value;
        return typeof ret === "string" ?
          ret.replace(rreturn, "") :
          ret == null ? "" : ret;
      }
      return;
    }
    isFunction = jQuery.isFunction(value);
    return this.each(function (i) {
      var val;
      if (this.nodeType !== 1) {
        return;
      }
      if (isFunction) {
        val = value.call(this, i, jQuery(this).val());
      } else {
        val = value;
      }
      if (val == null) {
        val = "";
      } else if (typeof val === "number") {
        val += "";
      } else if (jQuery.isArray(val)) {
        val = jQuery.map(val, function (value) {
          return value == null ? "" : value + "";
        });
      }
      hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
      if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
        this.value = val;
      }
    });
  },
  attr: function (name, value) {
    return access(this, jQuery.attr, name, value, arguments.length > 1);
  },
  removeAttr: function (name) {
    return this.each(function () {
      jQuery.removeAttr(this, name);
    });
  },
  prop: function (name, value) {
    return access(this, jQuery.prop, name, value, arguments.length > 1);
  },
  removeProp: function (name) {
    name = jQuery.propFix[name] || name;
    return this.each(function () {
      try {
        this[name] = undefined;
        delete this[name];
      } catch (e) {
      }
    });
  },
  addClass: function (value) {
    var classes, elem, cur, clazz, j, finalValue,
      i = 0,
      len = this.length,
      proceed = typeof value === "string" && value;
    if (jQuery.isFunction(value)) {
      return this.each(function (j) {
        jQuery(this).addClass(value.call(this, j, this.className));
      });
    }
    if (proceed) {
      classes = (value || "").match(rnotwhite) || [];
      for (; i < len; i++) {
        elem = this[i];
        cur = elem.nodeType === 1 && (elem.className ?
            (" " + elem.className + " ").replace(rclass, " ") :
            " "
        );
        if (cur) {
          j = 0;
          while ((clazz = classes[j++])) {
            if (cur.indexOf(" " + clazz + " ") < 0) {
              cur += clazz + " ";
            }
          }
          finalValue = jQuery.trim(cur);
          if (elem.className !== finalValue) {
            elem.className = finalValue;
          }
        }
      }
    }
    return this;
  },
  removeClass: function (value) {
    var classes, elem, cur, clazz, j, finalValue,
      i = 0,
      len = this.length,
      proceed = arguments.length === 0 || typeof value === "string" && value;
    if (jQuery.isFunction(value)) {
      return this.each(function (j) {
        jQuery(this).removeClass(value.call(this, j, this.className));
      });
    }
    if (proceed) {
      classes = (value || "").match(rnotwhite) || [];
      for (; i < len; i++) {
        elem = this[i];
        cur = elem.nodeType === 1 && (elem.className ?
            (" " + elem.className + " ").replace(rclass, " ") :
            ""
        );
        if (cur) {
          j = 0;
          while ((clazz = classes[j++])) {
            while (cur.indexOf(" " + clazz + " ") >= 0) {
              cur = cur.replace(" " + clazz + " ", " ");
            }
          }
          finalValue = value ? jQuery.trim(cur) : "";
          if (elem.className !== finalValue) {
            elem.className = finalValue;
          }
        }
      }
    }
    return this;
  },
  toggleClass: function (value, stateVal) {
    var type = typeof value;
    if (typeof stateVal === "boolean" && type === "string") {
      return stateVal ? this.addClass(value) : this.removeClass(value);
    }
    if (jQuery.isFunction(value)) {
      return this.each(function (i) {
        jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
      });
    }
    return this.each(function () {
      if (type === "string") {
        var className,
          i = 0,
          self = jQuery(this),
          classNames = value.match(rnotwhite) || [];
        while ((className = classNames[i++])) {
          if (self.hasClass(className)) {
            self.removeClass(className);
          } else {
            self.addClass(className);
          }
        }
      } else if (type === strundefined || type === "boolean") {
        if (this.className) {
          jQuery._data(this, "__className__", this.className);
        }
        this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
      }
    });
  },
  hasClass: function (selector) {
    var className = " " + selector + " ",
      i = 0,
      l = this.length;
    for (; i < l; i++) {
      if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
        return true;
      }
    }
    return false;
  },
  hover: function (fnOver, fnOut) {
    return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
  },
  bind: function (types, data, fn) {
    return this.on(types, null, data, fn);
  },
  unbind: function (types, fn) {
    return this.off(types, null, fn);
  },
  delegate: function (selector, types, data, fn) {
    return this.on(types, selector, data, fn);
  },
  undelegate: function (selector, types, fn) {
    return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
  },
  wrapAll: function (html) {
    if (jQuery.isFunction(html)) {
      return this.each(function (i) {
        jQuery(this).wrapAll(html.call(this, i));
      });
    }
    if (this[0]) {
      var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
      if (this[0].parentNode) {
        wrap.insertBefore(this[0]);
      }
      wrap.map(function () {
        var elem = this;
        while (elem.firstChild && elem.firstChild.nodeType === 1) {
          elem = elem.firstChild;
        }
        return elem;
      }).append(this);
    }
    return this;
  },
  wrapInner: function (html) {
    if (jQuery.isFunction(html)) {
      return this.each(function (i) {
        jQuery(this).wrapInner(html.call(this, i));
      });
    }
    return this.each(function () {
      var self = jQuery(this),
        contents = self.contents();
      if (contents.length) {
        contents.wrapAll(html);
      } else {
        self.append(html);
      }
    });
  },
  wrap: function (html) {
    var isFunction = jQuery.isFunction(html);
    return this.each(function (i) {
      jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
    });
  },
  unwrap: function () {
    return this.parent().each(function () {
      if (!jQuery.nodeName(this, "body")) {
        jQuery(this).replaceWith(this.childNodes);
      }
    }).end();
  },
  serialize: function () {
    return jQuery.param(this.serializeArray());
  },
  serializeArray: function () {
    return this.map(function () {
      var elements = jQuery.prop(this, "elements");
      return elements ? jQuery.makeArray(elements) : this;
    })
      .filter(function () {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") &&
          rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
          (this.checked || !rcheckableType.test(type));
      })
      .map(function (i, elem) {
        var val = jQuery(this).val();
        return val == null ?
          null :
          jQuery.isArray(val) ?
            jQuery.map(val, function (val) {
              return {name: elem.name, value: val.replace(rCRLF, "\r\n")};
            }) :
            {name: elem.name, value: val.replace(rCRLF, "\r\n")};
      }).get();
  },
  offset: function (options) {
    if (arguments.length) {
      return options === undefined ?
        this :
        this.each(function (i) {
          jQuery.offset.setOffset(this, options, i);
        });
    }
    var docElem, win,
      box = {top: 0, left: 0},
      elem = this[0],
      doc = elem && elem.ownerDocument;
    if (!doc) {
      return;
    }
    docElem = doc.documentElement;
    if (!jQuery.contains(docElem, elem)) {
      return box;
    }
    if (typeof elem.getBoundingClientRect !== strundefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
      left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
    };
  },
  position: function () {
    if (!this[0]) {
      return;
    }
    var offsetParent, offset,
      parentOffset = {top: 0, left: 0},
      elem = this[0];
    if (jQuery.css(elem, "position") === "fixed") {
      offset = elem.getBoundingClientRect();
    } else {
      offsetParent = this.offsetParent();
      offset = this.offset();
      if (!jQuery.nodeName(offsetParent[0], "html")) {
        parentOffset = offsetParent.offset();
      }
      parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
      parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
    }
    return {
      top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
      left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
    };
  },
  offsetParent: function () {
    return this.map(function () {
      var offsetParent = this.offsetParent || docElem;
      while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docElem;
    });
  }
});
jQuery.fn.ready = function (fn) {
  jQuery.ready.promise().done(fn);
  return this;
};
jQuery.fn.delay = function (time, type) {
  time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
  type = type || "fx";
  return this.queue(type, function (next, hooks) {
    var timeout = setTimeout(next, time);
    hooks.stop = function () {
      clearTimeout(timeout);
    };
  });
};
jQuery.fn.size = function () {
  return this.length;
};
jQuery.fn.andSelf = jQuery.fn.addBack;