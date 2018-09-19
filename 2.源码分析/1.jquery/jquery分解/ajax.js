jQuery.extend({
  active: 0,
  lastModified: {},
  etag: {},
  ajaxSettings: {
    url: ajaxLocation,
    type: "GET",
    isLocal: rlocalProtocol.test(ajaxLocParts[1]),
    global: true,
    processData: true,
    async: true,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    accepts: {
      "*": allTypes,
      text: "text/plain",
      html: "text/html",
      xml: "application/xml, text/xml",
      json: "application/json, text/javascript"
    },
    contents: {
      xml: /xml/,
      html: /html/,
      json: /json/
    },
    responseFields: {
      xml: "responseXML",
      text: "responseText",
      json: "responseJSON"
    },
    converters: {
      "* text": String,
      "text html": true,
      "text json": jQuery.parseJSON,
      "text xml": jQuery.parseXML
    },
    flatOptions: {
      url: true,
      context: true
    }
  },
  ajaxSetup: function (target, settings) {
    return settings ?
      ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :
      ajaxExtend(jQuery.ajaxSettings, target);
  },
  ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
  ajaxTransport: addToPrefiltersOrTransports(transports),
  ajax: function (url, options) {
    if (typeof url === "object") {
      options = url;
      url = undefined;
    }
    options = options || {};
    var
      parts,
      i,
      cacheURL,
      responseHeadersString,
      timeoutTimer,
      fireGlobals,
      transport,
      responseHeaders,
      s = jQuery.ajaxSetup({}, options),
      callbackContext = s.context || s,
      globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ?
        jQuery(callbackContext) :
        jQuery.event,
      deferred = jQuery.Deferred(),
      completeDeferred = jQuery.Callbacks("once memory"),
      statusCode = s.statusCode || {},
      requestHeaders = {},
      requestHeadersNames = {},
      state = 0,
      strAbort = "canceled",
      jqXHR = {
        readyState: 0,
        getResponseHeader: function (key) {
          var match;
          if (state === 2) {
            if (!responseHeaders) {
              responseHeaders = {};
              while ((match = rheaders.exec(responseHeadersString))) {
                responseHeaders[match[1].toLowerCase()] = match[2];
              }
            }
            match = responseHeaders[key.toLowerCase()];
          }
          return match == null ? null : match;
        },
        getAllResponseHeaders: function () {
          return state === 2 ? responseHeadersString : null;
        },
        setRequestHeader: function (name, value) {
          var lname = name.toLowerCase();
          if (!state) {
            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
            requestHeaders[name] = value;
          }
          return this;
        },
        overrideMimeType: function (type) {
          if (!state) {
            s.mimeType = type;
          }
          return this;
        },
        statusCode: function (map) {
          var code;
          if (map) {
            if (state < 2) {
              for (code in map) {
                statusCode[code] = [statusCode[code], map[code]];
              }
            } else {
              jqXHR.always(map[jqXHR.status]);
            }
          }
          return this;
        },
        abort: function (statusText) {
          var finalText = statusText || strAbort;
          if (transport) {
            transport.abort(finalText);
          }
          done(0, finalText);
          return this;
        }
      };
    deferred.promise(jqXHR).complete = completeDeferred.add;
    jqXHR.success = jqXHR.done;
    jqXHR.error = jqXHR.fail;
    s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "
    s.type = options.method || options.type || s.method || s.type;
    s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
    if (s.crossDomain == null) {
      parts = rurl.exec(s.url.toLowerCase());
      s.crossDomain = !!(parts &&
        (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] ||
          (parts[3] || (parts[1] === "http:" ? "80" : "443")) !==
          (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))
      );
    }
    if (s.data && s.processData && typeof s.data !== "string") {
      s.data = jQuery.param(s.data, s.traditional);
    }
    inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
    if (state === 2) {
      return jqXHR;
    }
    fireGlobals = jQuery.event && s.global;
    if (fireGlobals && jQuery.active++ === 0) {
      jQuery.event.trigger("ajaxStart");
    }
    s.type = s.type.toUpperCase();
    s.hasContent = !rnoContent.test(s.type);
    cacheURL = s.url;
    if (!s.hasContent) {
      if (s.data) {
        cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
        delete s.data;
      }
      if (s.cache === false) {
        s.url = rts.test(cacheURL) ?
          cacheURL.replace(rts, "$1_=" + nonce++) :
          cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
      }
    }
    if (s.ifModified) {
      if (jQuery.lastModified[cacheURL]) {
        jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
      }
      if (jQuery.etag[cacheURL]) {
        jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
      }
    }
    if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
      jqXHR.setRequestHeader("Content-Type", s.contentType);
    }
    jqXHR.setRequestHeader(
      "Accept",
      s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
        s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
        s.accepts["*"]
    );
    for (i in s.headers) {
      jqXHR.setRequestHeader(i, s.headers[i]);
    }
    if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
      return jqXHR.abort();
    }
    strAbort = "abort";
    for (i in {success: 1, error: 1, complete: 1}) {
      jqXHR[i](s[i]);
    }
    transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
    if (!transport) {
      done(-1, "No Transport");
    } else {
      jqXHR.readyState = 1;
      if (fireGlobals) {
        globalEventContext.trigger("ajaxSend", [jqXHR, s]);
      }
      if (s.async && s.timeout > 0) {
        timeoutTimer = setTimeout(function () {
          jqXHR.abort("timeout");
        }, s.timeout);
      }
      try {
        state = 1;
        transport.send(requestHeaders, done);
      } catch (e) {
        if (state < 2) {
          done(-1, e);
        } else {
          throw e;
        }
      }
    }
    
    function done(status, nativeStatusText, responses, headers) {
      var isSuccess, success, error, response, modified,
        statusText = nativeStatusText;
      if (state === 2) {
        return;
      }
      state = 2;
      if (timeoutTimer) {
        clearTimeout(timeoutTimer);
      }
      transport = undefined;
      responseHeadersString = headers || "";
      jqXHR.readyState = status > 0 ? 4 : 0;
      isSuccess = status >= 200 && status < 300 || status === 304;
      if (responses) {
        response = ajaxHandleResponses(s, jqXHR, responses);
      }
      response = ajaxConvert(s, response, jqXHR, isSuccess);
      if (isSuccess) {
        if (s.ifModified) {
          modified = jqXHR.getResponseHeader("Last-Modified");
          if (modified) {
            jQuery.lastModified[cacheURL] = modified;
          }
          modified = jqXHR.getResponseHeader("etag");
          if (modified) {
            jQuery.etag[cacheURL] = modified;
          }
        }
        if (status === 204 || s.type === "HEAD") {
          statusText = "nocontent";
        } else if (status === 304) {
          statusText = "notmodified";
        } else {
          statusText = response.state;
          success = response.data;
          error = response.error;
          isSuccess = !error;
        }
      } else {
        error = statusText;
        if (status || !statusText) {
          statusText = "error";
          if (status < 0) {
            status = 0;
          }
        }
      }
      jqXHR.status = status;
      jqXHR.statusText = (nativeStatusText || statusText) + "";
      if (isSuccess) {
        deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
      } else {
        deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
      }
      jqXHR.statusCode(statusCode);
      statusCode = undefined;
      if (fireGlobals) {
        globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError",
          [jqXHR, s, isSuccess ? success : error]);
      }
      completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
      if (fireGlobals) {
        globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
        if (!(--jQuery.active)) {
          jQuery.event.trigger("ajaxStop");
        }
      }
    }
    
    return jqXHR;
  },
  getJSON: function (url, data, callback) {
    return jQuery.get(url, data, callback, "json");
  },
  getScript: function (url, callback) {
    return jQuery.get(url, undefined, callback, "script");
  }
});