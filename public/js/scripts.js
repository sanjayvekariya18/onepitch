/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@vimeo/player/dist/player.es.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*! @vimeo/player v2.9.1 | (c) 2019 Vimeo | MIT License | https://github.com/vimeo/player.js */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * @module lib/functions
 */

/**
 * Check to see this is a node environment.
 * @type {Boolean}
 */

/* global global */
var isNode = typeof global !== 'undefined' && {}.toString.call(global) === '[object global]';
/**
 * Get the name of the method for a given getter or setter.
 *
 * @param {string} prop The name of the property.
 * @param {string} type Either “get” or “set”.
 * @return {string}
 */

function getMethodName(prop, type) {
  if (prop.indexOf(type.toLowerCase()) === 0) {
    return prop;
  }

  return "".concat(type.toLowerCase()).concat(prop.substr(0, 1).toUpperCase()).concat(prop.substr(1));
}
/**
 * Check to see if the object is a DOM Element.
 *
 * @param {*} element The object to check.
 * @return {boolean}
 */

function isDomElement(element) {
  return Boolean(element && element.nodeType === 1 && 'nodeName' in element && element.ownerDocument && element.ownerDocument.defaultView);
}
/**
 * Check to see whether the value is a number.
 *
 * @see http://dl.dropboxusercontent.com/u/35146/js/tests/isNumber.html
 * @param {*} value The value to check.
 * @param {boolean} integer Check if the value is an integer.
 * @return {boolean}
 */

function isInteger(value) {
  // eslint-disable-next-line eqeqeq
  return !isNaN(parseFloat(value)) && isFinite(value) && Math.floor(value) == value;
}
/**
 * Check to see if the URL is a Vimeo url.
 *
 * @param {string} url The url string.
 * @return {boolean}
 */

function isVimeoUrl(url) {
  return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(url);
}
/**
 * Get the Vimeo URL from an element.
 * The element must have either a data-vimeo-id or data-vimeo-url attribute.
 *
 * @param {object} oEmbedParameters The oEmbed parameters.
 * @return {string}
 */

function getVimeoUrl() {
  var oEmbedParameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var id = oEmbedParameters.id;
  var url = oEmbedParameters.url;
  var idOrUrl = id || url;

  if (!idOrUrl) {
    throw new Error('An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.');
  }

  if (isInteger(idOrUrl)) {
    return "https://vimeo.com/".concat(idOrUrl);
  }

  if (isVimeoUrl(idOrUrl)) {
    return idOrUrl.replace('http:', 'https:');
  }

  if (id) {
    throw new TypeError("\u201C".concat(id, "\u201D is not a valid video id."));
  }

  throw new TypeError("\u201C".concat(idOrUrl, "\u201D is not a vimeo.com url."));
}

var arrayIndexOfSupport = typeof Array.prototype.indexOf !== 'undefined';
var postMessageSupport = typeof window !== 'undefined' && typeof window.postMessage !== 'undefined';

if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
  throw new Error('Sorry, the Vimeo Player API is not available in this browser.');
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*!
 * weakmap-polyfill v2.0.0 - ECMAScript6 WeakMap polyfill
 * https://github.com/polygonplanet/weakmap-polyfill
 * Copyright (c) 2015-2016 polygon planet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */
(function (self) {

  if (self.WeakMap) {
    return;
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var defineProperty = function (object, name, value) {
    if (Object.defineProperty) {
      Object.defineProperty(object, name, {
        configurable: true,
        writable: true,
        value: value
      });
    } else {
      object[name] = value;
    }
  };

  self.WeakMap = function () {
    // ECMA-262 23.3 WeakMap Objects
    function WeakMap() {
      if (this === void 0) {
        throw new TypeError("Constructor WeakMap requires 'new'");
      }

      defineProperty(this, '_id', genId('_WeakMap')); // ECMA-262 23.3.1.1 WeakMap([iterable])

      if (arguments.length > 0) {
        // Currently, WeakMap `iterable` argument is not supported
        throw new TypeError('WeakMap iterable is not supported');
      }
    } // ECMA-262 23.3.3.2 WeakMap.prototype.delete(key)


    defineProperty(WeakMap.prototype, 'delete', function (key) {
      checkInstance(this, 'delete');

      if (!isObject(key)) {
        return false;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        delete key[this._id];
        return true;
      }

      return false;
    }); // ECMA-262 23.3.3.3 WeakMap.prototype.get(key)

    defineProperty(WeakMap.prototype, 'get', function (key) {
      checkInstance(this, 'get');

      if (!isObject(key)) {
        return void 0;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        return entry[1];
      }

      return void 0;
    }); // ECMA-262 23.3.3.4 WeakMap.prototype.has(key)

    defineProperty(WeakMap.prototype, 'has', function (key) {
      checkInstance(this, 'has');

      if (!isObject(key)) {
        return false;
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        return true;
      }

      return false;
    }); // ECMA-262 23.3.3.5 WeakMap.prototype.set(key, value)

    defineProperty(WeakMap.prototype, 'set', function (key, value) {
      checkInstance(this, 'set');

      if (!isObject(key)) {
        throw new TypeError('Invalid value used as weak map key');
      }

      var entry = key[this._id];

      if (entry && entry[0] === key) {
        entry[1] = value;
        return this;
      }

      defineProperty(key, this._id, [key, value]);
      return this;
    });

    function checkInstance(x, methodName) {
      if (!isObject(x) || !hasOwnProperty.call(x, '_id')) {
        throw new TypeError(methodName + ' method called on incompatible receiver ' + typeof x);
      }
    }

    function genId(prefix) {
      return prefix + '_' + rand() + '.' + rand();
    }

    function rand() {
      return Math.random().toString().substring(2);
    }

    defineProperty(WeakMap, '_polyfill', true);
    return WeakMap;
  }();

  function isObject(x) {
    return Object(x) === x;
  }
})(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : commonjsGlobal);

var npo_src = createCommonjsModule(function (module) {
/*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
(function UMD(name, context, definition) {
  // special form of UMD for polyfilling across evironments
  context[name] = context[name] || definition();

  if (module.exports) {
    module.exports = context[name];
  }
})("Promise", typeof commonjsGlobal != "undefined" ? commonjsGlobal : commonjsGlobal, function DEF() {

  var builtInProp,
      cycle,
      scheduling_queue,
      ToString = Object.prototype.toString,
      timer = typeof setImmediate != "undefined" ? function timer(fn) {
    return setImmediate(fn);
  } : setTimeout; // dammit, IE8.

  try {
    Object.defineProperty({}, "x", {});

    builtInProp = function builtInProp(obj, name, val, config) {
      return Object.defineProperty(obj, name, {
        value: val,
        writable: true,
        configurable: config !== false
      });
    };
  } catch (err) {
    builtInProp = function builtInProp(obj, name, val) {
      obj[name] = val;
      return obj;
    };
  } // Note: using a queue instead of array for efficiency


  scheduling_queue = function Queue() {
    var first, last, item;

    function Item(fn, self) {
      this.fn = fn;
      this.self = self;
      this.next = void 0;
    }

    return {
      add: function add(fn, self) {
        item = new Item(fn, self);

        if (last) {
          last.next = item;
        } else {
          first = item;
        }

        last = item;
        item = void 0;
      },
      drain: function drain() {
        var f = first;
        first = last = cycle = void 0;

        while (f) {
          f.fn.call(f.self);
          f = f.next;
        }
      }
    };
  }();

  function schedule(fn, self) {
    scheduling_queue.add(fn, self);

    if (!cycle) {
      cycle = timer(scheduling_queue.drain);
    }
  } // promise duck typing


  function isThenable(o) {
    var _then,
        o_type = typeof o;

    if (o != null && (o_type == "object" || o_type == "function")) {
      _then = o.then;
    }

    return typeof _then == "function" ? _then : false;
  }

  function notify() {
    for (var i = 0; i < this.chain.length; i++) {
      notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
    }

    this.chain.length = 0;
  } // NOTE: This is a separate function to isolate
  // the `try..catch` so that other code can be
  // optimized better


  function notifyIsolated(self, cb, chain) {
    var ret, _then;

    try {
      if (cb === false) {
        chain.reject(self.msg);
      } else {
        if (cb === true) {
          ret = self.msg;
        } else {
          ret = cb.call(void 0, self.msg);
        }

        if (ret === chain.promise) {
          chain.reject(TypeError("Promise-chain cycle"));
        } else if (_then = isThenable(ret)) {
          _then.call(ret, chain.resolve, chain.reject);
        } else {
          chain.resolve(ret);
        }
      }
    } catch (err) {
      chain.reject(err);
    }
  }

  function resolve(msg) {
    var _then,
        self = this; // already triggered?


    if (self.triggered) {
      return;
    }

    self.triggered = true; // unwrap

    if (self.def) {
      self = self.def;
    }

    try {
      if (_then = isThenable(msg)) {
        schedule(function () {
          var def_wrapper = new MakeDefWrapper(self);

          try {
            _then.call(msg, function $resolve$() {
              resolve.apply(def_wrapper, arguments);
            }, function $reject$() {
              reject.apply(def_wrapper, arguments);
            });
          } catch (err) {
            reject.call(def_wrapper, err);
          }
        });
      } else {
        self.msg = msg;
        self.state = 1;

        if (self.chain.length > 0) {
          schedule(notify, self);
        }
      }
    } catch (err) {
      reject.call(new MakeDefWrapper(self), err);
    }
  }

  function reject(msg) {
    var self = this; // already triggered?

    if (self.triggered) {
      return;
    }

    self.triggered = true; // unwrap

    if (self.def) {
      self = self.def;
    }

    self.msg = msg;
    self.state = 2;

    if (self.chain.length > 0) {
      schedule(notify, self);
    }
  }

  function iteratePromises(Constructor, arr, resolver, rejecter) {
    for (var idx = 0; idx < arr.length; idx++) {
      (function IIFE(idx) {
        Constructor.resolve(arr[idx]).then(function $resolver$(msg) {
          resolver(idx, msg);
        }, rejecter);
      })(idx);
    }
  }

  function MakeDefWrapper(self) {
    this.def = self;
    this.triggered = false;
  }

  function MakeDef(self) {
    this.promise = self;
    this.state = 0;
    this.triggered = false;
    this.chain = [];
    this.msg = void 0;
  }

  function Promise(executor) {
    if (typeof executor != "function") {
      throw TypeError("Not a function");
    }

    if (this.__NPO__ !== 0) {
      throw TypeError("Not a promise");
    } // instance shadowing the inherited "brand"
    // to signal an already "initialized" promise


    this.__NPO__ = 1;
    var def = new MakeDef(this);

    this["then"] = function then(success, failure) {
      var o = {
        success: typeof success == "function" ? success : true,
        failure: typeof failure == "function" ? failure : false
      }; // Note: `then(..)` itself can be borrowed to be used against
      // a different promise constructor for making the chained promise,
      // by substituting a different `this` binding.

      o.promise = new this.constructor(function extractChain(resolve, reject) {
        if (typeof resolve != "function" || typeof reject != "function") {
          throw TypeError("Not a function");
        }

        o.resolve = resolve;
        o.reject = reject;
      });
      def.chain.push(o);

      if (def.state !== 0) {
        schedule(notify, def);
      }

      return o.promise;
    };

    this["catch"] = function $catch$(failure) {
      return this.then(void 0, failure);
    };

    try {
      executor.call(void 0, function publicResolve(msg) {
        resolve.call(def, msg);
      }, function publicReject(msg) {
        reject.call(def, msg);
      });
    } catch (err) {
      reject.call(def, err);
    }
  }

  var PromisePrototype = builtInProp({}, "constructor", Promise,
  /*configurable=*/
  false); // Note: Android 4 cannot use `Object.defineProperty(..)` here

  Promise.prototype = PromisePrototype; // built-in "brand" to signal an "uninitialized" promise

  builtInProp(PromisePrototype, "__NPO__", 0,
  /*configurable=*/
  false);
  builtInProp(Promise, "resolve", function Promise$resolve(msg) {
    var Constructor = this; // spec mandated checks
    // note: best "isPromise" check that's practical for now

    if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
      return msg;
    }

    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      resolve(msg);
    });
  });
  builtInProp(Promise, "reject", function Promise$reject(msg) {
    return new this(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      reject(msg);
    });
  });
  builtInProp(Promise, "all", function Promise$all(arr) {
    var Constructor = this; // spec mandated checks

    if (ToString.call(arr) != "[object Array]") {
      return Constructor.reject(TypeError("Not an array"));
    }

    if (arr.length === 0) {
      return Constructor.resolve([]);
    }

    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      var len = arr.length,
          msgs = Array(len),
          count = 0;
      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        msgs[idx] = msg;

        if (++count === len) {
          resolve(msgs);
        }
      }, reject);
    });
  });
  builtInProp(Promise, "race", function Promise$race(arr) {
    var Constructor = this; // spec mandated checks

    if (ToString.call(arr) != "[object Array]") {
      return Constructor.reject(TypeError("Not an array"));
    }

    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve != "function" || typeof reject != "function") {
        throw TypeError("Not a function");
      }

      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        resolve(msg);
      }, reject);
    });
  });
  return Promise;
});
});

/**
 * @module lib/callbacks
 */
var callbackMap = new WeakMap();
/**
 * Store a callback for a method or event for a player.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name.
 * @param {(function(this:Player, *): void|{resolve: function, reject: function})} callback
 *        The callback to call or an object with resolve and reject functions for a promise.
 * @return {void}
 */

function storeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};

  if (!(name in playerCallbacks)) {
    playerCallbacks[name] = [];
  }

  playerCallbacks[name].push(callback);
  callbackMap.set(player.element, playerCallbacks);
}
/**
 * Get the callbacks for a player and event or method.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @return {function[]}
 */

function getCallbacks(player, name) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  return playerCallbacks[name] || [];
}
/**
 * Remove a stored callback for a method or event for a player.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @param {function} [callback] The specific callback to remove.
 * @return {boolean} Was this the last callback?
 */

function removeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};

  if (!playerCallbacks[name]) {
    return true;
  } // If no callback is passed, remove all callbacks for the event


  if (!callback) {
    playerCallbacks[name] = [];
    callbackMap.set(player.element, playerCallbacks);
    return true;
  }

  var index = playerCallbacks[name].indexOf(callback);

  if (index !== -1) {
    playerCallbacks[name].splice(index, 1);
  }

  callbackMap.set(player.element, playerCallbacks);
  return playerCallbacks[name] && playerCallbacks[name].length === 0;
}
/**
 * Return the first stored callback for a player and event or method.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name.
 * @return {function} The callback, or false if there were none
 */

function shiftCallbacks(player, name) {
  var playerCallbacks = getCallbacks(player, name);

  if (playerCallbacks.length < 1) {
    return false;
  }

  var callback = playerCallbacks.shift();
  removeCallback(player, name, callback);
  return callback;
}
/**
 * Move callbacks associated with an element to another element.
 *
 * @param {HTMLElement} oldElement The old element.
 * @param {HTMLElement} newElement The new element.
 * @return {void}
 */

function swapCallbacks(oldElement, newElement) {
  var playerCallbacks = callbackMap.get(oldElement);
  callbackMap.set(newElement, playerCallbacks);
  callbackMap.delete(oldElement);
}

/**
 * @module lib/embed
 */
var oEmbedParameters = ['autopause', 'autoplay', 'background', 'byline', 'color', 'controls', 'dnt', 'height', 'id', 'loop', 'maxheight', 'maxwidth', 'muted', 'playsinline', 'portrait', 'responsive', 'speed', 'texttrack', 'title', 'transparent', 'url', 'width'];
/**
 * Get the 'data-vimeo'-prefixed attributes from an element as an object.
 *
 * @param {HTMLElement} element The element.
 * @param {Object} [defaults={}] The default values to use.
 * @return {Object<string, string>}
 */

function getOEmbedParameters(element) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return oEmbedParameters.reduce(function (params, param) {
    var value = element.getAttribute("data-vimeo-".concat(param));

    if (value || value === '') {
      params[param] = value === '' ? 1 : value;
    }

    return params;
  }, defaults);
}
/**
 * Create an embed from oEmbed data inside an element.
 *
 * @param {object} data The oEmbed data.
 * @param {HTMLElement} element The element to put the iframe in.
 * @return {HTMLIFrameElement} The iframe embed.
 */

function createEmbed(_ref, element) {
  var html = _ref.html;

  if (!element) {
    throw new TypeError('An element must be provided');
  }

  if (element.getAttribute('data-vimeo-initialized') !== null) {
    return element.querySelector('iframe');
  }

  var div = document.createElement('div');
  div.innerHTML = html;
  element.appendChild(div.firstChild);
  element.setAttribute('data-vimeo-initialized', 'true');
  return element.querySelector('iframe');
}
/**
 * Make an oEmbed call for the specified URL.
 *
 * @param {string} videoUrl The vimeo.com url for the video.
 * @param {Object} [params] Parameters to pass to oEmbed.
 * @param {HTMLElement} element The element.
 * @return {Promise}
 */

function getOEmbedData(videoUrl) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var element = arguments.length > 2 ? arguments[2] : undefined;
  return new Promise(function (resolve, reject) {
    if (!isVimeoUrl(videoUrl)) {
      throw new TypeError("\u201C".concat(videoUrl, "\u201D is not a vimeo.com url."));
    }

    var url = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(videoUrl));

    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        url += "&".concat(param, "=").concat(encodeURIComponent(params[param]));
      }
    }

    var xhr = 'XDomainRequest' in window ? new XDomainRequest() : new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
      if (xhr.status === 404) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D was not found.")));
        return;
      }

      if (xhr.status === 403) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
        return;
      }

      try {
        var json = JSON.parse(xhr.responseText); // Check api response for 403 on oembed

        if (json.domain_status_code === 403) {
          // We still want to create the embed to give users visual feedback
          createEmbed(json, element);
          reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
          return;
        }

        resolve(json);
      } catch (error) {
        reject(error);
      }
    };

    xhr.onerror = function () {
      var status = xhr.status ? " (".concat(xhr.status, ")") : '';
      reject(new Error("There was an error fetching the embed code from Vimeo".concat(status, ".")));
    };

    xhr.send();
  });
}
/**
 * Initialize all embeds within a specific element
 *
 * @param {HTMLElement} [parent=document] The parent element.
 * @return {void}
 */

function initializeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var elements = [].slice.call(parent.querySelectorAll('[data-vimeo-id], [data-vimeo-url]'));

  var handleError = function handleError(error) {
    if ('console' in window && console.error) {
      console.error("There was an error creating an embed: ".concat(error));
    }
  };

  elements.forEach(function (element) {
    try {
      // Skip any that have data-vimeo-defer
      if (element.getAttribute('data-vimeo-defer') !== null) {
        return;
      }

      var params = getOEmbedParameters(element);
      var url = getVimeoUrl(params);
      getOEmbedData(url, params, element).then(function (data) {
        return createEmbed(data, element);
      }).catch(handleError);
    } catch (error) {
      handleError(error);
    }
  });
}
/**
 * Resize embeds when messaged by the player.
 *
 * @param {HTMLElement} [parent=document] The parent element.
 * @return {void}
 */

function resizeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

  // Prevent execution if users include the player.js script multiple times.
  if (window.VimeoPlayerResizeEmbeds_) {
    return;
  }

  window.VimeoPlayerResizeEmbeds_ = true;

  var onMessage = function onMessage(event) {
    if (!isVimeoUrl(event.origin)) {
      return;
    } // 'spacechange' is fired only on embeds with cards


    if (!event.data || event.data.event !== 'spacechange') {
      return;
    }

    var iframes = parent.querySelectorAll('iframe');

    for (var i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow !== event.source) {
        continue;
      } // Change padding-bottom of the enclosing div to accommodate
      // card carousel without distorting aspect ratio


      var space = iframes[i].parentElement;
      space.style.paddingBottom = "".concat(event.data.data[0].bottom, "px");
      break;
    }
  };

  if (window.addEventListener) {
    window.addEventListener('message', onMessage, false);
  } else if (window.attachEvent) {
    window.attachEvent('onmessage', onMessage);
  }
}

/**
 * @module lib/postmessage
 */
/**
 * Parse a message received from postMessage.
 *
 * @param {*} data The data received from postMessage.
 * @return {object}
 */

function parseMessageData(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (error) {
      // If the message cannot be parsed, throw the error as a warning
      console.warn(error);
      return {};
    }
  }

  return data;
}
/**
 * Post a message to the specified target.
 *
 * @param {Player} player The player object to use.
 * @param {string} method The API method to call.
 * @param {object} params The parameters to send to the player.
 * @return {void}
 */

function postMessage(player, method, params) {
  if (!player.element.contentWindow || !player.element.contentWindow.postMessage) {
    return;
  }

  var message = {
    method: method
  };

  if (params !== undefined) {
    message.value = params;
  } // IE 8 and 9 do not support passing messages, so stringify them


  var ieVersion = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, '$1'));

  if (ieVersion >= 8 && ieVersion < 10) {
    message = JSON.stringify(message);
  }

  player.element.contentWindow.postMessage(message, player.origin);
}
/**
 * Parse the data received from a message event.
 *
 * @param {Player} player The player that received the message.
 * @param {(Object|string)} data The message data. Strings will be parsed into JSON.
 * @return {void}
 */

function processData(player, data) {
  data = parseMessageData(data);
  var callbacks = [];
  var param;

  if (data.event) {
    if (data.event === 'error') {
      var promises = getCallbacks(player, data.data.method);
      promises.forEach(function (promise) {
        var error = new Error(data.data.message);
        error.name = data.data.name;
        promise.reject(error);
        removeCallback(player, data.data.method, promise);
      });
    }

    callbacks = getCallbacks(player, "event:".concat(data.event));
    param = data.data;
  } else if (data.method) {
    var callback = shiftCallbacks(player, data.method);

    if (callback) {
      callbacks.push(callback);
      param = data.value;
    }
  }

  callbacks.forEach(function (callback) {
    try {
      if (typeof callback === 'function') {
        callback.call(player, param);
        return;
      }

      callback.resolve(param);
    } catch (e) {// empty
    }
  });
}

var playerMap = new WeakMap();
var readyMap = new WeakMap();

var Player =
/*#__PURE__*/
function () {
  /**
   * Create a Player.
   *
   * @param {(HTMLIFrameElement|HTMLElement|string|jQuery)} element A reference to the Vimeo
   *        player iframe, and id, or a jQuery object.
   * @param {object} [options] oEmbed parameters to use when creating an embed in the element.
   * @return {Player}
   */
  function Player(element) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Player);

    /* global jQuery */
    if (window.jQuery && element instanceof jQuery) {
      if (element.length > 1 && window.console && console.warn) {
        console.warn('A jQuery object with multiple elements was passed, using the first element.');
      }

      element = element[0];
    } // Find an element by ID


    if (typeof document !== 'undefined' && typeof element === 'string') {
      element = document.getElementById(element);
    } // Not an element!


    if (!isDomElement(element)) {
      throw new TypeError('You must pass either a valid element or a valid id.');
    }

    var win = element.ownerDocument.defaultView; // Already initialized an embed in this div, so grab the iframe

    if (element.nodeName !== 'IFRAME') {
      var iframe = element.querySelector('iframe');

      if (iframe) {
        element = iframe;
      }
    } // iframe url is not a Vimeo url


    if (element.nodeName === 'IFRAME' && !isVimeoUrl(element.getAttribute('src') || '')) {
      throw new Error('The player element passed isn’t a Vimeo embed.');
    } // If there is already a player object in the map, return that


    if (playerMap.has(element)) {
      return playerMap.get(element);
    }

    this.element = element;
    this.origin = '*';
    var readyPromise = new npo_src(function (resolve, reject) {
      var onMessage = function onMessage(event) {
        if (!isVimeoUrl(event.origin) || _this.element.contentWindow !== event.source) {
          return;
        }

        if (_this.origin === '*') {
          _this.origin = event.origin;
        }

        var data = parseMessageData(event.data);
        var isError = data && data.event === 'error';
        var isReadyError = isError && data.data && data.data.method === 'ready';

        if (isReadyError) {
          var error = new Error(data.data.message);
          error.name = data.data.name;
          reject(error);
          return;
        }

        var isReadyEvent = data && data.event === 'ready';
        var isPingResponse = data && data.method === 'ping';

        if (isReadyEvent || isPingResponse) {
          _this.element.setAttribute('data-ready', 'true');

          resolve();
          return;
        }

        processData(_this, data);
      };

      if (win.addEventListener) {
        win.addEventListener('message', onMessage, false);
      } else if (win.attachEvent) {
        win.attachEvent('onmessage', onMessage);
      }

      if (_this.element.nodeName !== 'IFRAME') {
        var params = getOEmbedParameters(element, options);
        var url = getVimeoUrl(params);
        getOEmbedData(url, params, element).then(function (data) {
          var iframe = createEmbed(data, element); // Overwrite element with the new iframe,
          // but store reference to the original element

          _this.element = iframe;
          _this._originalElement = element;
          swapCallbacks(element, iframe);
          playerMap.set(_this.element, _this);
          return data;
        }).catch(reject);
      }
    }); // Store a copy of this Player in the map

    readyMap.set(this, readyPromise);
    playerMap.set(this.element, this); // Send a ping to the iframe so the ready promise will be resolved if
    // the player is already ready.

    if (this.element.nodeName === 'IFRAME') {
      postMessage(this, 'ping');
    }

    return this;
  }
  /**
   * Get a promise for a method.
   *
   * @param {string} name The API method to call.
   * @param {Object} [args={}] Arguments to send via postMessage.
   * @return {Promise}
   */


  _createClass(Player, [{
    key: "callMethod",
    value: function callMethod(name) {
      var _this2 = this;

      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new npo_src(function (resolve, reject) {
        // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return
        return _this2.ready().then(function () {
          storeCallback(_this2, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this2, name, args);
        }).catch(reject);
      });
    }
    /**
     * Get a promise for the value of a player property.
     *
     * @param {string} name The property name
     * @return {Promise}
     */

  }, {
    key: "get",
    value: function get(name) {
      var _this3 = this;

      return new npo_src(function (resolve, reject) {
        name = getMethodName(name, 'get'); // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return

        return _this3.ready().then(function () {
          storeCallback(_this3, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this3, name);
        }).catch(reject);
      });
    }
    /**
     * Get a promise for setting the value of a player property.
     *
     * @param {string} name The API method to call.
     * @param {mixed} value The value to set.
     * @return {Promise}
     */

  }, {
    key: "set",
    value: function set(name, value) {
      var _this4 = this;

      return new npo_src(function (resolve, reject) {
        name = getMethodName(name, 'set');

        if (value === undefined || value === null) {
          throw new TypeError('There must be a value to set.');
        } // We are storing the resolve/reject handlers to call later, so we
        // can’t return here.
        // eslint-disable-next-line promise/always-return


        return _this4.ready().then(function () {
          storeCallback(_this4, name, {
            resolve: resolve,
            reject: reject
          });
          postMessage(_this4, name, value);
        }).catch(reject);
      });
    }
    /**
     * Add an event listener for the specified event. Will call the
     * callback with a single parameter, `data`, that contains the data for
     * that event.
     *
     * @param {string} eventName The name of the event.
     * @param {function(*)} callback The function to call when the event fires.
     * @return {void}
     */

  }, {
    key: "on",
    value: function on(eventName, callback) {
      if (!eventName) {
        throw new TypeError('You must pass an event name.');
      }

      if (!callback) {
        throw new TypeError('You must pass a callback function.');
      }

      if (typeof callback !== 'function') {
        throw new TypeError('The callback must be a function.');
      }

      var callbacks = getCallbacks(this, "event:".concat(eventName));

      if (callbacks.length === 0) {
        this.callMethod('addEventListener', eventName).catch(function () {// Ignore the error. There will be an error event fired that
          // will trigger the error callback if they are listening.
        });
      }

      storeCallback(this, "event:".concat(eventName), callback);
    }
    /**
     * Remove an event listener for the specified event. Will remove all
     * listeners for that event if a `callback` isn’t passed, or only that
     * specific callback if it is passed.
     *
     * @param {string} eventName The name of the event.
     * @param {function} [callback] The specific callback to remove.
     * @return {void}
     */

  }, {
    key: "off",
    value: function off(eventName, callback) {
      if (!eventName) {
        throw new TypeError('You must pass an event name.');
      }

      if (callback && typeof callback !== 'function') {
        throw new TypeError('The callback must be a function.');
      }

      var lastCallback = removeCallback(this, "event:".concat(eventName), callback); // If there are no callbacks left, remove the listener

      if (lastCallback) {
        this.callMethod('removeEventListener', eventName).catch(function (e) {// Ignore the error. There will be an error event fired that
          // will trigger the error callback if they are listening.
        });
      }
    }
    /**
     * A promise to load a new video.
     *
     * @promise LoadVideoPromise
     * @fulfill {number} The video with this id successfully loaded.
     * @reject {TypeError} The id was not a number.
     */

    /**
     * Load a new video into this embed. The promise will be resolved if
     * the video is successfully loaded, or it will be rejected if it could
     * not be loaded.
     *
     * @param {number|object} options The id of the video or an object with embed options.
     * @return {LoadVideoPromise}
     */

  }, {
    key: "loadVideo",
    value: function loadVideo(options) {
      return this.callMethod('loadVideo', options);
    }
    /**
     * A promise to perform an action when the Player is ready.
     *
     * @todo document errors
     * @promise LoadVideoPromise
     * @fulfill {void}
     */

    /**
     * Trigger a function when the player iframe has initialized. You do not
     * need to wait for `ready` to trigger to begin adding event listeners
     * or calling other methods.
     *
     * @return {ReadyPromise}
     */

  }, {
    key: "ready",
    value: function ready() {
      var readyPromise = readyMap.get(this) || new npo_src(function (resolve, reject) {
        reject(new Error('Unknown player. Probably unloaded.'));
      });
      return npo_src.resolve(readyPromise);
    }
    /**
     * A promise to add a cue point to the player.
     *
     * @promise AddCuePointPromise
     * @fulfill {string} The id of the cue point to use for removeCuePoint.
     * @reject {RangeError} the time was less than 0 or greater than the
     *         video’s duration.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Add a cue point to the player.
     *
     * @param {number} time The time for the cue point.
     * @param {object} [data] Arbitrary data to be returned with the cue point.
     * @return {AddCuePointPromise}
     */

  }, {
    key: "addCuePoint",
    value: function addCuePoint(time) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.callMethod('addCuePoint', {
        time: time,
        data: data
      });
    }
    /**
     * A promise to remove a cue point from the player.
     *
     * @promise AddCuePointPromise
     * @fulfill {string} The id of the cue point that was removed.
     * @reject {InvalidCuePoint} The cue point with the specified id was not
     *         found.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Remove a cue point from the video.
     *
     * @param {string} id The id of the cue point to remove.
     * @return {RemoveCuePointPromise}
     */

  }, {
    key: "removeCuePoint",
    value: function removeCuePoint(id) {
      return this.callMethod('removeCuePoint', id);
    }
    /**
     * A representation of a text track on a video.
     *
     * @typedef {Object} VimeoTextTrack
     * @property {string} language The ISO language code.
     * @property {string} kind The kind of track it is (captions or subtitles).
     * @property {string} label The human‐readable label for the track.
     */

    /**
     * A promise to enable a text track.
     *
     * @promise EnableTextTrackPromise
     * @fulfill {VimeoTextTrack} The text track that was enabled.
     * @reject {InvalidTrackLanguageError} No track was available with the
     *         specified language.
     * @reject {InvalidTrackError} No track was available with the specified
     *         language and kind.
     */

    /**
     * Enable the text track with the specified language, and optionally the
     * specified kind (captions or subtitles).
     *
     * When set via the API, the track language will not change the viewer’s
     * stored preference.
     *
     * @param {string} language The two‐letter language code.
     * @param {string} [kind] The kind of track to enable (captions or subtitles).
     * @return {EnableTextTrackPromise}
     */

  }, {
    key: "enableTextTrack",
    value: function enableTextTrack(language, kind) {
      if (!language) {
        throw new TypeError('You must pass a language.');
      }

      return this.callMethod('enableTextTrack', {
        language: language,
        kind: kind
      });
    }
    /**
     * A promise to disable the active text track.
     *
     * @promise DisableTextTrackPromise
     * @fulfill {void} The track was disabled.
     */

    /**
     * Disable the currently-active text track.
     *
     * @return {DisableTextTrackPromise}
     */

  }, {
    key: "disableTextTrack",
    value: function disableTextTrack() {
      return this.callMethod('disableTextTrack');
    }
    /**
     * A promise to pause the video.
     *
     * @promise PausePromise
     * @fulfill {void} The video was paused.
     */

    /**
     * Pause the video if it’s playing.
     *
     * @return {PausePromise}
     */

  }, {
    key: "pause",
    value: function pause() {
      return this.callMethod('pause');
    }
    /**
     * A promise to play the video.
     *
     * @promise PlayPromise
     * @fulfill {void} The video was played.
     */

    /**
     * Play the video if it’s paused. **Note:** on iOS and some other
     * mobile devices, you cannot programmatically trigger play. Once the
     * viewer has tapped on the play button in the player, however, you
     * will be able to use this function.
     *
     * @return {PlayPromise}
     */

  }, {
    key: "play",
    value: function play() {
      return this.callMethod('play');
    }
    /**
     * A promise to unload the video.
     *
     * @promise UnloadPromise
     * @fulfill {void} The video was unloaded.
     */

    /**
     * Return the player to its initial state.
     *
     * @return {UnloadPromise}
     */

  }, {
    key: "unload",
    value: function unload() {
      return this.callMethod('unload');
    }
    /**
     * Cleanup the player and remove it from the DOM
     *
     * It won't be usable and a new one should be constructed
     *  in order to do any operations.
     *
     * @return {Promise}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;

      return new npo_src(function (resolve) {
        readyMap.delete(_this5);
        playerMap.delete(_this5.element);

        if (_this5._originalElement) {
          playerMap.delete(_this5._originalElement);

          _this5._originalElement.removeAttribute('data-vimeo-initialized');
        }

        if (_this5.element && _this5.element.nodeName === 'IFRAME' && _this5.element.parentNode) {
          _this5.element.parentNode.removeChild(_this5.element);
        }

        resolve();
      });
    }
    /**
     * A promise to get the autopause behavior of the video.
     *
     * @promise GetAutopausePromise
     * @fulfill {boolean} Whether autopause is turned on or off.
     * @reject {UnsupportedError} Autopause is not supported with the current
     *         player or browser.
     */

    /**
     * Get the autopause behavior for this player.
     *
     * @return {GetAutopausePromise}
     */

  }, {
    key: "getAutopause",
    value: function getAutopause() {
      return this.get('autopause');
    }
    /**
     * A promise to set the autopause behavior of the video.
     *
     * @promise SetAutopausePromise
     * @fulfill {boolean} Whether autopause is turned on or off.
     * @reject {UnsupportedError} Autopause is not supported with the current
     *         player or browser.
     */

    /**
     * Enable or disable the autopause behavior of this player.
     *
     * By default, when another video is played in the same browser, this
     * player will automatically pause. Unless you have a specific reason
     * for doing so, we recommend that you leave autopause set to the
     * default (`true`).
     *
     * @param {boolean} autopause
     * @return {SetAutopausePromise}
     */

  }, {
    key: "setAutopause",
    value: function setAutopause(autopause) {
      return this.set('autopause', autopause);
    }
    /**
     * A promise to get the buffered property of the video.
     *
     * @promise GetBufferedPromise
     * @fulfill {Array} Buffered Timeranges converted to an Array.
     */

    /**
     * Get the buffered property of the video.
     *
     * @return {GetBufferedPromise}
     */

  }, {
    key: "getBuffered",
    value: function getBuffered() {
      return this.get('buffered');
    }
    /**
     * A promise to get the color of the player.
     *
     * @promise GetColorPromise
     * @fulfill {string} The hex color of the player.
     */

    /**
     * Get the color for this player.
     *
     * @return {GetColorPromise}
     */

  }, {
    key: "getColor",
    value: function getColor() {
      return this.get('color');
    }
    /**
     * A promise to set the color of the player.
     *
     * @promise SetColorPromise
     * @fulfill {string} The color was successfully set.
     * @reject {TypeError} The string was not a valid hex or rgb color.
     * @reject {ContrastError} The color was set, but the contrast is
     *         outside of the acceptable range.
     * @reject {EmbedSettingsError} The owner of the player has chosen to
     *         use a specific color.
     */

    /**
     * Set the color of this player to a hex or rgb string. Setting the
     * color may fail if the owner of the video has set their embed
     * preferences to force a specific color.
     *
     * @param {string} color The hex or rgb color string to set.
     * @return {SetColorPromise}
     */

  }, {
    key: "setColor",
    value: function setColor(color) {
      return this.set('color', color);
    }
    /**
     * A representation of a cue point.
     *
     * @typedef {Object} VimeoCuePoint
     * @property {number} time The time of the cue point.
     * @property {object} data The data passed when adding the cue point.
     * @property {string} id The unique id for use with removeCuePoint.
     */

    /**
     * A promise to get the cue points of a video.
     *
     * @promise GetCuePointsPromise
     * @fulfill {VimeoCuePoint[]} The cue points added to the video.
     * @reject {UnsupportedError} Cue points are not supported with the current
     *         player or browser.
     */

    /**
     * Get an array of the cue points added to the video.
     *
     * @return {GetCuePointsPromise}
     */

  }, {
    key: "getCuePoints",
    value: function getCuePoints() {
      return this.get('cuePoints');
    }
    /**
     * A promise to get the current time of the video.
     *
     * @promise GetCurrentTimePromise
     * @fulfill {number} The current time in seconds.
     */

    /**
     * Get the current playback position in seconds.
     *
     * @return {GetCurrentTimePromise}
     */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.get('currentTime');
    }
    /**
     * A promise to set the current time of the video.
     *
     * @promise SetCurrentTimePromise
     * @fulfill {number} The actual current time that was set.
     * @reject {RangeError} the time was less than 0 or greater than the
     *         video’s duration.
     */

    /**
     * Set the current playback position in seconds. If the player was
     * paused, it will remain paused. Likewise, if the player was playing,
     * it will resume playing once the video has buffered.
     *
     * You can provide an accurate time and the player will attempt to seek
     * to as close to that time as possible. The exact time will be the
     * fulfilled value of the promise.
     *
     * @param {number} currentTime
     * @return {SetCurrentTimePromise}
     */

  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(currentTime) {
      return this.set('currentTime', currentTime);
    }
    /**
     * A promise to get the duration of the video.
     *
     * @promise GetDurationPromise
     * @fulfill {number} The duration in seconds.
     */

    /**
     * Get the duration of the video in seconds. It will be rounded to the
     * nearest second before playback begins, and to the nearest thousandth
     * of a second after playback begins.
     *
     * @return {GetDurationPromise}
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.get('duration');
    }
    /**
     * A promise to get the ended state of the video.
     *
     * @promise GetEndedPromise
     * @fulfill {boolean} Whether or not the video has ended.
     */

    /**
     * Get the ended state of the video. The video has ended if
     * `currentTime === duration`.
     *
     * @return {GetEndedPromise}
     */

  }, {
    key: "getEnded",
    value: function getEnded() {
      return this.get('ended');
    }
    /**
     * A promise to get the loop state of the player.
     *
     * @promise GetLoopPromise
     * @fulfill {boolean} Whether or not the player is set to loop.
     */

    /**
     * Get the loop state of the player.
     *
     * @return {GetLoopPromise}
     */

  }, {
    key: "getLoop",
    value: function getLoop() {
      return this.get('loop');
    }
    /**
     * A promise to set the loop state of the player.
     *
     * @promise SetLoopPromise
     * @fulfill {boolean} The loop state that was set.
     */

    /**
     * Set the loop state of the player. When set to `true`, the player
     * will start over immediately once playback ends.
     *
     * @param {boolean} loop
     * @return {SetLoopPromise}
     */

  }, {
    key: "setLoop",
    value: function setLoop(loop) {
      return this.set('loop', loop);
    }
    /**
     * A promise to get the paused state of the player.
     *
     * @promise GetLoopPromise
     * @fulfill {boolean} Whether or not the video is paused.
     */

    /**
     * Get the paused state of the player.
     *
     * @return {GetLoopPromise}
     */

  }, {
    key: "getPaused",
    value: function getPaused() {
      return this.get('paused');
    }
    /**
     * A promise to get the playback rate of the player.
     *
     * @promise GetPlaybackRatePromise
     * @fulfill {number} The playback rate of the player on a scale from 0.5 to 2.
     */

    /**
     * Get the playback rate of the player on a scale from `0.5` to `2`.
     *
     * @return {GetPlaybackRatePromise}
     */

  }, {
    key: "getPlaybackRate",
    value: function getPlaybackRate() {
      return this.get('playbackRate');
    }
    /**
     * A promise to set the playbackrate of the player.
     *
     * @promise SetPlaybackRatePromise
     * @fulfill {number} The playback rate was set.
     * @reject {RangeError} The playback rate was less than 0.5 or greater than 2.
     */

    /**
     * Set the playback rate of the player on a scale from `0.5` to `2`. When set
     * via the API, the playback rate will not be synchronized to other
     * players or stored as the viewer's preference.
     *
     * @param {number} playbackRate
     * @return {SetPlaybackRatePromise}
     */

  }, {
    key: "setPlaybackRate",
    value: function setPlaybackRate(playbackRate) {
      return this.set('playbackRate', playbackRate);
    }
    /**
     * A promise to get the played property of the video.
     *
     * @promise GetPlayedPromise
     * @fulfill {Array} Played Timeranges converted to an Array.
     */

    /**
     * Get the played property of the video.
     *
     * @return {GetPlayedPromise}
     */

  }, {
    key: "getPlayed",
    value: function getPlayed() {
      return this.get('played');
    }
    /**
     * A promise to get the seekable property of the video.
     *
     * @promise GetSeekablePromise
     * @fulfill {Array} Seekable Timeranges converted to an Array.
     */

    /**
     * Get the seekable property of the video.
     *
     * @return {GetSeekablePromise}
     */

  }, {
    key: "getSeekable",
    value: function getSeekable() {
      return this.get('seekable');
    }
    /**
     * A promise to get the seeking property of the player.
     *
     * @promise GetSeekingPromise
     * @fulfill {boolean} Whether or not the player is currently seeking.
     */

    /**
     * Get if the player is currently seeking.
     *
     * @return {GetSeekingPromise}
     */

  }, {
    key: "getSeeking",
    value: function getSeeking() {
      return this.get('seeking');
    }
    /**
     * A promise to get the text tracks of a video.
     *
     * @promise GetTextTracksPromise
     * @fulfill {VimeoTextTrack[]} The text tracks associated with the video.
     */

    /**
     * Get an array of the text tracks that exist for the video.
     *
     * @return {GetTextTracksPromise}
     */

  }, {
    key: "getTextTracks",
    value: function getTextTracks() {
      return this.get('textTracks');
    }
    /**
     * A promise to get the embed code for the video.
     *
     * @promise GetVideoEmbedCodePromise
     * @fulfill {string} The `<iframe>` embed code for the video.
     */

    /**
     * Get the `<iframe>` embed code for the video.
     *
     * @return {GetVideoEmbedCodePromise}
     */

  }, {
    key: "getVideoEmbedCode",
    value: function getVideoEmbedCode() {
      return this.get('videoEmbedCode');
    }
    /**
     * A promise to get the id of the video.
     *
     * @promise GetVideoIdPromise
     * @fulfill {number} The id of the video.
     */

    /**
     * Get the id of the video.
     *
     * @return {GetVideoIdPromise}
     */

  }, {
    key: "getVideoId",
    value: function getVideoId() {
      return this.get('videoId');
    }
    /**
     * A promise to get the title of the video.
     *
     * @promise GetVideoTitlePromise
     * @fulfill {number} The title of the video.
     */

    /**
     * Get the title of the video.
     *
     * @return {GetVideoTitlePromise}
     */

  }, {
    key: "getVideoTitle",
    value: function getVideoTitle() {
      return this.get('videoTitle');
    }
    /**
     * A promise to get the native width of the video.
     *
     * @promise GetVideoWidthPromise
     * @fulfill {number} The native width of the video.
     */

    /**
     * Get the native width of the currently‐playing video. The width of
     * the highest‐resolution available will be used before playback begins.
     *
     * @return {GetVideoWidthPromise}
     */

  }, {
    key: "getVideoWidth",
    value: function getVideoWidth() {
      return this.get('videoWidth');
    }
    /**
     * A promise to get the native height of the video.
     *
     * @promise GetVideoHeightPromise
     * @fulfill {number} The native height of the video.
     */

    /**
     * Get the native height of the currently‐playing video. The height of
     * the highest‐resolution available will be used before playback begins.
     *
     * @return {GetVideoHeightPromise}
     */

  }, {
    key: "getVideoHeight",
    value: function getVideoHeight() {
      return this.get('videoHeight');
    }
    /**
     * A promise to get the vimeo.com url for the video.
     *
     * @promise GetVideoUrlPromise
     * @fulfill {number} The vimeo.com url for the video.
     * @reject {PrivacyError} The url isn’t available because of the video’s privacy setting.
     */

    /**
     * Get the vimeo.com url for the video.
     *
     * @return {GetVideoUrlPromise}
     */

  }, {
    key: "getVideoUrl",
    value: function getVideoUrl() {
      return this.get('videoUrl');
    }
    /**
     * A promise to get the volume level of the player.
     *
     * @promise GetVolumePromise
     * @fulfill {number} The volume level of the player on a scale from 0 to 1.
     */

    /**
     * Get the current volume level of the player on a scale from `0` to `1`.
     *
     * Most mobile devices do not support an independent volume from the
     * system volume. In those cases, this method will always return `1`.
     *
     * @return {GetVolumePromise}
     */

  }, {
    key: "getVolume",
    value: function getVolume() {
      return this.get('volume');
    }
    /**
     * A promise to set the volume level of the player.
     *
     * @promise SetVolumePromise
     * @fulfill {number} The volume was set.
     * @reject {RangeError} The volume was less than 0 or greater than 1.
     */

    /**
     * Set the volume of the player on a scale from `0` to `1`. When set
     * via the API, the volume level will not be synchronized to other
     * players or stored as the viewer’s preference.
     *
     * Most mobile devices do not support setting the volume. An error will
     * *not* be triggered in that situation.
     *
     * @param {number} volume
     * @return {SetVolumePromise}
     */

  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      return this.set('volume', volume);
    }
  }]);

  return Player;
}(); // Setup embed only if this is not a node environment


if (!isNode) {
  initializeEmbeds();
  resizeEmbeds();
}

/* harmony default export */ __webpack_exports__["a"] = (Player);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js":
/***/ (function(module, exports) {

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);


/***/ }),

/***/ "./node_modules/bootstrap-tour/build/js/bootstrap-tour.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* ========================================================================
 * bootstrap-tour - v0.11.0
 * http://bootstraptour.com
 * ========================================================================
 * Copyright 2012-2015 Ulrich Sossou
 *
 * ========================================================================
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================================
 */

var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

(function(window, factory) {
  if (true) {
    return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function(jQuery) {
      return window.Tour = factory(jQuery);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    return module.exports = factory(require('jquery'));
  } else {
    return window.Tour = factory(window.jQuery);
  }
})(window, function($) {
  var Tour, document;
  document = window.document;
  Tour = (function() {
    function Tour(options) {
      this._showPopoverAndOverlay = bind(this._showPopoverAndOverlay, this);
      var storage;
      try {
        storage = window.localStorage;
      } catch (error) {
        storage = false;
      }
      this._options = $.extend({
        name: 'tour',
        steps: [],
        container: 'body',
        autoscroll: true,
        keyboard: true,
        storage: storage,
        debug: false,
        backdrop: false,
        backdropContainer: 'body',
        backdropPadding: 0,
        redirect: true,
        orphan: false,
        duration: false,
        delay: false,
        basePath: '',
        template: '<div class="popover" role="tooltip"> <div class="arrow"></div> <h3 class="popover-title"></h3> <div class="popover-content"></div> <div class="popover-navigation"> <div class="btn-group"> <button class="btn btn-sm btn-default" data-role="prev">&laquo; Prev</button> <button class="btn btn-sm btn-default" data-role="next">Next &raquo;</button> <button class="btn btn-sm btn-default" data-role="pause-resume" data-pause-text="Pause" data-resume-text="Resume">Pause</button> </div> <button class="btn btn-sm btn-default" data-role="end">End tour</button> </div> </div>',
        afterSetState: function(key, value) {},
        afterGetState: function(key, value) {},
        afterRemoveState: function(key) {},
        onStart: function(tour) {},
        onEnd: function(tour) {},
        onShow: function(tour) {},
        onShown: function(tour) {},
        onHide: function(tour) {},
        onHidden: function(tour) {},
        onNext: function(tour) {},
        onPrev: function(tour) {},
        onPause: function(tour, duration) {},
        onResume: function(tour, duration) {},
        onRedirectError: function(tour) {}
      }, options);
      this._force = false;
      this._inited = false;
      this._current = null;
      this.backdrops = [];
      this;
    }

    Tour.prototype.addSteps = function(steps) {
      var j, len, step;
      for (j = 0, len = steps.length; j < len; j++) {
        step = steps[j];
        this.addStep(step);
      }
      return this;
    };

    Tour.prototype.addStep = function(step) {
      this._options.steps.push(step);
      return this;
    };

    Tour.prototype.getStep = function(i) {
      if (this._options.steps[i] != null) {
        return $.extend({
          id: "step-" + i,
          path: '',
          host: '',
          placement: 'right',
          title: '',
          content: '<p></p>',
          next: i === this._options.steps.length - 1 ? -1 : i + 1,
          prev: i - 1,
          animation: true,
          container: this._options.container,
          autoscroll: this._options.autoscroll,
          backdrop: this._options.backdrop,
          backdropContainer: this._options.backdropContainer,
          backdropPadding: this._options.backdropPadding,
          redirect: this._options.redirect,
          reflexElement: this._options.steps[i].element,
          backdropElement: this._options.steps[i].element,
          orphan: this._options.orphan,
          duration: this._options.duration,
          delay: this._options.delay,
          template: this._options.template,
          onShow: this._options.onShow,
          onShown: this._options.onShown,
          onHide: this._options.onHide,
          onHidden: this._options.onHidden,
          onNext: this._options.onNext,
          onPrev: this._options.onPrev,
          onPause: this._options.onPause,
          onResume: this._options.onResume,
          onRedirectError: this._options.onRedirectError
        }, this._options.steps[i]);
      }
    };

    Tour.prototype.init = function(force) {
      this._force = force;
      if (this.ended()) {
        this._debug('Tour ended, init prevented.');
        return this;
      }
      this.setCurrentStep();
      this._initMouseNavigation();
      this._initKeyboardNavigation();
      this._onResize((function(_this) {
        return function() {
          return _this.showStep(_this._current);
        };
      })(this));
      this._onScroll((function(_this) {
        return function() {
          return _this._showPopoverAndOverlay(_this._current);
        };
      })(this));
      if (this._current !== null) {
        this.showStep(this._current);
      }
      this._inited = true;
      return this;
    };

    Tour.prototype.start = function(force) {
      var promise;
      if (force == null) {
        force = false;
      }
      if (!this._inited) {
        this.init(force);
      }
      if (this._current === null) {
        promise = this._makePromise(this._options.onStart != null ? this._options.onStart(this) : void 0);
        this._callOnPromiseDone(promise, this.showStep, 0);
      }
      return this;
    };

    Tour.prototype.next = function() {
      var promise;
      promise = this.hideStep(this._current, this._current + 1);
      return this._callOnPromiseDone(promise, this._showNextStep);
    };

    Tour.prototype.prev = function() {
      var promise;
      promise = this.hideStep(this._current, this._current - 1);
      return this._callOnPromiseDone(promise, this._showPrevStep);
    };

    Tour.prototype.goTo = function(i) {
      var promise;
      promise = this.hideStep(this._current, i);
      return this._callOnPromiseDone(promise, this.showStep, i);
    };

    Tour.prototype.end = function() {
      var endHelper, promise;
      endHelper = (function(_this) {
        return function(e) {
          $(document).off("click.tour-" + _this._options.name);
          $(document).off("keyup.tour-" + _this._options.name);
          $(window).off("resize.tour-" + _this._options.name);
          $(window).off("scroll.tour-" + _this._options.name);
          _this._setState('end', 'yes');
          _this._inited = false;
          _this._force = false;
          _this._clearTimer();
          if (_this._options.onEnd != null) {
            return _this._options.onEnd(_this);
          }
        };
      })(this);
      promise = this.hideStep(this._current);
      return this._callOnPromiseDone(promise, endHelper);
    };

    Tour.prototype.ended = function() {
      return !this._force && !!this._getState('end');
    };

    Tour.prototype.restart = function() {
      this._removeState('current_step');
      this._removeState('end');
      this._removeState('redirect_to');
      return this.start();
    };

    Tour.prototype.pause = function() {
      var step;
      step = this.getStep(this._current);
      if (!(step && step.duration)) {
        return this;
      }
      this._paused = true;
      this._duration -= new Date().getTime() - this._start;
      window.clearTimeout(this._timer);
      this._debug("Paused/Stopped step " + (this._current + 1) + " timer (" + this._duration + " remaining).");
      if (step.onPause != null) {
        return step.onPause(this, this._duration);
      }
    };

    Tour.prototype.resume = function() {
      var step;
      step = this.getStep(this._current);
      if (!(step && step.duration)) {
        return this;
      }
      this._paused = false;
      this._start = new Date().getTime();
      this._duration = this._duration || step.duration;
      this._timer = window.setTimeout((function(_this) {
        return function() {
          if (_this._isLast()) {
            return _this.next();
          } else {
            return _this.end();
          }
        };
      })(this), this._duration);
      this._debug("Started step " + (this._current + 1) + " timer with duration " + this._duration);
      if ((step.onResume != null) && this._duration !== step.duration) {
        return step.onResume(this, this._duration);
      }
    };

    Tour.prototype.hideStep = function(i, iNext) {
      var hideDelay, hideStepHelper, promise, step;
      step = this.getStep(i);
      if (!step) {
        return;
      }
      this._clearTimer();
      promise = this._makePromise(step.onHide != null ? step.onHide(this, i) : void 0);
      hideStepHelper = (function(_this) {
        return function(e) {
          var $element, next_step;
          $element = $(step.element);
          if (!($element.data('bs.popover') || $element.data('popover'))) {
            $element = $('body');
          }
          $element.popover('destroy').removeClass("tour-" + _this._options.name + "-element tour-" + _this._options.name + "-" + i + "-element").removeData('bs.popover');
          if (step.reflex) {
            $(step.reflexElement).removeClass('tour-step-element-reflex').off((_this._reflexEvent(step.reflex)) + ".tour-" + _this._options.name);
          }
          if (step.backdrop) {
            next_step = (iNext != null) && _this.getStep(iNext);
            if (!next_step || !next_step.backdrop || next_step.backdropElement !== step.backdropElement) {
              _this._hideOverlayElement(step);
            }
          }
          if (step.onHidden != null) {
            return step.onHidden(_this);
          }
        };
      })(this);
      hideDelay = step.delay.hide || step.delay;
      if ({}.toString.call(hideDelay) === '[object Number]' && hideDelay > 0) {
        this._debug("Wait " + hideDelay + " milliseconds to hide the step " + (this._current + 1));
        window.setTimeout((function(_this) {
          return function() {
            return _this._callOnPromiseDone(promise, hideStepHelper);
          };
        })(this), hideDelay);
      } else {
        this._callOnPromiseDone(promise, hideStepHelper);
      }
      return promise;
    };

    Tour.prototype.showStep = function(i) {
      var path, promise, showDelay, showStepHelper, skipToPrevious, step;
      if (this.ended()) {
        this._debug('Tour ended, showStep prevented.');
        return this;
      }
      step = this.getStep(i);
      if (!step) {
        return;
      }
      skipToPrevious = i < this._current;
      promise = this._makePromise(step.onShow != null ? step.onShow(this, i) : void 0);
      this.setCurrentStep(i);
      path = (function() {
        switch ({}.toString.call(step.path)) {
          case '[object Function]':
            return step.path();
          case '[object String]':
            return this._options.basePath + step.path;
          default:
            return step.path;
        }
      }).call(this);
      if (step.redirect && this._isRedirect(step.host, path, document.location)) {
        this._redirect(step, i, path);
        if (!this._isJustPathHashDifferent(step.host, path, document.location)) {
          return;
        }
      }
      showStepHelper = (function(_this) {
        return function(e) {
          if (_this._isOrphan(step)) {
            if (step.orphan === false) {
              _this._debug("Skip the orphan step " + (_this._current + 1) + ".\nOrphan option is false and the element does not exist or is hidden.");
              if (skipToPrevious) {
                _this._showPrevStep();
              } else {
                _this._showNextStep();
              }
              return;
            }
            _this._debug("Show the orphan step " + (_this._current + 1) + ". Orphans option is true.");
          }
          if (step.autoscroll) {
            _this._scrollIntoView(i);
          } else {
            _this._showPopoverAndOverlay(i);
          }
          if (step.duration) {
            return _this.resume();
          }
        };
      })(this);
      showDelay = step.delay.show || step.delay;
      if ({}.toString.call(showDelay) === '[object Number]' && showDelay > 0) {
        this._debug("Wait " + showDelay + " milliseconds to show the step " + (this._current + 1));
        window.setTimeout((function(_this) {
          return function() {
            return _this._callOnPromiseDone(promise, showStepHelper);
          };
        })(this), showDelay);
      } else {
        this._callOnPromiseDone(promise, showStepHelper);
      }
      return promise;
    };

    Tour.prototype.getCurrentStep = function() {
      return this._current;
    };

    Tour.prototype.setCurrentStep = function(value) {
      if (value != null) {
        this._current = value;
        this._setState('current_step', value);
      } else {
        this._current = this._getState('current_step');
        this._current = this._current === null ? null : parseInt(this._current, 10);
      }
      return this;
    };

    Tour.prototype.redraw = function() {
      return this._showOverlayElement(this.getStep(this.getCurrentStep()));
    };

    Tour.prototype._setState = function(key, value) {
      var e, keyName;
      if (this._options.storage) {
        keyName = this._options.name + "_" + key;
        try {
          this._options.storage.setItem(keyName, value);
        } catch (error) {
          e = error;
          if (e.code === DOMException.QUOTA_EXCEEDED_ERR) {
            this._debug('LocalStorage quota exceeded. State storage failed.');
          }
        }
        return this._options.afterSetState(keyName, value);
      } else {
        if (this._state == null) {
          this._state = {};
        }
        return this._state[key] = value;
      }
    };

    Tour.prototype._removeState = function(key) {
      var keyName;
      if (this._options.storage) {
        keyName = this._options.name + "_" + key;
        this._options.storage.removeItem(keyName);
        return this._options.afterRemoveState(keyName);
      } else {
        if (this._state != null) {
          return delete this._state[key];
        }
      }
    };

    Tour.prototype._getState = function(key) {
      var keyName, value;
      if (this._options.storage) {
        keyName = this._options.name + "_" + key;
        value = this._options.storage.getItem(keyName);
      } else {
        if (this._state != null) {
          value = this._state[key];
        }
      }
      if (value === void 0 || value === 'null') {
        value = null;
      }
      this._options.afterGetState(key, value);
      return value;
    };

    Tour.prototype._showNextStep = function() {
      var promise, showNextStepHelper, step;
      step = this.getStep(this._current);
      showNextStepHelper = (function(_this) {
        return function(e) {
          return _this.showStep(step.next);
        };
      })(this);
      promise = this._makePromise(step.onNext != null ? step.onNext(this) : void 0);
      return this._callOnPromiseDone(promise, showNextStepHelper);
    };

    Tour.prototype._showPrevStep = function() {
      var promise, showPrevStepHelper, step;
      step = this.getStep(this._current);
      showPrevStepHelper = (function(_this) {
        return function(e) {
          return _this.showStep(step.prev);
        };
      })(this);
      promise = this._makePromise(step.onPrev != null ? step.onPrev(this) : void 0);
      return this._callOnPromiseDone(promise, showPrevStepHelper);
    };

    Tour.prototype._debug = function(text) {
      if (this._options.debug) {
        return window.console.log("Bootstrap Tour '" + this._options.name + "' | " + text);
      }
    };

    Tour.prototype._isRedirect = function(host, path, location) {
      var currentPath;
      if ((host != null) && host !== '' && (({}.toString.call(host) === '[object RegExp]' && !host.test(location.origin)) || ({}.toString.call(host) === '[object String]' && this._isHostDifferent(host, location)))) {
        return true;
      }
      currentPath = [location.pathname, location.search, location.hash].join('');
      return (path != null) && path !== '' && (({}.toString.call(path) === '[object RegExp]' && !path.test(currentPath)) || ({}.toString.call(path) === '[object String]' && this._isPathDifferent(path, currentPath)));
    };

    Tour.prototype._isHostDifferent = function(host, location) {
      switch ({}.toString.call(host)) {
        case '[object RegExp]':
          return !host.test(location.origin);
        case '[object String]':
          return this._getProtocol(host) !== this._getProtocol(location.href) || this._getHost(host) !== this._getHost(location.href);
        default:
          return true;
      }
    };

    Tour.prototype._isPathDifferent = function(path, currentPath) {
      return this._getPath(path) !== this._getPath(currentPath) || !this._equal(this._getQuery(path), this._getQuery(currentPath)) || !this._equal(this._getHash(path), this._getHash(currentPath));
    };

    Tour.prototype._isJustPathHashDifferent = function(host, path, location) {
      var currentPath;
      if ((host != null) && host !== '') {
        if (this._isHostDifferent(host, location)) {
          return false;
        }
      }
      currentPath = [location.pathname, location.search, location.hash].join('');
      if ({}.toString.call(path) === '[object String]') {
        return this._getPath(path) === this._getPath(currentPath) && this._equal(this._getQuery(path), this._getQuery(currentPath)) && !this._equal(this._getHash(path), this._getHash(currentPath));
      }
      return false;
    };

    Tour.prototype._redirect = function(step, i, path) {
      var href;
      if ($.isFunction(step.redirect)) {
        return step.redirect.call(this, path);
      } else {
        href = {}.toString.call(step.host) === '[object String]' ? "" + step.host + path : path;
        this._debug("Redirect to " + href);
        if (this._getState('redirect_to') === ("" + i)) {
          this._debug("Error redirection loop to " + path);
          this._removeState('redirect_to');
          if (step.onRedirectError != null) {
            return step.onRedirectError(this);
          }
        } else {
          this._setState('redirect_to', "" + i);
          return document.location.href = href;
        }
      }
    };

    Tour.prototype._isOrphan = function(step) {
      return (step.element == null) || !$(step.element).length || $(step.element).is(':hidden') && ($(step.element)[0].namespaceURI !== 'http://www.w3.org/2000/svg');
    };

    Tour.prototype._isLast = function() {
      return this._current < this._options.steps.length - 1;
    };

    Tour.prototype._showPopoverAndOverlay = function(i) {
      var step;
      if (this.getCurrentStep() !== i || this.ended()) {
        return;
      }
      step = this.getStep(i);
      if (step.backdrop) {
        this._showOverlayElement(step);
      }
      this._showPopover(step, i);
      if (step.onShown != null) {
        step.onShown(this);
      }
      return this._debug("Step " + (this._current + 1) + " of " + this._options.steps.length);
    };

    Tour.prototype._showPopover = function(step, i) {
      var $element, $tip, isOrphan, options, shouldAddSmart;
      $(".tour-" + this._options.name).remove();
      options = $.extend({}, this._options);
      isOrphan = this._isOrphan(step);
      step.template = this._template(step, i);
      if (isOrphan) {
        step.element = 'body';
        step.placement = 'top';
      }
      $element = $(step.element);
      $element.addClass("tour-" + this._options.name + "-element tour-" + this._options.name + "-" + i + "-element");
      if (step.options) {
        $.extend(options, step.options);
      }
      if (step.reflex && !isOrphan) {
        $(step.reflexElement).addClass('tour-step-element-reflex').off((this._reflexEvent(step.reflex)) + ".tour-" + this._options.name).on((this._reflexEvent(step.reflex)) + ".tour-" + this._options.name, (function(_this) {
          return function() {
            if (_this._isLast()) {
              return _this.next();
            } else {
              return _this.end();
            }
          };
        })(this));
      }
      shouldAddSmart = step.smartPlacement === true && step.placement.search(/auto/i) === -1;
      $element.popover({
        placement: shouldAddSmart ? "auto " + step.placement : step.placement,
        trigger: 'manual',
        title: step.title,
        content: step.content,
        html: true,
        animation: step.animation,
        container: step.container,
        template: step.template,
        selector: step.element
      }).popover('show');
      $tip = $element.data('bs.popover') ? $element.data('bs.popover').tip() : $element.data('popover').tip();
      $tip.attr('id', step.id);
      if ($element.css('position') === 'fixed') {
        $tip.css('position', 'fixed');
      }
      this._reposition($tip, step);
      if (isOrphan) {
        return this._center($tip);
      }
    };

    Tour.prototype._template = function(step, i) {
      var $navigation, $next, $prev, $resume, $template, template;
      template = step.template;
      if (this._isOrphan(step) && {}.toString.call(step.orphan) !== '[object Boolean]') {
        template = step.orphan;
      }
      $template = $.isFunction(template) ? $(template(i, step)) : $(template);
      $navigation = $template.find('.popover-navigation');
      $prev = $navigation.find('[data-role="prev"]');
      $next = $navigation.find('[data-role="next"]');
      $resume = $navigation.find('[data-role="pause-resume"]');
      if (this._isOrphan(step)) {
        $template.addClass('orphan');
      }
      $template.addClass("tour-" + this._options.name + " tour-" + this._options.name + "-" + i);
      if (step.reflex) {
        $template.addClass("tour-" + this._options.name + "-reflex");
      }
      if (step.prev < 0) {
        $prev.addClass('disabled').prop('disabled', true).prop('tabindex', -1);
      }
      if (step.next < 0) {
        $next.addClass('disabled').prop('disabled', true).prop('tabindex', -1);
      }
      if (!step.duration) {
        $resume.remove();
      }
      return $template.clone().wrap('<div>').parent().html();
    };

    Tour.prototype._reflexEvent = function(reflex) {
      if ({}.toString.call(reflex) === '[object Boolean]') {
        return 'click';
      } else {
        return reflex;
      }
    };

    Tour.prototype._reposition = function($tip, step) {
      var offsetBottom, offsetHeight, offsetRight, offsetWidth, originalLeft, originalTop, tipOffset;
      offsetWidth = $tip[0].offsetWidth;
      offsetHeight = $tip[0].offsetHeight;
      tipOffset = $tip.offset();
      originalLeft = tipOffset.left;
      originalTop = tipOffset.top;
      offsetBottom = $(document).outerHeight() - tipOffset.top - $tip.outerHeight();
      if (offsetBottom < 0) {
        tipOffset.top = tipOffset.top + offsetBottom;
      }
      offsetRight = $('html').outerWidth() - tipOffset.left - $tip.outerWidth();
      if (offsetRight < 0) {
        tipOffset.left = tipOffset.left + offsetRight;
      }
      if (tipOffset.top < 0) {
        tipOffset.top = 0;
      }
      if (tipOffset.left < 0) {
        tipOffset.left = 0;
      }
      $tip.offset(tipOffset);
      if (step.placement === 'bottom' || step.placement === 'top') {
        if (originalLeft !== tipOffset.left) {
          return this._replaceArrow($tip, (tipOffset.left - originalLeft) * 2, offsetWidth, 'left');
        }
      } else {
        if (originalTop !== tipOffset.top) {
          return this._replaceArrow($tip, (tipOffset.top - originalTop) * 2, offsetHeight, 'top');
        }
      }
    };

    Tour.prototype._center = function($tip) {
      return $tip.css('top', $(window).outerHeight() / 2 - $tip.outerHeight() / 2);
    };

    Tour.prototype._replaceArrow = function($tip, delta, dimension, position) {
      return $tip.find('.arrow').css(position, delta ? 50 * (1 - delta / dimension) + '%' : '');
    };

    Tour.prototype._scrollIntoView = function(i) {
      var $element, $window, counter, height, offsetTop, scrollTop, step, windowHeight;
      step = this.getStep(i);
      $element = $(step.element);
      if (!$element.length) {
        return this._showPopoverAndOverlay(i);
      }
      $window = $(window);
      offsetTop = $element.offset().top;
      height = $element.outerHeight();
      windowHeight = $window.height();
      scrollTop = 0;
      switch (step.placement) {
        case 'top':
          scrollTop = Math.max(0, offsetTop - (windowHeight / 2));
          break;
        case 'left':
        case 'right':
          scrollTop = Math.max(0, (offsetTop + height / 2) - (windowHeight / 2));
          break;
        case 'bottom':
          scrollTop = Math.max(0, (offsetTop + height) - (windowHeight / 2));
      }
      this._debug("Scroll into view. ScrollTop: " + scrollTop + ". Element offset: " + offsetTop + ". Window height: " + windowHeight + ".");
      counter = 0;
      return $('body, html').stop(true, true).animate({
        scrollTop: Math.ceil(scrollTop)
      }, (function(_this) {
        return function() {
          if (++counter === 2) {
            _this._showPopoverAndOverlay(i);
            return _this._debug("Scroll into view.\nAnimation end element offset: " + ($element.offset().top) + ".\nWindow height: " + ($window.height()) + ".");
          }
        };
      })(this));
    };

    Tour.prototype._onResize = function(callback, timeout) {
      return $(window).on("resize.tour-" + this._options.name, function() {
        clearTimeout(timeout);
        return timeout = setTimeout(callback, 100);
      });
    };

    Tour.prototype._onScroll = function(callback, timeout) {
      return $(window).on("scroll.tour-" + this._options.name, function() {
        clearTimeout(timeout);
        return timeout = setTimeout(callback, 100);
      });
    };

    Tour.prototype._initMouseNavigation = function() {
      var _this;
      _this = this;
      return $(document).off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='prev']").off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='next']").off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='end']").off("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='pause-resume']").on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='next']", (function(_this) {
        return function(e) {
          e.preventDefault();
          return _this.next();
        };
      })(this)).on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='prev']", (function(_this) {
        return function(e) {
          e.preventDefault();
          if (_this._current > 0) {
            return _this.prev();
          }
        };
      })(this)).on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='end']", (function(_this) {
        return function(e) {
          e.preventDefault();
          return _this.end();
        };
      })(this)).on("click.tour-" + this._options.name, ".popover.tour-" + this._options.name + " *[data-role='pause-resume']", function(e) {
        var $this;
        e.preventDefault();
        $this = $(this);
        $this.text(_this._paused ? $this.data('pause-text') : $this.data('resume-text'));
        if (_this._paused) {
          return _this.resume();
        } else {
          return _this.pause();
        }
      });
    };

    Tour.prototype._initKeyboardNavigation = function() {
      if (!this._options.keyboard) {
        return;
      }
      return $(document).on("keyup.tour-" + this._options.name, (function(_this) {
        return function(e) {
          if (!e.which) {
            return;
          }
          switch (e.which) {
            case 39:
              e.preventDefault();
              if (_this._isLast()) {
                return _this.next();
              } else {
                return _this.end();
              }
              break;
            case 37:
              e.preventDefault();
              if (_this._current > 0) {
                return _this.prev();
              }
          }
        };
      })(this));
    };

    Tour.prototype._makePromise = function(result) {
      if (result && $.isFunction(result.then)) {
        return result;
      } else {
        return null;
      }
    };

    Tour.prototype._callOnPromiseDone = function(promise, cb, arg) {
      if (promise) {
        return promise.then((function(_this) {
          return function(e) {
            return cb.call(_this, arg);
          };
        })(this));
      } else {
        return cb.call(this, arg);
      }
    };

    Tour.prototype._showBackground = function(step, data) {
      var $backdrop, base, height, j, len, pos, ref, results, width;
      height = $(document).height();
      width = $(document).width();
      ref = ['top', 'bottom', 'left', 'right'];
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        pos = ref[j];
        $backdrop = (base = this.backdrops)[pos] != null ? base[pos] : base[pos] = $('<div>', {
          "class": "tour-backdrop " + pos
        });
        $(step.backdropContainer).append($backdrop);
        switch (pos) {
          case 'top':
            results.push($backdrop.height(data.offset.top > 0 ? data.offset.top : 0).width(width).offset({
              top: 0,
              left: 0
            }));
            break;
          case 'bottom':
            results.push($backdrop.offset({
              top: data.offset.top + data.height,
              left: 0
            }).height(height - (data.offset.top + data.height)).width(width));
            break;
          case 'left':
            results.push($backdrop.offset({
              top: data.offset.top,
              left: 0
            }).height(data.height).width(data.offset.left > 0 ? data.offset.left : 0));
            break;
          case 'right':
            results.push($backdrop.offset({
              top: data.offset.top,
              left: data.offset.left + data.width
            }).height(data.height).width(width - (data.offset.left + data.width)));
            break;
          default:
            results.push(void 0);
        }
      }
      return results;
    };

    Tour.prototype._showOverlayElement = function(step) {
      var $backdropElement, elementData;
      $backdropElement = $(step.backdropElement);
      if ($backdropElement.length === 0) {
        elementData = {
          width: 0,
          height: 0,
          offset: {
            top: 0,
            left: 0
          }
        };
      } else {
        elementData = {
          width: $backdropElement.innerWidth(),
          height: $backdropElement.innerHeight(),
          offset: $backdropElement.offset()
        };
        $backdropElement.addClass('tour-step-backdrop');
        if (step.backdropPadding) {
          elementData = this._applyBackdropPadding(step.backdropPadding, elementData);
        }
      }
      return this._showBackground(step, elementData);
    };

    Tour.prototype._hideOverlayElement = function(step) {
      var $backdrop, pos, ref;
      $(step.backdropElement).removeClass('tour-step-backdrop');
      ref = this.backdrops;
      for (pos in ref) {
        $backdrop = ref[pos];
        if ($backdrop && $backdrop.remove !== void 0) {
          $backdrop.remove();
        }
      }
      return this.backdrops = [];
    };

    Tour.prototype._applyBackdropPadding = function(padding, data) {
      if (typeof padding === 'object') {
        if (padding.top == null) {
          padding.top = 0;
        }
        if (padding.right == null) {
          padding.right = 0;
        }
        if (padding.bottom == null) {
          padding.bottom = 0;
        }
        if (padding.left == null) {
          padding.left = 0;
        }
        data.offset.top = data.offset.top - padding.top;
        data.offset.left = data.offset.left - padding.left;
        data.width = data.width + padding.left + padding.right;
        data.height = data.height + padding.top + padding.bottom;
      } else {
        data.offset.top = data.offset.top - padding;
        data.offset.left = data.offset.left - padding;
        data.width = data.width + (padding * 2);
        data.height = data.height + (padding * 2);
      }
      return data;
    };

    Tour.prototype._clearTimer = function() {
      window.clearTimeout(this._timer);
      this._timer = null;
      return this._duration = null;
    };

    Tour.prototype._getProtocol = function(url) {
      url = url.split('://');
      if (url.length > 1) {
        return url[0];
      } else {
        return 'http';
      }
    };

    Tour.prototype._getHost = function(url) {
      url = url.split('//');
      url = url.length > 1 ? url[1] : url[0];
      return url.split('/')[0];
    };

    Tour.prototype._getPath = function(path) {
      return path.replace(/\/?$/, '').split('?')[0].split('#')[0];
    };

    Tour.prototype._getQuery = function(path) {
      return this._getParams(path, '?');
    };

    Tour.prototype._getHash = function(path) {
      return this._getParams(path, '#');
    };

    Tour.prototype._getParams = function(path, start) {
      var j, len, param, params, paramsObject;
      params = path.split(start);
      if (params.length === 1) {
        return {};
      }
      params = params[1].split('&');
      paramsObject = {};
      for (j = 0, len = params.length; j < len; j++) {
        param = params[j];
        param = param.split('=');
        paramsObject[param[0]] = param[1] || '';
      }
      return paramsObject;
    };

    Tour.prototype._equal = function(obj1, obj2) {
      var j, k, len, obj1Keys, obj2Keys, v;
      if ({}.toString.call(obj1) === '[object Object]' && {}.toString.call(obj2) === '[object Object]') {
        obj1Keys = Object.keys(obj1);
        obj2Keys = Object.keys(obj2);
        if (obj1Keys.length !== obj2Keys.length) {
          return false;
        }
        for (k in obj1) {
          v = obj1[k];
          if (!this._equal(obj2[k], v)) {
            return false;
          }
        }
        return true;
      } else if ({}.toString.call(obj1) === '[object Array]' && {}.toString.call(obj2) === '[object Array]') {
        if (obj1.length !== obj2.length) {
          return false;
        }
        for (k = j = 0, len = obj1.length; j < len; k = ++j) {
          v = obj1[k];
          if (!this._equal(v, obj2[k])) {
            return false;
          }
        }
        return true;
      } else {
        return obj1 === obj2;
      }
    };

    return Tour;

  })();
  return Tour;
});


/***/ }),

/***/ "./node_modules/jquery/dist/jquery.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.4.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2019-05-01T21:04Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.4.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code, options ) {
		DOMEval( code, { nonce: options && options.nonce } );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.4
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2019-04-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) &&

				// Support: IE 8 only
				// Exclude object elements
				(nodeType !== 1 || context.nodeName.toLowerCase() !== "object") ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 && rdescend.test( selector ) ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = (elem.ownerDocument || elem).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( typeof elem.contentDocument !== "undefined" ) {
			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								} );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	// Support: IE 9-11 only
	// Also use offsetWidth/offsetHeight for when box sizing is unreliable
	// We use getClientRects() to check for hidden/disconnected.
	// In those cases, the computed value can be trusted to be border-box
	if ( ( !support.boxSizingReliable() && isBorderBox ||
		val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url, options ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),

/***/ "./node_modules/parsleyjs/dist/parsley.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*!
* Parsley.js
* Version 2.9.1 - built Tue, Apr 30th 2019, 1:56 am
* http://parsleyjs.org
* Guillaume Potier - <guillaume@wisembly.com>
* Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
* MIT Licensed
*/

// The source code below is generated by babel as
// Parsley is written in ECMAScript 6
//

(function (global, factory) {
   true ? module.exports = factory(__webpack_require__("./node_modules/jquery/dist/jquery.js")) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global.parsley = factory(global.jQuery));
}(this, (function ($) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var globalID = 1;
  var pastWarnings = {};
  var Utils = {
    // Parsley DOM-API
    // returns object from dom attributes and values
    attr: function attr(element, namespace, obj) {
      var i;
      var attribute;
      var attributes;
      var regex = new RegExp('^' + namespace, 'i');
      if ('undefined' === typeof obj) obj = {};else {
        // Clear all own properties. This won't affect prototype's values
        for (i in obj) {
          if (obj.hasOwnProperty(i)) delete obj[i];
        }
      }
      if (!element) return obj;
      attributes = element.attributes;

      for (i = attributes.length; i--;) {
        attribute = attributes[i];

        if (attribute && attribute.specified && regex.test(attribute.name)) {
          obj[this.camelize(attribute.name.slice(namespace.length))] = this.deserializeValue(attribute.value);
        }
      }

      return obj;
    },
    checkAttr: function checkAttr(element, namespace, _checkAttr) {
      return element.hasAttribute(namespace + _checkAttr);
    },
    setAttr: function setAttr(element, namespace, attr, value) {
      element.setAttribute(this.dasherize(namespace + attr), String(value));
    },
    getType: function getType(element) {
      return element.getAttribute('type') || 'text';
    },
    generateID: function generateID() {
      return '' + globalID++;
    },

    /** Third party functions **/
    deserializeValue: function deserializeValue(value) {
      var num;

      try {
        return value ? value == "true" || (value == "false" ? false : value == "null" ? null : !isNaN(num = Number(value)) ? num : /^[\[\{]/.test(value) ? JSON.parse(value) : value) : value;
      } catch (e) {
        return value;
      }
    },
    // Zepto camelize function
    camelize: function camelize(str) {
      return str.replace(/-+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
      });
    },
    // Zepto dasherize function
    dasherize: function dasherize(str) {
      return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
    },
    warn: function warn() {
      var _window$console;

      if (window.console && 'function' === typeof window.console.warn) (_window$console = window.console).warn.apply(_window$console, arguments);
    },
    warnOnce: function warnOnce(msg) {
      if (!pastWarnings[msg]) {
        pastWarnings[msg] = true;
        this.warn.apply(this, arguments);
      }
    },
    _resetWarnings: function _resetWarnings() {
      pastWarnings = {};
    },
    trimString: function trimString(string) {
      return string.replace(/^\s+|\s+$/g, '');
    },
    parse: {
      date: function date(string) {
        var parsed = string.match(/^(\d{4,})-(\d\d)-(\d\d)$/);
        if (!parsed) return null;

        var _parsed$map = parsed.map(function (x) {
          return parseInt(x, 10);
        }),
            _parsed$map2 = _slicedToArray(_parsed$map, 4),
            _ = _parsed$map2[0],
            year = _parsed$map2[1],
            month = _parsed$map2[2],
            day = _parsed$map2[3];

        var date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) return null;
        return date;
      },
      string: function string(_string) {
        return _string;
      },
      integer: function integer(string) {
        if (isNaN(string)) return null;
        return parseInt(string, 10);
      },
      number: function number(string) {
        if (isNaN(string)) throw null;
        return parseFloat(string);
      },
      'boolean': function _boolean(string) {
        return !/^\s*false\s*$/i.test(string);
      },
      object: function object(string) {
        return Utils.deserializeValue(string);
      },
      regexp: function regexp(_regexp) {
        var flags = ''; // Test if RegExp is literal, if not, nothing to be done, otherwise, we need to isolate flags and pattern

        if (/^\/.*\/(?:[gimy]*)$/.test(_regexp)) {
          // Replace the regexp literal string with the first match group: ([gimy]*)
          // If no flag is present, this will be a blank string
          flags = _regexp.replace(/.*\/([gimy]*)$/, '$1'); // Again, replace the regexp literal string with the first match group:
          // everything excluding the opening and closing slashes and the flags

          _regexp = _regexp.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
        } else {
          // Anchor regexp:
          _regexp = '^' + _regexp + '$';
        }

        return new RegExp(_regexp, flags);
      }
    },
    parseRequirement: function parseRequirement(requirementType, string) {
      var converter = this.parse[requirementType || 'string'];
      if (!converter) throw 'Unknown requirement specification: "' + requirementType + '"';
      var converted = converter(string);
      if (converted === null) throw "Requirement is not a ".concat(requirementType, ": \"").concat(string, "\"");
      return converted;
    },
    namespaceEvents: function namespaceEvents(events, namespace) {
      events = this.trimString(events || '').split(/\s+/);
      if (!events[0]) return '';
      return $.map(events, function (evt) {
        return "".concat(evt, ".").concat(namespace);
      }).join(' ');
    },
    difference: function difference(array, remove) {
      // This is O(N^2), should be optimized
      var result = [];
      $.each(array, function (_, elem) {
        if (remove.indexOf(elem) == -1) result.push(elem);
      });
      return result;
    },
    // Alter-ego to native Promise.all, but for jQuery
    all: function all(promises) {
      // jQuery treats $.when() and $.when(singlePromise) differently; let's avoid that and add spurious elements
      return $.when.apply($, _toConsumableArray(promises).concat([42, 42]));
    },
    // Object.create polyfill, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
    objectCreate: Object.create || function () {
      var Object = function Object() {};

      return function (prototype) {
        if (arguments.length > 1) {
          throw Error('Second argument not supported');
        }

        if (_typeof(prototype) != 'object') {
          throw TypeError('Argument must be an object');
        }

        Object.prototype = prototype;
        var result = new Object();
        Object.prototype = null;
        return result;
      };
    }(),
    _SubmitSelector: 'input[type="submit"], button:submit'
  };

  // All these options could be overriden and specified directly in DOM using
  // `data-parsley-` default DOM-API
  // eg: `inputs` can be set in DOM using `data-parsley-inputs="input, textarea"`
  // eg: `data-parsley-stop-on-first-failing-constraint="false"`
  var Defaults = {
    // ### General
    // Default data-namespace for DOM API
    namespace: 'data-parsley-',
    // Supported inputs by default
    inputs: 'input, textarea, select',
    // Excluded inputs by default
    excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]',
    // Stop validating field on highest priority failing constraint
    priorityEnabled: true,
    // ### Field only
    // identifier used to group together inputs (e.g. radio buttons...)
    multiple: null,
    // identifier (or array of identifiers) used to validate only a select group of inputs
    group: null,
    // ### UI
    // Enable\Disable error messages
    uiEnabled: true,
    // Key events threshold before validation
    validationThreshold: 3,
    // Focused field on form validation error. 'first'|'last'|'none'
    focus: 'first',
    // event(s) that will trigger validation before first failure. eg: `input`...
    trigger: false,
    // event(s) that will trigger validation after first failure.
    triggerAfterFailure: 'input',
    // Class that would be added on every failing validation Parsley field
    errorClass: 'parsley-error',
    // Same for success validation
    successClass: 'parsley-success',
    // Return the `$element` that will receive these above success or error classes
    // Could also be (and given directly from DOM) a valid selector like `'#div'`
    classHandler: function classHandler(Field) {},
    // Return the `$element` where errors will be appended
    // Could also be (and given directly from DOM) a valid selector like `'#div'`
    errorsContainer: function errorsContainer(Field) {},
    // ul elem that would receive errors' list
    errorsWrapper: '<ul class="parsley-errors-list"></ul>',
    // li elem that would receive error message
    errorTemplate: '<li></li>'
  };

  var Base = function Base() {
    this.__id__ = Utils.generateID();
  };

  Base.prototype = {
    asyncSupport: true,
    // Deprecated
    _pipeAccordingToValidationResult: function _pipeAccordingToValidationResult() {
      var _this = this;

      var pipe = function pipe() {
        var r = $.Deferred();
        if (true !== _this.validationResult) r.reject();
        return r.resolve().promise();
      };

      return [pipe, pipe];
    },
    actualizeOptions: function actualizeOptions() {
      Utils.attr(this.element, this.options.namespace, this.domOptions);
      if (this.parent && this.parent.actualizeOptions) this.parent.actualizeOptions();
      return this;
    },
    _resetOptions: function _resetOptions(initOptions) {
      this.domOptions = Utils.objectCreate(this.parent.options);
      this.options = Utils.objectCreate(this.domOptions); // Shallow copy of ownProperties of initOptions:

      for (var i in initOptions) {
        if (initOptions.hasOwnProperty(i)) this.options[i] = initOptions[i];
      }

      this.actualizeOptions();
    },
    _listeners: null,
    // Register a callback for the given event name
    // Callback is called with context as the first argument and the `this`
    // The context is the current parsley instance, or window.Parsley if global
    // A return value of `false` will interrupt the calls
    on: function on(name, fn) {
      this._listeners = this._listeners || {};
      var queue = this._listeners[name] = this._listeners[name] || [];
      queue.push(fn);
      return this;
    },
    // Deprecated. Use `on` instead
    subscribe: function subscribe(name, fn) {
      $.listenTo(this, name.toLowerCase(), fn);
    },
    // Unregister a callback (or all if none is given) for the given event name
    off: function off(name, fn) {
      var queue = this._listeners && this._listeners[name];

      if (queue) {
        if (!fn) {
          delete this._listeners[name];
        } else {
          for (var i = queue.length; i--;) {
            if (queue[i] === fn) queue.splice(i, 1);
          }
        }
      }

      return this;
    },
    // Deprecated. Use `off`
    unsubscribe: function unsubscribe(name, fn) {
      $.unsubscribeTo(this, name.toLowerCase());
    },
    // Trigger an event of the given name
    // A return value of `false` interrupts the callback chain
    // Returns false if execution was interrupted
    trigger: function trigger(name, target, extraArg) {
      target = target || this;
      var queue = this._listeners && this._listeners[name];
      var result;

      if (queue) {
        for (var i = queue.length; i--;) {
          result = queue[i].call(target, target, extraArg);
          if (result === false) return result;
        }
      }

      if (this.parent) {
        return this.parent.trigger(name, target, extraArg);
      }

      return true;
    },
    asyncIsValid: function asyncIsValid(group, force) {
      Utils.warnOnce("asyncIsValid is deprecated; please use whenValid instead");
      return this.whenValid({
        group: group,
        force: force
      });
    },
    _findRelated: function _findRelated() {
      return this.options.multiple ? $(this.parent.element.querySelectorAll("[".concat(this.options.namespace, "multiple=\"").concat(this.options.multiple, "\"]"))) : this.$element;
    }
  };

  var convertArrayRequirement = function convertArrayRequirement(string, length) {
    var m = string.match(/^\s*\[(.*)\]\s*$/);
    if (!m) throw 'Requirement is not an array: "' + string + '"';
    var values = m[1].split(',').map(Utils.trimString);
    if (values.length !== length) throw 'Requirement has ' + values.length + ' values when ' + length + ' are needed';
    return values;
  };

  var convertExtraOptionRequirement = function convertExtraOptionRequirement(requirementSpec, string, extraOptionReader) {
    var main = null;
    var extra = {};

    for (var key in requirementSpec) {
      if (key) {
        var value = extraOptionReader(key);
        if ('string' === typeof value) value = Utils.parseRequirement(requirementSpec[key], value);
        extra[key] = value;
      } else {
        main = Utils.parseRequirement(requirementSpec[key], string);
      }
    }

    return [main, extra];
  }; // A Validator needs to implement the methods `validate` and `parseRequirements`


  var Validator = function Validator(spec) {
    $.extend(true, this, spec);
  };

  Validator.prototype = {
    // Returns `true` iff the given `value` is valid according the given requirements.
    validate: function validate(value, requirementFirstArg) {
      if (this.fn) {
        // Legacy style validator
        if (arguments.length > 3) // If more args then value, requirement, instance...
          requirementFirstArg = [].slice.call(arguments, 1, -1); // Skip first arg (value) and last (instance), combining the rest

        return this.fn(value, requirementFirstArg);
      }

      if (Array.isArray(value)) {
        if (!this.validateMultiple) throw 'Validator `' + this.name + '` does not handle multiple values';
        return this.validateMultiple.apply(this, arguments);
      } else {
        var instance = arguments[arguments.length - 1];

        if (this.validateDate && instance._isDateInput()) {
          arguments[0] = Utils.parse.date(arguments[0]);
          if (arguments[0] === null) return false;
          return this.validateDate.apply(this, arguments);
        }

        if (this.validateNumber) {
          if (!value) // Builtin validators all accept empty strings, except `required` of course
            return true;
          if (isNaN(value)) return false;
          arguments[0] = parseFloat(arguments[0]);
          return this.validateNumber.apply(this, arguments);
        }

        if (this.validateString) {
          return this.validateString.apply(this, arguments);
        }

        throw 'Validator `' + this.name + '` only handles multiple values';
      }
    },
    // Parses `requirements` into an array of arguments,
    // according to `this.requirementType`
    parseRequirements: function parseRequirements(requirements, extraOptionReader) {
      if ('string' !== typeof requirements) {
        // Assume requirement already parsed
        // but make sure we return an array
        return Array.isArray(requirements) ? requirements : [requirements];
      }

      var type = this.requirementType;

      if (Array.isArray(type)) {
        var values = convertArrayRequirement(requirements, type.length);

        for (var i = 0; i < values.length; i++) {
          values[i] = Utils.parseRequirement(type[i], values[i]);
        }

        return values;
      } else if ($.isPlainObject(type)) {
        return convertExtraOptionRequirement(type, requirements, extraOptionReader);
      } else {
        return [Utils.parseRequirement(type, requirements)];
      }
    },
    // Defaults:
    requirementType: 'string',
    priority: 2
  };

  var ValidatorRegistry = function ValidatorRegistry(validators, catalog) {
    this.__class__ = 'ValidatorRegistry'; // Default Parsley locale is en

    this.locale = 'en';
    this.init(validators || {}, catalog || {});
  };

  var typeTesters = {
    email: /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,
    // Follow https://www.w3.org/TR/html5/infrastructure.html#floating-point-numbers
    number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,
    integer: /^-?\d+$/,
    digits: /^\d+$/,
    alphanum: /^\w+$/i,
    date: {
      test: function test(value) {
        return Utils.parse.date(value) !== null;
      }
    },
    url: new RegExp("^" + // protocol identifier
    "(?:(?:https?|ftp)://)?" + // ** mod: make scheme optional
    // user:pass authentication
    "(?:\\S+(?::\\S*)?@)?" + "(?:" + // IP address exclusion
    // private & local networks
    // "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +   // ** mod: allow local networks
    // "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
    // "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" + // host name
    "(?:(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)" + // domain name
    "(?:\\.(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)*" + // TLD identifier
    "(?:\\.(?:[a-zA-Z\\u00a1-\\uffff]{2,}))" + ")" + // port number
    "(?::\\d{2,5})?" + // resource path
    "(?:/\\S*)?" + "$")
  };
  typeTesters.range = typeTesters.number; // See http://stackoverflow.com/a/10454560/8279

  var decimalPlaces = function decimalPlaces(num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

    if (!match) {
      return 0;
    }

    return Math.max(0, // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0) - ( // Adjust for scientific notation.
    match[2] ? +match[2] : 0));
  }; // parseArguments('number', ['1', '2']) => [1, 2]


  var parseArguments = function parseArguments(type, args) {
    return args.map(Utils.parse[type]);
  }; // operatorToValidator returns a validating function for an operator function, applied to the given type


  var operatorToValidator = function operatorToValidator(type, operator) {
    return function (value) {
      for (var _len = arguments.length, requirementsAndInput = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        requirementsAndInput[_key - 1] = arguments[_key];
      }

      requirementsAndInput.pop(); // Get rid of `input` argument

      return operator.apply(void 0, [value].concat(_toConsumableArray(parseArguments(type, requirementsAndInput))));
    };
  };

  var comparisonOperator = function comparisonOperator(operator) {
    return {
      validateDate: operatorToValidator('date', operator),
      validateNumber: operatorToValidator('number', operator),
      requirementType: operator.length <= 2 ? 'string' : ['string', 'string'],
      // Support operators with a 1 or 2 requirement(s)
      priority: 30
    };
  };

  ValidatorRegistry.prototype = {
    init: function init(validators, catalog) {
      this.catalog = catalog; // Copy prototype's validators:

      this.validators = _extends({}, this.validators);

      for (var name in validators) {
        this.addValidator(name, validators[name].fn, validators[name].priority);
      }

      window.Parsley.trigger('parsley:validator:init');
    },
    // Set new messages locale if we have dictionary loaded in ParsleyConfig.i18n
    setLocale: function setLocale(locale) {
      if ('undefined' === typeof this.catalog[locale]) throw new Error(locale + ' is not available in the catalog');
      this.locale = locale;
      return this;
    },
    // Add a new messages catalog for a given locale. Set locale for this catalog if set === `true`
    addCatalog: function addCatalog(locale, messages, set) {
      if ('object' === _typeof(messages)) this.catalog[locale] = messages;
      if (true === set) return this.setLocale(locale);
      return this;
    },
    // Add a specific message for a given constraint in a given locale
    addMessage: function addMessage(locale, name, message) {
      if ('undefined' === typeof this.catalog[locale]) this.catalog[locale] = {};
      this.catalog[locale][name] = message;
      return this;
    },
    // Add messages for a given locale
    addMessages: function addMessages(locale, nameMessageObject) {
      for (var name in nameMessageObject) {
        this.addMessage(locale, name, nameMessageObject[name]);
      }

      return this;
    },
    // Add a new validator
    //
    //    addValidator('custom', {
    //        requirementType: ['integer', 'integer'],
    //        validateString: function(value, from, to) {},
    //        priority: 22,
    //        messages: {
    //          en: "Hey, that's no good",
    //          fr: "Aye aye, pas bon du tout",
    //        }
    //    })
    //
    // Old API was addValidator(name, function, priority)
    //
    addValidator: function addValidator(name, arg1, arg2) {
      if (this.validators[name]) Utils.warn('Validator "' + name + '" is already defined.');else if (Defaults.hasOwnProperty(name)) {
        Utils.warn('"' + name + '" is a restricted keyword and is not a valid validator name.');
        return;
      }
      return this._setValidator.apply(this, arguments);
    },
    hasValidator: function hasValidator(name) {
      return !!this.validators[name];
    },
    updateValidator: function updateValidator(name, arg1, arg2) {
      if (!this.validators[name]) {
        Utils.warn('Validator "' + name + '" is not already defined.');
        return this.addValidator.apply(this, arguments);
      }

      return this._setValidator.apply(this, arguments);
    },
    removeValidator: function removeValidator(name) {
      if (!this.validators[name]) Utils.warn('Validator "' + name + '" is not defined.');
      delete this.validators[name];
      return this;
    },
    _setValidator: function _setValidator(name, validator, priority) {
      if ('object' !== _typeof(validator)) {
        // Old style validator, with `fn` and `priority`
        validator = {
          fn: validator,
          priority: priority
        };
      }

      if (!validator.validate) {
        validator = new Validator(validator);
      }

      this.validators[name] = validator;

      for (var locale in validator.messages || {}) {
        this.addMessage(locale, name, validator.messages[locale]);
      }

      return this;
    },
    getErrorMessage: function getErrorMessage(constraint) {
      var message; // Type constraints are a bit different, we have to match their requirements too to find right error message

      if ('type' === constraint.name) {
        var typeMessages = this.catalog[this.locale][constraint.name] || {};
        message = typeMessages[constraint.requirements];
      } else message = this.formatMessage(this.catalog[this.locale][constraint.name], constraint.requirements);

      return message || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage;
    },
    // Kind of light `sprintf()` implementation
    formatMessage: function formatMessage(string, parameters) {
      if ('object' === _typeof(parameters)) {
        for (var i in parameters) {
          string = this.formatMessage(string, parameters[i]);
        }

        return string;
      }

      return 'string' === typeof string ? string.replace(/%s/i, parameters) : '';
    },
    // Here is the Parsley default validators list.
    // A validator is an object with the following key values:
    //  - priority: an integer
    //  - requirement: 'string' (default), 'integer', 'number', 'regexp' or an Array of these
    //  - validateString, validateMultiple, validateNumber: functions returning `true`, `false` or a promise
    // Alternatively, a validator can be a function that returns such an object
    //
    validators: {
      notblank: {
        validateString: function validateString(value) {
          return /\S/.test(value);
        },
        priority: 2
      },
      required: {
        validateMultiple: function validateMultiple(values) {
          return values.length > 0;
        },
        validateString: function validateString(value) {
          return /\S/.test(value);
        },
        priority: 512
      },
      type: {
        validateString: function validateString(value, type) {
          var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
              _ref$step = _ref.step,
              step = _ref$step === void 0 ? 'any' : _ref$step,
              _ref$base = _ref.base,
              base = _ref$base === void 0 ? 0 : _ref$base;

          var tester = typeTesters[type];

          if (!tester) {
            throw new Error('validator type `' + type + '` is not supported');
          }

          if (!value) return true; // Builtin validators all accept empty strings, except `required` of course

          if (!tester.test(value)) return false;

          if ('number' === type) {
            if (!/^any$/i.test(step || '')) {
              var nb = Number(value);
              var decimals = Math.max(decimalPlaces(step), decimalPlaces(base));
              if (decimalPlaces(nb) > decimals) // Value can't have too many decimals
                return false; // Be careful of rounding errors by using integers.

              var toInt = function toInt(f) {
                return Math.round(f * Math.pow(10, decimals));
              };

              if ((toInt(nb) - toInt(base)) % toInt(step) != 0) return false;
            }
          }

          return true;
        },
        requirementType: {
          '': 'string',
          step: 'string',
          base: 'number'
        },
        priority: 256
      },
      pattern: {
        validateString: function validateString(value, regexp) {
          if (!value) return true; // Builtin validators all accept empty strings, except `required` of course

          return regexp.test(value);
        },
        requirementType: 'regexp',
        priority: 64
      },
      minlength: {
        validateString: function validateString(value, requirement) {
          if (!value) return true; // Builtin validators all accept empty strings, except `required` of course

          return value.length >= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      maxlength: {
        validateString: function validateString(value, requirement) {
          return value.length <= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      length: {
        validateString: function validateString(value, min, max) {
          if (!value) return true; // Builtin validators all accept empty strings, except `required` of course

          return value.length >= min && value.length <= max;
        },
        requirementType: ['integer', 'integer'],
        priority: 30
      },
      mincheck: {
        validateMultiple: function validateMultiple(values, requirement) {
          return values.length >= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      maxcheck: {
        validateMultiple: function validateMultiple(values, requirement) {
          return values.length <= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      check: {
        validateMultiple: function validateMultiple(values, min, max) {
          return values.length >= min && values.length <= max;
        },
        requirementType: ['integer', 'integer'],
        priority: 30
      },
      min: comparisonOperator(function (value, requirement) {
        return value >= requirement;
      }),
      max: comparisonOperator(function (value, requirement) {
        return value <= requirement;
      }),
      range: comparisonOperator(function (value, min, max) {
        return value >= min && value <= max;
      }),
      equalto: {
        validateString: function validateString(value, refOrValue) {
          if (!value) return true; // Builtin validators all accept empty strings, except `required` of course

          var $reference = $(refOrValue);
          if ($reference.length) return value === $reference.val();else return value === refOrValue;
        },
        priority: 256
      },
      euvatin: {
        validateString: function validateString(value, refOrValue) {
          if (!value) {
            return true; // Builtin validators all accept empty strings, except `required` of course
          }

          var re = /^[A-Z][A-Z][A-Za-z0-9 -]{2,}$/;
          return re.test(value);
        },
        priority: 30
      }
    }
  };

  var UI = {};

  var diffResults = function diffResults(newResult, oldResult, deep) {
    var added = [];
    var kept = [];

    for (var i = 0; i < newResult.length; i++) {
      var found = false;

      for (var j = 0; j < oldResult.length; j++) {
        if (newResult[i].assert.name === oldResult[j].assert.name) {
          found = true;
          break;
        }
      }

      if (found) kept.push(newResult[i]);else added.push(newResult[i]);
    }

    return {
      kept: kept,
      added: added,
      removed: !deep ? diffResults(oldResult, newResult, true).added : []
    };
  };

  UI.Form = {
    _actualizeTriggers: function _actualizeTriggers() {
      var _this = this;

      this.$element.on('submit.Parsley', function (evt) {
        _this.onSubmitValidate(evt);
      });
      this.$element.on('click.Parsley', Utils._SubmitSelector, function (evt) {
        _this.onSubmitButton(evt);
      }); // UI could be disabled

      if (false === this.options.uiEnabled) return;
      this.element.setAttribute('novalidate', '');
    },
    focus: function focus() {
      this._focusedField = null;
      if (true === this.validationResult || 'none' === this.options.focus) return null;

      for (var i = 0; i < this.fields.length; i++) {
        var field = this.fields[i];

        if (true !== field.validationResult && field.validationResult.length > 0 && 'undefined' === typeof field.options.noFocus) {
          this._focusedField = field.$element;
          if ('first' === this.options.focus) break;
        }
      }

      if (null === this._focusedField) return null;
      return this._focusedField.focus();
    },
    _destroyUI: function _destroyUI() {
      // Reset all event listeners
      this.$element.off('.Parsley');
    }
  };
  UI.Field = {
    _reflowUI: function _reflowUI() {
      this._buildUI(); // If this field doesn't have an active UI don't bother doing something


      if (!this._ui) return; // Diff between two validation results

      var diff = diffResults(this.validationResult, this._ui.lastValidationResult); // Then store current validation result for next reflow

      this._ui.lastValidationResult = this.validationResult; // Handle valid / invalid / none field class

      this._manageStatusClass(); // Add, remove, updated errors messages


      this._manageErrorsMessages(diff); // Triggers impl


      this._actualizeTriggers(); // If field is not valid for the first time, bind keyup trigger to ease UX and quickly inform user


      if ((diff.kept.length || diff.added.length) && !this._failedOnce) {
        this._failedOnce = true;

        this._actualizeTriggers();
      }
    },
    // Returns an array of field's error message(s)
    getErrorsMessages: function getErrorsMessages() {
      // No error message, field is valid
      if (true === this.validationResult) return [];
      var messages = [];

      for (var i = 0; i < this.validationResult.length; i++) {
        messages.push(this.validationResult[i].errorMessage || this._getErrorMessage(this.validationResult[i].assert));
      }

      return messages;
    },
    // It's a goal of Parsley that this method is no longer required [#1073]
    addError: function addError(name) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          message = _ref.message,
          assert = _ref.assert,
          _ref$updateClass = _ref.updateClass,
          updateClass = _ref$updateClass === void 0 ? true : _ref$updateClass;

      this._buildUI();

      this._addError(name, {
        message: message,
        assert: assert
      });

      if (updateClass) this._errorClass();
    },
    // It's a goal of Parsley that this method is no longer required [#1073]
    updateError: function updateError(name) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          message = _ref2.message,
          assert = _ref2.assert,
          _ref2$updateClass = _ref2.updateClass,
          updateClass = _ref2$updateClass === void 0 ? true : _ref2$updateClass;

      this._buildUI();

      this._updateError(name, {
        message: message,
        assert: assert
      });

      if (updateClass) this._errorClass();
    },
    // It's a goal of Parsley that this method is no longer required [#1073]
    removeError: function removeError(name) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$updateClass = _ref3.updateClass,
          updateClass = _ref3$updateClass === void 0 ? true : _ref3$updateClass;

      this._buildUI();

      this._removeError(name); // edge case possible here: remove a standard Parsley error that is still failing in this.validationResult
      // but highly improbable cuz' manually removing a well Parsley handled error makes no sense.


      if (updateClass) this._manageStatusClass();
    },
    _manageStatusClass: function _manageStatusClass() {
      if (this.hasConstraints() && this.needsValidation() && true === this.validationResult) this._successClass();else if (this.validationResult.length > 0) this._errorClass();else this._resetClass();
    },
    _manageErrorsMessages: function _manageErrorsMessages(diff) {
      if ('undefined' !== typeof this.options.errorsMessagesDisabled) return; // Case where we have errorMessage option that configure an unique field error message, regardless failing validators

      if ('undefined' !== typeof this.options.errorMessage) {
        if (diff.added.length || diff.kept.length) {
          this._insertErrorWrapper();

          if (0 === this._ui.$errorsWrapper.find('.parsley-custom-error-message').length) this._ui.$errorsWrapper.append($(this.options.errorTemplate).addClass('parsley-custom-error-message'));
          return this._ui.$errorsWrapper.addClass('filled').find('.parsley-custom-error-message').html(this.options.errorMessage);
        }

        return this._ui.$errorsWrapper.removeClass('filled').find('.parsley-custom-error-message').remove();
      } // Show, hide, update failing constraints messages


      for (var i = 0; i < diff.removed.length; i++) {
        this._removeError(diff.removed[i].assert.name);
      }

      for (i = 0; i < diff.added.length; i++) {
        this._addError(diff.added[i].assert.name, {
          message: diff.added[i].errorMessage,
          assert: diff.added[i].assert
        });
      }

      for (i = 0; i < diff.kept.length; i++) {
        this._updateError(diff.kept[i].assert.name, {
          message: diff.kept[i].errorMessage,
          assert: diff.kept[i].assert
        });
      }
    },
    _addError: function _addError(name, _ref4) {
      var message = _ref4.message,
          assert = _ref4.assert;

      this._insertErrorWrapper();

      this._ui.$errorClassHandler.attr('aria-describedby', this._ui.errorsWrapperId);

      this._ui.$errorsWrapper.addClass('filled').append($(this.options.errorTemplate).addClass('parsley-' + name).html(message || this._getErrorMessage(assert)));
    },
    _updateError: function _updateError(name, _ref5) {
      var message = _ref5.message,
          assert = _ref5.assert;

      this._ui.$errorsWrapper.addClass('filled').find('.parsley-' + name).html(message || this._getErrorMessage(assert));
    },
    _removeError: function _removeError(name) {
      this._ui.$errorClassHandler.removeAttr('aria-describedby');

      this._ui.$errorsWrapper.removeClass('filled').find('.parsley-' + name).remove();
    },
    _getErrorMessage: function _getErrorMessage(constraint) {
      var customConstraintErrorMessage = constraint.name + 'Message';
      if ('undefined' !== typeof this.options[customConstraintErrorMessage]) return window.Parsley.formatMessage(this.options[customConstraintErrorMessage], constraint.requirements);
      return window.Parsley.getErrorMessage(constraint);
    },
    _buildUI: function _buildUI() {
      // UI could be already built or disabled
      if (this._ui || false === this.options.uiEnabled) return;
      var _ui = {}; // Give field its Parsley id in DOM

      this.element.setAttribute(this.options.namespace + 'id', this.__id__);
      /** Generate important UI elements and store them in this **/
      // $errorClassHandler is the $element that woul have parsley-error and parsley-success classes

      _ui.$errorClassHandler = this._manageClassHandler(); // $errorsWrapper is a div that would contain the various field errors, it will be appended into $errorsContainer

      _ui.errorsWrapperId = 'parsley-id-' + (this.options.multiple ? 'multiple-' + this.options.multiple : this.__id__);
      _ui.$errorsWrapper = $(this.options.errorsWrapper).attr('id', _ui.errorsWrapperId); // ValidationResult UI storage to detect what have changed bwt two validations, and update DOM accordingly

      _ui.lastValidationResult = [];
      _ui.validationInformationVisible = false; // Store it in this for later

      this._ui = _ui;
    },
    // Determine which element will have `parsley-error` and `parsley-success` classes
    _manageClassHandler: function _manageClassHandler() {
      // Class handled could also be determined by function given in Parsley options
      if ('string' === typeof this.options.classHandler && $(this.options.classHandler).length) return $(this.options.classHandler); // Class handled could also be determined by function given in Parsley options

      var $handlerFunction = this.options.classHandler; // It might also be the function name of a global function

      if ('string' === typeof this.options.classHandler && 'function' === typeof window[this.options.classHandler]) $handlerFunction = window[this.options.classHandler];

      if ('function' === typeof $handlerFunction) {
        var $handler = $handlerFunction.call(this, this); // If this function returned a valid existing DOM element, go for it

        if ('undefined' !== typeof $handler && $handler.length) return $handler;
      } else if ('object' === _typeof($handlerFunction) && $handlerFunction instanceof jQuery && $handlerFunction.length) {
        return $handlerFunction;
      } else if ($handlerFunction) {
        Utils.warn('The class handler `' + $handlerFunction + '` does not exist in DOM nor as a global JS function');
      }

      return this._inputHolder();
    },
    _inputHolder: function _inputHolder() {
      // if simple element (input, texatrea, select...) it will perfectly host the classes and precede the error container
      if (!this.options.multiple || this.element.nodeName === 'SELECT') return this.$element; // But if multiple element (radio, checkbox), that would be their parent

      return this.$element.parent();
    },
    _insertErrorWrapper: function _insertErrorWrapper() {
      var $errorsContainer = this.options.errorsContainer; // Nothing to do if already inserted

      if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent();

      if ('string' === typeof $errorsContainer) {
        if ($($errorsContainer).length) return $($errorsContainer).append(this._ui.$errorsWrapper);else if ('function' === typeof window[$errorsContainer]) $errorsContainer = window[$errorsContainer];else Utils.warn('The errors container `' + $errorsContainer + '` does not exist in DOM nor as a global JS function');
      }

      if ('function' === typeof $errorsContainer) $errorsContainer = $errorsContainer.call(this, this);
      if ('object' === _typeof($errorsContainer) && $errorsContainer.length) return $errorsContainer.append(this._ui.$errorsWrapper);
      return this._inputHolder().after(this._ui.$errorsWrapper);
    },
    _actualizeTriggers: function _actualizeTriggers() {
      var _this2 = this;

      var $toBind = this._findRelated();

      var trigger; // Remove Parsley events already bound on this field

      $toBind.off('.Parsley');
      if (this._failedOnce) $toBind.on(Utils.namespaceEvents(this.options.triggerAfterFailure, 'Parsley'), function () {
        _this2._validateIfNeeded();
      });else if (trigger = Utils.namespaceEvents(this.options.trigger, 'Parsley')) {
        $toBind.on(trigger, function (event) {
          _this2._validateIfNeeded(event);
        });
      }
    },
    _validateIfNeeded: function _validateIfNeeded(event) {
      var _this3 = this;

      // For keyup, keypress, keydown, input... events that could be a little bit obstrusive
      // do not validate if val length < min threshold on first validation. Once field have been validated once and info
      // about success or failure have been displayed, always validate with this trigger to reflect every yalidation change.
      if (event && /key|input/.test(event.type)) if (!(this._ui && this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold) return;

      if (this.options.debounce) {
        window.clearTimeout(this._debounced);
        this._debounced = window.setTimeout(function () {
          return _this3.validate();
        }, this.options.debounce);
      } else this.validate();
    },
    _resetUI: function _resetUI() {
      // Reset all event listeners
      this._failedOnce = false;

      this._actualizeTriggers(); // Nothing to do if UI never initialized for this field


      if ('undefined' === typeof this._ui) return; // Reset all errors' li

      this._ui.$errorsWrapper.removeClass('filled').children().remove(); // Reset validation class


      this._resetClass(); // Reset validation flags and last validation result


      this._ui.lastValidationResult = [];
      this._ui.validationInformationVisible = false;
    },
    _destroyUI: function _destroyUI() {
      this._resetUI();

      if ('undefined' !== typeof this._ui) this._ui.$errorsWrapper.remove();
      delete this._ui;
    },
    _successClass: function _successClass() {
      this._ui.validationInformationVisible = true;

      this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass);
    },
    _errorClass: function _errorClass() {
      this._ui.validationInformationVisible = true;

      this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass);
    },
    _resetClass: function _resetClass() {
      this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);
    }
  };

  var Form = function Form(element, domOptions, options) {
    this.__class__ = 'Form';
    this.element = element;
    this.$element = $(element);
    this.domOptions = domOptions;
    this.options = options;
    this.parent = window.Parsley;
    this.fields = [];
    this.validationResult = null;
  };

  var statusMapping = {
    pending: null,
    resolved: true,
    rejected: false
  };
  Form.prototype = {
    onSubmitValidate: function onSubmitValidate(event) {
      var _this = this;

      // This is a Parsley generated submit event, do not validate, do not prevent, simply exit and keep normal behavior
      if (true === event.parsley) return; // If we didn't come here through a submit button, use the first one in the form

      var submitSource = this._submitSource || this.$element.find(Utils._SubmitSelector)[0];
      this._submitSource = null;
      this.$element.find('.parsley-synthetic-submit-button').prop('disabled', true);
      if (submitSource && null !== submitSource.getAttribute('formnovalidate')) return;
      window.Parsley._remoteCache = {};
      var promise = this.whenValidate({
        event: event
      });

      if ('resolved' === promise.state() && false !== this._trigger('submit')) ; else {
        // Rejected or pending: cancel this submit
        event.stopImmediatePropagation();
        event.preventDefault();
        if ('pending' === promise.state()) promise.done(function () {
          _this._submit(submitSource);
        });
      }
    },
    onSubmitButton: function onSubmitButton(event) {
      this._submitSource = event.currentTarget;
    },
    // internal
    // _submit submits the form, this time without going through the validations.
    // Care must be taken to "fake" the actual submit button being clicked.
    _submit: function _submit(submitSource) {
      if (false === this._trigger('submit')) return; // Add submit button's data

      if (submitSource) {
        var $synthetic = this.$element.find('.parsley-synthetic-submit-button').prop('disabled', false);
        if (0 === $synthetic.length) $synthetic = $('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element);
        $synthetic.attr({
          name: submitSource.getAttribute('name'),
          value: submitSource.getAttribute('value')
        });
      }

      this.$element.trigger(_extends($.Event('submit'), {
        parsley: true
      }));
    },
    // Performs validation on fields while triggering events.
    // @returns `true` if all validations succeeds, `false`
    // if a failure is immediately detected, or `null`
    // if dependant on a promise.
    // Consider using `whenValidate` instead.
    validate: function validate(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        Utils.warnOnce('Calling validate on a parsley form without passing arguments as an object is deprecated.');

        var _arguments = Array.prototype.slice.call(arguments),
            group = _arguments[0],
            force = _arguments[1],
            event = _arguments[2];

        options = {
          group: group,
          force: force,
          event: event
        };
      }

      return statusMapping[this.whenValidate(options).state()];
    },
    whenValidate: function whenValidate() {
      var _this2 = this,
          _Utils$all$done$fail$;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          group = _ref.group,
          force = _ref.force,
          event = _ref.event;

      this.submitEvent = event;

      if (event) {
        this.submitEvent = _extends({}, event, {
          preventDefault: function preventDefault() {
            Utils.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`");
            _this2.validationResult = false;
          }
        });
      }

      this.validationResult = true; // fire validate event to eventually modify things before every validation

      this._trigger('validate'); // Refresh form DOM options and form's fields that could have changed


      this._refreshFields();

      var promises = this._withoutReactualizingFormOptions(function () {
        return $.map(_this2.fields, function (field) {
          return field.whenValidate({
            force: force,
            group: group
          });
        });
      });

      return (_Utils$all$done$fail$ = Utils.all(promises).done(function () {
        _this2._trigger('success');
      }).fail(function () {
        _this2.validationResult = false;

        _this2.focus();

        _this2._trigger('error');
      }).always(function () {
        _this2._trigger('validated');
      })).pipe.apply(_Utils$all$done$fail$, _toConsumableArray(this._pipeAccordingToValidationResult()));
    },
    // Iterate over refreshed fields, and stop on first failure.
    // Returns `true` if all fields are valid, `false` if a failure is detected
    // or `null` if the result depends on an unresolved promise.
    // Prefer using `whenValid` instead.
    isValid: function isValid(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        Utils.warnOnce('Calling isValid on a parsley form without passing arguments as an object is deprecated.');

        var _arguments2 = Array.prototype.slice.call(arguments),
            group = _arguments2[0],
            force = _arguments2[1];

        options = {
          group: group,
          force: force
        };
      }

      return statusMapping[this.whenValid(options).state()];
    },
    // Iterate over refreshed fields and validate them.
    // Returns a promise.
    // A validation that immediately fails will interrupt the validations.
    whenValid: function whenValid() {
      var _this3 = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          group = _ref2.group,
          force = _ref2.force;

      this._refreshFields();

      var promises = this._withoutReactualizingFormOptions(function () {
        return $.map(_this3.fields, function (field) {
          return field.whenValid({
            group: group,
            force: force
          });
        });
      });

      return Utils.all(promises);
    },
    refresh: function refresh() {
      this._refreshFields();

      return this;
    },
    // Reset UI
    reset: function reset() {
      // Form case: emit a reset event for each field
      for (var i = 0; i < this.fields.length; i++) {
        this.fields[i].reset();
      }

      this._trigger('reset');
    },
    // Destroy Parsley instance (+ UI)
    destroy: function destroy() {
      // Field case: emit destroy event to clean UI and then destroy stored instance
      this._destroyUI(); // Form case: destroy all its fields and then destroy stored instance


      for (var i = 0; i < this.fields.length; i++) {
        this.fields[i].destroy();
      }

      this.$element.removeData('Parsley');

      this._trigger('destroy');
    },
    _refreshFields: function _refreshFields() {
      return this.actualizeOptions()._bindFields();
    },
    _bindFields: function _bindFields() {
      var _this4 = this;

      var oldFields = this.fields;
      this.fields = [];
      this.fieldsMappedById = {};

      this._withoutReactualizingFormOptions(function () {
        _this4.$element.find(_this4.options.inputs).not(_this4.options.excluded).not("[".concat(_this4.options.namespace, "excluded=true]")).each(function (_, element) {
          var fieldInstance = new window.Parsley.Factory(element, {}, _this4); // Only add valid and not excluded `Field` and `FieldMultiple` children

          if ('Field' === fieldInstance.__class__ || 'FieldMultiple' === fieldInstance.__class__) {
            var uniqueId = fieldInstance.__class__ + '-' + fieldInstance.__id__;

            if ('undefined' === typeof _this4.fieldsMappedById[uniqueId]) {
              _this4.fieldsMappedById[uniqueId] = fieldInstance;

              _this4.fields.push(fieldInstance);
            }
          }
        });

        $.each(Utils.difference(oldFields, _this4.fields), function (_, field) {
          field.reset();
        });
      });

      return this;
    },
    // Internal only.
    // Looping on a form's fields to do validation or similar
    // will trigger reactualizing options on all of them, which
    // in turn will reactualize the form's options.
    // To avoid calling actualizeOptions so many times on the form
    // for nothing, _withoutReactualizingFormOptions temporarily disables
    // the method actualizeOptions on this form while `fn` is called.
    _withoutReactualizingFormOptions: function _withoutReactualizingFormOptions(fn) {
      var oldActualizeOptions = this.actualizeOptions;

      this.actualizeOptions = function () {
        return this;
      };

      var result = fn();
      this.actualizeOptions = oldActualizeOptions;
      return result;
    },
    // Internal only.
    // Shortcut to trigger an event
    // Returns true iff event is not interrupted and default not prevented.
    _trigger: function _trigger(eventName) {
      return this.trigger('form:' + eventName);
    }
  };

  var Constraint = function Constraint(parsleyField, name, requirements, priority, isDomConstraint) {
    var validatorSpec = window.Parsley._validatorRegistry.validators[name];
    var validator = new Validator(validatorSpec);
    priority = priority || parsleyField.options[name + 'Priority'] || validator.priority;
    isDomConstraint = true === isDomConstraint;

    _extends(this, {
      validator: validator,
      name: name,
      requirements: requirements,
      priority: priority,
      isDomConstraint: isDomConstraint
    });

    this._parseRequirements(parsleyField.options);
  };

  var capitalize = function capitalize(str) {
    var cap = str[0].toUpperCase();
    return cap + str.slice(1);
  };

  Constraint.prototype = {
    validate: function validate(value, instance) {
      var _this$validator;

      return (_this$validator = this.validator).validate.apply(_this$validator, [value].concat(_toConsumableArray(this.requirementList), [instance]));
    },
    _parseRequirements: function _parseRequirements(options) {
      var _this = this;

      this.requirementList = this.validator.parseRequirements(this.requirements, function (key) {
        return options[_this.name + capitalize(key)];
      });
    }
  };

  var Field = function Field(field, domOptions, options, parsleyFormInstance) {
    this.__class__ = 'Field';
    this.element = field;
    this.$element = $(field); // Set parent if we have one

    if ('undefined' !== typeof parsleyFormInstance) {
      this.parent = parsleyFormInstance;
    }

    this.options = options;
    this.domOptions = domOptions; // Initialize some properties

    this.constraints = [];
    this.constraintsByName = {};
    this.validationResult = true; // Bind constraints

    this._bindConstraints();
  };

  var statusMapping$1 = {
    pending: null,
    resolved: true,
    rejected: false
  };
  Field.prototype = {
    // # Public API
    // Validate field and trigger some events for mainly `UI`
    // @returns `true`, an array of the validators that failed, or
    // `null` if validation is not finished. Prefer using whenValidate
    validate: function validate(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        Utils.warnOnce('Calling validate on a parsley field without passing arguments as an object is deprecated.');
        options = {
          options: options
        };
      }

      var promise = this.whenValidate(options);
      if (!promise) // If excluded with `group` option
        return true;

      switch (promise.state()) {
        case 'pending':
          return null;

        case 'resolved':
          return true;

        case 'rejected':
          return this.validationResult;
      }
    },
    // Validate field and trigger some events for mainly `UI`
    // @returns a promise that succeeds only when all validations do
    // or `undefined` if field is not in the given `group`.
    whenValidate: function whenValidate() {
      var _this$whenValid$alway,
          _this = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          force = _ref.force,
          group = _ref.group;

      // do not validate a field if not the same as given validation group
      this.refresh();
      if (group && !this._isInGroup(group)) return;
      this.value = this.getValue(); // Field Validate event. `this.value` could be altered for custom needs

      this._trigger('validate');

      return (_this$whenValid$alway = this.whenValid({
        force: force,
        value: this.value,
        _refreshed: true
      }).always(function () {
        _this._reflowUI();
      }).done(function () {
        _this._trigger('success');
      }).fail(function () {
        _this._trigger('error');
      }).always(function () {
        _this._trigger('validated');
      })).pipe.apply(_this$whenValid$alway, _toConsumableArray(this._pipeAccordingToValidationResult()));
    },
    hasConstraints: function hasConstraints() {
      return 0 !== this.constraints.length;
    },
    // An empty optional field does not need validation
    needsValidation: function needsValidation(value) {
      if ('undefined' === typeof value) value = this.getValue(); // If a field is empty and not required, it is valid
      // Except if `data-parsley-validate-if-empty` explicitely added, useful for some custom validators

      if (!value.length && !this._isRequired() && 'undefined' === typeof this.options.validateIfEmpty) return false;
      return true;
    },
    _isInGroup: function _isInGroup(group) {
      if (Array.isArray(this.options.group)) return -1 !== $.inArray(group, this.options.group);
      return this.options.group === group;
    },
    // Just validate field. Do not trigger any event.
    // Returns `true` iff all constraints pass, `false` if there are failures,
    // or `null` if the result can not be determined yet (depends on a promise)
    // See also `whenValid`.
    isValid: function isValid(options) {
      if (arguments.length >= 1 && !$.isPlainObject(options)) {
        Utils.warnOnce('Calling isValid on a parsley field without passing arguments as an object is deprecated.');

        var _arguments = Array.prototype.slice.call(arguments),
            force = _arguments[0],
            value = _arguments[1];

        options = {
          force: force,
          value: value
        };
      }

      var promise = this.whenValid(options);
      if (!promise) // Excluded via `group`
        return true;
      return statusMapping$1[promise.state()];
    },
    // Just validate field. Do not trigger any event.
    // @returns a promise that succeeds only when all validations do
    // or `undefined` if the field is not in the given `group`.
    // The argument `force` will force validation of empty fields.
    // If a `value` is given, it will be validated instead of the value of the input.
    whenValid: function whenValid() {
      var _this2 = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$force = _ref2.force,
          force = _ref2$force === void 0 ? false : _ref2$force,
          value = _ref2.value,
          group = _ref2.group,
          _refreshed = _ref2._refreshed;

      // Recompute options and rebind constraints to have latest changes
      if (!_refreshed) this.refresh(); // do not validate a field if not the same as given validation group

      if (group && !this._isInGroup(group)) return;
      this.validationResult = true; // A field without constraint is valid

      if (!this.hasConstraints()) return $.when(); // Value could be passed as argument, needed to add more power to 'field:validate'

      if ('undefined' === typeof value || null === value) value = this.getValue();
      if (!this.needsValidation(value) && true !== force) return $.when();

      var groupedConstraints = this._getGroupedConstraints();

      var promises = [];
      $.each(groupedConstraints, function (_, constraints) {
        // Process one group of constraints at a time, we validate the constraints
        // and combine the promises together.
        var promise = Utils.all($.map(constraints, function (constraint) {
          return _this2._validateConstraint(value, constraint);
        }));
        promises.push(promise);
        if (promise.state() === 'rejected') return false; // Interrupt processing if a group has already failed
      });
      return Utils.all(promises);
    },
    // @returns a promise
    _validateConstraint: function _validateConstraint(value, constraint) {
      var _this3 = this;

      var result = constraint.validate(value, this); // Map false to a failed promise

      if (false === result) result = $.Deferred().reject(); // Make sure we return a promise and that we record failures

      return Utils.all([result]).fail(function (errorMessage) {
        if (!(_this3.validationResult instanceof Array)) _this3.validationResult = [];

        _this3.validationResult.push({
          assert: constraint,
          errorMessage: 'string' === typeof errorMessage && errorMessage
        });
      });
    },
    // @returns Parsley field computed value that could be overrided or configured in DOM
    getValue: function getValue() {
      var value; // Value could be overriden in DOM or with explicit options

      if ('function' === typeof this.options.value) value = this.options.value(this);else if ('undefined' !== typeof this.options.value) value = this.options.value;else value = this.$element.val(); // Handle wrong DOM or configurations

      if ('undefined' === typeof value || null === value) return '';
      return this._handleWhitespace(value);
    },
    // Reset UI
    reset: function reset() {
      this._resetUI();

      return this._trigger('reset');
    },
    // Destroy Parsley instance (+ UI)
    destroy: function destroy() {
      // Field case: emit destroy event to clean UI and then destroy stored instance
      this._destroyUI();

      this.$element.removeData('Parsley');
      this.$element.removeData('FieldMultiple');

      this._trigger('destroy');
    },
    // Actualize options and rebind constraints
    refresh: function refresh() {
      this._refreshConstraints();

      return this;
    },
    _refreshConstraints: function _refreshConstraints() {
      return this.actualizeOptions()._bindConstraints();
    },
    refreshConstraints: function refreshConstraints() {
      Utils.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh");
      return this.refresh();
    },

    /**
    * Add a new constraint to a field
    *
    * @param {String}   name
    * @param {Mixed}    requirements      optional
    * @param {Number}   priority          optional
    * @param {Boolean}  isDomConstraint   optional
    */
    addConstraint: function addConstraint(name, requirements, priority, isDomConstraint) {
      if (window.Parsley._validatorRegistry.validators[name]) {
        var constraint = new Constraint(this, name, requirements, priority, isDomConstraint); // if constraint already exist, delete it and push new version

        if ('undefined' !== this.constraintsByName[constraint.name]) this.removeConstraint(constraint.name);
        this.constraints.push(constraint);
        this.constraintsByName[constraint.name] = constraint;
      }

      return this;
    },
    // Remove a constraint
    removeConstraint: function removeConstraint(name) {
      for (var i = 0; i < this.constraints.length; i++) {
        if (name === this.constraints[i].name) {
          this.constraints.splice(i, 1);
          break;
        }
      }

      delete this.constraintsByName[name];
      return this;
    },
    // Update a constraint (Remove + re-add)
    updateConstraint: function updateConstraint(name, parameters, priority) {
      return this.removeConstraint(name).addConstraint(name, parameters, priority);
    },
    // # Internals
    // Internal only.
    // Bind constraints from config + options + DOM
    _bindConstraints: function _bindConstraints() {
      var constraints = [];
      var constraintsByName = {}; // clean all existing DOM constraints to only keep javascript user constraints

      for (var i = 0; i < this.constraints.length; i++) {
        if (false === this.constraints[i].isDomConstraint) {
          constraints.push(this.constraints[i]);
          constraintsByName[this.constraints[i].name] = this.constraints[i];
        }
      }

      this.constraints = constraints;
      this.constraintsByName = constraintsByName; // then re-add Parsley DOM-API constraints

      for (var name in this.options) {
        this.addConstraint(name, this.options[name], undefined, true);
      } // finally, bind special HTML5 constraints


      return this._bindHtml5Constraints();
    },
    // Internal only.
    // Bind specific HTML5 constraints to be HTML5 compliant
    _bindHtml5Constraints: function _bindHtml5Constraints() {
      // html5 required
      if (null !== this.element.getAttribute('required')) this.addConstraint('required', true, undefined, true); // html5 pattern

      if (null !== this.element.getAttribute('pattern')) this.addConstraint('pattern', this.element.getAttribute('pattern'), undefined, true); // range

      var min = this.element.getAttribute('min');
      var max = this.element.getAttribute('max');
      if (null !== min && null !== max) this.addConstraint('range', [min, max], undefined, true); // HTML5 min
      else if (null !== min) this.addConstraint('min', min, undefined, true); // HTML5 max
        else if (null !== max) this.addConstraint('max', max, undefined, true); // length

      if (null !== this.element.getAttribute('minlength') && null !== this.element.getAttribute('maxlength')) this.addConstraint('length', [this.element.getAttribute('minlength'), this.element.getAttribute('maxlength')], undefined, true); // HTML5 minlength
      else if (null !== this.element.getAttribute('minlength')) this.addConstraint('minlength', this.element.getAttribute('minlength'), undefined, true); // HTML5 maxlength
        else if (null !== this.element.getAttribute('maxlength')) this.addConstraint('maxlength', this.element.getAttribute('maxlength'), undefined, true); // html5 types

      var type = Utils.getType(this.element); // Small special case here for HTML5 number: integer validator if step attribute is undefined or an integer value, number otherwise

      if ('number' === type) {
        return this.addConstraint('type', ['number', {
          step: this.element.getAttribute('step') || '1',
          base: min || this.element.getAttribute('value')
        }], undefined, true); // Regular other HTML5 supported types
      } else if (/^(email|url|range|date)$/i.test(type)) {
        return this.addConstraint('type', type, undefined, true);
      }

      return this;
    },
    // Internal only.
    // Field is required if have required constraint without `false` value
    _isRequired: function _isRequired() {
      if ('undefined' === typeof this.constraintsByName.required) return false;
      return false !== this.constraintsByName.required.requirements;
    },
    // Internal only.
    // Shortcut to trigger an event
    _trigger: function _trigger(eventName) {
      return this.trigger('field:' + eventName);
    },
    // Internal only
    // Handles whitespace in a value
    // Use `data-parsley-whitespace="squish"` to auto squish input value
    // Use `data-parsley-whitespace="trim"` to auto trim input value
    _handleWhitespace: function _handleWhitespace(value) {
      if (true === this.options.trimValue) Utils.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"');
      if ('squish' === this.options.whitespace) value = value.replace(/\s{2,}/g, ' ');
      if ('trim' === this.options.whitespace || 'squish' === this.options.whitespace || true === this.options.trimValue) value = Utils.trimString(value);
      return value;
    },
    _isDateInput: function _isDateInput() {
      var c = this.constraintsByName.type;
      return c && c.requirements === 'date';
    },
    // Internal only.
    // Returns the constraints, grouped by descending priority.
    // The result is thus an array of arrays of constraints.
    _getGroupedConstraints: function _getGroupedConstraints() {
      if (false === this.options.priorityEnabled) return [this.constraints];
      var groupedConstraints = [];
      var index = {}; // Create array unique of priorities

      for (var i = 0; i < this.constraints.length; i++) {
        var p = this.constraints[i].priority;
        if (!index[p]) groupedConstraints.push(index[p] = []);
        index[p].push(this.constraints[i]);
      } // Sort them by priority DESC


      groupedConstraints.sort(function (a, b) {
        return b[0].priority - a[0].priority;
      });
      return groupedConstraints;
    }
  };

  var Multiple = function Multiple() {
    this.__class__ = 'FieldMultiple';
  };

  Multiple.prototype = {
    // Add new `$element` sibling for multiple field
    addElement: function addElement($element) {
      this.$elements.push($element);
      return this;
    },
    // See `Field._refreshConstraints()`
    _refreshConstraints: function _refreshConstraints() {
      var fieldConstraints;
      this.constraints = []; // Select multiple special treatment

      if (this.element.nodeName === 'SELECT') {
        this.actualizeOptions()._bindConstraints();

        return this;
      } // Gather all constraints for each input in the multiple group


      for (var i = 0; i < this.$elements.length; i++) {
        // Check if element have not been dynamically removed since last binding
        if (!$('html').has(this.$elements[i]).length) {
          this.$elements.splice(i, 1);
          continue;
        }

        fieldConstraints = this.$elements[i].data('FieldMultiple')._refreshConstraints().constraints;

        for (var j = 0; j < fieldConstraints.length; j++) {
          this.addConstraint(fieldConstraints[j].name, fieldConstraints[j].requirements, fieldConstraints[j].priority, fieldConstraints[j].isDomConstraint);
        }
      }

      return this;
    },
    // See `Field.getValue()`
    getValue: function getValue() {
      // Value could be overriden in DOM
      if ('function' === typeof this.options.value) return this.options.value(this);else if ('undefined' !== typeof this.options.value) return this.options.value; // Radio input case

      if (this.element.nodeName === 'INPUT') {
        var type = Utils.getType(this.element);
        if (type === 'radio') return this._findRelated().filter(':checked').val() || ''; // checkbox input case

        if (type === 'checkbox') {
          var values = [];

          this._findRelated().filter(':checked').each(function () {
            values.push($(this).val());
          });

          return values;
        }
      } // Select multiple case


      if (this.element.nodeName === 'SELECT' && null === this.$element.val()) return []; // Default case that should never happen

      return this.$element.val();
    },
    _init: function _init() {
      this.$elements = [this.$element];
      return this;
    }
  };

  var Factory = function Factory(element, options, parsleyFormInstance) {
    this.element = element;
    this.$element = $(element); // If the element has already been bound, returns its saved Parsley instance

    var savedparsleyFormInstance = this.$element.data('Parsley');

    if (savedparsleyFormInstance) {
      // If the saved instance has been bound without a Form parent and there is one given in this call, add it
      if ('undefined' !== typeof parsleyFormInstance && savedparsleyFormInstance.parent === window.Parsley) {
        savedparsleyFormInstance.parent = parsleyFormInstance;

        savedparsleyFormInstance._resetOptions(savedparsleyFormInstance.options);
      }

      if ('object' === _typeof(options)) {
        _extends(savedparsleyFormInstance.options, options);
      }

      return savedparsleyFormInstance;
    } // Parsley must be instantiated with a DOM element or jQuery $element


    if (!this.$element.length) throw new Error('You must bind Parsley on an existing element.');
    if ('undefined' !== typeof parsleyFormInstance && 'Form' !== parsleyFormInstance.__class__) throw new Error('Parent instance must be a Form instance');
    this.parent = parsleyFormInstance || window.Parsley;
    return this.init(options);
  };

  Factory.prototype = {
    init: function init(options) {
      this.__class__ = 'Parsley';
      this.__version__ = '2.9.1';
      this.__id__ = Utils.generateID(); // Pre-compute options

      this._resetOptions(options); // A Form instance is obviously a `<form>` element but also every node that is not an input and has the `data-parsley-validate` attribute


      if (this.element.nodeName === 'FORM' || Utils.checkAttr(this.element, this.options.namespace, 'validate') && !this.$element.is(this.options.inputs)) return this.bind('parsleyForm'); // Every other element is bound as a `Field` or `FieldMultiple`

      return this.isMultiple() ? this.handleMultiple() : this.bind('parsleyField');
    },
    isMultiple: function isMultiple() {
      var type = Utils.getType(this.element);
      return type === 'radio' || type === 'checkbox' || this.element.nodeName === 'SELECT' && null !== this.element.getAttribute('multiple');
    },
    // Multiples fields are a real nightmare :(
    // Maybe some refactoring would be appreciated here...
    handleMultiple: function handleMultiple() {
      var _this = this;

      var name;
      var parsleyMultipleInstance; // Handle multiple name

      this.options.multiple = this.options.multiple || (name = this.element.getAttribute('name')) || this.element.getAttribute('id'); // Special select multiple input

      if (this.element.nodeName === 'SELECT' && null !== this.element.getAttribute('multiple')) {
        this.options.multiple = this.options.multiple || this.__id__;
        return this.bind('parsleyFieldMultiple'); // Else for radio / checkboxes, we need a `name` or `data-parsley-multiple` to properly bind it
      } else if (!this.options.multiple) {
        Utils.warn('To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.', this.$element);
        return this;
      } // Remove special chars


      this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ''); // Add proper `data-parsley-multiple` to siblings if we have a valid multiple name

      if (name) {
        $('input[name="' + name + '"]').each(function (i, input) {
          var type = Utils.getType(input);
          if (type === 'radio' || type === 'checkbox') input.setAttribute(_this.options.namespace + 'multiple', _this.options.multiple);
        });
      } // Check here if we don't already have a related multiple instance saved


      var $previouslyRelated = this._findRelated();

      for (var i = 0; i < $previouslyRelated.length; i++) {
        parsleyMultipleInstance = $($previouslyRelated.get(i)).data('Parsley');

        if ('undefined' !== typeof parsleyMultipleInstance) {
          if (!this.$element.data('FieldMultiple')) {
            parsleyMultipleInstance.addElement(this.$element);
          }

          break;
        }
      } // Create a secret Field instance for every multiple field. It will be stored in `data('FieldMultiple')`
      // And will be useful later to access classic `Field` stuff while being in a `FieldMultiple` instance


      this.bind('parsleyField', true);
      return parsleyMultipleInstance || this.bind('parsleyFieldMultiple');
    },
    // Return proper `Form`, `Field` or `FieldMultiple`
    bind: function bind(type, doNotStore) {
      var parsleyInstance;

      switch (type) {
        case 'parsleyForm':
          parsleyInstance = $.extend(new Form(this.element, this.domOptions, this.options), new Base(), window.ParsleyExtend)._bindFields();
          break;

        case 'parsleyField':
          parsleyInstance = $.extend(new Field(this.element, this.domOptions, this.options, this.parent), new Base(), window.ParsleyExtend);
          break;

        case 'parsleyFieldMultiple':
          parsleyInstance = $.extend(new Field(this.element, this.domOptions, this.options, this.parent), new Multiple(), new Base(), window.ParsleyExtend)._init();
          break;

        default:
          throw new Error(type + 'is not a supported Parsley type');
      }

      if (this.options.multiple) Utils.setAttr(this.element, this.options.namespace, 'multiple', this.options.multiple);

      if ('undefined' !== typeof doNotStore) {
        this.$element.data('FieldMultiple', parsleyInstance);
        return parsleyInstance;
      } // Store the freshly bound instance in a DOM element for later access using jQuery `data()`


      this.$element.data('Parsley', parsleyInstance); // Tell the world we have a new Form or Field instance!

      parsleyInstance._actualizeTriggers();

      parsleyInstance._trigger('init');

      return parsleyInstance;
    }
  };

  var vernums = $.fn.jquery.split('.');

  if (parseInt(vernums[0]) <= 1 && parseInt(vernums[1]) < 8) {
    throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
  }

  if (!vernums.forEach) {
    Utils.warn('Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim');
  } // Inherit `on`, `off` & `trigger` to Parsley:


  var Parsley = _extends(new Base(), {
    element: document,
    $element: $(document),
    actualizeOptions: null,
    _resetOptions: null,
    Factory: Factory,
    version: '2.9.1'
  }); // Supplement Field and Form with Base
  // This way, the constructors will have access to those methods


  _extends(Field.prototype, UI.Field, Base.prototype);

  _extends(Form.prototype, UI.Form, Base.prototype); // Inherit actualizeOptions and _resetOptions:


  _extends(Factory.prototype, Base.prototype); // ### jQuery API
  // `$('.elem').parsley(options)` or `$('.elem').psly(options)`


  $.fn.parsley = $.fn.psly = function (options) {
    if (this.length > 1) {
      var instances = [];
      this.each(function () {
        instances.push($(this).parsley(options));
      });
      return instances;
    } // Return undefined if applied to non existing DOM element


    if (this.length == 0) {
      return;
    }

    return new Factory(this[0], options);
  }; // ### Field and Form extension
  // Ensure the extension is now defined if it wasn't previously


  if ('undefined' === typeof window.ParsleyExtend) window.ParsleyExtend = {}; // ### Parsley config
  // Inherit from ParsleyDefault, and copy over any existing values

  Parsley.options = _extends(Utils.objectCreate(Defaults), window.ParsleyConfig);
  window.ParsleyConfig = Parsley.options; // Old way of accessing global options
  // ### Globals

  window.Parsley = window.psly = Parsley;
  Parsley.Utils = Utils;
  window.ParsleyUtils = {};
  $.each(Utils, function (key, value) {
    if ('function' === typeof value) {
      window.ParsleyUtils[key] = function () {
        Utils.warnOnce('Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead.');
        return Utils[key].apply(Utils, arguments);
      };
    }
  }); // ### Define methods that forward to the registry, and deprecate all access except through window.Parsley

  var registry = window.Parsley._validatorRegistry = new ValidatorRegistry(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
  window.ParsleyValidator = {};
  $.each('setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator'.split(' '), function (i, method) {
    window.Parsley[method] = function () {
      return registry[method].apply(registry, arguments);
    };

    window.ParsleyValidator[method] = function () {
      var _window$Parsley;

      Utils.warnOnce("Accessing the method '".concat(method, "' through Validator is deprecated. Simply call 'window.Parsley.").concat(method, "(...)'"));
      return (_window$Parsley = window.Parsley)[method].apply(_window$Parsley, arguments);
    };
  }); // ### UI
  // Deprecated global object

  window.Parsley.UI = UI;
  window.ParsleyUI = {
    removeError: function removeError(instance, name, doNotUpdateClass) {
      var updateClass = true !== doNotUpdateClass;
      Utils.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method.");
      return instance.removeError(name, {
        updateClass: updateClass
      });
    },
    getErrorsMessages: function getErrorsMessages(instance) {
      Utils.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly.");
      return instance.getErrorsMessages();
    }
  };
  $.each('addError updateError'.split(' '), function (i, method) {
    window.ParsleyUI[method] = function (instance, name, message, assert, doNotUpdateClass) {
      var updateClass = true !== doNotUpdateClass;
      Utils.warnOnce("Accessing UI is deprecated. Call '".concat(method, "' on the instance directly. Please comment in issue 1073 as to your need to call this method."));
      return instance[method](name, {
        message: message,
        assert: assert,
        updateClass: updateClass
      });
    };
  }); // ### PARSLEY auto-binding
  // Prevent it by setting `ParsleyConfig.autoBind` to `false`

  if (false !== window.ParsleyConfig.autoBind) {
    $(function () {
      // Works only on `data-parsley-validate`.
      if ($('[data-parsley-validate]').length) $('[data-parsley-validate]').parsley();
    });
  }

  var o = $({});

  var deprecated = function deprecated() {
    Utils.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley");
  }; // Returns an event handler that calls `fn` with the arguments it expects


  function adapt(fn, context) {
    // Store to allow unbinding
    if (!fn.parsleyAdaptedCallback) {
      fn.parsleyAdaptedCallback = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(this);
        fn.apply(context || o, args);
      };
    }

    return fn.parsleyAdaptedCallback;
  }

  var eventPrefix = 'parsley:'; // Converts 'parsley:form:validate' into 'form:validate'

  function eventName(name) {
    if (name.lastIndexOf(eventPrefix, 0) === 0) return name.substr(eventPrefix.length);
    return name;
  } // $.listen is deprecated. Use Parsley.on instead.


  $.listen = function (name, callback) {
    var context;
    deprecated();

    if ('object' === _typeof(arguments[1]) && 'function' === typeof arguments[2]) {
      context = arguments[1];
      callback = arguments[2];
    }

    if ('function' !== typeof callback) throw new Error('Wrong parameters');
    window.Parsley.on(eventName(name), adapt(callback, context));
  };

  $.listenTo = function (instance, name, fn) {
    deprecated();
    if (!(instance instanceof Field) && !(instance instanceof Form)) throw new Error('Must give Parsley instance');
    if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong parameters');
    instance.on(eventName(name), adapt(fn));
  };

  $.unsubscribe = function (name, fn) {
    deprecated();
    if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong arguments');
    window.Parsley.off(eventName(name), fn.parsleyAdaptedCallback);
  };

  $.unsubscribeTo = function (instance, name) {
    deprecated();
    if (!(instance instanceof Field) && !(instance instanceof Form)) throw new Error('Must give Parsley instance');
    instance.off(eventName(name));
  };

  $.unsubscribeAll = function (name) {
    deprecated();
    window.Parsley.off(eventName(name));
    $('form,input,textarea,select').each(function () {
      var instance = $(this).data('Parsley');

      if (instance) {
        instance.off(eventName(name));
      }
    });
  }; // $.emit is deprecated. Use jQuery events instead.


  $.emit = function (name, instance) {
    var _instance;

    deprecated();
    var instanceGiven = instance instanceof Field || instance instanceof Form;
    var args = Array.prototype.slice.call(arguments, instanceGiven ? 2 : 1);
    args.unshift(eventName(name));

    if (!instanceGiven) {
      instance = window.Parsley;
    }

    (_instance = instance).trigger.apply(_instance, _toConsumableArray(args));
  };

  $.extend(true, Parsley, {
    asyncValidators: {
      'default': {
        fn: function fn(xhr) {
          // By default, only status 2xx are deemed successful.
          // Note: we use status instead of state() because responses with status 200
          // but invalid messages (e.g. an empty body for content type set to JSON) will
          // result in state() === 'rejected'.
          return xhr.status >= 200 && xhr.status < 300;
        },
        url: false
      },
      reverse: {
        fn: function fn(xhr) {
          // If reverse option is set, a failing ajax request is considered successful
          return xhr.status < 200 || xhr.status >= 300;
        },
        url: false
      }
    },
    addAsyncValidator: function addAsyncValidator(name, fn, url, options) {
      Parsley.asyncValidators[name] = {
        fn: fn,
        url: url || false,
        options: options || {}
      };
      return this;
    }
  });
  Parsley.addValidator('remote', {
    requirementType: {
      '': 'string',
      'validator': 'string',
      'reverse': 'boolean',
      'options': 'object'
    },
    validateString: function validateString(value, url, options, instance) {
      var data = {};
      var ajaxOptions;
      var csr;
      var validator = options.validator || (true === options.reverse ? 'reverse' : 'default');
      if ('undefined' === typeof Parsley.asyncValidators[validator]) throw new Error('Calling an undefined async validator: `' + validator + '`');
      url = Parsley.asyncValidators[validator].url || url; // Fill current value

      if (url.indexOf('{value}') > -1) {
        url = url.replace('{value}', encodeURIComponent(value));
      } else {
        data[instance.element.getAttribute('name') || instance.element.getAttribute('id')] = value;
      } // Merge options passed in from the function with the ones in the attribute


      var remoteOptions = $.extend(true, options.options || {}, Parsley.asyncValidators[validator].options); // All `$.ajax(options)` could be overridden or extended directly from DOM in `data-parsley-remote-options`

      ajaxOptions = $.extend(true, {}, {
        url: url,
        data: data,
        type: 'GET'
      }, remoteOptions); // Generate store key based on ajax options

      instance.trigger('field:ajaxoptions', instance, ajaxOptions);
      csr = $.param(ajaxOptions); // Initialise querry cache

      if ('undefined' === typeof Parsley._remoteCache) Parsley._remoteCache = {}; // Try to retrieve stored xhr

      var xhr = Parsley._remoteCache[csr] = Parsley._remoteCache[csr] || $.ajax(ajaxOptions);

      var handleXhr = function handleXhr() {
        var result = Parsley.asyncValidators[validator].fn.call(instance, xhr, url, options);
        if (!result) // Map falsy results to rejected promise
          result = $.Deferred().reject();
        return $.when(result);
      };

      return xhr.then(handleXhr, handleXhr);
    },
    priority: -1
  });
  Parsley.on('form:submit', function () {
    Parsley._remoteCache = {};
  });

  Base.prototype.addAsyncValidator = function () {
    Utils.warnOnce('Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`');
    return Parsley.addAsyncValidator.apply(Parsley, arguments);
  };

  // This is included with the Parsley library itself,
  Parsley.addMessages('en', {
    defaultMessage: "This value seems to be invalid.",
    type: {
      email: "This value should be a valid email.",
      url: "This value should be a valid url.",
      number: "This value should be a valid number.",
      integer: "This value should be a valid integer.",
      digits: "This value should be digits.",
      alphanum: "This value should be alphanumeric."
    },
    notblank: "This value should not be blank.",
    required: "This value is required.",
    pattern: "This value seems to be invalid.",
    min: "This value should be greater than or equal to %s.",
    max: "This value should be lower than or equal to %s.",
    range: "This value should be between %s and %s.",
    minlength: "This value is too short. It should have %s characters or more.",
    maxlength: "This value is too long. It should have %s characters or fewer.",
    length: "This value length is invalid. It should be between %s and %s characters long.",
    mincheck: "You must select at least %s choices.",
    maxcheck: "You must select %s choices or fewer.",
    check: "You must select between %s and %s choices.",
    equalto: "This value should be the same.",
    euvatin: "It's not a valid VAT Identification Number."
  });
  Parsley.setLocale('en');

  function InputEvent() {
    var _this = this;

    var globals = window || global; // Slightly odd way construct our object. This way methods are force bound.
    // Used to test for duplicate library.

    _extends(this, {
      // For browsers that do not support isTrusted, assumes event is native.
      isNativeEvent: function isNativeEvent(evt) {
        return evt.originalEvent && evt.originalEvent.isTrusted !== false;
      },
      fakeInputEvent: function fakeInputEvent(evt) {
        if (_this.isNativeEvent(evt)) {
          $(evt.target).trigger('input');
        }
      },
      misbehaves: function misbehaves(evt) {
        if (_this.isNativeEvent(evt)) {
          _this.behavesOk(evt);

          $(document).on('change.inputevent', evt.data.selector, _this.fakeInputEvent);

          _this.fakeInputEvent(evt);
        }
      },
      behavesOk: function behavesOk(evt) {
        if (_this.isNativeEvent(evt)) {
          $(document) // Simply unbinds the testing handler
          .off('input.inputevent', evt.data.selector, _this.behavesOk).off('change.inputevent', evt.data.selector, _this.misbehaves);
        }
      },
      // Bind the testing handlers
      install: function install() {
        if (globals.inputEventPatched) {
          return;
        }

        globals.inputEventPatched = '0.0.3';
        var _arr = ['select', 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'];

        for (var _i = 0; _i < _arr.length; _i++) {
          var selector = _arr[_i];
          $(document).on('input.inputevent', selector, {
            selector: selector
          }, _this.behavesOk).on('change.inputevent', selector, {
            selector: selector
          }, _this.misbehaves);
        }
      },
      uninstall: function uninstall() {
        delete globals.inputEventPatched;
        $(document).off('.inputevent');
      }
    });
  }
  var inputevent = new InputEvent();

  inputevent.install();

  return Parsley;

})));
//# sourceMappingURL=parsley.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/rm-emoji-picker/dist/EmojiPicker.js":
/***/ (function(module, exports, __webpack_require__) {

!function(e,_){if(true)module.exports=_(__webpack_require__("./node_modules/jquery/dist/jquery.js"));else if("function"==typeof define&&define.amd)define(["jquery"],_);else{var a="object"==typeof exports?_(require("jquery")):_(e.jquery);for(var o in a)("object"==typeof exports?exports:e)[o]=a[o]}}(window,function(e){return function(e){var _={};function a(o){if(_[o])return _[o].exports;var s=_[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,a),s.l=!0,s.exports}return a.m=e,a.c=_,a.d=function(e,_,o){a.o(e,_)||Object.defineProperty(e,_,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,_){if(1&_&&(e=a(e)),8&_)return e;if(4&_&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&_&&"string"!=typeof e)for(var s in e)a.d(o,s,function(_){return e[_]}.bind(null,s));return o},a.n=function(e){var _=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(_,"a",_),_},a.o=function(e,_){return Object.prototype.hasOwnProperty.call(e,_)},a.p="",a(a.s=17)}([function(_,a){_.exports=e},function(e,_,a){var o=a(10);o.Template=a(9).Template,o.template=o.Template,e.exports=o},function(e,_,a){"use strict";Object.defineProperty(_,"__esModule",{value:!0}),_.default={categories:[{title:"People",icon:'<i class="fa fa-smile-o" aria-hidden="true"></i>'},{title:"Nature",icon:'<i class="fa fa-leaf" aria-hidden="true"></i>'},{title:"Foods",icon:'<i class="fa fa-cutlery" aria-hidden="true"></i>'},{title:"Activity",icon:'<i class="fa fa-futbol-o" aria-hidden="true"></i>'},{title:"Places",icon:'<i class="fa fa-globe" aria-hidden="true"></i>'},{title:"Symbols",icon:'<i class="fa fa-lightbulb-o" aria-hidden="true"></i>'},{title:"Flags",icon:'<i class="fa fa-flag-checkered" aria-hidden="true"></i>'}],search_icon:'<i class="fa fa-search" aria-hidden="true"></i>',show_colon_preview:!0,prevent_new_line:!1,default_footer_message:"Please select an emoji from the list above",positioning:"autoplace",callback:void 0,onOpen:void 0,onReady:void 0,show_icon_tooltips:!0,use_sheets:!0,events:{SELECTED:"SELECTED",EMOJI_MOUSEENTER:"MOUSEENTER",EMOJI_MOUSELEAVE:"MOUSELEAVE"},sheets:{apple:"./sheets/sheet_apple_64_indexed_128.png",google:"./sheets/sheet_google_64_indexed_128.png",twitter:"./sheets/sheet_twitter_64_indexed_128.png",emojione:"./sheets/sheet_emojione_64_indexed_128.png"}}},function(e,_,a){"use strict";Object.defineProperty(_,"__esModule",{value:!0});var o=function(){function e(e,_){for(var a=0;a<_.length;a++){var o=_[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(_,a,o){return a&&e(_.prototype,a),o&&e(_,o),_}}(),s=i(a(15)),t=i(a(2));function i(e){return e&&e.__esModule?e:{default:e}}var r=function(){function e(){!function(e,_){if(!(e instanceof _))throw new TypeError("Cannot call a class as a function")}(this,e),this.unicode=e.unified,this.env=e.environment,this.css=e.image,this.is_mobile=e.deviceIsMobile,t.default.use_sheets&&this.setSheets(t.default.sheets)}return o(e,null,[{key:"factory",value:function(){return new e}}]),o(e,[{key:"setSheets",value:function(e){e=e||t.default.sheets,[this.withEnvironment(),this.withImage()].forEach(function(_){_.img_sets.apple.sheet=e.apple,_.img_sets.google.sheet=e.google,_.img_sets.twitter.sheet=e.twitter,_.img_sets.emojione.sheet=e.emojione,_.use_sheet=!0})}},{key:"withUnified",value:function(){return this.unicode}},{key:"withEnvironment",value:function(){return this.env}},{key:"withImage",value:function(){return this.css}},{key:"canSupportUnified",value:function(){return"unified"===this.env.replace_mode}}],[{key:"unified",get:function(){var e=new s.default;return e.init_unified(),e}},{key:"environment",get:function(){var _=new s.default;return _.init_env(),"img"===_.replace_mode||"css"===_.replace_mode?e.image:_}},{key:"image",get:function(){var e=new s.default;return e.init_env(),e.replace_mode="css",e.supports_css=!0,e}},{key:"deviceIsMobile",get:function(){var e,_=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(_=!0),_}}]),e}();_.default=new r},function(e,_,a){"use strict";"function"!=typeof Object.assign&&(Object.assign=function(e,_){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var a=Object(e),o=1;o<arguments.length;o++){var s=arguments[o];if(null!=s)for(var t in s)Object.prototype.hasOwnProperty.call(s,t)&&(a[t]=s[t])}return a}),Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(e){if(null==this)throw new TypeError('"this" is null or not defined');var _=Object(this),a=_.length>>>0;if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var o=arguments[1],s=0;s<a;){var t=_[s];if(e.call(o,t,s,_))return t;s++}}})},function(e,_,a){var o=a(1);e.exports=function(){var e=new o.Template({code:function(e,_,a){var o=this;return o.b(a=a||""),o.b('<div class = "icon-tooltip">'),o.b("\n"+a),o.b("    <span>"),o.b(o.v(o.f("text",e,_,0))),o.b("</span>"),o.b("\n"+a),o.b("</div>"),o.fl()},partials:{},subs:{}},'<div class = "icon-tooltip">\n    <span>{{text}}</span>\n</div>',o);return e.render.apply(e,arguments)}},function(e,_,a){var o=a(1);e.exports=function(){var e=new o.Template({code:function(e,_,a){var o=this;return o.b(a=a||""),o.b('<div id = "emoji-picker">'),o.b("\n"+a),o.b('    <div class = "emoji-section emoji-header">'),o.b("\n"+a),o.s(o.f("categories",e,_,1),e,_,0,96,217,"{{ }}")&&(o.rs(e,_,function(e,_,o){o.b('            <div class = "select-category" data-name="'),o.b(o.v(o.f("title",e,_,0))),o.b('">'),o.b("\n"+a),o.b("                "),o.b(o.t(o.f("icon",e,_,0))),o.b("\n"+a),o.b("            </div>"),o.b("\n"+a)}),e.pop()),o.b("    </div>"),o.b("\n"+a),o.b('    <div class = "emoji-section emoji-search">'),o.b("\n"+a),o.b('        <div class = "search-wrapper">'),o.b("\n"+a),o.b('            <div class = "search-section centered">'),o.b("\n"+a),o.b("                "),o.b(o.t(o.f("search_icon",e,_,0))),o.b("\n"+a),o.b("            </div>"),o.b("\n"+a),o.b('            <div class = "search-section input">'),o.b("\n"+a),o.b('                <input type="text" class = "search-emojis" placeholder="Search"/>'),o.b("\n"+a),o.b("            </div>"),o.b("\n"+a),o.b("        </div>"),o.b("\n"+a),o.b("    </div>"),o.b("\n"+a),o.b('    <div class = "emoji-title-overlay">'),o.b("\n"+a),o.b('        <span id = "active-title"></span>'),o.b("\n"+a),o.b("    </div>"),o.b("\n"+a),o.b('    <div class = "emoji-section emoji-content"></div>'),o.b("\n"+a),o.b('    <div class = "emoji-section emoji-footer">'),o.b("\n"+a),o.b('        <div class = "default-content">'),o.b("\n"+a),o.b("            <span>"),o.b(o.v(o.f("default_content",e,_,0))),o.b("</span>"),o.b("\n"+a),o.b("        </div>"),o.b("\n"+a),o.b('        <div class = "emoji-preview">'),o.b("\n"+a),o.b('            <div class = "preview-section" id = "emoji-large-preview"></div>'),o.b("\n"+a),o.b('            <div class = "preview-section">'),o.b("\n"+a),o.b('                <span id = "emoji-name"></span>'),o.b("\n"+a),o.b('                <span id = "colon-display"></span>'),o.b("\n"+a),o.b("            </div>"),o.b("\n"+a),o.b("        </div>"),o.b("\n"+a),o.b("    </div>"),o.b("\n"+a),o.b("</div>"),o.fl()},partials:{},subs:{}},'<div id = "emoji-picker">\n    <div class = "emoji-section emoji-header">\n        {{#categories}}\n            <div class = "select-category" data-name="{{title}}">\n                {{{icon}}}\n            </div>\n        {{/categories}}\n    </div>\n    <div class = "emoji-section emoji-search">\n        <div class = "search-wrapper">\n            <div class = "search-section centered">\n                {{{search_icon}}}\n            </div>\n            <div class = "search-section input">\n                <input type="text" class = "search-emojis" placeholder="Search"/>\n            </div>\n        </div>\n    </div>\n    <div class = "emoji-title-overlay">\n        <span id = "active-title"></span>\n    </div>\n    <div class = "emoji-section emoji-content"></div>\n    <div class = "emoji-section emoji-footer">\n        <div class = "default-content">\n            <span>{{default_content}}</span>\n        </div>\n        <div class = "emoji-preview">\n            <div class = "preview-section" id = "emoji-large-preview"></div>\n            <div class = "preview-section">\n                <span id = "emoji-name"></span>\n                <span id = "colon-display"></span>\n            </div>\n        </div>\n    </div>\n</div>',o);return e.render.apply(e,arguments)}},function(e,_,a){"use strict";Object.defineProperty(_,"__esModule",{value:!0}),_.default={Symbols:[{has_img_apple:!0,has_img_google:!0,has_img_twitter:!1,has_img_emojione:!0,name:"COPYRIGHT SIGN",short_name:"copyright",short_names:["copyright"],sort_order:197},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!1,has_img_emojione:!0,name:"REGISTERED SIGN",short_name:"registered",short_names:["registered"],sort_order:198},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DOUBLE EXCLAMATION MARK",short_name:"bangbang",short_names:["bangbang"],sort_order:86},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EXCLAMATION QUESTION MARK",short_name:"interrobang",short_names:["interrobang"],sort_order:87},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!1,has_img_emojione:!0,name:"TRADE MARK SIGN",short_name:"tm",short_names:["tm"],sort_order:199},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"INFORMATION SOURCE",short_name:"information_source",short_names:["information_source"],sort_order:180},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LEFT RIGHT ARROW",short_name:"left_right_arrow",short_names:["left_right_arrow"],sort_order:172},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"UP DOWN ARROW",short_name:"arrow_up_down",short_names:["arrow_up_down"],sort_order:171},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NORTH WEST ARROW",short_name:"arrow_upper_left",short_names:["arrow_upper_left"],sort_order:170},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NORTH EAST ARROW",short_name:"arrow_upper_right",short_names:["arrow_upper_right"],sort_order:167},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SOUTH EAST ARROW",short_name:"arrow_lower_right",short_names:["arrow_lower_right"],sort_order:168},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SOUTH WEST ARROW",short_name:"arrow_lower_left",short_names:["arrow_lower_left"],sort_order:169},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LEFTWARDS ARROW WITH HOOK",short_name:"leftwards_arrow_with_hook",short_names:["leftwards_arrow_with_hook"],sort_order:175},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RIGHTWARDS ARROW WITH HOOK",short_name:"arrow_right_hook",short_names:["arrow_right_hook"],sort_order:174},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK RIGHT-POINTING DOUBLE TRIANGLE",short_name:"fast_forward",short_names:["fast_forward"],sort_order:153},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK LEFT-POINTING DOUBLE TRIANGLE",short_name:"rewind",short_names:["rewind"],sort_order:154},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK UP-POINTING DOUBLE TRIANGLE",short_name:"arrow_double_up",short_names:["arrow_double_up"],sort_order:161},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK DOWN-POINTING DOUBLE TRIANGLE",short_name:"arrow_double_down",short_names:["arrow_double_down"],sort_order:162},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"BLACK RIGHT-POINTING DOUBLE TRIANGLE WITH VERTICAL BAR",short_name:"black_right_pointing_double_triangle_with_vertical_bar",short_names:["black_right_pointing_double_triangle_with_vertical_bar"],sort_order:151},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"BLACK LEFT-POINTING DOUBLE TRIANGLE WITH VERTICAL BAR",short_name:"black_left_pointing_double_triangle_with_vertical_bar",short_names:["black_left_pointing_double_triangle_with_vertical_bar"],sort_order:152},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"BLACK RIGHT-POINTING TRIANGLE WITH DOUBLE VERTICAL BAR",short_name:"black_right_pointing_triangle_with_double_vertical_bar",short_names:["black_right_pointing_triangle_with_double_vertical_bar"],sort_order:148},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"DOUBLE VERTICAL BAR",short_name:"double_vertical_bar",short_names:["double_vertical_bar"],sort_order:147},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"BLACK SQUARE FOR STOP",short_name:"black_square_for_stop",short_names:["black_square_for_stop"],sort_order:149},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"BLACK CIRCLE FOR RECORD",short_name:"black_circle_for_record",short_names:["black_circle_for_record"],sort_order:150},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CIRCLED LATIN CAPITAL LETTER M",short_name:"m",short_names:["m"],sort_order:108},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK SMALL SQUARE",short_name:"black_small_square",short_names:["black_small_square"],sort_order:216},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE SMALL SQUARE",short_name:"white_small_square",short_names:["white_small_square"],sort_order:217},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK RIGHT-POINTING TRIANGLE",short_name:"arrow_forward",short_names:["arrow_forward"],sort_order:146},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK LEFT-POINTING TRIANGLE",short_name:"arrow_backward",short_names:["arrow_backward"],sort_order:158},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE MEDIUM SQUARE",short_name:"white_medium_square",short_names:["white_medium_square"],sort_order:222},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK MEDIUM SQUARE",short_name:"black_medium_square",short_names:["black_medium_square"],sort_order:221},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE MEDIUM SMALL SQUARE",short_name:"white_medium_small_square",short_names:["white_medium_small_square"],sort_order:224},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK MEDIUM SMALL SQUARE",short_name:"black_medium_small_square",short_names:["black_medium_small_square"],sort_order:223},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BALLOT BOX WITH CHECK",short_name:"ballot_box_with_check",short_names:["ballot_box_with_check"],sort_order:205},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"RADIOACTIVE SIGN",short_name:"radioactive_sign",short_names:["radioactive_sign"],sort_order:44},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"BIOHAZARD SIGN",short_name:"biohazard_sign",short_names:["biohazard_sign"],sort_order:45},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"ORTHODOX CROSS",short_name:"orthodox_cross",short_names:["orthodox_cross"],sort_order:25},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"STAR AND CRESCENT",short_name:"star_and_crescent",short_names:["star_and_crescent"],sort_order:18},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"PEACE SYMBOL",short_name:"peace_symbol",short_names:["peace_symbol"],sort_order:16},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"YIN YANG",short_name:"yin_yang",short_names:["yin_yang"],sort_order:24},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"WHEEL OF DHARMA",short_name:"wheel_of_dharma",short_names:["wheel_of_dharma"],sort_order:20},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ARIES",short_name:"aries",short_names:["aries"],sort_order:28},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TAURUS",short_name:"taurus",short_names:["taurus"],sort_order:29},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GEMINI",short_name:"gemini",short_names:["gemini"],sort_order:30},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CANCER",short_name:"cancer",short_names:["cancer"],sort_order:31},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LEO",short_name:"leo",short_names:["leo"],sort_order:32},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"VIRGO",short_name:"virgo",short_names:["virgo"],sort_order:33},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LIBRA",short_name:"libra",short_names:["libra"],sort_order:34},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SCORPIUS",short_name:"scorpius",short_names:["scorpius"],sort_order:35},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SAGITTARIUS",short_name:"sagittarius",short_names:["sagittarius"],sort_order:36},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CAPRICORN",short_name:"capricorn",short_names:["capricorn"],sort_order:37},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"AQUARIUS",short_name:"aquarius",short_names:["aquarius"],sort_order:38},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PISCES",short_name:"pisces",short_names:["pisces"],sort_order:39},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK SPADE SUIT",short_name:"spades",short_names:["spades"],sort_order:237},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK CLUB SUIT",short_name:"clubs",short_names:["clubs"],sort_order:238},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK HEART SUIT",short_name:"hearts",short_names:["hearts"],sort_order:239},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK DIAMOND SUIT",short_name:"diamonds",short_names:["diamonds"],sort_order:240},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HOT SPRINGS",short_name:"hotsprings",short_names:["hotsprings"],sort_order:75},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK UNIVERSAL RECYCLING SYMBOL",short_name:"recycle",short_names:["recycle"],sort_order:97},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHEELCHAIR SYMBOL",short_name:"wheelchair",short_names:["wheelchair"],sort_order:115},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"ATOM SYMBOL",short_name:"atom_symbol",short_names:["atom_symbol"],sort_order:41},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"FLEUR-DE-LIS",short_name:"fleur_de_lis",short_names:["fleur_de_lis"],sort_order:92},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WARNING SIGN",short_name:"warning",short_names:["warning"],sort_order:94},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MEDIUM WHITE CIRCLE",short_name:"white_circle",short_names:["white_circle"],sort_order:207},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MEDIUM BLACK CIRCLE",short_name:"black_circle",short_names:["black_circle"],sort_order:208},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OPHIUCHUS",short_name:"ophiuchus",short_names:["ophiuchus"],sort_order:27},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NO ENTRY",short_name:"no_entry",short_names:["no_entry"],sort_order:69},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE HEAVY CHECK MARK",short_name:"white_check_mark",short_names:["white_check_mark"],sort_order:103},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEAVY CHECK MARK",short_name:"heavy_check_mark",short_names:["heavy_check_mark"],sort_order:189},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEAVY MULTIPLICATION X",short_name:"heavy_multiplication_x",short_names:["heavy_multiplication_x"],sort_order:194},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"LATIN CROSS",short_name:"latin_cross",short_names:["latin_cross"],sort_order:17},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"STAR OF DAVID",short_name:"star_of_david",short_names:["star_of_david"],sort_order:21},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EIGHT SPOKED ASTERISK",short_name:"eight_spoked_asterisk",short_names:["eight_spoked_asterisk"],sort_order:101},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EIGHT POINTED BLACK STAR",short_name:"eight_pointed_black_star",short_names:["eight_pointed_black_star"],sort_order:53},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPARKLE",short_name:"sparkle",short_names:["sparkle"],sort_order:100},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CROSS MARK",short_name:"x",short_names:["x"],sort_order:72},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NEGATIVE SQUARED CROSS MARK",short_name:"negative_squared_cross_mark",short_names:["negative_squared_cross_mark"],sort_order:102},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK QUESTION MARK ORNAMENT",short_name:"question",short_names:["question"],sort_order:84},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE QUESTION MARK ORNAMENT",short_name:"grey_question",short_names:["grey_question"],sort_order:85},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE EXCLAMATION MARK ORNAMENT",short_name:"grey_exclamation",short_names:["grey_exclamation"],sort_order:83},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEAVY EXCLAMATION MARK SYMBOL",short_name:"exclamation",short_names:["exclamation","heavy_exclamation_mark"],sort_order:82},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"HEAVY HEART EXCLAMATION MARK ORNAMENT",short_name:"heavy_heart_exclamation_mark_ornament",short_names:["heavy_heart_exclamation_mark_ornament"],sort_order:7},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEAVY BLACK HEART",short_name:"heart",short_names:["heart"],sort_order:1},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEAVY PLUS SIGN",short_name:"heavy_plus_sign",short_names:["heavy_plus_sign"],sort_order:191},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEAVY MINUS SIGN",short_name:"heavy_minus_sign",short_names:["heavy_minus_sign"],sort_order:192},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEAVY DIVISION SIGN",short_name:"heavy_division_sign",short_names:["heavy_division_sign"],sort_order:193},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK RIGHTWARDS ARROW",short_name:"arrow_right",short_names:["arrow_right"],sort_order:163},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CURLY LOOP",short_name:"curly_loop",short_names:["curly_loop"],sort_order:188},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DOUBLE CURLY LOOP",short_name:"loop",short_names:["loop"],sort_order:106},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ARROW POINTING RIGHTWARDS THEN CURVING UPWARDS",short_name:"arrow_heading_up",short_names:["arrow_heading_up"],sort_order:176},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ARROW POINTING RIGHTWARDS THEN CURVING DOWNWARDS",short_name:"arrow_heading_down",short_names:["arrow_heading_down"],sort_order:177},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LEFTWARDS BLACK ARROW",short_name:"arrow_left",short_names:["arrow_left"],sort_order:164},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"UPWARDS BLACK ARROW",short_name:"arrow_up",short_names:["arrow_up"],sort_order:165},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DOWNWARDS BLACK ARROW",short_name:"arrow_down",short_names:["arrow_down"],sort_order:166},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK LARGE SQUARE",short_name:"black_large_square",short_names:["black_large_square"],sort_order:218},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE LARGE SQUARE",short_name:"white_large_square",short_names:["white_large_square"],sort_order:219},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEAVY LARGE CIRCLE",short_name:"o",short_names:["o"],sort_order:73},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WAVY DASH",short_name:"wavy_dash",short_names:["wavy_dash"],sort_order:187},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PART ALTERNATION MARK",short_name:"part_alternation_mark",short_names:["part_alternation_mark"],sort_order:93},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CIRCLED IDEOGRAPH CONGRATULATION",short_name:"congratulations",short_names:["congratulations"],sort_order:59},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CIRCLED IDEOGRAPH SECRET",short_name:"secret",short_names:["secret"],sort_order:58},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MAHJONG TILE RED DRAGON",short_name:"mahjong",short_names:["mahjong"],sort_order:236},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PLAYING CARD BLACK JOKER",short_name:"black_joker",short_names:["black_joker"],sort_order:235},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NEGATIVE SQUARED LATIN CAPITAL LETTER A",short_name:"a",short_names:["a"],sort_order:63},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NEGATIVE SQUARED LATIN CAPITAL LETTER B",short_name:"b",short_names:["b"],sort_order:64},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NEGATIVE SQUARED LATIN CAPITAL LETTER O",short_name:"o2",short_names:["o2"],sort_order:67},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NEGATIVE SQUARED LATIN CAPITAL LETTER P",short_name:"parking",short_names:["parking"],sort_order:118},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NEGATIVE SQUARED AB",short_name:"ab",short_names:["ab"],sort_order:65},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED CL",short_name:"cl",short_names:["cl"],sort_order:66},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED COOL",short_name:"cool",short_names:["cool"],sort_order:131},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED FREE",short_name:"free",short_names:["free"],sort_order:133},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED ID",short_name:"id",short_names:["id"],sort_order:40},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED NEW",short_name:"new",short_names:["new"],sort_order:132},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED NG",short_name:"ng",short_names:["ng"],sort_order:128},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED OK",short_name:"ok",short_names:["ok"],sort_order:129},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED SOS",short_name:"sos",short_names:["sos"],sort_order:68},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED UP WITH EXCLAMATION MARK",short_name:"up",short_names:["up"],sort_order:130},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED VS",short_name:"vs",short_names:["vs"],sort_order:54},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED KATAKANA KOKO",short_name:"koko",short_names:["koko"],sort_order:127},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED KATAKANA SA",short_name:"sa",short_names:["sa"],sort_order:110},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED CJK UNIFIED IDEOGRAPH-7121",short_name:"u7121",short_names:["u7121"],sort_order:49},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED CJK UNIFIED IDEOGRAPH-6307",short_name:"u6307",short_names:["u6307"],sort_order:98},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED CJK UNIFIED IDEOGRAPH-7981",short_name:"u7981",short_names:["u7981"],sort_order:62},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED CJK UNIFIED IDEOGRAPH-7A7A",short_name:"u7a7a",short_names:["u7a7a"],sort_order:42},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED CJK UNIFIED IDEOGRAPH-5408",short_name:"u5408",short_names:["u5408"],sort_order:60},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED CJK UNIFIED IDEOGRAPH-6E80",short_name:"u6e80",short_names:["u6e80"],sort_order:61},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED CJK UNIFIED IDEOGRAPH-6709",short_name:"u6709",short_names:["u6709"],sort_order:48},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED CJK UNIFIED IDEOGRAPH-6708",short_name:"u6708",short_names:["u6708"],sort_order:52},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED CJK UNIFIED IDEOGRAPH-7533",short_name:"u7533",short_names:["u7533"],sort_order:50},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED CJK UNIFIED IDEOGRAPH-5272",short_name:"u5272",short_names:["u5272"],sort_order:43},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SQUARED CJK UNIFIED IDEOGRAPH-55B6",short_name:"u55b6",short_names:["u55b6"],sort_order:51},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CIRCLED IDEOGRAPH ADVANTAGE",short_name:"ideograph_advantage",short_names:["ideograph_advantage"],sort_order:57},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CIRCLED IDEOGRAPH ACCEPT",short_name:"accept",short_names:["accept"],sort_order:55},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CYCLONE",short_name:"cyclone",short_names:["cyclone"],sort_order:105},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GLOBE WITH MERIDIANS",short_name:"globe_with_meridians",short_names:["globe_with_meridians"],sort_order:107},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CINEMA",short_name:"cinema",short_names:["cinema"],sort_order:125},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FLOWER PLAYING CARDS",short_name:"flower_playing_cards",short_names:["flower_playing_cards"],sort_order:241},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MUSICAL NOTE",short_name:"musical_note",short_names:["musical_note"],sort_order:185},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MULTIPLE MUSICAL NOTES",short_name:"notes",short_names:["notes"],sort_order:186},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"AUTOMATED TELLER MACHINE",short_name:"atm",short_names:["atm"],sort_order:109},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BEATING HEART",short_name:"heartbeat",short_names:["heartbeat"],sort_order:10},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BROKEN HEART",short_name:"broken_heart",short_names:["broken_heart"],sort_order:6},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TWO HEARTS",short_name:"two_hearts",short_names:["two_hearts"],sort_order:8},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPARKLING HEART",short_name:"sparkling_heart",short_names:["sparkling_heart"],sort_order:12},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GROWING HEART",short_name:"heartpulse",short_names:["heartpulse"],sort_order:11},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEART WITH ARROW",short_name:"cupid",short_names:["cupid"],sort_order:13},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLUE HEART",short_name:"blue_heart",short_names:["blue_heart"],sort_order:4},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GREEN HEART",short_name:"green_heart",short_names:["green_heart"],sort_order:3},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"YELLOW HEART",short_name:"yellow_heart",short_names:["yellow_heart"],sort_order:2},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PURPLE HEART",short_name:"purple_heart",short_names:["purple_heart"],sort_order:5},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEART WITH RIBBON",short_name:"gift_heart",short_names:["gift_heart"],sort_order:14},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REVOLVING HEARTS",short_name:"revolving_hearts",short_names:["revolving_hearts"],sort_order:9},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEART DECORATION",short_name:"heart_decoration",short_names:["heart_decoration"],sort_order:15},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DIAMOND SHAPE WITH A DOT INSIDE",short_name:"diamond_shape_with_a_dot_inside",short_names:["diamond_shape_with_a_dot_inside"],sort_order:104},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ANGER SYMBOL",short_name:"anger",short_names:["anger"],sort_order:74},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPEECH BALLOON",short_name:"speech_balloon",short_names:["speech_balloon"],sort_order:245},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"THOUGHT BALLOON",short_name:"thought_balloon",short_names:["thought_balloon"],sort_order:243},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE FLOWER",short_name:"white_flower",short_names:["white_flower"],sort_order:56},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HUNDRED POINTS SYMBOL",short_name:"100",short_names:["100"],sort_order:88},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CURRENCY EXCHANGE",short_name:"currency_exchange",short_names:["currency_exchange"],sort_order:196},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEAVY DOLLAR SIGN",short_name:"heavy_dollar_sign",short_names:["heavy_dollar_sign"],sort_order:195},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHART WITH UPWARDS TREND AND YEN SIGN",short_name:"chart",short_names:["chart"],sort_order:99},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NAME BADGE",short_name:"name_badge",short_names:["name_badge"],sort_order:70},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PUBLIC ADDRESS LOUDSPEAKER",short_name:"loudspeaker",short_names:["loudspeaker"],sort_order:232},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHEERING MEGAPHONE",short_name:"mega",short_names:["mega"],sort_order:231},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"VIBRATION MODE",short_name:"vibration_mode",short_names:["vibration_mode"],sort_order:47},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOBILE PHONE OFF",short_name:"mobile_phone_off",short_names:["mobile_phone_off"],sort_order:46},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NO MOBILE PHONES",short_name:"no_mobile_phones",short_names:["no_mobile_phones"],sort_order:81},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ANTENNA WITH BARS",short_name:"signal_strength",short_names:["signal_strength"],sort_order:126},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TWISTED RIGHTWARDS ARROWS",short_name:"twisted_rightwards_arrows",short_names:["twisted_rightwards_arrows"],sort_order:155},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCKWISE RIGHTWARDS AND LEFTWARDS OPEN CIRCLE ARROWS",short_name:"repeat",short_names:["repeat"],sort_order:156},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCKWISE RIGHTWARDS AND LEFTWARDS OPEN CIRCLE ARROWS WITH CIRCLED ONE OVERLAY",short_name:"repeat_one",short_names:["repeat_one"],sort_order:157},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCKWISE DOWNWARDS AND UPWARDS OPEN CIRCLE ARROWS",short_name:"arrows_clockwise",short_names:["arrows_clockwise"],sort_order:190},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ANTICLOCKWISE DOWNWARDS AND UPWARDS OPEN CIRCLE ARROWS",short_name:"arrows_counterclockwise",short_names:["arrows_counterclockwise"],sort_order:173},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LOW BRIGHTNESS SYMBOL",short_name:"low_brightness",short_names:["low_brightness"],sort_order:89},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HIGH BRIGHTNESS SYMBOL",short_name:"high_brightness",short_names:["high_brightness"],sort_order:90},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPEAKER WITH CANCELLATION STROKE",short_name:"mute",short_names:["mute"],sort_order:230},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPEAKER",short_name:"speaker",short_names:["speaker"],sort_order:227},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPEAKER WITH ONE SOUND WAVE",short_name:"sound",short_names:["sound"],sort_order:228},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPEAKER WITH THREE SOUND WAVES",short_name:"loud_sound",short_names:["loud_sound"],sort_order:229},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BELL",short_name:"bell",short_names:["bell"],sort_order:233},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BELL WITH CANCELLATION STROKE",short_name:"no_bell",short_names:["no_bell"],sort_order:234},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RADIO BUTTON",short_name:"radio_button",short_names:["radio_button"],sort_order:206},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BACK WITH LEFTWARDS ARROW ABOVE",short_name:"back",short_names:["back"],sort_order:201},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"END WITH LEFTWARDS ARROW ABOVE",short_name:"end",short_names:["end"],sort_order:200},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ON WITH EXCLAMATION MARK WITH LEFT RIGHT ARROW ABOVE",short_name:"on",short_names:["on"],sort_order:202},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SOON WITH RIGHTWARDS ARROW ABOVE",short_name:"soon",short_names:["soon"],sort_order:204},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TOP WITH UPWARDS ARROW ABOVE",short_name:"top",short_names:["top"],sort_order:203},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NO ONE UNDER EIGHTEEN SYMBOL",short_name:"underage",short_names:["underage"],sort_order:80},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"KEYCAP TEN",short_name:"keycap_ten",short_names:["keycap_ten"],sort_order:144},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"INPUT SYMBOL FOR LATIN CAPITAL LETTERS",short_name:"capital_abcd",short_names:["capital_abcd"],sort_order:183},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"INPUT SYMBOL FOR LATIN SMALL LETTERS",short_name:"abcd",short_names:["abcd"],sort_order:182},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"INPUT SYMBOL FOR NUMBERS",short_name:"1234",short_names:["1234"],sort_order:145},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"INPUT SYMBOL FOR SYMBOLS",short_name:"symbols",short_names:["symbols"],sort_order:184},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"INPUT SYMBOL FOR LATIN LETTERS",short_name:"abc",short_names:["abc"],sort_order:181},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SIX POINTED STAR WITH MIDDLE DOT",short_name:"six_pointed_star",short_names:["six_pointed_star"],sort_order:22},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"JAPANESE SYMBOL FOR BEGINNER",short_name:"beginner",short_names:["beginner"],sort_order:96},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TRIDENT EMBLEM",short_name:"trident",short_names:["trident"],sort_order:91},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK SQUARE BUTTON",short_name:"black_square_button",short_names:["black_square_button"],sort_order:225},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE SQUARE BUTTON",short_name:"white_square_button",short_names:["white_square_button"],sort_order:226},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LARGE RED CIRCLE",short_name:"red_circle",short_names:["red_circle"],sort_order:209},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LARGE BLUE CIRCLE",short_name:"large_blue_circle",short_names:["large_blue_circle"],sort_order:210},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LARGE ORANGE DIAMOND",short_name:"large_orange_diamond",short_names:["large_orange_diamond"],sort_order:213},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LARGE BLUE DIAMOND",short_name:"large_blue_diamond",short_names:["large_blue_diamond"],sort_order:214},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMALL ORANGE DIAMOND",short_name:"small_orange_diamond",short_names:["small_orange_diamond"],sort_order:211},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMALL BLUE DIAMOND",short_name:"small_blue_diamond",short_names:["small_blue_diamond"],sort_order:212},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"UP-POINTING RED TRIANGLE",short_name:"small_red_triangle",short_names:["small_red_triangle"],sort_order:215},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DOWN-POINTING RED TRIANGLE",short_name:"small_red_triangle_down",short_names:["small_red_triangle_down"],sort_order:220},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"UP-POINTING SMALL RED TRIANGLE",short_name:"arrow_up_small",short_names:["arrow_up_small"],sort_order:159},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DOWN-POINTING SMALL RED TRIANGLE",short_name:"arrow_down_small",short_names:["arrow_down_small"],sort_order:160},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OM SYMBOL",short_name:"om_symbol",short_names:["om_symbol"],sort_order:19},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"MENORAH WITH NINE BRANCHES",short_name:"menorah_with_nine_branches",short_names:["menorah_with_nine_branches"],sort_order:23},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE ONE OCLOCK",short_name:"clock1",short_names:["clock1"],sort_order:246},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE TWO OCLOCK",short_name:"clock2",short_names:["clock2"],sort_order:247},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE THREE OCLOCK",short_name:"clock3",short_names:["clock3"],sort_order:248},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE FOUR OCLOCK",short_name:"clock4",short_names:["clock4"],sort_order:249},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE FIVE OCLOCK",short_name:"clock5",short_names:["clock5"],sort_order:250},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE SIX OCLOCK",short_name:"clock6",short_names:["clock6"],sort_order:251},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE SEVEN OCLOCK",short_name:"clock7",short_names:["clock7"],sort_order:252},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE EIGHT OCLOCK",short_name:"clock8",short_names:["clock8"],sort_order:253},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE NINE OCLOCK",short_name:"clock9",short_names:["clock9"],sort_order:254},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE TEN OCLOCK",short_name:"clock10",short_names:["clock10"],sort_order:255},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE ELEVEN OCLOCK",short_name:"clock11",short_names:["clock11"],sort_order:256},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE TWELVE OCLOCK",short_name:"clock12",short_names:["clock12"],sort_order:257},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE ONE-THIRTY",short_name:"clock130",short_names:["clock130"],sort_order:258},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE TWO-THIRTY",short_name:"clock230",short_names:["clock230"],sort_order:259},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE THREE-THIRTY",short_name:"clock330",short_names:["clock330"],sort_order:260},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE FOUR-THIRTY",short_name:"clock430",short_names:["clock430"],sort_order:261},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE FIVE-THIRTY",short_name:"clock530",short_names:["clock530"],sort_order:262},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE SIX-THIRTY",short_name:"clock630",short_names:["clock630"],sort_order:263},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE SEVEN-THIRTY",short_name:"clock730",short_names:["clock730"],sort_order:264},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE EIGHT-THIRTY",short_name:"clock830",short_names:["clock830"],sort_order:265},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE NINE-THIRTY",short_name:"clock930",short_names:["clock930"],sort_order:266},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE TEN-THIRTY",short_name:"clock1030",short_names:["clock1030"],sort_order:267},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE ELEVEN-THIRTY",short_name:"clock1130",short_names:["clock1130"],sort_order:268},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOCK FACE TWELVE-THIRTY",short_name:"clock1230",short_names:["clock1230"],sort_order:269},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RIGHT ANGER BUBBLE",short_name:"right_anger_bubble",short_names:["right_anger_bubble"],sort_order:244},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NO ENTRY SIGN",short_name:"no_entry_sign",short_names:["no_entry_sign"],sort_order:71},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NO SMOKING SYMBOL",short_name:"no_smoking",short_names:["no_smoking"],sort_order:116},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PUT LITTER IN ITS PLACE SYMBOL",short_name:"put_litter_in_its_place",short_names:["put_litter_in_its_place"],sort_order:124},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DO NOT LITTER SYMBOL",short_name:"do_not_litter",short_names:["do_not_litter"],sort_order:77},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"POTABLE WATER SYMBOL",short_name:"potable_water",short_names:["potable_water"],sort_order:119},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NON-POTABLE WATER SYMBOL",short_name:"non-potable_water",short_names:["non-potable_water"],sort_order:79},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NO BICYCLES",short_name:"no_bicycles",short_names:["no_bicycles"],sort_order:78},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NO PEDESTRIANS",short_name:"no_pedestrians",short_names:["no_pedestrians"],sort_order:76},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHILDREN CROSSING",short_name:"children_crossing",short_names:["children_crossing"],sort_order:95},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MENS SYMBOL",short_name:"mens",short_names:["mens"],sort_order:120},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WOMENS SYMBOL",short_name:"womens",short_names:["womens"],sort_order:121},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RESTROOM",short_name:"restroom",short_names:["restroom"],sort_order:123},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BABY SYMBOL",short_name:"baby_symbol",short_names:["baby_symbol"],sort_order:122},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WATER CLOSET",short_name:"wc",short_names:["wc"],sort_order:117},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PASSPORT CONTROL",short_name:"passport_control",short_names:["passport_control"],sort_order:111},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CUSTOMS",short_name:"customs",short_names:["customs"],sort_order:112},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BAGGAGE CLAIM",short_name:"baggage_claim",short_names:["baggage_claim"],sort_order:113},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LEFT LUGGAGE",short_name:"left_luggage",short_names:["left_luggage"],sort_order:114},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"PLACE OF WORSHIP",short_name:"place_of_worship",short_names:["place_of_worship"],sort_order:26}],Objects:[{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WATCH",short_name:"watch",short_names:["watch"],sort_order:1},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HOURGLASS",short_name:"hourglass",short_names:["hourglass"],sort_order:37},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"KEYBOARD",short_name:"keyboard",short_names:["keyboard"],sort_order:5},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ALARM CLOCK",short_name:"alarm_clock",short_names:["alarm_clock"],sort_order:34},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"STOPWATCH",short_name:"stopwatch",short_names:["stopwatch"],sort_order:32},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"TIMER CLOCK",short_name:"timer_clock",short_names:["timer_clock"],sort_order:33},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HOURGLASS WITH FLOWING SAND",short_name:"hourglass_flowing_sand",short_names:["hourglass_flowing_sand"],sort_order:36},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK TELEPHONE",short_name:"phone",short_names:["phone","telephone"],sort_order:24},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"SKULL AND CROSSBONES",short_name:"skull_and_crossbones",short_names:["skull_and_crossbones"],sort_order:70},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"HAMMER AND PICK",short_name:"hammer_and_pick",short_names:["hammer_and_pick"],sort_order:57},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"CROSSED SWORDS",short_name:"crossed_swords",short_names:["crossed_swords"],sort_order:67},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"SCALES",short_name:"scales",short_names:["scales"],sort_order:54},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"ALEMBIC",short_name:"alembic",short_names:["alembic"],sort_order:77},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"GEAR",short_name:"gear",short_names:["gear"],sort_order:61},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"COFFIN",short_name:"coffin",short_names:["coffin"],sort_order:71},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"FUNERAL URN",short_name:"funeral_urn",short_names:["funeral_urn"],sort_order:72},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"PICK",short_name:"pick",short_names:["pick"],sort_order:59},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"CHAINS",short_name:"chains",short_names:["chains"],sort_order:62},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"UMBRELLA ON GROUND",short_name:"umbrella_on_ground",short_names:["umbrella_on_ground"],sort_order:98},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK SCISSORS",short_name:"scissors",short_names:["scissors"],sort_order:158},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ENVELOPE",short_name:"email",short_names:["email","envelope"],sort_order:111},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PENCIL",short_name:"pencil2",short_names:["pencil2"],sort_order:174},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK NIB",short_name:"black_nib",short_names:["black_nib"],sort_order:172},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"THERMOMETER",short_name:"thermometer",short_names:["thermometer"],sort_order:83},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RIBBON",short_name:"ribbon",short_names:["ribbon"],sort_order:103},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WRAPPED PRESENT",short_name:"gift",short_names:["gift"],sort_order:104},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BALLOON",short_name:"balloon",short_names:["balloon"],sort_order:101},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PARTY POPPER",short_name:"tada",short_names:["tada"],sort_order:106},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CONFETTI BALL",short_name:"confetti_ball",short_names:["confetti_ball"],sort_order:105},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CROSSED FLAGS",short_name:"crossed_flags",short_names:["crossed_flags"],sort_order:109},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"JAPANESE DOLLS",short_name:"dolls",short_names:["dolls"],sort_order:107},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CARP STREAMER",short_name:"flags",short_names:["flags"],sort_order:102},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WIND CHIME",short_name:"wind_chime",short_names:["wind_chime"],sort_order:108},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"STUDIO MICROPHONE",short_name:"studio_microphone",short_names:["studio_microphone"],sort_order:29},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LEVEL SLIDER",short_name:"level_slider",short_names:["level_slider"],sort_order:30},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CONTROL KNOBS",short_name:"control_knobs",short_names:["control_knobs"],sort_order:31},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FILM FRAMES",short_name:"film_frames",short_names:["film_frames"],sort_order:22},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOVIE CAMERA",short_name:"movie_camera",short_names:["movie_camera"],sort_order:20},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"IZAKAYA LANTERN",short_name:"izakaya_lantern",short_names:["izakaya_lantern","lantern"],sort_order:110},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WAVING WHITE FLAG",short_name:"waving_white_flag",short_names:["waving_white_flag"],sort_order:164},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WAVING BLACK FLAG",short_name:"waving_black_flag",short_names:["waving_black_flag"],sort_order:165},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LABEL",short_name:"label",short_names:["label"],sort_order:84},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"AMPHORA",short_name:"amphora",short_names:["amphora"],sort_order:73},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BARBER POLE",short_name:"barber",short_names:["barber"],sort_order:76},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SYRINGE",short_name:"syringe",short_names:["syringe"],sort_order:82},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PILL",short_name:"pill",short_names:["pill"],sort_order:81},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LOVE LETTER",short_name:"love_letter",short_names:["love_letter"],sort_order:115},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GEM STONE",short_name:"gem",short_names:["gem"],sort_order:53},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ELECTRIC LIGHT BULB",short_name:"bulb",short_names:["bulb"],sort_order:41},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BOMB",short_name:"bomb",short_names:["bomb"],sort_order:64},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MONEY BAG",short_name:"moneybag",short_names:["moneybag"],sort_order:51},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CREDIT CARD",short_name:"credit_card",short_names:["credit_card"],sort_order:52},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BANKNOTE WITH YEN SIGN",short_name:"yen",short_names:["yen"],sort_order:48},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BANKNOTE WITH DOLLAR SIGN",short_name:"dollar",short_names:["dollar"],sort_order:47},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BANKNOTE WITH EURO SIGN",short_name:"euro",short_names:["euro"],sort_order:49},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BANKNOTE WITH POUND SIGN",short_name:"pound",short_names:["pound"],sort_order:50},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MONEY WITH WINGS",short_name:"money_with_wings",short_names:["money_with_wings"],sort_order:46},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PERSONAL COMPUTER",short_name:"computer",short_names:["computer"],sort_order:4},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MINIDISC",short_name:"minidisc",short_names:["minidisc"],sort_order:12},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FLOPPY DISK",short_name:"floppy_disk",short_names:["floppy_disk"],sort_order:13},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OPTICAL DISC",short_name:"cd",short_names:["cd"],sort_order:14},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DVD",short_name:"dvd",short_names:["dvd"],sort_order:15},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FILE FOLDER",short_name:"file_folder",short_names:["file_folder"],sort_order:141},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OPEN FILE FOLDER",short_name:"open_file_folder",short_names:["open_file_folder"],sort_order:142},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PAGE WITH CURL",short_name:"page_with_curl",short_names:["page_with_curl"],sort_order:126},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PAGE FACING UP",short_name:"page_facing_up",short_names:["page_facing_up"],sort_order:131},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CALENDAR",short_name:"date",short_names:["date"],sort_order:132},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TEAR-OFF CALENDAR",short_name:"calendar",short_names:["calendar"],sort_order:133},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CARD INDEX",short_name:"card_index",short_names:["card_index"],sort_order:135},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHART WITH UPWARDS TREND",short_name:"chart_with_upwards_trend",short_names:["chart_with_upwards_trend"],sort_order:129},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHART WITH DOWNWARDS TREND",short_name:"chart_with_downwards_trend",short_names:["chart_with_downwards_trend"],sort_order:130},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BAR CHART",short_name:"bar_chart",short_names:["bar_chart"],sort_order:128},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLIPBOARD",short_name:"clipboard",short_names:["clipboard"],sort_order:139},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PUSHPIN",short_name:"pushpin",short_names:["pushpin"],sort_order:161},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ROUND PUSHPIN",short_name:"round_pushpin",short_names:["round_pushpin"],sort_order:162},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PAPERCLIP",short_name:"paperclip",short_names:["paperclip"],sort_order:156},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"STRAIGHT RULER",short_name:"straight_ruler",short_names:["straight_ruler"],sort_order:160},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TRIANGULAR RULER",short_name:"triangular_ruler",short_names:["triangular_ruler"],sort_order:159},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BOOKMARK TABS",short_name:"bookmark_tabs",short_names:["bookmark_tabs"],sort_order:127},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LEDGER",short_name:"ledger",short_names:["ledger"],sort_order:152},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NOTEBOOK",short_name:"notebook",short_names:["notebook"],sort_order:146},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NOTEBOOK WITH DECORATIVE COVER",short_name:"notebook_with_decorative_cover",short_names:["notebook_with_decorative_cover"],sort_order:151},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOSED BOOK",short_name:"closed_book",short_names:["closed_book"],sort_order:147},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OPEN BOOK",short_name:"book",short_names:["book","open_book"],sort_order:154},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GREEN BOOK",short_name:"green_book",short_names:["green_book"],sort_order:148},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLUE BOOK",short_name:"blue_book",short_names:["blue_book"],sort_order:149},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ORANGE BOOK",short_name:"orange_book",short_names:["orange_book"],sort_order:150},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BOOKS",short_name:"books",short_names:["books"],sort_order:153},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SCROLL",short_name:"scroll",short_names:["scroll"],sort_order:125},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MEMO",short_name:"memo",short_names:["memo","pencil"],sort_order:173},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TELEPHONE RECEIVER",short_name:"telephone_receiver",short_names:["telephone_receiver"],sort_order:23},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PAGER",short_name:"pager",short_names:["pager"],sort_order:25},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FAX MACHINE",short_name:"fax",short_names:["fax"],sort_order:26},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SATELLITE ANTENNA",short_name:"satellite",short_names:["satellite"],sort_order:38},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OUTBOX TRAY",short_name:"outbox_tray",short_names:["outbox_tray"],sort_order:124},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"INBOX TRAY",short_name:"inbox_tray",short_names:["inbox_tray"],sort_order:123},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PACKAGE",short_name:"package",short_names:["package"],sort_order:121},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"E-MAIL SYMBOL",short_name:"e-mail",short_names:["e-mail"],sort_order:114},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"INCOMING ENVELOPE",short_name:"incoming_envelope",short_names:["incoming_envelope"],sort_order:113},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ENVELOPE WITH DOWNWARDS ARROW ABOVE",short_name:"envelope_with_arrow",short_names:["envelope_with_arrow"],sort_order:112},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOSED MAILBOX WITH LOWERED FLAG",short_name:"mailbox_closed",short_names:["mailbox_closed"],sort_order:117},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOSED MAILBOX WITH RAISED FLAG",short_name:"mailbox",short_names:["mailbox"],sort_order:118},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OPEN MAILBOX WITH RAISED FLAG",short_name:"mailbox_with_mail",short_names:["mailbox_with_mail"],sort_order:119},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OPEN MAILBOX WITH LOWERED FLAG",short_name:"mailbox_with_no_mail",short_names:["mailbox_with_no_mail"],sort_order:120},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"POSTBOX",short_name:"postbox",short_names:["postbox"],sort_order:116},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"POSTAL HORN",short_name:"postal_horn",short_names:["postal_horn"],sort_order:122},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NEWSPAPER",short_name:"newspaper",short_names:["newspaper"],sort_order:145},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOBILE PHONE",short_name:"iphone",short_names:["iphone"],sort_order:2},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOBILE PHONE WITH RIGHTWARDS ARROW AT LEFT",short_name:"calling",short_names:["calling"],sort_order:3},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CAMERA",short_name:"camera",short_names:["camera"],sort_order:17},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CAMERA WITH FLASH",short_name:"camera_with_flash",short_names:["camera_with_flash"],sort_order:18},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"VIDEO CAMERA",short_name:"video_camera",short_names:["video_camera"],sort_order:19},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TELEVISION",short_name:"tv",short_names:["tv"],sort_order:27},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RADIO",short_name:"radio",short_names:["radio"],sort_order:28},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"VIDEOCASSETTE",short_name:"vhs",short_names:["vhs"],sort_order:16},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FILM PROJECTOR",short_name:"film_projector",short_names:["film_projector"],sort_order:21},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"PRAYER BEADS",short_name:"prayer_beads",short_names:["prayer_beads"],sort_order:75},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BATTERY",short_name:"battery",short_names:["battery"],sort_order:39},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ELECTRIC PLUG",short_name:"electric_plug",short_names:["electric_plug"],sort_order:40},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LEFT-POINTING MAGNIFYING GLASS",short_name:"mag",short_names:["mag"],sort_order:177},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RIGHT-POINTING MAGNIFYING GLASS",short_name:"mag_right",short_names:["mag_right"],sort_order:178},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LOCK WITH INK PEN",short_name:"lock_with_ink_pen",short_names:["lock_with_ink_pen"],sort_order:169},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOSED LOCK WITH KEY",short_name:"closed_lock_with_key",short_names:["closed_lock_with_key"],sort_order:166},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"KEY",short_name:"key",short_names:["key"],sort_order:89},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LOCK",short_name:"lock",short_names:["lock"],sort_order:167},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OPEN LOCK",short_name:"unlock",short_names:["unlock"],sort_order:168},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BOOKMARK",short_name:"bookmark",short_names:["bookmark"],sort_order:85},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LINK SYMBOL",short_name:"link",short_names:["link"],sort_order:155},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ELECTRIC TORCH",short_name:"flashlight",short_names:["flashlight"],sort_order:42},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WRENCH",short_name:"wrench",short_names:["wrench"],sort_order:55},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HAMMER",short_name:"hammer",short_names:["hammer"],sort_order:56},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NUT AND BOLT",short_name:"nut_and_bolt",short_names:["nut_and_bolt"],sort_order:60},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HOCHO",short_name:"hocho",short_names:["hocho","knife"],sort_order:65},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PISTOL",short_name:"gun",short_names:["gun"],sort_order:63},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MICROSCOPE",short_name:"microscope",short_names:["microscope"],sort_order:79},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TELESCOPE",short_name:"telescope",short_names:["telescope"],sort_order:78},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CRYSTAL BALL",short_name:"crystal_ball",short_names:["crystal_ball"],sort_order:74},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CANDLE",short_name:"candle",short_names:["candle"],sort_order:43},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MANTELPIECE CLOCK",short_name:"mantelpiece_clock",short_names:["mantelpiece_clock"],sort_order:35},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HOLE",short_name:"hole",short_names:["hole"],sort_order:80},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"JOYSTICK",short_name:"joystick",short_names:["joystick"],sort_order:10},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LINKED PAPERCLIPS",short_name:"linked_paperclips",short_names:["linked_paperclips"],sort_order:157},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LOWER LEFT BALLPOINT PEN",short_name:"lower_left_ballpoint_pen",short_names:["lower_left_ballpoint_pen"],sort_order:170},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LOWER LEFT FOUNTAIN PEN",short_name:"lower_left_fountain_pen",short_names:["lower_left_fountain_pen"],sort_order:171},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LOWER LEFT PAINTBRUSH",short_name:"lower_left_paintbrush",short_names:["lower_left_paintbrush"],sort_order:176},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LOWER LEFT CRAYON",short_name:"lower_left_crayon",short_names:["lower_left_crayon"],sort_order:175},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DESKTOP COMPUTER",short_name:"desktop_computer",short_names:["desktop_computer"],sort_order:6},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PRINTER",short_name:"printer",short_names:["printer"],sort_order:7},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"THREE BUTTON MOUSE",short_name:"three_button_mouse",short_names:["three_button_mouse"],sort_order:8},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TRACKBALL",short_name:"trackball",short_names:["trackball"],sort_order:9},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FRAME WITH PICTURE",short_name:"frame_with_picture",short_names:["frame_with_picture"],sort_order:96},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CARD INDEX DIVIDERS",short_name:"card_index_dividers",short_names:["card_index_dividers"],sort_order:143},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CARD FILE BOX",short_name:"card_file_box",short_names:["card_file_box"],sort_order:136},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FILE CABINET",short_name:"file_cabinet",short_names:["file_cabinet"],sort_order:138},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WASTEBASKET",short_name:"wastebasket",short_names:["wastebasket"],sort_order:44},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPIRAL NOTE PAD",short_name:"spiral_note_pad",short_names:["spiral_note_pad"],sort_order:140},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPIRAL CALENDAR PAD",short_name:"spiral_calendar_pad",short_names:["spiral_calendar_pad"],sort_order:134},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"COMPRESSION",short_name:"compression",short_names:["compression"],sort_order:11},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OLD KEY",short_name:"old_key",short_names:["old_key"],sort_order:90},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ROLLED-UP NEWSPAPER",short_name:"rolled_up_newspaper",short_names:["rolled_up_newspaper"],sort_order:144},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DAGGER KNIFE",short_name:"dagger_knife",short_names:["dagger_knife"],sort_order:66},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BALLOT BOX WITH BALLOT",short_name:"ballot_box_with_ballot",short_names:["ballot_box_with_ballot"],sort_order:137},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WORLD MAP",short_name:"world_map",short_names:["world_map"],sort_order:97},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOYAI",short_name:"moyai",short_names:["moyai"],sort_order:99},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TRIANGULAR FLAG ON POST",short_name:"triangular_flag_on_post",short_names:["triangular_flag_on_post"],sort_order:163},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DOOR",short_name:"door",short_names:["door"],sort_order:94},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMOKING SYMBOL",short_name:"smoking",short_names:["smoking"],sort_order:69},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TOILET",short_name:"toilet",short_names:["toilet"],sort_order:86},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SHOWER",short_name:"shower",short_names:["shower"],sort_order:87},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BATHTUB",short_name:"bathtub",short_names:["bathtub"],sort_order:88},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"COUCH AND LAMP",short_name:"couch_and_lamp",short_names:["couch_and_lamp"],sort_order:91},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SLEEPING ACCOMMODATION",short_name:"sleeping_accommodation",short_names:["sleeping_accommodation"],sort_order:92},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SHOPPING BAGS",short_name:"shopping_bags",short_names:["shopping_bags"],sort_order:100},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BELLHOP BELL",short_name:"bellhop_bell",short_names:["bellhop_bell"],sort_order:95},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BED",short_name:"bed",short_names:["bed"],sort_order:93},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HAMMER AND WRENCH",short_name:"hammer_and_wrench",short_names:["hammer_and_wrench"],sort_order:58},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SHIELD",short_name:"shield",short_names:["shield"],sort_order:68},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OIL DRUM",short_name:"oil_drum",short_names:["oil_drum"],sort_order:45}],Nature:[{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLACK SUN WITH RAYS",short_name:"sunny",short_names:["sunny"],sort_order:123},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOUD",short_name:"cloud",short_names:["cloud"],sort_order:128},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"UMBRELLA",short_name:"umbrella",short_names:["umbrella"],sort_order:143},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"SNOWMAN",short_name:"snowman",short_names:["snowman"],sort_order:137},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"COMET",short_name:"comet",short_names:["comet"],sort_order:122},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"UMBRELLA WITH RAIN DROPS",short_name:"umbrella",short_names:["umbrella"],sort_order:144},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"SHAMROCK",short_name:"shamrock",short_names:["shamrock"],sort_order:81},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HIGH VOLTAGE SIGN",short_name:"zap",short_names:["zap"],sort_order:132},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SNOWMAN WITHOUT SNOW",short_name:"snowman",short_names:["snowman"],sort_order:138},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SUN BEHIND CLOUD",short_name:"partly_sunny",short_names:["partly_sunny"],sort_order:125},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"THUNDER CLOUD AND RAIN",short_name:"thunder_cloud_and_rain",short_names:["thunder_cloud_and_rain"],sort_order:130},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPARKLES",short_name:"sparkles",short_names:["sparkles"],sort_order:121},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SNOWFLAKE",short_name:"snowflake",short_names:["snowflake"],sort_order:135},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE MEDIUM STAR",short_name:"star",short_names:["star"],sort_order:118},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WATER WAVE",short_name:"ocean",short_names:["ocean"],sort_order:147},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EARTH GLOBE EUROPE-AFRICA",short_name:"earth_africa",short_names:["earth_africa"],sort_order:102},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EARTH GLOBE AMERICAS",short_name:"earth_americas",short_names:["earth_americas"],sort_order:101},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EARTH GLOBE ASIA-AUSTRALIA",short_name:"earth_asia",short_names:["earth_asia"],sort_order:103},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NEW MOON SYMBOL",short_name:"new_moon",short_names:["new_moon"],sort_order:108},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WAXING CRESCENT MOON SYMBOL",short_name:"waxing_crescent_moon",short_names:["waxing_crescent_moon"],sort_order:109},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FIRST QUARTER MOON SYMBOL",short_name:"first_quarter_moon",short_names:["first_quarter_moon"],sort_order:110},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WAXING GIBBOUS MOON SYMBOL",short_name:"moon",short_names:["moon","waxing_gibbous_moon"],sort_order:111},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FULL MOON SYMBOL",short_name:"full_moon",short_names:["full_moon"],sort_order:104},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WANING GIBBOUS MOON SYMBOL",short_name:"waning_gibbous_moon",short_names:["waning_gibbous_moon"],sort_order:105},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LAST QUARTER MOON SYMBOL",short_name:"last_quarter_moon",short_names:["last_quarter_moon"],sort_order:106},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WANING CRESCENT MOON SYMBOL",short_name:"waning_crescent_moon",short_names:["waning_crescent_moon"],sort_order:107},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CRESCENT MOON",short_name:"crescent_moon",short_names:["crescent_moon"],sort_order:117},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NEW MOON WITH FACE",short_name:"new_moon_with_face",short_names:["new_moon_with_face"],sort_order:112},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FIRST QUARTER MOON WITH FACE",short_name:"first_quarter_moon_with_face",short_names:["first_quarter_moon_with_face"],sort_order:114},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LAST QUARTER MOON WITH FACE",short_name:"last_quarter_moon_with_face",short_names:["last_quarter_moon_with_face"],sort_order:115},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FULL MOON WITH FACE",short_name:"full_moon_with_face",short_names:["full_moon_with_face"],sort_order:113},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SUN WITH FACE",short_name:"sun_with_face",short_names:["sun_with_face"],sort_order:116},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GLOWING STAR",short_name:"star2",short_names:["star2"],sort_order:119},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"WHITE SUN WITH SMALL CLOUD",short_name:"mostly_sunny",short_names:["mostly_sunny","sun_small_cloud"],sort_order:124},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"WHITE SUN BEHIND CLOUD",short_name:"barely_sunny",short_names:["barely_sunny","sun_behind_cloud"],sort_order:126},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"WHITE SUN BEHIND CLOUD WITH RAIN",short_name:"partly_sunny_rain",short_names:["partly_sunny_rain","sun_behind_rain_cloud"],sort_order:127},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOUD WITH RAIN",short_name:"rain_cloud",short_names:["rain_cloud"],sort_order:129},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOUD WITH SNOW",short_name:"snow_cloud",short_names:["snow_cloud"],sort_order:136},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOUD WITH LIGHTNING",short_name:"lightning",short_names:["lightning","lightning_cloud"],sort_order:131},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOUD WITH TORNADO",short_name:"tornado",short_names:["tornado","tornado_cloud"],sort_order:141},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FOG",short_name:"fog",short_names:["fog"],sort_order:142},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WIND BLOWING FACE",short_name:"wind_blowing_face",short_names:["wind_blowing_face"],sort_order:139},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHESTNUT",short_name:"chestnut",short_names:["chestnut"],sort_order:97},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SEEDLING",short_name:"seedling",short_names:["seedling"],sort_order:79},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EVERGREEN TREE",short_name:"evergreen_tree",short_names:["evergreen_tree"],sort_order:76},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DECIDUOUS TREE",short_name:"deciduous_tree",short_names:["deciduous_tree"],sort_order:77},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PALM TREE",short_name:"palm_tree",short_names:["palm_tree"],sort_order:78},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CACTUS",short_name:"cactus",short_names:["cactus"],sort_order:74},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TULIP",short_name:"tulip",short_names:["tulip"],sort_order:92},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHERRY BLOSSOM",short_name:"cherry_blossom",short_names:["cherry_blossom"],sort_order:94},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ROSE",short_name:"rose",short_names:["rose"],sort_order:91},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HIBISCUS",short_name:"hibiscus",short_names:["hibiscus"],sort_order:89},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SUNFLOWER",short_name:"sunflower",short_names:["sunflower"],sort_order:90},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLOSSOM",short_name:"blossom",short_names:["blossom"],sort_order:93},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EAR OF RICE",short_name:"ear_of_rice",short_names:["ear_of_rice"],sort_order:88},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HERB",short_name:"herb",short_names:["herb"],sort_order:80},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FOUR LEAF CLOVER",short_name:"four_leaf_clover",short_names:["four_leaf_clover"],sort_order:82},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MAPLE LEAF",short_name:"maple_leaf",short_names:["maple_leaf"],sort_order:87},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FALLEN LEAF",short_name:"fallen_leaf",short_names:["fallen_leaf"],sort_order:86},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LEAF FLUTTERING IN WIND",short_name:"leaves",short_names:["leaves"],sort_order:85},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MUSHROOM",short_name:"mushroom",short_names:["mushroom"],sort_order:96},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"JACK-O-LANTERN",short_name:"jack_o_lantern",short_names:["jack_o_lantern"],sort_order:98},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHRISTMAS TREE",short_name:"christmas_tree",short_names:["christmas_tree"],sort_order:75},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TANABATA TREE",short_name:"tanabata_tree",short_names:["tanabata_tree"],sort_order:84},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PINE DECORATION",short_name:"bamboo",short_names:["bamboo"],sort_order:83},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RAT",short_name:"rat",short_names:["rat"],sort_order:61},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOUSE",short_name:"mouse2",short_names:["mouse2"],sort_order:62},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OX",short_name:"ox",short_names:["ox"],sort_order:51},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WATER BUFFALO",short_name:"water_buffalo",short_names:["water_buffalo"],sort_order:50},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"COW",short_name:"cow2",short_names:["cow2"],sort_order:52},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TIGER",short_name:"tiger2",short_names:["tiger2"],sort_order:49},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LEOPARD",short_name:"leopard",short_names:["leopard"],sort_order:48},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RABBIT",short_name:"rabbit2",short_names:["rabbit2"],sort_order:69},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CAT",short_name:"cat2",short_names:["cat2"],sort_order:68},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DRAGON",short_name:"dragon",short_names:["dragon"],sort_order:72},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CROCODILE",short_name:"crocodile",short_names:["crocodile"],sort_order:47},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHALE",short_name:"whale2",short_names:["whale2"],sort_order:46},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SNAIL",short_name:"snail",short_names:["snail"],sort_order:33},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SNAKE",short_name:"snake",short_names:["snake"],sort_order:39},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HORSE",short_name:"racehorse",short_names:["racehorse"],sort_order:59},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RAM",short_name:"ram",short_names:["ram"],sort_order:57},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GOAT",short_name:"goat",short_names:["goat"],sort_order:56},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SHEEP",short_name:"sheep",short_names:["sheep"],sort_order:58},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MONKEY",short_name:"monkey",short_names:["monkey"],sort_order:20},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ROOSTER",short_name:"rooster",short_names:["rooster"],sort_order:63},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHICKEN",short_name:"chicken",short_names:["chicken"],sort_order:21},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DOG",short_name:"dog2",short_names:["dog2"],sort_order:66},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PIG",short_name:"pig2",short_names:["pig2"],sort_order:60},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BOAR",short_name:"boar",short_names:["boar"],sort_order:28},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ELEPHANT",short_name:"elephant",short_names:["elephant"],sort_order:55},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OCTOPUS",short_name:"octopus",short_names:["octopus"],sort_order:15},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPIRAL SHELL",short_name:"shell",short_names:["shell"],sort_order:99},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BUG",short_name:"bug",short_names:["bug"],sort_order:32},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ANT",short_name:"ant",short_names:["ant"],sort_order:35},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HONEYBEE",short_name:"bee",short_names:["bee","honeybee"],sort_order:31},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LADY BEETLE",short_name:"beetle",short_names:["beetle"],sort_order:34},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FISH",short_name:"fish",short_names:["fish"],sort_order:42},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TROPICAL FISH",short_name:"tropical_fish",short_names:["tropical_fish"],sort_order:41},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BLOWFISH",short_name:"blowfish",short_names:["blowfish"],sort_order:43},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TURTLE",short_name:"turtle",short_names:["turtle"],sort_order:40},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HATCHING CHICK",short_name:"hatching_chick",short_names:["hatching_chick"],sort_order:25},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BABY CHICK",short_name:"baby_chick",short_names:["baby_chick"],sort_order:24},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FRONT-FACING BABY CHICK",short_name:"hatched_chick",short_names:["hatched_chick"],sort_order:26},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BIRD",short_name:"bird",short_names:["bird"],sort_order:23},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PENGUIN",short_name:"penguin",short_names:["penguin"],sort_order:22},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"KOALA",short_name:"koala",short_names:["koala"],sort_order:8},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"POODLE",short_name:"poodle",short_names:["poodle"],sort_order:67},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DROMEDARY CAMEL",short_name:"dromedary_camel",short_names:["dromedary_camel"],sort_order:53},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BACTRIAN CAMEL",short_name:"camel",short_names:["camel"],sort_order:54},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DOLPHIN",short_name:"dolphin",short_names:["dolphin","flipper"],sort_order:44},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOUSE FACE",short_name:"mouse",short_names:["mouse"],sort_order:3},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"COW FACE",short_name:"cow",short_names:["cow"],sort_order:11},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TIGER FACE",short_name:"tiger",short_names:["tiger"],sort_order:9},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RABBIT FACE",short_name:"rabbit",short_names:["rabbit"],sort_order:5},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CAT FACE",short_name:"cat",short_names:["cat"],sort_order:2},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DRAGON FACE",short_name:"dragon_face",short_names:["dragon_face"],sort_order:73},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPOUTING WHALE",short_name:"whale",short_names:["whale"],sort_order:45},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HORSE FACE",short_name:"horse",short_names:["horse"],sort_order:29},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MONKEY FACE",short_name:"monkey_face",short_names:["monkey_face"],sort_order:16},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DOG FACE",short_name:"dog",short_names:["dog"],sort_order:1},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PIG FACE",short_name:"pig",short_names:["pig"],sort_order:12},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FROG FACE",short_name:"frog",short_names:["frog"],sort_order:14},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HAMSTER FACE",short_name:"hamster",short_names:["hamster"],sort_order:4},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WOLF FACE",short_name:"wolf",short_names:["wolf"],sort_order:27},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BEAR FACE",short_name:"bear",short_names:["bear"],sort_order:6},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PANDA FACE",short_name:"panda_face",short_names:["panda_face"],sort_order:7},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PIG NOSE",short_name:"pig_nose",short_names:["pig_nose"],sort_order:13},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PAW PRINTS",short_name:"feet",short_names:["feet","paw_prints"],sort_order:71},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHIPMUNK",short_name:"chipmunk",short_names:["chipmunk"],sort_order:70},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BOUQUET",short_name:"bouquet",short_names:["bouquet"],sort_order:95},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"COLLISION SYMBOL",short_name:"boom",short_names:["boom","collision"],sort_order:134},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPLASHING SWEAT SYMBOL",short_name:"sweat_drops",short_names:["sweat_drops"],sort_order:146},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DROPLET",short_name:"droplet",short_names:["droplet"],sort_order:145},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DASH SYMBOL",short_name:"dash",short_names:["dash"],sort_order:140},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DIZZY SYMBOL",short_name:"dizzy",short_names:["dizzy"],sort_order:120},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FIRE",short_name:"fire",short_names:["fire"],sort_order:133},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DOVE OF PEACE",short_name:"dove_of_peace",short_names:["dove_of_peace"],sort_order:65},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPIDER",short_name:"spider",short_names:["spider"],sort_order:36},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPIDER WEB",short_name:"spider_web",short_names:["spider_web"],sort_order:100},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SEE-NO-EVIL MONKEY",short_name:"see_no_evil",short_names:["see_no_evil"],sort_order:17},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEAR-NO-EVIL MONKEY",short_name:"hear_no_evil",short_names:["hear_no_evil"],sort_order:18},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPEAK-NO-EVIL MONKEY",short_name:"speak_no_evil",short_names:["speak_no_evil"],sort_order:19},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"CRAB",short_name:"crab",short_names:["crab"],sort_order:38},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"LION FACE",short_name:"lion_face",short_names:["lion_face"],sort_order:10},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"SCORPION",short_name:"scorpion",short_names:["scorpion"],sort_order:37},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"TURKEY",short_name:"turkey",short_names:["turkey"],sort_order:64},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"UNICORN FACE",short_name:"unicorn_face",short_names:["unicorn_face"],sort_order:30}],Foods:[{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HOT BEVERAGE",short_name:"coffee",short_names:["coffee"],sort_order:64},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"HOT DOG",short_name:"hotdog",short_names:["hotdog"],sort_order:28},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"TACO",short_name:"taco",short_names:["taco"],sort_order:31},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"BURRITO",short_name:"burrito",short_names:["burrito"],sort_order:32},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HOT PEPPER",short_name:"hot_pepper",short_names:["hot_pepper"],sort_order:16},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EAR OF MAIZE",short_name:"corn",short_names:["corn"],sort_order:17},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TOMATO",short_name:"tomato",short_names:["tomato"],sort_order:14},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"AUBERGINE",short_name:"eggplant",short_names:["eggplant"],sort_order:15},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GRAPES",short_name:"grapes",short_names:["grapes"],sort_order:8},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MELON",short_name:"melon",short_names:["melon"],sort_order:10},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WATERMELON",short_name:"watermelon",short_names:["watermelon"],sort_order:7},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TANGERINE",short_name:"tangerine",short_names:["tangerine"],sort_order:4},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LEMON",short_name:"lemon",short_names:["lemon"],sort_order:5},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BANANA",short_name:"banana",short_names:["banana"],sort_order:6},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PINEAPPLE",short_name:"pineapple",short_names:["pineapple"],sort_order:13},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RED APPLE",short_name:"apple",short_names:["apple"],sort_order:2},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GREEN APPLE",short_name:"green_apple",short_names:["green_apple"],sort_order:1},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PEAR",short_name:"pear",short_names:["pear"],sort_order:3},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PEACH",short_name:"peach",short_names:["peach"],sort_order:12},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHERRIES",short_name:"cherries",short_names:["cherries"],sort_order:11},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"STRAWBERRY",short_name:"strawberry",short_names:["strawberry"],sort_order:9},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HAMBURGER",short_name:"hamburger",short_names:["hamburger"],sort_order:26},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SLICE OF PIZZA",short_name:"pizza",short_names:["pizza"],sort_order:29},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MEAT ON BONE",short_name:"meat_on_bone",short_names:["meat_on_bone"],sort_order:23},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"POULTRY LEG",short_name:"poultry_leg",short_names:["poultry_leg"],sort_order:22},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RICE CRACKER",short_name:"rice_cracker",short_names:["rice_cracker"],sort_order:41},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RICE BALL",short_name:"rice_ball",short_names:["rice_ball"],sort_order:39},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"COOKED RICE",short_name:"rice",short_names:["rice"],sort_order:40},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CURRY AND RICE",short_name:"curry",short_names:["curry"],sort_order:38},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"STEAMING BOWL",short_name:"ramen",short_names:["ramen"],sort_order:33},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPAGHETTI",short_name:"spaghetti",short_names:["spaghetti"],sort_order:30},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BREAD",short_name:"bread",short_names:["bread"],sort_order:20},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FRENCH FRIES",short_name:"fries",short_names:["fries"],sort_order:27},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ROASTED SWEET POTATO",short_name:"sweet_potato",short_names:["sweet_potato"],sort_order:18},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DANGO",short_name:"dango",short_names:["dango"],sort_order:43},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ODEN",short_name:"oden",short_names:["oden"],sort_order:42},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SUSHI",short_name:"sushi",short_names:["sushi"],sort_order:36},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FRIED SHRIMP",short_name:"fried_shrimp",short_names:["fried_shrimp"],sort_order:24},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FISH CAKE WITH SWIRL DESIGN",short_name:"fish_cake",short_names:["fish_cake"],sort_order:35},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SOFT ICE CREAM",short_name:"icecream",short_names:["icecream"],sort_order:46},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SHAVED ICE",short_name:"shaved_ice",short_names:["shaved_ice"],sort_order:44},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ICE CREAM",short_name:"ice_cream",short_names:["ice_cream"],sort_order:45},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DOUGHNUT",short_name:"doughnut",short_names:["doughnut"],sort_order:54},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"COOKIE",short_name:"cookie",short_names:["cookie"],sort_order:55},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHOCOLATE BAR",short_name:"chocolate_bar",short_names:["chocolate_bar"],sort_order:52},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CANDY",short_name:"candy",short_names:["candy"],sort_order:50},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LOLLIPOP",short_name:"lollipop",short_names:["lollipop"],sort_order:51},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CUSTARD",short_name:"custard",short_names:["custard"],sort_order:49},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HONEY POT",short_name:"honey_pot",short_names:["honey_pot"],sort_order:19},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SHORTCAKE",short_name:"cake",short_names:["cake"],sort_order:47},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BENTO BOX",short_name:"bento",short_names:["bento"],sort_order:37},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"POT OF FOOD",short_name:"stew",short_names:["stew"],sort_order:34},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"COOKING",short_name:"egg",short_names:["egg"],sort_order:25},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FORK AND KNIFE",short_name:"fork_and_knife",short_names:["fork_and_knife"],sort_order:66},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TEACUP WITHOUT HANDLE",short_name:"tea",short_names:["tea"],sort_order:63},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SAKE BOTTLE AND CUP",short_name:"sake",short_names:["sake"],sort_order:62},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WINE GLASS",short_name:"wine_glass",short_names:["wine_glass"],sort_order:58},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"COCKTAIL GLASS",short_name:"cocktail",short_names:["cocktail"],sort_order:59},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TROPICAL DRINK",short_name:"tropical_drink",short_names:["tropical_drink"],sort_order:60},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BEER MUG",short_name:"beer",short_names:["beer"],sort_order:56},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLINKING BEER MUGS",short_name:"beers",short_names:["beers"],sort_order:57},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BABY BOTTLE",short_name:"baby_bottle",short_names:["baby_bottle"],sort_order:65},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FORK AND KNIFE WITH PLATE",short_name:"knife_fork_plate",short_names:["knife_fork_plate"],sort_order:67},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"BOTTLE WITH POPPING CORK",short_name:"champagne",short_names:["champagne"],sort_order:61},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"POPCORN",short_name:"popcorn",short_names:["popcorn"],sort_order:53},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BIRTHDAY CAKE",short_name:"birthday",short_names:["birthday"],sort_order:48},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"CHEESE WEDGE",short_name:"cheese_wedge",short_names:["cheese_wedge"],sort_order:21}],People:[{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE UP POINTING INDEX",short_name:"point_up",short_names:["point_up"],sort_order:101},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"WHITE FROWNING FACE",short_name:"white_frowning_face",short_names:["white_frowning_face"],sort_order:44},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE SMILING FACE",short_name:"relaxed",short_names:["relaxed"],sort_order:14},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"HELMET WITH WHITE CROSS",short_name:"helmet_with_white_cross",short_names:["helmet_with_white_cross"],sort_order:193},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RAISED FIST",short_name:"fist",short_names:["fist"],sort_order:94},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RAISED HAND",short_name:"hand",short_names:["hand","raised_hand"],sort_order:97},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"VICTORY HAND",short_name:"v",short_names:["v"],sort_order:95},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"WRITING HAND",short_name:"writing_hand",short_names:["writing_hand"],sort_order:110},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLOSED UMBRELLA",short_name:"closed_umbrella",short_names:["closed_umbrella"],sort_order:204},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FATHER CHRISTMAS",short_name:"santa",short_names:["santa"],sort_order:135},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SCHOOL SATCHEL",short_name:"school_satchel",short_names:["school_satchel"],sort_order:196},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GRADUATION CAP",short_name:"mortar_board",short_names:["mortar_board"],sort_order:194},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TOP HAT",short_name:"tophat",short_names:["tophat"],sort_order:192},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RUNNER",short_name:"runner",short_names:["runner","running"],sort_order:140},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EYES",short_name:"eyes",short_names:["eyes"],sort_order:117},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EYE",short_name:"eye",short_names:["eye"],sort_order:116},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EAR",short_name:"ear",short_names:["ear"],sort_order:114},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NOSE",short_name:"nose",short_names:["nose"],sort_order:115},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOUTH",short_name:"lips",short_names:["lips"],sort_order:112},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TONGUE",short_name:"tongue",short_names:["tongue"],sort_order:113},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE UP POINTING BACKHAND INDEX",short_name:"point_up_2",short_names:["point_up_2"],sort_order:102},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE DOWN POINTING BACKHAND INDEX",short_name:"point_down",short_names:["point_down"],sort_order:103},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE LEFT POINTING BACKHAND INDEX",short_name:"point_left",short_names:["point_left"],sort_order:104},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WHITE RIGHT POINTING BACKHAND INDEX",short_name:"point_right",short_names:["point_right"],sort_order:105},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FISTED HAND SIGN",short_name:"facepunch",short_names:["facepunch","punch"],sort_order:93},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WAVING HAND SIGN",short_name:"wave",short_names:["wave"],sort_order:90},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OK HAND SIGN",short_name:"ok_hand",short_names:["ok_hand"],sort_order:96},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"THUMBS UP SIGN",short_name:"+1",short_names:["+1","thumbsup"],sort_order:91},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"THUMBS DOWN SIGN",short_name:"-1",short_names:["-1","thumbsdown"],sort_order:92},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLAPPING HANDS SIGN",short_name:"clap",short_names:["clap"],sort_order:89},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OPEN HANDS SIGN",short_name:"open_hands",short_names:["open_hands"],sort_order:98},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CROWN",short_name:"crown",short_names:["crown"],sort_order:195},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WOMANS HAT",short_name:"womans_hat",short_names:["womans_hat"],sort_order:191},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EYEGLASSES",short_name:"eyeglasses",short_names:["eyeglasses"],sort_order:201},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NECKTIE",short_name:"necktie",short_names:["necktie"],sort_order:179},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"T-SHIRT",short_name:"shirt",short_names:["shirt","tshirt"],sort_order:177},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"JEANS",short_name:"jeans",short_names:["jeans"],sort_order:178},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DRESS",short_name:"dress",short_names:["dress"],sort_order:180},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"KIMONO",short_name:"kimono",short_names:["kimono"],sort_order:182},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BIKINI",short_name:"bikini",short_names:["bikini"],sort_order:181},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WOMANS CLOTHES",short_name:"womans_clothes",short_names:["womans_clothes"],sort_order:176},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PURSE",short_name:"purse",short_names:["purse"],sort_order:198},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HANDBAG",short_name:"handbag",short_names:["handbag"],sort_order:199},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"POUCH",short_name:"pouch",short_names:["pouch"],sort_order:197},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MANS SHOE",short_name:"mans_shoe",short_names:["mans_shoe","shoe"],sort_order:189},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ATHLETIC SHOE",short_name:"athletic_shoe",short_names:["athletic_shoe"],sort_order:190},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HIGH-HEELED SHOE",short_name:"high_heel",short_names:["high_heel"],sort_order:186},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WOMANS SANDAL",short_name:"sandal",short_names:["sandal"],sort_order:187},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WOMANS BOOTS",short_name:"boot",short_names:["boot"],sort_order:188},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FOOTPRINTS",short_name:"footprints",short_names:["footprints"],sort_order:185},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BUST IN SILHOUETTE",short_name:"bust_in_silhouette",short_names:["bust_in_silhouette"],sort_order:118},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BUSTS IN SILHOUETTE",short_name:"busts_in_silhouette",short_names:["busts_in_silhouette"],sort_order:119},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BOY",short_name:"boy",short_names:["boy"],sort_order:122},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GIRL",short_name:"girl",short_names:["girl"],sort_order:123},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MAN",short_name:"man",short_names:["man"],sort_order:124},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WOMAN",short_name:"woman",short_names:["woman"],sort_order:125},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FAMILY",short_name:"family",short_names:["family","man-woman-boy"],sort_order:161},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MAN AND WOMAN HOLDING HANDS",short_name:"couple",short_names:["couple","man_and_woman_holding_hands"],sort_order:143},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TWO MEN HOLDING HANDS",short_name:"two_men_holding_hands",short_names:["two_men_holding_hands"],sort_order:144},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TWO WOMEN HOLDING HANDS",short_name:"two_women_holding_hands",short_names:["two_women_holding_hands"],sort_order:145},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"POLICE OFFICER",short_name:"cop",short_names:["cop"],sort_order:131},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WOMAN WITH BUNNY EARS",short_name:"dancers",short_names:["dancers"],sort_order:142},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BRIDE WITH VEIL",short_name:"bride_with_veil",short_names:["bride_with_veil"],sort_order:138},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PERSON WITH BLOND HAIR",short_name:"person_with_blond_hair",short_names:["person_with_blond_hair"],sort_order:126},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MAN WITH GUA PI MAO",short_name:"man_with_gua_pi_mao",short_names:["man_with_gua_pi_mao"],sort_order:129},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MAN WITH TURBAN",short_name:"man_with_turban",short_names:["man_with_turban"],sort_order:130},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OLDER MAN",short_name:"older_man",short_names:["older_man"],sort_order:127},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OLDER WOMAN",short_name:"older_woman",short_names:["older_woman"],sort_order:128},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BABY",short_name:"baby",short_names:["baby"],sort_order:121},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CONSTRUCTION WORKER",short_name:"construction_worker",short_names:["construction_worker"],sort_order:132},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PRINCESS",short_name:"princess",short_names:["princess"],sort_order:137},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"JAPANESE OGRE",short_name:"japanese_ogre",short_names:["japanese_ogre"],sort_order:73},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"JAPANESE GOBLIN",short_name:"japanese_goblin",short_names:["japanese_goblin"],sort_order:74},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GHOST",short_name:"ghost",short_names:["ghost"],sort_order:76},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BABY ANGEL",short_name:"angel",short_names:["angel"],sort_order:136},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EXTRATERRESTRIAL ALIEN",short_name:"alien",short_names:["alien"],sort_order:77},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"IMP",short_name:"imp",short_names:["imp"],sort_order:72},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SKULL",short_name:"skull",short_names:["skull"],sort_order:75},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"INFORMATION DESK PERSON",short_name:"information_desk_person",short_names:["information_desk_person"],sort_order:147},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GUARDSMAN",short_name:"guardsman",short_names:["guardsman"],sort_order:133},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DANCER",short_name:"dancer",short_names:["dancer"],sort_order:141},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LIPSTICK",short_name:"lipstick",short_names:["lipstick"],sort_order:183},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NAIL POLISH",short_name:"nail_care",short_names:["nail_care"],sort_order:111},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE MASSAGE",short_name:"massage",short_names:["massage"],sort_order:154},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HAIRCUT",short_name:"haircut",short_names:["haircut"],sort_order:153},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"KISS MARK",short_name:"kiss",short_names:["kiss"],sort_order:184},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RING",short_name:"ring",short_names:["ring"],sort_order:203},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"KISS",short_name:"couplekiss",short_names:["couplekiss"],sort_order:158},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"COUPLE WITH HEART",short_name:"couple_with_heart",short_names:["couple_with_heart"],sort_order:155},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SLEEPING SYMBOL",short_name:"zzz",short_names:["zzz"],sort_order:69},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PILE OF POO",short_name:"hankey",short_names:["hankey","poop","shit"],sort_order:70},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FLEXED BICEPS",short_name:"muscle",short_names:["muscle"],sort_order:99},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BRIEFCASE",short_name:"briefcase",short_names:["briefcase"],sort_order:200},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SLEUTH OR SPY",short_name:"sleuth_or_spy",short_names:["sleuth_or_spy"],sort_order:134},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DARK SUNGLASSES",short_name:"dark_sunglasses",short_names:["dark_sunglasses"],sort_order:202},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RAISED HAND WITH FINGERS SPLAYED",short_name:"raised_hand_with_fingers_splayed",short_names:["raised_hand_with_fingers_splayed"],sort_order:107},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REVERSED HAND WITH MIDDLE FINGER EXTENDED",short_name:"middle_finger",short_names:["middle_finger","reversed_hand_with_middle_finger_extended"],sort_order:106},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RAISED HAND WITH PART BETWEEN MIDDLE AND RING FINGERS",short_name:"spock-hand",short_names:["spock-hand"],sort_order:109},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPEAKING HEAD IN SILHOUETTE",short_name:"speaking_head_in_silhouette",short_names:["speaking_head_in_silhouette"],sort_order:120},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GRINNING FACE",short_name:"grinning",short_names:["grinning"],sort_order:1},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GRINNING FACE WITH SMILING EYES",short_name:"grin",short_names:["grin"],sort_order:3},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE WITH TEARS OF JOY",short_name:"joy",short_names:["joy"],sort_order:4},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMILING FACE WITH OPEN MOUTH",short_name:"smiley",short_names:["smiley"],sort_order:5},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMILING FACE WITH OPEN MOUTH AND SMILING EYES",short_name:"smile",short_names:["smile"],sort_order:6},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMILING FACE WITH OPEN MOUTH AND COLD SWEAT",short_name:"sweat_smile",short_names:["sweat_smile"],sort_order:7},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMILING FACE WITH OPEN MOUTH AND TIGHTLY-CLOSED EYES",short_name:"laughing",short_names:["laughing","satisfied"],sort_order:8},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMILING FACE WITH HALO",short_name:"innocent",short_names:["innocent"],sort_order:9},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMILING FACE WITH HORNS",short_name:"smiling_imp",short_names:["smiling_imp"],sort_order:71},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WINKING FACE",short_name:"wink",short_names:["wink"],sort_order:10},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMILING FACE WITH SMILING EYES",short_name:"blush",short_names:["blush"],sort_order:11},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE SAVOURING DELICIOUS FOOD",short_name:"yum",short_names:["yum"],sort_order:15},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RELIEVED FACE",short_name:"relieved",short_names:["relieved"],sort_order:16},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMILING FACE WITH HEART-SHAPED EYES",short_name:"heart_eyes",short_names:["heart_eyes"],sort_order:17},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMILING FACE WITH SUNGLASSES",short_name:"sunglasses",short_names:["sunglasses"],sort_order:27},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMIRKING FACE",short_name:"smirk",short_names:["smirk"],sort_order:29},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NEUTRAL FACE",short_name:"neutral_face",short_names:["neutral_face"],sort_order:31},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EXPRESSIONLESS FACE",short_name:"expressionless",short_names:["expressionless"],sort_order:32},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"UNAMUSED FACE",short_name:"unamused",short_names:["unamused"],sort_order:33},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE WITH COLD SWEAT",short_name:"sweat",short_names:["sweat"],sort_order:60},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PENSIVE FACE",short_name:"pensive",short_names:["pensive"],sort_order:41},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CONFUSED FACE",short_name:"confused",short_names:["confused"],sort_order:42},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CONFOUNDED FACE",short_name:"confounded",short_names:["confounded"],sort_order:46},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"KISSING FACE",short_name:"kissing",short_names:["kissing"],sort_order:19},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE THROWING A KISS",short_name:"kissing_heart",short_names:["kissing_heart"],sort_order:18},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"KISSING FACE WITH SMILING EYES",short_name:"kissing_smiling_eyes",short_names:["kissing_smiling_eyes"],sort_order:20},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"KISSING FACE WITH CLOSED EYES",short_name:"kissing_closed_eyes",short_names:["kissing_closed_eyes"],sort_order:21},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE WITH STUCK-OUT TONGUE",short_name:"stuck_out_tongue",short_names:["stuck_out_tongue"],sort_order:24},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE WITH STUCK-OUT TONGUE AND WINKING EYE",short_name:"stuck_out_tongue_winking_eye",short_names:["stuck_out_tongue_winking_eye"],sort_order:22},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE WITH STUCK-OUT TONGUE AND TIGHTLY-CLOSED EYES",short_name:"stuck_out_tongue_closed_eyes",short_names:["stuck_out_tongue_closed_eyes"],sort_order:23},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DISAPPOINTED FACE",short_name:"disappointed",short_names:["disappointed"],sort_order:37},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WORRIED FACE",short_name:"worried",short_names:["worried"],sort_order:38},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ANGRY FACE",short_name:"angry",short_names:["angry"],sort_order:39},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"POUTING FACE",short_name:"rage",short_names:["rage"],sort_order:40},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CRYING FACE",short_name:"cry",short_names:["cry"],sort_order:57},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PERSEVERING FACE",short_name:"persevere",short_names:["persevere"],sort_order:45},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE WITH LOOK OF TRIUMPH",short_name:"triumph",short_names:["triumph"],sort_order:49},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DISAPPOINTED BUT RELIEVED FACE",short_name:"disappointed_relieved",short_names:["disappointed_relieved"],sort_order:58},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FROWNING FACE WITH OPEN MOUTH",short_name:"frowning",short_names:["frowning"],sort_order:55},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ANGUISHED FACE",short_name:"anguished",short_names:["anguished"],sort_order:56},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FEARFUL FACE",short_name:"fearful",short_names:["fearful"],sort_order:52},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WEARY FACE",short_name:"weary",short_names:["weary"],sort_order:48},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SLEEPY FACE",short_name:"sleepy",short_names:["sleepy"],sort_order:59},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TIRED FACE",short_name:"tired_face",short_names:["tired_face"],sort_order:47},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GRIMACING FACE",short_name:"grimacing",short_names:["grimacing"],sort_order:2},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LOUDLY CRYING FACE",short_name:"sob",short_names:["sob"],sort_order:61},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE WITH OPEN MOUTH",short_name:"open_mouth",short_names:["open_mouth"],sort_order:50},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HUSHED FACE",short_name:"hushed",short_names:["hushed"],sort_order:54},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE WITH OPEN MOUTH AND COLD SWEAT",short_name:"cold_sweat",short_names:["cold_sweat"],sort_order:53},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE SCREAMING IN FEAR",short_name:"scream",short_names:["scream"],sort_order:51},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ASTONISHED FACE",short_name:"astonished",short_names:["astonished"],sort_order:63},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FLUSHED FACE",short_name:"flushed",short_names:["flushed"],sort_order:36},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SLEEPING FACE",short_name:"sleeping",short_names:["sleeping"],sort_order:68},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DIZZY FACE",short_name:"dizzy_face",short_names:["dizzy_face"],sort_order:62},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE WITHOUT MOUTH",short_name:"no_mouth",short_names:["no_mouth"],sort_order:30},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE WITH MEDICAL MASK",short_name:"mask",short_names:["mask"],sort_order:65},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GRINNING CAT FACE WITH SMILING EYES",short_name:"smile_cat",short_names:["smile_cat"],sort_order:80},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CAT FACE WITH TEARS OF JOY",short_name:"joy_cat",short_names:["joy_cat"],sort_order:81},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMILING CAT FACE WITH OPEN MOUTH",short_name:"smiley_cat",short_names:["smiley_cat"],sort_order:79},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMILING CAT FACE WITH HEART-SHAPED EYES",short_name:"heart_eyes_cat",short_names:["heart_eyes_cat"],sort_order:82},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CAT FACE WITH WRY SMILE",short_name:"smirk_cat",short_names:["smirk_cat"],sort_order:83},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"KISSING CAT FACE WITH CLOSED EYES",short_name:"kissing_cat",short_names:["kissing_cat"],sort_order:84},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"POUTING CAT FACE",short_name:"pouting_cat",short_names:["pouting_cat"],sort_order:87},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CRYING CAT FACE",short_name:"crying_cat_face",short_names:["crying_cat_face"],sort_order:86},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WEARY CAT FACE",short_name:"scream_cat",short_names:["scream_cat"],sort_order:85},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SLIGHTLY FROWNING FACE",short_name:"slightly_frowning_face",short_names:["slightly_frowning_face"],sort_order:43},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SLIGHTLY SMILING FACE",short_name:"slightly_smiling_face",short_names:["slightly_smiling_face"],sort_order:12},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"UPSIDE-DOWN FACE",short_name:"upside_down_face",short_names:["upside_down_face"],sort_order:13},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"FACE WITH ROLLING EYES",short_name:"face_with_rolling_eyes",short_names:["face_with_rolling_eyes"],sort_order:34},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE WITH NO GOOD GESTURE",short_name:"no_good",short_names:["no_good"],sort_order:148},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACE WITH OK GESTURE",short_name:"ok_woman",short_names:["ok_woman"],sort_order:149},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PERSON BOWING DEEPLY",short_name:"bow",short_names:["bow"],sort_order:146},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HAPPY PERSON RAISING ONE HAND",short_name:"raising_hand",short_names:["raising_hand"],sort_order:150},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PERSON RAISING BOTH HANDS IN CELEBRATION",short_name:"raised_hands",short_names:["raised_hands"],sort_order:88},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PERSON FROWNING",short_name:"person_frowning",short_names:["person_frowning"],sort_order:152},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PERSON WITH POUTING FACE",short_name:"person_with_pouting_face",short_names:["person_with_pouting_face"],sort_order:151},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PERSON WITH FOLDED HANDS",short_name:"pray",short_names:["pray"],sort_order:100},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PEDESTRIAN",short_name:"walking",short_names:["walking"],sort_order:139},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"ZIPPER-MOUTH FACE",short_name:"zipper_mouth_face",short_names:["zipper_mouth_face"],sort_order:64},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"MONEY-MOUTH FACE",short_name:"money_mouth_face",short_names:["money_mouth_face"],sort_order:25},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"FACE WITH THERMOMETER",short_name:"face_with_thermometer",short_names:["face_with_thermometer"],sort_order:66},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"NERD FACE",short_name:"nerd_face",short_names:["nerd_face"],sort_order:26},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"THINKING FACE",short_name:"thinking_face",short_names:["thinking_face"],sort_order:35},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"FACE WITH HEAD-BANDAGE",short_name:"face_with_head_bandage",short_names:["face_with_head_bandage"],sort_order:67},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"ROBOT FACE",short_name:"robot_face",short_names:["robot_face"],sort_order:78},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"HUGGING FACE",short_name:"hugging_face",short_names:["hugging_face"],sort_order:28},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"SIGN OF THE HORNS",short_name:"the_horns",short_names:["the_horns","sign_of_the_horns"],sort_order:108},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"man-man-boy",short_names:["man-man-boy"],sort_order:171},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"man-man-boy-boy",short_names:["man-man-boy-boy"],sort_order:174},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"man-man-girl",short_names:["man-man-girl"],sort_order:172},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"man-man-girl-boy",short_names:["man-man-girl-boy"],sort_order:173},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"man-man-girl-girl",short_names:["man-man-girl-girl"],sort_order:175},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"man-woman-boy-boy",short_names:["man-woman-boy-boy"],sort_order:164},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"man-woman-girl",short_names:["man-woman-girl"],sort_order:162},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"man-woman-girl-boy",short_names:["man-woman-girl-boy"],sort_order:163},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"man-woman-girl-girl",short_names:["man-woman-girl-girl"],sort_order:165},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:null,short_name:"man-heart-man",short_names:["man-heart-man"],sort_order:157},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:null,short_name:"man-kiss-man",short_names:["man-kiss-man"],sort_order:160},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"woman-woman-boy",short_names:["woman-woman-boy"],sort_order:166},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"woman-woman-boy-boy",short_names:["woman-woman-boy-boy"],sort_order:169},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"woman-woman-girl",short_names:["woman-woman-girl"],sort_order:167},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"woman-woman-girl-boy",short_names:["woman-woman-girl-boy"],sort_order:168},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:null,short_name:"woman-woman-girl-girl",short_names:["woman-woman-girl-girl"],sort_order:170},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:null,short_name:"woman-heart-woman",short_names:["woman-heart-woman"],sort_order:156},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:null,short_name:"woman-kiss-woman",short_names:["woman-kiss-woman"],sort_order:159}],Places:[{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ANCHOR",short_name:"anchor",short_names:["anchor"],sort_order:49},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"SHINTO SHRINE",short_name:"shinto_shrine",short_names:["shinto_shrine"],sort_order:115},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHURCH",short_name:"church",short_names:["church"],sort_order:111},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"MOUNTAIN",short_name:"mountain",short_names:["mountain"],sort_order:66},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FOUNTAIN",short_name:"fountain",short_names:["fountain"],sort_order:64},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"FERRY",short_name:"ferry",short_names:["ferry"],sort_order:44},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SAILBOAT",short_name:"boat",short_names:["boat","sailboat"],sort_order:41},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TENT",short_name:"tent",short_names:["tent"],sort_order:72},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FUEL PUMP",short_name:"fuelpump",short_names:["fuelpump"],sort_order:51},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"AIRPLANE",short_name:"airplane",short_names:["airplane"],sort_order:38},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FOGGY",short_name:"foggy",short_names:["foggy"],sort_order:61},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NIGHT WITH STARS",short_name:"night_with_stars",short_names:["night_with_stars"],sort_order:84},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SUNRISE OVER MOUNTAINS",short_name:"sunrise_over_mountains",short_names:["sunrise_over_mountains"],sort_order:77},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SUNRISE",short_name:"sunrise",short_names:["sunrise"],sort_order:76},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CITYSCAPE AT DUSK",short_name:"city_sunset",short_names:["city_sunset"],sort_order:82},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SUNSET OVER BUILDINGS",short_name:"city_sunrise",short_names:["city_sunrise"],sort_order:81},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RAINBOW",short_name:"rainbow",short_names:["rainbow"],sort_order:90},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BRIDGE AT NIGHT",short_name:"bridge_at_night",short_names:["bridge_at_night"],sort_order:85},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"VOLCANO",short_name:"volcano",short_names:["volcano"],sort_order:69},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MILKY WAY",short_name:"milky_way",short_names:["milky_way"],sort_order:86},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SHOOTING STAR",short_name:"stars",short_names:["stars"],sort_order:87},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FIREWORKS",short_name:"fireworks",short_names:["fireworks"],sort_order:89},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FIREWORK SPARKLER",short_name:"sparkler",short_names:["sparkler"],sort_order:88},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOON VIEWING CEREMONY",short_name:"rice_scene",short_names:["rice_scene"],sort_order:65},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CAROUSEL HORSE",short_name:"carousel_horse",short_names:["carousel_horse"],sort_order:59},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FERRIS WHEEL",short_name:"ferris_wheel",short_names:["ferris_wheel"],sort_order:57},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ROLLER COASTER",short_name:"roller_coaster",short_names:["roller_coaster"],sort_order:58},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CHEQUERED FLAG",short_name:"checkered_flag",short_names:["checkered_flag"],sort_order:55},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RACING MOTORCYCLE",short_name:"racing_motorcycle",short_names:["racing_motorcycle"],sort_order:14},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RACING CAR",short_name:"racing_car",short_names:["racing_car"],sort_order:6},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SNOW CAPPED MOUNTAIN",short_name:"snow_capped_mountain",short_names:["snow_capped_mountain"],sort_order:67},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CAMPING",short_name:"camping",short_names:["camping"],sort_order:71},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BEACH WITH UMBRELLA",short_name:"beach_with_umbrella",short_names:["beach_with_umbrella"],sort_order:79},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BUILDING CONSTRUCTION",short_name:"building_construction",short_names:["building_construction"],sort_order:60},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HOUSE BUILDINGS",short_name:"house_buildings",short_names:["house_buildings"],sort_order:91},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CITYSCAPE",short_name:"cityscape",short_names:["cityscape"],sort_order:83},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DERELICT HOUSE BUILDING",short_name:"derelict_house_building",short_names:["derelict_house_building"],sort_order:98},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLASSICAL BUILDING",short_name:"classical_building",short_names:["classical_building"],sort_order:110},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DESERT",short_name:"desert",short_names:["desert"],sort_order:78},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DESERT ISLAND",short_name:"desert_island",short_names:["desert_island"],sort_order:80},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"NATIONAL PARK",short_name:"national_park",short_names:["national_park"],sort_order:73},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"STADIUM",short_name:"stadium",short_names:["stadium"],sort_order:94},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HOUSE BUILDING",short_name:"house",short_names:["house"],sort_order:96},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HOUSE WITH GARDEN",short_name:"house_with_garden",short_names:["house_with_garden"],sort_order:97},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"OFFICE BUILDING",short_name:"office",short_names:["office"],sort_order:99},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"JAPANESE POST OFFICE",short_name:"post_office",short_names:["post_office"],sort_order:101},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EUROPEAN POST OFFICE",short_name:"european_post_office",short_names:["european_post_office"],sort_order:102},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HOSPITAL",short_name:"hospital",short_names:["hospital"],sort_order:103},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BANK",short_name:"bank",short_names:["bank"],sort_order:104},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HOTEL",short_name:"hotel",short_names:["hotel"],sort_order:105},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LOVE HOTEL",short_name:"love_hotel",short_names:["love_hotel"],sort_order:108},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CONVENIENCE STORE",short_name:"convenience_store",short_names:["convenience_store"],sort_order:106},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SCHOOL",short_name:"school",short_names:["school"],sort_order:107},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DEPARTMENT STORE",short_name:"department_store",short_names:["department_store"],sort_order:100},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FACTORY",short_name:"factory",short_names:["factory"],sort_order:63},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"JAPANESE CASTLE",short_name:"japanese_castle",short_names:["japanese_castle"],sort_order:93},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"EUROPEAN CASTLE",short_name:"european_castle",short_names:["european_castle"],sort_order:92},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WEDDING",short_name:"wedding",short_names:["wedding"],sort_order:109},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SEAT",short_name:"seat",short_names:["seat"],sort_order:48},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"KAABA",short_name:"kaaba",short_names:["kaaba"],sort_order:114},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"MOSQUE",short_name:"mosque",short_names:["mosque"],sort_order:112},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"SYNAGOGUE",short_name:"synagogue",short_names:["synagogue"],sort_order:113},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOUNT FUJI",short_name:"mount_fuji",short_names:["mount_fuji"],sort_order:68},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TOKYO TOWER",short_name:"tokyo_tower",short_names:["tokyo_tower"],sort_order:62},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"STATUE OF LIBERTY",short_name:"statue_of_liberty",short_names:["statue_of_liberty"],sort_order:95},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SILHOUETTE OF JAPAN",short_name:"japan",short_names:["japan"],sort_order:70},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ROCKET",short_name:"rocket",short_names:["rocket"],sort_order:46},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HELICOPTER",short_name:"helicopter",short_names:["helicopter"],sort_order:36},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"STEAM LOCOMOTIVE",short_name:"steam_locomotive",short_names:["steam_locomotive"],sort_order:31},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RAILWAY CAR",short_name:"railway_car",short_names:["railway_car"],sort_order:24},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HIGH-SPEED TRAIN",short_name:"bullettrain_side",short_names:["bullettrain_side"],sort_order:27},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HIGH-SPEED TRAIN WITH BULLET NOSE",short_name:"bullettrain_front",short_names:["bullettrain_front"],sort_order:28},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TRAIN",short_name:"train2",short_names:["train2"],sort_order:32},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"METRO",short_name:"metro",short_names:["metro"],sort_order:33},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"LIGHT RAIL",short_name:"light_rail",short_names:["light_rail"],sort_order:29},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"STATION",short_name:"station",short_names:["station"],sort_order:35},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TRAM",short_name:"tram",short_names:["tram"],sort_order:34},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TRAM CAR",short_name:"train",short_names:["train"],sort_order:25},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BUS",short_name:"bus",short_names:["bus"],sort_order:4},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ONCOMING BUS",short_name:"oncoming_bus",short_names:["oncoming_bus"],sort_order:18},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TROLLEYBUS",short_name:"trolleybus",short_names:["trolleybus"],sort_order:5},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BUS STOP",short_name:"busstop",short_names:["busstop"],sort_order:52},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MINIBUS",short_name:"minibus",short_names:["minibus"],sort_order:10},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"AMBULANCE",short_name:"ambulance",short_names:["ambulance"],sort_order:8},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FIRE ENGINE",short_name:"fire_engine",short_names:["fire_engine"],sort_order:9},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"POLICE CAR",short_name:"police_car",short_names:["police_car"],sort_order:7},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ONCOMING POLICE CAR",short_name:"oncoming_police_car",short_names:["oncoming_police_car"],sort_order:17},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TAXI",short_name:"taxi",short_names:["taxi"],sort_order:2},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ONCOMING TAXI",short_name:"oncoming_taxi",short_names:["oncoming_taxi"],sort_order:20},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"AUTOMOBILE",short_name:"car",short_names:["car","red_car"],sort_order:1},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ONCOMING AUTOMOBILE",short_name:"oncoming_automobile",short_names:["oncoming_automobile"],sort_order:19},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RECREATIONAL VEHICLE",short_name:"blue_car",short_names:["blue_car"],sort_order:3},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DELIVERY TRUCK",short_name:"truck",short_names:["truck"],sort_order:11},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ARTICULATED LORRY",short_name:"articulated_lorry",short_names:["articulated_lorry"],sort_order:12},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TRACTOR",short_name:"tractor",short_names:["tractor"],sort_order:13},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MONORAIL",short_name:"monorail",short_names:["monorail"],sort_order:26},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOUNTAIN RAILWAY",short_name:"mountain_railway",short_names:["mountain_railway"],sort_order:30},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SUSPENSION RAILWAY",short_name:"suspension_railway",short_names:["suspension_railway"],sort_order:23},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOUNTAIN CABLEWAY",short_name:"mountain_cableway",short_names:["mountain_cableway"],sort_order:22},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"AERIAL TRAMWAY",short_name:"aerial_tramway",short_names:["aerial_tramway"],sort_order:21},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SHIP",short_name:"ship",short_names:["ship"],sort_order:56},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPEEDBOAT",short_name:"speedboat",short_names:["speedboat"],sort_order:43},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HORIZONTAL TRAFFIC LIGHT",short_name:"traffic_light",short_names:["traffic_light"],sort_order:54},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"VERTICAL TRAFFIC LIGHT",short_name:"vertical_traffic_light",short_names:["vertical_traffic_light"],sort_order:53},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CONSTRUCTION SIGN",short_name:"construction",short_names:["construction"],sort_order:50},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"POLICE CARS REVOLVING LIGHT",short_name:"rotating_light",short_names:["rotating_light"],sort_order:16},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BICYCLE",short_name:"bike",short_names:["bike"],sort_order:15},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOTORWAY",short_name:"motorway",short_names:["motorway"],sort_order:74},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RAILWAY TRACK",short_name:"railway_track",short_names:["railway_track"],sort_order:75},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOTOR BOAT",short_name:"motor_boat",short_names:["motor_boat"],sort_order:42},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SMALL AIRPLANE",short_name:"small_airplane",short_names:["small_airplane"],sort_order:37},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"AIRPLANE DEPARTURE",short_name:"airplane_departure",short_names:["airplane_departure"],sort_order:39},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"AIRPLANE ARRIVING",short_name:"airplane_arriving",short_names:["airplane_arriving"],sort_order:40},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SATELLITE",short_name:"satellite",short_names:["satellite"],sort_order:47},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PASSENGER SHIP",short_name:"passenger_ship",short_names:["passenger_ship"],sort_order:45}],Activity:[{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SOCCER BALL",short_name:"soccer",short_names:["soccer"],sort_order:1},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BASEBALL",short_name:"baseball",short_names:["baseball"],sort_order:4},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FLAG IN HOLE",short_name:"golf",short_names:["golf"],sort_order:9},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"SKIER",short_name:"skier",short_names:["skier"],sort_order:17},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"ICE SKATE",short_name:"ice_skate",short_names:["ice_skate"],sort_order:19},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"PERSON WITH BALL",short_name:"person_with_ball",short_names:["person_with_ball"],sort_order:26},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MILITARY MEDAL",short_name:"medal",short_names:["medal"],sort_order:35},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REMINDER RIBBON",short_name:"reminder_ribbon",short_names:["reminder_ribbon"],sort_order:36},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ADMISSION TICKETS",short_name:"admission_tickets",short_names:["admission_tickets"],sort_order:39},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"FISHING POLE AND FISH",short_name:"fishing_pole_and_fish",short_names:["fishing_pole_and_fish"],sort_order:21},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MICROPHONE",short_name:"microphone",short_names:["microphone"],sort_order:43},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HEADPHONE",short_name:"headphones",short_names:["headphones"],sort_order:44},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ARTIST PALETTE",short_name:"art",short_names:["art"],sort_order:41},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CIRCUS TENT",short_name:"circus_tent",short_names:["circus_tent"],sort_order:42},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TICKET",short_name:"ticket",short_names:["ticket"],sort_order:38},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"CLAPPER BOARD",short_name:"clapper",short_names:["clapper"],sort_order:51},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"PERFORMING ARTS",short_name:"performing_arts",short_names:["performing_arts"],sort_order:40},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"VIDEO GAME",short_name:"video_game",short_names:["video_game"],sort_order:52},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"DIRECT HIT",short_name:"dart",short_names:["dart"],sort_order:54},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SLOT MACHINE",short_name:"slot_machine",short_names:["slot_machine"],sort_order:56},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BILLIARDS",short_name:"8ball",short_names:["8ball"],sort_order:8},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GAME DIE",short_name:"game_die",short_names:["game_die"],sort_order:55},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BOWLING",short_name:"bowling",short_names:["bowling"],sort_order:57},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SAXOPHONE",short_name:"saxophone",short_names:["saxophone"],sort_order:47},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GUITAR",short_name:"guitar",short_names:["guitar"],sort_order:49},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MUSICAL KEYBOARD",short_name:"musical_keyboard",short_names:["musical_keyboard"],sort_order:46},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TRUMPET",short_name:"trumpet",short_names:["trumpet"],sort_order:48},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"VIOLIN",short_name:"violin",short_names:["violin"],sort_order:50},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MUSICAL SCORE",short_name:"musical_score",short_names:["musical_score"],sort_order:45},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RUNNING SHIRT WITH SASH",short_name:"running_shirt_with_sash",short_names:["running_shirt_with_sash"],sort_order:33},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TENNIS RACQUET AND BALL",short_name:"tennis",short_names:["tennis"],sort_order:5},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SKI AND SKI BOOT",short_name:"ski",short_names:["ski"],sort_order:16},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BASKETBALL AND HOOP",short_name:"basketball",short_names:["basketball"],sort_order:2},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SNOWBOARDER",short_name:"snowboarder",short_names:["snowboarder"],sort_order:18},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SURFER",short_name:"surfer",short_names:["surfer"],sort_order:24},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SPORTS MEDAL",short_name:"sports_medal",short_names:["sports_medal"],sort_order:34},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"TROPHY",short_name:"trophy",short_names:["trophy"],sort_order:32},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"HORSE RACING",short_name:"horse_racing",short_names:["horse_racing"],sort_order:30},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"AMERICAN FOOTBALL",short_name:"football",short_names:["football"],sort_order:3},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"RUGBY FOOTBALL",short_name:"rugby_football",short_names:["rugby_football"],sort_order:7},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"SWIMMER",short_name:"swimmer",short_names:["swimmer"],sort_order:23},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"WEIGHT LIFTER",short_name:"weight_lifter",short_names:["weight_lifter"],sort_order:27},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"GOLFER",short_name:"golfer",short_names:["golfer"],sort_order:10},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"CRICKET BAT AND BALL",short_name:"cricket_bat_and_ball",short_names:["cricket_bat_and_ball"],sort_order:15},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"VOLLEYBALL",short_name:"volleyball",short_names:["volleyball"],sort_order:6},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"FIELD HOCKEY STICK AND BALL",short_name:"field_hockey_stick_and_ball",short_names:["field_hockey_stick_and_ball"],sort_order:14},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"ICE HOCKEY STICK AND PUCK",short_name:"ice_hockey_stick_and_puck",short_names:["ice_hockey_stick_and_puck"],sort_order:13},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"TABLE TENNIS PADDLE AND BALL",short_name:"table_tennis_paddle_and_ball",short_names:["table_tennis_paddle_and_ball"],sort_order:11},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ROSETTE",short_name:"rosette",short_names:["rosette"],sort_order:37},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"BADMINTON RACQUET AND SHUTTLECOCK",short_name:"badminton_racquet_and_shuttlecock",short_names:["badminton_racquet_and_shuttlecock"],sort_order:12},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"BOW AND ARROW",short_name:"bow_and_arrow",short_names:["bow_and_arrow"],sort_order:20},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ALIEN MONSTER",short_name:"space_invader",short_names:["space_invader"],sort_order:53},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MAN IN BUSINESS SUIT LEVITATING",short_name:"man_in_business_suit_levitating",short_names:["man_in_business_suit_levitating"],sort_order:31},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"ROWBOAT",short_name:"rowboat",short_names:["rowboat"],sort_order:22},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BICYCLIST",short_name:"bicyclist",short_names:["bicyclist"],sort_order:28},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"MOUNTAIN BICYCLIST",short_name:"mountain_bicyclist",short_names:["mountain_bicyclist"],sort_order:29},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"BATH",short_name:"bath",short_names:["bath"],sort_order:25}],Flags:[{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS AD",short_name:"flag-ad",short_names:["flag-ad"],sort_order:6},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS AE",short_name:"flag-ae",short_names:["flag-ae"],sort_order:233},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS AF",short_name:"flag-af",short_names:["flag-af"],sort_order:1},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS AG",short_name:"flag-ag",short_names:["flag-ag"],sort_order:10},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS AI",short_name:"flag-ai",short_names:["flag-ai"],sort_order:8},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS AL",short_name:"flag-al",short_names:["flag-al"],sort_order:3},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS AM",short_name:"flag-am",short_names:["flag-am"],sort_order:12},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS AO",short_name:"flag-ao",short_names:["flag-ao"],sort_order:7},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS AQ",short_name:"flag-aq",short_names:["flag-aq"],sort_order:9},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS AR",short_name:"flag-ar",short_names:["flag-ar"],sort_order:11},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS AS",short_name:"flag-as",short_names:["flag-as"],sort_order:5},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS AT",short_name:"flag-at",short_names:["flag-at"],sort_order:15},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS AU",short_name:"flag-au",short_names:["flag-au"],sort_order:14},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS AW",short_name:"flag-aw",short_names:["flag-aw"],sort_order:13},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS AX",short_name:"flag-ax",short_names:["flag-ax"],sort_order:2},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS AZ",short_name:"flag-az",short_names:["flag-az"],sort_order:16},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BA",short_name:"flag-ba",short_names:["flag-ba"],sort_order:29},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BB",short_name:"flag-bb",short_names:["flag-bb"],sort_order:20},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BD",short_name:"flag-bd",short_names:["flag-bd"],sort_order:19},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BE",short_name:"flag-be",short_names:["flag-be"],sort_order:22},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BF",short_name:"flag-bf",short_names:["flag-bf"],sort_order:36},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BG",short_name:"flag-bg",short_names:["flag-bg"],sort_order:35},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BH",short_name:"flag-bh",short_names:["flag-bh"],sort_order:18},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BI",short_name:"flag-bi",short_names:["flag-bi"],sort_order:37},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BJ",short_name:"flag-bj",short_names:["flag-bj"],sort_order:24},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS BL",short_name:"flag-bl",short_names:["flag-bl"],sort_order:185},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BM",short_name:"flag-bm",short_names:["flag-bm"],sort_order:25},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BN",short_name:"flag-bn",short_names:["flag-bn"],sort_order:34},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BO",short_name:"flag-bo",short_names:["flag-bo"],sort_order:27},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS BQ",short_name:"flag-bq",short_names:["flag-bq"],sort_order:28},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BR",short_name:"flag-br",short_names:["flag-br"],sort_order:31},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BS",short_name:"flag-bs",short_names:["flag-bs"],sort_order:17},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BT",short_name:"flag-bt",short_names:["flag-bt"],sort_order:26},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BW",short_name:"flag-bw",short_names:["flag-bw"],sort_order:30},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BY",short_name:"flag-by",short_names:["flag-by"],sort_order:21},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS BZ",short_name:"flag-bz",short_names:["flag-bz"],sort_order:23},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CA",short_name:"flag-ca",short_names:["flag-ca"],sort_order:41},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS CC",short_name:"flag-cc",short_names:["flag-cc"],sort_order:49},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CD",short_name:"flag-cd",short_names:["flag-cd"],sort_order:53},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CF",short_name:"flag-cf",short_names:["flag-cf"],sort_order:44},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CG",short_name:"flag-cg",short_names:["flag-cg"],sort_order:52},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CH",short_name:"flag-ch",short_names:["flag-ch"],sort_order:215},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CI",short_name:"flag-ci",short_names:["flag-ci"],sort_order:110},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS CK",short_name:"flag-ck",short_names:["flag-ck"],sort_order:54},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CL",short_name:"flag-cl",short_names:["flag-cl"],sort_order:46},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CM",short_name:"flag-cm",short_names:["flag-cm"],sort_order:40},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CN",short_name:"flag-cn",short_names:["flag-cn","cn"],sort_order:47},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CO",short_name:"flag-co",short_names:["flag-co"],sort_order:50},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CR",short_name:"flag-cr",short_names:["flag-cr"],sort_order:55},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CU",short_name:"flag-cu",short_names:["flag-cu"],sort_order:57},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CV",short_name:"flag-cv",short_names:["flag-cv"],sort_order:38},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS CW",short_name:"flag-cw",short_names:["flag-cw"],sort_order:58},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS CX",short_name:"flag-cx",short_names:["flag-cx"],sort_order:48},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CY",short_name:"flag-cy",short_names:["flag-cy"],sort_order:59},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS CZ",short_name:"flag-cz",short_names:["flag-cz"],sort_order:60},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS DE",short_name:"flag-de",short_names:["flag-de","de"],sort_order:84},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS DJ",short_name:"flag-dj",short_names:["flag-dj"],sort_order:62},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS DK",short_name:"flag-dk",short_names:["flag-dk"],sort_order:61},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS DM",short_name:"flag-dm",short_names:["flag-dm"],sort_order:63},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS DO",short_name:"flag-do",short_names:["flag-do"],sort_order:64},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS DZ",short_name:"flag-dz",short_names:["flag-dz"],sort_order:4},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS EC",short_name:"flag-ec",short_names:["flag-ec"],sort_order:65},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS EE",short_name:"flag-ee",short_names:["flag-ee"],sort_order:70},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS EG",short_name:"flag-eg",short_names:["flag-eg"],sort_order:66},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS EH",short_name:"flag-eh",short_names:["flag-eh"],sort_order:244},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS ER",short_name:"flag-er",short_names:["flag-er"],sort_order:69},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS ES",short_name:"flag-es",short_names:["flag-es","es"],sort_order:209},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS ET",short_name:"flag-et",short_names:["flag-et"],sort_order:71},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS EU",short_name:"flag-eu",short_names:["flag-eu"],sort_order:72},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS FI",short_name:"flag-fi",short_names:["flag-fi"],sort_order:76},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS FJ",short_name:"flag-fj",short_names:["flag-fj"],sort_order:75},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS FK",short_name:"flag-fk",short_names:["flag-fk"],sort_order:73},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS FM",short_name:"flag-fm",short_names:["flag-fm"],sort_order:144},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS FO",short_name:"flag-fo",short_names:["flag-fo"],sort_order:74},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS FR",short_name:"flag-fr",short_names:["flag-fr","fr"],sort_order:77},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GA",short_name:"flag-ga",short_names:["flag-ga"],sort_order:81},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GB",short_name:"flag-gb",short_names:["flag-gb","gb","uk"],sort_order:234},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GD",short_name:"flag-gd",short_names:["flag-gd"],sort_order:89},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GE",short_name:"flag-ge",short_names:["flag-ge"],sort_order:83},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS GF",short_name:"flag-gf",short_names:["flag-gf"],sort_order:78},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS GG",short_name:"flag-gg",short_names:["flag-gg"],sort_order:93},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GH",short_name:"flag-gh",short_names:["flag-gh"],sort_order:85},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GI",short_name:"flag-gi",short_names:["flag-gi"],sort_order:86},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GL",short_name:"flag-gl",short_names:["flag-gl"],sort_order:88},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GM",short_name:"flag-gm",short_names:["flag-gm"],sort_order:82},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GN",short_name:"flag-gn",short_names:["flag-gn"],sort_order:94},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS GP",short_name:"flag-gp",short_names:["flag-gp"],sort_order:90},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GQ",short_name:"flag-gq",short_names:["flag-gq"],sort_order:68},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GR",short_name:"flag-gr",short_names:["flag-gr"],sort_order:87},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS GS",short_name:"flag-gs",short_names:["flag-gs"],sort_order:206},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GT",short_name:"flag-gt",short_names:["flag-gt"],sort_order:92},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GU",short_name:"flag-gu",short_names:["flag-gu"],sort_order:91},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GW",short_name:"flag-gw",short_names:["flag-gw"],sort_order:95},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS GY",short_name:"flag-gy",short_names:["flag-gy"],sort_order:96},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS HK",short_name:"flag-hk",short_names:["flag-hk"],sort_order:99},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS HN",short_name:"flag-hn",short_names:["flag-hn"],sort_order:98},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS HR",short_name:"flag-hr",short_names:["flag-hr"],sort_order:56},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS HT",short_name:"flag-ht",short_names:["flag-ht"],sort_order:97},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS HU",short_name:"flag-hu",short_names:["flag-hu"],sort_order:100},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS IC",short_name:"flag-ic",short_names:["flag-ic"],sort_order:42},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS ID",short_name:"flag-id",short_names:["flag-id"],sort_order:103},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS IE",short_name:"flag-ie",short_names:["flag-ie"],sort_order:106},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS IL",short_name:"flag-il",short_names:["flag-il"],sort_order:108},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS IM",short_name:"flag-im",short_names:["flag-im"],sort_order:107},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS IN",short_name:"flag-in",short_names:["flag-in"],sort_order:102},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS IO",short_name:"flag-io",short_names:["flag-io"],sort_order:32},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS IQ",short_name:"flag-iq",short_names:["flag-iq"],sort_order:105},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS IR",short_name:"flag-ir",short_names:["flag-ir"],sort_order:104},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS IS",short_name:"flag-is",short_names:["flag-is"],sort_order:101},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS IT",short_name:"flag-it",short_names:["flag-it","it"],sort_order:109},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS JE",short_name:"flag-je",short_names:["flag-je"],sort_order:113},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS JM",short_name:"flag-jm",short_names:["flag-jm"],sort_order:111},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS JO",short_name:"flag-jo",short_names:["flag-jo"],sort_order:114},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS JP",short_name:"flag-jp",short_names:["flag-jp","jp"],sort_order:112},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS KE",short_name:"flag-ke",short_names:["flag-ke"],sort_order:116},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS KG",short_name:"flag-kg",short_names:["flag-kg"],sort_order:120},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS KH",short_name:"flag-kh",short_names:["flag-kh"],sort_order:39},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS KI",short_name:"flag-ki",short_names:["flag-ki"],sort_order:117},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS KM",short_name:"flag-km",short_names:["flag-km"],sort_order:51},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS KN",short_name:"flag-kn",short_names:["flag-kn"],sort_order:187},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS KP",short_name:"flag-kp",short_names:["flag-kp"],sort_order:165},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS KR",short_name:"flag-kr",short_names:["flag-kr","kr"],sort_order:207},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS KW",short_name:"flag-kw",short_names:["flag-kw"],sort_order:119},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS KY",short_name:"flag-ky",short_names:["flag-ky"],sort_order:43},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS KZ",short_name:"flag-kz",short_names:["flag-kz"],sort_order:115},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS LA",short_name:"flag-la",short_names:["flag-la"],sort_order:121},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS LB",short_name:"flag-lb",short_names:["flag-lb"],sort_order:123},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS LC",short_name:"flag-lc",short_names:["flag-lc"],sort_order:188},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS LI",short_name:"flag-li",short_names:["flag-li"],sort_order:127},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS LK",short_name:"flag-lk",short_names:["flag-lk"],sort_order:210},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS LR",short_name:"flag-lr",short_names:["flag-lr"],sort_order:125},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS LS",short_name:"flag-ls",short_names:["flag-ls"],sort_order:124},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS LT",short_name:"flag-lt",short_names:["flag-lt"],sort_order:128},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS LU",short_name:"flag-lu",short_names:["flag-lu"],sort_order:129},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS LV",short_name:"flag-lv",short_names:["flag-lv"],sort_order:122},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS LY",short_name:"flag-ly",short_names:["flag-ly"],sort_order:126},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MA",short_name:"flag-ma",short_names:["flag-ma"],sort_order:150},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MC",short_name:"flag-mc",short_names:["flag-mc"],sort_order:146},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MD",short_name:"flag-md",short_names:["flag-md"],sort_order:145},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS ME",short_name:"flag-me",short_names:["flag-me"],sort_order:148},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MG",short_name:"flag-mg",short_names:["flag-mg"],sort_order:132},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MH",short_name:"flag-mh",short_names:["flag-mh"],sort_order:138},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MK",short_name:"flag-mk",short_names:["flag-mk"],sort_order:131},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS ML",short_name:"flag-ml",short_names:["flag-ml"],sort_order:136},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MM",short_name:"flag-mm",short_names:["flag-mm"],sort_order:152},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MN",short_name:"flag-mn",short_names:["flag-mn"],sort_order:147},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MO",short_name:"flag-mo",short_names:["flag-mo"],sort_order:130},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS MP",short_name:"flag-mp",short_names:["flag-mp"],sort_order:164},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS MQ",short_name:"flag-mq",short_names:["flag-mq"],sort_order:139},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MR",short_name:"flag-mr",short_names:["flag-mr"],sort_order:140},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MS",short_name:"flag-ms",short_names:["flag-ms"],sort_order:149},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MT",short_name:"flag-mt",short_names:["flag-mt"],sort_order:137},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MU",short_name:"flag-mu",short_names:["flag-mu"],sort_order:141},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MV",short_name:"flag-mv",short_names:["flag-mv"],sort_order:135},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MW",short_name:"flag-mw",short_names:["flag-mw"],sort_order:133},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MX",short_name:"flag-mx",short_names:["flag-mx"],sort_order:143},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MY",short_name:"flag-my",short_names:["flag-my"],sort_order:134},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS MZ",short_name:"flag-mz",short_names:["flag-mz"],sort_order:151},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS NA",short_name:"flag-na",short_names:["flag-na"],sort_order:153},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS NC",short_name:"flag-nc",short_names:["flag-nc"],sort_order:157},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS NE",short_name:"flag-ne",short_names:["flag-ne"],sort_order:160},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS NF",short_name:"flag-nf",short_names:["flag-nf"],sort_order:163},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS NG",short_name:"flag-ng",short_names:["flag-ng"],sort_order:161},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS NI",short_name:"flag-ni",short_names:["flag-ni"],sort_order:159},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS NL",short_name:"flag-nl",short_names:["flag-nl"],sort_order:156},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS NO",short_name:"flag-no",short_names:["flag-no"],sort_order:166},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS NP",short_name:"flag-np",short_names:["flag-np"],sort_order:155},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS NR",short_name:"flag-nr",short_names:["flag-nr"],sort_order:154},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS NU",short_name:"flag-nu",short_names:["flag-nu"],sort_order:162},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS NZ",short_name:"flag-nz",short_names:["flag-nz"],sort_order:158},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS OM",short_name:"flag-om",short_names:["flag-om"],sort_order:167},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS PA",short_name:"flag-pa",short_names:["flag-pa"],sort_order:171},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS PE",short_name:"flag-pe",short_names:["flag-pe"],sort_order:174},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS PF",short_name:"flag-pf",short_names:["flag-pf"],sort_order:79},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS PG",short_name:"flag-pg",short_names:["flag-pg"],sort_order:172},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS PH",short_name:"flag-ph",short_names:["flag-ph"],sort_order:175},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS PK",short_name:"flag-pk",short_names:["flag-pk"],sort_order:168},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS PL",short_name:"flag-pl",short_names:["flag-pl"],sort_order:177},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS PM",short_name:"flag-pm",short_names:["flag-pm"],sort_order:189},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS PN",short_name:"flag-pn",short_names:["flag-pn"],sort_order:176},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS PR",short_name:"flag-pr",short_names:["flag-pr"],sort_order:179},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS PS",short_name:"flag-ps",short_names:["flag-ps"],sort_order:170},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS PT",short_name:"flag-pt",short_names:["flag-pt"],sort_order:178},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS PW",short_name:"flag-pw",short_names:["flag-pw"],sort_order:169},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS PY",short_name:"flag-py",short_names:["flag-py"],sort_order:173},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS QA",short_name:"flag-qa",short_names:["flag-qa"],sort_order:180},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS RE",short_name:"flag-re",short_names:["flag-re"],sort_order:181},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS RO",short_name:"flag-ro",short_names:["flag-ro"],sort_order:182},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS RS",short_name:"flag-rs",short_names:["flag-rs"],sort_order:196},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS RU",short_name:"flag-ru",short_names:["flag-ru","ru"],sort_order:183},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS RW",short_name:"flag-rw",short_names:["flag-rw"],sort_order:184},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SA",short_name:"flag-sa",short_names:["flag-sa"],sort_order:194},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SB",short_name:"flag-sb",short_names:["flag-sb"],sort_order:203},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SC",short_name:"flag-sc",short_names:["flag-sc"],sort_order:197},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SD",short_name:"flag-sd",short_names:["flag-sd"],sort_order:211},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SE",short_name:"flag-se",short_names:["flag-se"],sort_order:214},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SG",short_name:"flag-sg",short_names:["flag-sg"],sort_order:199},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SH",short_name:"flag-sh",short_names:["flag-sh"],sort_order:186},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SI",short_name:"flag-si",short_names:["flag-si"],sort_order:202},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SK",short_name:"flag-sk",short_names:["flag-sk"],sort_order:201},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SL",short_name:"flag-sl",short_names:["flag-sl"],sort_order:198},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SM",short_name:"flag-sm",short_names:["flag-sm"],sort_order:192},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SN",short_name:"flag-sn",short_names:["flag-sn"],sort_order:195},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SO",short_name:"flag-so",short_names:["flag-so"],sort_order:204},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SR",short_name:"flag-sr",short_names:["flag-sr"],sort_order:212},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS SS",short_name:"flag-ss",short_names:["flag-ss"],sort_order:208},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS ST",short_name:"flag-st",short_names:["flag-st"],sort_order:193},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SV",short_name:"flag-sv",short_names:["flag-sv"],sort_order:67},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS SX",short_name:"flag-sx",short_names:["flag-sx"],sort_order:200},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SY",short_name:"flag-sy",short_names:["flag-sy"],sort_order:216},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS SZ",short_name:"flag-sz",short_names:["flag-sz"],sort_order:213},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS TC",short_name:"flag-tc",short_names:["flag-tc"],sort_order:229},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS TD",short_name:"flag-td",short_names:["flag-td"],sort_order:45},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS TF",short_name:"flag-tf",short_names:["flag-tf"],sort_order:80},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS TG",short_name:"flag-tg",short_names:["flag-tg"],sort_order:222},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS TH",short_name:"flag-th",short_names:["flag-th"],sort_order:220},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS TJ",short_name:"flag-tj",short_names:["flag-tj"],sort_order:218},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS TK",short_name:"flag-tk",short_names:["flag-tk"],sort_order:223},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS TL",short_name:"flag-tl",short_names:["flag-tl"],sort_order:221},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS TM",short_name:"flag-tm",short_names:["flag-tm"],sort_order:228},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS TN",short_name:"flag-tn",short_names:["flag-tn"],sort_order:226},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS TO",short_name:"flag-to",short_names:["flag-to"],sort_order:224},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS TR",short_name:"flag-tr",short_names:["flag-tr"],sort_order:227},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS TT",short_name:"flag-tt",short_names:["flag-tt"],sort_order:225},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS TV",short_name:"flag-tv",short_names:["flag-tv"],sort_order:230},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS TW",short_name:"flag-tw",short_names:["flag-tw"],sort_order:217},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS TZ",short_name:"flag-tz",short_names:["flag-tz"],sort_order:219},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS UA",short_name:"flag-ua",short_names:["flag-ua"],sort_order:232},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS UG",short_name:"flag-ug",short_names:["flag-ug"],sort_order:231},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS US",short_name:"flag-us",short_names:["flag-us","us"],sort_order:235},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS UY",short_name:"flag-uy",short_names:["flag-uy"],sort_order:237},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS UZ",short_name:"flag-uz",short_names:["flag-uz"],sort_order:238},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS VA",short_name:"flag-va",short_names:["flag-va"],sort_order:240},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS VC",short_name:"flag-vc",short_names:["flag-vc"],sort_order:190},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS VE",short_name:"flag-ve",short_names:["flag-ve"],sort_order:241},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS VG",short_name:"flag-vg",short_names:["flag-vg"],sort_order:33},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS VI",short_name:"flag-vi",short_names:["flag-vi"],sort_order:236},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS VN",short_name:"flag-vn",short_names:["flag-vn"],sort_order:242},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS VU",short_name:"flag-vu",short_names:["flag-vu"],sort_order:239},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS WF",short_name:"flag-wf",short_names:["flag-wf"],sort_order:243},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS WS",short_name:"flag-ws",short_names:["flag-ws"],sort_order:191},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS XK",short_name:"flag-xk",short_names:["flag-xk"],sort_order:118},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS YE",short_name:"flag-ye",short_names:["flag-ye"],sort_order:245},{has_img_apple:!0,has_img_google:!1,has_img_twitter:!0,has_img_emojione:!1,name:"REGIONAL INDICATOR SYMBOL LETTERS YT",short_name:"flag-yt",short_names:["flag-yt"],sort_order:142},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS ZA",short_name:"flag-za",short_names:["flag-za"],sort_order:205},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS ZM",short_name:"flag-zm",short_names:["flag-zm"],sort_order:246},{has_img_apple:!0,has_img_google:!0,has_img_twitter:!0,has_img_emojione:!0,name:"REGIONAL INDICATOR SYMBOL LETTERS ZW",short_name:"flag-zw",short_names:["flag-zw"],sort_order:247}]}},function(e,_,a){e.exports=function(e){function _(o){if(a[o])return a[o].exports;var s=a[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,_),s.l=!0,s.exports}var a={};return _.m=e,_.c=a,_.d=function(e,a,o){_.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:o})},_.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return _.d(a,"a",a),a},_.o=function(e,_){return Object.prototype.hasOwnProperty.call(e,_)},_.p="",_(_.s=0)}([function(e,_,a){"use strict";Object.defineProperty(_,"__esModule",{value:!0});var o=Object.assign||function(e){for(var _=1;_<arguments.length;_++){var a=arguments[_];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e},s=function(){function e(e,_){for(var a=0;a<_.length;a++){var o=_[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(_,a,o){return a&&e(_.prototype,a),o&&e(_,o),_}}(),t=function(){function e(_,a,o){if(function(e,_){if(!(e instanceof _))throw new TypeError("Cannot call a class as a function")}(this,e),!(o instanceof Element)&&"string"!=typeof o)throw new TypeError("The tooltip passed to the constructor must be either an html string or an instance of HTMLElement");this.element=_,this.container=a,this.tooltip=o instanceof Element?o:i(o).firstChild,this.element_rect=this.element.getBoundingClientRect(),this.container_rect=this.container.getBoundingClientRect(),this.container_dimension=this.calculateViewportPosition(),this.tooltip_dimension={},this.element_height=this.element.offsetHeight,this.element_width=this.element.offsetWidth,this.tooltip_height=0,this.tooltip_width=0,this.centered_coordinate=void 0,this.last_coordinate=void 0,this.placeTooltip()}return s(e,[{key:"placeTooltip",value:function(){this.container.appendChild(this.tooltip),this.tooltip_height=this.tooltip.offsetHeight,this.tooltip_width=this.tooltip.offsetWidth,this.centered_coordinate=this.getCenteredStyles(),this._applyPosition(this.centered_coordinate)}},{key:"_applyPosition",value:function(e){var _=this;return e=this._composeCoordinates(e),this.tooltip.style.top=e.top+"px",this.tooltip.style.left=e.left+"px",function(e){var a;e&&(Array.isArray(e)?(a=_.tooltip.classList).add.apply(a,function(e){if(Array.isArray(e)){for(var _=0,a=Array(e.length);_<e.length;_++)a[_]=e[_];return a}return Array.from(e)}(e)):_.tooltip.classList.add(e))}}},{key:"_composeCoordinates",value:function(e){var _=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.last_coordinate;return this.last_coordinate=_?{left:e.left===this.centered_coordinate.left?_.left:e.left,top:e.top===this.centered_coordinate.top?_.top:e.top}:e}},{key:"getCenteredStyles",value:function(){return{top:this.container_dimension.top-this.tooltip_height/2+this.element_rect.height/2,left:this.container_dimension.left-this.tooltip_width/2+this.element_rect.width/2}}},{key:"autoPlace",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,_=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=this.determineOffsetFromElement(),o=this._autoPlaceHorizontallyStyles(a,e),s=this._autoplaceVerticallyStyles(a,_),t=this._composeCoordinates(o,s);return this._applyPosition(t)([a.vertical,a.horizontal,"autoplace"]),this}},{key:"autoPlaceHorizontally",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,_=this.determineOffsetFromElement(),a=this._autoPlaceHorizontallyStyles(_,e);return this._applyPosition(a)(_.horizontal),this}},{key:"_autoPlaceHorizontallyStyles",value:function(e){var _=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a="TooltipLeft"===e.horizontal,o=this.element_width/2+this.tooltip_width/2-_;return{left:a?this.centered_coordinate.left+o:this.centered_coordinate.left-o,top:this.centered_coordinate.top}}},{key:"autoPlaceVertically",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,_=this.determineOffsetFromElement(),a=this._autoplaceVerticallyStyles(_,e);return this._applyPosition(a)(_.vertical),this}},{key:"_autoplaceVerticallyStyles",value:function(e){var _=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a="TooltipAbove"===e.vertical,o=this.element_height/2+this.tooltip_height/2+_;return{top:a?this.centered_coordinate.top-o:this.centered_coordinate.top+o,left:this.centered_coordinate.left}}},{key:"above",value:function(e){var _=this._aboveStyles(e);return this._applyPosition(_)("TooltipAbove"),this}},{key:"_aboveStyles",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return{top:this.centered_coordinate.top-(this.element_height/2+this.tooltip_height/2+e),left:this.centered_coordinate.left}}},{key:"below",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,_=this._belowStyles(e);return this._applyPosition(_)("TooltipBelow"),this}},{key:"_belowStyles",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return{top:this.centered_coordinate.top+(this.element_height/2+this.tooltip_height/2+e),left:this.centered_coordinate.left}}},{key:"left",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,_=this._leftStyles(e);return this._applyPosition(_)("TooltipLeft"),this}},{key:"_leftStyles",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return{top:this.centered_coordinate.top,left:this.centered_coordinate.left-(this.element_width/2+this.tooltip_width/2+e)}}},{key:"right",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,_=this._rightStyles(e);return this._applyPosition(_)("TooltipRight"),this}},{key:"_rightStyles",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return{top:this.centered_coordinate.top,left:this.centered_coordinate.left+(this.element_width/2+this.tooltip_width/2+e)}}},{key:"alignLeft",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,_=this._alignLeftStyles(e);return this._applyPosition(_)("TooltipAlignLeft"),this}},{key:"_alignLeftStyles",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,_=(this.element_width-this.tooltip_width)/2;return{top:this.centered_coordinate.top,left:this.centered_coordinate.left-_-e}}},{key:"alignRight",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,_=this._alignRightStyles(e);return this._applyPosition(_)("TooltipAlignRight"),this}},{key:"_alignRightStyles",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,_=(this.element_width-this.tooltip_width)/2;return{top:this.centered_coordinate.top,left:this.centered_coordinate.left+_+e}}},{key:"inside",value:function(){var e=this;return arguments.length&&Array.prototype.slice.call(arguments).forEach(function(_){switch(_){case"top":e._insideTop();break;case"bottom":e._insideBottom();break;case"left":e.alignLeft();break;case"right":e.alignRight()}}),this}},{key:"_insideTop",value:function(){return this._applyPosition(o({},this.centered_coordinate,{top:this.centered_coordinate.top-this.centered_coordinate.top/4})),this}},{key:"_insideBottom",value:function(){return this._applyPosition(o({},this.centered_coordinate,{top:this.centered_coordinate.top+this.centered_coordinate.top/2})),this}},{key:"center",value:function(){return this._removeClasses(),this.element_rect=this.element.getBoundingClientRect(),this.container_rect=this.container.getBoundingClientRect(),this.container_dimension=this.calculateViewportPosition(),this.tooltip_height=this.tooltip.offsetHeight,this.tooltip_width=this.tooltip.offsetWidth,this.centered_coordinate=this.getCenteredStyles(),this.tooltip.style.top=this.centered_coordinate.top+"px",this.tooltip.style.left=this.centered_coordinate.left+"px",this}},{key:"_removeClasses",value:function(){var e;return(e=this.tooltip.classList).remove.apply(e,["TooltipAlignRight","TooltipAlignLeft","TooltipRight","TooltipLeft",",TooltipAbove","TooltipBelow"]),this}},{key:"destroy",value:function(){return document.body.removeEventListener("click",this.destroy),this.tooltip.parentNode&&this.tooltip.parentNode.removeChild(this.tooltip),this}},{key:"hide",value:function(){return this.tooltip.style.display="none",this}},{key:"show",value:function(){return this.tooltip.style.display="block",this}},{key:"removeListener",value:function(){var e=this;return setTimeout(function(){document.body.addEventListener("click",e.destroy.bind(e))},50),this}},{key:"setClickCallback",value:function(e,_){var a=this;return e.stopPropagation(),document.body.addEventListener(e,function(){_.call(a,e.target,a.tooltip)}),this}},{key:"scrollWith",value:function(e){var _=this,a=e.scrollTop;return e.addEventListener("scroll",function(){var o=a-e.scrollTop;_.tooltip.style.top=_.tooltip.style.top+o,a=e.scrollTop}),this}},{key:"calculateViewportPosition",value:function(){var e=this.element_rect,_=this.container_rect;return{left:e.left-_.left+this.container.scrollLeft,top:e.top-_.top+this.container.scrollTop,right:e.right-_.right,bottom:e.bottom-_.bottom,width:e.width,height:e.height}}},{key:"determineOffsetFromElement",value:function(){var e=window.innerHeight/2,_=window.innerWidth/2;return{horizontal:this.element_rect.left>_?"TooltipRight":"TooltipLeft",vertical:this.element_rect.top>e?"TooltipAbove":"TooltipBelow"}}}]),e}();_.default=t;var i=function(e){var _=document.createDocumentFragment(),a=document.createElement("div");a.innerHTML=e;for(var o=void 0;o=a.firstElementChild;)_.appendChild(o);return _}}])},function(e,_,a){!function(e){function _(e,_,a){var o;return _&&"object"==typeof _&&(void 0!==_[e]?o=_[e]:a&&_.get&&"function"==typeof _.get&&(o=_.get(e))),o}e.Template=function(e,_,a,o){e=e||{},this.r=e.code||this.r,this.c=a,this.options=o||{},this.text=_||"",this.partials=e.partials||{},this.subs=e.subs||{},this.buf=""},e.Template.prototype={r:function(e,_,a){return""},v:function(e){return e=m(e),r.test(e)?e.replace(a,"&amp;").replace(o,"&lt;").replace(s,"&gt;").replace(t,"&#39;").replace(i,"&quot;"):e},t:m,render:function(e,_,a){return this.ri([e],_||{},a)},ri:function(e,_,a){return this.r(e,_,a)},ep:function(e,_){var a=this.partials[e],o=_[a.name];if(a.instance&&a.base==o)return a.instance;if("string"==typeof o){if(!this.c)throw new Error("No compiler available.");o=this.c.compile(o,this.options)}if(!o)return null;if(this.partials[e].base=o,a.subs){for(key in _.stackText||(_.stackText={}),a.subs)_.stackText[key]||(_.stackText[key]=void 0!==this.activeSub&&_.stackText[this.activeSub]?_.stackText[this.activeSub]:this.text);o=function(e,_,a,o,s,t){function i(){}function r(){}var m;i.prototype=e,r.prototype=e.subs;var f=new i;for(m in f.subs=new r,f.subsText={},f.buf="",o=o||{},f.stackSubs=o,f.subsText=t,_)o[m]||(o[m]=_[m]);for(m in o)f.subs[m]=o[m];for(m in s=s||{},f.stackPartials=s,a)s[m]||(s[m]=a[m]);for(m in s)f.partials[m]=s[m];return f}(o,a.subs,a.partials,this.stackSubs,this.stackPartials,_.stackText)}return this.partials[e].instance=o,o},rp:function(e,_,a,o){var s=this.ep(e,a);return s?s.ri(_,a,o):""},rs:function(e,_,a){var o=e[e.length-1];if(f(o))for(var s=0;s<o.length;s++)e.push(o[s]),a(e,_,this),e.pop();else a(e,_,this)},s:function(e,_,a,o,s,t,i){var r;return(!f(e)||0!==e.length)&&("function"==typeof e&&(e=this.ms(e,_,a,o,s,t,i)),r=!!e,!o&&r&&_&&_.push("object"==typeof e?e:_[_.length-1]),r)},d:function(e,a,o,s){var t,i=e.split("."),r=this.f(i[0],a,o,s),m=this.options.modelGet,n=null;if("."===e&&f(a[a.length-2]))r=a[a.length-1];else for(var g=1;g<i.length;g++)void 0!==(t=_(i[g],r,m))?(n=r,r=t):r="";return!(s&&!r)&&(s||"function"!=typeof r||(a.push(n),r=this.mv(r,a,o),a.pop()),r)},f:function(e,a,o,s){for(var t=!1,i=!1,r=this.options.modelGet,m=a.length-1;m>=0;m--)if(void 0!==(t=_(e,a[m],r))){i=!0;break}return i?(s||"function"!=typeof t||(t=this.mv(t,a,o)),t):!s&&""},ls:function(e,_,a,o,s){var t=this.options.delimiters;return this.options.delimiters=s,this.b(this.ct(m(e.call(_,o)),_,a)),this.options.delimiters=t,!1},ct:function(e,_,a){if(this.options.disableLambda)throw new Error("Lambda features disabled.");return this.c.compile(e,this.options).render(_,a)},b:function(e){this.buf+=e},fl:function(){var e=this.buf;return this.buf="",e},ms:function(e,_,a,o,s,t,i){var r,m=_[_.length-1],f=e.call(m);return"function"==typeof f?!!o||(r=this.activeSub&&this.subsText&&this.subsText[this.activeSub]?this.subsText[this.activeSub]:this.text,this.ls(f,m,a,r.substring(s,t),i)):f},mv:function(e,_,a){var o=_[_.length-1],s=e.call(o);return"function"==typeof s?this.ct(m(s.call(o)),o,a):s},sub:function(e,_,a,o){var s=this.subs[e];s&&(this.activeSub=e,s(_,a,this,o),this.activeSub=!1)}};var a=/&/g,o=/</g,s=/>/g,t=/\'/g,i=/\"/g,r=/[&<>\"\']/;function m(e){return String(null===e||void 0===e?"":e)}var f=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}}(_)},function(e,_,a){!function(e){var _=/\S/,a=/\"/g,o=/\n/g,s=/\r/g,t=/\\/g,i=/\u2028/,r=/\u2029/;function m(e){"}"===e.n.substr(e.n.length-1)&&(e.n=e.n.substring(0,e.n.length-1))}function f(e){return e.trim?e.trim():e.replace(/^\s*|\s*$/g,"")}function n(e,_,a){if(_.charAt(a)!=e.charAt(0))return!1;for(var o=1,s=e.length;o<s;o++)if(_.charAt(a+o)!=e.charAt(o))return!1;return!0}e.tags={"#":1,"^":2,"<":3,$:4,"/":5,"!":6,">":7,"=":8,_v:9,"{":10,"&":11,_t:12},e.scan=function(a,o){var s=a.length,t=0,i=null,r=null,g="",h=[],l=!1,d=0,p=0,c="{{",u="}}";function w(){g.length>0&&(h.push({tag:"_t",text:new String(g)}),g="")}function E(a,o){if(w(),a&&function(){for(var a=!0,o=p;o<h.length;o++)if(!(a=e.tags[h[o].tag]<e.tags._v||"_t"==h[o].tag&&null===h[o].text.match(_)))return!1;return a}())for(var s,t=p;t<h.length;t++)h[t].text&&((s=h[t+1])&&">"==s.tag&&(s.indent=h[t].text.toString()),h.splice(t,1));else o||h.push({tag:"\n"});l=!1,p=h.length}function b(e,_){var a="="+u,o=e.indexOf(a,_),s=f(e.substring(e.indexOf("=",_)+1,o)).split(" ");return c=s[0],u=s[s.length-1],o+a.length-1}for(o&&(o=o.split(" "),c=o[0],u=o[1]),d=0;d<s;d++)0==t?n(c,a,d)?(--d,w(),t=1):"\n"==a.charAt(d)?E(l):g+=a.charAt(d):1==t?(d+=c.length-1,"="==(i=(r=e.tags[a.charAt(d+1)])?a.charAt(d+1):"_v")?(d=b(a,d),t=0):(r&&d++,t=2),l=d):n(u,a,d)?(h.push({tag:i,n:f(g),otag:c,ctag:u,i:"/"==i?l-c.length:d+u.length}),g="",d+=u.length-1,t=0,"{"==i&&("}}"==u?d++:m(h[h.length-1]))):g+=a.charAt(d);return E(l,!0),h};var g={_t:!0,"\n":!0,$:!0,"/":!0};function h(e,_){for(var a=0,o=_.length;a<o;a++)if(_[a].o==e.n)return e.tag="#",!0}function l(e,_,a){for(var o=0,s=a.length;o<s;o++)if(a[o].c==e&&a[o].o==_)return!0}function d(e){var _=[];for(var a in e.partials)_.push('"'+c(a)+'":{name:"'+c(e.partials[a].name)+'", '+d(e.partials[a])+"}");return"partials: {"+_.join(",")+"}, subs: "+function(e){var _=[];for(var a in e)_.push('"'+c(a)+'": function(c,p,t,i) {'+e[a]+"}");return"{ "+_.join(",")+" }"}(e.subs)}e.stringify=function(_,a,o){return"{code: function (c,p,i) { "+e.wrapMain(_.code)+" },"+d(_)+"}"};var p=0;function c(e){return e.replace(t,"\\\\").replace(a,'\\"').replace(o,"\\n").replace(s,"\\r").replace(i,"\\u2028").replace(r,"\\u2029")}function u(e){return~e.indexOf(".")?"d":"f"}function w(e,_){var a="<"+(_.prefix||"")+e.n+p++;return _.partials[a]={name:e.n,partials:{}},_.code+='t.b(t.rp("'+c(a)+'",c,p,"'+(e.indent||"")+'"));',a}function E(e,_){_.code+="t.b(t.t(t."+u(e.n)+'("'+c(e.n)+'",c,p,0)));'}function b(e){return"t.b("+e+");"}e.generate=function(_,a,o){p=0;var s={code:"",subs:{},partials:{}};return e.walk(_,s),o.asString?this.stringify(s,a,o):this.makeTemplate(s,a,o)},e.wrapMain=function(e){return'var t=this;t.b(i=i||"");'+e+"return t.fl();"},e.template=e.Template,e.makeTemplate=function(e,_,a){var o=this.makePartials(e);return o.code=new Function("c","p","i",this.wrapMain(e.code)),new this.template(o,_,this,a)},e.makePartials=function(e){var _,a={subs:{},partials:e.partials,name:e.name};for(_ in a.partials)a.partials[_]=this.makePartials(a.partials[_]);for(_ in e.subs)a.subs[_]=new Function("c","p","t","i",e.subs[_]);return a},e.codegen={"#":function(_,a){a.code+="if(t.s(t."+u(_.n)+'("'+c(_.n)+'",c,p,1),c,p,0,'+_.i+","+_.end+',"'+_.otag+" "+_.ctag+'")){t.rs(c,p,function(c,p,t){',e.walk(_.nodes,a),a.code+="});c.pop();}"},"^":function(_,a){a.code+="if(!t.s(t."+u(_.n)+'("'+c(_.n)+'",c,p,1),c,p,1,0,0,"")){',e.walk(_.nodes,a),a.code+="};"},">":w,"<":function(_,a){var o={partials:{},code:"",subs:{},inPartial:!0};e.walk(_.nodes,o);var s=a.partials[w(_,a)];s.subs=o.subs,s.partials=o.partials},$:function(_,a){var o={subs:{},code:"",partials:a.partials,prefix:_.n};e.walk(_.nodes,o),a.subs[_.n]=o.code,a.inPartial||(a.code+='t.sub("'+c(_.n)+'",c,p,i);')},"\n":function(e,_){_.code+=b('"\\n"'+(e.last?"":" + i"))},_v:function(e,_){_.code+="t.b(t.v(t."+u(e.n)+'("'+c(e.n)+'",c,p,0)));'},_t:function(e,_){_.code+=b('"'+c(e.text)+'"')},"{":E,"&":E},e.walk=function(_,a){for(var o,s=0,t=_.length;s<t;s++)(o=e.codegen[_[s].tag])&&o(_[s],a);return a},e.parse=function(_,a,o){return function _(a,o,s,t){var i,r=[],m=null,f=null;for(i=s[s.length-1];a.length>0;){if(f=a.shift(),i&&"<"==i.tag&&!(f.tag in g))throw new Error("Illegal content in < super tag.");if(e.tags[f.tag]<=e.tags.$||h(f,t))s.push(f),f.nodes=_(a,f.tag,s,t);else{if("/"==f.tag){if(0===s.length)throw new Error("Closing tag without opener: /"+f.n);if(m=s.pop(),f.n!=m.n&&!l(f.n,m.n,t))throw new Error("Nesting error: "+m.n+" vs. "+f.n);return m.end=f.i,r}"\n"==f.tag&&(f.last=0==a.length||"\n"==a[0].tag)}r.push(f)}if(s.length>0)throw new Error("missing closing tag: "+s.pop().n);return r}(_,0,[],(o=o||{}).sectionTags||[])},e.cache={},e.cacheKey=function(e,_){return[e,!!_.asString,!!_.disableLambda,_.delimiters,!!_.modelGet].join("||")},e.compile=function(_,a){a=a||{};var o=e.cacheKey(_,a),s=this.cache[o];if(s){var t=s.partials;for(var i in t)delete t[i].instance;return s}return s=this.generate(this.parse(this.scan(_,a.delimiters),_,a),_,a),this.cache[o]=s}}(_)},function(e,_,a){var o=a(1);e.exports=function(){var e=new o.Template({code:function(e,_,a){var o=this;return o.b(a=a||""),o.b('<div class = "category-wrapper">'),o.b("\n"+a),o.b('    <div class = "category-title">'),o.b("\n"+a),o.b("        <span>"),o.b(o.v(o.f("title",e,_,0))),o.b("</span>"),o.b("\n"+a),o.b("    </div>"),o.b("\n"+a),o.b('    <div class = "category-content"></div>'),o.b("\n"+a),o.b("</div>"),o.fl()},partials:{},subs:{}},'<div class = "category-wrapper">\n    <div class = "category-title">\n        <span>{{title}}</span>\n    </div>\n    <div class = "category-content"></div>\n</div>',o);return e.render.apply(e,arguments)}},function(e,_,a){"use strict";Object.defineProperty(_,"__esModule",{value:!0});var o=function(){function e(e,_){for(var a=0;a<_.length;a++){var o=_[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(_,a,o){return a&&e(_.prototype,a),o&&e(_,o),_}}(),s=r(a(3)),t=r(a(0)),i=r(a(2));function r(e){return e&&e.__esModule?e:{default:e}}a(4);var m=function(){function e(_,a){!function(e,_){if(!(e instanceof _))throw new TypeError("Cannot call a class as a function")}(this,e),this.has_apple_img=_.has_img_apple,this.has_google_img=_.has_img_google,this.has_twitter_img=_.has_img_twitter,this.has_emojione_img=_.has_img_emojione,this.category=a,this.full_name=_.name,this.short_name=_.short_name,this.short_names=_.short_names,this.sort_order=_.sort_order,this.hover_color=e.random_color,this.$emoji=this.getEmojiForPlatform(),this._bubble=void 0,this._onClick()._onHover()}return o(e,null,[{key:"factory",value:function(_,a,o){var s=new e(_,a);return s.setCallback(o),s}},{key:"randomIntFromInterval",value:function(e,_){return Math.floor(Math.random()*(_-e+1)+e)}},{key:"random_color",get:function(){var _=["blue","yellow","green","orange","indigo","pink"];return _[e.randomIntFromInterval(0,_.length-1)]}}]),o(e,[{key:"getColons",value:function(){return":"+this.short_name+":"}},{key:"getUnified",value:function(){return s.default.withUnified().replace_colons(this.getColons())}},{key:"getImage",value:function(){return s.default.withImage().replace_colons(this.getColons())}},{key:"getCodepoints",value:function(){var e=(0,t.default)(this.getImage());return e.hasClass("emoji-inner")?e.data("codepoints"):e.find(".emoji-inner").data("codepoints")}},{key:"getCharacter",value:function(){var e=this.getCodepoints();if(/-/g.test(e)){var _=e.split("-").map(function(e){return"0x"+e});return String.fromCodePoint.apply(String,function(e){if(Array.isArray(e)){for(var _=0,a=Array(e.length);_<e.length;_++)a[_]=e[_];return a}return Array.from(e)}(_))}return String.fromCodePoint("0x"+e)}},{key:"getEmojiForPlatform",value:function(){var e=s.default.withEnvironment().replace_colons(this.getColons());return this._getWrapper().append(e)}},{key:"getPreview",value:function(){var e=s.default.withEnvironment().replace_colons(this.getColons());return this._getPreviewWrapper().append(e)}},{key:"getMarkup",value:function(){return this.$emoji}},{key:"getHtml",value:function(){return this.$emoji.get(0).innerHTML}},{key:"setCallback",value:function(e){return this._bubble=e,this}},{key:"matchesSearchTerm",value:function(e){return this.short_names.find(function(_){return e.test(_)})}},{key:"_getWrapper",value:function(){return(0,t.default)('<span class = "emoji-char-wrapper '+this.hover_color+'" data-name="'+this.full_name+'" data-category="'+this.category+'"></span>')}},{key:"_getPreviewWrapper",value:function(){return(0,t.default)('<span class = "emoji-preview-wrapper '+this.hover_color+'" data-name="'+this.full_name+'" data-category="'+this.category+'"></span>')}},{key:"_onClick",value:function(){var e=this;return(0,t.default)(this.$emoji).off("click.emoji").on("click.emoji",function(_){e._bubble&&e._bubble(i.default.events.SELECTED,e)}),this}},{key:"_onHover",value:function(){var e=this;return(0,t.default)(this.$emoji).off("mouseenter.emoji").on("mouseenter.emoji",function(){e._bubble(i.default.events.EMOJI_MOUSEENTER,e)}).off("mouseleave.emoji").on("mouseleave.emoji",function(){e._bubble(i.default.events.EMOJI_MOUSELEAVE,e)}),this}}],[{key:"supportsUnified",value:function(){return"unified"===s.default.withEnvironment().replace_mode}}]),e}();_.default=m},function(e,_,a){"use strict";Object.defineProperty(_,"__esModule",{value:!0});var o=function(){function e(e,_){for(var a=0;a<_.length;a++){var o=_[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(_,a,o){return a&&e(_.prototype,a),o&&e(_,o),_}}(),s=r(a(12)),t=r(a(11)),i=r(a(0));function r(e){return e&&e.__esModule?e:{default:e}}var m=function(){function e(_,a){var o=this;!function(e,_){if(!(e instanceof _))throw new TypeError("Cannot call a class as a function")}(this,e),this.title=_.title,this.icon=_.icon,this.emojis=a.map(function(e){return s.default.factory(e,o.title,o._onEvent.bind(o))}).sort(function(e,_){return e.sort_order-_.sort_order}),this.$category=this.getMarkup(),this.$title=this.$category.find(".category-title"),this._callback=void 0;var t="";Object.defineProperty(this,"search_term",{get:function(){return t},set:function(e){t!==e&&(t=e,o._search())}})}return o(e,null,[{key:"factory",value:function(_,a,o){var s=new e(_,a);return s.setCallback(o),s}}]),o(e,[{key:"exportContents",value:function(){return{title:this.title,icon:this.icon}}},{key:"getMarkup",value:function(){if(this.$category)return this.$category;var e=(0,i.default)((0,t.default)({title:this.title})),_=e.find(".category-content");return this.emojis.forEach(function(e){_.append(e.getMarkup())}),e}},{key:"filter",value:function(e){this.emojis.filter(function(_){return!e(_)}).forEach(function(e){return e.$emoji.hide()})}},{key:"showAllEmojis",value:function(){this.emojis.forEach(function(e){return e.$emoji.show()})}},{key:"_onEvent",value:function(e,_){this._callback&&this._callback(e,_,this)}},{key:"setCallback",value:function(e){return this._callback=e,this}},{key:"_search",value:function(){if(0===this.search_term.trim().length)this._clearSearch();else{this.$title.addClass("inactive");var e=new RegExp(this.search_term.toLowerCase());this.emojis.forEach(function(_){_.matchesSearchTerm(e)?_.$emoji.show():_.$emoji.hide()})}}},{key:"_clearSearch",value:function(){return this.$title.removeClass("inactive"),this.showAllEmojis(),this}},{key:"offset_top",get:function(){return this.$category.get(0).offsetTop}}]),e}();_.default=m},function(e,_){var a;a=function(){return this}();try{a=a||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(a=window)}e.exports=a},function(e,_,a){"use strict";(function(a){(function(){var a=this,o=a.EmojiConvertor,s=function(){return this.img_set="apple",this.img_sets={apple:{path:"/emoji-data/img-apple-64/",sheet:"/emoji-data/sheet_apple_64.png",mask:1},google:{path:"/emoji-data/img-google-64/",sheet:"/emoji-data/sheet_google_64.png",mask:2},twitter:{path:"/emoji-data/img-twitter-64/",sheet:"/emoji-data/sheet_twitter_64.png",mask:4},emojione:{path:"/emoji-data/img-emojione-64/",sheet:"/emoji-data/sheet_emojione_64.png",mask:8},facebook:{path:"/emoji-data/img-facebook-64/",sheet:"/emoji-data/sheet_facebook_64.png",mask:16},messenger:{path:"/emoji-data/img-messenger-64/",sheet:"/emoji-data/sheet_messenger_64.png",mask:32}},this.use_css_imgs=!1,this.colons_mode=!1,this.text_mode=!1,this.include_title=!1,this.include_text=!1,this.allow_native=!0,this.use_sheet=!1,this.avoid_ms_emoji=!0,this.allow_caps=!1,this.img_suffix="",this.inits={},this.map={},this.init_env(),this};s.prototype.noConflict=function(){return a.EmojiConvertor=o,s},s.prototype.replace_emoticons=function(e){var _=this.replace_emoticons_with_colons(e);return this.replace_colons(_)},s.prototype.replace_emoticons_with_colons=function(e){var _=this;_.init_emoticons();var a=0,o=[],s=e.replace(_.rx_emoticons,function(s,t,i,r){var m=a;a=r+s.length;var f=-1!==i.indexOf("("),n=-1!==i.indexOf(")");if((f||n)&&-1==o.indexOf(i)&&o.push(i),n&&!f){var g=e.substring(m,r);if(-1!==g.indexOf("(")&&-1===g.indexOf(")"))return s}if("\n8)"===s){var h=e.substring(0,r);if(/\n?(6\)|7\))/.test(h))return s}var l=_.data[_.map.emoticons[i]][3][0];return l?t+":"+l+":":s});if(o.length){var t=o.map(_.escape_rx),i=new RegExp("(\\(.+)("+t.join("|")+")(.+\\))","g");s=s.replace(i,function(e,a,o,s){var t=_.data[_.map.emoticons[o]][3][0];return t?a+":"+t+":"+s:e})}return s},s.prototype.replace_colons=function(e){var _=this;return _.init_colons(),e.replace(_.rx_colons,function(e){var a=e.substr(1,e.length-2);if(_.allow_caps&&(a=a.toLowerCase()),a.indexOf("::skin-tone-")>-1){var o,s="skin-tone-"+a.substr(-1,1),t=_.map.colons[s];return a=a.substr(0,a.length-13),(o=_.map.colons[a])?_.replacement(o,a,":",{idx:t,actual:s,wrapper:":"}):":"+a+":"+_.replacement(t,s,":")}return(o=_.map.colons[a])?_.replacement(o,a,":"):e})},s.prototype.replace_unified=function(e){var _=this;return _.init_unified(),e.replace(_.rx_unified,function(e,a,o){var s=_.map.unified[a];if(s){var t=null;return"🏻"==o&&(t="1f3fb"),"🏼"==o&&(t="1f3fc"),"🏽"==o&&(t="1f3fd"),"🏾"==o&&(t="1f3fe"),"🏿"==o&&(t="1f3ff"),t?_.replacement(s,null,null,{idx:t,actual:o,wrapper:""}):_.replacement(s)}return(s=_.map.unified_vars[a])?_.replacement(s[0],null,null,{idx:s[1],actual:"",wrapper:""}):e})},s.prototype.addAliases=function(e){for(var _ in this.init_colons(),e)this.map.colons[_]=e[_]},s.prototype.removeAliases=function(e){for(var _=0;_<e.length;_++){var a=e[_];delete this.map.colons[a];e:for(var o in this.data)for(var s=0;s<this.data[o][3].length;s++)if(a==this.data[o][3][s]){this.map.colons[a]=o;break e}}},s.prototype.replacement=function(e,_,a,o){var s="",t=null;if("object"==typeof o&&(s=this.replacement(o.idx,o.actual,o.wrapper),t=o.idx),a=a||"",this.colons_mode)return":"+this.data[e][3][0]+":"+s;var i=_?a+_+a:this.data[e][8]||a+this.data[e][3][0]+a;if(this.text_mode)return i+s;if(this.init_env(),"unified"==this.replace_mode&&this.allow_native&&this.data[e][0][0])return this.data[e][0][0]+s;if("softbank"==this.replace_mode&&this.allow_native&&this.data[e][1])return this.data[e][1]+s;if("google"==this.replace_mode&&this.allow_native&&this.data[e][2])return this.data[e][2]+s;var r=this.find_image(e,t),m=this.include_title?' title="'+(_||this.data[e][3][0])+'"':"",f=this.include_text?a+(_||this.data[e][3][0])+a:"";if(this.data[e][7]&&(r.path=this.data[e][7],r.px=null,r.py=null,r.is_var=!1),r.is_var&&(s="",this.include_text&&o&&o.actual&&o.wrapper&&(f+=o.wrapper+o.actual+o.wrapper)),this.supports_css){if(this.use_sheet&&null!=r.px&&null!=r.py){var n=100/(this.sheet_size-1);return'<span class="emoji-outer emoji-sizer"><span class="emoji-inner" style="'+("background: url("+r.sheet+");background-position:"+n*r.px+"% "+n*r.py+"%;background-size:"+this.sheet_size+"00%")+'"'+m+' data-codepoints="'+r.full_idx+'">'+f+"</span></span>"+s}return this.use_css_imgs?'<span class="emoji emoji-'+e+'"'+m+' data-codepoints="'+r.full_idx+'">'+f+"</span>"+s:'<span class="emoji emoji-sizer" style="background-image:url('+r.path+')"'+m+' data-codepoints="'+r.full_idx+'">'+f+"</span>"+s}return'<img src="'+r.path+'" class="emoji" data-codepoints="'+r.full_idx+'" '+m+"/>"+s},s.prototype.find_image=function(e,_){var a={path:"",sheet:"",px:this.data[e][4],py:this.data[e][5],full_idx:e,is_var:!1},o=this.data[e][6];if(_&&this.variations_data[e]&&this.variations_data[e][_]){var s=this.variations_data[e][_];a.px=s[1],a.py=s[2],a.full_idx=s[0],a.is_var=!0,o=s[3]}for(var t=[this.img_set,"apple","emojione","google","twitter","facebook","messenger"],i=0;i<t.length;i++){if(o&this.img_sets[t[i]].mask)return a.path=this.img_sets[t[i]].path+a.full_idx+".png"+this.img_suffix,a.sheet=this.img_sets[this.img_set].sheet,a;if(this.obsoletes_data[a.full_idx]){var r=this.obsoletes_data[a.full_idx];if(r[3]&this.img_sets[t[i]].mask)return a.path=this.img_sets[t[i]].path+r[0]+".png"+this.img_suffix,a.sheet=this.img_sets[t[i]].sheet,a.px=r[1],a.py=r[2],a}}return a},s.prototype.init_emoticons=function(){if(!this.inits.emoticons){this.init_colons(),this.inits.emoticons=1;var e=[];for(var _ in this.map.emoticons={},this.emoticons_data){var a=_.replace(/\&/g,"&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");this.map.colons[this.emoticons_data[_]]&&(this.map.emoticons[a]=this.map.colons[this.emoticons_data[_]],e.push(this.escape_rx(a)))}this.rx_emoticons=new RegExp("(^|\\s)("+e.join("|")+")(?=$|[\\s|\\?\\.,!])","g")}},s.prototype.init_colons=function(){if(!this.inits.colons)for(var e in this.inits.colons=1,this.rx_colons=new RegExp(":[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?","g"),this.map.colons={},this.data)for(var _=0;_<this.data[e][3].length;_++)this.map.colons[this.data[e][3][_]]=e},s.prototype.init_unified=function(){if(!this.inits.unified){this.inits.unified=1;var e=[];for(var _ in this.map.unified={},this.map.unified_vars={},this.data)for(var a=0;a<this.data[_][0].length;a++)e.push(this.data[_][0][a].replace("*","\\*")),this.map.unified[this.data[_][0][a]]=_;for(var _ in this.variations_data)if(this.variations_data[_]["1f3fb"][0]!=_+"-1f3fb")for(var o in this.variations_data[_])for(a=0;a<this.variations_data[_][o][4].length;a++)e.push(this.variations_data[_][o][4][a].replace("*","\\*")),this.map.unified_vars[this.variations_data[_][o][4][a]]=[_,o];e=e.sort(function(e,_){return _.length-e.length}),this.rx_unified=new RegExp("("+e.join("|")+")(\ud83c[\udffb-\udfff])?","g")}},s.prototype.init_env=function(){if(!this.inits.env){if(this.inits.env=1,this.replace_mode="img",this.supports_css=!1,"undefined"!=typeof navigator){var e=navigator.userAgent;if(window.getComputedStyle)try{var _=window.getComputedStyle(document.body);(_["background-size"]||_.backgroundSize)&&(this.supports_css=!0)}catch(_){e.match(/Firefox/i)&&(this.supports_css=!0)}if(e.match(/(iPhone|iPod|iPad|iPhone\s+Simulator)/i)){if(e.match(/OS\s+[12345]/i))return void(this.replace_mode="softbank");if(e.match(/OS\s+[6789]/i))return void(this.replace_mode="unified")}if(e.match(/Mac OS X 10[._ ](?:[789]|1\d)/i))return void(this.replace_mode="unified");if(!this.avoid_ms_emoji&&(e.match(/Windows NT 6.[1-9]/i)||e.match(/Windows NT 10.[0-9]/i))&&!e.match(/Chrome/i)&&!e.match(/MSIE 8/i))return void(this.replace_mode="unified")}0,this.supports_css&&(this.replace_mode="css")}},s.prototype.escape_rx=function(e){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},s.prototype.sheet_size=49,s.prototype.data={"00a9":[["©️","©"],"","󾬩",["copyright"],0,0,11,0],"00ae":[["®️","®"],"","󾬭",["registered"],0,1,11,0],"203c":[["‼️","‼"],"","󾬆",["bangbang"],0,2,63,0],2049:[["⁉️","⁉"],"","󾬅",["interrobang"],0,3,63,0],2122:[["™️","™"],"","󾬪",["tm"],0,4,63,0],2139:[["ℹ️","ℹ"],"","󾭇",["information_source"],0,5,63,0],2194:[["↔️","↔"],"","󾫶",["left_right_arrow"],0,6,63,0],2195:[["↕️","↕"],"","󾫷",["arrow_up_down"],0,7,63,0],2196:[["↖️","↖"],"","󾫲",["arrow_upper_left"],0,8,63,0],2197:[["↗️","↗"],"","󾫰",["arrow_upper_right"],0,9,63,0],2198:[["↘️","↘"],"","󾫱",["arrow_lower_right"],0,10,63,0],2199:[["↙️","↙"],"","󾫳",["arrow_lower_left"],0,11,63,0],"21a9":[["↩️","↩"],"","󾮃",["leftwards_arrow_with_hook"],0,12,63,0],"21aa":[["↪️","↪"],"","󾮈",["arrow_right_hook"],0,13,63,0],"231a":[["⌚️","⌚"],"","󾀝",["watch"],0,14,63,0],"231b":[["⌛️","⌛"],"","󾀜",["hourglass"],0,15,63,0],2328:[["⌨️","⌨"],"","",["keyboard"],0,16,31,0],"23cf":[["⏏"],"","",["eject"],0,17,30,0],"23e9":[["⏩"],"","󾫾",["fast_forward"],0,18,63,0],"23ea":[["⏪"],"","󾫿",["rewind"],0,19,63,0],"23eb":[["⏫"],"","󾬃",["arrow_double_up"],0,20,63,0],"23ec":[["⏬"],"","󾬂",["arrow_double_down"],0,21,63,0],"23ed":[["⏭"],"","",["black_right_pointing_double_triangle_with_vertical_bar"],0,22,31,0],"23ee":[["⏮"],"","",["black_left_pointing_double_triangle_with_vertical_bar"],0,23,31,0],"23ef":[["⏯"],"","",["black_right_pointing_triangle_with_double_vertical_bar"],0,24,31,0],"23f0":[["⏰"],"","󾀪",["alarm_clock"],0,25,63,0],"23f1":[["⏱"],"","",["stopwatch"],0,26,31,0],"23f2":[["⏲"],"","",["timer_clock"],0,27,31,0],"23f3":[["⏳"],"","󾀛",["hourglass_flowing_sand"],0,28,63,0],"23f8":[["⏸"],"","",["double_vertical_bar"],0,29,31,0],"23f9":[["⏹"],"","",["black_square_for_stop"],0,30,31,0],"23fa":[["⏺"],"","",["black_circle_for_record"],0,31,31,0],"24c2":[["Ⓜ️","Ⓜ"],"","󾟡",["m"],0,32,63,0],"25aa":[["▪️","▪"],"","󾭮",["black_small_square"],0,33,63,0],"25ab":[["▫️","▫"],"","󾭭",["white_small_square"],0,34,63,0],"25b6":[["▶️","▶"],"","󾫼",["arrow_forward"],0,35,63,0],"25c0":[["◀️","◀"],"","󾫽",["arrow_backward"],0,36,63,0],"25fb":[["◻️","◻"],"","󾭱",["white_medium_square"],0,37,63,0],"25fc":[["◼️","◼"],"","󾭲",["black_medium_square"],0,38,63,0],"25fd":[["◽️","◽"],"","󾭯",["white_medium_small_square"],0,39,63,0],"25fe":[["◾️","◾"],"","󾭰",["black_medium_small_square"],0,40,63,0],2600:[["☀️","☀"],"","󾀀",["sunny"],0,41,63,0],2601:[["☁️","☁"],"","󾀁",["cloud"],0,42,63,0],2602:[["☂️","☂"],"","",["umbrella"],0,43,31,0],2603:[["☃️","☃"],"","",["snowman"],0,44,31,0],2604:[["☄️","☄"],"","",["comet"],0,45,31,0],"260e":[["☎️","☎"],"","󾔣",["phone","telephone"],0,46,63,0],2611:[["☑️","☑"],"","󾮋",["ballot_box_with_check"],0,47,63,0],2614:[["☔️","☔"],"","󾀂",["umbrella_with_rain_drops"],0,48,63,0],2615:[["☕️","☕"],"","󾦁",["coffee"],1,0,63,0],2618:[["☘️","☘"],"","",["shamrock"],1,1,31,0],"261d":[["☝️","☝"],"","󾮘",["point_up"],1,2,63,0],2620:[["☠️","☠"],"","",["skull_and_crossbones"],1,8,31,0],2622:[["☢️","☢"],"","",["radioactive_sign"],1,9,31,0],2623:[["☣️","☣"],"","",["biohazard_sign"],1,10,31,0],2626:[["☦️","☦"],"","",["orthodox_cross"],1,11,31,0],"262a":[["☪️","☪"],"","",["star_and_crescent"],1,12,31,0],"262e":[["☮️","☮"],"","",["peace_symbol"],1,13,31,0],"262f":[["☯️","☯"],"","",["yin_yang"],1,14,31,0],2638:[["☸️","☸"],"","",["wheel_of_dharma"],1,15,31,0],2639:[["☹️","☹"],"","",["white_frowning_face"],1,16,31,0],"263a":[["☺️","☺"],"","󾌶",["relaxed"],1,17,63,0],2640:[["♀"],"","",["female_sign"],1,18,22,0],2642:[["♂"],"","",["male_sign"],1,19,22,0],2648:[["♈️","♈"],"","󾀫",["aries"],1,20,63,0],2649:[["♉️","♉"],"","󾀬",["taurus"],1,21,63,0],"264a":[["♊️","♊"],"","󾀭",["gemini"],1,22,63,0],"264b":[["♋️","♋"],"","󾀮",["cancer"],1,23,63,0],"264c":[["♌️","♌"],"","󾀯",["leo"],1,24,63,0],"264d":[["♍️","♍"],"","󾀰",["virgo"],1,25,63,0],"264e":[["♎️","♎"],"","󾀱",["libra"],1,26,63,0],"264f":[["♏️","♏"],"","󾀲",["scorpius"],1,27,63,0],2650:[["♐️","♐"],"","󾀳",["sagittarius"],1,28,63,0],2651:[["♑️","♑"],"","󾀴",["capricorn"],1,29,63,0],2652:[["♒️","♒"],"","󾀵",["aquarius"],1,30,63,0],2653:[["♓️","♓"],"","󾀶",["pisces"],1,31,63,0],2660:[["♠️","♠"],"","󾬛",["spades"],1,32,63,0],2663:[["♣️","♣"],"","󾬝",["clubs"],1,33,63,0],2665:[["♥️","♥"],"","󾬚",["hearts"],1,34,63,0],2666:[["♦️","♦"],"","󾬜",["diamonds"],1,35,63,0],2668:[["♨️","♨"],"","󾟺",["hotsprings"],1,36,63,0],"267b":[["♻️","♻"],"","󾬬",["recycle"],1,37,63,0],"267f":[["♿️","♿"],"","󾬠",["wheelchair"],1,38,63,0],2692:[["⚒"],"","",["hammer_and_pick"],1,39,31,0],2693:[["⚓️","⚓"],"","󾓁",["anchor"],1,40,63,0],2694:[["⚔️","⚔"],"","",["crossed_swords"],1,41,31,0],2695:[["⚕"],"","",["staff_of_aesculapius"],1,42,7,0],2696:[["⚖️","⚖"],"","",["scales"],1,43,31,0],2697:[["⚗️","⚗"],"","",["alembic"],1,44,31,0],2699:[["⚙️","⚙"],"","",["gear"],1,45,31,0],"269b":[["⚛️","⚛"],"","",["atom_symbol"],1,46,31,0],"269c":[["⚜️","⚜"],"","",["fleur_de_lis"],1,47,31,0],"26a0":[["⚠️","⚠"],"","󾬣",["warning"],1,48,63,0],"26a1":[["⚡️","⚡"],"","󾀄",["zap"],2,0,63,0],"26aa":[["⚪️","⚪"],"","󾭥",["white_circle"],2,1,63,0],"26ab":[["⚫️","⚫"],"","󾭦",["black_circle"],2,2,63,0],"26b0":[["⚰️","⚰"],"","",["coffin"],2,3,31,0],"26b1":[["⚱️","⚱"],"","",["funeral_urn"],2,4,31,0],"26bd":[["⚽️","⚽"],"","󾟔",["soccer"],2,5,63,0],"26be":[["⚾️","⚾"],"","󾟑",["baseball"],2,6,63,0],"26c4":[["⛄️","⛄"],"","󾀃",["snowman_without_snow"],2,7,63,0],"26c5":[["⛅️","⛅"],"","󾀏",["partly_sunny"],2,8,63,0],"26c8":[["⛈"],"","",["thunder_cloud_and_rain"],2,9,31,0],"26ce":[["⛎"],"","󾀷",["ophiuchus"],2,10,63,0],"26cf":[["⛏"],"","",["pick"],2,11,31,0],"26d1":[["⛑"],"","",["helmet_with_white_cross"],2,12,31,0],"26d3":[["⛓"],"","",["chains"],2,13,31,0],"26d4":[["⛔️","⛔"],"","󾬦",["no_entry"],2,14,63,0],"26e9":[["⛩"],"","",["shinto_shrine"],2,15,31,0],"26ea":[["⛪️","⛪"],"","󾒻",["church"],2,16,63,0],"26f0":[["⛰"],"","",["mountain"],2,17,31,0],"26f1":[["⛱"],"","",["umbrella_on_ground"],2,18,31,0],"26f2":[["⛲️","⛲"],"","󾒼",["fountain"],2,19,63,0],"26f3":[["⛳️","⛳"],"","󾟒",["golf"],2,20,63,0],"26f4":[["⛴"],"","",["ferry"],2,21,31,0],"26f5":[["⛵️","⛵"],"","󾟪",["boat","sailboat"],2,22,63,0],"26f7":[["⛷"],"","",["skier"],2,23,31,0],"26f8":[["⛸"],"","",["ice_skate"],2,24,31,0],"26fa":[["⛺️","⛺"],"","󾟻",["tent"],2,31,63,0],"26fd":[["⛽️","⛽"],"","󾟵",["fuelpump"],2,32,63,0],2702:[["✂️","✂"],"","󾔾",["scissors"],2,33,63,0],2705:[["✅"],"","󾭊",["white_check_mark"],2,34,63,0],2708:[["✈️","✈"],"","󾟩",["airplane"],2,35,63,0],2709:[["✉️","✉"],"","󾔩",["email","envelope"],2,36,63,0],"270a":[["✊"],"","󾮓",["fist"],2,37,63,0],"270b":[["✋"],"","󾮕",["hand","raised_hand"],2,43,63,0],"270c":[["✌️","✌"],"","󾮔",["v"],3,0,63,0],"270d":[["✍️","✍"],"","",["writing_hand"],3,6,31,0],"270f":[["✏️","✏"],"","󾔹",["pencil2"],3,12,63,0],2712:[["✒️","✒"],"","󾔶",["black_nib"],3,13,63,0],2714:[["✔️","✔"],"","󾭉",["heavy_check_mark"],3,14,63,0],2716:[["✖️","✖"],"","󾭓",["heavy_multiplication_x"],3,15,63,0],"271d":[["✝️","✝"],"","",["latin_cross"],3,16,31,0],2721:[["✡️","✡"],"","",["star_of_david"],3,17,31,0],2728:[["✨"],"","󾭠",["sparkles"],3,18,63,0],2733:[["✳️","✳"],"","󾭢",["eight_spoked_asterisk"],3,19,63,0],2734:[["✴️","✴"],"","󾭡",["eight_pointed_black_star"],3,20,63,0],2744:[["❄️","❄"],"","󾀎",["snowflake"],3,21,63,0],2747:[["❇️","❇"],"","󾭷",["sparkle"],3,22,63,0],"274c":[["❌"],"","󾭅",["x"],3,23,63,0],"274e":[["❎"],"","󾭆",["negative_squared_cross_mark"],3,24,63,0],2753:[["❓"],"","󾬉",["question"],3,25,63,0],2754:[["❔"],"","󾬊",["grey_question"],3,26,63,0],2755:[["❕"],"","󾬋",["grey_exclamation"],3,27,63,0],2757:[["❗️","❗"],"","󾬄",["exclamation","heavy_exclamation_mark"],3,28,63,0],2763:[["❣️","❣"],"","",["heavy_heart_exclamation_mark_ornament"],3,29,31,0],2764:[["❤️","❤"],"","󾬌",["heart"],3,30,63,0,"<3"],2795:[["➕"],"","󾭑",["heavy_plus_sign"],3,31,63,0],2796:[["➖"],"","󾭒",["heavy_minus_sign"],3,32,63,0],2797:[["➗"],"","󾭔",["heavy_division_sign"],3,33,63,0],"27a1":[["➡️","➡"],"","󾫺",["arrow_right"],3,34,63,0],"27b0":[["➰"],"","󾬈",["curly_loop"],3,35,63,0],"27bf":[["➿"],"","󾠫",["loop"],3,36,63,0],2934:[["⤴️","⤴"],"","󾫴",["arrow_heading_up"],3,37,63,0],2935:[["⤵️","⤵"],"","󾫵",["arrow_heading_down"],3,38,63,0],"2b05":[["⬅️","⬅"],"","󾫻",["arrow_left"],3,39,63,0],"2b06":[["⬆️","⬆"],"","󾫸",["arrow_up"],3,40,63,0],"2b07":[["⬇️","⬇"],"","󾫹",["arrow_down"],3,41,63,0],"2b1b":[["⬛️","⬛"],"","󾭬",["black_large_square"],3,42,63,0],"2b1c":[["⬜️","⬜"],"","󾭫",["white_large_square"],3,43,63,0],"2b50":[["⭐️","⭐"],"","󾭨",["star"],3,44,63,0],"2b55":[["⭕️","⭕"],"","󾭄",["o"],3,45,63,0],3030:[["〰️","〰"],"","󾬇",["wavy_dash"],3,46,63,0],"303d":[["〽️","〽"],"","󾠛",["part_alternation_mark"],3,47,63,0],3297:[["㊗️","㊗"],"","󾭃",["congratulations"],3,48,63,0],3299:[["㊙️","㊙"],"","󾬫",["secret"],4,0,63,0],"1f004":[["🀄️","🀄"],"","󾠋",["mahjong"],4,1,63,0],"1f0cf":[["🃏"],"","󾠒",["black_joker"],4,2,63,0],"1f170":[["🅰️","🅰"],"","󾔋",["a"],4,3,63,0],"1f171":[["🅱️","🅱"],"","󾔌",["b"],4,4,63,0],"1f17e":[["🅾️","🅾"],"","󾔎",["o2"],4,5,63,0],"1f17f":[["🅿️","🅿"],"","󾟶",["parking"],4,6,63,0],"1f18e":[["🆎"],"","󾔍",["ab"],4,7,63,0],"1f191":[["🆑"],"","󾮄",["cl"],4,8,63,0],"1f192":[["🆒"],"","󾬸",["cool"],4,9,63,0],"1f193":[["🆓"],"","󾬡",["free"],4,10,63,0],"1f194":[["🆔"],"","󾮁",["id"],4,11,63,0],"1f195":[["🆕"],"","󾬶",["new"],4,12,63,0],"1f196":[["🆖"],"","󾬨",["ng"],4,13,63,0],"1f197":[["🆗"],"","󾬧",["ok"],4,14,63,0],"1f198":[["🆘"],"","󾭏",["sos"],4,15,63,0],"1f199":[["🆙"],"","󾬷",["up"],4,16,63,0],"1f19a":[["🆚"],"","󾬲",["vs"],4,17,63,0],"1f201":[["🈁"],"","󾬤",["koko"],4,18,63,0],"1f202":[["🈂️","🈂"],"","󾬿",["sa"],4,19,63,0],"1f21a":[["🈚️","🈚"],"","󾬺",["u7121"],4,20,63,0],"1f22f":[["🈯️","🈯"],"","󾭀",["u6307"],4,21,63,0],"1f232":[["🈲"],"","󾬮",["u7981"],4,22,63,0],"1f233":[["🈳"],"","󾬯",["u7a7a"],4,23,63,0],"1f234":[["🈴"],"","󾬰",["u5408"],4,24,63,0],"1f235":[["🈵"],"","󾬱",["u6e80"],4,25,63,0],"1f236":[["🈶"],"","󾬹",["u6709"],4,26,63,0],"1f237":[["🈷️","🈷"],"","󾬻",["u6708"],4,27,63,0],"1f238":[["🈸"],"","󾬼",["u7533"],4,28,63,0],"1f239":[["🈹"],"","󾬾",["u5272"],4,29,63,0],"1f23a":[["🈺"],"","󾭁",["u55b6"],4,30,63,0],"1f250":[["🉐"],"","󾬽",["ideograph_advantage"],4,31,63,0],"1f251":[["🉑"],"","󾭐",["accept"],4,32,63,0],"1f300":[["🌀"],"","󾀅",["cyclone"],4,33,63,0],"1f301":[["🌁"],"","󾀆",["foggy"],4,34,63,0],"1f302":[["🌂"],"","󾀇",["closed_umbrella"],4,35,63,0],"1f303":[["🌃"],"","󾀈",["night_with_stars"],4,36,63,0],"1f304":[["🌄"],"","󾀉",["sunrise_over_mountains"],4,37,63,0],"1f305":[["🌅"],"","󾀊",["sunrise"],4,38,63,0],"1f306":[["🌆"],"","󾀋",["city_sunset"],4,39,63,0],"1f307":[["🌇"],"","󾀌",["city_sunrise"],4,40,63,0],"1f308":[["🌈"],"","󾀍",["rainbow"],4,41,63,0],"1f309":[["🌉"],"","󾀐",["bridge_at_night"],4,42,63,0],"1f30a":[["🌊"],"","󾀸",["ocean"],4,43,63,0],"1f30b":[["🌋"],"","󾀺",["volcano"],4,44,63,0],"1f30c":[["🌌"],"","󾀻",["milky_way"],4,45,63,0],"1f30d":[["🌍"],"","",["earth_africa"],4,46,63,0],"1f30e":[["🌎"],"","",["earth_americas"],4,47,63,0],"1f30f":[["🌏"],"","󾀹",["earth_asia"],4,48,63,0],"1f310":[["🌐"],"","",["globe_with_meridians"],5,0,63,0],"1f311":[["🌑"],"","󾀑",["new_moon"],5,1,63,0],"1f312":[["🌒"],"","",["waxing_crescent_moon"],5,2,63,0],"1f313":[["🌓"],"","󾀓",["first_quarter_moon"],5,3,63,0],"1f314":[["🌔"],"","󾀒",["moon","waxing_gibbous_moon"],5,4,63,0],"1f315":[["🌕"],"","󾀕",["full_moon"],5,5,63,0],"1f316":[["🌖"],"","",["waning_gibbous_moon"],5,6,63,0],"1f317":[["🌗"],"","",["last_quarter_moon"],5,7,63,0],"1f318":[["🌘"],"","",["waning_crescent_moon"],5,8,63,0],"1f319":[["🌙"],"","󾀔",["crescent_moon"],5,9,63,0],"1f31a":[["🌚"],"","",["new_moon_with_face"],5,10,63,0],"1f31b":[["🌛"],"","󾀖",["first_quarter_moon_with_face"],5,11,63,0],"1f31c":[["🌜"],"","",["last_quarter_moon_with_face"],5,12,63,0],"1f31d":[["🌝"],"","",["full_moon_with_face"],5,13,63,0],"1f31e":[["🌞"],"","",["sun_with_face"],5,14,63,0],"1f31f":[["🌟"],"","󾭩",["star2"],5,15,63,0],"1f320":[["🌠"],"","󾭪",["stars"],5,16,63,0],"1f321":[["🌡"],"","",["thermometer"],5,17,31,0],"1f324":[["🌤"],"","",["mostly_sunny","sun_small_cloud"],5,18,31,0],"1f325":[["🌥"],"","",["barely_sunny","sun_behind_cloud"],5,19,31,0],"1f326":[["🌦"],"","",["partly_sunny_rain","sun_behind_rain_cloud"],5,20,31,0],"1f327":[["🌧"],"","",["rain_cloud"],5,21,31,0],"1f328":[["🌨"],"","",["snow_cloud"],5,22,31,0],"1f329":[["🌩"],"","",["lightning","lightning_cloud"],5,23,31,0],"1f32a":[["🌪"],"","",["tornado","tornado_cloud"],5,24,31,0],"1f32b":[["🌫"],"","",["fog"],5,25,31,0],"1f32c":[["🌬"],"","",["wind_blowing_face"],5,26,31,0],"1f32d":[["🌭"],"","",["hotdog"],5,27,31,0],"1f32e":[["🌮"],"","",["taco"],5,28,31,0],"1f32f":[["🌯"],"","",["burrito"],5,29,31,0],"1f330":[["🌰"],"","󾁌",["chestnut"],5,30,63,0],"1f331":[["🌱"],"","󾀾",["seedling"],5,31,63,0],"1f332":[["🌲"],"","",["evergreen_tree"],5,32,63,0],"1f333":[["🌳"],"","",["deciduous_tree"],5,33,63,0],"1f334":[["🌴"],"","󾁇",["palm_tree"],5,34,63,0],"1f335":[["🌵"],"","󾁈",["cactus"],5,35,63,0],"1f336":[["🌶"],"","",["hot_pepper"],5,36,31,0],"1f337":[["🌷"],"","󾀽",["tulip"],5,37,63,0],"1f338":[["🌸"],"","󾁀",["cherry_blossom"],5,38,63,0],"1f339":[["🌹"],"","󾁁",["rose"],5,39,63,0],"1f33a":[["🌺"],"","󾁅",["hibiscus"],5,40,63,0],"1f33b":[["🌻"],"","󾁆",["sunflower"],5,41,63,0],"1f33c":[["🌼"],"","󾁍",["blossom"],5,42,63,0],"1f33d":[["🌽"],"","󾁊",["corn"],5,43,63,0],"1f33e":[["🌾"],"","󾁉",["ear_of_rice"],5,44,63,0],"1f33f":[["🌿"],"","󾁎",["herb"],5,45,63,0],"1f340":[["🍀"],"","󾀼",["four_leaf_clover"],5,46,63,0],"1f341":[["🍁"],"","󾀿",["maple_leaf"],5,47,63,0],"1f342":[["🍂"],"","󾁂",["fallen_leaf"],5,48,63,0],"1f343":[["🍃"],"","󾁃",["leaves"],6,0,63,0],"1f344":[["🍄"],"","󾁋",["mushroom"],6,1,63,0],"1f345":[["🍅"],"","󾁕",["tomato"],6,2,63,0],"1f346":[["🍆"],"","󾁖",["eggplant"],6,3,63,0],"1f347":[["🍇"],"","󾁙",["grapes"],6,4,63,0],"1f348":[["🍈"],"","󾁗",["melon"],6,5,63,0],"1f349":[["🍉"],"","󾁔",["watermelon"],6,6,63,0],"1f34a":[["🍊"],"","󾁒",["tangerine"],6,7,63,0],"1f34b":[["🍋"],"","",["lemon"],6,8,63,0],"1f34c":[["🍌"],"","󾁐",["banana"],6,9,63,0],"1f34d":[["🍍"],"","󾁘",["pineapple"],6,10,63,0],"1f34e":[["🍎"],"","󾁑",["apple"],6,11,63,0],"1f34f":[["🍏"],"","󾁛",["green_apple"],6,12,63,0],"1f350":[["🍐"],"","",["pear"],6,13,63,0],"1f351":[["🍑"],"","󾁚",["peach"],6,14,63,0],"1f352":[["🍒"],"","󾁏",["cherries"],6,15,63,0],"1f353":[["🍓"],"","󾁓",["strawberry"],6,16,63,0],"1f354":[["🍔"],"","󾥠",["hamburger"],6,17,63,0],"1f355":[["🍕"],"","󾥵",["pizza"],6,18,63,0],"1f356":[["🍖"],"","󾥲",["meat_on_bone"],6,19,63,0],"1f357":[["🍗"],"","󾥶",["poultry_leg"],6,20,63,0],"1f358":[["🍘"],"","󾥩",["rice_cracker"],6,21,63,0],"1f359":[["🍙"],"","󾥡",["rice_ball"],6,22,63,0],"1f35a":[["🍚"],"","󾥪",["rice"],6,23,63,0],"1f35b":[["🍛"],"","󾥬",["curry"],6,24,63,0],"1f35c":[["🍜"],"","󾥣",["ramen"],6,25,63,0],"1f35d":[["🍝"],"","󾥫",["spaghetti"],6,26,63,0],"1f35e":[["🍞"],"","󾥤",["bread"],6,27,63,0],"1f35f":[["🍟"],"","󾥧",["fries"],6,28,63,0],"1f360":[["🍠"],"","󾥴",["sweet_potato"],6,29,63,0],"1f361":[["🍡"],"","󾥨",["dango"],6,30,63,0],"1f362":[["🍢"],"","󾥭",["oden"],6,31,63,0],"1f363":[["🍣"],"","󾥮",["sushi"],6,32,63,0],"1f364":[["🍤"],"","󾥿",["fried_shrimp"],6,33,63,0],"1f365":[["🍥"],"","󾥳",["fish_cake"],6,34,63,0],"1f366":[["🍦"],"","󾥦",["icecream"],6,35,63,0],"1f367":[["🍧"],"","󾥱",["shaved_ice"],6,36,63,0],"1f368":[["🍨"],"","󾥷",["ice_cream"],6,37,63,0],"1f369":[["🍩"],"","󾥸",["doughnut"],6,38,63,0],"1f36a":[["🍪"],"","󾥹",["cookie"],6,39,63,0],"1f36b":[["🍫"],"","󾥺",["chocolate_bar"],6,40,63,0],"1f36c":[["🍬"],"","󾥻",["candy"],6,41,63,0],"1f36d":[["🍭"],"","󾥼",["lollipop"],6,42,63,0],"1f36e":[["🍮"],"","󾥽",["custard"],6,43,63,0],"1f36f":[["🍯"],"","󾥾",["honey_pot"],6,44,63,0],"1f370":[["🍰"],"","󾥢",["cake"],6,45,63,0],"1f371":[["🍱"],"","󾥯",["bento"],6,46,63,0],"1f372":[["🍲"],"","󾥰",["stew"],6,47,63,0],"1f373":[["🍳"],"","󾥥",["fried_egg","cooking"],6,48,63,0],"1f374":[["🍴"],"","󾦀",["fork_and_knife"],7,0,63,0],"1f375":[["🍵"],"","󾦄",["tea"],7,1,63,0],"1f376":[["🍶"],"","󾦅",["sake"],7,2,63,0],"1f377":[["🍷"],"","󾦆",["wine_glass"],7,3,63,0],"1f378":[["🍸"],"","󾦂",["cocktail"],7,4,63,0],"1f379":[["🍹"],"","󾦈",["tropical_drink"],7,5,63,0],"1f37a":[["🍺"],"","󾦃",["beer"],7,6,63,0],"1f37b":[["🍻"],"","󾦇",["beers"],7,7,63,0],"1f37c":[["🍼"],"","",["baby_bottle"],7,8,63,0],"1f37d":[["🍽"],"","",["knife_fork_plate"],7,9,31,0],"1f37e":[["🍾"],"","",["champagne"],7,10,31,0],"1f37f":[["🍿"],"","",["popcorn"],7,11,31,0],"1f380":[["🎀"],"","󾔏",["ribbon"],7,12,63,0],"1f381":[["🎁"],"","󾔐",["gift"],7,13,63,0],"1f382":[["🎂"],"","󾔑",["birthday"],7,14,63,0],"1f383":[["🎃"],"","󾔟",["jack_o_lantern"],7,15,63,0],"1f384":[["🎄"],"","󾔒",["christmas_tree"],7,16,63,0],"1f385":[["🎅"],"","󾔓",["santa"],7,17,63,0],"1f386":[["🎆"],"","󾔕",["fireworks"],7,23,63,0],"1f387":[["🎇"],"","󾔝",["sparkler"],7,24,63,0],"1f388":[["🎈"],"","󾔖",["balloon"],7,25,63,0],"1f389":[["🎉"],"","󾔗",["tada"],7,26,63,0],"1f38a":[["🎊"],"","󾔠",["confetti_ball"],7,27,63,0],"1f38b":[["🎋"],"","󾔡",["tanabata_tree"],7,28,63,0],"1f38c":[["🎌"],"","󾔔",["crossed_flags"],7,29,63,0],"1f38d":[["🎍"],"","󾔘",["bamboo"],7,30,63,0],"1f38e":[["🎎"],"","󾔙",["dolls"],7,31,63,0],"1f38f":[["🎏"],"","󾔜",["flags"],7,32,63,0],"1f390":[["🎐"],"","󾔞",["wind_chime"],7,33,63,0],"1f391":[["🎑"],"","󾀗",["rice_scene"],7,34,63,0],"1f392":[["🎒"],"","󾔛",["school_satchel"],7,35,63,0],"1f393":[["🎓"],"","󾔚",["mortar_board"],7,36,63,0],"1f396":[["🎖"],"","",["medal"],7,37,31,0],"1f397":[["🎗"],"","",["reminder_ribbon"],7,38,31,0],"1f399":[["🎙"],"","",["studio_microphone"],7,39,31,0],"1f39a":[["🎚"],"","",["level_slider"],7,40,31,0],"1f39b":[["🎛"],"","",["control_knobs"],7,41,31,0],"1f39e":[["🎞"],"","",["film_frames"],7,42,31,0],"1f39f":[["🎟"],"","",["admission_tickets"],7,43,31,0],"1f3a0":[["🎠"],"","󾟼",["carousel_horse"],7,44,63,0],"1f3a1":[["🎡"],"","󾟽",["ferris_wheel"],7,45,63,0],"1f3a2":[["🎢"],"","󾟾",["roller_coaster"],7,46,63,0],"1f3a3":[["🎣"],"","󾟿",["fishing_pole_and_fish"],7,47,63,0],"1f3a4":[["🎤"],"","󾠀",["microphone"],7,48,63,0],"1f3a5":[["🎥"],"","󾠁",["movie_camera"],8,0,63,0],"1f3a6":[["🎦"],"","󾠂",["cinema"],8,1,63,0],"1f3a7":[["🎧"],"","󾠃",["headphones"],8,2,63,0],"1f3a8":[["🎨"],"","󾠄",["art"],8,3,63,0],"1f3a9":[["🎩"],"","󾠅",["tophat"],8,4,63,0],"1f3aa":[["🎪"],"","󾠆",["circus_tent"],8,5,63,0],"1f3ab":[["🎫"],"","󾠇",["ticket"],8,6,63,0],"1f3ac":[["🎬"],"","󾠈",["clapper"],8,7,63,0],"1f3ad":[["🎭"],"","󾠉",["performing_arts"],8,8,63,0],"1f3ae":[["🎮"],"","󾠊",["video_game"],8,9,63,0],"1f3af":[["🎯"],"","󾠌",["dart"],8,10,63,0],"1f3b0":[["🎰"],"","󾠍",["slot_machine"],8,11,63,0],"1f3b1":[["🎱"],"","󾠎",["8ball"],8,12,63,0],"1f3b2":[["🎲"],"","󾠏",["game_die"],8,13,63,0],"1f3b3":[["🎳"],"","󾠐",["bowling"],8,14,63,0],"1f3b4":[["🎴"],"","󾠑",["flower_playing_cards"],8,15,63,0],"1f3b5":[["🎵"],"","󾠓",["musical_note"],8,16,63,0],"1f3b6":[["🎶"],"","󾠔",["notes"],8,17,63,0],"1f3b7":[["🎷"],"","󾠕",["saxophone"],8,18,63,0],"1f3b8":[["🎸"],"","󾠖",["guitar"],8,19,63,0],"1f3b9":[["🎹"],"","󾠗",["musical_keyboard"],8,20,63,0],"1f3ba":[["🎺"],"","󾠘",["trumpet"],8,21,63,0],"1f3bb":[["🎻"],"","󾠙",["violin"],8,22,63,0],"1f3bc":[["🎼"],"","󾠚",["musical_score"],8,23,63,0],"1f3bd":[["🎽"],"","󾟐",["running_shirt_with_sash"],8,24,63,0],"1f3be":[["🎾"],"","󾟓",["tennis"],8,25,63,0],"1f3bf":[["🎿"],"","󾟕",["ski"],8,26,63,0],"1f3c0":[["🏀"],"","󾟖",["basketball"],8,27,63,0],"1f3c1":[["🏁"],"","󾟗",["checkered_flag"],8,28,63,0],"1f3c2":[["🏂"],"","󾟘",["snowboarder"],8,29,63,0],"1f3c5":[["🏅"],"","",["sports_medal"],8,47,31,0],"1f3c6":[["🏆"],"","󾟛",["trophy"],8,48,63,0],"1f3c7":[["🏇"],"","",["horse_racing"],9,0,63,0],"1f3c8":[["🏈"],"","󾟝",["football"],9,6,63,0],"1f3c9":[["🏉"],"","",["rugby_football"],9,7,63,0],"1f3cd":[["🏍"],"","",["racing_motorcycle"],9,26,31,0],"1f3ce":[["🏎"],"","",["racing_car"],9,27,31,0],"1f3cf":[["🏏"],"","",["cricket_bat_and_ball"],9,28,31,0],"1f3d0":[["🏐"],"","",["volleyball"],9,29,31,0],"1f3d1":[["🏑"],"","",["field_hockey_stick_and_ball"],9,30,31,0],"1f3d2":[["🏒"],"","",["ice_hockey_stick_and_puck"],9,31,31,0],"1f3d3":[["🏓"],"","",["table_tennis_paddle_and_ball"],9,32,31,0],"1f3d4":[["🏔"],"","",["snow_capped_mountain"],9,33,31,0],"1f3d5":[["🏕"],"","",["camping"],9,34,31,0],"1f3d6":[["🏖"],"","",["beach_with_umbrella"],9,35,31,0],"1f3d7":[["🏗"],"","",["building_construction"],9,36,31,0],"1f3d8":[["🏘"],"","",["house_buildings"],9,37,31,0],"1f3d9":[["🏙"],"","",["cityscape"],9,38,31,0],"1f3da":[["🏚"],"","",["derelict_house_building"],9,39,31,0],"1f3db":[["🏛"],"","",["classical_building"],9,40,31,0],"1f3dc":[["🏜"],"","",["desert"],9,41,31,0],"1f3dd":[["🏝"],"","",["desert_island"],9,42,31,0],"1f3de":[["🏞"],"","",["national_park"],9,43,31,0],"1f3df":[["🏟"],"","",["stadium"],9,44,31,0],"1f3e0":[["🏠"],"","󾒰",["house"],9,45,63,0],"1f3e1":[["🏡"],"","󾒱",["house_with_garden"],9,46,63,0],"1f3e2":[["🏢"],"","󾒲",["office"],9,47,63,0],"1f3e3":[["🏣"],"","󾒳",["post_office"],9,48,63,0],"1f3e4":[["🏤"],"","",["european_post_office"],10,0,63,0],"1f3e5":[["🏥"],"","󾒴",["hospital"],10,1,63,0],"1f3e6":[["🏦"],"","󾒵",["bank"],10,2,63,0],"1f3e7":[["🏧"],"","󾒶",["atm"],10,3,63,0],"1f3e8":[["🏨"],"","󾒷",["hotel"],10,4,63,0],"1f3e9":[["🏩"],"","󾒸",["love_hotel"],10,5,63,0],"1f3ea":[["🏪"],"","󾒹",["convenience_store"],10,6,63,0],"1f3eb":[["🏫"],"","󾒺",["school"],10,7,63,0],"1f3ec":[["🏬"],"","󾒽",["department_store"],10,8,63,0],"1f3ed":[["🏭"],"","󾓀",["factory"],10,9,63,0],"1f3ee":[["🏮"],"","󾓂",["izakaya_lantern","lantern"],10,10,63,0],"1f3ef":[["🏯"],"","󾒾",["japanese_castle"],10,11,63,0],"1f3f0":[["🏰"],"","󾒿",["european_castle"],10,12,63,0],"1f3f3":[["🏳️","🏳"],"","",["waving_white_flag"],10,13,31,0],"1f3f4":[["🏴"],"","",["waving_black_flag"],10,14,31,0],"1f3f5":[["🏵"],"","",["rosette"],10,15,31,0],"1f3f7":[["🏷"],"","",["label"],10,16,31,0],"1f3f8":[["🏸"],"","",["badminton_racquet_and_shuttlecock"],10,17,31,0],"1f3f9":[["🏹"],"","",["bow_and_arrow"],10,18,31,0],"1f3fa":[["🏺"],"","",["amphora"],10,19,31,0],"1f3fb":[["🏻"],"","",["skin-tone-2"],10,20,31,0],"1f3fc":[["🏼"],"","",["skin-tone-3"],10,21,31,0],"1f3fd":[["🏽"],"","",["skin-tone-4"],10,22,31,0],"1f3fe":[["🏾"],"","",["skin-tone-5"],10,23,31,0],"1f3ff":[["🏿"],"","",["skin-tone-6"],10,24,31,0],"1f400":[["🐀"],"","",["rat"],10,25,63,0],"1f401":[["🐁"],"","",["mouse2"],10,26,63,0],"1f402":[["🐂"],"","",["ox"],10,27,63,0],"1f403":[["🐃"],"","",["water_buffalo"],10,28,63,0],"1f404":[["🐄"],"","",["cow2"],10,29,63,0],"1f405":[["🐅"],"","",["tiger2"],10,30,63,0],"1f406":[["🐆"],"","",["leopard"],10,31,63,0],"1f407":[["🐇"],"","",["rabbit2"],10,32,63,0],"1f408":[["🐈"],"","",["cat2"],10,33,63,0],"1f409":[["🐉"],"","",["dragon"],10,34,63,0],"1f40a":[["🐊"],"","",["crocodile"],10,35,63,0],"1f40b":[["🐋"],"","",["whale2"],10,36,63,0],"1f40c":[["🐌"],"","󾆹",["snail"],10,37,63,0],"1f40d":[["🐍"],"","󾇓",["snake"],10,38,63,0],"1f40e":[["🐎"],"","󾟜",["racehorse"],10,39,63,0],"1f40f":[["🐏"],"","",["ram"],10,40,63,0],"1f410":[["🐐"],"","",["goat"],10,41,63,0],"1f411":[["🐑"],"","󾇏",["sheep"],10,42,63,0],"1f412":[["🐒"],"","󾇎",["monkey"],10,43,63,0],"1f413":[["🐓"],"","",["rooster"],10,44,63,0],"1f414":[["🐔"],"","󾇔",["chicken"],10,45,63,0],"1f415":[["🐕"],"","",["dog2"],10,46,63,0],"1f416":[["🐖"],"","",["pig2"],10,47,63,0],"1f417":[["🐗"],"","󾇕",["boar"],10,48,63,0],"1f418":[["🐘"],"","󾇌",["elephant"],11,0,63,0],"1f419":[["🐙"],"","󾇅",["octopus"],11,1,63,0],"1f41a":[["🐚"],"","󾇆",["shell"],11,2,63,0],"1f41b":[["🐛"],"","󾇋",["bug"],11,3,63,0],"1f41c":[["🐜"],"","󾇚",["ant"],11,4,63,0],"1f41d":[["🐝"],"","󾇡",["bee","honeybee"],11,5,63,0],"1f41e":[["🐞"],"","󾇢",["beetle"],11,6,63,0],"1f41f":[["🐟"],"","󾆽",["fish"],11,7,63,0],"1f420":[["🐠"],"","󾇉",["tropical_fish"],11,8,63,0],"1f421":[["🐡"],"","󾇙",["blowfish"],11,9,63,0],"1f422":[["🐢"],"","󾇜",["turtle"],11,10,63,0],"1f423":[["🐣"],"","󾇝",["hatching_chick"],11,11,63,0],"1f424":[["🐤"],"","󾆺",["baby_chick"],11,12,63,0],"1f425":[["🐥"],"","󾆻",["hatched_chick"],11,13,63,0],"1f426":[["🐦"],"","󾇈",["bird"],11,14,63,0],"1f427":[["🐧"],"","󾆼",["penguin"],11,15,63,0],"1f428":[["🐨"],"","󾇍",["koala"],11,16,63,0],"1f429":[["🐩"],"","󾇘",["poodle"],11,17,63,0],"1f42a":[["🐪"],"","",["dromedary_camel"],11,18,63,0],"1f42b":[["🐫"],"","󾇖",["camel"],11,19,63,0],"1f42c":[["🐬"],"","󾇇",["dolphin","flipper"],11,20,63,0],"1f42d":[["🐭"],"","󾇂",["mouse"],11,21,63,0],"1f42e":[["🐮"],"","󾇑",["cow"],11,22,63,0],"1f42f":[["🐯"],"","󾇀",["tiger"],11,23,63,0],"1f430":[["🐰"],"","󾇒",["rabbit"],11,24,63,0],"1f431":[["🐱"],"","󾆸",["cat"],11,25,63,0],"1f432":[["🐲"],"","󾇞",["dragon_face"],11,26,63,0],"1f433":[["🐳"],"","󾇃",["whale"],11,27,63,0],"1f434":[["🐴"],"","󾆾",["horse"],11,28,63,0],"1f435":[["🐵"],"","󾇄",["monkey_face"],11,29,63,0],"1f436":[["🐶"],"","󾆷",["dog"],11,30,63,0],"1f437":[["🐷"],"","󾆿",["pig"],11,31,63,0],"1f438":[["🐸"],"","󾇗",["frog"],11,32,63,0],"1f439":[["🐹"],"","󾇊",["hamster"],11,33,63,0],"1f43a":[["🐺"],"","󾇐",["wolf"],11,34,63,0],"1f43b":[["🐻"],"","󾇁",["bear"],11,35,63,0],"1f43c":[["🐼"],"","󾇟",["panda_face"],11,36,63,0],"1f43d":[["🐽"],"","󾇠",["pig_nose"],11,37,63,0],"1f43e":[["🐾"],"","󾇛",["feet","paw_prints"],11,38,63,0],"1f43f":[["🐿"],"","",["chipmunk"],11,39,31,0],"1f440":[["👀"],"","󾆐",["eyes"],11,40,63,0],"1f441":[["👁"],"","",["eye"],11,41,31,0],"1f442":[["👂"],"","󾆑",["ear"],11,42,63,0],"1f443":[["👃"],"","󾆒",["nose"],11,48,63,0],"1f444":[["👄"],"","󾆓",["lips"],12,5,63,0],"1f445":[["👅"],"","󾆔",["tongue"],12,6,63,0],"1f446":[["👆"],"","󾮙",["point_up_2"],12,7,63,0],"1f447":[["👇"],"","󾮚",["point_down"],12,13,63,0],"1f448":[["👈"],"","󾮛",["point_left"],12,19,63,0],"1f449":[["👉"],"","󾮜",["point_right"],12,25,63,0],"1f44a":[["👊"],"","󾮖",["facepunch","punch"],12,31,63,0],"1f44b":[["👋"],"","󾮝",["wave"],12,37,63,0],"1f44c":[["👌"],"","󾮟",["ok_hand"],12,43,63,0],"1f44d":[["👍"],"","󾮗",["+1","thumbsup"],13,0,63,0],"1f44e":[["👎"],"","󾮠",["-1","thumbsdown"],13,6,63,0],"1f44f":[["👏"],"","󾮞",["clap"],13,12,63,0],"1f450":[["👐"],"","󾮡",["open_hands"],13,18,63,0],"1f451":[["👑"],"","󾓑",["crown"],13,24,63,0],"1f452":[["👒"],"","󾓔",["womans_hat"],13,25,63,0],"1f453":[["👓"],"","󾓎",["eyeglasses"],13,26,63,0],"1f454":[["👔"],"","󾓓",["necktie"],13,27,63,0],"1f455":[["👕"],"","󾓏",["shirt","tshirt"],13,28,63,0],"1f456":[["👖"],"","󾓐",["jeans"],13,29,63,0],"1f457":[["👗"],"","󾓕",["dress"],13,30,63,0],"1f458":[["👘"],"","󾓙",["kimono"],13,31,63,0],"1f459":[["👙"],"","󾓚",["bikini"],13,32,63,0],"1f45a":[["👚"],"","󾓛",["womans_clothes"],13,33,63,0],"1f45b":[["👛"],"","󾓜",["purse"],13,34,63,0],"1f45c":[["👜"],"","󾓰",["handbag"],13,35,63,0],"1f45d":[["👝"],"","󾓱",["pouch"],13,36,63,0],"1f45e":[["👞"],"","󾓌",["mans_shoe","shoe"],13,37,63,0],"1f45f":[["👟"],"","󾓍",["athletic_shoe"],13,38,63,0],"1f460":[["👠"],"","󾓖",["high_heel"],13,39,63,0],"1f461":[["👡"],"","󾓗",["sandal"],13,40,63,0],"1f462":[["👢"],"","󾓘",["boot"],13,41,63,0],"1f463":[["👣"],"","󾕓",["footprints"],13,42,63,0],"1f464":[["👤"],"","󾆚",["bust_in_silhouette"],13,43,63,0],"1f465":[["👥"],"","",["busts_in_silhouette"],13,44,63,0],"1f466":[["👦"],"","󾆛",["boy"],13,45,63,0],"1f467":[["👧"],"","󾆜",["girl"],14,2,63,0],"1f468":[["👨"],"","󾆝",["man"],14,8,63,0],"1f469":[["👩"],"","󾆞",["woman"],14,14,63,0],"1f46b":[["👫"],"","󾆠",["couple","man_and_woman_holding_hands"],14,21,63,0],"1f46c":[["👬"],"","",["two_men_holding_hands"],14,22,63,0],"1f46d":[["👭"],"","",["two_women_holding_hands"],14,23,63,0],"1f470":[["👰"],"","󾆣",["bride_with_veil"],14,31,63,0],"1f472":[["👲"],"","󾆥",["man_with_gua_pi_mao"],14,43,63,0],"1f474":[["👴"],"","󾆧",["older_man"],15,6,63,0],"1f475":[["👵"],"","󾆨",["older_woman"],15,12,63,0],"1f476":[["👶"],"","󾆩",["baby"],15,18,63,0],"1f478":[["👸"],"","󾆫",["princess"],15,30,63,0],"1f479":[["👹"],"","󾆬",["japanese_ogre"],15,36,63,0],"1f47a":[["👺"],"","󾆭",["japanese_goblin"],15,37,63,0],"1f47b":[["👻"],"","󾆮",["ghost"],15,38,63,0],"1f47c":[["👼"],"","󾆯",["angel"],15,39,63,0],"1f47d":[["👽"],"","󾆰",["alien"],15,45,63,0],"1f47e":[["👾"],"","󾆱",["space_invader"],15,46,63,0],"1f47f":[["👿"],"","󾆲",["imp"],15,47,63,0],"1f480":[["💀"],"","󾆳",["skull"],15,48,63,0],"1f483":[["💃"],"","󾆶",["dancer"],16,12,63,0],"1f484":[["💄"],"","󾆕",["lipstick"],16,18,63,0],"1f485":[["💅"],"","󾆖",["nail_care"],16,19,63,0],"1f488":[["💈"],"","󾆙",["barber"],16,37,63,0],"1f489":[["💉"],"","󾔉",["syringe"],16,38,63,0],"1f48a":[["💊"],"","󾔊",["pill"],16,39,63,0],"1f48b":[["💋"],"","󾠣",["kiss"],16,40,63,0],"1f48c":[["💌"],"","󾠤",["love_letter"],16,41,63,0],"1f48d":[["💍"],"","󾠥",["ring"],16,42,63,0],"1f48e":[["💎"],"","󾠦",["gem"],16,43,63,0],"1f490":[["💐"],"","󾠨",["bouquet"],16,45,63,0],"1f492":[["💒"],"","󾠪",["wedding"],16,47,63,0],"1f493":[["💓"],"","󾬍",["heartbeat"],16,48,63,0],"1f494":[["💔"],"","󾬎",["broken_heart"],17,0,63,0,"</3"],"1f495":[["💕"],"","󾬏",["two_hearts"],17,1,63,0],"1f496":[["💖"],"","󾬐",["sparkling_heart"],17,2,63,0],"1f497":[["💗"],"","󾬑",["heartpulse"],17,3,63,0],"1f498":[["💘"],"","󾬒",["cupid"],17,4,63,0],"1f499":[["💙"],"","󾬓",["blue_heart"],17,5,63,0,"<3"],"1f49a":[["💚"],"","󾬔",["green_heart"],17,6,63,0,"<3"],"1f49b":[["💛"],"","󾬕",["yellow_heart"],17,7,63,0,"<3"],"1f49c":[["💜"],"","󾬖",["purple_heart"],17,8,63,0,"<3"],"1f49d":[["💝"],"","󾬗",["gift_heart"],17,9,63,0],"1f49e":[["💞"],"","󾬘",["revolving_hearts"],17,10,63,0],"1f49f":[["💟"],"","󾬙",["heart_decoration"],17,11,63,0],"1f4a0":[["💠"],"","󾭕",["diamond_shape_with_a_dot_inside"],17,12,63,0],"1f4a1":[["💡"],"","󾭖",["bulb"],17,13,63,0],"1f4a2":[["💢"],"","󾭗",["anger"],17,14,63,0],"1f4a3":[["💣"],"","󾭘",["bomb"],17,15,63,0],"1f4a4":[["💤"],"","󾭙",["zzz"],17,16,63,0],"1f4a5":[["💥"],"","󾭚",["boom","collision"],17,17,63,0],"1f4a6":[["💦"],"","󾭛",["sweat_drops"],17,18,63,0],"1f4a7":[["💧"],"","󾭜",["droplet"],17,19,63,0],"1f4a8":[["💨"],"","󾭝",["dash"],17,20,63,0],"1f4a9":[["💩"],"","󾓴",["hankey","poop","shit"],17,21,63,0],"1f4aa":[["💪"],"","󾭞",["muscle"],17,22,63,0],"1f4ab":[["💫"],"","󾭟",["dizzy"],17,28,63,0],"1f4ac":[["💬"],"","󾔲",["speech_balloon"],17,29,63,0],"1f4ad":[["💭"],"","",["thought_balloon"],17,30,63,0],"1f4ae":[["💮"],"","󾭺",["white_flower"],17,31,63,0],"1f4af":[["💯"],"","󾭻",["100"],17,32,63,0],"1f4b0":[["💰"],"","󾓝",["moneybag"],17,33,63,0],"1f4b1":[["💱"],"","󾓞",["currency_exchange"],17,34,63,0],"1f4b2":[["💲"],"","󾓠",["heavy_dollar_sign"],17,35,63,0],"1f4b3":[["💳"],"","󾓡",["credit_card"],17,36,63,0],"1f4b4":[["💴"],"","󾓢",["yen"],17,37,63,0],"1f4b5":[["💵"],"","󾓣",["dollar"],17,38,63,0],"1f4b6":[["💶"],"","",["euro"],17,39,63,0],"1f4b7":[["💷"],"","",["pound"],17,40,63,0],"1f4b8":[["💸"],"","󾓤",["money_with_wings"],17,41,63,0],"1f4b9":[["💹"],"","󾓟",["chart"],17,42,63,0],"1f4ba":[["💺"],"","󾔷",["seat"],17,43,63,0],"1f4bb":[["💻"],"","󾔸",["computer"],17,44,63,0],"1f4bc":[["💼"],"","󾔻",["briefcase"],17,45,63,0],"1f4bd":[["💽"],"","󾔼",["minidisc"],17,46,63,0],"1f4be":[["💾"],"","󾔽",["floppy_disk"],17,47,63,0],"1f4bf":[["💿"],"","󾠝",["cd"],17,48,63,0],"1f4c0":[["📀"],"","󾠞",["dvd"],18,0,63,0],"1f4c1":[["📁"],"","󾕃",["file_folder"],18,1,63,0],"1f4c2":[["📂"],"","󾕄",["open_file_folder"],18,2,63,0],"1f4c3":[["📃"],"","󾕀",["page_with_curl"],18,3,63,0],"1f4c4":[["📄"],"","󾕁",["page_facing_up"],18,4,63,0],"1f4c5":[["📅"],"","󾕂",["date"],18,5,63,0],"1f4c6":[["📆"],"","󾕉",["calendar"],18,6,63,0],"1f4c7":[["📇"],"","󾕍",["card_index"],18,7,63,0],"1f4c8":[["📈"],"","󾕋",["chart_with_upwards_trend"],18,8,63,0],"1f4c9":[["📉"],"","󾕌",["chart_with_downwards_trend"],18,9,63,0],"1f4ca":[["📊"],"","󾕊",["bar_chart"],18,10,63,0],"1f4cb":[["📋"],"","󾕈",["clipboard"],18,11,63,0],"1f4cc":[["📌"],"","󾕎",["pushpin"],18,12,63,0],"1f4cd":[["📍"],"","󾔿",["round_pushpin"],18,13,63,0],"1f4ce":[["📎"],"","󾔺",["paperclip"],18,14,63,0],"1f4cf":[["📏"],"","󾕐",["straight_ruler"],18,15,63,0],"1f4d0":[["📐"],"","󾕑",["triangular_ruler"],18,16,63,0],"1f4d1":[["📑"],"","󾕒",["bookmark_tabs"],18,17,63,0],"1f4d2":[["📒"],"","󾕏",["ledger"],18,18,63,0],"1f4d3":[["📓"],"","󾕅",["notebook"],18,19,63,0],"1f4d4":[["📔"],"","󾕇",["notebook_with_decorative_cover"],18,20,63,0],"1f4d5":[["📕"],"","󾔂",["closed_book"],18,21,63,0],"1f4d6":[["📖"],"","󾕆",["book","open_book"],18,22,63,0],"1f4d7":[["📗"],"","󾓿",["green_book"],18,23,63,0],"1f4d8":[["📘"],"","󾔀",["blue_book"],18,24,63,0],"1f4d9":[["📙"],"","󾔁",["orange_book"],18,25,63,0],"1f4da":[["📚"],"","󾔃",["books"],18,26,63,0],"1f4db":[["📛"],"","󾔄",["name_badge"],18,27,63,0],"1f4dc":[["📜"],"","󾓽",["scroll"],18,28,63,0],"1f4dd":[["📝"],"","󾔧",["memo","pencil"],18,29,63,0],"1f4de":[["📞"],"","󾔤",["telephone_receiver"],18,30,63,0],"1f4df":[["📟"],"","󾔢",["pager"],18,31,63,0],"1f4e0":[["📠"],"","󾔨",["fax"],18,32,63,0],"1f4e1":[["📡"],"","󾔱",["satellite_antenna"],18,33,63,0],"1f4e2":[["📢"],"","󾔯",["loudspeaker"],18,34,63,0],"1f4e3":[["📣"],"","󾔰",["mega"],18,35,63,0],"1f4e4":[["📤"],"","󾔳",["outbox_tray"],18,36,63,0],"1f4e5":[["📥"],"","󾔴",["inbox_tray"],18,37,63,0],"1f4e6":[["📦"],"","󾔵",["package"],18,38,63,0],"1f4e7":[["📧"],"","󾮒",["e-mail"],18,39,63,0],"1f4e8":[["📨"],"","󾔪",["incoming_envelope"],18,40,63,0],"1f4e9":[["📩"],"","󾔫",["envelope_with_arrow"],18,41,63,0],"1f4ea":[["📪"],"","󾔬",["mailbox_closed"],18,42,63,0],"1f4eb":[["📫"],"","󾔭",["mailbox"],18,43,63,0],"1f4ec":[["📬"],"","",["mailbox_with_mail"],18,44,63,0],"1f4ed":[["📭"],"","",["mailbox_with_no_mail"],18,45,63,0],"1f4ee":[["📮"],"","󾔮",["postbox"],18,46,63,0],"1f4ef":[["📯"],"","",["postal_horn"],18,47,63,0],"1f4f0":[["📰"],"","󾠢",["newspaper"],18,48,63,0],"1f4f1":[["📱"],"","󾔥",["iphone"],19,0,63,0],"1f4f2":[["📲"],"","󾔦",["calling"],19,1,63,0],"1f4f3":[["📳"],"","󾠹",["vibration_mode"],19,2,63,0],"1f4f4":[["📴"],"","󾠺",["mobile_phone_off"],19,3,63,0],"1f4f5":[["📵"],"","",["no_mobile_phones"],19,4,63,0],"1f4f6":[["📶"],"","󾠸",["signal_strength"],19,5,63,0],"1f4f7":[["📷"],"","󾓯",["camera"],19,6,63,0],"1f4f8":[["📸"],"","",["camera_with_flash"],19,7,31,0],"1f4f9":[["📹"],"","󾓹",["video_camera"],19,8,63,0],"1f4fa":[["📺"],"","󾠜",["tv"],19,9,63,0],"1f4fb":[["📻"],"","󾠟",["radio"],19,10,63,0],"1f4fc":[["📼"],"","󾠠",["vhs"],19,11,63,0],"1f4fd":[["📽"],"","",["film_projector"],19,12,31,0],"1f4ff":[["📿"],"","",["prayer_beads"],19,13,31,0],"1f500":[["🔀"],"","",["twisted_rightwards_arrows"],19,14,63,0],"1f501":[["🔁"],"","",["repeat"],19,15,63,0],"1f502":[["🔂"],"","",["repeat_one"],19,16,63,0],"1f503":[["🔃"],"","󾮑",["arrows_clockwise"],19,17,63,0],"1f504":[["🔄"],"","",["arrows_counterclockwise"],19,18,63,0],"1f505":[["🔅"],"","",["low_brightness"],19,19,63,0],"1f506":[["🔆"],"","",["high_brightness"],19,20,63,0],"1f507":[["🔇"],"","",["mute"],19,21,63,0],"1f508":[["🔈"],"","",["speaker"],19,22,63,0],"1f509":[["🔉"],"","",["sound"],19,23,63,0],"1f50a":[["🔊"],"","󾠡",["loud_sound"],19,24,63,0],"1f50b":[["🔋"],"","󾓼",["battery"],19,25,63,0],"1f50c":[["🔌"],"","󾓾",["electric_plug"],19,26,63,0],"1f50d":[["🔍"],"","󾮅",["mag"],19,27,63,0],"1f50e":[["🔎"],"","󾮍",["mag_right"],19,28,63,0],"1f50f":[["🔏"],"","󾮐",["lock_with_ink_pen"],19,29,63,0],"1f510":[["🔐"],"","󾮊",["closed_lock_with_key"],19,30,63,0],"1f511":[["🔑"],"","󾮂",["key"],19,31,63,0],"1f512":[["🔒"],"","󾮆",["lock"],19,32,63,0],"1f513":[["🔓"],"","󾮇",["unlock"],19,33,63,0],"1f514":[["🔔"],"","󾓲",["bell"],19,34,63,0],"1f515":[["🔕"],"","",["no_bell"],19,35,63,0],"1f516":[["🔖"],"","󾮏",["bookmark"],19,36,63,0],"1f517":[["🔗"],"","󾭋",["link"],19,37,63,0],"1f518":[["🔘"],"","󾮌",["radio_button"],19,38,63,0],"1f519":[["🔙"],"","󾮎",["back"],19,39,63,0],"1f51a":[["🔚"],"","󾀚",["end"],19,40,63,0],"1f51b":[["🔛"],"","󾀙",["on"],19,41,63,0],"1f51c":[["🔜"],"","󾀘",["soon"],19,42,63,0],"1f51d":[["🔝"],"","󾭂",["top"],19,43,63,0],"1f51e":[["🔞"],"","󾬥",["underage"],19,44,63,0],"1f51f":[["🔟"],"","󾠻",["keycap_ten"],19,45,63,0],"1f520":[["🔠"],"","󾭼",["capital_abcd"],19,46,63,0],"1f521":[["🔡"],"","󾭽",["abcd"],19,47,63,0],"1f522":[["🔢"],"","󾭾",["1234"],19,48,63,0],"1f523":[["🔣"],"","󾭿",["symbols"],20,0,63,0],"1f524":[["🔤"],"","󾮀",["abc"],20,1,63,0],"1f525":[["🔥"],"","󾓶",["fire"],20,2,63,0],"1f526":[["🔦"],"","󾓻",["flashlight"],20,3,63,0],"1f527":[["🔧"],"","󾓉",["wrench"],20,4,63,0],"1f528":[["🔨"],"","󾓊",["hammer"],20,5,63,0],"1f529":[["🔩"],"","󾓋",["nut_and_bolt"],20,6,63,0],"1f52a":[["🔪"],"","󾓺",["hocho","knife"],20,7,63,0],"1f52b":[["🔫"],"","󾓵",["gun"],20,8,63,0],"1f52c":[["🔬"],"","",["microscope"],20,9,63,0],"1f52d":[["🔭"],"","",["telescope"],20,10,63,0],"1f52e":[["🔮"],"","󾓷",["crystal_ball"],20,11,63,0],"1f52f":[["🔯"],"","󾓸",["six_pointed_star"],20,12,63,0],"1f530":[["🔰"],"","󾁄",["beginner"],20,13,63,0],"1f531":[["🔱"],"","󾓒",["trident"],20,14,63,0],"1f532":[["🔲"],"","󾭤",["black_square_button"],20,15,63,0],"1f533":[["🔳"],"","󾭧",["white_square_button"],20,16,63,0],"1f534":[["🔴"],"","󾭣",["red_circle"],20,17,63,0],"1f535":[["🔵"],"","󾭤",["large_blue_circle"],20,18,63,0],"1f536":[["🔶"],"","󾭳",["large_orange_diamond"],20,19,63,0],"1f537":[["🔷"],"","󾭴",["large_blue_diamond"],20,20,63,0],"1f538":[["🔸"],"","󾭵",["small_orange_diamond"],20,21,63,0],"1f539":[["🔹"],"","󾭶",["small_blue_diamond"],20,22,63,0],"1f53a":[["🔺"],"","󾭸",["small_red_triangle"],20,23,63,0],"1f53b":[["🔻"],"","󾭹",["small_red_triangle_down"],20,24,63,0],"1f53c":[["🔼"],"","󾬁",["arrow_up_small"],20,25,63,0],"1f53d":[["🔽"],"","󾬀",["arrow_down_small"],20,26,63,0],"1f549":[["🕉"],"","",["om_symbol"],20,27,31,0],"1f54a":[["🕊"],"","",["dove_of_peace"],20,28,31,0],"1f54b":[["🕋"],"","",["kaaba"],20,29,31,0],"1f54c":[["🕌"],"","",["mosque"],20,30,31,0],"1f54d":[["🕍"],"","",["synagogue"],20,31,31,0],"1f54e":[["🕎"],"","",["menorah_with_nine_branches"],20,32,31,0],"1f550":[["🕐"],"","󾀞",["clock1"],20,33,63,0],"1f551":[["🕑"],"","󾀟",["clock2"],20,34,63,0],"1f552":[["🕒"],"","󾀠",["clock3"],20,35,63,0],"1f553":[["🕓"],"","󾀡",["clock4"],20,36,63,0],"1f554":[["🕔"],"","󾀢",["clock5"],20,37,63,0],"1f555":[["🕕"],"","󾀣",["clock6"],20,38,63,0],"1f556":[["🕖"],"","󾀤",["clock7"],20,39,63,0],"1f557":[["🕗"],"","󾀥",["clock8"],20,40,63,0],"1f558":[["🕘"],"","󾀦",["clock9"],20,41,63,0],"1f559":[["🕙"],"","󾀧",["clock10"],20,42,63,0],"1f55a":[["🕚"],"","󾀨",["clock11"],20,43,63,0],"1f55b":[["🕛"],"","󾀩",["clock12"],20,44,63,0],"1f55c":[["🕜"],"","",["clock130"],20,45,63,0],"1f55d":[["🕝"],"","",["clock230"],20,46,63,0],"1f55e":[["🕞"],"","",["clock330"],20,47,63,0],"1f55f":[["🕟"],"","",["clock430"],20,48,63,0],"1f560":[["🕠"],"","",["clock530"],21,0,63,0],"1f561":[["🕡"],"","",["clock630"],21,1,63,0],"1f562":[["🕢"],"","",["clock730"],21,2,63,0],"1f563":[["🕣"],"","",["clock830"],21,3,63,0],"1f564":[["🕤"],"","",["clock930"],21,4,63,0],"1f565":[["🕥"],"","",["clock1030"],21,5,63,0],"1f566":[["🕦"],"","",["clock1130"],21,6,63,0],"1f567":[["🕧"],"","",["clock1230"],21,7,63,0],"1f56f":[["🕯"],"","",["candle"],21,8,31,0],"1f570":[["🕰"],"","",["mantelpiece_clock"],21,9,31,0],"1f573":[["🕳"],"","",["hole"],21,10,31,0],"1f574":[["🕴"],"","",["man_in_business_suit_levitating"],21,11,31,0],"1f576":[["🕶"],"","",["dark_sunglasses"],21,23,31,0],"1f577":[["🕷"],"","",["spider"],21,24,31,0],"1f578":[["🕸"],"","",["spider_web"],21,25,31,0],"1f579":[["🕹"],"","",["joystick"],21,26,31,0],"1f57a":[["🕺"],"","",["man_dancing"],21,27,31,0],"1f587":[["🖇"],"","",["linked_paperclips"],21,33,31,0],"1f58a":[["🖊"],"","",["lower_left_ballpoint_pen"],21,34,31,0],"1f58b":[["🖋"],"","",["lower_left_fountain_pen"],21,35,31,0],"1f58c":[["🖌"],"","",["lower_left_paintbrush"],21,36,31,0],"1f58d":[["🖍"],"","",["lower_left_crayon"],21,37,31,0],"1f590":[["🖐"],"","",["raised_hand_with_fingers_splayed"],21,38,31,0],"1f595":[["🖕"],"","",["middle_finger","reversed_hand_with_middle_finger_extended"],21,44,31,0],"1f596":[["🖖"],"","",["spock-hand"],22,1,31,0],"1f5a4":[["🖤"],"","",["black_heart"],22,7,31,0],"1f5a5":[["🖥"],"","",["desktop_computer"],22,8,31,0],"1f5a8":[["🖨"],"","",["printer"],22,9,31,0],"1f5b1":[["🖱"],"","",["three_button_mouse"],22,10,31,0],"1f5b2":[["🖲"],"","",["trackball"],22,11,31,0],"1f5bc":[["🖼"],"","",["frame_with_picture"],22,12,31,0],"1f5c2":[["🗂"],"","",["card_index_dividers"],22,13,31,0],"1f5c3":[["🗃"],"","",["card_file_box"],22,14,31,0],"1f5c4":[["🗄"],"","",["file_cabinet"],22,15,31,0],"1f5d1":[["🗑"],"","",["wastebasket"],22,16,31,0],"1f5d2":[["🗒"],"","",["spiral_note_pad"],22,17,31,0],"1f5d3":[["🗓"],"","",["spiral_calendar_pad"],22,18,31,0],"1f5dc":[["🗜"],"","",["compression"],22,19,31,0],"1f5dd":[["🗝"],"","",["old_key"],22,20,31,0],"1f5de":[["🗞"],"","",["rolled_up_newspaper"],22,21,31,0],"1f5e1":[["🗡"],"","",["dagger_knife"],22,22,31,0],"1f5e3":[["🗣"],"","",["speaking_head_in_silhouette"],22,23,31,0],"1f5e8":[["🗨"],"","",["left_speech_bubble"],22,24,31,0],"1f5ef":[["🗯"],"","",["right_anger_bubble"],22,25,31,0],"1f5f3":[["🗳"],"","",["ballot_box_with_ballot"],22,26,31,0],"1f5fa":[["🗺"],"","",["world_map"],22,27,31,0],"1f5fb":[["🗻"],"","󾓃",["mount_fuji"],22,28,63,0],"1f5fc":[["🗼"],"","󾓄",["tokyo_tower"],22,29,63,0],"1f5fd":[["🗽"],"","󾓆",["statue_of_liberty"],22,30,63,0],"1f5fe":[["🗾"],"","󾓇",["japan"],22,31,63,0],"1f5ff":[["🗿"],"","󾓈",["moyai"],22,32,63,0],"1f600":[["😀"],"","",["grinning"],22,33,63,0,":D"],"1f601":[["😁"],"","󾌳",["grin"],22,34,63,0],"1f602":[["😂"],"","󾌴",["joy"],22,35,63,0],"1f603":[["😃"],"","󾌰",["smiley"],22,36,63,0,":)"],"1f604":[["😄"],"","󾌸",["smile"],22,37,63,0,":)"],"1f605":[["😅"],"","󾌱",["sweat_smile"],22,38,63,0],"1f606":[["😆"],"","󾌲",["laughing","satisfied"],22,39,63,0],"1f607":[["😇"],"","",["innocent"],22,40,63,0],"1f608":[["😈"],"","",["smiling_imp"],22,41,63,0],"1f609":[["😉"],"","󾍇",["wink"],22,42,63,0,";)"],"1f60a":[["😊"],"","󾌵",["blush"],22,43,63,0,":)"],"1f60b":[["😋"],"","󾌫",["yum"],22,44,63,0],"1f60c":[["😌"],"","󾌾",["relieved"],22,45,63,0],"1f60d":[["😍"],"","󾌧",["heart_eyes"],22,46,63,0],"1f60e":[["😎"],"","",["sunglasses"],22,47,63,0],"1f60f":[["😏"],"","󾍃",["smirk"],22,48,63,0],"1f610":[["😐"],"","",["neutral_face"],23,0,63,0],"1f611":[["😑"],"","",["expressionless"],23,1,63,0],"1f612":[["😒"],"","󾌦",["unamused"],23,2,63,0,":("],"1f613":[["😓"],"","󾍄",["sweat"],23,3,63,0],"1f614":[["😔"],"","󾍀",["pensive"],23,4,63,0],"1f615":[["😕"],"","",["confused"],23,5,63,0],"1f616":[["😖"],"","󾌿",["confounded"],23,6,63,0],"1f617":[["😗"],"","",["kissing"],23,7,63,0],"1f618":[["😘"],"","󾌬",["kissing_heart"],23,8,63,0],"1f619":[["😙"],"","",["kissing_smiling_eyes"],23,9,63,0],"1f61a":[["😚"],"","󾌭",["kissing_closed_eyes"],23,10,63,0],"1f61b":[["😛"],"","",["stuck_out_tongue"],23,11,63,0,":p"],"1f61c":[["😜"],"","󾌩",["stuck_out_tongue_winking_eye"],23,12,63,0,";p"],"1f61d":[["😝"],"","󾌪",["stuck_out_tongue_closed_eyes"],23,13,63,0],"1f61e":[["😞"],"","󾌣",["disappointed"],23,14,63,0,":("],"1f61f":[["😟"],"","",["worried"],23,15,63,0],"1f620":[["😠"],"","󾌠",["angry"],23,16,63,0],"1f621":[["😡"],"","󾌽",["rage"],23,17,63,0],"1f622":[["😢"],"","󾌹",["cry"],23,18,63,0,":'("],"1f623":[["😣"],"","󾌼",["persevere"],23,19,63,0],"1f624":[["😤"],"","󾌨",["triumph"],23,20,63,0],"1f625":[["😥"],"","󾍅",["disappointed_relieved"],23,21,63,0],"1f626":[["😦"],"","",["frowning"],23,22,63,0],"1f627":[["😧"],"","",["anguished"],23,23,63,0],"1f628":[["😨"],"","󾌻",["fearful"],23,24,63,0],"1f629":[["😩"],"","󾌡",["weary"],23,25,63,0],"1f62a":[["😪"],"","󾍂",["sleepy"],23,26,63,0],"1f62b":[["😫"],"","󾍆",["tired_face"],23,27,63,0],"1f62c":[["😬"],"","",["grimacing"],23,28,63,0],"1f62d":[["😭"],"","󾌺",["sob"],23,29,63,0,":'("],"1f62e":[["😮"],"","",["open_mouth"],23,30,63,0],"1f62f":[["😯"],"","",["hushed"],23,31,63,0],"1f630":[["😰"],"","󾌥",["cold_sweat"],23,32,63,0],"1f631":[["😱"],"","󾍁",["scream"],23,33,63,0],"1f632":[["😲"],"","󾌢",["astonished"],23,34,63,0],"1f633":[["😳"],"","󾌯",["flushed"],23,35,63,0],"1f634":[["😴"],"","",["sleeping"],23,36,63,0],"1f635":[["😵"],"","󾌤",["dizzy_face"],23,37,63,0],"1f636":[["😶"],"","",["no_mouth"],23,38,63,0],"1f637":[["😷"],"","󾌮",["mask"],23,39,63,0],"1f638":[["😸"],"","󾍉",["smile_cat"],23,40,63,0],"1f639":[["😹"],"","󾍊",["joy_cat"],23,41,63,0],"1f63a":[["😺"],"","󾍈",["smiley_cat"],23,42,63,0],"1f63b":[["😻"],"","󾍌",["heart_eyes_cat"],23,43,63,0],"1f63c":[["😼"],"","󾍏",["smirk_cat"],23,44,63,0],"1f63d":[["😽"],"","󾍋",["kissing_cat"],23,45,63,0],"1f63e":[["😾"],"","󾍎",["pouting_cat"],23,46,63,0],"1f63f":[["😿"],"","󾍍",["crying_cat_face"],23,47,63,0],"1f640":[["🙀"],"","󾍐",["scream_cat"],23,48,63,0],"1f641":[["🙁"],"","",["slightly_frowning_face"],24,0,31,0],"1f642":[["🙂"],"","",["slightly_smiling_face"],24,1,63,0],"1f643":[["🙃"],"","",["upside_down_face"],24,2,31,0],"1f644":[["🙄"],"","",["face_with_rolling_eyes"],24,3,31,0],"1f648":[["🙈"],"","󾍔",["see_no_evil"],24,22,63,0],"1f649":[["🙉"],"","󾍖",["hear_no_evil"],24,23,63,0],"1f64a":[["🙊"],"","󾍕",["speak_no_evil"],24,24,63,0],"1f64c":[["🙌"],"","󾍘",["raised_hands"],24,31,63,0],"1f64f":[["🙏"],"","󾍛",["pray"],25,0,63,0],"1f680":[["🚀"],"","󾟭",["rocket"],25,6,63,0],"1f681":[["🚁"],"","",["helicopter"],25,7,63,0],"1f682":[["🚂"],"","",["steam_locomotive"],25,8,63,0],"1f683":[["🚃"],"","󾟟",["railway_car"],25,9,63,0],"1f684":[["🚄"],"","󾟢",["bullettrain_side"],25,10,63,0],"1f685":[["🚅"],"","󾟣",["bullettrain_front"],25,11,63,0],"1f686":[["🚆"],"","",["train2"],25,12,63,0],"1f687":[["🚇"],"","󾟠",["metro"],25,13,63,0],"1f688":[["🚈"],"","",["light_rail"],25,14,63,0],"1f689":[["🚉"],"","󾟬",["station"],25,15,63,0],"1f68a":[["🚊"],"","",["tram"],25,16,63,0],"1f68b":[["🚋"],"","",["train"],25,17,63,0],"1f68c":[["🚌"],"","󾟦",["bus"],25,18,63,0],"1f68d":[["🚍"],"","",["oncoming_bus"],25,19,63,0],"1f68e":[["🚎"],"","",["trolleybus"],25,20,63,0],"1f68f":[["🚏"],"","󾟧",["busstop"],25,21,63,0],"1f690":[["🚐"],"","",["minibus"],25,22,63,0],"1f691":[["🚑"],"","󾟳",["ambulance"],25,23,63,0],"1f692":[["🚒"],"","󾟲",["fire_engine"],25,24,63,0],"1f693":[["🚓"],"","󾟴",["police_car"],25,25,63,0],"1f694":[["🚔"],"","",["oncoming_police_car"],25,26,63,0],"1f695":[["🚕"],"","󾟯",["taxi"],25,27,63,0],"1f696":[["🚖"],"","",["oncoming_taxi"],25,28,63,0],"1f697":[["🚗"],"","󾟤",["car","red_car"],25,29,63,0],"1f698":[["🚘"],"","",["oncoming_automobile"],25,30,63,0],"1f699":[["🚙"],"","󾟥",["blue_car"],25,31,63,0],"1f69a":[["🚚"],"","󾟱",["truck"],25,32,63,0],"1f69b":[["🚛"],"","",["articulated_lorry"],25,33,63,0],"1f69c":[["🚜"],"","",["tractor"],25,34,63,0],"1f69d":[["🚝"],"","",["monorail"],25,35,63,0],"1f69e":[["🚞"],"","",["mountain_railway"],25,36,63,0],"1f69f":[["🚟"],"","",["suspension_railway"],25,37,63,0],"1f6a0":[["🚠"],"","",["mountain_cableway"],25,38,63,0],"1f6a1":[["🚡"],"","",["aerial_tramway"],25,39,63,0],"1f6a2":[["🚢"],"","󾟨",["ship"],25,40,63,0],"1f6a4":[["🚤"],"","󾟮",["speedboat"],25,47,63,0],"1f6a5":[["🚥"],"","󾟷",["traffic_light"],25,48,63,0],"1f6a6":[["🚦"],"","",["vertical_traffic_light"],26,0,63,0],"1f6a7":[["🚧"],"","󾟸",["construction"],26,1,63,0],"1f6a8":[["🚨"],"","󾟹",["rotating_light"],26,2,63,0],"1f6a9":[["🚩"],"","󾬢",["triangular_flag_on_post"],26,3,63,0],"1f6aa":[["🚪"],"","󾓳",["door"],26,4,63,0],"1f6ab":[["🚫"],"","󾭈",["no_entry_sign"],26,5,63,0],"1f6ac":[["🚬"],"","󾬞",["smoking"],26,6,63,0],"1f6ad":[["🚭"],"","󾬟",["no_smoking"],26,7,63,0],"1f6ae":[["🚮"],"","",["put_litter_in_its_place"],26,8,63,0],"1f6af":[["🚯"],"","",["do_not_litter"],26,9,63,0],"1f6b0":[["🚰"],"","",["potable_water"],26,10,63,0],"1f6b1":[["🚱"],"","",["non-potable_water"],26,11,63,0],"1f6b2":[["🚲"],"","󾟫",["bike"],26,12,63,0],"1f6b3":[["🚳"],"","",["no_bicycles"],26,13,63,0],"1f6b7":[["🚷"],"","",["no_pedestrians"],26,32,63,0],"1f6b8":[["🚸"],"","",["children_crossing"],26,33,63,0],"1f6b9":[["🚹"],"","󾬳",["mens"],26,34,63,0],"1f6ba":[["🚺"],"","󾬴",["womens"],26,35,63,0],"1f6bb":[["🚻"],"","󾔆",["restroom"],26,36,63,0],"1f6bc":[["🚼"],"","󾬵",["baby_symbol"],26,37,63,0],"1f6bd":[["🚽"],"","󾔇",["toilet"],26,38,63,0],"1f6be":[["🚾"],"","󾔈",["wc"],26,39,63,0],"1f6bf":[["🚿"],"","",["shower"],26,40,63,0],"1f6c0":[["🛀"],"","󾔅",["bath"],26,41,63,0],"1f6c1":[["🛁"],"","",["bathtub"],26,47,63,0],"1f6c2":[["🛂"],"","",["passport_control"],26,48,63,0],"1f6c3":[["🛃"],"","",["customs"],27,0,63,0],"1f6c4":[["🛄"],"","",["baggage_claim"],27,1,63,0],"1f6c5":[["🛅"],"","",["left_luggage"],27,2,63,0],"1f6cb":[["🛋"],"","",["couch_and_lamp"],27,3,31,0],"1f6cc":[["🛌"],"","",["sleeping_accommodation"],27,4,31,0],"1f6cd":[["🛍"],"","",["shopping_bags"],27,10,31,0],"1f6ce":[["🛎"],"","",["bellhop_bell"],27,11,31,0],"1f6cf":[["🛏"],"","",["bed"],27,12,31,0],"1f6d0":[["🛐"],"","",["place_of_worship"],27,13,31,0],"1f6d1":[["🛑"],"","",["octagonal_sign"],27,14,31,0],"1f6d2":[["🛒"],"","",["shopping_trolley"],27,15,31,0],"1f6e0":[["🛠"],"","",["hammer_and_wrench"],27,16,31,0],"1f6e1":[["🛡"],"","",["shield"],27,17,31,0],"1f6e2":[["🛢"],"","",["oil_drum"],27,18,31,0],"1f6e3":[["🛣"],"","",["motorway"],27,19,31,0],"1f6e4":[["🛤"],"","",["railway_track"],27,20,31,0],"1f6e5":[["🛥"],"","",["motor_boat"],27,21,31,0],"1f6e9":[["🛩"],"","",["small_airplane"],27,22,31,0],"1f6eb":[["🛫"],"","",["airplane_departure"],27,23,31,0],"1f6ec":[["🛬"],"","",["airplane_arriving"],27,24,31,0],"1f6f0":[["🛰"],"","",["satellite"],27,25,31,0],"1f6f3":[["🛳"],"","",["passenger_ship"],27,26,31,0],"1f6f4":[["🛴"],"","",["scooter"],27,27,31,0],"1f6f5":[["🛵"],"","",["motor_scooter"],27,28,31,0],"1f6f6":[["🛶"],"","",["canoe"],27,29,31,0],"1f910":[["🤐"],"","",["zipper_mouth_face"],27,30,31,0],"1f911":[["🤑"],"","",["money_mouth_face"],27,31,31,0],"1f912":[["🤒"],"","",["face_with_thermometer"],27,32,31,0],"1f913":[["🤓"],"","",["nerd_face"],27,33,31,0],"1f914":[["🤔"],"","",["thinking_face"],27,34,31,0],"1f915":[["🤕"],"","",["face_with_head_bandage"],27,35,31,0],"1f916":[["🤖"],"","",["robot_face"],27,36,31,0],"1f917":[["🤗"],"","",["hugging_face"],27,37,31,0],"1f918":[["🤘"],"","",["the_horns","sign_of_the_horns"],27,38,31,0],"1f919":[["🤙"],"","",["call_me_hand"],27,44,31,0],"1f91a":[["🤚"],"","",["raised_back_of_hand"],28,1,31,0],"1f91b":[["🤛"],"","",["left-facing_fist"],28,7,31,0],"1f91c":[["🤜"],"","",["right-facing_fist"],28,13,31,0],"1f91d":[["🤝"],"","",["handshake"],28,19,31,0],"1f91e":[["🤞"],"","",["hand_with_index_and_middle_fingers_crossed"],28,20,31,0],"1f920":[["🤠"],"","",["face_with_cowboy_hat"],28,26,31,0],"1f921":[["🤡"],"","",["clown_face"],28,27,31,0],"1f922":[["🤢"],"","",["nauseated_face"],28,28,31,0],"1f923":[["🤣"],"","",["rolling_on_the_floor_laughing"],28,29,31,0],"1f924":[["🤤"],"","",["drooling_face"],28,30,31,0],"1f925":[["🤥"],"","",["lying_face"],28,31,31,0],"1f926":[["🤦"],"","",["face_palm"],28,32,31,0],"1f927":[["🤧"],"","",["sneezing_face"],28,38,31,0],"1f930":[["🤰"],"","",["pregnant_woman"],28,39,31,0],"1f933":[["🤳"],"","",["selfie"],28,45,31,0],"1f934":[["🤴"],"","",["prince"],29,2,31,0],"1f935":[["🤵"],"","",["man_in_tuxedo"],29,8,31,0],"1f936":[["🤶"],"","",["mother_christmas"],29,14,31,0],"1f937":[["🤷"],"","",["shrug"],29,20,31,0],"1f938":[["🤸"],"","",["person_doing_cartwheel"],29,26,31,0],"1f939":[["🤹"],"","",["juggling"],29,32,31,0],"1f93a":[["🤺"],"","",["fencer"],29,38,31,0],"1f93c":[["🤼"],"","",["wrestlers"],29,39,31,0],"1f93d":[["🤽"],"","",["water_polo"],29,40,31,0],"1f93e":[["🤾"],"","",["handball"],29,46,31,0],"1f940":[["🥀"],"","",["wilted_flower"],30,3,31,0],"1f941":[["🥁"],"","",["drum_with_drumsticks"],30,4,31,0],"1f942":[["🥂"],"","",["clinking_glasses"],30,5,31,0],"1f943":[["🥃"],"","",["tumbler_glass"],30,6,31,0],"1f944":[["🥄"],"","",["spoon"],30,7,31,0],"1f945":[["🥅"],"","",["goal_net"],30,8,31,0],"1f947":[["🥇"],"","",["first_place_medal"],30,9,31,0],"1f948":[["🥈"],"","",["second_place_medal"],30,10,31,0],"1f949":[["🥉"],"","",["third_place_medal"],30,11,31,0],"1f94a":[["🥊"],"","",["boxing_glove"],30,12,31,0],"1f94b":[["🥋"],"","",["martial_arts_uniform"],30,13,31,0],"1f950":[["🥐"],"","",["croissant"],30,14,31,0],"1f951":[["🥑"],"","",["avocado"],30,15,31,0],"1f952":[["🥒"],"","",["cucumber"],30,16,31,0],"1f953":[["🥓"],"","",["bacon"],30,17,31,0],"1f954":[["🥔"],"","",["potato"],30,18,31,0],"1f955":[["🥕"],"","",["carrot"],30,19,31,0],"1f956":[["🥖"],"","",["baguette_bread"],30,20,31,0],"1f957":[["🥗"],"","",["green_salad"],30,21,31,0],"1f958":[["🥘"],"","",["shallow_pan_of_food"],30,22,31,0],"1f959":[["🥙"],"","",["stuffed_flatbread"],30,23,31,0],"1f95a":[["🥚"],"","",["egg"],30,24,31,0],"1f95b":[["🥛"],"","",["glass_of_milk"],30,25,31,0],"1f95c":[["🥜"],"","",["peanuts"],30,26,31,0],"1f95d":[["🥝"],"","",["kiwifruit"],30,27,31,0],"1f95e":[["🥞"],"","",["pancakes"],30,28,31,0],"1f980":[["🦀"],"","",["crab"],30,29,31,0],"1f981":[["🦁"],"","",["lion_face"],30,30,31,0],"1f982":[["🦂"],"","",["scorpion"],30,31,31,0],"1f983":[["🦃"],"","",["turkey"],30,32,31,0],"1f984":[["🦄"],"","",["unicorn_face"],30,33,31,0],"1f985":[["🦅"],"","",["eagle"],30,34,31,0],"1f986":[["🦆"],"","",["duck"],30,35,31,0],"1f987":[["🦇"],"","",["bat"],30,36,31,0],"1f988":[["🦈"],"","",["shark"],30,37,31,0],"1f989":[["🦉"],"","",["owl"],30,38,31,0],"1f98a":[["🦊"],"","",["fox_face"],30,39,31,0],"1f98b":[["🦋"],"","",["butterfly"],30,40,31,0],"1f98c":[["🦌"],"","",["deer"],30,41,31,0],"1f98d":[["🦍"],"","",["gorilla"],30,42,31,0],"1f98e":[["🦎"],"","",["lizard"],30,43,31,0],"1f98f":[["🦏"],"","",["rhinoceros"],30,44,31,0],"1f990":[["🦐"],"","",["shrimp"],30,45,31,0],"1f991":[["🦑"],"","",["squid"],30,46,31,0],"1f9c0":[["🧀"],"","",["cheese_wedge"],30,47,31,0],"0023-20e3":[["#️⃣","#⃣"],"","󾠬",["hash"],30,48,15,0],"002a-20e3":[["*️⃣","*⃣"],"","",["keycap_star"],31,0,15,0],"0030-20e3":[["0️⃣","0⃣"],"","󾠷",["zero"],31,1,15,0],"0031-20e3":[["1️⃣","1⃣"],"","󾠮",["one"],31,2,15,0],"0032-20e3":[["2️⃣","2⃣"],"","󾠯",["two"],31,3,15,0],"0033-20e3":[["3️⃣","3⃣"],"","󾠰",["three"],31,4,15,0],"0034-20e3":[["4️⃣","4⃣"],"","󾠱",["four"],31,5,15,0],"0035-20e3":[["5️⃣","5⃣"],"","󾠲",["five"],31,6,15,0],"0036-20e3":[["6️⃣","6⃣"],"","󾠳",["six"],31,7,15,0],"0037-20e3":[["7️⃣","7⃣"],"","󾠴",["seven"],31,8,15,0],"0038-20e3":[["8️⃣","8⃣"],"","󾠵",["eight"],31,9,15,0],"0039-20e3":[["9️⃣","9⃣"],"","󾠶",["nine"],31,10,15,0],"1f1e6-1f1e8":[["🇦🇨"],"","",["flag-ac"],31,11,63,0],"1f1e6-1f1e9":[["🇦🇩"],"","",["flag-ad"],31,12,63,0],"1f1e6-1f1ea":[["🇦🇪"],"","",["flag-ae"],31,13,63,0],"1f1e6-1f1eb":[["🇦🇫"],"","",["flag-af"],31,14,63,0],"1f1e6-1f1ec":[["🇦🇬"],"","",["flag-ag"],31,15,63,0],"1f1e6-1f1ee":[["🇦🇮"],"","",["flag-ai"],31,16,63,0],"1f1e6-1f1f1":[["🇦🇱"],"","",["flag-al"],31,17,63,0],"1f1e6-1f1f2":[["🇦🇲"],"","",["flag-am"],31,18,63,0],"1f1e6-1f1f4":[["🇦🇴"],"","",["flag-ao"],31,19,63,0],"1f1e6-1f1f6":[["🇦🇶"],"","",["flag-aq"],31,20,63,0],"1f1e6-1f1f7":[["🇦🇷"],"","",["flag-ar"],31,21,63,0],"1f1e6-1f1f8":[["🇦🇸"],"","",["flag-as"],31,22,63,0],"1f1e6-1f1f9":[["🇦🇹"],"","",["flag-at"],31,23,63,0],"1f1e6-1f1fa":[["🇦🇺"],"","",["flag-au"],31,24,63,0],"1f1e6-1f1fc":[["🇦🇼"],"","",["flag-aw"],31,25,63,0],"1f1e6-1f1fd":[["🇦🇽"],"","",["flag-ax"],31,26,63,0],"1f1e6-1f1ff":[["🇦🇿"],"","",["flag-az"],31,27,63,0],"1f1e7-1f1e6":[["🇧🇦"],"","",["flag-ba"],31,28,31,0],"1f1e7-1f1e7":[["🇧🇧"],"","",["flag-bb"],31,29,63,0],"1f1e7-1f1e9":[["🇧🇩"],"","",["flag-bd"],31,30,63,0],"1f1e7-1f1ea":[["🇧🇪"],"","",["flag-be"],31,31,63,0],"1f1e7-1f1eb":[["🇧🇫"],"","",["flag-bf"],31,32,63,0],"1f1e7-1f1ec":[["🇧🇬"],"","",["flag-bg"],31,33,63,0],"1f1e7-1f1ed":[["🇧🇭"],"","",["flag-bh"],31,34,63,0],"1f1e7-1f1ee":[["🇧🇮"],"","",["flag-bi"],31,35,63,0],"1f1e7-1f1ef":[["🇧🇯"],"","",["flag-bj"],31,36,63,0],"1f1e7-1f1f1":[["🇧🇱"],"","",["flag-bl"],31,37,61,0],"1f1e7-1f1f2":[["🇧🇲"],"","",["flag-bm"],31,38,63,0],"1f1e7-1f1f3":[["🇧🇳"],"","",["flag-bn"],31,39,31,0],"1f1e7-1f1f4":[["🇧🇴"],"","",["flag-bo"],31,40,63,0],"1f1e7-1f1f6":[["🇧🇶"],"","",["flag-bq"],31,41,61,0],"1f1e7-1f1f7":[["🇧🇷"],"","",["flag-br"],31,42,63,0],"1f1e7-1f1f8":[["🇧🇸"],"","",["flag-bs"],31,43,63,0],"1f1e7-1f1f9":[["🇧🇹"],"","",["flag-bt"],31,44,63,0],"1f1e7-1f1fb":[["🇧🇻"],"","",["flag-bv"],31,45,61,0],"1f1e7-1f1fc":[["🇧🇼"],"","",["flag-bw"],31,46,63,0],"1f1e7-1f1fe":[["🇧🇾"],"","",["flag-by"],31,47,63,0],"1f1e7-1f1ff":[["🇧🇿"],"","",["flag-bz"],31,48,63,0],"1f1e8-1f1e6":[["🇨🇦"],"","",["flag-ca"],32,0,63,0],"1f1e8-1f1e8":[["🇨🇨"],"","",["flag-cc"],32,1,63,0],"1f1e8-1f1e9":[["🇨🇩"],"","",["flag-cd"],32,2,63,0],"1f1e8-1f1eb":[["🇨🇫"],"","",["flag-cf"],32,3,63,0],"1f1e8-1f1ec":[["🇨🇬"],"","",["flag-cg"],32,4,63,0],"1f1e8-1f1ed":[["🇨🇭"],"","",["flag-ch"],32,5,63,0],"1f1e8-1f1ee":[["🇨🇮"],"","",["flag-ci"],32,6,63,0],"1f1e8-1f1f0":[["🇨🇰"],"","",["flag-ck"],32,7,63,0],"1f1e8-1f1f1":[["🇨🇱"],"","",["flag-cl"],32,8,63,0],"1f1e8-1f1f2":[["🇨🇲"],"","",["flag-cm"],32,9,63,0],"1f1e8-1f1f3":[["🇨🇳"],"","󾓭",["flag-cn","cn"],32,10,63,0],"1f1e8-1f1f4":[["🇨🇴"],"","",["flag-co"],32,11,63,0],"1f1e8-1f1f5":[["🇨🇵"],"","",["flag-cp"],32,12,29,0],"1f1e8-1f1f7":[["🇨🇷"],"","",["flag-cr"],32,13,63,0],"1f1e8-1f1fa":[["🇨🇺"],"","",["flag-cu"],32,14,63,0],"1f1e8-1f1fb":[["🇨🇻"],"","",["flag-cv"],32,15,63,0],"1f1e8-1f1fc":[["🇨🇼"],"","",["flag-cw"],32,16,63,0],"1f1e8-1f1fd":[["🇨🇽"],"","",["flag-cx"],32,17,63,0],"1f1e8-1f1fe":[["🇨🇾"],"","",["flag-cy"],32,18,63,0],"1f1e8-1f1ff":[["🇨🇿"],"","",["flag-cz"],32,19,63,0],"1f1e9-1f1ea":[["🇩🇪"],"","󾓨",["flag-de","de"],32,20,63,0],"1f1e9-1f1ec":[["🇩🇬"],"","",["flag-dg"],32,21,61,0],"1f1e9-1f1ef":[["🇩🇯"],"","",["flag-dj"],32,22,63,0],"1f1e9-1f1f0":[["🇩🇰"],"","",["flag-dk"],32,23,63,0],"1f1e9-1f1f2":[["🇩🇲"],"","",["flag-dm"],32,24,63,0],"1f1e9-1f1f4":[["🇩🇴"],"","",["flag-do"],32,25,63,0],"1f1e9-1f1ff":[["🇩🇿"],"","",["flag-dz"],32,26,63,0],"1f1ea-1f1e6":[["🇪🇦"],"","",["flag-ea"],32,27,61,0],"1f1ea-1f1e8":[["🇪🇨"],"","",["flag-ec"],32,28,63,0],"1f1ea-1f1ea":[["🇪🇪"],"","",["flag-ee"],32,29,63,0],"1f1ea-1f1ec":[["🇪🇬"],"","",["flag-eg"],32,30,63,0],"1f1ea-1f1ed":[["🇪🇭"],"","",["flag-eh"],32,31,61,0],"1f1ea-1f1f7":[["🇪🇷"],"","",["flag-er"],32,32,63,0],"1f1ea-1f1f8":[["🇪🇸"],"","󾓫",["flag-es","es"],32,33,63,0],"1f1ea-1f1f9":[["🇪🇹"],"","",["flag-et"],32,34,63,0],"1f1ea-1f1fa":[["🇪🇺"],"","",["flag-eu"],32,35,63,0],"1f1eb-1f1ee":[["🇫🇮"],"","",["flag-fi"],32,36,63,0],"1f1eb-1f1ef":[["🇫🇯"],"","",["flag-fj"],32,37,63,0],"1f1eb-1f1f0":[["🇫🇰"],"","",["flag-fk"],32,38,61,0],"1f1eb-1f1f2":[["🇫🇲"],"","",["flag-fm"],32,39,63,0],"1f1eb-1f1f4":[["🇫🇴"],"","",["flag-fo"],32,40,63,0],"1f1eb-1f1f7":[["🇫🇷"],"","󾓧",["flag-fr","fr"],32,41,63,0],"1f1ec-1f1e6":[["🇬🇦"],"","",["flag-ga"],32,42,63,0],"1f1ec-1f1e7":[["🇬🇧"],"","󾓪",["flag-gb","gb","uk"],32,43,63,0],"1f1ec-1f1e9":[["🇬🇩"],"","",["flag-gd"],32,44,63,0],"1f1ec-1f1ea":[["🇬🇪"],"","",["flag-ge"],32,45,63,0],"1f1ec-1f1eb":[["🇬🇫"],"","",["flag-gf"],32,46,61,0],"1f1ec-1f1ec":[["🇬🇬"],"","",["flag-gg"],32,47,63,0],"1f1ec-1f1ed":[["🇬🇭"],"","",["flag-gh"],32,48,63,0],"1f1ec-1f1ee":[["🇬🇮"],"","",["flag-gi"],33,0,63,0],"1f1ec-1f1f1":[["🇬🇱"],"","",["flag-gl"],33,1,63,0],"1f1ec-1f1f2":[["🇬🇲"],"","",["flag-gm"],33,2,63,0],"1f1ec-1f1f3":[["🇬🇳"],"","",["flag-gn"],33,3,63,0],"1f1ec-1f1f5":[["🇬🇵"],"","",["flag-gp"],33,4,61,0],"1f1ec-1f1f6":[["🇬🇶"],"","",["flag-gq"],33,5,63,0],"1f1ec-1f1f7":[["🇬🇷"],"","",["flag-gr"],33,6,63,0],"1f1ec-1f1f8":[["🇬🇸"],"","",["flag-gs"],33,7,61,0],"1f1ec-1f1f9":[["🇬🇹"],"","",["flag-gt"],33,8,63,0],"1f1ec-1f1fa":[["🇬🇺"],"","",["flag-gu"],33,9,63,0],"1f1ec-1f1fc":[["🇬🇼"],"","",["flag-gw"],33,10,63,0],"1f1ec-1f1fe":[["🇬🇾"],"","",["flag-gy"],33,11,63,0],"1f1ed-1f1f0":[["🇭🇰"],"","",["flag-hk"],33,12,63,0],"1f1ed-1f1f2":[["🇭🇲"],"","",["flag-hm"],33,13,61,0],"1f1ed-1f1f3":[["🇭🇳"],"","",["flag-hn"],33,14,63,0],"1f1ed-1f1f7":[["🇭🇷"],"","",["flag-hr"],33,15,63,0],"1f1ed-1f1f9":[["🇭🇹"],"","",["flag-ht"],33,16,63,0],"1f1ed-1f1fa":[["🇭🇺"],"","",["flag-hu"],33,17,63,0],"1f1ee-1f1e8":[["🇮🇨"],"","",["flag-ic"],33,18,63,0],"1f1ee-1f1e9":[["🇮🇩"],"","",["flag-id"],33,19,63,0],"1f1ee-1f1ea":[["🇮🇪"],"","",["flag-ie"],33,20,63,0],"1f1ee-1f1f1":[["🇮🇱"],"","",["flag-il"],33,21,63,0],"1f1ee-1f1f2":[["🇮🇲"],"","",["flag-im"],33,22,63,0],"1f1ee-1f1f3":[["🇮🇳"],"","",["flag-in"],33,23,63,0],"1f1ee-1f1f4":[["🇮🇴"],"","",["flag-io"],33,24,63,0],"1f1ee-1f1f6":[["🇮🇶"],"","",["flag-iq"],33,25,63,0],"1f1ee-1f1f7":[["🇮🇷"],"","",["flag-ir"],33,26,63,0],"1f1ee-1f1f8":[["🇮🇸"],"","",["flag-is"],33,27,63,0],"1f1ee-1f1f9":[["🇮🇹"],"","󾓩",["flag-it","it"],33,28,63,0],"1f1ef-1f1ea":[["🇯🇪"],"","",["flag-je"],33,29,63,0],"1f1ef-1f1f2":[["🇯🇲"],"","",["flag-jm"],33,30,63,0],"1f1ef-1f1f4":[["🇯🇴"],"","",["flag-jo"],33,31,63,0],"1f1ef-1f1f5":[["🇯🇵"],"","󾓥",["flag-jp","jp"],33,32,63,0],"1f1f0-1f1ea":[["🇰🇪"],"","",["flag-ke"],33,33,63,0],"1f1f0-1f1ec":[["🇰🇬"],"","",["flag-kg"],33,34,63,0],"1f1f0-1f1ed":[["🇰🇭"],"","",["flag-kh"],33,35,63,0],"1f1f0-1f1ee":[["🇰🇮"],"","",["flag-ki"],33,36,63,0],"1f1f0-1f1f2":[["🇰🇲"],"","",["flag-km"],33,37,63,0],"1f1f0-1f1f3":[["🇰🇳"],"","",["flag-kn"],33,38,63,0],"1f1f0-1f1f5":[["🇰🇵"],"","",["flag-kp"],33,39,63,0],"1f1f0-1f1f7":[["🇰🇷"],"","󾓮",["flag-kr","kr"],33,40,63,0],"1f1f0-1f1fc":[["🇰🇼"],"","",["flag-kw"],33,41,63,0],"1f1f0-1f1fe":[["🇰🇾"],"","",["flag-ky"],33,42,63,0],"1f1f0-1f1ff":[["🇰🇿"],"","",["flag-kz"],33,43,63,0],"1f1f1-1f1e6":[["🇱🇦"],"","",["flag-la"],33,44,63,0],"1f1f1-1f1e7":[["🇱🇧"],"","",["flag-lb"],33,45,63,0],"1f1f1-1f1e8":[["🇱🇨"],"","",["flag-lc"],33,46,63,0],"1f1f1-1f1ee":[["🇱🇮"],"","",["flag-li"],33,47,63,0],"1f1f1-1f1f0":[["🇱🇰"],"","",["flag-lk"],33,48,63,0],"1f1f1-1f1f7":[["🇱🇷"],"","",["flag-lr"],34,0,63,0],"1f1f1-1f1f8":[["🇱🇸"],"","",["flag-ls"],34,1,63,0],"1f1f1-1f1f9":[["🇱🇹"],"","",["flag-lt"],34,2,63,0],"1f1f1-1f1fa":[["🇱🇺"],"","",["flag-lu"],34,3,63,0],"1f1f1-1f1fb":[["🇱🇻"],"","",["flag-lv"],34,4,63,0],"1f1f1-1f1fe":[["🇱🇾"],"","",["flag-ly"],34,5,63,0],"1f1f2-1f1e6":[["🇲🇦"],"","",["flag-ma"],34,6,63,0],"1f1f2-1f1e8":[["🇲🇨"],"","",["flag-mc"],34,7,63,0],"1f1f2-1f1e9":[["🇲🇩"],"","",["flag-md"],34,8,63,0],"1f1f2-1f1ea":[["🇲🇪"],"","",["flag-me"],34,9,63,0],"1f1f2-1f1eb":[["🇲🇫"],"","",["flag-mf"],34,10,61,0],"1f1f2-1f1ec":[["🇲🇬"],"","",["flag-mg"],34,11,63,0],"1f1f2-1f1ed":[["🇲🇭"],"","",["flag-mh"],34,12,63,0],"1f1f2-1f1f0":[["🇲🇰"],"","",["flag-mk"],34,13,63,0],"1f1f2-1f1f1":[["🇲🇱"],"","",["flag-ml"],34,14,63,0],"1f1f2-1f1f2":[["🇲🇲"],"","",["flag-mm"],34,15,63,0],"1f1f2-1f1f3":[["🇲🇳"],"","",["flag-mn"],34,16,63,0],"1f1f2-1f1f4":[["🇲🇴"],"","",["flag-mo"],34,17,63,0],"1f1f2-1f1f5":[["🇲🇵"],"","",["flag-mp"],34,18,63,0],"1f1f2-1f1f6":[["🇲🇶"],"","",["flag-mq"],34,19,61,0],"1f1f2-1f1f7":[["🇲🇷"],"","",["flag-mr"],34,20,63,0],"1f1f2-1f1f8":[["🇲🇸"],"","",["flag-ms"],34,21,63,0],"1f1f2-1f1f9":[["🇲🇹"],"","",["flag-mt"],34,22,63,0],"1f1f2-1f1fa":[["🇲🇺"],"","",["flag-mu"],34,23,63,0],"1f1f2-1f1fb":[["🇲🇻"],"","",["flag-mv"],34,24,63,0],"1f1f2-1f1fc":[["🇲🇼"],"","",["flag-mw"],34,25,63,0],"1f1f2-1f1fd":[["🇲🇽"],"","",["flag-mx"],34,26,63,0],"1f1f2-1f1fe":[["🇲🇾"],"","",["flag-my"],34,27,63,0],"1f1f2-1f1ff":[["🇲🇿"],"","",["flag-mz"],34,28,63,0],"1f1f3-1f1e6":[["🇳🇦"],"","",["flag-na"],34,29,63,0],"1f1f3-1f1e8":[["🇳🇨"],"","",["flag-nc"],34,30,61,0],"1f1f3-1f1ea":[["🇳🇪"],"","",["flag-ne"],34,31,63,0],"1f1f3-1f1eb":[["🇳🇫"],"","",["flag-nf"],34,32,63,0],"1f1f3-1f1ec":[["🇳🇬"],"","",["flag-ng"],34,33,63,0],"1f1f3-1f1ee":[["🇳🇮"],"","",["flag-ni"],34,34,63,0],"1f1f3-1f1f1":[["🇳🇱"],"","",["flag-nl"],34,35,63,0],"1f1f3-1f1f4":[["🇳🇴"],"","",["flag-no"],34,36,63,0],"1f1f3-1f1f5":[["🇳🇵"],"","",["flag-np"],34,37,63,0],"1f1f3-1f1f7":[["🇳🇷"],"","",["flag-nr"],34,38,63,0],"1f1f3-1f1fa":[["🇳🇺"],"","",["flag-nu"],34,39,63,0],"1f1f3-1f1ff":[["🇳🇿"],"","",["flag-nz"],34,40,63,0],"1f1f4-1f1f2":[["🇴🇲"],"","",["flag-om"],34,41,63,0],"1f1f5-1f1e6":[["🇵🇦"],"","",["flag-pa"],34,42,63,0],"1f1f5-1f1ea":[["🇵🇪"],"","",["flag-pe"],34,43,63,0],"1f1f5-1f1eb":[["🇵🇫"],"","",["flag-pf"],34,44,63,0],"1f1f5-1f1ec":[["🇵🇬"],"","",["flag-pg"],34,45,63,0],"1f1f5-1f1ed":[["🇵🇭"],"","",["flag-ph"],34,46,63,0],"1f1f5-1f1f0":[["🇵🇰"],"","",["flag-pk"],34,47,63,0],"1f1f5-1f1f1":[["🇵🇱"],"","",["flag-pl"],34,48,63,0],"1f1f5-1f1f2":[["🇵🇲"],"","",["flag-pm"],35,0,61,0],"1f1f5-1f1f3":[["🇵🇳"],"","",["flag-pn"],35,1,63,0],"1f1f5-1f1f7":[["🇵🇷"],"","",["flag-pr"],35,2,63,0],"1f1f5-1f1f8":[["🇵🇸"],"","",["flag-ps"],35,3,63,0],"1f1f5-1f1f9":[["🇵🇹"],"","",["flag-pt"],35,4,63,0],"1f1f5-1f1fc":[["🇵🇼"],"","",["flag-pw"],35,5,63,0],"1f1f5-1f1fe":[["🇵🇾"],"","",["flag-py"],35,6,63,0],"1f1f6-1f1e6":[["🇶🇦"],"","",["flag-qa"],35,7,63,0],"1f1f7-1f1ea":[["🇷🇪"],"","",["flag-re"],35,8,61,0],"1f1f7-1f1f4":[["🇷🇴"],"","",["flag-ro"],35,9,63,0],"1f1f7-1f1f8":[["🇷🇸"],"","",["flag-rs"],35,10,63,0],"1f1f7-1f1fa":[["🇷🇺"],"","󾓬",["flag-ru","ru"],35,11,63,0],"1f1f7-1f1fc":[["🇷🇼"],"","",["flag-rw"],35,12,63,0],"1f1f8-1f1e6":[["🇸🇦"],"","",["flag-sa"],35,13,63,0],"1f1f8-1f1e7":[["🇸🇧"],"","",["flag-sb"],35,14,63,0],"1f1f8-1f1e8":[["🇸🇨"],"","",["flag-sc"],35,15,63,0],"1f1f8-1f1e9":[["🇸🇩"],"","",["flag-sd"],35,16,63,0],"1f1f8-1f1ea":[["🇸🇪"],"","",["flag-se"],35,17,63,0],"1f1f8-1f1ec":[["🇸🇬"],"","",["flag-sg"],35,18,63,0],"1f1f8-1f1ed":[["🇸🇭"],"","",["flag-sh"],35,19,63,0],"1f1f8-1f1ee":[["🇸🇮"],"","",["flag-si"],35,20,63,0],"1f1f8-1f1ef":[["🇸🇯"],"","",["flag-sj"],35,21,61,0],"1f1f8-1f1f0":[["🇸🇰"],"","",["flag-sk"],35,22,63,0],"1f1f8-1f1f1":[["🇸🇱"],"","",["flag-sl"],35,23,63,0],"1f1f8-1f1f2":[["🇸🇲"],"","",["flag-sm"],35,24,63,0],"1f1f8-1f1f3":[["🇸🇳"],"","",["flag-sn"],35,25,63,0],"1f1f8-1f1f4":[["🇸🇴"],"","",["flag-so"],35,26,63,0],"1f1f8-1f1f7":[["🇸🇷"],"","",["flag-sr"],35,27,63,0],"1f1f8-1f1f8":[["🇸🇸"],"","",["flag-ss"],35,28,63,0],"1f1f8-1f1f9":[["🇸🇹"],"","",["flag-st"],35,29,63,0],"1f1f8-1f1fb":[["🇸🇻"],"","",["flag-sv"],35,30,63,0],"1f1f8-1f1fd":[["🇸🇽"],"","",["flag-sx"],35,31,63,0],"1f1f8-1f1fe":[["🇸🇾"],"","",["flag-sy"],35,32,63,0],"1f1f8-1f1ff":[["🇸🇿"],"","",["flag-sz"],35,33,63,0],"1f1f9-1f1e6":[["🇹🇦"],"","",["flag-ta"],35,34,63,0],"1f1f9-1f1e8":[["🇹🇨"],"","",["flag-tc"],35,35,63,0],"1f1f9-1f1e9":[["🇹🇩"],"","",["flag-td"],35,36,63,0],"1f1f9-1f1eb":[["🇹🇫"],"","",["flag-tf"],35,37,61,0],"1f1f9-1f1ec":[["🇹🇬"],"","",["flag-tg"],35,38,63,0],"1f1f9-1f1ed":[["🇹🇭"],"","",["flag-th"],35,39,63,0],"1f1f9-1f1ef":[["🇹🇯"],"","",["flag-tj"],35,40,63,0],"1f1f9-1f1f0":[["🇹🇰"],"","",["flag-tk"],35,41,63,0],"1f1f9-1f1f1":[["🇹🇱"],"","",["flag-tl"],35,42,63,0],"1f1f9-1f1f2":[["🇹🇲"],"","",["flag-tm"],35,43,63,0],"1f1f9-1f1f3":[["🇹🇳"],"","",["flag-tn"],35,44,63,0],"1f1f9-1f1f4":[["🇹🇴"],"","",["flag-to"],35,45,63,0],"1f1f9-1f1f7":[["🇹🇷"],"","",["flag-tr"],35,46,63,0],"1f1f9-1f1f9":[["🇹🇹"],"","",["flag-tt"],35,47,63,0],"1f1f9-1f1fb":[["🇹🇻"],"","",["flag-tv"],35,48,63,0],"1f1f9-1f1fc":[["🇹🇼"],"","",["flag-tw"],36,0,63,0],"1f1f9-1f1ff":[["🇹🇿"],"","",["flag-tz"],36,1,63,0],"1f1fa-1f1e6":[["🇺🇦"],"","",["flag-ua"],36,2,63,0],"1f1fa-1f1ec":[["🇺🇬"],"","",["flag-ug"],36,3,63,0],"1f1fa-1f1f2":[["🇺🇲"],"","",["flag-um"],36,4,61,0],"1f1fa-1f1f3":[["🇺🇳"],"","",["flag-un"],36,5,6,0],"1f1fa-1f1f8":[["🇺🇸"],"","󾓦",["flag-us","us"],36,6,63,0],"1f1fa-1f1fe":[["🇺🇾"],"","",["flag-uy"],36,7,63,0],"1f1fa-1f1ff":[["🇺🇿"],"","",["flag-uz"],36,8,63,0],"1f1fb-1f1e6":[["🇻🇦"],"","",["flag-va"],36,9,63,0],"1f1fb-1f1e8":[["🇻🇨"],"","",["flag-vc"],36,10,63,0],"1f1fb-1f1ea":[["🇻🇪"],"","",["flag-ve"],36,11,63,0],"1f1fb-1f1ec":[["🇻🇬"],"","",["flag-vg"],36,12,63,0],"1f1fb-1f1ee":[["🇻🇮"],"","",["flag-vi"],36,13,63,0],"1f1fb-1f1f3":[["🇻🇳"],"","",["flag-vn"],36,14,63,0],"1f1fb-1f1fa":[["🇻🇺"],"","",["flag-vu"],36,15,63,0],"1f1fc-1f1eb":[["🇼🇫"],"","",["flag-wf"],36,16,61,0],"1f1fc-1f1f8":[["🇼🇸"],"","",["flag-ws"],36,17,63,0],"1f1fd-1f1f0":[["🇽🇰"],"","",["flag-xk"],36,18,61,0],"1f1fe-1f1ea":[["🇾🇪"],"","",["flag-ye"],36,19,63,0],"1f1fe-1f1f9":[["🇾🇹"],"","",["flag-yt"],36,20,61,0],"1f1ff-1f1e6":[["🇿🇦"],"","",["flag-za"],36,21,63,0],"1f1ff-1f1f2":[["🇿🇲"],"","",["flag-zm"],36,22,63,0],"1f1ff-1f1fc":[["🇿🇼"],"","",["flag-zw"],36,23,63,0],"1f468-200d-1f33e":[["👨‍🌾"],"","",["male-farmer"],36,24,23,0],"1f468-200d-1f373":[["👨‍🍳"],"","",["male-cook"],36,30,23,0],"1f468-200d-1f393":[["👨‍🎓"],"","",["male-student"],36,36,23,0],"1f468-200d-1f3a4":[["👨‍🎤"],"","",["male-singer"],36,42,23,0],"1f468-200d-1f3a8":[["👨‍🎨"],"","",["male-artist"],36,48,23,0],"1f468-200d-1f3eb":[["👨‍🏫"],"","",["male-teacher"],37,5,23,0],"1f468-200d-1f3ed":[["👨‍🏭"],"","",["male-factory-worker"],37,11,23,0],"1f468-200d-1f466":[["👨‍👦"],"","",["man-boy"],37,17,23,0],"1f468-200d-1f467":[["👨‍👧"],"","",["man-girl"],37,18,23,0],"1f468-200d-1f4bb":[["👨‍💻"],"","",["male-technologist"],37,19,23,0],"1f468-200d-1f4bc":[["👨‍💼"],"","",["male-office-worker"],37,25,23,0],"1f468-200d-1f527":[["👨‍🔧"],"","",["male-mechanic"],37,31,23,0],"1f468-200d-1f52c":[["👨‍🔬"],"","",["male-scientist"],37,37,23,0],"1f468-200d-1f680":[["👨‍🚀"],"","",["male-astronaut"],37,43,23,0],"1f468-200d-1f692":[["👨‍🚒"],"","",["male-firefighter"],38,0,23,0],"1f469-200d-1f33e":[["👩‍🌾"],"","",["female-farmer"],38,6,23,0],"1f469-200d-1f373":[["👩‍🍳"],"","",["female-cook"],38,12,23,0],"1f469-200d-1f393":[["👩‍🎓"],"","",["female-student"],38,18,23,0],"1f469-200d-1f3a4":[["👩‍🎤"],"","",["female-singer"],38,24,23,0],"1f469-200d-1f3a8":[["👩‍🎨"],"","",["female-artist"],38,30,23,0],"1f469-200d-1f3eb":[["👩‍🏫"],"","",["female-teacher"],38,36,23,0],"1f469-200d-1f3ed":[["👩‍🏭"],"","",["female-factory-worker"],38,42,23,0],"1f469-200d-1f466":[["👩‍👦"],"","",["woman-boy"],38,48,23,0],"1f469-200d-1f467":[["👩‍👧"],"","",["woman-girl"],39,0,23,0],"1f469-200d-1f4bb":[["👩‍💻"],"","",["female-technologist"],39,1,23,0],"1f469-200d-1f4bc":[["👩‍💼"],"","",["female-office-worker"],39,7,23,0],"1f469-200d-1f527":[["👩‍🔧"],"","",["female-mechanic"],39,13,23,0],"1f469-200d-1f52c":[["👩‍🔬"],"","",["female-scientist"],39,19,23,0],"1f469-200d-1f680":[["👩‍🚀"],"","",["female-astronaut"],39,25,23,0],"1f469-200d-1f692":[["👩‍🚒"],"","",["female-firefighter"],39,31,23,0],"1f3c3-200d-2640-fe0f":[["🏃‍♀️"],"","",["woman-running"],39,37,5,0],"1f3c3-200d-2642-fe0f":[["🏃‍♂️","🏃"],"","",["man-running","runner","running"],39,43,5,0],"1f3c4-200d-2640-fe0f":[["🏄‍♀️"],"","",["woman-surfing"],40,0,5,0],"1f3c4-200d-2642-fe0f":[["🏄‍♂️","🏄"],"","",["man-surfing","surfer"],40,6,5,0],"1f3ca-200d-2640-fe0f":[["🏊‍♀️"],"","",["woman-swimming"],40,12,5,0],"1f3ca-200d-2642-fe0f":[["🏊‍♂️","🏊"],"","",["man-swimming","swimmer"],40,18,5,0],"1f3cb-fe0f-200d-2640-fe0f":[["🏋️‍♀️"],"","",["woman-lifting-weights"],40,24,5,0],"1f3cb-fe0f-200d-2642-fe0f":[["🏋️‍♂️","🏋️","🏋"],"","",["man-lifting-weights","weight_lifter"],40,30,5,0],"1f3cc-fe0f-200d-2640-fe0f":[["🏌️‍♀️"],"","",["woman-golfing"],40,36,5,0],"1f3cc-fe0f-200d-2642-fe0f":[["🏌️‍♂️","🏌️","🏌"],"","",["man-golfing","golfer"],40,42,5,0],"1f3f3-fe0f-200d-1f308":[["🏳️‍🌈"],"","",["rainbow-flag"],40,48,53,0],"1f441-fe0f-200d-1f5e8-fe0f":[["👁️‍🗨️"],"","",["eye-in-speech-bubble"],41,0,1,0],"1f468-200d-1f466-200d-1f466":[["👨‍👦‍👦"],"","",["man-boy-boy"],41,1,23,0],"1f468-200d-1f467-200d-1f466":[["👨‍👧‍👦"],"","",["man-girl-boy"],41,2,23,0],"1f468-200d-1f467-200d-1f467":[["👨‍👧‍👧"],"","",["man-girl-girl"],41,3,23,0],"1f468-200d-1f468-200d-1f466":[["👨‍👨‍👦"],"","",["man-man-boy"],41,4,63,0],"1f468-200d-1f468-200d-1f466-200d-1f466":[["👨‍👨‍👦‍👦"],"","",["man-man-boy-boy"],41,5,63,0],"1f468-200d-1f468-200d-1f467":[["👨‍👨‍👧"],"","",["man-man-girl"],41,6,63,0],"1f468-200d-1f468-200d-1f467-200d-1f466":[["👨‍👨‍👧‍👦"],"","",["man-man-girl-boy"],41,7,63,0],"1f468-200d-1f468-200d-1f467-200d-1f467":[["👨‍👨‍👧‍👧"],"","",["man-man-girl-girl"],41,8,63,0],"1f468-200d-1f469-200d-1f466":[["👨‍👩‍👦","👪"],"","",["man-woman-boy","family"],41,9,55,0],"1f468-200d-1f469-200d-1f466-200d-1f466":[["👨‍👩‍👦‍👦"],"","",["man-woman-boy-boy"],41,10,63,0],"1f468-200d-1f469-200d-1f467":[["👨‍👩‍👧"],"","",["man-woman-girl"],41,11,63,0],"1f468-200d-1f469-200d-1f467-200d-1f466":[["👨‍👩‍👧‍👦"],"","",["man-woman-girl-boy"],41,12,63,0],"1f468-200d-1f469-200d-1f467-200d-1f467":[["👨‍👩‍👧‍👧"],"","",["man-woman-girl-girl"],41,13,63,0],"1f468-200d-2695-fe0f":[["👨‍⚕️"],"","",["male-doctor"],41,14,5,0],"1f468-200d-2696-fe0f":[["👨‍⚖️"],"","",["male-judge"],41,20,5,0],"1f468-200d-2708-fe0f":[["👨‍✈️"],"","",["male-pilot"],41,26,5,0],"1f468-200d-2764-fe0f-200d-1f468":[["👨‍❤️‍👨"],"","",["man-heart-man"],41,32,53,0],"1f468-200d-2764-fe0f-200d-1f48b-200d-1f468":[["👨‍❤️‍💋‍👨"],"","",["man-kiss-man"],41,33,53,0],"1f469-200d-1f466-200d-1f466":[["👩‍👦‍👦"],"","",["woman-boy-boy"],41,34,23,0],"1f469-200d-1f467-200d-1f466":[["👩‍👧‍👦"],"","",["woman-girl-boy"],41,35,23,0],"1f469-200d-1f467-200d-1f467":[["👩‍👧‍👧"],"","",["woman-girl-girl"],41,36,23,0],"1f469-200d-1f469-200d-1f466":[["👩‍👩‍👦"],"","",["woman-woman-boy"],41,37,63,0],"1f469-200d-1f469-200d-1f466-200d-1f466":[["👩‍👩‍👦‍👦"],"","",["woman-woman-boy-boy"],41,38,63,0],"1f469-200d-1f469-200d-1f467":[["👩‍👩‍👧"],"","",["woman-woman-girl"],41,39,63,0],"1f469-200d-1f469-200d-1f467-200d-1f466":[["👩‍👩‍👧‍👦"],"","",["woman-woman-girl-boy"],41,40,63,0],"1f469-200d-1f469-200d-1f467-200d-1f467":[["👩‍👩‍👧‍👧"],"","",["woman-woman-girl-girl"],41,41,63,0],"1f469-200d-2695-fe0f":[["👩‍⚕️"],"","",["female-doctor"],41,42,5,0],"1f469-200d-2696-fe0f":[["👩‍⚖️"],"","",["female-judge"],41,48,5,0],"1f469-200d-2708-fe0f":[["👩‍✈️"],"","",["female-pilot"],42,5,5,0],"1f469-200d-2764-fe0f-200d-1f468":[["👩‍❤️‍👨","💑"],"","",["woman-heart-man","couple_with_heart"],42,11,21,0],"1f469-200d-2764-fe0f-200d-1f469":[["👩‍❤️‍👩"],"","",["woman-heart-woman"],42,12,53,0],"1f469-200d-2764-fe0f-200d-1f48b-200d-1f468":[["👩‍❤️‍💋‍👨","💏"],"","",["woman-kiss-man","couplekiss"],42,13,21,0],"1f469-200d-2764-fe0f-200d-1f48b-200d-1f469":[["👩‍❤️‍💋‍👩"],"","",["woman-kiss-woman"],42,14,53,0],"1f46e-200d-2640-fe0f":[["👮‍♀️"],"","",["female-police-officer"],42,15,5,0],"1f46e-200d-2642-fe0f":[["👮‍♂️","👮"],"","",["male-police-officer","cop"],42,21,5,0],"1f46f-200d-2640-fe0f":[["👯‍♀️","👯"],"","",["woman-with-bunny-ears-partying","dancers"],42,27,5,0],"1f46f-200d-2642-fe0f":[["👯‍♂️"],"","",["man-with-bunny-ears-partying"],42,28,5,0],"1f471-200d-2640-fe0f":[["👱‍♀️"],"","",["blond-haired-woman"],42,29,5,0],"1f471-200d-2642-fe0f":[["👱‍♂️","👱"],"","",["blond-haired-man","person_with_blond_hair"],42,35,5,0],"1f473-200d-2640-fe0f":[["👳‍♀️"],"","",["woman-wearing-turban"],42,41,5,0],"1f473-200d-2642-fe0f":[["👳‍♂️","👳"],"","",["man-wearing-turban","man_with_turban"],42,47,5,0],"1f477-200d-2640-fe0f":[["👷‍♀️"],"","",["female-construction-worker"],43,4,5,0],"1f477-200d-2642-fe0f":[["👷‍♂️","👷"],"","",["male-construction-worker","construction_worker"],43,10,5,0],"1f481-200d-2640-fe0f":[["💁‍♀️","💁"],"","",["woman-tipping-hand","information_desk_person"],43,16,5,0],"1f481-200d-2642-fe0f":[["💁‍♂️"],"","",["man-tipping-hand"],43,22,5,0],"1f482-200d-2640-fe0f":[["💂‍♀️"],"","",["female-guard"],43,28,5,0],"1f482-200d-2642-fe0f":[["💂‍♂️","💂"],"","",["male-guard","guardsman"],43,34,5,0],"1f486-200d-2640-fe0f":[["💆‍♀️","💆"],"","",["woman-getting-massage","massage"],43,40,5,0],"1f486-200d-2642-fe0f":[["💆‍♂️"],"","",["man-getting-massage"],43,46,5,0],"1f487-200d-2640-fe0f":[["💇‍♀️","💇"],"","",["woman-getting-haircut","haircut"],44,3,5,0],"1f487-200d-2642-fe0f":[["💇‍♂️"],"","",["man-getting-haircut"],44,9,5,0],"1f575-fe0f-200d-2640-fe0f":[["🕵️‍♀️"],"","",["female-detective"],44,15,5,0],"1f575-fe0f-200d-2642-fe0f":[["🕵️‍♂️","🕵️","🕵"],"","",["male-detective","sleuth_or_spy"],44,21,5,0],"1f645-200d-2640-fe0f":[["🙅‍♀️","🙅"],"","",["woman-gesturing-no","no_good"],44,27,5,0],"1f645-200d-2642-fe0f":[["🙅‍♂️"],"","",["man-gesturing-no"],44,33,5,0],"1f646-200d-2640-fe0f":[["🙆‍♀️","🙆"],"","",["woman-gesturing-ok","ok_woman"],44,39,5,0],"1f646-200d-2642-fe0f":[["🙆‍♂️"],"","",["man-gesturing-ok"],44,45,5,0],"1f647-200d-2640-fe0f":[["🙇‍♀️"],"","",["woman-bowing"],45,2,5,0],"1f647-200d-2642-fe0f":[["🙇‍♂️","🙇"],"","",["man-bowing","bow"],45,8,5,0],"1f64b-200d-2640-fe0f":[["🙋‍♀️","🙋"],"","",["woman-raising-hand","raising_hand"],45,14,5,0],"1f64b-200d-2642-fe0f":[["🙋‍♂️"],"","",["man-raising-hand"],45,20,5,0],"1f64d-200d-2640-fe0f":[["🙍‍♀️","🙍"],"","",["woman-frowning","person_frowning"],45,26,5,0],"1f64d-200d-2642-fe0f":[["🙍‍♂️"],"","",["man-frowning"],45,32,5,0],"1f64e-200d-2640-fe0f":[["🙎‍♀️","🙎"],"","",["woman-pouting","person_with_pouting_face"],45,38,5,0],"1f64e-200d-2642-fe0f":[["🙎‍♂️"],"","",["man-pouting"],45,44,5,0],"1f6a3-200d-2640-fe0f":[["🚣‍♀️"],"","",["woman-rowing-boat"],46,1,5,0],"1f6a3-200d-2642-fe0f":[["🚣‍♂️","🚣"],"","",["man-rowing-boat","rowboat"],46,7,5,0],"1f6b4-200d-2640-fe0f":[["🚴‍♀️"],"","",["woman-biking"],46,13,5,0],"1f6b4-200d-2642-fe0f":[["🚴‍♂️","🚴"],"","",["man-biking","bicyclist"],46,19,5,0],"1f6b5-200d-2640-fe0f":[["🚵‍♀️"],"","",["woman-mountain-biking"],46,25,5,0],"1f6b5-200d-2642-fe0f":[["🚵‍♂️","🚵"],"","",["man-mountain-biking","mountain_bicyclist"],46,31,5,0],"1f6b6-200d-2640-fe0f":[["🚶‍♀️"],"","",["woman-walking"],46,37,5,0],"1f6b6-200d-2642-fe0f":[["🚶‍♂️","🚶"],"","",["man-walking","walking"],46,43,5,0],"1f926-200d-2640-fe0f":[["🤦‍♀️"],"","",["woman-facepalming"],47,0,5,0],"1f926-200d-2642-fe0f":[["🤦‍♂️"],"","",["man-facepalming"],47,6,5,0],"1f937-200d-2640-fe0f":[["🤷‍♀️"],"","",["woman-shrugging"],47,12,5,0],"1f937-200d-2642-fe0f":[["🤷‍♂️"],"","",["man-shrugging"],47,18,5,0],"1f938-200d-2640-fe0f":[["🤸‍♀️"],"","",["woman-cartwheeling"],47,24,5,0],"1f938-200d-2642-fe0f":[["🤸‍♂️"],"","",["man-cartwheeling"],47,30,5,0],"1f939-200d-2640-fe0f":[["🤹‍♀️"],"","",["woman-juggling"],47,36,5,0],"1f939-200d-2642-fe0f":[["🤹‍♂️"],"","",["man-juggling"],47,42,5,0],"1f93c-200d-2640-fe0f":[["🤼‍♀️"],"","",["woman-wrestling"],47,48,5,0],"1f93c-200d-2642-fe0f":[["🤼‍♂️"],"","",["man-wrestling"],48,0,5,0],"1f93d-200d-2640-fe0f":[["🤽‍♀️"],"","",["woman-playing-water-polo"],48,1,5,0],"1f93d-200d-2642-fe0f":[["🤽‍♂️"],"","",["man-playing-water-polo"],48,7,5,0],"1f93e-200d-2640-fe0f":[["🤾‍♀️"],"","",["woman-playing-handball"],48,13,5,0],"1f93e-200d-2642-fe0f":[["🤾‍♂️"],"","",["man-playing-handball"],48,19,5,0],"26f9-fe0f-200d-2640-fe0f":[["⛹️‍♀️"],"","",["woman-bouncing-ball"],48,25,5,0],"26f9-fe0f-200d-2642-fe0f":[["⛹️‍♂️","⛹️","⛹"],"","",["man-bouncing-ball","person_with_ball"],48,31,5,0]},s.prototype.emoticons_data={"<3":"heart",":o)":"monkey_face","</3":"broken_heart","=)":"smiley","=-)":"smiley","C:":"smile","c:":"smile",":D":"smile",":-D":"smile",":>":"laughing",":->":"laughing",";)":"wink",";-)":"wink","8)":"sunglasses",":|":"neutral_face",":-|":"neutral_face",":\\":"confused",":-\\":"confused",":/":"confused",":-/":"confused",":*":"kissing_heart",":-*":"kissing_heart",":p":"stuck_out_tongue",":-p":"stuck_out_tongue",":P":"stuck_out_tongue",":-P":"stuck_out_tongue",":b":"stuck_out_tongue",":-b":"stuck_out_tongue",";p":"stuck_out_tongue_winking_eye",";-p":"stuck_out_tongue_winking_eye",";b":"stuck_out_tongue_winking_eye",";-b":"stuck_out_tongue_winking_eye",";P":"stuck_out_tongue_winking_eye",";-P":"stuck_out_tongue_winking_eye","):":"disappointed",":(":"disappointed",":-(":"disappointed",">:(":"angry",">:-(":"angry",":'(":"cry","D:":"anguished",":o":"open_mouth",":-o":"open_mouth",":O":"open_mouth",":-O":"open_mouth",":)":"slightly_smiling_face","(:":"slightly_smiling_face",":-)":"slightly_smiling_face"},s.prototype.variations_data={"261d":{"1f3fb":["261d-1f3fb",1,3,63,["☝🏻"]],"1f3fc":["261d-1f3fc",1,4,63,["☝🏼"]],"1f3fd":["261d-1f3fd",1,5,63,["☝🏽"]],"1f3fe":["261d-1f3fe",1,6,63,["☝🏾"]],"1f3ff":["261d-1f3ff",1,7,63,["☝🏿"]]},"270a":{"1f3fb":["270a-1f3fb",2,38,63,["✊🏻"]],"1f3fc":["270a-1f3fc",2,39,63,["✊🏼"]],"1f3fd":["270a-1f3fd",2,40,63,["✊🏽"]],"1f3fe":["270a-1f3fe",2,41,63,["✊🏾"]],"1f3ff":["270a-1f3ff",2,42,63,["✊🏿"]]},"270b":{"1f3fb":["270b-1f3fb",2,44,63,["✋🏻"]],"1f3fc":["270b-1f3fc",2,45,63,["✋🏼"]],"1f3fd":["270b-1f3fd",2,46,63,["✋🏽"]],"1f3fe":["270b-1f3fe",2,47,63,["✋🏾"]],"1f3ff":["270b-1f3ff",2,48,63,["✋🏿"]]},"270c":{"1f3fb":["270c-1f3fb",3,1,63,["✌🏻"]],"1f3fc":["270c-1f3fc",3,2,63,["✌🏼"]],"1f3fd":["270c-1f3fd",3,3,63,["✌🏽"]],"1f3fe":["270c-1f3fe",3,4,63,["✌🏾"]],"1f3ff":["270c-1f3ff",3,5,63,["✌🏿"]]},"270d":{"1f3fb":["270d-1f3fb",3,7,31,["✍🏻"]],"1f3fc":["270d-1f3fc",3,8,31,["✍🏼"]],"1f3fd":["270d-1f3fd",3,9,31,["✍🏽"]],"1f3fe":["270d-1f3fe",3,10,31,["✍🏾"]],"1f3ff":["270d-1f3ff",3,11,31,["✍🏿"]]},"1f385":{"1f3fb":["1f385-1f3fb",7,18,63,["🎅🏻"]],"1f3fc":["1f385-1f3fc",7,19,63,["🎅🏼"]],"1f3fd":["1f385-1f3fd",7,20,63,["🎅🏽"]],"1f3fe":["1f385-1f3fe",7,21,63,["🎅🏾"]],"1f3ff":["1f385-1f3ff",7,22,63,["🎅🏿"]]},"1f3c2":{"1f3fb":["1f3c2-1f3fb",8,30,53,["🏂🏻"]],"1f3fc":["1f3c2-1f3fc",8,31,53,["🏂🏼"]],"1f3fd":["1f3c2-1f3fd",8,32,53,["🏂🏽"]],"1f3fe":["1f3c2-1f3fe",8,33,53,["🏂🏾"]],"1f3ff":["1f3c2-1f3ff",8,34,53,["🏂🏿"]]},"1f3c7":{"1f3fb":["1f3c7-1f3fb",9,1,61,["🏇🏻"]],"1f3fc":["1f3c7-1f3fc",9,2,61,["🏇🏼"]],"1f3fd":["1f3c7-1f3fd",9,3,61,["🏇🏽"]],"1f3fe":["1f3c7-1f3fe",9,4,61,["🏇🏾"]],"1f3ff":["1f3c7-1f3ff",9,5,61,["🏇🏿"]]},"1f442":{"1f3fb":["1f442-1f3fb",11,43,63,["👂🏻"]],"1f3fc":["1f442-1f3fc",11,44,63,["👂🏼"]],"1f3fd":["1f442-1f3fd",11,45,63,["👂🏽"]],"1f3fe":["1f442-1f3fe",11,46,63,["👂🏾"]],"1f3ff":["1f442-1f3ff",11,47,63,["👂🏿"]]},"1f443":{"1f3fb":["1f443-1f3fb",12,0,63,["👃🏻"]],"1f3fc":["1f443-1f3fc",12,1,63,["👃🏼"]],"1f3fd":["1f443-1f3fd",12,2,63,["👃🏽"]],"1f3fe":["1f443-1f3fe",12,3,63,["👃🏾"]],"1f3ff":["1f443-1f3ff",12,4,63,["👃🏿"]]},"1f446":{"1f3fb":["1f446-1f3fb",12,8,63,["👆🏻"]],"1f3fc":["1f446-1f3fc",12,9,63,["👆🏼"]],"1f3fd":["1f446-1f3fd",12,10,63,["👆🏽"]],"1f3fe":["1f446-1f3fe",12,11,63,["👆🏾"]],"1f3ff":["1f446-1f3ff",12,12,63,["👆🏿"]]},"1f447":{"1f3fb":["1f447-1f3fb",12,14,63,["👇🏻"]],"1f3fc":["1f447-1f3fc",12,15,63,["👇🏼"]],"1f3fd":["1f447-1f3fd",12,16,63,["👇🏽"]],"1f3fe":["1f447-1f3fe",12,17,63,["👇🏾"]],"1f3ff":["1f447-1f3ff",12,18,63,["👇🏿"]]},"1f448":{"1f3fb":["1f448-1f3fb",12,20,63,["👈🏻"]],"1f3fc":["1f448-1f3fc",12,21,63,["👈🏼"]],"1f3fd":["1f448-1f3fd",12,22,63,["👈🏽"]],"1f3fe":["1f448-1f3fe",12,23,63,["👈🏾"]],"1f3ff":["1f448-1f3ff",12,24,63,["👈🏿"]]},"1f449":{"1f3fb":["1f449-1f3fb",12,26,63,["👉🏻"]],"1f3fc":["1f449-1f3fc",12,27,63,["👉🏼"]],"1f3fd":["1f449-1f3fd",12,28,63,["👉🏽"]],"1f3fe":["1f449-1f3fe",12,29,63,["👉🏾"]],"1f3ff":["1f449-1f3ff",12,30,63,["👉🏿"]]},"1f44a":{"1f3fb":["1f44a-1f3fb",12,32,63,["👊🏻"]],"1f3fc":["1f44a-1f3fc",12,33,63,["👊🏼"]],"1f3fd":["1f44a-1f3fd",12,34,63,["👊🏽"]],"1f3fe":["1f44a-1f3fe",12,35,63,["👊🏾"]],"1f3ff":["1f44a-1f3ff",12,36,63,["👊🏿"]]},"1f44b":{"1f3fb":["1f44b-1f3fb",12,38,63,["👋🏻"]],"1f3fc":["1f44b-1f3fc",12,39,63,["👋🏼"]],"1f3fd":["1f44b-1f3fd",12,40,63,["👋🏽"]],"1f3fe":["1f44b-1f3fe",12,41,63,["👋🏾"]],"1f3ff":["1f44b-1f3ff",12,42,63,["👋🏿"]]},"1f44c":{"1f3fb":["1f44c-1f3fb",12,44,63,["👌🏻"]],"1f3fc":["1f44c-1f3fc",12,45,63,["👌🏼"]],"1f3fd":["1f44c-1f3fd",12,46,63,["👌🏽"]],"1f3fe":["1f44c-1f3fe",12,47,63,["👌🏾"]],"1f3ff":["1f44c-1f3ff",12,48,63,["👌🏿"]]},"1f44d":{"1f3fb":["1f44d-1f3fb",13,1,63,["👍🏻"]],"1f3fc":["1f44d-1f3fc",13,2,63,["👍🏼"]],"1f3fd":["1f44d-1f3fd",13,3,63,["👍🏽"]],"1f3fe":["1f44d-1f3fe",13,4,63,["👍🏾"]],"1f3ff":["1f44d-1f3ff",13,5,63,["👍🏿"]]},"1f44e":{"1f3fb":["1f44e-1f3fb",13,7,63,["👎🏻"]],"1f3fc":["1f44e-1f3fc",13,8,63,["👎🏼"]],"1f3fd":["1f44e-1f3fd",13,9,63,["👎🏽"]],"1f3fe":["1f44e-1f3fe",13,10,63,["👎🏾"]],"1f3ff":["1f44e-1f3ff",13,11,63,["👎🏿"]]},"1f44f":{"1f3fb":["1f44f-1f3fb",13,13,63,["👏🏻"]],"1f3fc":["1f44f-1f3fc",13,14,63,["👏🏼"]],"1f3fd":["1f44f-1f3fd",13,15,63,["👏🏽"]],"1f3fe":["1f44f-1f3fe",13,16,63,["👏🏾"]],"1f3ff":["1f44f-1f3ff",13,17,63,["👏🏿"]]},"1f450":{"1f3fb":["1f450-1f3fb",13,19,63,["👐🏻"]],"1f3fc":["1f450-1f3fc",13,20,63,["👐🏼"]],"1f3fd":["1f450-1f3fd",13,21,63,["👐🏽"]],"1f3fe":["1f450-1f3fe",13,22,63,["👐🏾"]],"1f3ff":["1f450-1f3ff",13,23,63,["👐🏿"]]},"1f466":{"1f3fb":["1f466-1f3fb",13,46,63,["👦🏻"]],"1f3fc":["1f466-1f3fc",13,47,63,["👦🏼"]],"1f3fd":["1f466-1f3fd",13,48,63,["👦🏽"]],"1f3fe":["1f466-1f3fe",14,0,63,["👦🏾"]],"1f3ff":["1f466-1f3ff",14,1,63,["👦🏿"]]},"1f467":{"1f3fb":["1f467-1f3fb",14,3,63,["👧🏻"]],"1f3fc":["1f467-1f3fc",14,4,63,["👧🏼"]],"1f3fd":["1f467-1f3fd",14,5,63,["👧🏽"]],"1f3fe":["1f467-1f3fe",14,6,63,["👧🏾"]],"1f3ff":["1f467-1f3ff",14,7,63,["👧🏿"]]},"1f468":{"1f3fb":["1f468-1f3fb",14,9,63,["👨🏻"]],"1f3fc":["1f468-1f3fc",14,10,63,["👨🏼"]],"1f3fd":["1f468-1f3fd",14,11,63,["👨🏽"]],"1f3fe":["1f468-1f3fe",14,12,63,["👨🏾"]],"1f3ff":["1f468-1f3ff",14,13,63,["👨🏿"]]},"1f469":{"1f3fb":["1f469-1f3fb",14,15,63,["👩🏻"]],"1f3fc":["1f469-1f3fc",14,16,63,["👩🏼"]],"1f3fd":["1f469-1f3fd",14,17,63,["👩🏽"]],"1f3fe":["1f469-1f3fe",14,18,63,["👩🏾"]],"1f3ff":["1f469-1f3ff",14,19,63,["👩🏿"]]},"1f470":{"1f3fb":["1f470-1f3fb",14,32,63,["👰🏻"]],"1f3fc":["1f470-1f3fc",14,33,63,["👰🏼"]],"1f3fd":["1f470-1f3fd",14,34,63,["👰🏽"]],"1f3fe":["1f470-1f3fe",14,35,63,["👰🏾"]],"1f3ff":["1f470-1f3ff",14,36,63,["👰🏿"]]},"1f472":{"1f3fb":["1f472-1f3fb",14,44,63,["👲🏻"]],"1f3fc":["1f472-1f3fc",14,45,63,["👲🏼"]],"1f3fd":["1f472-1f3fd",14,46,63,["👲🏽"]],"1f3fe":["1f472-1f3fe",14,47,63,["👲🏾"]],"1f3ff":["1f472-1f3ff",14,48,63,["👲🏿"]]},"1f474":{"1f3fb":["1f474-1f3fb",15,7,63,["👴🏻"]],"1f3fc":["1f474-1f3fc",15,8,63,["👴🏼"]],"1f3fd":["1f474-1f3fd",15,9,63,["👴🏽"]],"1f3fe":["1f474-1f3fe",15,10,63,["👴🏾"]],"1f3ff":["1f474-1f3ff",15,11,63,["👴🏿"]]},"1f475":{"1f3fb":["1f475-1f3fb",15,13,63,["👵🏻"]],"1f3fc":["1f475-1f3fc",15,14,63,["👵🏼"]],"1f3fd":["1f475-1f3fd",15,15,63,["👵🏽"]],"1f3fe":["1f475-1f3fe",15,16,63,["👵🏾"]],"1f3ff":["1f475-1f3ff",15,17,63,["👵🏿"]]},"1f476":{"1f3fb":["1f476-1f3fb",15,19,63,["👶🏻"]],"1f3fc":["1f476-1f3fc",15,20,63,["👶🏼"]],"1f3fd":["1f476-1f3fd",15,21,63,["👶🏽"]],"1f3fe":["1f476-1f3fe",15,22,63,["👶🏾"]],"1f3ff":["1f476-1f3ff",15,23,63,["👶🏿"]]},"1f478":{"1f3fb":["1f478-1f3fb",15,31,63,["👸🏻"]],"1f3fc":["1f478-1f3fc",15,32,63,["👸🏼"]],"1f3fd":["1f478-1f3fd",15,33,63,["👸🏽"]],"1f3fe":["1f478-1f3fe",15,34,63,["👸🏾"]],"1f3ff":["1f478-1f3ff",15,35,63,["👸🏿"]]},"1f47c":{"1f3fb":["1f47c-1f3fb",15,40,63,["👼🏻"]],"1f3fc":["1f47c-1f3fc",15,41,63,["👼🏼"]],"1f3fd":["1f47c-1f3fd",15,42,63,["👼🏽"]],"1f3fe":["1f47c-1f3fe",15,43,63,["👼🏾"]],"1f3ff":["1f47c-1f3ff",15,44,63,["👼🏿"]]},"1f483":{"1f3fb":["1f483-1f3fb",16,13,63,["💃🏻"]],"1f3fc":["1f483-1f3fc",16,14,63,["💃🏼"]],"1f3fd":["1f483-1f3fd",16,15,63,["💃🏽"]],"1f3fe":["1f483-1f3fe",16,16,63,["💃🏾"]],"1f3ff":["1f483-1f3ff",16,17,63,["💃🏿"]]},"1f485":{"1f3fb":["1f485-1f3fb",16,20,63,["💅🏻"]],"1f3fc":["1f485-1f3fc",16,21,63,["💅🏼"]],"1f3fd":["1f485-1f3fd",16,22,63,["💅🏽"]],"1f3fe":["1f485-1f3fe",16,23,63,["💅🏾"]],"1f3ff":["1f485-1f3ff",16,24,63,["💅🏿"]]},"1f4aa":{"1f3fb":["1f4aa-1f3fb",17,23,63,["💪🏻"]],"1f3fc":["1f4aa-1f3fc",17,24,63,["💪🏼"]],"1f3fd":["1f4aa-1f3fd",17,25,63,["💪🏽"]],"1f3fe":["1f4aa-1f3fe",17,26,63,["💪🏾"]],"1f3ff":["1f4aa-1f3ff",17,27,63,["💪🏿"]]},"1f574":{"1f3fb":["1f574-1f3fb",21,12,21,["🕴🏻"]],"1f3fc":["1f574-1f3fc",21,13,21,["🕴🏼"]],"1f3fd":["1f574-1f3fd",21,14,21,["🕴🏽"]],"1f3fe":["1f574-1f3fe",21,15,21,["🕴🏾"]],"1f3ff":["1f574-1f3ff",21,16,21,["🕴🏿"]]},"1f57a":{"1f3fb":["1f57a-1f3fb",21,28,31,["🕺🏻"]],"1f3fc":["1f57a-1f3fc",21,29,31,["🕺🏼"]],"1f3fd":["1f57a-1f3fd",21,30,31,["🕺🏽"]],"1f3fe":["1f57a-1f3fe",21,31,31,["🕺🏾"]],"1f3ff":["1f57a-1f3ff",21,32,31,["🕺🏿"]]},"1f590":{"1f3fb":["1f590-1f3fb",21,39,31,["🖐🏻"]],"1f3fc":["1f590-1f3fc",21,40,31,["🖐🏼"]],"1f3fd":["1f590-1f3fd",21,41,31,["🖐🏽"]],"1f3fe":["1f590-1f3fe",21,42,31,["🖐🏾"]],"1f3ff":["1f590-1f3ff",21,43,31,["🖐🏿"]]},"1f595":{"1f3fb":["1f595-1f3fb",21,45,31,["🖕🏻"]],"1f3fc":["1f595-1f3fc",21,46,31,["🖕🏼"]],"1f3fd":["1f595-1f3fd",21,47,31,["🖕🏽"]],"1f3fe":["1f595-1f3fe",21,48,31,["🖕🏾"]],"1f3ff":["1f595-1f3ff",22,0,31,["🖕🏿"]]},"1f596":{"1f3fb":["1f596-1f3fb",22,2,31,["🖖🏻"]],"1f3fc":["1f596-1f3fc",22,3,31,["🖖🏼"]],"1f3fd":["1f596-1f3fd",22,4,31,["🖖🏽"]],"1f3fe":["1f596-1f3fe",22,5,31,["🖖🏾"]],"1f3ff":["1f596-1f3ff",22,6,31,["🖖🏿"]]},"1f64c":{"1f3fb":["1f64c-1f3fb",24,32,63,["🙌🏻"]],"1f3fc":["1f64c-1f3fc",24,33,63,["🙌🏼"]],"1f3fd":["1f64c-1f3fd",24,34,63,["🙌🏽"]],"1f3fe":["1f64c-1f3fe",24,35,63,["🙌🏾"]],"1f3ff":["1f64c-1f3ff",24,36,63,["🙌🏿"]]},"1f64f":{"1f3fb":["1f64f-1f3fb",25,1,63,["🙏🏻"]],"1f3fc":["1f64f-1f3fc",25,2,63,["🙏🏼"]],"1f3fd":["1f64f-1f3fd",25,3,63,["🙏🏽"]],"1f3fe":["1f64f-1f3fe",25,4,63,["🙏🏾"]],"1f3ff":["1f64f-1f3ff",25,5,63,["🙏🏿"]]},"1f6c0":{"1f3fb":["1f6c0-1f3fb",26,42,63,["🛀🏻"]],"1f3fc":["1f6c0-1f3fc",26,43,63,["🛀🏼"]],"1f3fd":["1f6c0-1f3fd",26,44,63,["🛀🏽"]],"1f3fe":["1f6c0-1f3fe",26,45,63,["🛀🏾"]],"1f3ff":["1f6c0-1f3ff",26,46,63,["🛀🏿"]]},"1f6cc":{"1f3fb":["1f6cc-1f3fb",27,5,21,["🛌🏻"]],"1f3fc":["1f6cc-1f3fc",27,6,21,["🛌🏼"]],"1f3fd":["1f6cc-1f3fd",27,7,21,["🛌🏽"]],"1f3fe":["1f6cc-1f3fe",27,8,21,["🛌🏾"]],"1f3ff":["1f6cc-1f3ff",27,9,21,["🛌🏿"]]},"1f918":{"1f3fb":["1f918-1f3fb",27,39,31,["🤘🏻"]],"1f3fc":["1f918-1f3fc",27,40,31,["🤘🏼"]],"1f3fd":["1f918-1f3fd",27,41,31,["🤘🏽"]],"1f3fe":["1f918-1f3fe",27,42,31,["🤘🏾"]],"1f3ff":["1f918-1f3ff",27,43,31,["🤘🏿"]]},"1f919":{"1f3fb":["1f919-1f3fb",27,45,31,["🤙🏻"]],"1f3fc":["1f919-1f3fc",27,46,31,["🤙🏼"]],"1f3fd":["1f919-1f3fd",27,47,31,["🤙🏽"]],"1f3fe":["1f919-1f3fe",27,48,31,["🤙🏾"]],"1f3ff":["1f919-1f3ff",28,0,31,["🤙🏿"]]},"1f91a":{"1f3fb":["1f91a-1f3fb",28,2,31,["🤚🏻"]],"1f3fc":["1f91a-1f3fc",28,3,31,["🤚🏼"]],"1f3fd":["1f91a-1f3fd",28,4,31,["🤚🏽"]],"1f3fe":["1f91a-1f3fe",28,5,31,["🤚🏾"]],"1f3ff":["1f91a-1f3ff",28,6,31,["🤚🏿"]]},"1f91b":{"1f3fb":["1f91b-1f3fb",28,8,31,["🤛🏻"]],"1f3fc":["1f91b-1f3fc",28,9,31,["🤛🏼"]],"1f3fd":["1f91b-1f3fd",28,10,31,["🤛🏽"]],"1f3fe":["1f91b-1f3fe",28,11,31,["🤛🏾"]],"1f3ff":["1f91b-1f3ff",28,12,31,["🤛🏿"]]},"1f91c":{"1f3fb":["1f91c-1f3fb",28,14,31,["🤜🏻"]],"1f3fc":["1f91c-1f3fc",28,15,31,["🤜🏼"]],"1f3fd":["1f91c-1f3fd",28,16,31,["🤜🏽"]],"1f3fe":["1f91c-1f3fe",28,17,31,["🤜🏾"]],"1f3ff":["1f91c-1f3ff",28,18,31,["🤜🏿"]]},"1f91e":{"1f3fb":["1f91e-1f3fb",28,21,31,["🤞🏻"]],"1f3fc":["1f91e-1f3fc",28,22,31,["🤞🏼"]],"1f3fd":["1f91e-1f3fd",28,23,31,["🤞🏽"]],"1f3fe":["1f91e-1f3fe",28,24,31,["🤞🏾"]],"1f3ff":["1f91e-1f3ff",28,25,31,["🤞🏿"]]},"1f926":{"1f3fb":["1f926-1f3fb",28,33,31,["🤦🏻"]],"1f3fc":["1f926-1f3fc",28,34,31,["🤦🏼"]],"1f3fd":["1f926-1f3fd",28,35,31,["🤦🏽"]],"1f3fe":["1f926-1f3fe",28,36,31,["🤦🏾"]],"1f3ff":["1f926-1f3ff",28,37,31,["🤦🏿"]]},"1f930":{"1f3fb":["1f930-1f3fb",28,40,31,["🤰🏻"]],"1f3fc":["1f930-1f3fc",28,41,31,["🤰🏼"]],"1f3fd":["1f930-1f3fd",28,42,31,["🤰🏽"]],"1f3fe":["1f930-1f3fe",28,43,31,["🤰🏾"]],"1f3ff":["1f930-1f3ff",28,44,31,["🤰🏿"]]},"1f933":{"1f3fb":["1f933-1f3fb",28,46,31,["🤳🏻"]],"1f3fc":["1f933-1f3fc",28,47,31,["🤳🏼"]],"1f3fd":["1f933-1f3fd",28,48,31,["🤳🏽"]],"1f3fe":["1f933-1f3fe",29,0,31,["🤳🏾"]],"1f3ff":["1f933-1f3ff",29,1,31,["🤳🏿"]]},"1f934":{"1f3fb":["1f934-1f3fb",29,3,31,["🤴🏻"]],"1f3fc":["1f934-1f3fc",29,4,31,["🤴🏼"]],"1f3fd":["1f934-1f3fd",29,5,31,["🤴🏽"]],"1f3fe":["1f934-1f3fe",29,6,31,["🤴🏾"]],"1f3ff":["1f934-1f3ff",29,7,31,["🤴🏿"]]},"1f935":{"1f3fb":["1f935-1f3fb",29,9,31,["🤵🏻"]],"1f3fc":["1f935-1f3fc",29,10,31,["🤵🏼"]],"1f3fd":["1f935-1f3fd",29,11,31,["🤵🏽"]],"1f3fe":["1f935-1f3fe",29,12,31,["🤵🏾"]],"1f3ff":["1f935-1f3ff",29,13,31,["🤵🏿"]]},"1f936":{"1f3fb":["1f936-1f3fb",29,15,31,["🤶🏻"]],"1f3fc":["1f936-1f3fc",29,16,31,["🤶🏼"]],"1f3fd":["1f936-1f3fd",29,17,31,["🤶🏽"]],"1f3fe":["1f936-1f3fe",29,18,31,["🤶🏾"]],"1f3ff":["1f936-1f3ff",29,19,31,["🤶🏿"]]},"1f937":{"1f3fb":["1f937-1f3fb",29,21,31,["🤷🏻"]],"1f3fc":["1f937-1f3fc",29,22,31,["🤷🏼"]],"1f3fd":["1f937-1f3fd",29,23,31,["🤷🏽"]],"1f3fe":["1f937-1f3fe",29,24,31,["🤷🏾"]],"1f3ff":["1f937-1f3ff",29,25,31,["🤷🏿"]]},"1f938":{"1f3fb":["1f938-1f3fb",29,27,31,["🤸🏻"]],"1f3fc":["1f938-1f3fc",29,28,31,["🤸🏼"]],"1f3fd":["1f938-1f3fd",29,29,31,["🤸🏽"]],"1f3fe":["1f938-1f3fe",29,30,31,["🤸🏾"]],"1f3ff":["1f938-1f3ff",29,31,31,["🤸🏿"]]},"1f939":{"1f3fb":["1f939-1f3fb",29,33,31,["🤹🏻"]],"1f3fc":["1f939-1f3fc",29,34,31,["🤹🏼"]],"1f3fd":["1f939-1f3fd",29,35,31,["🤹🏽"]],"1f3fe":["1f939-1f3fe",29,36,31,["🤹🏾"]],"1f3ff":["1f939-1f3ff",29,37,31,["🤹🏿"]]},"1f93d":{"1f3fb":["1f93d-1f3fb",29,41,31,["🤽🏻"]],"1f3fc":["1f93d-1f3fc",29,42,31,["🤽🏼"]],"1f3fd":["1f93d-1f3fd",29,43,31,["🤽🏽"]],"1f3fe":["1f93d-1f3fe",29,44,31,["🤽🏾"]],"1f3ff":["1f93d-1f3ff",29,45,31,["🤽🏿"]]},"1f93e":{"1f3fb":["1f93e-1f3fb",29,47,31,["🤾🏻"]],"1f3fc":["1f93e-1f3fc",29,48,31,["🤾🏼"]],"1f3fd":["1f93e-1f3fd",30,0,31,["🤾🏽"]],"1f3fe":["1f93e-1f3fe",30,1,31,["🤾🏾"]],"1f3ff":["1f93e-1f3ff",30,2,31,["🤾🏿"]]},"1f468-200d-1f33e":{"1f3fb":["1f468-1f3fb-200d-1f33e",36,25,23,["👨🏻‍🌾"]],"1f3fc":["1f468-1f3fc-200d-1f33e",36,26,23,["👨🏼‍🌾"]],"1f3fd":["1f468-1f3fd-200d-1f33e",36,27,23,["👨🏽‍🌾"]],"1f3fe":["1f468-1f3fe-200d-1f33e",36,28,23,["👨🏾‍🌾"]],"1f3ff":["1f468-1f3ff-200d-1f33e",36,29,23,["👨🏿‍🌾"]]},"1f468-200d-1f373":{"1f3fb":["1f468-1f3fb-200d-1f373",36,31,23,["👨🏻‍🍳"]],"1f3fc":["1f468-1f3fc-200d-1f373",36,32,23,["👨🏼‍🍳"]],"1f3fd":["1f468-1f3fd-200d-1f373",36,33,23,["👨🏽‍🍳"]],"1f3fe":["1f468-1f3fe-200d-1f373",36,34,23,["👨🏾‍🍳"]],"1f3ff":["1f468-1f3ff-200d-1f373",36,35,23,["👨🏿‍🍳"]]},"1f468-200d-1f393":{"1f3fb":["1f468-1f3fb-200d-1f393",36,37,23,["👨🏻‍🎓"]],"1f3fc":["1f468-1f3fc-200d-1f393",36,38,23,["👨🏼‍🎓"]],"1f3fd":["1f468-1f3fd-200d-1f393",36,39,23,["👨🏽‍🎓"]],"1f3fe":["1f468-1f3fe-200d-1f393",36,40,23,["👨🏾‍🎓"]],"1f3ff":["1f468-1f3ff-200d-1f393",36,41,23,["👨🏿‍🎓"]]},"1f468-200d-1f3a4":{"1f3fb":["1f468-1f3fb-200d-1f3a4",36,43,23,["👨🏻‍🎤"]],"1f3fc":["1f468-1f3fc-200d-1f3a4",36,44,23,["👨🏼‍🎤"]],"1f3fd":["1f468-1f3fd-200d-1f3a4",36,45,23,["👨🏽‍🎤"]],"1f3fe":["1f468-1f3fe-200d-1f3a4",36,46,23,["👨🏾‍🎤"]],"1f3ff":["1f468-1f3ff-200d-1f3a4",36,47,23,["👨🏿‍🎤"]]},"1f468-200d-1f3a8":{"1f3fb":["1f468-1f3fb-200d-1f3a8",37,0,23,["👨🏻‍🎨"]],"1f3fc":["1f468-1f3fc-200d-1f3a8",37,1,23,["👨🏼‍🎨"]],"1f3fd":["1f468-1f3fd-200d-1f3a8",37,2,23,["👨🏽‍🎨"]],"1f3fe":["1f468-1f3fe-200d-1f3a8",37,3,23,["👨🏾‍🎨"]],"1f3ff":["1f468-1f3ff-200d-1f3a8",37,4,23,["👨🏿‍🎨"]]},"1f468-200d-1f3eb":{"1f3fb":["1f468-1f3fb-200d-1f3eb",37,6,23,["👨🏻‍🏫"]],"1f3fc":["1f468-1f3fc-200d-1f3eb",37,7,23,["👨🏼‍🏫"]],"1f3fd":["1f468-1f3fd-200d-1f3eb",37,8,23,["👨🏽‍🏫"]],"1f3fe":["1f468-1f3fe-200d-1f3eb",37,9,23,["👨🏾‍🏫"]],"1f3ff":["1f468-1f3ff-200d-1f3eb",37,10,23,["👨🏿‍🏫"]]},"1f468-200d-1f3ed":{"1f3fb":["1f468-1f3fb-200d-1f3ed",37,12,23,["👨🏻‍🏭"]],"1f3fc":["1f468-1f3fc-200d-1f3ed",37,13,23,["👨🏼‍🏭"]],"1f3fd":["1f468-1f3fd-200d-1f3ed",37,14,23,["👨🏽‍🏭"]],"1f3fe":["1f468-1f3fe-200d-1f3ed",37,15,23,["👨🏾‍🏭"]],"1f3ff":["1f468-1f3ff-200d-1f3ed",37,16,23,["👨🏿‍🏭"]]},"1f468-200d-1f4bb":{"1f3fb":["1f468-1f3fb-200d-1f4bb",37,20,23,["👨🏻‍💻"]],"1f3fc":["1f468-1f3fc-200d-1f4bb",37,21,23,["👨🏼‍💻"]],"1f3fd":["1f468-1f3fd-200d-1f4bb",37,22,23,["👨🏽‍💻"]],"1f3fe":["1f468-1f3fe-200d-1f4bb",37,23,23,["👨🏾‍💻"]],"1f3ff":["1f468-1f3ff-200d-1f4bb",37,24,23,["👨🏿‍💻"]]},"1f468-200d-1f4bc":{"1f3fb":["1f468-1f3fb-200d-1f4bc",37,26,23,["👨🏻‍💼"]],"1f3fc":["1f468-1f3fc-200d-1f4bc",37,27,23,["👨🏼‍💼"]],"1f3fd":["1f468-1f3fd-200d-1f4bc",37,28,23,["👨🏽‍💼"]],"1f3fe":["1f468-1f3fe-200d-1f4bc",37,29,23,["👨🏾‍💼"]],"1f3ff":["1f468-1f3ff-200d-1f4bc",37,30,23,["👨🏿‍💼"]]},"1f468-200d-1f527":{"1f3fb":["1f468-1f3fb-200d-1f527",37,32,23,["👨🏻‍🔧"]],"1f3fc":["1f468-1f3fc-200d-1f527",37,33,23,["👨🏼‍🔧"]],"1f3fd":["1f468-1f3fd-200d-1f527",37,34,23,["👨🏽‍🔧"]],"1f3fe":["1f468-1f3fe-200d-1f527",37,35,23,["👨🏾‍🔧"]],"1f3ff":["1f468-1f3ff-200d-1f527",37,36,23,["👨🏿‍🔧"]]},"1f468-200d-1f52c":{"1f3fb":["1f468-1f3fb-200d-1f52c",37,38,23,["👨🏻‍🔬"]],"1f3fc":["1f468-1f3fc-200d-1f52c",37,39,23,["👨🏼‍🔬"]],"1f3fd":["1f468-1f3fd-200d-1f52c",37,40,23,["👨🏽‍🔬"]],"1f3fe":["1f468-1f3fe-200d-1f52c",37,41,23,["👨🏾‍🔬"]],"1f3ff":["1f468-1f3ff-200d-1f52c",37,42,23,["👨🏿‍🔬"]]},"1f468-200d-1f680":{"1f3fb":["1f468-1f3fb-200d-1f680",37,44,23,["👨🏻‍🚀"]],"1f3fc":["1f468-1f3fc-200d-1f680",37,45,23,["👨🏼‍🚀"]],"1f3fd":["1f468-1f3fd-200d-1f680",37,46,23,["👨🏽‍🚀"]],"1f3fe":["1f468-1f3fe-200d-1f680",37,47,23,["👨🏾‍🚀"]],"1f3ff":["1f468-1f3ff-200d-1f680",37,48,23,["👨🏿‍🚀"]]},"1f468-200d-1f692":{"1f3fb":["1f468-1f3fb-200d-1f692",38,1,23,["👨🏻‍🚒"]],"1f3fc":["1f468-1f3fc-200d-1f692",38,2,23,["👨🏼‍🚒"]],"1f3fd":["1f468-1f3fd-200d-1f692",38,3,23,["👨🏽‍🚒"]],"1f3fe":["1f468-1f3fe-200d-1f692",38,4,23,["👨🏾‍🚒"]],"1f3ff":["1f468-1f3ff-200d-1f692",38,5,23,["👨🏿‍🚒"]]},"1f469-200d-1f33e":{"1f3fb":["1f469-1f3fb-200d-1f33e",38,7,23,["👩🏻‍🌾"]],"1f3fc":["1f469-1f3fc-200d-1f33e",38,8,23,["👩🏼‍🌾"]],"1f3fd":["1f469-1f3fd-200d-1f33e",38,9,23,["👩🏽‍🌾"]],"1f3fe":["1f469-1f3fe-200d-1f33e",38,10,23,["👩🏾‍🌾"]],"1f3ff":["1f469-1f3ff-200d-1f33e",38,11,23,["👩🏿‍🌾"]]},"1f469-200d-1f373":{"1f3fb":["1f469-1f3fb-200d-1f373",38,13,23,["👩🏻‍🍳"]],"1f3fc":["1f469-1f3fc-200d-1f373",38,14,23,["👩🏼‍🍳"]],"1f3fd":["1f469-1f3fd-200d-1f373",38,15,23,["👩🏽‍🍳"]],"1f3fe":["1f469-1f3fe-200d-1f373",38,16,23,["👩🏾‍🍳"]],"1f3ff":["1f469-1f3ff-200d-1f373",38,17,23,["👩🏿‍🍳"]]},"1f469-200d-1f393":{"1f3fb":["1f469-1f3fb-200d-1f393",38,19,23,["👩🏻‍🎓"]],"1f3fc":["1f469-1f3fc-200d-1f393",38,20,23,["👩🏼‍🎓"]],"1f3fd":["1f469-1f3fd-200d-1f393",38,21,23,["👩🏽‍🎓"]],"1f3fe":["1f469-1f3fe-200d-1f393",38,22,23,["👩🏾‍🎓"]],"1f3ff":["1f469-1f3ff-200d-1f393",38,23,23,["👩🏿‍🎓"]]},"1f469-200d-1f3a4":{"1f3fb":["1f469-1f3fb-200d-1f3a4",38,25,23,["👩🏻‍🎤"]],"1f3fc":["1f469-1f3fc-200d-1f3a4",38,26,23,["👩🏼‍🎤"]],"1f3fd":["1f469-1f3fd-200d-1f3a4",38,27,23,["👩🏽‍🎤"]],"1f3fe":["1f469-1f3fe-200d-1f3a4",38,28,23,["👩🏾‍🎤"]],"1f3ff":["1f469-1f3ff-200d-1f3a4",38,29,23,["👩🏿‍🎤"]]},"1f469-200d-1f3a8":{"1f3fb":["1f469-1f3fb-200d-1f3a8",38,31,23,["👩🏻‍🎨"]],"1f3fc":["1f469-1f3fc-200d-1f3a8",38,32,23,["👩🏼‍🎨"]],"1f3fd":["1f469-1f3fd-200d-1f3a8",38,33,23,["👩🏽‍🎨"]],"1f3fe":["1f469-1f3fe-200d-1f3a8",38,34,23,["👩🏾‍🎨"]],"1f3ff":["1f469-1f3ff-200d-1f3a8",38,35,23,["👩🏿‍🎨"]]},"1f469-200d-1f3eb":{"1f3fb":["1f469-1f3fb-200d-1f3eb",38,37,23,["👩🏻‍🏫"]],"1f3fc":["1f469-1f3fc-200d-1f3eb",38,38,23,["👩🏼‍🏫"]],"1f3fd":["1f469-1f3fd-200d-1f3eb",38,39,23,["👩🏽‍🏫"]],"1f3fe":["1f469-1f3fe-200d-1f3eb",38,40,23,["👩🏾‍🏫"]],"1f3ff":["1f469-1f3ff-200d-1f3eb",38,41,23,["👩🏿‍🏫"]]},"1f469-200d-1f3ed":{"1f3fb":["1f469-1f3fb-200d-1f3ed",38,43,23,["👩🏻‍🏭"]],"1f3fc":["1f469-1f3fc-200d-1f3ed",38,44,23,["👩🏼‍🏭"]],"1f3fd":["1f469-1f3fd-200d-1f3ed",38,45,23,["👩🏽‍🏭"]],"1f3fe":["1f469-1f3fe-200d-1f3ed",38,46,23,["👩🏾‍🏭"]],"1f3ff":["1f469-1f3ff-200d-1f3ed",38,47,23,["👩🏿‍🏭"]]},"1f469-200d-1f4bb":{"1f3fb":["1f469-1f3fb-200d-1f4bb",39,2,23,["👩🏻‍💻"]],"1f3fc":["1f469-1f3fc-200d-1f4bb",39,3,23,["👩🏼‍💻"]],"1f3fd":["1f469-1f3fd-200d-1f4bb",39,4,23,["👩🏽‍💻"]],"1f3fe":["1f469-1f3fe-200d-1f4bb",39,5,23,["👩🏾‍💻"]],"1f3ff":["1f469-1f3ff-200d-1f4bb",39,6,23,["👩🏿‍💻"]]},"1f469-200d-1f4bc":{"1f3fb":["1f469-1f3fb-200d-1f4bc",39,8,23,["👩🏻‍💼"]],"1f3fc":["1f469-1f3fc-200d-1f4bc",39,9,23,["👩🏼‍💼"]],"1f3fd":["1f469-1f3fd-200d-1f4bc",39,10,23,["👩🏽‍💼"]],"1f3fe":["1f469-1f3fe-200d-1f4bc",39,11,23,["👩🏾‍💼"]],"1f3ff":["1f469-1f3ff-200d-1f4bc",39,12,23,["👩🏿‍💼"]]},"1f469-200d-1f527":{"1f3fb":["1f469-1f3fb-200d-1f527",39,14,23,["👩🏻‍🔧"]],"1f3fc":["1f469-1f3fc-200d-1f527",39,15,23,["👩🏼‍🔧"]],"1f3fd":["1f469-1f3fd-200d-1f527",39,16,23,["👩🏽‍🔧"]],"1f3fe":["1f469-1f3fe-200d-1f527",39,17,23,["👩🏾‍🔧"]],"1f3ff":["1f469-1f3ff-200d-1f527",39,18,23,["👩🏿‍🔧"]]},"1f469-200d-1f52c":{"1f3fb":["1f469-1f3fb-200d-1f52c",39,20,23,["👩🏻‍🔬"]],"1f3fc":["1f469-1f3fc-200d-1f52c",39,21,23,["👩🏼‍🔬"]],"1f3fd":["1f469-1f3fd-200d-1f52c",39,22,23,["👩🏽‍🔬"]],"1f3fe":["1f469-1f3fe-200d-1f52c",39,23,23,["👩🏾‍🔬"]],"1f3ff":["1f469-1f3ff-200d-1f52c",39,24,23,["👩🏿‍🔬"]]},"1f469-200d-1f680":{"1f3fb":["1f469-1f3fb-200d-1f680",39,26,23,["👩🏻‍🚀"]],"1f3fc":["1f469-1f3fc-200d-1f680",39,27,23,["👩🏼‍🚀"]],"1f3fd":["1f469-1f3fd-200d-1f680",39,28,23,["👩🏽‍🚀"]],"1f3fe":["1f469-1f3fe-200d-1f680",39,29,23,["👩🏾‍🚀"]],"1f3ff":["1f469-1f3ff-200d-1f680",39,30,23,["👩🏿‍🚀"]]},"1f469-200d-1f692":{"1f3fb":["1f469-1f3fb-200d-1f692",39,32,23,["👩🏻‍🚒"]],"1f3fc":["1f469-1f3fc-200d-1f692",39,33,23,["👩🏼‍🚒"]],"1f3fd":["1f469-1f3fd-200d-1f692",39,34,23,["👩🏽‍🚒"]],"1f3fe":["1f469-1f3fe-200d-1f692",39,35,23,["👩🏾‍🚒"]],"1f3ff":["1f469-1f3ff-200d-1f692",39,36,23,["👩🏿‍🚒"]]},"1f3c3-200d-2640-fe0f":{"1f3fb":["1f3c3-1f3fb-200d-2640-fe0f",39,38,5,["🏃🏻‍♀️"]],"1f3fc":["1f3c3-1f3fc-200d-2640-fe0f",39,39,5,["🏃🏼‍♀️"]],"1f3fd":["1f3c3-1f3fd-200d-2640-fe0f",39,40,5,["🏃🏽‍♀️"]],"1f3fe":["1f3c3-1f3fe-200d-2640-fe0f",39,41,5,["🏃🏾‍♀️"]],"1f3ff":["1f3c3-1f3ff-200d-2640-fe0f",39,42,5,["🏃🏿‍♀️"]]},"1f3c3-200d-2642-fe0f":{"1f3fb":["1f3c3-1f3fb-200d-2642-fe0f",39,44,5,["🏃🏻‍♂️","🏃🏻"]],"1f3fc":["1f3c3-1f3fc-200d-2642-fe0f",39,45,5,["🏃🏼‍♂️","🏃🏼"]],"1f3fd":["1f3c3-1f3fd-200d-2642-fe0f",39,46,5,["🏃🏽‍♂️","🏃🏽"]],"1f3fe":["1f3c3-1f3fe-200d-2642-fe0f",39,47,5,["🏃🏾‍♂️","🏃🏾"]],"1f3ff":["1f3c3-1f3ff-200d-2642-fe0f",39,48,5,["🏃🏿‍♂️","🏃🏿"]]},"1f3c4-200d-2640-fe0f":{"1f3fb":["1f3c4-1f3fb-200d-2640-fe0f",40,1,5,["🏄🏻‍♀️"]],"1f3fc":["1f3c4-1f3fc-200d-2640-fe0f",40,2,5,["🏄🏼‍♀️"]],"1f3fd":["1f3c4-1f3fd-200d-2640-fe0f",40,3,5,["🏄🏽‍♀️"]],"1f3fe":["1f3c4-1f3fe-200d-2640-fe0f",40,4,5,["🏄🏾‍♀️"]],"1f3ff":["1f3c4-1f3ff-200d-2640-fe0f",40,5,5,["🏄🏿‍♀️"]]},"1f3c4-200d-2642-fe0f":{"1f3fb":["1f3c4-1f3fb-200d-2642-fe0f",40,7,5,["🏄🏻‍♂️","🏄🏻"]],"1f3fc":["1f3c4-1f3fc-200d-2642-fe0f",40,8,5,["🏄🏼‍♂️","🏄🏼"]],"1f3fd":["1f3c4-1f3fd-200d-2642-fe0f",40,9,5,["🏄🏽‍♂️","🏄🏽"]],"1f3fe":["1f3c4-1f3fe-200d-2642-fe0f",40,10,5,["🏄🏾‍♂️","🏄🏾"]],"1f3ff":["1f3c4-1f3ff-200d-2642-fe0f",40,11,5,["🏄🏿‍♂️","🏄🏿"]]},"1f3ca-200d-2640-fe0f":{"1f3fb":["1f3ca-1f3fb-200d-2640-fe0f",40,13,5,["🏊🏻‍♀️"]],"1f3fc":["1f3ca-1f3fc-200d-2640-fe0f",40,14,5,["🏊🏼‍♀️"]],"1f3fd":["1f3ca-1f3fd-200d-2640-fe0f",40,15,5,["🏊🏽‍♀️"]],"1f3fe":["1f3ca-1f3fe-200d-2640-fe0f",40,16,5,["🏊🏾‍♀️"]],"1f3ff":["1f3ca-1f3ff-200d-2640-fe0f",40,17,5,["🏊🏿‍♀️"]]},"1f3ca-200d-2642-fe0f":{"1f3fb":["1f3ca-1f3fb-200d-2642-fe0f",40,19,5,["🏊🏻‍♂️","🏊🏻"]],"1f3fc":["1f3ca-1f3fc-200d-2642-fe0f",40,20,5,["🏊🏼‍♂️","🏊🏼"]],"1f3fd":["1f3ca-1f3fd-200d-2642-fe0f",40,21,5,["🏊🏽‍♂️","🏊🏽"]],"1f3fe":["1f3ca-1f3fe-200d-2642-fe0f",40,22,5,["🏊🏾‍♂️","🏊🏾"]],"1f3ff":["1f3ca-1f3ff-200d-2642-fe0f",40,23,5,["🏊🏿‍♂️","🏊🏿"]]},"1f3cb-fe0f-200d-2640-fe0f":{"1f3fb":["1f3cb-1f3fb-200d-2640-fe0f",40,25,5,["🏋🏻‍♀️"]],"1f3fc":["1f3cb-1f3fc-200d-2640-fe0f",40,26,5,["🏋🏼‍♀️"]],"1f3fd":["1f3cb-1f3fd-200d-2640-fe0f",40,27,5,["🏋🏽‍♀️"]],"1f3fe":["1f3cb-1f3fe-200d-2640-fe0f",40,28,5,["🏋🏾‍♀️"]],"1f3ff":["1f3cb-1f3ff-200d-2640-fe0f",40,29,5,["🏋🏿‍♀️"]]},"1f3cb-fe0f-200d-2642-fe0f":{"1f3fb":["1f3cb-1f3fb-200d-2642-fe0f",40,31,5,["🏋🏻‍♂️","🏋🏻"]],"1f3fc":["1f3cb-1f3fc-200d-2642-fe0f",40,32,5,["🏋🏼‍♂️","🏋🏼"]],"1f3fd":["1f3cb-1f3fd-200d-2642-fe0f",40,33,5,["🏋🏽‍♂️","🏋🏽"]],"1f3fe":["1f3cb-1f3fe-200d-2642-fe0f",40,34,5,["🏋🏾‍♂️","🏋🏾"]],"1f3ff":["1f3cb-1f3ff-200d-2642-fe0f",40,35,5,["🏋🏿‍♂️","🏋🏿"]]},"1f3cc-fe0f-200d-2640-fe0f":{"1f3fb":["1f3cc-1f3fb-200d-2640-fe0f",40,37,5,["🏌🏻‍♀️"]],"1f3fc":["1f3cc-1f3fc-200d-2640-fe0f",40,38,5,["🏌🏼‍♀️"]],"1f3fd":["1f3cc-1f3fd-200d-2640-fe0f",40,39,5,["🏌🏽‍♀️"]],"1f3fe":["1f3cc-1f3fe-200d-2640-fe0f",40,40,5,["🏌🏾‍♀️"]],"1f3ff":["1f3cc-1f3ff-200d-2640-fe0f",40,41,5,["🏌🏿‍♀️"]]},"1f3cc-fe0f-200d-2642-fe0f":{"1f3fb":["1f3cc-1f3fb-200d-2642-fe0f",40,43,5,["🏌🏻‍♂️","🏌🏻"]],"1f3fc":["1f3cc-1f3fc-200d-2642-fe0f",40,44,5,["🏌🏼‍♂️","🏌🏼"]],"1f3fd":["1f3cc-1f3fd-200d-2642-fe0f",40,45,5,["🏌🏽‍♂️","🏌🏽"]],"1f3fe":["1f3cc-1f3fe-200d-2642-fe0f",40,46,5,["🏌🏾‍♂️","🏌🏾"]],"1f3ff":["1f3cc-1f3ff-200d-2642-fe0f",40,47,5,["🏌🏿‍♂️","🏌🏿"]]},"1f468-200d-2695-fe0f":{"1f3fb":["1f468-1f3fb-200d-2695-fe0f",41,15,5,["👨🏻‍⚕️"]],"1f3fc":["1f468-1f3fc-200d-2695-fe0f",41,16,5,["👨🏼‍⚕️"]],"1f3fd":["1f468-1f3fd-200d-2695-fe0f",41,17,5,["👨🏽‍⚕️"]],"1f3fe":["1f468-1f3fe-200d-2695-fe0f",41,18,5,["👨🏾‍⚕️"]],"1f3ff":["1f468-1f3ff-200d-2695-fe0f",41,19,5,["👨🏿‍⚕️"]]},"1f468-200d-2696-fe0f":{"1f3fb":["1f468-1f3fb-200d-2696-fe0f",41,21,5,["👨🏻‍⚖️"]],"1f3fc":["1f468-1f3fc-200d-2696-fe0f",41,22,5,["👨🏼‍⚖️"]],"1f3fd":["1f468-1f3fd-200d-2696-fe0f",41,23,5,["👨🏽‍⚖️"]],"1f3fe":["1f468-1f3fe-200d-2696-fe0f",41,24,5,["👨🏾‍⚖️"]],"1f3ff":["1f468-1f3ff-200d-2696-fe0f",41,25,5,["👨🏿‍⚖️"]]},"1f468-200d-2708-fe0f":{"1f3fb":["1f468-1f3fb-200d-2708-fe0f",41,27,5,["👨🏻‍✈️"]],"1f3fc":["1f468-1f3fc-200d-2708-fe0f",41,28,5,["👨🏼‍✈️"]],"1f3fd":["1f468-1f3fd-200d-2708-fe0f",41,29,5,["👨🏽‍✈️"]],"1f3fe":["1f468-1f3fe-200d-2708-fe0f",41,30,5,["👨🏾‍✈️"]],"1f3ff":["1f468-1f3ff-200d-2708-fe0f",41,31,5,["👨🏿‍✈️"]]},"1f469-200d-2695-fe0f":{"1f3fb":["1f469-1f3fb-200d-2695-fe0f",41,43,5,["👩🏻‍⚕️"]],"1f3fc":["1f469-1f3fc-200d-2695-fe0f",41,44,5,["👩🏼‍⚕️"]],"1f3fd":["1f469-1f3fd-200d-2695-fe0f",41,45,5,["👩🏽‍⚕️"]],"1f3fe":["1f469-1f3fe-200d-2695-fe0f",41,46,5,["👩🏾‍⚕️"]],"1f3ff":["1f469-1f3ff-200d-2695-fe0f",41,47,5,["👩🏿‍⚕️"]]},"1f469-200d-2696-fe0f":{"1f3fb":["1f469-1f3fb-200d-2696-fe0f",42,0,5,["👩🏻‍⚖️"]],"1f3fc":["1f469-1f3fc-200d-2696-fe0f",42,1,5,["👩🏼‍⚖️"]],"1f3fd":["1f469-1f3fd-200d-2696-fe0f",42,2,5,["👩🏽‍⚖️"]],"1f3fe":["1f469-1f3fe-200d-2696-fe0f",42,3,5,["👩🏾‍⚖️"]],"1f3ff":["1f469-1f3ff-200d-2696-fe0f",42,4,5,["👩🏿‍⚖️"]]},"1f469-200d-2708-fe0f":{"1f3fb":["1f469-1f3fb-200d-2708-fe0f",42,6,5,["👩🏻‍✈️"]],"1f3fc":["1f469-1f3fc-200d-2708-fe0f",42,7,5,["👩🏼‍✈️"]],"1f3fd":["1f469-1f3fd-200d-2708-fe0f",42,8,5,["👩🏽‍✈️"]],"1f3fe":["1f469-1f3fe-200d-2708-fe0f",42,9,5,["👩🏾‍✈️"]],"1f3ff":["1f469-1f3ff-200d-2708-fe0f",42,10,5,["👩🏿‍✈️"]]},"1f46e-200d-2640-fe0f":{"1f3fb":["1f46e-1f3fb-200d-2640-fe0f",42,16,5,["👮🏻‍♀️"]],"1f3fc":["1f46e-1f3fc-200d-2640-fe0f",42,17,5,["👮🏼‍♀️"]],"1f3fd":["1f46e-1f3fd-200d-2640-fe0f",42,18,5,["👮🏽‍♀️"]],"1f3fe":["1f46e-1f3fe-200d-2640-fe0f",42,19,5,["👮🏾‍♀️"]],"1f3ff":["1f46e-1f3ff-200d-2640-fe0f",42,20,5,["👮🏿‍♀️"]]},"1f46e-200d-2642-fe0f":{"1f3fb":["1f46e-1f3fb-200d-2642-fe0f",42,22,5,["👮🏻‍♂️","👮🏻"]],"1f3fc":["1f46e-1f3fc-200d-2642-fe0f",42,23,5,["👮🏼‍♂️","👮🏼"]],"1f3fd":["1f46e-1f3fd-200d-2642-fe0f",42,24,5,["👮🏽‍♂️","👮🏽"]],"1f3fe":["1f46e-1f3fe-200d-2642-fe0f",42,25,5,["👮🏾‍♂️","👮🏾"]],"1f3ff":["1f46e-1f3ff-200d-2642-fe0f",42,26,5,["👮🏿‍♂️","👮🏿"]]},"1f471-200d-2640-fe0f":{"1f3fb":["1f471-1f3fb-200d-2640-fe0f",42,30,5,["👱🏻‍♀️"]],"1f3fc":["1f471-1f3fc-200d-2640-fe0f",42,31,5,["👱🏼‍♀️"]],"1f3fd":["1f471-1f3fd-200d-2640-fe0f",42,32,5,["👱🏽‍♀️"]],"1f3fe":["1f471-1f3fe-200d-2640-fe0f",42,33,5,["👱🏾‍♀️"]],"1f3ff":["1f471-1f3ff-200d-2640-fe0f",42,34,5,["👱🏿‍♀️"]]},"1f471-200d-2642-fe0f":{"1f3fb":["1f471-1f3fb-200d-2642-fe0f",42,36,5,["👱🏻‍♂️","👱🏻"]],"1f3fc":["1f471-1f3fc-200d-2642-fe0f",42,37,5,["👱🏼‍♂️","👱🏼"]],"1f3fd":["1f471-1f3fd-200d-2642-fe0f",42,38,5,["👱🏽‍♂️","👱🏽"]],"1f3fe":["1f471-1f3fe-200d-2642-fe0f",42,39,5,["👱🏾‍♂️","👱🏾"]],"1f3ff":["1f471-1f3ff-200d-2642-fe0f",42,40,5,["👱🏿‍♂️","👱🏿"]]},"1f473-200d-2640-fe0f":{"1f3fb":["1f473-1f3fb-200d-2640-fe0f",42,42,5,["👳🏻‍♀️"]],"1f3fc":["1f473-1f3fc-200d-2640-fe0f",42,43,5,["👳🏼‍♀️"]],"1f3fd":["1f473-1f3fd-200d-2640-fe0f",42,44,5,["👳🏽‍♀️"]],"1f3fe":["1f473-1f3fe-200d-2640-fe0f",42,45,5,["👳🏾‍♀️"]],"1f3ff":["1f473-1f3ff-200d-2640-fe0f",42,46,5,["👳🏿‍♀️"]]},"1f473-200d-2642-fe0f":{"1f3fb":["1f473-1f3fb-200d-2642-fe0f",42,48,5,["👳🏻‍♂️","👳🏻"]],"1f3fc":["1f473-1f3fc-200d-2642-fe0f",43,0,5,["👳🏼‍♂️","👳🏼"]],"1f3fd":["1f473-1f3fd-200d-2642-fe0f",43,1,5,["👳🏽‍♂️","👳🏽"]],"1f3fe":["1f473-1f3fe-200d-2642-fe0f",43,2,5,["👳🏾‍♂️","👳🏾"]],"1f3ff":["1f473-1f3ff-200d-2642-fe0f",43,3,5,["👳🏿‍♂️","👳🏿"]]},"1f477-200d-2640-fe0f":{"1f3fb":["1f477-1f3fb-200d-2640-fe0f",43,5,5,["👷🏻‍♀️"]],"1f3fc":["1f477-1f3fc-200d-2640-fe0f",43,6,5,["👷🏼‍♀️"]],"1f3fd":["1f477-1f3fd-200d-2640-fe0f",43,7,5,["👷🏽‍♀️"]],"1f3fe":["1f477-1f3fe-200d-2640-fe0f",43,8,5,["👷🏾‍♀️"]],"1f3ff":["1f477-1f3ff-200d-2640-fe0f",43,9,5,["👷🏿‍♀️"]]},"1f477-200d-2642-fe0f":{"1f3fb":["1f477-1f3fb-200d-2642-fe0f",43,11,5,["👷🏻‍♂️","👷🏻"]],"1f3fc":["1f477-1f3fc-200d-2642-fe0f",43,12,5,["👷🏼‍♂️","👷🏼"]],"1f3fd":["1f477-1f3fd-200d-2642-fe0f",43,13,5,["👷🏽‍♂️","👷🏽"]],"1f3fe":["1f477-1f3fe-200d-2642-fe0f",43,14,5,["👷🏾‍♂️","👷🏾"]],"1f3ff":["1f477-1f3ff-200d-2642-fe0f",43,15,5,["👷🏿‍♂️","👷🏿"]]},"1f481-200d-2640-fe0f":{"1f3fb":["1f481-1f3fb-200d-2640-fe0f",43,17,5,["💁🏻‍♀️","💁🏻"]],"1f3fc":["1f481-1f3fc-200d-2640-fe0f",43,18,5,["💁🏼‍♀️","💁🏼"]],"1f3fd":["1f481-1f3fd-200d-2640-fe0f",43,19,5,["💁🏽‍♀️","💁🏽"]],"1f3fe":["1f481-1f3fe-200d-2640-fe0f",43,20,5,["💁🏾‍♀️","💁🏾"]],"1f3ff":["1f481-1f3ff-200d-2640-fe0f",43,21,5,["💁🏿‍♀️","💁🏿"]]},"1f481-200d-2642-fe0f":{"1f3fb":["1f481-1f3fb-200d-2642-fe0f",43,23,5,["💁🏻‍♂️"]],"1f3fc":["1f481-1f3fc-200d-2642-fe0f",43,24,5,["💁🏼‍♂️"]],"1f3fd":["1f481-1f3fd-200d-2642-fe0f",43,25,5,["💁🏽‍♂️"]],"1f3fe":["1f481-1f3fe-200d-2642-fe0f",43,26,5,["💁🏾‍♂️"]],"1f3ff":["1f481-1f3ff-200d-2642-fe0f",43,27,5,["💁🏿‍♂️"]]},"1f482-200d-2640-fe0f":{"1f3fb":["1f482-1f3fb-200d-2640-fe0f",43,29,5,["💂🏻‍♀️"]],"1f3fc":["1f482-1f3fc-200d-2640-fe0f",43,30,5,["💂🏼‍♀️"]],"1f3fd":["1f482-1f3fd-200d-2640-fe0f",43,31,5,["💂🏽‍♀️"]],"1f3fe":["1f482-1f3fe-200d-2640-fe0f",43,32,5,["💂🏾‍♀️"]],"1f3ff":["1f482-1f3ff-200d-2640-fe0f",43,33,5,["💂🏿‍♀️"]]},"1f482-200d-2642-fe0f":{"1f3fb":["1f482-1f3fb-200d-2642-fe0f",43,35,5,["💂🏻‍♂️","💂🏻"]],"1f3fc":["1f482-1f3fc-200d-2642-fe0f",43,36,5,["💂🏼‍♂️","💂🏼"]],"1f3fd":["1f482-1f3fd-200d-2642-fe0f",43,37,5,["💂🏽‍♂️","💂🏽"]],"1f3fe":["1f482-1f3fe-200d-2642-fe0f",43,38,5,["💂🏾‍♂️","💂🏾"]],"1f3ff":["1f482-1f3ff-200d-2642-fe0f",43,39,5,["💂🏿‍♂️","💂🏿"]]},"1f486-200d-2640-fe0f":{"1f3fb":["1f486-1f3fb-200d-2640-fe0f",43,41,5,["💆🏻‍♀️","💆🏻"]],"1f3fc":["1f486-1f3fc-200d-2640-fe0f",43,42,5,["💆🏼‍♀️","💆🏼"]],"1f3fd":["1f486-1f3fd-200d-2640-fe0f",43,43,5,["💆🏽‍♀️","💆🏽"]],"1f3fe":["1f486-1f3fe-200d-2640-fe0f",43,44,5,["💆🏾‍♀️","💆🏾"]],"1f3ff":["1f486-1f3ff-200d-2640-fe0f",43,45,5,["💆🏿‍♀️","💆🏿"]]},"1f486-200d-2642-fe0f":{"1f3fb":["1f486-1f3fb-200d-2642-fe0f",43,47,5,["💆🏻‍♂️"]],"1f3fc":["1f486-1f3fc-200d-2642-fe0f",43,48,5,["💆🏼‍♂️"]],"1f3fd":["1f486-1f3fd-200d-2642-fe0f",44,0,5,["💆🏽‍♂️"]],"1f3fe":["1f486-1f3fe-200d-2642-fe0f",44,1,5,["💆🏾‍♂️"]],"1f3ff":["1f486-1f3ff-200d-2642-fe0f",44,2,5,["💆🏿‍♂️"]]},"1f487-200d-2640-fe0f":{"1f3fb":["1f487-1f3fb-200d-2640-fe0f",44,4,5,["💇🏻‍♀️","💇🏻"]],"1f3fc":["1f487-1f3fc-200d-2640-fe0f",44,5,5,["💇🏼‍♀️","💇🏼"]],"1f3fd":["1f487-1f3fd-200d-2640-fe0f",44,6,5,["💇🏽‍♀️","💇🏽"]],"1f3fe":["1f487-1f3fe-200d-2640-fe0f",44,7,5,["💇🏾‍♀️","💇🏾"]],"1f3ff":["1f487-1f3ff-200d-2640-fe0f",44,8,5,["💇🏿‍♀️","💇🏿"]]},"1f487-200d-2642-fe0f":{"1f3fb":["1f487-1f3fb-200d-2642-fe0f",44,10,5,["💇🏻‍♂️"]],"1f3fc":["1f487-1f3fc-200d-2642-fe0f",44,11,5,["💇🏼‍♂️"]],"1f3fd":["1f487-1f3fd-200d-2642-fe0f",44,12,5,["💇🏽‍♂️"]],"1f3fe":["1f487-1f3fe-200d-2642-fe0f",44,13,5,["💇🏾‍♂️"]],"1f3ff":["1f487-1f3ff-200d-2642-fe0f",44,14,5,["💇🏿‍♂️"]]},"1f575-fe0f-200d-2640-fe0f":{"1f3fb":["1f575-1f3fb-200d-2640-fe0f",44,16,5,["🕵🏻‍♀️"]],"1f3fc":["1f575-1f3fc-200d-2640-fe0f",44,17,5,["🕵🏼‍♀️"]],"1f3fd":["1f575-1f3fd-200d-2640-fe0f",44,18,5,["🕵🏽‍♀️"]],"1f3fe":["1f575-1f3fe-200d-2640-fe0f",44,19,5,["🕵🏾‍♀️"]],"1f3ff":["1f575-1f3ff-200d-2640-fe0f",44,20,5,["🕵🏿‍♀️"]]},"1f575-fe0f-200d-2642-fe0f":{"1f3fb":["1f575-1f3fb-200d-2642-fe0f",44,22,5,["🕵🏻‍♂️","🕵🏻"]],"1f3fc":["1f575-1f3fc-200d-2642-fe0f",44,23,5,["🕵🏼‍♂️","🕵🏼"]],"1f3fd":["1f575-1f3fd-200d-2642-fe0f",44,24,5,["🕵🏽‍♂️","🕵🏽"]],"1f3fe":["1f575-1f3fe-200d-2642-fe0f",44,25,5,["🕵🏾‍♂️","🕵🏾"]],"1f3ff":["1f575-1f3ff-200d-2642-fe0f",44,26,5,["🕵🏿‍♂️","🕵🏿"]]},"1f645-200d-2640-fe0f":{"1f3fb":["1f645-1f3fb-200d-2640-fe0f",44,28,5,["🙅🏻‍♀️","🙅🏻"]],"1f3fc":["1f645-1f3fc-200d-2640-fe0f",44,29,5,["🙅🏼‍♀️","🙅🏼"]],"1f3fd":["1f645-1f3fd-200d-2640-fe0f",44,30,5,["🙅🏽‍♀️","🙅🏽"]],"1f3fe":["1f645-1f3fe-200d-2640-fe0f",44,31,5,["🙅🏾‍♀️","🙅🏾"]],"1f3ff":["1f645-1f3ff-200d-2640-fe0f",44,32,5,["🙅🏿‍♀️","🙅🏿"]]},"1f645-200d-2642-fe0f":{"1f3fb":["1f645-1f3fb-200d-2642-fe0f",44,34,5,["🙅🏻‍♂️"]],"1f3fc":["1f645-1f3fc-200d-2642-fe0f",44,35,5,["🙅🏼‍♂️"]],"1f3fd":["1f645-1f3fd-200d-2642-fe0f",44,36,5,["🙅🏽‍♂️"]],"1f3fe":["1f645-1f3fe-200d-2642-fe0f",44,37,5,["🙅🏾‍♂️"]],"1f3ff":["1f645-1f3ff-200d-2642-fe0f",44,38,5,["🙅🏿‍♂️"]]},"1f646-200d-2640-fe0f":{"1f3fb":["1f646-1f3fb-200d-2640-fe0f",44,40,5,["🙆🏻‍♀️","🙆🏻"]],"1f3fc":["1f646-1f3fc-200d-2640-fe0f",44,41,5,["🙆🏼‍♀️","🙆🏼"]],"1f3fd":["1f646-1f3fd-200d-2640-fe0f",44,42,5,["🙆🏽‍♀️","🙆🏽"]],"1f3fe":["1f646-1f3fe-200d-2640-fe0f",44,43,5,["🙆🏾‍♀️","🙆🏾"]],"1f3ff":["1f646-1f3ff-200d-2640-fe0f",44,44,5,["🙆🏿‍♀️","🙆🏿"]]},"1f646-200d-2642-fe0f":{"1f3fb":["1f646-1f3fb-200d-2642-fe0f",44,46,5,["🙆🏻‍♂️"]],"1f3fc":["1f646-1f3fc-200d-2642-fe0f",44,47,5,["🙆🏼‍♂️"]],"1f3fd":["1f646-1f3fd-200d-2642-fe0f",44,48,5,["🙆🏽‍♂️"]],"1f3fe":["1f646-1f3fe-200d-2642-fe0f",45,0,5,["🙆🏾‍♂️"]],"1f3ff":["1f646-1f3ff-200d-2642-fe0f",45,1,5,["🙆🏿‍♂️"]]},"1f647-200d-2640-fe0f":{"1f3fb":["1f647-1f3fb-200d-2640-fe0f",45,3,5,["🙇🏻‍♀️"]],"1f3fc":["1f647-1f3fc-200d-2640-fe0f",45,4,5,["🙇🏼‍♀️"]],"1f3fd":["1f647-1f3fd-200d-2640-fe0f",45,5,5,["🙇🏽‍♀️"]],"1f3fe":["1f647-1f3fe-200d-2640-fe0f",45,6,5,["🙇🏾‍♀️"]],"1f3ff":["1f647-1f3ff-200d-2640-fe0f",45,7,5,["🙇🏿‍♀️"]]},"1f647-200d-2642-fe0f":{"1f3fb":["1f647-1f3fb-200d-2642-fe0f",45,9,5,["🙇🏻‍♂️","🙇🏻"]],"1f3fc":["1f647-1f3fc-200d-2642-fe0f",45,10,5,["🙇🏼‍♂️","🙇🏼"]],"1f3fd":["1f647-1f3fd-200d-2642-fe0f",45,11,5,["🙇🏽‍♂️","🙇🏽"]],"1f3fe":["1f647-1f3fe-200d-2642-fe0f",45,12,5,["🙇🏾‍♂️","🙇🏾"]],"1f3ff":["1f647-1f3ff-200d-2642-fe0f",45,13,5,["🙇🏿‍♂️","🙇🏿"]]},"1f64b-200d-2640-fe0f":{"1f3fb":["1f64b-1f3fb-200d-2640-fe0f",45,15,5,["🙋🏻‍♀️","🙋🏻"]],"1f3fc":["1f64b-1f3fc-200d-2640-fe0f",45,16,5,["🙋🏼‍♀️","🙋🏼"]],"1f3fd":["1f64b-1f3fd-200d-2640-fe0f",45,17,5,["🙋🏽‍♀️","🙋🏽"]],"1f3fe":["1f64b-1f3fe-200d-2640-fe0f",45,18,5,["🙋🏾‍♀️","🙋🏾"]],"1f3ff":["1f64b-1f3ff-200d-2640-fe0f",45,19,5,["🙋🏿‍♀️","🙋🏿"]]},"1f64b-200d-2642-fe0f":{"1f3fb":["1f64b-1f3fb-200d-2642-fe0f",45,21,5,["🙋🏻‍♂️"]],"1f3fc":["1f64b-1f3fc-200d-2642-fe0f",45,22,5,["🙋🏼‍♂️"]],"1f3fd":["1f64b-1f3fd-200d-2642-fe0f",45,23,5,["🙋🏽‍♂️"]],"1f3fe":["1f64b-1f3fe-200d-2642-fe0f",45,24,5,["🙋🏾‍♂️"]],"1f3ff":["1f64b-1f3ff-200d-2642-fe0f",45,25,5,["🙋🏿‍♂️"]]},"1f64d-200d-2640-fe0f":{"1f3fb":["1f64d-1f3fb-200d-2640-fe0f",45,27,5,["🙍🏻‍♀️","🙍🏻"]],"1f3fc":["1f64d-1f3fc-200d-2640-fe0f",45,28,5,["🙍🏼‍♀️","🙍🏼"]],"1f3fd":["1f64d-1f3fd-200d-2640-fe0f",45,29,5,["🙍🏽‍♀️","🙍🏽"]],"1f3fe":["1f64d-1f3fe-200d-2640-fe0f",45,30,5,["🙍🏾‍♀️","🙍🏾"]],"1f3ff":["1f64d-1f3ff-200d-2640-fe0f",45,31,5,["🙍🏿‍♀️","🙍🏿"]]},"1f64d-200d-2642-fe0f":{"1f3fb":["1f64d-1f3fb-200d-2642-fe0f",45,33,5,["🙍🏻‍♂️"]],"1f3fc":["1f64d-1f3fc-200d-2642-fe0f",45,34,5,["🙍🏼‍♂️"]],"1f3fd":["1f64d-1f3fd-200d-2642-fe0f",45,35,5,["🙍🏽‍♂️"]],"1f3fe":["1f64d-1f3fe-200d-2642-fe0f",45,36,5,["🙍🏾‍♂️"]],"1f3ff":["1f64d-1f3ff-200d-2642-fe0f",45,37,5,["🙍🏿‍♂️"]]},"1f64e-200d-2640-fe0f":{"1f3fb":["1f64e-1f3fb-200d-2640-fe0f",45,39,5,["🙎🏻‍♀️","🙎🏻"]],"1f3fc":["1f64e-1f3fc-200d-2640-fe0f",45,40,5,["🙎🏼‍♀️","🙎🏼"]],"1f3fd":["1f64e-1f3fd-200d-2640-fe0f",45,41,5,["🙎🏽‍♀️","🙎🏽"]],"1f3fe":["1f64e-1f3fe-200d-2640-fe0f",45,42,5,["🙎🏾‍♀️","🙎🏾"]],"1f3ff":["1f64e-1f3ff-200d-2640-fe0f",45,43,5,["🙎🏿‍♀️","🙎🏿"]]},"1f64e-200d-2642-fe0f":{"1f3fb":["1f64e-1f3fb-200d-2642-fe0f",45,45,5,["🙎🏻‍♂️"]],"1f3fc":["1f64e-1f3fc-200d-2642-fe0f",45,46,5,["🙎🏼‍♂️"]],"1f3fd":["1f64e-1f3fd-200d-2642-fe0f",45,47,5,["🙎🏽‍♂️"]],"1f3fe":["1f64e-1f3fe-200d-2642-fe0f",45,48,5,["🙎🏾‍♂️"]],"1f3ff":["1f64e-1f3ff-200d-2642-fe0f",46,0,5,["🙎🏿‍♂️"]]},"1f6a3-200d-2640-fe0f":{"1f3fb":["1f6a3-1f3fb-200d-2640-fe0f",46,2,5,["🚣🏻‍♀️"]],"1f3fc":["1f6a3-1f3fc-200d-2640-fe0f",46,3,5,["🚣🏼‍♀️"]],"1f3fd":["1f6a3-1f3fd-200d-2640-fe0f",46,4,5,["🚣🏽‍♀️"]],"1f3fe":["1f6a3-1f3fe-200d-2640-fe0f",46,5,5,["🚣🏾‍♀️"]],"1f3ff":["1f6a3-1f3ff-200d-2640-fe0f",46,6,5,["🚣🏿‍♀️"]]},"1f6a3-200d-2642-fe0f":{"1f3fb":["1f6a3-1f3fb-200d-2642-fe0f",46,8,5,["🚣🏻‍♂️","🚣🏻"]],"1f3fc":["1f6a3-1f3fc-200d-2642-fe0f",46,9,5,["🚣🏼‍♂️","🚣🏼"]],"1f3fd":["1f6a3-1f3fd-200d-2642-fe0f",46,10,5,["🚣🏽‍♂️","🚣🏽"]],"1f3fe":["1f6a3-1f3fe-200d-2642-fe0f",46,11,5,["🚣🏾‍♂️","🚣🏾"]],"1f3ff":["1f6a3-1f3ff-200d-2642-fe0f",46,12,5,["🚣🏿‍♂️","🚣🏿"]]},"1f6b4-200d-2640-fe0f":{"1f3fb":["1f6b4-1f3fb-200d-2640-fe0f",46,14,5,["🚴🏻‍♀️"]],"1f3fc":["1f6b4-1f3fc-200d-2640-fe0f",46,15,5,["🚴🏼‍♀️"]],"1f3fd":["1f6b4-1f3fd-200d-2640-fe0f",46,16,5,["🚴🏽‍♀️"]],"1f3fe":["1f6b4-1f3fe-200d-2640-fe0f",46,17,5,["🚴🏾‍♀️"]],"1f3ff":["1f6b4-1f3ff-200d-2640-fe0f",46,18,5,["🚴🏿‍♀️"]]},"1f6b4-200d-2642-fe0f":{"1f3fb":["1f6b4-1f3fb-200d-2642-fe0f",46,20,5,["🚴🏻‍♂️","🚴🏻"]],"1f3fc":["1f6b4-1f3fc-200d-2642-fe0f",46,21,5,["🚴🏼‍♂️","🚴🏼"]],"1f3fd":["1f6b4-1f3fd-200d-2642-fe0f",46,22,5,["🚴🏽‍♂️","🚴🏽"]],"1f3fe":["1f6b4-1f3fe-200d-2642-fe0f",46,23,5,["🚴🏾‍♂️","🚴🏾"]],"1f3ff":["1f6b4-1f3ff-200d-2642-fe0f",46,24,5,["🚴🏿‍♂️","🚴🏿"]]},"1f6b5-200d-2640-fe0f":{"1f3fb":["1f6b5-1f3fb-200d-2640-fe0f",46,26,5,["🚵🏻‍♀️"]],"1f3fc":["1f6b5-1f3fc-200d-2640-fe0f",46,27,5,["🚵🏼‍♀️"]],"1f3fd":["1f6b5-1f3fd-200d-2640-fe0f",46,28,5,["🚵🏽‍♀️"]],"1f3fe":["1f6b5-1f3fe-200d-2640-fe0f",46,29,5,["🚵🏾‍♀️"]],"1f3ff":["1f6b5-1f3ff-200d-2640-fe0f",46,30,5,["🚵🏿‍♀️"]]},"1f6b5-200d-2642-fe0f":{"1f3fb":["1f6b5-1f3fb-200d-2642-fe0f",46,32,5,["🚵🏻‍♂️","🚵🏻"]],"1f3fc":["1f6b5-1f3fc-200d-2642-fe0f",46,33,5,["🚵🏼‍♂️","🚵🏼"]],"1f3fd":["1f6b5-1f3fd-200d-2642-fe0f",46,34,5,["🚵🏽‍♂️","🚵🏽"]],"1f3fe":["1f6b5-1f3fe-200d-2642-fe0f",46,35,5,["🚵🏾‍♂️","🚵🏾"]],"1f3ff":["1f6b5-1f3ff-200d-2642-fe0f",46,36,5,["🚵🏿‍♂️","🚵🏿"]]},"1f6b6-200d-2640-fe0f":{"1f3fb":["1f6b6-1f3fb-200d-2640-fe0f",46,38,5,["🚶🏻‍♀️"]],"1f3fc":["1f6b6-1f3fc-200d-2640-fe0f",46,39,5,["🚶🏼‍♀️"]],"1f3fd":["1f6b6-1f3fd-200d-2640-fe0f",46,40,5,["🚶🏽‍♀️"]],"1f3fe":["1f6b6-1f3fe-200d-2640-fe0f",46,41,5,["🚶🏾‍♀️"]],"1f3ff":["1f6b6-1f3ff-200d-2640-fe0f",46,42,5,["🚶🏿‍♀️"]]},"1f6b6-200d-2642-fe0f":{"1f3fb":["1f6b6-1f3fb-200d-2642-fe0f",46,44,5,["🚶🏻‍♂️","🚶🏻"]],"1f3fc":["1f6b6-1f3fc-200d-2642-fe0f",46,45,5,["🚶🏼‍♂️","🚶🏼"]],"1f3fd":["1f6b6-1f3fd-200d-2642-fe0f",46,46,5,["🚶🏽‍♂️","🚶🏽"]],"1f3fe":["1f6b6-1f3fe-200d-2642-fe0f",46,47,5,["🚶🏾‍♂️","🚶🏾"]],"1f3ff":["1f6b6-1f3ff-200d-2642-fe0f",46,48,5,["🚶🏿‍♂️","🚶🏿"]]},"1f926-200d-2640-fe0f":{"1f3fb":["1f926-1f3fb-200d-2640-fe0f",47,1,5,["🤦🏻‍♀️"]],"1f3fc":["1f926-1f3fc-200d-2640-fe0f",47,2,5,["🤦🏼‍♀️"]],"1f3fd":["1f926-1f3fd-200d-2640-fe0f",47,3,5,["🤦🏽‍♀️"]],"1f3fe":["1f926-1f3fe-200d-2640-fe0f",47,4,5,["🤦🏾‍♀️"]],"1f3ff":["1f926-1f3ff-200d-2640-fe0f",47,5,5,["🤦🏿‍♀️"]]},"1f926-200d-2642-fe0f":{"1f3fb":["1f926-1f3fb-200d-2642-fe0f",47,7,5,["🤦🏻‍♂️"]],"1f3fc":["1f926-1f3fc-200d-2642-fe0f",47,8,5,["🤦🏼‍♂️"]],"1f3fd":["1f926-1f3fd-200d-2642-fe0f",47,9,5,["🤦🏽‍♂️"]],"1f3fe":["1f926-1f3fe-200d-2642-fe0f",47,10,5,["🤦🏾‍♂️"]],"1f3ff":["1f926-1f3ff-200d-2642-fe0f",47,11,5,["🤦🏿‍♂️"]]},"1f937-200d-2640-fe0f":{"1f3fb":["1f937-1f3fb-200d-2640-fe0f",47,13,5,["🤷🏻‍♀️"]],"1f3fc":["1f937-1f3fc-200d-2640-fe0f",47,14,5,["🤷🏼‍♀️"]],"1f3fd":["1f937-1f3fd-200d-2640-fe0f",47,15,5,["🤷🏽‍♀️"]],"1f3fe":["1f937-1f3fe-200d-2640-fe0f",47,16,5,["🤷🏾‍♀️"]],"1f3ff":["1f937-1f3ff-200d-2640-fe0f",47,17,5,["🤷🏿‍♀️"]]},"1f937-200d-2642-fe0f":{"1f3fb":["1f937-1f3fb-200d-2642-fe0f",47,19,5,["🤷🏻‍♂️"]],"1f3fc":["1f937-1f3fc-200d-2642-fe0f",47,20,5,["🤷🏼‍♂️"]],"1f3fd":["1f937-1f3fd-200d-2642-fe0f",47,21,5,["🤷🏽‍♂️"]],"1f3fe":["1f937-1f3fe-200d-2642-fe0f",47,22,5,["🤷🏾‍♂️"]],"1f3ff":["1f937-1f3ff-200d-2642-fe0f",47,23,5,["🤷🏿‍♂️"]]},"1f938-200d-2640-fe0f":{"1f3fb":["1f938-1f3fb-200d-2640-fe0f",47,25,5,["🤸🏻‍♀️"]],"1f3fc":["1f938-1f3fc-200d-2640-fe0f",47,26,5,["🤸🏼‍♀️"]],"1f3fd":["1f938-1f3fd-200d-2640-fe0f",47,27,5,["🤸🏽‍♀️"]],"1f3fe":["1f938-1f3fe-200d-2640-fe0f",47,28,5,["🤸🏾‍♀️"]],"1f3ff":["1f938-1f3ff-200d-2640-fe0f",47,29,5,["🤸🏿‍♀️"]]},"1f938-200d-2642-fe0f":{"1f3fb":["1f938-1f3fb-200d-2642-fe0f",47,31,5,["🤸🏻‍♂️"]],"1f3fc":["1f938-1f3fc-200d-2642-fe0f",47,32,5,["🤸🏼‍♂️"]],"1f3fd":["1f938-1f3fd-200d-2642-fe0f",47,33,5,["🤸🏽‍♂️"]],"1f3fe":["1f938-1f3fe-200d-2642-fe0f",47,34,5,["🤸🏾‍♂️"]],"1f3ff":["1f938-1f3ff-200d-2642-fe0f",47,35,5,["🤸🏿‍♂️"]]},"1f939-200d-2640-fe0f":{"1f3fb":["1f939-1f3fb-200d-2640-fe0f",47,37,5,["🤹🏻‍♀️"]],"1f3fc":["1f939-1f3fc-200d-2640-fe0f",47,38,5,["🤹🏼‍♀️"]],"1f3fd":["1f939-1f3fd-200d-2640-fe0f",47,39,5,["🤹🏽‍♀️"]],"1f3fe":["1f939-1f3fe-200d-2640-fe0f",47,40,5,["🤹🏾‍♀️"]],"1f3ff":["1f939-1f3ff-200d-2640-fe0f",47,41,5,["🤹🏿‍♀️"]]},"1f939-200d-2642-fe0f":{"1f3fb":["1f939-1f3fb-200d-2642-fe0f",47,43,5,["🤹🏻‍♂️"]],"1f3fc":["1f939-1f3fc-200d-2642-fe0f",47,44,5,["🤹🏼‍♂️"]],"1f3fd":["1f939-1f3fd-200d-2642-fe0f",47,45,5,["🤹🏽‍♂️"]],"1f3fe":["1f939-1f3fe-200d-2642-fe0f",47,46,5,["🤹🏾‍♂️"]],"1f3ff":["1f939-1f3ff-200d-2642-fe0f",47,47,5,["🤹🏿‍♂️"]]},"1f93d-200d-2640-fe0f":{"1f3fb":["1f93d-1f3fb-200d-2640-fe0f",48,2,5,["🤽🏻‍♀️"]],"1f3fc":["1f93d-1f3fc-200d-2640-fe0f",48,3,5,["🤽🏼‍♀️"]],"1f3fd":["1f93d-1f3fd-200d-2640-fe0f",48,4,5,["🤽🏽‍♀️"]],"1f3fe":["1f93d-1f3fe-200d-2640-fe0f",48,5,5,["🤽🏾‍♀️"]],"1f3ff":["1f93d-1f3ff-200d-2640-fe0f",48,6,5,["🤽🏿‍♀️"]]},"1f93d-200d-2642-fe0f":{"1f3fb":["1f93d-1f3fb-200d-2642-fe0f",48,8,5,["🤽🏻‍♂️"]],"1f3fc":["1f93d-1f3fc-200d-2642-fe0f",48,9,5,["🤽🏼‍♂️"]],"1f3fd":["1f93d-1f3fd-200d-2642-fe0f",48,10,5,["🤽🏽‍♂️"]],"1f3fe":["1f93d-1f3fe-200d-2642-fe0f",48,11,5,["🤽🏾‍♂️"]],"1f3ff":["1f93d-1f3ff-200d-2642-fe0f",48,12,5,["🤽🏿‍♂️"]]},"1f93e-200d-2640-fe0f":{"1f3fb":["1f93e-1f3fb-200d-2640-fe0f",48,14,5,["🤾🏻‍♀️"]],"1f3fc":["1f93e-1f3fc-200d-2640-fe0f",48,15,5,["🤾🏼‍♀️"]],"1f3fd":["1f93e-1f3fd-200d-2640-fe0f",48,16,5,["🤾🏽‍♀️"]],"1f3fe":["1f93e-1f3fe-200d-2640-fe0f",48,17,5,["🤾🏾‍♀️"]],"1f3ff":["1f93e-1f3ff-200d-2640-fe0f",48,18,5,["🤾🏿‍♀️"]]},"1f93e-200d-2642-fe0f":{"1f3fb":["1f93e-1f3fb-200d-2642-fe0f",48,20,5,["🤾🏻‍♂️"]],"1f3fc":["1f93e-1f3fc-200d-2642-fe0f",48,21,5,["🤾🏼‍♂️"]],"1f3fd":["1f93e-1f3fd-200d-2642-fe0f",48,22,5,["🤾🏽‍♂️"]],"1f3fe":["1f93e-1f3fe-200d-2642-fe0f",48,23,5,["🤾🏾‍♂️"]],"1f3ff":["1f93e-1f3ff-200d-2642-fe0f",48,24,5,["🤾🏿‍♂️"]]},"26f9-fe0f-200d-2640-fe0f":{"1f3fb":["26f9-1f3fb-200d-2640-fe0f",48,26,5,["⛹🏻‍♀️"]],"1f3fc":["26f9-1f3fc-200d-2640-fe0f",48,27,5,["⛹🏼‍♀️"]],"1f3fd":["26f9-1f3fd-200d-2640-fe0f",48,28,5,["⛹🏽‍♀️"]],"1f3fe":["26f9-1f3fe-200d-2640-fe0f",48,29,5,["⛹🏾‍♀️"]],"1f3ff":["26f9-1f3ff-200d-2640-fe0f",48,30,5,["⛹🏿‍♀️"]]},"26f9-fe0f-200d-2642-fe0f":{"1f3fb":["26f9-1f3fb-200d-2642-fe0f",48,32,5,["⛹🏻‍♂️","⛹🏻"]],"1f3fc":["26f9-1f3fc-200d-2642-fe0f",48,33,5,["⛹🏼‍♂️","⛹🏼"]],"1f3fd":["26f9-1f3fd-200d-2642-fe0f",48,34,5,["⛹🏽‍♂️","⛹🏽"]],"1f3fe":["26f9-1f3fe-200d-2642-fe0f",48,35,5,["⛹🏾‍♂️","⛹🏾"]],"1f3ff":["26f9-1f3ff-200d-2642-fe0f",48,36,5,["⛹🏿‍♂️","⛹🏿"]]}},s.prototype.obsoletes_data={"26f9-fe0f-200d-2642-fe0f":["26f9",2,25,31],"26f9-1f3fb-200d-2642-fe0f":["26f9-1f3fb",2,26,31],"26f9-1f3fc-200d-2642-fe0f":["26f9-1f3fc",2,27,31],"26f9-1f3fd-200d-2642-fe0f":["26f9-1f3fd",2,28,31],"26f9-1f3fe-200d-2642-fe0f":["26f9-1f3fe",2,29,31],"26f9-1f3ff-200d-2642-fe0f":["26f9-1f3ff",2,30,31],"1f3c3-200d-2642-fe0f":["1f3c3",8,35,63],"1f3c3-1f3fb-200d-2642-fe0f":["1f3c3-1f3fb",8,36,63],"1f3c3-1f3fc-200d-2642-fe0f":["1f3c3-1f3fc",8,37,63],"1f3c3-1f3fd-200d-2642-fe0f":["1f3c3-1f3fd",8,38,63],"1f3c3-1f3fe-200d-2642-fe0f":["1f3c3-1f3fe",8,39,63],"1f3c3-1f3ff-200d-2642-fe0f":["1f3c3-1f3ff",8,40,63],"1f3c4-200d-2642-fe0f":["1f3c4",8,41,63],"1f3c4-1f3fb-200d-2642-fe0f":["1f3c4-1f3fb",8,42,63],"1f3c4-1f3fc-200d-2642-fe0f":["1f3c4-1f3fc",8,43,63],"1f3c4-1f3fd-200d-2642-fe0f":["1f3c4-1f3fd",8,44,63],"1f3c4-1f3fe-200d-2642-fe0f":["1f3c4-1f3fe",8,45,63],"1f3c4-1f3ff-200d-2642-fe0f":["1f3c4-1f3ff",8,46,63],"1f3ca-200d-2642-fe0f":["1f3ca",9,8,63],"1f3ca-1f3fb-200d-2642-fe0f":["1f3ca-1f3fb",9,9,63],"1f3ca-1f3fc-200d-2642-fe0f":["1f3ca-1f3fc",9,10,63],"1f3ca-1f3fd-200d-2642-fe0f":["1f3ca-1f3fd",9,11,63],"1f3ca-1f3fe-200d-2642-fe0f":["1f3ca-1f3fe",9,12,63],"1f3ca-1f3ff-200d-2642-fe0f":["1f3ca-1f3ff",9,13,63],"1f3cb-fe0f-200d-2642-fe0f":["1f3cb",9,14,31],"1f3cb-1f3fb-200d-2642-fe0f":["1f3cb-1f3fb",9,15,31],"1f3cb-1f3fc-200d-2642-fe0f":["1f3cb-1f3fc",9,16,31],"1f3cb-1f3fd-200d-2642-fe0f":["1f3cb-1f3fd",9,17,31],"1f3cb-1f3fe-200d-2642-fe0f":["1f3cb-1f3fe",9,18,31],"1f3cb-1f3ff-200d-2642-fe0f":["1f3cb-1f3ff",9,19,31],"1f3cc-fe0f-200d-2642-fe0f":["1f3cc",9,20,31],"1f3cc-1f3fb-200d-2642-fe0f":["1f3cc-1f3fb",9,21,21],"1f3cc-1f3fc-200d-2642-fe0f":["1f3cc-1f3fc",9,22,21],"1f3cc-1f3fd-200d-2642-fe0f":["1f3cc-1f3fd",9,23,21],"1f3cc-1f3fe-200d-2642-fe0f":["1f3cc-1f3fe",9,24,21],"1f3cc-1f3ff-200d-2642-fe0f":["1f3cc-1f3ff",9,25,21],"1f468-200d-1f469-200d-1f466":["1f46a",14,20,63],"1f46e-200d-2642-fe0f":["1f46e",14,24,63],"1f46e-1f3fb-200d-2642-fe0f":["1f46e-1f3fb",14,25,63],"1f46e-1f3fc-200d-2642-fe0f":["1f46e-1f3fc",14,26,63],"1f46e-1f3fd-200d-2642-fe0f":["1f46e-1f3fd",14,27,63],"1f46e-1f3fe-200d-2642-fe0f":["1f46e-1f3fe",14,28,63],"1f46e-1f3ff-200d-2642-fe0f":["1f46e-1f3ff",14,29,63],"1f46f-200d-2640-fe0f":["1f46f",14,30,63],"1f471-200d-2642-fe0f":["1f471",14,37,63],"1f471-1f3fb-200d-2642-fe0f":["1f471-1f3fb",14,38,63],"1f471-1f3fc-200d-2642-fe0f":["1f471-1f3fc",14,39,63],"1f471-1f3fd-200d-2642-fe0f":["1f471-1f3fd",14,40,63],"1f471-1f3fe-200d-2642-fe0f":["1f471-1f3fe",14,41,63],"1f471-1f3ff-200d-2642-fe0f":["1f471-1f3ff",14,42,63],"1f473-200d-2642-fe0f":["1f473",15,0,63],"1f473-1f3fb-200d-2642-fe0f":["1f473-1f3fb",15,1,63],"1f473-1f3fc-200d-2642-fe0f":["1f473-1f3fc",15,2,63],"1f473-1f3fd-200d-2642-fe0f":["1f473-1f3fd",15,3,63],"1f473-1f3fe-200d-2642-fe0f":["1f473-1f3fe",15,4,63],"1f473-1f3ff-200d-2642-fe0f":["1f473-1f3ff",15,5,63],"1f477-200d-2642-fe0f":["1f477",15,24,63],"1f477-1f3fb-200d-2642-fe0f":["1f477-1f3fb",15,25,63],"1f477-1f3fc-200d-2642-fe0f":["1f477-1f3fc",15,26,63],"1f477-1f3fd-200d-2642-fe0f":["1f477-1f3fd",15,27,63],"1f477-1f3fe-200d-2642-fe0f":["1f477-1f3fe",15,28,63],"1f477-1f3ff-200d-2642-fe0f":["1f477-1f3ff",15,29,63],"1f481-200d-2640-fe0f":["1f481",16,0,63],"1f481-1f3fb-200d-2640-fe0f":["1f481-1f3fb",16,1,63],"1f481-1f3fc-200d-2640-fe0f":["1f481-1f3fc",16,2,63],"1f481-1f3fd-200d-2640-fe0f":["1f481-1f3fd",16,3,63],"1f481-1f3fe-200d-2640-fe0f":["1f481-1f3fe",16,4,63],"1f481-1f3ff-200d-2640-fe0f":["1f481-1f3ff",16,5,63],"1f482-200d-2642-fe0f":["1f482",16,6,63],"1f482-1f3fb-200d-2642-fe0f":["1f482-1f3fb",16,7,63],"1f482-1f3fc-200d-2642-fe0f":["1f482-1f3fc",16,8,63],"1f482-1f3fd-200d-2642-fe0f":["1f482-1f3fd",16,9,63],"1f482-1f3fe-200d-2642-fe0f":["1f482-1f3fe",16,10,63],"1f482-1f3ff-200d-2642-fe0f":["1f482-1f3ff",16,11,63],"1f486-200d-2640-fe0f":["1f486",16,25,63],"1f486-1f3fb-200d-2640-fe0f":["1f486-1f3fb",16,26,63],"1f486-1f3fc-200d-2640-fe0f":["1f486-1f3fc",16,27,63],"1f486-1f3fd-200d-2640-fe0f":["1f486-1f3fd",16,28,63],"1f486-1f3fe-200d-2640-fe0f":["1f486-1f3fe",16,29,63],"1f486-1f3ff-200d-2640-fe0f":["1f486-1f3ff",16,30,63],"1f487-200d-2640-fe0f":["1f487",16,31,63],"1f487-1f3fb-200d-2640-fe0f":["1f487-1f3fb",16,32,63],"1f487-1f3fc-200d-2640-fe0f":["1f487-1f3fc",16,33,63],"1f487-1f3fd-200d-2640-fe0f":["1f487-1f3fd",16,34,63],"1f487-1f3fe-200d-2640-fe0f":["1f487-1f3fe",16,35,63],"1f487-1f3ff-200d-2640-fe0f":["1f487-1f3ff",16,36,63],"1f469-200d-2764-fe0f-200d-1f48b-200d-1f468":["1f48f",16,44,61],"1f469-200d-2764-fe0f-200d-1f468":["1f491",16,46,61],"1f575-fe0f-200d-2642-fe0f":["1f575",21,17,31],"1f575-1f3fb-200d-2642-fe0f":["1f575-1f3fb",21,18,31],"1f575-1f3fc-200d-2642-fe0f":["1f575-1f3fc",21,19,31],"1f575-1f3fd-200d-2642-fe0f":["1f575-1f3fd",21,20,31],"1f575-1f3fe-200d-2642-fe0f":["1f575-1f3fe",21,21,31],"1f575-1f3ff-200d-2642-fe0f":["1f575-1f3ff",21,22,31],"1f645-200d-2640-fe0f":["1f645",24,4,63],"1f645-1f3fb-200d-2640-fe0f":["1f645-1f3fb",24,5,63],"1f645-1f3fc-200d-2640-fe0f":["1f645-1f3fc",24,6,63],"1f645-1f3fd-200d-2640-fe0f":["1f645-1f3fd",24,7,63],"1f645-1f3fe-200d-2640-fe0f":["1f645-1f3fe",24,8,63],"1f645-1f3ff-200d-2640-fe0f":["1f645-1f3ff",24,9,63],"1f646-200d-2640-fe0f":["1f646",24,10,63],"1f646-1f3fb-200d-2640-fe0f":["1f646-1f3fb",24,11,63],"1f646-1f3fc-200d-2640-fe0f":["1f646-1f3fc",24,12,63],"1f646-1f3fd-200d-2640-fe0f":["1f646-1f3fd",24,13,63],"1f646-1f3fe-200d-2640-fe0f":["1f646-1f3fe",24,14,63],"1f646-1f3ff-200d-2640-fe0f":["1f646-1f3ff",24,15,63],"1f647-200d-2642-fe0f":["1f647",24,16,63],"1f647-1f3fb-200d-2642-fe0f":["1f647-1f3fb",24,17,63],"1f647-1f3fc-200d-2642-fe0f":["1f647-1f3fc",24,18,63],"1f647-1f3fd-200d-2642-fe0f":["1f647-1f3fd",24,19,63],"1f647-1f3fe-200d-2642-fe0f":["1f647-1f3fe",24,20,63],"1f647-1f3ff-200d-2642-fe0f":["1f647-1f3ff",24,21,63],"1f64b-200d-2640-fe0f":["1f64b",24,25,63],"1f64b-1f3fb-200d-2640-fe0f":["1f64b-1f3fb",24,26,63],"1f64b-1f3fc-200d-2640-fe0f":["1f64b-1f3fc",24,27,63],"1f64b-1f3fd-200d-2640-fe0f":["1f64b-1f3fd",24,28,63],"1f64b-1f3fe-200d-2640-fe0f":["1f64b-1f3fe",24,29,63],"1f64b-1f3ff-200d-2640-fe0f":["1f64b-1f3ff",24,30,63],"1f64d-200d-2640-fe0f":["1f64d",24,37,63],"1f64d-1f3fb-200d-2640-fe0f":["1f64d-1f3fb",24,38,63],"1f64d-1f3fc-200d-2640-fe0f":["1f64d-1f3fc",24,39,63],"1f64d-1f3fd-200d-2640-fe0f":["1f64d-1f3fd",24,40,63],"1f64d-1f3fe-200d-2640-fe0f":["1f64d-1f3fe",24,41,63],"1f64d-1f3ff-200d-2640-fe0f":["1f64d-1f3ff",24,42,63],"1f64e-200d-2640-fe0f":["1f64e",24,43,63],"1f64e-1f3fb-200d-2640-fe0f":["1f64e-1f3fb",24,44,63],"1f64e-1f3fc-200d-2640-fe0f":["1f64e-1f3fc",24,45,63],"1f64e-1f3fd-200d-2640-fe0f":["1f64e-1f3fd",24,46,63],"1f64e-1f3fe-200d-2640-fe0f":["1f64e-1f3fe",24,47,63],"1f64e-1f3ff-200d-2640-fe0f":["1f64e-1f3ff",24,48,63],"1f6a3-200d-2642-fe0f":["1f6a3",25,41,63],"1f6a3-1f3fb-200d-2642-fe0f":["1f6a3-1f3fb",25,42,31],"1f6a3-1f3fc-200d-2642-fe0f":["1f6a3-1f3fc",25,43,31],"1f6a3-1f3fd-200d-2642-fe0f":["1f6a3-1f3fd",25,44,31],"1f6a3-1f3fe-200d-2642-fe0f":["1f6a3-1f3fe",25,45,31],"1f6a3-1f3ff-200d-2642-fe0f":["1f6a3-1f3ff",25,46,31],"1f6b4-200d-2642-fe0f":["1f6b4",26,14,63],"1f6b4-1f3fb-200d-2642-fe0f":["1f6b4-1f3fb",26,15,63],"1f6b4-1f3fc-200d-2642-fe0f":["1f6b4-1f3fc",26,16,63],"1f6b4-1f3fd-200d-2642-fe0f":["1f6b4-1f3fd",26,17,63],"1f6b4-1f3fe-200d-2642-fe0f":["1f6b4-1f3fe",26,18,63],"1f6b4-1f3ff-200d-2642-fe0f":["1f6b4-1f3ff",26,19,63],"1f6b5-200d-2642-fe0f":["1f6b5",26,20,63],"1f6b5-1f3fb-200d-2642-fe0f":["1f6b5-1f3fb",26,21,63],"1f6b5-1f3fc-200d-2642-fe0f":["1f6b5-1f3fc",26,22,63],"1f6b5-1f3fd-200d-2642-fe0f":["1f6b5-1f3fd",26,23,63],"1f6b5-1f3fe-200d-2642-fe0f":["1f6b5-1f3fe",26,24,63],"1f6b5-1f3ff-200d-2642-fe0f":["1f6b5-1f3ff",26,25,63],"1f6b6-200d-2642-fe0f":["1f6b6",26,26,63],"1f6b6-1f3fb-200d-2642-fe0f":["1f6b6-1f3fb",26,27,63],"1f6b6-1f3fc-200d-2642-fe0f":["1f6b6-1f3fc",26,28,63],"1f6b6-1f3fd-200d-2642-fe0f":["1f6b6-1f3fd",26,29,63],"1f6b6-1f3fe-200d-2642-fe0f":["1f6b6-1f3fe",26,30,63],"1f6b6-1f3ff-200d-2642-fe0f":["1f6b6-1f3ff",26,31,63]},void 0!==e&&e.exports&&(_=e.exports=s),_.EmojiConvertor=s}).call(function(){return this||("undefined"!=typeof window?window:a)}())}).call(this,a(14))},function(e,_,a){"use strict";Object.defineProperty(_,"__esModule",{value:!0});var o=function(){function e(e,_){for(var a=0;a<_.length;a++){var o=_[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(_,a,o){return a&&e(_.prototype,a),o&&e(_,o),_}}(),s=i(a(0)),t=i(a(3));function i(e){return e&&e.__esModule?e:{default:e}}var r=function(){function e(_){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];!function(e,_){if(!(e instanceof _))throw new TypeError("Cannot call a class as a function")}(this,e),this._input=_,this._is_content_editable=this.isContentEditable(_),this.cursor_position=void 0,this.prevent_new_line=a,this._trackCursor(),this._onPaste()}return o(e,[{key:"isContentEditable",value:function(e){var _=e.nodeName;return e.isContentEditable&&"INPUT"!==_&&"TEXTAREA"!==_}},{key:"placeEmoji",value:function(_){if(this._input.focus(),this.cursor_position&&e.restoreSelection(this.cursor_position),this._is_content_editable){var a=void 0;return e.supportsUnified()?(a=e.pasteTextAtCaret(_.getCharacter()),e.selectElement(a),this.cursor_position=e.saveSelection()):(a=e.pasteHtml(_.getHtml()),this.cursor_position=e.saveSelection()),(0,s.default)(this._input).trigger("change").trigger("input"),a}var o=this.pasteInputText(_.getColons());return(0,s.default)(this._input).trigger("change").trigger("input"),o}},{key:"pasteInputText",value:function(e){var _=this._input.selectionStart,a=this._input.value.length;return this._input.value=this._input.value.substr(0,_)+e+this._input.value.substr(_),this.setInputCaretPosition(_+this._input.value.length-a),e}},{key:"setInputCaretPosition",value:function(e){if(this._input.createTextRange){var _=this._input.createTextRange();return _.move("character",e),_.select(),!0}return this._input.selectionStart||0===this._input.selectionStart?(this._input.focus(),this._input.setSelectionRange(e,e),!0):(this._input.focus(),!1)}},{key:"getText",value:function(){return this._is_content_editable?this._mapElement(this._input).replace(/[\u200B-\u200D\uFEFF]/g,""):t.default.withUnified().replace_colons(this._input.value)}},{key:"empty",value:function(){this._is_content_editable?this._input.innerHTML="":this._input.value=""}},{key:"_onPaste",value:function(){return this._is_content_editable&&(0,s.default)(this._input).off("paste.editable").on("paste.editable",function(_){_.stopPropagation(),_.preventDefault();var a=(_.originalEvent.clipboardData||window.clipboardData).getData("text"),o=e.pasteTextAtCaret(a);e.selectElement(o)}),this}},{key:"getNodes",value:function(){return Array.prototype.slice.call(this._input.childNodes)}},{key:"selectLastNode",value:function(){var _=this.getNodes();_.length&&(e.selectElement(_[_.length-1]),this.cursor_position=e.saveSelection())}},{key:"_mapElement",value:function(_){var a=this;return Array.prototype.slice.call(_.childNodes).map(function(_){var o=_ instanceof Text,s=_ instanceof HTMLElement;return o?_.textContent:s&&"SPAN"===_.tagName?e._extractSpan(_):s&&"IMG"===_.tagName?e._extractImage(_):s&&"BR"===_.tagName?"\n":s?a._mapElement(_):""}).join("")}},{key:"_trackCursor",value:function(){var _=this;return this._is_content_editable&&((0,s.default)(this._input).off("keyup.emoji mouseup.emoji").on("keyup.emoji mouseup.emoji",function(){_.cursor_position=e.saveSelection()}),(0,s.default)(this._input).off("keydown.emoji").on("keydown.emoji",function(e){13===e.which&&_.prevent_new_line&&e.preventDefault()})),this}},{key:"replaceUnified",value:function(){if(!this._is_content_editable)throw new Error("The replaceUnified method should only be called on contenteditable elements.");var _=t.default.withEnvironment().replace_unified(this._input.innerHTML);e.selectElementContents(this._input);var a=e.pasteHtml(_);a&&e.selectElement(a)}}],[{key:"_extractSpan",value:function(_){var a=(0,s.default)(_).find(".emoji-inner");if(!a.length)return"";try{var o=a.data("codepoints");return e.parseCodepoints(o)}catch(e){return""}}},{key:"_extractImage",value:function(_){return _.hasAttribute("data-codepoints")?e.parseCodepoints(_.getAttribute("data-codepoints")):""}},{key:"parseCodepoints",value:function(e){if(/-/g.test(e)){var _=e.split("-"),a="0x"+_[0],o="0x"+_[1];return String.fromCodePoint(a,o)}return String.fromCodePoint("0x"+e)}},{key:"supportsUnified",value:function(){return"unified"===t.default.withEnvironment().replace_mode}},{key:"pasteHtml",value:function(_){return e.pasteHtmlAtCaret(_+"&#8203;")}},{key:"saveSelection",value:function(){if(window.getSelection){var e=window.getSelection();if(e.getRangeAt&&e.rangeCount)return e.getRangeAt(0)}else if(document.selection&&document.selection.createRange)return document.selection.createRange();return null}},{key:"restoreSelection",value:function(e){if(e)if(window.getSelection){var _=window.getSelection();_.removeAllRanges(),_.addRange(e)}else document.selection&&e.select&&e.select()}},{key:"pasteTextAtCaret",value:function(e){var _=void 0,a=void 0,o=document.createTextNode(e);return window.getSelection?(_=window.getSelection()).getRangeAt&&_.rangeCount&&((a=_.getRangeAt(0)).deleteContents(),a.insertNode(o)):document.selection&&document.selection.createRange&&(document.selection.createRange().text=o.textContent),o}},{key:"selectElement",value:function(e){var _=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(window.getSelection){var a=window.getSelection();a.removeAllRanges();var o=document.createRange();o.selectNodeContents(e),_||o.collapse(!1),a.addRange(o)}else if(document.selection){var s=document.body.createTextRange();s.moveToElementText(e),s.select()}}},{key:"pasteHtmlAtCaret",value:function(e,_){var a=void 0,o=void 0;if(window.getSelection){if((a=window.getSelection()).getRangeAt&&a.rangeCount){(o=a.getRangeAt(0)).deleteContents();var s=document.createElement("div");s.innerHTML=e;for(var t=document.createDocumentFragment(),i=void 0,r=void 0;i=s.firstChild;)r=t.appendChild(i);var m=t.firstChild;return o.insertNode(t),r&&((o=o.cloneRange()).setStartAfter(r),_?o.setStartBefore(m):o.collapse(!1),a.removeAllRanges(),a.addRange(o)),m}}else if((a=document.selection)&&"Control"!=a.type){var f=a.createRange();f.collapse(!0),a.createRange().pasteHTML(e),_&&((o=a.createRange()).setEndPoint("StartToStart",f),o.select())}}},{key:"selectElementContents",value:function(e){var _=document.createRange();_.selectNodeContents(e);var a=window.getSelection();a.removeAllRanges(),a.addRange(_)}}]),e}();_.default=r},function(e,_,a){"use strict";Object.defineProperty(_,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(){function e(e,_){for(var a=0;a<_.length;a++){var o=_[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(_,a,o){return a&&e(_.prototype,a),o&&e(_,o),_}}(),t=d(a(0)),i=d(a(16)),r=d(a(13)),m=d(a(3)),f=d(a(8)),n=d(a(7)),g=d(a(2)),h=d(a(6)),l=d(a(5));function d(e){return e&&e.__esModule?e:{default:e}}a(4);var p=function(){function e(){var _=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;!function(e,_){if(!(e instanceof _))throw new TypeError("Cannot call a class as a function")}(this,e),this._callback=void 0,this.defaults=Object.assign({},g.default),"object"===(void 0===a?"undefined":o(a))&&this._setDefaults(a),"function"==typeof a&&(this._callback=a),this.categories=this._getCategories(),this.$picker=this._getPicker(),this.$active_title=this.$picker.find("#active-title"),this.$preview_emoji=this.$picker.find("#emoji-large-preview"),this.$preview_name=this.$picker.find("#emoji-name"),this.$preview_colon=this.$picker.find("#colon-display"),this.$content=this.$picker.find(".emoji-content"),this.$default_footer=this.$picker.find(".default-content"),this.$preview=this.$picker.find(".emoji-preview"),this.$search=this.$picker.find(".search-emojis"),this._icon=void 0,this._container=void 0,this._input=void 0,this.editor=void 0;var s=!1;Object.defineProperty(this,"picker_open",{get:function(){return s},set:function(e){e!==s&&((s=e)||_.$picker.detach())}});var t=void 0;Object.defineProperty(this,"active_category",{get:function(){return t},set:function(e){(!t||e instanceof r.default&&e.title!==t.title)&&(t=e,_.setActiveCategory())}});var i=void 0;Object.defineProperty(this,"active_emoji",{get:function(){return i},set:function(e){i&&e&&e.full_name===i.full_name||(i=e,_._updatePreview())}}),this.active_category=this.categories[0],this._onScroll()._onCatClick()._onSearch()._setCategoryTooltips(),"function"==typeof this.defaults.onReady&&this.defaults.onReady(this.categories)}return s(e,[{key:"listenOn",value:function(e,_,a){this._removeOldEvents(),this._icon=e,this._container=_,this._input=a,this.editor=new i.default(a,this.defaults.prevent_new_line),this._onIconClick()}},{key:"openPicker",value:function(e){var _=new f.default(this._icon,this._container,this.$picker.get(0));if(_.center(),"function"==typeof this.defaults.positioning)this.defaults.positioning(_);else switch(this.defaults.positioning){case"autoplace":_.autoPlace(43,10);break;case"vertical":_.autoPlaceVertically(10);break;case"horizontal":_.autoPlaceHorizontally(10);break;default:_.autoPlace(43,10)}return this._onTooltipClick(_,e),this.$content.get(0).scrollTop=this.active_category.offset_top,"function"==typeof this.defaults.onOpen&&this.defaults.onOpen(),this}},{key:"getText",value:function(){if(this.editor)return this.editor.getText();throw new Error("Did you call this listenOn method first? The listenOn method constructs an instance of EmojiEditor and it appears to be undefined.")}},{key:"emptyInput",value:function(){this.editor?this.editor.empty():console.log("Did you call the listenOn method first? The EmojiEditor instance is undefined.")}},{key:"setActiveCategory",value:function(){var e=this;return this.$picker.find(".select-category").each(function(){this.getAttribute("data-name")===e.active_category.title?(this.classList.add("active"),e.$active_title.text(e.active_category.title)):this.classList.remove("active")}),this}},{key:"setActiveCategoryByName",value:function(e){var _=this.getCategory(e);if(console.log(_),!_)throw new ReferenceError("Your call to setActiveCategoryByName in rm-emoji-picker was not supplied a valid name. Valid names are: "+this.categories.map(function(e){return e.title}).join(", ").slice(0,-2));this.active_category=_}},{key:"getCategory",value:function(e){return this.categories.find(function(_){return _.title===e})}},{key:"getEmoji",value:function(e){var _=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return _?_.emojis.find(function(_){return _.full_name===e}):this.categories.find(function(_){return _.emojis.find(function(_){return _.full_name===e})})}},{key:"_setDefaults",value:function(e){var _=this;Object.keys(e).forEach(function(a){_.defaults.hasOwnProperty(a)&&(_.defaults[a]=e[a])}),this.defaults.use_sheets&&m.default.setSheets(this.defaults.sheets)}},{key:"_dispatchBubble",value:function(e,_,a){var o=g.default.events;switch(e){case o.SELECTED:this._handleSelection(_,a);break;case o.EMOJI_MOUSEENTER:this.active_emoji=_;break;case o.EMOJI_MOUSELEAVE:this.active_emoji=void 0}}},{key:"_handleSelection",value:function(e,_){var a=this.editor.placeEmoji(e);"function"==typeof this._callback&&this._callback(e,_,a),"function"==typeof this.defaults.callback&&this.defaults.callback(e,_,a),this.picker_open=!1,this.active_emoji=void 0}},{key:"_getCategories",value:function(){var e=this,_=this.defaults.categories.map(function(_){return r.default.factory(_,n.default[_.title],e._dispatchBubble.bind(e))});return _[0].$category.addClass("first"),_}},{key:"_getPicker",value:function(){var e=(0,t.default)((0,h.default)({default_content:g.default.default_footer_message,categories:this.categories.map(function(e){return e.exportContents()}),search_icon:this.defaults.search_icon})),_=e.find(".emoji-content");return this.categories.forEach(function(e){_.append(e.getMarkup())}),e}},{key:"_setCategoryTooltips",value:function(){if(this.$picker&&this.defaults.show_icon_tooltips){var e=this,_=void 0;this.$picker.find(".select-category").off("mouseenter.emoji").on("mouseenter.emoji",function(a){var o=this.getAttribute("data-name");(_=new f.default(this,e.$picker.get(0),(0,l.default)({text:o}))).below()}).off("mouseleave.emoji").on("mouseleave.emoji",function(){_.destroy()})}return this}},{key:"_removeOldEvents",value:function(){return this._icon&&(0,t.default)(this._icon).off("click.emoji-picker"),this}},{key:"_onIconClick",value:function(){var e=this;return(0,t.default)(this._icon).off("click.emoji").on("click.emoji",function(_){e.picker_open||e.openPicker(_),e.picker_open=!e.picker_open}),this}},{key:"_onTooltipClick",value:function(e,_){var a=this;e.setClickCallback(_,function(e,_){var o=(0,t.default)(e).closest("#emoji-picker"),s=(0,t.default)(e).is(a._icon);o.length||s||(a.picker_open=!1)})}},{key:"_onScroll",value:function(){var e=this;return this.$content.off("scroll.emoji").on("scroll.emoji",function(_){e.active_category=e._getActiveCategory()}),this}},{key:"_onCatClick",value:function(){var e=this;return this.$picker.find(".select-category").off("click.emoji").on("click.emoji",function(){var _=e.getCategory(this.getAttribute("data-name"));e.$content.get(0).scrollTop=_.offset_top,e.active_category=e._getActiveCategory()}),this}},{key:"_onSearch",value:function(){var e=this;return this.$search.off("input.emoji").on("input.emoji",function(){var _=e.$search.val().trim();e.categories.forEach(function(e){return e.search_term=_}),e.$active_title.text("Results for: "+_),0===_.length&&(e.active_category=e._getActiveCategory(),e.setActiveCategory())}),this}},{key:"_getActiveCategory",value:function(){for(var e=this.$content.get(0).scrollTop,_=this.categories[0],a=0;a<this.categories.length;a++){if(this.categories[a].offset_top>e)return _;_=this.categories[a]}return this.categories[this.categories.length-1]}},{key:"_updatePreview",value:function(){var e=this.active_emoji;e?(this.$default_footer.hide(),this.$preview_emoji.html(e.getPreview()),this.$preview_name.text(e.short_name),this.defaults.show_colon_preview?(this.$preview_colon.text(e.getColons()),this.$preview_name.removeClass("name-only")):this.$preview_name.addClass("name-only"),this.$preview.show()):(this.$preview.hide(),this.$default_footer.show())}}],[{key:"render",value:function(e){var _=m.default.withEnvironment();return m.default.is_mobile?_.replace_colons(e):_.replace_unified(_.replace_colons(e))}},{key:"setSheets",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;e=e||g.default.sheets,m.default.setSheets(e)}}]),e}();_.default=p}])});

/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__("./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/typed.js/lib/typed.js":
/***/ (function(module, exports, __webpack_require__) {

/*!
 * 
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.9
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Typed"] = factory();
	else
		root["Typed"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _initializerJs = __webpack_require__(1);
	
	var _htmlParserJs = __webpack_require__(3);
	
	/**
	 * Welcome to Typed.js!
	 * @param {string} elementId HTML element ID _OR_ HTML element
	 * @param {object} options options object
	 * @returns {object} a new Typed object
	 */
	
	var Typed = (function () {
	  function Typed(elementId, options) {
	    _classCallCheck(this, Typed);
	
	    // Initialize it up
	    _initializerJs.initializer.load(this, options, elementId);
	    // All systems go!
	    this.begin();
	  }
	
	  /**
	   * Toggle start() and stop() of the Typed instance
	   * @public
	   */
	
	  _createClass(Typed, [{
	    key: 'toggle',
	    value: function toggle() {
	      this.pause.status ? this.start() : this.stop();
	    }
	
	    /**
	     * Stop typing / backspacing and enable cursor blinking
	     * @public
	     */
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this.typingComplete) return;
	      if (this.pause.status) return;
	      this.toggleBlinking(true);
	      this.pause.status = true;
	      this.options.onStop(this.arrayPos, this);
	    }
	
	    /**
	     * Start typing / backspacing after being stopped
	     * @public
	     */
	  }, {
	    key: 'start',
	    value: function start() {
	      if (this.typingComplete) return;
	      if (!this.pause.status) return;
	      this.pause.status = false;
	      if (this.pause.typewrite) {
	        this.typewrite(this.pause.curString, this.pause.curStrPos);
	      } else {
	        this.backspace(this.pause.curString, this.pause.curStrPos);
	      }
	      this.options.onStart(this.arrayPos, this);
	    }
	
	    /**
	     * Destroy this instance of Typed
	     * @public
	     */
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.reset(false);
	      this.options.onDestroy(this);
	    }
	
	    /**
	     * Reset Typed and optionally restarts
	     * @param {boolean} restart
	     * @public
	     */
	  }, {
	    key: 'reset',
	    value: function reset() {
	      var restart = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      clearInterval(this.timeout);
	      this.replaceText('');
	      if (this.cursor && this.cursor.parentNode) {
	        this.cursor.parentNode.removeChild(this.cursor);
	        this.cursor = null;
	      }
	      this.strPos = 0;
	      this.arrayPos = 0;
	      this.curLoop = 0;
	      if (restart) {
	        this.insertCursor();
	        this.options.onReset(this);
	        this.begin();
	      }
	    }
	
	    /**
	     * Begins the typing animation
	     * @private
	     */
	  }, {
	    key: 'begin',
	    value: function begin() {
	      var _this = this;
	
	      this.typingComplete = false;
	      this.shuffleStringsIfNeeded(this);
	      this.insertCursor();
	      if (this.bindInputFocusEvents) this.bindFocusEvents();
	      this.timeout = setTimeout(function () {
	        // Check if there is some text in the element, if yes start by backspacing the default message
	        if (!_this.currentElContent || _this.currentElContent.length === 0) {
	          _this.typewrite(_this.strings[_this.sequence[_this.arrayPos]], _this.strPos);
	        } else {
	          // Start typing
	          _this.backspace(_this.currentElContent, _this.currentElContent.length);
	        }
	      }, this.startDelay);
	    }
	
	    /**
	     * Called for each character typed
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'typewrite',
	    value: function typewrite(curString, curStrPos) {
	      var _this2 = this;
	
	      if (this.fadeOut && this.el.classList.contains(this.fadeOutClass)) {
	        this.el.classList.remove(this.fadeOutClass);
	        if (this.cursor) this.cursor.classList.remove(this.fadeOutClass);
	      }
	
	      var humanize = this.humanizer(this.typeSpeed);
	      var numChars = 1;
	
	      if (this.pause.status === true) {
	        this.setPauseStatus(curString, curStrPos, true);
	        return;
	      }
	
	      // contain typing function in a timeout humanize'd delay
	      this.timeout = setTimeout(function () {
	        // skip over any HTML chars
	        curStrPos = _htmlParserJs.htmlParser.typeHtmlChars(curString, curStrPos, _this2);
	
	        var pauseTime = 0;
	        var substr = curString.substr(curStrPos);
	        // check for an escape character before a pause value
	        // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
	        // single ^ are removed from string
	        if (substr.charAt(0) === '^') {
	          if (/^\^\d+/.test(substr)) {
	            var skip = 1; // skip at least 1
	            substr = /\d+/.exec(substr)[0];
	            skip += substr.length;
	            pauseTime = parseInt(substr);
	            _this2.temporaryPause = true;
	            _this2.options.onTypingPaused(_this2.arrayPos, _this2);
	            // strip out the escape character and pause value so they're not printed
	            curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
	            _this2.toggleBlinking(true);
	          }
	        }
	
	        // check for skip characters formatted as
	        // "this is a `string to print NOW` ..."
	        if (substr.charAt(0) === '`') {
	          while (curString.substr(curStrPos + numChars).charAt(0) !== '`') {
	            numChars++;
	            if (curStrPos + numChars > curString.length) break;
	          }
	          // strip out the escape characters and append all the string in between
	          var stringBeforeSkip = curString.substring(0, curStrPos);
	          var stringSkipped = curString.substring(stringBeforeSkip.length + 1, curStrPos + numChars);
	          var stringAfterSkip = curString.substring(curStrPos + numChars + 1);
	          curString = stringBeforeSkip + stringSkipped + stringAfterSkip;
	          numChars--;
	        }
	
	        // timeout for any pause after a character
	        _this2.timeout = setTimeout(function () {
	          // Accounts for blinking while paused
	          _this2.toggleBlinking(false);
	
	          // We're done with this sentence!
	          if (curStrPos >= curString.length) {
	            _this2.doneTyping(curString, curStrPos);
	          } else {
	            _this2.keepTyping(curString, curStrPos, numChars);
	          }
	          // end of character pause
	          if (_this2.temporaryPause) {
	            _this2.temporaryPause = false;
	            _this2.options.onTypingResumed(_this2.arrayPos, _this2);
	          }
	        }, pauseTime);
	
	        // humanized value for typing
	      }, humanize);
	    }
	
	    /**
	     * Continue to the next string & begin typing
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'keepTyping',
	    value: function keepTyping(curString, curStrPos, numChars) {
	      // call before functions if applicable
	      if (curStrPos === 0) {
	        this.toggleBlinking(false);
	        this.options.preStringTyped(this.arrayPos, this);
	      }
	      // start typing each new char into existing string
	      // curString: arg, this.el.html: original text inside element
	      curStrPos += numChars;
	      var nextString = curString.substr(0, curStrPos);
	      this.replaceText(nextString);
	      // loop the function
	      this.typewrite(curString, curStrPos);
	    }
	
	    /**
	     * We're done typing all strings
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'doneTyping',
	    value: function doneTyping(curString, curStrPos) {
	      var _this3 = this;
	
	      // fires callback function
	      this.options.onStringTyped(this.arrayPos, this);
	      this.toggleBlinking(true);
	      // is this the final string
	      if (this.arrayPos === this.strings.length - 1) {
	        // callback that occurs on the last typed string
	        this.complete();
	        // quit if we wont loop back
	        if (this.loop === false || this.curLoop === this.loopCount) {
	          return;
	        }
	      }
	      this.timeout = setTimeout(function () {
	        _this3.backspace(curString, curStrPos);
	      }, this.backDelay);
	    }
	
	    /**
	     * Backspaces 1 character at a time
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'backspace',
	    value: function backspace(curString, curStrPos) {
	      var _this4 = this;
	
	      if (this.pause.status === true) {
	        this.setPauseStatus(curString, curStrPos, true);
	        return;
	      }
	      if (this.fadeOut) return this.initFadeOut();
	
	      this.toggleBlinking(false);
	      var humanize = this.humanizer(this.backSpeed);
	
	      this.timeout = setTimeout(function () {
	        curStrPos = _htmlParserJs.htmlParser.backSpaceHtmlChars(curString, curStrPos, _this4);
	        // replace text with base text + typed characters
	        var curStringAtPosition = curString.substr(0, curStrPos);
	        _this4.replaceText(curStringAtPosition);
	
	        // if smartBack is enabled
	        if (_this4.smartBackspace) {
	          // the remaining part of the current string is equal of the same part of the new string
	          var nextString = _this4.strings[_this4.arrayPos + 1];
	          if (nextString && curStringAtPosition === nextString.substr(0, curStrPos)) {
	            _this4.stopNum = curStrPos;
	          } else {
	            _this4.stopNum = 0;
	          }
	        }
	
	        // if the number (id of character in current string) is
	        // less than the stop number, keep going
	        if (curStrPos > _this4.stopNum) {
	          // subtract characters one by one
	          curStrPos--;
	          // loop the function
	          _this4.backspace(curString, curStrPos);
	        } else if (curStrPos <= _this4.stopNum) {
	          // if the stop number has been reached, increase
	          // array position to next string
	          _this4.arrayPos++;
	          // When looping, begin at the beginning after backspace complete
	          if (_this4.arrayPos === _this4.strings.length) {
	            _this4.arrayPos = 0;
	            _this4.options.onLastStringBackspaced();
	            _this4.shuffleStringsIfNeeded();
	            _this4.begin();
	          } else {
	            _this4.typewrite(_this4.strings[_this4.sequence[_this4.arrayPos]], curStrPos);
	          }
	        }
	        // humanized value for typing
	      }, humanize);
	    }
	
	    /**
	     * Full animation is complete
	     * @private
	     */
	  }, {
	    key: 'complete',
	    value: function complete() {
	      this.options.onComplete(this);
	      if (this.loop) {
	        this.curLoop++;
	      } else {
	        this.typingComplete = true;
	      }
	    }
	
	    /**
	     * Has the typing been stopped
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @param {boolean} isTyping
	     * @private
	     */
	  }, {
	    key: 'setPauseStatus',
	    value: function setPauseStatus(curString, curStrPos, isTyping) {
	      this.pause.typewrite = isTyping;
	      this.pause.curString = curString;
	      this.pause.curStrPos = curStrPos;
	    }
	
	    /**
	     * Toggle the blinking cursor
	     * @param {boolean} isBlinking
	     * @private
	     */
	  }, {
	    key: 'toggleBlinking',
	    value: function toggleBlinking(isBlinking) {
	      if (!this.cursor) return;
	      // if in paused state, don't toggle blinking a 2nd time
	      if (this.pause.status) return;
	      if (this.cursorBlinking === isBlinking) return;
	      this.cursorBlinking = isBlinking;
	      if (isBlinking) {
	        this.cursor.classList.add('typed-cursor--blink');
	      } else {
	        this.cursor.classList.remove('typed-cursor--blink');
	      }
	    }
	
	    /**
	     * Speed in MS to type
	     * @param {number} speed
	     * @private
	     */
	  }, {
	    key: 'humanizer',
	    value: function humanizer(speed) {
	      return Math.round(Math.random() * speed / 2) + speed;
	    }
	
	    /**
	     * Shuffle the sequence of the strings array
	     * @private
	     */
	  }, {
	    key: 'shuffleStringsIfNeeded',
	    value: function shuffleStringsIfNeeded() {
	      if (!this.shuffle) return;
	      this.sequence = this.sequence.sort(function () {
	        return Math.random() - 0.5;
	      });
	    }
	
	    /**
	     * Adds a CSS class to fade out current string
	     * @private
	     */
	  }, {
	    key: 'initFadeOut',
	    value: function initFadeOut() {
	      var _this5 = this;
	
	      this.el.className += ' ' + this.fadeOutClass;
	      if (this.cursor) this.cursor.className += ' ' + this.fadeOutClass;
	      return setTimeout(function () {
	        _this5.arrayPos++;
	        _this5.replaceText('');
	
	        // Resets current string if end of loop reached
	        if (_this5.strings.length > _this5.arrayPos) {
	          _this5.typewrite(_this5.strings[_this5.sequence[_this5.arrayPos]], 0);
	        } else {
	          _this5.typewrite(_this5.strings[0], 0);
	          _this5.arrayPos = 0;
	        }
	      }, this.fadeOutDelay);
	    }
	
	    /**
	     * Replaces current text in the HTML element
	     * depending on element type
	     * @param {string} str
	     * @private
	     */
	  }, {
	    key: 'replaceText',
	    value: function replaceText(str) {
	      if (this.attr) {
	        this.el.setAttribute(this.attr, str);
	      } else {
	        if (this.isInput) {
	          this.el.value = str;
	        } else if (this.contentType === 'html') {
	          this.el.innerHTML = str;
	        } else {
	          this.el.textContent = str;
	        }
	      }
	    }
	
	    /**
	     * If using input elements, bind focus in order to
	     * start and stop the animation
	     * @private
	     */
	  }, {
	    key: 'bindFocusEvents',
	    value: function bindFocusEvents() {
	      var _this6 = this;
	
	      if (!this.isInput) return;
	      this.el.addEventListener('focus', function (e) {
	        _this6.stop();
	      });
	      this.el.addEventListener('blur', function (e) {
	        if (_this6.el.value && _this6.el.value.length !== 0) {
	          return;
	        }
	        _this6.start();
	      });
	    }
	
	    /**
	     * On init, insert the cursor element
	     * @private
	     */
	  }, {
	    key: 'insertCursor',
	    value: function insertCursor() {
	      if (!this.showCursor) return;
	      if (this.cursor) return;
	      this.cursor = document.createElement('span');
	      this.cursor.className = 'typed-cursor';
	      this.cursor.innerHTML = this.cursorChar;
	      this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
	    }
	  }]);
	
	  return Typed;
	})();
	
	exports['default'] = Typed;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _defaultsJs = __webpack_require__(2);
	
	var _defaultsJs2 = _interopRequireDefault(_defaultsJs);
	
	/**
	 * Initialize the Typed object
	 */
	
	var Initializer = (function () {
	  function Initializer() {
	    _classCallCheck(this, Initializer);
	  }
	
	  _createClass(Initializer, [{
	    key: 'load',
	
	    /**
	     * Load up defaults & options on the Typed instance
	     * @param {Typed} self instance of Typed
	     * @param {object} options options object
	     * @param {string} elementId HTML element ID _OR_ instance of HTML element
	     * @private
	     */
	
	    value: function load(self, options, elementId) {
	      // chosen element to manipulate text
	      if (typeof elementId === 'string') {
	        self.el = document.querySelector(elementId);
	      } else {
	        self.el = elementId;
	      }
	
	      self.options = _extends({}, _defaultsJs2['default'], options);
	
	      // attribute to type into
	      self.isInput = self.el.tagName.toLowerCase() === 'input';
	      self.attr = self.options.attr;
	      self.bindInputFocusEvents = self.options.bindInputFocusEvents;
	
	      // show cursor
	      self.showCursor = self.isInput ? false : self.options.showCursor;
	
	      // custom cursor
	      self.cursorChar = self.options.cursorChar;
	
	      // Is the cursor blinking
	      self.cursorBlinking = true;
	
	      // text content of element
	      self.elContent = self.attr ? self.el.getAttribute(self.attr) : self.el.textContent;
	
	      // html or plain text
	      self.contentType = self.options.contentType;
	
	      // typing speed
	      self.typeSpeed = self.options.typeSpeed;
	
	      // add a delay before typing starts
	      self.startDelay = self.options.startDelay;
	
	      // backspacing speed
	      self.backSpeed = self.options.backSpeed;
	
	      // only backspace what doesn't match the previous string
	      self.smartBackspace = self.options.smartBackspace;
	
	      // amount of time to wait before backspacing
	      self.backDelay = self.options.backDelay;
	
	      // Fade out instead of backspace
	      self.fadeOut = self.options.fadeOut;
	      self.fadeOutClass = self.options.fadeOutClass;
	      self.fadeOutDelay = self.options.fadeOutDelay;
	
	      // variable to check whether typing is currently paused
	      self.isPaused = false;
	
	      // input strings of text
	      self.strings = self.options.strings.map(function (s) {
	        return s.trim();
	      });
	
	      // div containing strings
	      if (typeof self.options.stringsElement === 'string') {
	        self.stringsElement = document.querySelector(self.options.stringsElement);
	      } else {
	        self.stringsElement = self.options.stringsElement;
	      }
	
	      if (self.stringsElement) {
	        self.strings = [];
	        self.stringsElement.style.display = 'none';
	        var strings = Array.prototype.slice.apply(self.stringsElement.children);
	        var stringsLength = strings.length;
	
	        if (stringsLength) {
	          for (var i = 0; i < stringsLength; i += 1) {
	            var stringEl = strings[i];
	            self.strings.push(stringEl.innerHTML.trim());
	          }
	        }
	      }
	
	      // character number position of current string
	      self.strPos = 0;
	
	      // current array position
	      self.arrayPos = 0;
	
	      // index of string to stop backspacing on
	      self.stopNum = 0;
	
	      // Looping logic
	      self.loop = self.options.loop;
	      self.loopCount = self.options.loopCount;
	      self.curLoop = 0;
	
	      // shuffle the strings
	      self.shuffle = self.options.shuffle;
	      // the order of strings
	      self.sequence = [];
	
	      self.pause = {
	        status: false,
	        typewrite: true,
	        curString: '',
	        curStrPos: 0
	      };
	
	      // When the typing is complete (when not looped)
	      self.typingComplete = false;
	
	      // Set the order in which the strings are typed
	      for (var i in self.strings) {
	        self.sequence[i] = i;
	      }
	
	      // If there is some text in the element
	      self.currentElContent = this.getCurrentElContent(self);
	
	      self.autoInsertCss = self.options.autoInsertCss;
	
	      this.appendAnimationCss(self);
	    }
	  }, {
	    key: 'getCurrentElContent',
	    value: function getCurrentElContent(self) {
	      var elContent = '';
	      if (self.attr) {
	        elContent = self.el.getAttribute(self.attr);
	      } else if (self.isInput) {
	        elContent = self.el.value;
	      } else if (self.contentType === 'html') {
	        elContent = self.el.innerHTML;
	      } else {
	        elContent = self.el.textContent;
	      }
	      return elContent;
	    }
	  }, {
	    key: 'appendAnimationCss',
	    value: function appendAnimationCss(self) {
	      var cssDataName = 'data-typed-js-css';
	      if (!self.autoInsertCss) {
	        return;
	      }
	      if (!self.showCursor && !self.fadeOut) {
	        return;
	      }
	      if (document.querySelector('[' + cssDataName + ']')) {
	        return;
	      }
	
	      var css = document.createElement('style');
	      css.type = 'text/css';
	      css.setAttribute(cssDataName, true);
	
	      var innerCss = '';
	      if (self.showCursor) {
	        innerCss += '\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      ';
	      }
	      if (self.fadeOut) {
	        innerCss += '\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      ';
	      }
	      if (css.length === 0) {
	        return;
	      }
	      css.innerHTML = innerCss;
	      document.body.appendChild(css);
	    }
	  }]);
	
	  return Initializer;
	})();
	
	exports['default'] = Initializer;
	var initializer = new Initializer();
	exports.initializer = initializer;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/**
	 * Defaults & options
	 * @returns {object} Typed defaults & options
	 * @public
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var defaults = {
	  /**
	   * @property {array} strings strings to be typed
	   * @property {string} stringsElement ID of element containing string children
	   */
	  strings: ['These are the default values...', 'You know what you should do?', 'Use your own!', 'Have a great day!'],
	  stringsElement: null,
	
	  /**
	   * @property {number} typeSpeed type speed in milliseconds
	   */
	  typeSpeed: 0,
	
	  /**
	   * @property {number} startDelay time before typing starts in milliseconds
	   */
	  startDelay: 0,
	
	  /**
	   * @property {number} backSpeed backspacing speed in milliseconds
	   */
	  backSpeed: 0,
	
	  /**
	   * @property {boolean} smartBackspace only backspace what doesn't match the previous string
	   */
	  smartBackspace: true,
	
	  /**
	   * @property {boolean} shuffle shuffle the strings
	   */
	  shuffle: false,
	
	  /**
	   * @property {number} backDelay time before backspacing in milliseconds
	   */
	  backDelay: 700,
	
	  /**
	   * @property {boolean} fadeOut Fade out instead of backspace
	   * @property {string} fadeOutClass css class for fade animation
	   * @property {boolean} fadeOutDelay Fade out delay in milliseconds
	   */
	  fadeOut: false,
	  fadeOutClass: 'typed-fade-out',
	  fadeOutDelay: 500,
	
	  /**
	   * @property {boolean} loop loop strings
	   * @property {number} loopCount amount of loops
	   */
	  loop: false,
	  loopCount: Infinity,
	
	  /**
	   * @property {boolean} showCursor show cursor
	   * @property {string} cursorChar character for cursor
	   * @property {boolean} autoInsertCss insert CSS for cursor and fadeOut into HTML <head>
	   */
	  showCursor: true,
	  cursorChar: '|',
	  autoInsertCss: true,
	
	  /**
	   * @property {string} attr attribute for typing
	   * Ex: input placeholder, value, or just HTML text
	   */
	  attr: null,
	
	  /**
	   * @property {boolean} bindInputFocusEvents bind to focus and blur if el is text input
	   */
	  bindInputFocusEvents: false,
	
	  /**
	   * @property {string} contentType 'html' or 'null' for plaintext
	   */
	  contentType: 'html',
	
	  /**
	   * All typing is complete
	   * @param {Typed} self
	   */
	  onComplete: function onComplete(self) {},
	
	  /**
	   * Before each string is typed
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  preStringTyped: function preStringTyped(arrayPos, self) {},
	
	  /**
	   * After each string is typed
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onStringTyped: function onStringTyped(arrayPos, self) {},
	
	  /**
	   * During looping, after last string is typed
	   * @param {Typed} self
	   */
	  onLastStringBackspaced: function onLastStringBackspaced(self) {},
	
	  /**
	   * Typing has been stopped
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onTypingPaused: function onTypingPaused(arrayPos, self) {},
	
	  /**
	   * Typing has been started after being stopped
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onTypingResumed: function onTypingResumed(arrayPos, self) {},
	
	  /**
	   * After reset
	   * @param {Typed} self
	   */
	  onReset: function onReset(self) {},
	
	  /**
	   * After stop
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onStop: function onStop(arrayPos, self) {},
	
	  /**
	   * After start
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onStart: function onStart(arrayPos, self) {},
	
	  /**
	   * After destroy
	   * @param {Typed} self
	   */
	  onDestroy: function onDestroy(self) {}
	};
	
	exports['default'] = defaults;
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	
	/**
	 * TODO: These methods can probably be combined somehow
	 * Parse HTML tags & HTML Characters
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var HTMLParser = (function () {
	  function HTMLParser() {
	    _classCallCheck(this, HTMLParser);
	  }
	
	  _createClass(HTMLParser, [{
	    key: 'typeHtmlChars',
	
	    /**
	     * Type HTML tags & HTML Characters
	     * @param {string} curString Current string
	     * @param {number} curStrPos Position in current string
	     * @param {Typed} self instance of Typed
	     * @returns {number} a new string position
	     * @private
	     */
	
	    value: function typeHtmlChars(curString, curStrPos, self) {
	      if (self.contentType !== 'html') return curStrPos;
	      var curChar = curString.substr(curStrPos).charAt(0);
	      if (curChar === '<' || curChar === '&') {
	        var endTag = '';
	        if (curChar === '<') {
	          endTag = '>';
	        } else {
	          endTag = ';';
	        }
	        while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
	          curStrPos++;
	          if (curStrPos + 1 > curString.length) {
	            break;
	          }
	        }
	        curStrPos++;
	      }
	      return curStrPos;
	    }
	
	    /**
	     * Backspace HTML tags and HTML Characters
	     * @param {string} curString Current string
	     * @param {number} curStrPos Position in current string
	     * @param {Typed} self instance of Typed
	     * @returns {number} a new string position
	     * @private
	     */
	  }, {
	    key: 'backSpaceHtmlChars',
	    value: function backSpaceHtmlChars(curString, curStrPos, self) {
	      if (self.contentType !== 'html') return curStrPos;
	      var curChar = curString.substr(curStrPos).charAt(0);
	      if (curChar === '>' || curChar === ';') {
	        var endTag = '';
	        if (curChar === '>') {
	          endTag = '<';
	        } else {
	          endTag = '&';
	        }
	        while (curString.substr(curStrPos - 1).charAt(0) !== endTag) {
	          curStrPos--;
	          if (curStrPos < 0) {
	            break;
	          }
	        }
	        curStrPos--;
	      }
	      return curStrPos;
	    }
	  }]);
	
	  return HTMLParser;
	})();
	
	exports['default'] = HTMLParser;
	var htmlParser = new HTMLParser();
	exports.htmlParser = htmlParser;

/***/ })
/******/ ])
});
;

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./resources/assets/js/bootstrap.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rm_emoji_picker__ = __webpack_require__("./node_modules/rm-emoji-picker/dist/EmojiPicker.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rm_emoji_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rm_emoji_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_typed_js__ = __webpack_require__("./node_modules/typed.js/lib/typed.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_typed_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_typed_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vimeo_player__ = __webpack_require__("./node_modules/@vimeo/player/dist/player.es.js");




//window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

window.$ = window.jQuery = __webpack_require__("./node_modules/jquery/dist/jquery.js");

__webpack_require__("./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js");
__webpack_require__("./node_modules/parsleyjs/dist/parsley.js");
__webpack_require__("./node_modules/bootstrap-tour/build/js/bootstrap-tour.js");

window.EmojiPicker = __WEBPACK_IMPORTED_MODULE_0_rm_emoji_picker___default.a;
window.Typed = __WEBPACK_IMPORTED_MODULE_1_typed_js___default.a;
window.Player = __WEBPACK_IMPORTED_MODULE_2__vimeo_player__["a" /* default */];

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

// window.axios = require('axios');
//
// window.axios.defaults.headers.common = {
//     'X-Requested-With': 'XMLHttpRequest'
// };

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });

/***/ }),

/***/ "./resources/assets/js/scripts.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./resources/assets/js/bootstrap.js");

/***/ }),

/***/ "./resources/assets/sass/admin/admin.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets/sass/client/app.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./resources/assets/js/scripts.js");
__webpack_require__("./resources/assets/sass/client/app.scss");
module.exports = __webpack_require__("./resources/assets/sass/admin/admin.scss");


/***/ })

/******/ });