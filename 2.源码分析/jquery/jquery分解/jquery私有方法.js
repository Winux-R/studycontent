jQuery.extend({
  expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
  guid: 1,
  support: support,
  isReady: true,
  error: function (msg) {
    throw new Error(msg);
  },
  noop: function () {
  },
  isFunction: function (obj) {
    return jQuery.type(obj) === "function";
  },
  isArray: Array.isArray || function (obj) {
    return jQuery.type(obj) === "array";
  },
  isWindow: function (obj) {
    return obj != null && obj == obj.window;
  },
  isNumeric: function (obj) {
    return !jQuery.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
  },
  isEmptyObject: function (obj) {
    var name;
    for (name in obj) {
      return false;
    }
    return true;
  },
  isPlainObject: function (obj) {
    var key;
    if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
      return false;
    }
    try {
      if (obj.constructor &&
        !hasOwn.call(obj, "constructor") &&
        !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
    } catch (e) {
      return false;
    }
    if (support.ownLast) {
      for (key in obj) {
        return hasOwn.call(obj, key);
      }
    }
    for (key in obj) {
    }
    return key === undefined || hasOwn.call(obj, key);
  },
  type: function (obj) {
    if (obj == null) {
      return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[toString.call(obj)] || "object" :
      typeof obj;
  },
  globalEval: function (data) {
    if (data && jQuery.trim(data)) {
      (window.execScript || function (data) {
        window["eval"].call(window, data);
      })(data);
    }
  },
  camelCase: function (string) {
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
  },
  nodeName: function (elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  },
  each: function (obj, callback, args) {
    var value,
      i = 0,
      length = obj.length,
      isArray = isArraylike(obj);
    if (args) {
      if (isArray) {
        for (; i < length; i++) {
          value = callback.apply(obj[i], args);
          if (value === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          value = callback.apply(obj[i], args);
          if (value === false) {
            break;
          }
        }
      }
    } else {
      if (isArray) {
        for (; i < length; i++) {
          value = callback.call(obj[i], i, obj[i]);
          if (value === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          value = callback.call(obj[i], i, obj[i]);
          if (value === false) {
            break;
          }
        }
      }
    }
    return obj;
  },
  trim: function (text) {
    return text == null ?
      "" :
      (text + "").replace(rtrim, "");
  },
  makeArray: function (arr, results) {
    var ret = results || [];
    if (arr != null) {
      if (isArraylike(Object(arr))) {
        jQuery.merge(ret,
          typeof arr === "string" ?
            [arr] : arr
        );
      } else {
        push.call(ret, arr);
      }
    }
    return ret;
  },
  inArray: function (elem, arr, i) {
    var len;
    if (arr) {
      if (indexOf) {
        return indexOf.call(arr, elem, i);
      }
      len = arr.length;
      i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
      for (; i < len; i++) {
        if (i in arr && arr[i] === elem) {
          return i;
        }
      }
    }
    return -1;
  },
  merge: function (first, second) {
    var len = +second.length,
      j = 0,
      i = first.length;
    while (j < len) {
      first[i++] = second[j++];
    }
    if (len !== len) {
      while (second[j] !== undefined) {
        first[i++] = second[j++];
      }
    }
    first.length = i;
    return first;
  },
  grep: function (elems, callback, invert) {
    var callbackInverse,
      matches = [],
      i = 0,
      length = elems.length,
      callbackExpect = !invert;
    for (; i < length; i++) {
      callbackInverse = !callback(elems[i], i);
      if (callbackInverse !== callbackExpect) {
        matches.push(elems[i]);
      }
    }
    return matches;
  },
  map: function (elems, callback, arg) {
    var value,
      i = 0,
      length = elems.length,
      isArray = isArraylike(elems),
      ret = [];
    if (isArray) {
      for (; i < length; i++) {
        value = callback(elems[i], i, arg);
        if (value != null) {
          ret.push(value);
        }
      }
    } else {
      for (i in elems) {
        value = callback(elems[i], i, arg);
        if (value != null) {
          ret.push(value);
        }
      }
    }
    return concat.apply([], ret);
  },
  proxy: function (fn, context) {
    var args, proxy, tmp;
    if (typeof context === "string") {
      tmp = fn[context];
      context = fn;
      fn = tmp;
    }
    if (!jQuery.isFunction(fn)) {
      return undefined;
    }
    args = slice.call(arguments, 2);
    proxy = function () {
      return fn.apply(context || this, args.concat(slice.call(arguments)));
    };
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;
    return proxy;
  },
  now: function () {
    return +(new Date());
  },
  dir: function (elem, dir, until) {
    var matched = [],
      cur = elem[dir];
    while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
      if (cur.nodeType === 1) {
        matched.push(cur);
      }
      cur = cur[dir];
    }
    return matched;
  },
  sibling: function (n, elem) {
    var r = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        r.push(n);
      }
    }
    return r;
  },
  Deferred: function (func) {
    var tuples = [
        ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
        ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
        ["notify", "progress", jQuery.Callbacks("memory")]
      ],
      state = "pending",
      promise = {
        state: function () {
          return state;
        },
        always: function () {
          deferred.done(arguments).fail(arguments);
          return this;
        },
        then: function () {
          var fns = arguments;
          return jQuery.Deferred(function (newDefer) {
            jQuery.each(tuples, function (i, tuple) {
              var fn = jQuery.isFunction(fns[i]) && fns[i];
              deferred[tuple[1]](function () {
                var returned = fn && fn.apply(this, arguments);
                if (returned && jQuery.isFunction(returned.promise)) {
                  returned.promise()
                    .done(newDefer.resolve)
                    .fail(newDefer.reject)
                    .progress(newDefer.notify);
                } else {
                  newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                }
              });
            });
            fns = null;
          }).promise();
        },
        promise: function (obj) {
          return obj != null ? jQuery.extend(obj, promise) : promise;
        }
      },
      deferred = {};
    promise.pipe = promise.then;
    jQuery.each(tuples, function (i, tuple) {
      var list = tuple[2],
        stateString = tuple[3];
      promise[tuple[1]] = list.add;
      if (stateString) {
        list.add(function () {
          state = stateString;
        }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
      }
      deferred[tuple[0]] = function () {
        deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
        return this;
      };
      deferred[tuple[0] + "With"] = list.fireWith;
    });
    promise.promise(deferred);
    if (func) {
      func.call(deferred, deferred);
    }
    return deferred;
  },
  when: function (subordinate) {
    var i = 0,
      resolveValues = slice.call(arguments),
      length = resolveValues.length,
      remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
      deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
      updateFunc = function (i, contexts, values) {
        return function (value) {
          contexts[i] = this;
          values[i] = arguments.length > 1 ? slice.call(arguments) : value;
          if (values === progressValues) {
            deferred.notifyWith(contexts, values);
          } else if (!(--remaining)) {
            deferred.resolveWith(contexts, values);
          }
        };
      },
      progressValues, progressContexts, resolveContexts;
    if (length > 1) {
      progressValues = new Array(length);
      progressContexts = new Array(length);
      resolveContexts = new Array(length);
      for (; i < length; i++) {
        if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
          resolveValues[i].promise()
            .done(updateFunc(i, resolveContexts, resolveValues))
            .fail(deferred.reject)
            .progress(updateFunc(i, progressContexts, progressValues));
        } else {
          --remaining;
        }
      }
    }
    if (!remaining) {
      deferred.resolveWith(resolveContexts, resolveValues);
    }
    return deferred.promise();
  },
  holdReady: function (hold) {
    if (hold) {
      jQuery.readyWait++;
    } else {
      jQuery.ready(true);
    }
  },
  ready: function (wait) {
    if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
      return;
    }
    if (!document.body) {
      return setTimeout(jQuery.ready);
    }
    jQuery.isReady = true;
    if (wait !== true && --jQuery.readyWait > 0) {
      return;
    }
    readyList.resolveWith(document, [jQuery]);
    if (jQuery.fn.triggerHandler) {
      jQuery(document).triggerHandler("ready");
      jQuery(document).off("ready");
    }
  },
  hasData: function (elem) {
    elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
    return !!elem && !isEmptyDataObject(elem);
  },
  data: function (elem, name, data) {
    return internalData(elem, name, data);
  },
  removeData: function (elem, name) {
    return internalRemoveData(elem, name);
  },
  _data: function (elem, name, data) {
    return internalData(elem, name, data, true);
  },
  _removeData: function (elem, name) {
    return internalRemoveData(elem, name, true);
  },
  queue: function (elem, type, data) {
    var queue;
    if (elem) {
      type = (type || "fx") + "queue";
      queue = jQuery._data(elem, type);
      if (data) {
        if (!queue || jQuery.isArray(data)) {
          queue = jQuery._data(elem, type, jQuery.makeArray(data));
        } else {
          queue.push(data);
        }
      }
      return queue || [];
    }
  },
  dequeue: function (elem, type) {
    type = type || "fx";
    var queue = jQuery.queue(elem, type),
      startLength = queue.length,
      fn = queue.shift(),
      hooks = jQuery._queueHooks(elem, type),
      next = function () {
        jQuery.dequeue(elem, type);
      };
    if (fn === "inprogress") {
      fn = queue.shift();
      startLength--;
    }
    if (fn) {
      if (type === "fx") {
        queue.unshift("inprogress");
      }
      delete hooks.stop;
      fn.call(elem, next, hooks);
    }
    if (!startLength && hooks) {
      hooks.empty.fire();
    }
  },
  _queueHooks: function (elem, type) {
    var key = type + "queueHooks";
    return jQuery._data(elem, key) || jQuery._data(elem, key, {
      empty: jQuery.Callbacks("once memory").add(function () {
        jQuery._removeData(elem, type + "queue");
        jQuery._removeData(elem, key);
      })
    });
  },
  clone: function (elem, dataAndEvents, deepDataAndEvents) {
    var destElements, node, clone, i, srcElements,
      inPage = jQuery.contains(elem.ownerDocument, elem);
    if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
      clone = elem.cloneNode(true);
    } else {
      fragmentDiv.innerHTML = elem.outerHTML;
      fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
    }
    if ((!support.noCloneEvent || !support.noCloneChecked) &&
      (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
      destElements = getAll(clone);
      srcElements = getAll(elem);
      for (i = 0; (node = srcElements[i]) != null; ++i) {
        if (destElements[i]) {
          fixCloneNodeIssues(node, destElements[i]);
        }
      }
    }
    if (dataAndEvents) {
      if (deepDataAndEvents) {
        srcElements = srcElements || getAll(elem);
        destElements = destElements || getAll(clone);
        for (i = 0; (node = srcElements[i]) != null; i++) {
          cloneCopyEvent(node, destElements[i]);
        }
      } else {
        cloneCopyEvent(elem, clone);
      }
    }
    destElements = getAll(clone, "script");
    if (destElements.length > 0) {
      setGlobalEval(destElements, !inPage && getAll(elem, "script"));
    }
    destElements = srcElements = node = null;
    return clone;
  },
  buildFragment: function (elems, context, scripts, selection) {
    var j, elem, contains,
      tmp, tag, tbody, wrap,
      l = elems.length,
      safe = createSafeFragment(context),
      nodes = [],
      i = 0;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        if (jQuery.type(elem) === "object") {
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));
        } else {
          tmp = tmp || safe.appendChild(context.createElement("div"));
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }
          if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
            nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
          }
          if (!support.tbody) {
            elem = tag === "table" && !rtbody.test(elem) ?
              tmp.firstChild :
              wrap[1] === "<table>" && !rtbody.test(elem) ?
                tmp :
                0;
            j = elem && elem.childNodes.length;
            while (j--) {
              if (jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") && !tbody.childNodes.length) {
                elem.removeChild(tbody);
              }
            }
          }
          jQuery.merge(nodes, tmp.childNodes);
          tmp.textContent = "";
          while (tmp.firstChild) {
            tmp.removeChild(tmp.firstChild);
          }
          tmp = safe.lastChild;
        }
      }
    }
    if (tmp) {
      safe.removeChild(tmp);
    }
    if (!support.appendChecked) {
      jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
    }
    i = 0;
    while ((elem = nodes[i++])) {
      if (selection && jQuery.inArray(elem, selection) !== -1) {
        continue;
      }
      contains = jQuery.contains(elem.ownerDocument, elem);
      tmp = getAll(safe.appendChild(elem), "script");
      if (contains) {
        setGlobalEval(tmp);
      }
      if (scripts) {
        j = 0;
        while ((elem = tmp[j++])) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }
    tmp = null;
    return safe;
  },
  cleanData: function (elems, acceptData) {
    var elem, type, id, data,
      i = 0,
      internalKey = jQuery.expando,
      cache = jQuery.cache,
      deleteExpando = support.deleteExpando,
      special = jQuery.event.special;
    for (; (elem = elems[i]) != null; i++) {
      if (acceptData || jQuery.acceptData(elem)) {
        id = elem[internalKey];
        data = id && cache[id];
        if (data) {
          if (data.events) {
            for (type in data.events) {
              if (special[type]) {
                jQuery.event.remove(elem, type);
              } else {
                jQuery.removeEvent(elem, type, data.handle);
              }
            }
          }
          if (cache[id]) {
            delete cache[id];
            if (deleteExpando) {
              delete elem[internalKey];
            } else if (typeof elem.removeAttribute !== strundefined) {
              elem.removeAttribute(internalKey);
            } else {
              elem[internalKey] = null;
            }
            deletedIds.push(id);
          }
        }
      }
    }
  },
  cssHooks: {
    opacity: {
      get: function (elem, computed) {
        if (computed) {
          var ret = curCSS(elem, "opacity");
          return ret === "" ? "1" : ret;
        }
      }
    }
  },
  cssNumber: {
    "columnCount": true,
    "fillOpacity": true,
    "flexGrow": true,
    "flexShrink": true,
    "fontWeight": true,
    "lineHeight": true,
    "opacity": true,
    "order": true,
    "orphans": true,
    "widows": true,
    "zIndex": true,
    "zoom": true
  },
  cssProps: {
    "float": support.cssFloat ? "cssFloat" : "styleFloat"
  },
  style: function (elem, name, value, extra) {
    if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
      return;
    }
    var ret, type, hooks,
      origName = jQuery.camelCase(name),
      style = elem.style;
    name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
    hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
    if (value !== undefined) {
      type = typeof value;
      if (type === "string" && (ret = rrelNum.exec(value))) {
        value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
        type = "number";
      }
      if (value == null || value !== value) {
        return;
      }
      if (type === "number" && !jQuery.cssNumber[origName]) {
        value += "px";
      }
      if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
        style[name] = "inherit";
      }
      if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
        try {
          style[name] = value;
        } catch (e) {
        }
      }
    } else {
      if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
        return ret;
      }
      return style[name];
    }
  },
  css: function (elem, name, extra, styles) {
    var num, val, hooks,
      origName = jQuery.camelCase(name);
    name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
    hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
    if (hooks && "get" in hooks) {
      val = hooks.get(elem, true, extra);
    }
    if (val === undefined) {
      val = curCSS(elem, name, styles);
    }
    if (val === "normal" && name in cssNormalTransform) {
      val = cssNormalTransform[name];
    }
    if (extra === "" || extra) {
      num = parseFloat(val);
      return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
    }
    return val;
  },
  valHooks: {
    option: {
      get: function (elem) {
        var val = jQuery.find.attr(elem, "value");
        return val != null ?
          val :
          jQuery.trim(jQuery.text(elem));
      }
    },
    select: {
      get: function (elem) {
        var value, option,
          options = elem.options,
          index = elem.selectedIndex,
          one = elem.type === "select-one" || index < 0,
          values = one ? null : [],
          max = one ? index + 1 : options.length,
          i = index < 0 ?
            max :
            one ? index : 0;
        for (; i < max; i++) {
          option = options[i];
          if ((option.selected || i === index) &&
            (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
            (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
            value = jQuery(option).val();
            if (one) {
              return value;
            }
            values.push(value);
          }
        }
        return values;
      },
      set: function (elem, value) {
        var optionSet, option,
          options = elem.options,
          values = jQuery.makeArray(value),
          i = options.length;
        while (i--) {
          option = options[i];
          if (jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0) {
            try {
              option.selected = optionSet = true;
            } catch (_) {
              option.scrollHeight;
            }
          } else {
            option.selected = false;
          }
        }
        if (!optionSet) {
          elem.selectedIndex = -1;
        }
        return options;
      }
    }
  },
  attr: function (elem, name, value) {
    var hooks, ret,
      nType = elem.nodeType;
    if (!elem || nType === 3 || nType === 8 || nType === 2) {
      return;
    }
    if (typeof elem.getAttribute === strundefined) {
      return jQuery.prop(elem, name, value);
    }
    if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
      name = name.toLowerCase();
      hooks = jQuery.attrHooks[name] ||
        (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
    }
    if (value !== undefined) {
      if (value === null) {
        jQuery.removeAttr(elem, name);
      } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
        return ret;
      } else {
        elem.setAttribute(name, value + "");
        return value;
      }
    } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
      return ret;
    } else {
      ret = jQuery.find.attr(elem, name);
      return ret == null ?
        undefined :
        ret;
    }
  },
  removeAttr: function (elem, value) {
    var name, propName,
      i = 0,
      attrNames = value && value.match(rnotwhite);
    if (attrNames && elem.nodeType === 1) {
      while ((name = attrNames[i++])) {
        propName = jQuery.propFix[name] || name;
        if (jQuery.expr.match.bool.test(name)) {
          if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
            elem[propName] = false;
          } else {
            elem[jQuery.camelCase("default-" + name)] =
              elem[propName] = false;
          }
        } else {
          jQuery.attr(elem, name, "");
        }
        elem.removeAttribute(getSetAttribute ? name : propName);
      }
    }
  },
  attrHooks: {
    type: {
      set: function (elem, value) {
        if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
          var val = elem.value;
          elem.setAttribute("type", value);
          if (val) {
            elem.value = val;
          }
          return value;
        }
      }
    }
  },
  propFix: {
    "for": "htmlFor",
    "class": "className"
  },
  prop: function (elem, name, value) {
    var ret, hooks, notxml,
      nType = elem.nodeType;
    if (!elem || nType === 3 || nType === 8 || nType === 2) {
      return;
    }
    notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
    if (notxml) {
      name = jQuery.propFix[name] || name;
      hooks = jQuery.propHooks[name];
    }
    if (value !== undefined) {
      return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ?
        ret :
        (elem[name] = value);
    } else {
      return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ?
        ret :
        elem[name];
    }
  },
  propHooks: {
    tabIndex: {
      get: function (elem) {
        var tabindex = jQuery.find.attr(elem, "tabindex");
        return tabindex ?
          parseInt(tabindex, 10) :
          rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ?
            0 :
            -1;
      }
    }
  }
});
jQuery.filter = function (expr, elems, not) {
  var elem = elems[0];
  if (not) {
    expr = ":not(" + expr + ")";
  }
  return elems.length === 1 && elem.nodeType === 1 ?
    jQuery.find.matchesSelector(elem, expr) ? [elem] : [] :
    jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
      return elem.nodeType === 1;
    }));
};
jQuery.Callbacks = function (options) {
  options = typeof options === "string" ?
    (optionsCache[options] || createOptions(options)) :
    jQuery.extend({}, options);
  var
    firing,
    memory,
    fired,
    firingLength,
    firingIndex,
    firingStart,
    list = [],
    stack = !options.once && [],
    fire = function (data) {
      memory = options.memory && data;
      fired = true;
      firingIndex = firingStart || 0;
      firingStart = 0;
      firingLength = list.length;
      firing = true;
      for (; list && firingIndex < firingLength; firingIndex++) {
        if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
          memory = false;
          break;
        }
      }
      firing = false;
      if (list) {
        if (stack) {
          if (stack.length) {
            fire(stack.shift());
          }
        } else if (memory) {
          list = [];
        } else {
          self.disable();
        }
      }
    },
    self = {
      add: function () {
        if (list) {
          var start = list.length;
          (function add(args) {
            jQuery.each(args, function (_, arg) {
              var type = jQuery.type(arg);
              if (type === "function") {
                if (!options.unique || !self.has(arg)) {
                  list.push(arg);
                }
              } else if (arg && arg.length && type !== "string") {
                add(arg);
              }
            });
          })(arguments);
          if (firing) {
            firingLength = list.length;
          } else if (memory) {
            firingStart = start;
            fire(memory);
          }
        }
        return this;
      },
      remove: function () {
        if (list) {
          jQuery.each(arguments, function (_, arg) {
            var index;
            while ((index = jQuery.inArray(arg, list, index)) > -1) {
              list.splice(index, 1);
              if (firing) {
                if (index <= firingLength) {
                  firingLength--;
                }
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            }
          });
        }
        return this;
      },
      has: function (fn) {
        return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
      },
      empty: function () {
        list = [];
        firingLength = 0;
        return this;
      },
      disable: function () {
        list = stack = memory = undefined;
        return this;
      },
      disabled: function () {
        return !list;
      },
      lock: function () {
        stack = undefined;
        if (!memory) {
          self.disable();
        }
        return this;
      },
      locked: function () {
        return !stack;
      },
      fireWith: function (context, args) {
        if (list && (!fired || stack)) {
          args = args || [];
          args = [context, args.slice ? args.slice() : args];
          if (firing) {
            stack.push(args);
          } else {
            fire(args);
          }
        }
        return this;
      },
      fire: function () {
        self.fireWith(this, arguments);
        return this;
      },
      fired: function () {
        return !!fired;
      }
    };
  return self;
};
jQuery.acceptData = function (elem) {
  var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
    nodeType = +elem.nodeType || 1;
  return nodeType !== 1 && nodeType !== 9 ?
    false :
    !noData || noData !== true && elem.getAttribute("classid") === noData;
};
jQuery.event = {
  global: {},
  add: function (elem, types, handler, data, selector) {
    var tmp, events, t, handleObjIn,
      special, eventHandle, handleObj,
      handlers, type, namespaces, origType,
      elemData = jQuery._data(elem);
    if (!elemData) {
      return;
    }
    if (handler.handler) {
      handleObjIn = handler;
      handler = handleObjIn.handler;
      selector = handleObjIn.selector;
    }
    if (!handler.guid) {
      handler.guid = jQuery.guid++;
    }
    if (!(events = elemData.events)) {
      events = elemData.events = {};
    }
    if (!(eventHandle = elemData.handle)) {
      eventHandle = elemData.handle = function (e) {
        return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
          jQuery.event.dispatch.apply(eventHandle.elem, arguments) :
          undefined;
      };
      eventHandle.elem = elem;
    }
    types = (types || "").match(rnotwhite) || [""];
    t = types.length;
    while (t--) {
      tmp = rtypenamespace.exec(types[t]) || [];
      type = origType = tmp[1];
      namespaces = (tmp[2] || "").split(".").sort();
      if (!type) {
        continue;
      }
      special = jQuery.event.special[type] || {};
      type = (selector ? special.delegateType : special.bindType) || type;
      special = jQuery.event.special[type] || {};
      handleObj = jQuery.extend({
        type: type,
        origType: origType,
        data: data,
        handler: handler,
        guid: handler.guid,
        selector: selector,
        needsContext: selector && jQuery.expr.match.needsContext.test(selector),
        namespace: namespaces.join(".")
      }, handleObjIn);
      if (!(handlers = events[type])) {
        handlers = events[type] = [];
        handlers.delegateCount = 0;
        if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
          if (elem.addEventListener) {
            elem.addEventListener(type, eventHandle, false);
          } else if (elem.attachEvent) {
            elem.attachEvent("on" + type, eventHandle);
          }
        }
      }
      if (special.add) {
        special.add.call(elem, handleObj);
        if (!handleObj.handler.guid) {
          handleObj.handler.guid = handler.guid;
        }
      }
      if (selector) {
        handlers.splice(handlers.delegateCount++, 0, handleObj);
      } else {
        handlers.push(handleObj);
      }
      jQuery.event.global[type] = true;
    }
    elem = null;
  },
  remove: function (elem, types, handler, selector, mappedTypes) {
    var j, handleObj, tmp,
      origCount, t, events,
      special, handlers, type,
      namespaces, origType,
      elemData = jQuery.hasData(elem) && jQuery._data(elem);
    if (!elemData || !(events = elemData.events)) {
      return;
    }
    types = (types || "").match(rnotwhite) || [""];
    t = types.length;
    while (t--) {
      tmp = rtypenamespace.exec(types[t]) || [];
      type = origType = tmp[1];
      namespaces = (tmp[2] || "").split(".").sort();
      if (!type) {
        for (type in events) {
          jQuery.event.remove(elem, type + types[t], handler, selector, true);
        }
        continue;
      }
      special = jQuery.event.special[type] || {};
      type = (selector ? special.delegateType : special.bindType) || type;
      handlers = events[type] || [];
      tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
      origCount = j = handlers.length;
      while (j--) {
        handleObj = handlers[j];
        if ((mappedTypes || origType === handleObj.origType) &&
          (!handler || handler.guid === handleObj.guid) &&
          (!tmp || tmp.test(handleObj.namespace)) &&
          (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
          handlers.splice(j, 1);
          if (handleObj.selector) {
            handlers.delegateCount--;
          }
          if (special.remove) {
            special.remove.call(elem, handleObj);
          }
        }
      }
      if (origCount && !handlers.length) {
        if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
          jQuery.removeEvent(elem, type, elemData.handle);
        }
        delete events[type];
      }
    }
    if (jQuery.isEmptyObject(events)) {
      delete elemData.handle;
      jQuery._removeData(elem, "events");
    }
  },
  trigger: function (event, data, elem, onlyHandlers) {
    var handle, ontype, cur,
      bubbleType, special, tmp, i,
      eventPath = [elem || document],
      type = hasOwn.call(event, "type") ? event.type : event,
      namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
    cur = tmp = elem = elem || document;
    if (elem.nodeType === 3 || elem.nodeType === 8) {
      return;
    }
    if (rfocusMorph.test(type + jQuery.event.triggered)) {
      return;
    }
    if (type.indexOf(".") >= 0) {
      namespaces = type.split(".");
      type = namespaces.shift();
      namespaces.sort();
    }
    ontype = type.indexOf(":") < 0 && "on" + type;
    event = event[jQuery.expando] ?
      event :
      new jQuery.Event(type, typeof event === "object" && event);
    event.isTrigger = onlyHandlers ? 2 : 3;
    event.namespace = namespaces.join(".");
    event.namespace_re = event.namespace ?
      new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
      null;
    event.result = undefined;
    if (!event.target) {
      event.target = elem;
    }
    data = data == null ?
      [event] :
      jQuery.makeArray(data, [event]);
    special = jQuery.event.special[type] || {};
    if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
      return;
    }
    if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
      bubbleType = special.delegateType || type;
      if (!rfocusMorph.test(bubbleType + type)) {
        cur = cur.parentNode;
      }
      for (; cur; cur = cur.parentNode) {
        eventPath.push(cur);
        tmp = cur;
      }
      if (tmp === (elem.ownerDocument || document)) {
        eventPath.push(tmp.defaultView || tmp.parentWindow || window);
      }
    }
    i = 0;
    while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
      event.type = i > 1 ?
        bubbleType :
        special.bindType || type;
      handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
      if (handle) {
        handle.apply(cur, data);
      }
      handle = ontype && cur[ontype];
      if (handle && handle.apply && jQuery.acceptData(cur)) {
        event.result = handle.apply(cur, data);
        if (event.result === false) {
          event.preventDefault();
        }
      }
    }
    event.type = type;
    if (!onlyHandlers && !event.isDefaultPrevented()) {
      if ((!special._default || special._default.apply(eventPath.pop(), data) === false) &&
        jQuery.acceptData(elem)) {
        if (ontype && elem[type] && !jQuery.isWindow(elem)) {
          tmp = elem[ontype];
          if (tmp) {
            elem[ontype] = null;
          }
          jQuery.event.triggered = type;
          try {
            elem[type]();
          } catch (e) {
          }
          jQuery.event.triggered = undefined;
          if (tmp) {
            elem[ontype] = tmp;
          }
        }
      }
    }
    return event.result;
  },
  dispatch: function (event) {
    event = jQuery.event.fix(event);
    var i, ret, handleObj, matched, j,
      handlerQueue = [],
      args = slice.call(arguments),
      handlers = (jQuery._data(this, "events") || {})[event.type] || [],
      special = jQuery.event.special[event.type] || {};
    args[0] = event;
    event.delegateTarget = this;
    if (special.preDispatch && special.preDispatch.call(this, event) === false) {
      return;
    }
    handlerQueue = jQuery.event.handlers.call(this, event, handlers);
    i = 0;
    while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
      event.currentTarget = matched.elem;
      j = 0;
      while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
        if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
          event.handleObj = handleObj;
          event.data = handleObj.data;
          ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler)
            .apply(matched.elem, args);
          if (ret !== undefined) {
            if ((event.result = ret) === false) {
              event.preventDefault();
              event.stopPropagation();
            }
          }
        }
      }
    }
    if (special.postDispatch) {
      special.postDispatch.call(this, event);
    }
    return event.result;
  },
  handlers: function (event, handlers) {
    var sel, handleObj, matches, i,
      handlerQueue = [],
      delegateCount = handlers.delegateCount,
      cur = event.target;
    if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
      for (; cur != this; cur = cur.parentNode || this) {
        if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
          matches = [];
          for (i = 0; i < delegateCount; i++) {
            handleObj = handlers[i];
            sel = handleObj.selector + " ";
            if (matches[sel] === undefined) {
              matches[sel] = handleObj.needsContext ?
                jQuery(sel, this).index(cur) >= 0 :
                jQuery.find(sel, this, null, [cur]).length;
            }
            if (matches[sel]) {
              matches.push(handleObj);
            }
          }
          if (matches.length) {
            handlerQueue.push({elem: cur, handlers: matches});
          }
        }
      }
    }
    if (delegateCount < handlers.length) {
      handlerQueue.push({elem: this, handlers: handlers.slice(delegateCount)});
    }
    return handlerQueue;
  },
  fix: function (event) {
    if (event[jQuery.expando]) {
      return event;
    }
    var i, prop, copy,
      type = event.type,
      originalEvent = event,
      fixHook = this.fixHooks[type];
    if (!fixHook) {
      this.fixHooks[type] = fixHook =
        rmouseEvent.test(type) ? this.mouseHooks :
          rkeyEvent.test(type) ? this.keyHooks :
            {};
    }
    copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
    event = new jQuery.Event(originalEvent);
    i = copy.length;
    while (i--) {
      prop = copy[i];
      event[prop] = originalEvent[prop];
    }
    if (!event.target) {
      event.target = originalEvent.srcElement || document;
    }
    if (event.target.nodeType === 3) {
      event.target = event.target.parentNode;
    }
    event.metaKey = !!event.metaKey;
    return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
  },
  props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
  fixHooks: {},
  keyHooks: {
    props: "char charCode key keyCode".split(" "),
    filter: function (event, original) {
      if (event.which == null) {
        event.which = original.charCode != null ? original.charCode : original.keyCode;
      }
      return event;
    }
  },
  mouseHooks: {
    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
    filter: function (event, original) {
      var body, eventDoc, doc,
        button = original.button,
        fromElement = original.fromElement;
      if (event.pageX == null && original.clientX != null) {
        eventDoc = event.target.ownerDocument || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;
        event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
      }
      if (!event.relatedTarget && fromElement) {
        event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
      }
      if (!event.which && button !== undefined) {
        event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
      }
      return event;
    }
  },
  special: {
    load: {
      noBubble: true
    },
    focus: {
      trigger: function () {
        if (this !== safeActiveElement() && this.focus) {
          try {
            this.focus();
            return false;
          } catch (e) {
          }
        }
      },
      delegateType: "focusin"
    },
    blur: {
      trigger: function () {
        if (this === safeActiveElement() && this.blur) {
          this.blur();
          return false;
        }
      },
      delegateType: "focusout"
    },
    click: {
      trigger: function () {
        if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
          this.click();
          return false;
        }
      },
      _default: function (event) {
        return jQuery.nodeName(event.target, "a");
      }
    },
    beforeunload: {
      postDispatch: function (event) {
        if (event.result !== undefined && event.originalEvent) {
          event.originalEvent.returnValue = event.result;
        }
      }
    }
  },
  simulate: function (type, elem, event, bubble) {
    var e = jQuery.extend(
      new jQuery.Event(),
      event,
      {
        type: type,
        isSimulated: true,
        originalEvent: {}
      }
    );
    if (bubble) {
      jQuery.event.trigger(e, null, elem);
    } else {
      jQuery.event.dispatch.call(elem, e);
    }
    if (e.isDefaultPrevented()) {
      event.preventDefault();
    }
  }
};
jQuery.Event = function (src, props) {
  if (!(this instanceof jQuery.Event)) {
    return new jQuery.Event(src, props);
  }
  if (src && src.type) {
    this.originalEvent = src;
    this.type = src.type;
    this.isDefaultPrevented = src.defaultPrevented ||
    src.defaultPrevented === undefined &&
    src.returnValue === false ?
      returnTrue :
      returnFalse;
  } else {
    this.type = src;
  }
  if (props) {
    jQuery.extend(this, props);
  }
  this.timeStamp = src && src.timeStamp || jQuery.now();
  this[jQuery.expando] = true;
};
jQuery.offset = {
  setOffset: function (elem, options, i) {
    var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
      position = jQuery.css(elem, "position"),
      curElem = jQuery(elem),
      props = {};
    if (position === "static") {
      elem.style.position = "relative";
    }
    curOffset = curElem.offset();
    curCSSTop = jQuery.css(elem, "top");
    curCSSLeft = jQuery.css(elem, "left");
    calculatePosition = (position === "absolute" || position === "fixed") &&
      jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;
    if (calculatePosition) {
      curPosition = curElem.position();
      curTop = curPosition.top;
      curLeft = curPosition.left;
    } else {
      curTop = parseFloat(curCSSTop) || 0;
      curLeft = parseFloat(curCSSLeft) || 0;
    }
    if (jQuery.isFunction(options)) {
      options = options.call(elem, i, curOffset);
    }
    if (options.top != null) {
      props.top = (options.top - curOffset.top) + curTop;
    }
    if (options.left != null) {
      props.left = (options.left - curOffset.left) + curLeft;
    }
    if ("using" in options) {
      options.using.call(elem, props);
    } else {
      curElem.css(props);
    }
  }
};