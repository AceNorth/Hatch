/******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';var api=__webpack_require__(1).Router();
	
	api.
	use('/user',__webpack_require__(151)).
	use('/message',__webpack_require__(152));
	
	
	api.use(function(err,req,res,next){
	console.error(err,err.stack);
	res.status(500).send(err);
	});
	
	api.use(function(req,res){return res.status(404).end();});
	
	module.exports=api;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	module.exports = __webpack_require__(2);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module dependencies.
	 */
	
	var EventEmitter = __webpack_require__(3).EventEmitter;
	var mixin = __webpack_require__(4);
	var proto = __webpack_require__(5);
	var Route = __webpack_require__(24);
	var Router = __webpack_require__(23);
	var req = __webpack_require__(122);
	var res = __webpack_require__(141);
	
	/**
	 * Expose `createApplication()`.
	 */
	
	exports = module.exports = createApplication;
	
	/**
	 * Create an express application.
	 *
	 * @return {Function}
	 * @api public
	 */
	
	function createApplication() {
	  var app = function(req, res, next) {
	    app.handle(req, res, next);
	  };
	
	  mixin(app, EventEmitter.prototype, false);
	  mixin(app, proto, false);
	
	  app.request = { __proto__: req, app: app };
	  app.response = { __proto__: res, app: app };
	  app.init();
	  return app;
	}
	
	/**
	 * Expose the prototypes.
	 */
	
	exports.application = proto;
	exports.request = req;
	exports.response = res;
	
	/**
	 * Expose constructors.
	 */
	
	exports.Route = Route;
	exports.Router = Router;
	
	/**
	 * Expose middleware
	 */
	
	exports.query = __webpack_require__(44);
	exports.static = __webpack_require__(145);
	
	/**
	 * Replace removed middleware with an appropriate error message.
	 */
	
	[
	  'json',
	  'urlencoded',
	  'bodyParser',
	  'compress',
	  'cookieSession',
	  'session',
	  'logger',
	  'cookieParser',
	  'favicon',
	  'responseTime',
	  'errorHandler',
	  'timeout',
	  'methodOverride',
	  'vhost',
	  'csrf',
	  'directory',
	  'limit',
	  'multipart',
	  'staticCache',
	].forEach(function (name) {
	  Object.defineProperty(exports, name, {
	    get: function () {
	      throw new Error('Most middleware (like ' + name + ') is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.');
	    },
	    configurable: true
	  });
	});


/***/ },
/* 3 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*!
	 * merge-descriptors
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = merge
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var hasOwnProperty = Object.prototype.hasOwnProperty
	
	/**
	 * Merge the property descriptors of `src` into `dest`
	 *
	 * @param {object} dest Object to add descriptors to
	 * @param {object} src Object to clone descriptors from
	 * @param {boolean} [redefine=true] Redefine `dest` properties with `src` properties
	 * @returns {object} Reference to dest
	 * @public
	 */
	
	function merge(dest, src, redefine) {
	  if (!dest) {
	    throw new TypeError('argument dest is required')
	  }
	
	  if (!src) {
	    throw new TypeError('argument src is required')
	  }
	
	  if (redefine === undefined) {
	    // Default to true
	    redefine = true
	  }
	
	  Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName(name) {
	    if (!redefine && hasOwnProperty.call(dest, name)) {
	      // Skip desriptor
	      return
	    }
	
	    // Copy descriptor
	    var descriptor = Object.getOwnPropertyDescriptor(src, name)
	    Object.defineProperty(dest, name, descriptor)
	  })
	
	  return dest
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var finalhandler = __webpack_require__(7);
	var Router = __webpack_require__(23);
	var methods = __webpack_require__(31);
	var middleware = __webpack_require__(43);
	var query = __webpack_require__(44);
	var debug = __webpack_require__(25)('express:application');
	var View = __webpack_require__(49);
	var http = __webpack_require__(134);
	var compileETag = __webpack_require__(54).compileETag;
	var compileQueryParser = __webpack_require__(54).compileQueryParser;
	var compileTrust = __webpack_require__(54).compileTrust;
	var deprecate = __webpack_require__(34)('express');
	var flatten = __webpack_require__(28);
	var merge = __webpack_require__(33);
	var resolve = __webpack_require__(50).resolve;
	var slice = Array.prototype.slice;
	
	/**
	 * Application prototype.
	 */
	
	var app = exports = module.exports = {};
	
	/**
	 * Variable for trust proxy inheritance back-compat
	 * @private
	 */
	
	var trustProxyDefaultSymbol = '@@symbol:trust_proxy_default';
	
	/**
	 * Initialize the server.
	 *
	 *   - setup default configuration
	 *   - setup default middleware
	 *   - setup route reflection methods
	 *
	 * @private
	 */
	
	app.init = function init() {
	  this.cache = {};
	  this.engines = {};
	  this.settings = {};
	
	  this.defaultConfiguration();
	};
	
	/**
	 * Initialize application configuration.
	 * @private
	 */
	
	app.defaultConfiguration = function defaultConfiguration() {
	  var env = process.env.NODE_ENV || 'development';
	
	  // default settings
	  this.enable('x-powered-by');
	  this.set('etag', 'weak');
	  this.set('env', env);
	  this.set('query parser', 'extended');
	  this.set('subdomain offset', 2);
	  this.set('trust proxy', false);
	
	  // trust proxy inherit back-compat
	  Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
	    configurable: true,
	    value: true
	  });
	
	  debug('booting in %s mode', env);
	
	  this.on('mount', function onmount(parent) {
	    // inherit trust proxy
	    if (this.settings[trustProxyDefaultSymbol] === true
	      && typeof parent.settings['trust proxy fn'] === 'function') {
	      delete this.settings['trust proxy'];
	      delete this.settings['trust proxy fn'];
	    }
	
	    // inherit protos
	    this.request.__proto__ = parent.request;
	    this.response.__proto__ = parent.response;
	    this.engines.__proto__ = parent.engines;
	    this.settings.__proto__ = parent.settings;
	  });
	
	  // setup locals
	  this.locals = Object.create(null);
	
	  // top-most app is mounted at /
	  this.mountpath = '/';
	
	  // default locals
	  this.locals.settings = this.settings;
	
	  // default configuration
	  this.set('view', View);
	  this.set('views', resolve('views'));
	  this.set('jsonp callback name', 'callback');
	
	  if (env === 'production') {
	    this.enable('view cache');
	  }
	
	  Object.defineProperty(this, 'router', {
	    get: function() {
	      throw new Error('\'app.router\' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app.');
	    }
	  });
	};
	
	/**
	 * lazily adds the base router if it has not yet been added.
	 *
	 * We cannot add the base router in the defaultConfiguration because
	 * it reads app settings which might be set after that has run.
	 *
	 * @private
	 */
	app.lazyrouter = function lazyrouter() {
	  if (!this._router) {
	    this._router = new Router({
	      caseSensitive: this.enabled('case sensitive routing'),
	      strict: this.enabled('strict routing')
	    });
	
	    this._router.use(query(this.get('query parser fn')));
	    this._router.use(middleware.init(this));
	  }
	};
	
	/**
	 * Dispatch a req, res pair into the application. Starts pipeline processing.
	 *
	 * If no callback is provided, then default error handlers will respond
	 * in the event of an error bubbling through the stack.
	 *
	 * @private
	 */
	
	app.handle = function handle(req, res, callback) {
	  var router = this._router;
	
	  // final handler
	  var done = callback || finalhandler(req, res, {
	    env: this.get('env'),
	    onerror: logerror.bind(this)
	  });
	
	  // no routes
	  if (!router) {
	    debug('no routes defined on app');
	    done();
	    return;
	  }
	
	  router.handle(req, res, done);
	};
	
	/**
	 * Proxy `Router#use()` to add middleware to the app router.
	 * See Router#use() documentation for details.
	 *
	 * If the _fn_ parameter is an express app, then it will be
	 * mounted at the _route_ specified.
	 *
	 * @public
	 */
	
	app.use = function use(fn) {
	  var offset = 0;
	  var path = '/';
	
	  // default path to '/'
	  // disambiguate app.use([fn])
	  if (typeof fn !== 'function') {
	    var arg = fn;
	
	    while (Array.isArray(arg) && arg.length !== 0) {
	      arg = arg[0];
	    }
	
	    // first arg is the path
	    if (typeof arg !== 'function') {
	      offset = 1;
	      path = fn;
	    }
	  }
	
	  var fns = flatten(slice.call(arguments, offset));
	
	  if (fns.length === 0) {
	    throw new TypeError('app.use() requires middleware functions');
	  }
	
	  // setup router
	  this.lazyrouter();
	  var router = this._router;
	
	  fns.forEach(function (fn) {
	    // non-express app
	    if (!fn || !fn.handle || !fn.set) {
	      return router.use(path, fn);
	    }
	
	    debug('.use app under %s', path);
	    fn.mountpath = path;
	    fn.parent = this;
	
	    // restore .app property on req and res
	    router.use(path, function mounted_app(req, res, next) {
	      var orig = req.app;
	      fn.handle(req, res, function (err) {
	        req.__proto__ = orig.request;
	        res.__proto__ = orig.response;
	        next(err);
	      });
	    });
	
	    // mounted an app
	    fn.emit('mount', this);
	  }, this);
	
	  return this;
	};
	
	/**
	 * Proxy to the app `Router#route()`
	 * Returns a new `Route` instance for the _path_.
	 *
	 * Routes are isolated middleware stacks for specific paths.
	 * See the Route api docs for details.
	 *
	 * @public
	 */
	
	app.route = function route(path) {
	  this.lazyrouter();
	  return this._router.route(path);
	};
	
	/**
	 * Register the given template engine callback `fn`
	 * as `ext`.
	 *
	 * By default will `require()` the engine based on the
	 * file extension. For example if you try to render
	 * a "foo.jade" file Express will invoke the following internally:
	 *
	 *     app.engine('jade', require('jade').__express);
	 *
	 * For engines that do not provide `.__express` out of the box,
	 * or if you wish to "map" a different extension to the template engine
	 * you may use this method. For example mapping the EJS template engine to
	 * ".html" files:
	 *
	 *     app.engine('html', require('ejs').renderFile);
	 *
	 * In this case EJS provides a `.renderFile()` method with
	 * the same signature that Express expects: `(path, options, callback)`,
	 * though note that it aliases this method as `ejs.__express` internally
	 * so if you're using ".ejs" extensions you dont need to do anything.
	 *
	 * Some template engines do not follow this convention, the
	 * [Consolidate.js](https://github.com/tj/consolidate.js)
	 * library was created to map all of node's popular template
	 * engines to follow this convention, thus allowing them to
	 * work seamlessly within Express.
	 *
	 * @param {String} ext
	 * @param {Function} fn
	 * @return {app} for chaining
	 * @public
	 */
	
	app.engine = function engine(ext, fn) {
	  if (typeof fn !== 'function') {
	    throw new Error('callback function required');
	  }
	
	  // get file extension
	  var extension = ext[0] !== '.'
	    ? '.' + ext
	    : ext;
	
	  // store engine
	  this.engines[extension] = fn;
	
	  return this;
	};
	
	/**
	 * Proxy to `Router#param()` with one added api feature. The _name_ parameter
	 * can be an array of names.
	 *
	 * See the Router#param() docs for more details.
	 *
	 * @param {String|Array} name
	 * @param {Function} fn
	 * @return {app} for chaining
	 * @public
	 */
	
	app.param = function param(name, fn) {
	  this.lazyrouter();
	
	  if (Array.isArray(name)) {
	    for (var i = 0; i < name.length; i++) {
	      this.param(name[i], fn);
	    }
	
	    return this;
	  }
	
	  this._router.param(name, fn);
	
	  return this;
	};
	
	/**
	 * Assign `setting` to `val`, or return `setting`'s value.
	 *
	 *    app.set('foo', 'bar');
	 *    app.get('foo');
	 *    // => "bar"
	 *
	 * Mounted servers inherit their parent server's settings.
	 *
	 * @param {String} setting
	 * @param {*} [val]
	 * @return {Server} for chaining
	 * @public
	 */
	
	app.set = function set(setting, val) {
	  if (arguments.length === 1) {
	    // app.get(setting)
	    return this.settings[setting];
	  }
	
	  debug('set "%s" to %o', setting, val);
	
	  // set value
	  this.settings[setting] = val;
	
	  // trigger matched settings
	  switch (setting) {
	    case 'etag':
	      this.set('etag fn', compileETag(val));
	      break;
	    case 'query parser':
	      this.set('query parser fn', compileQueryParser(val));
	      break;
	    case 'trust proxy':
	      this.set('trust proxy fn', compileTrust(val));
	
	      // trust proxy inherit back-compat
	      Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
	        configurable: true,
	        value: false
	      });
	
	      break;
	  }
	
	  return this;
	};
	
	/**
	 * Return the app's absolute pathname
	 * based on the parent(s) that have
	 * mounted it.
	 *
	 * For example if the application was
	 * mounted as "/admin", which itself
	 * was mounted as "/blog" then the
	 * return value would be "/blog/admin".
	 *
	 * @return {String}
	 * @private
	 */
	
	app.path = function path() {
	  return this.parent
	    ? this.parent.path() + this.mountpath
	    : '';
	};
	
	/**
	 * Check if `setting` is enabled (truthy).
	 *
	 *    app.enabled('foo')
	 *    // => false
	 *
	 *    app.enable('foo')
	 *    app.enabled('foo')
	 *    // => true
	 *
	 * @param {String} setting
	 * @return {Boolean}
	 * @public
	 */
	
	app.enabled = function enabled(setting) {
	  return Boolean(this.set(setting));
	};
	
	/**
	 * Check if `setting` is disabled.
	 *
	 *    app.disabled('foo')
	 *    // => true
	 *
	 *    app.enable('foo')
	 *    app.disabled('foo')
	 *    // => false
	 *
	 * @param {String} setting
	 * @return {Boolean}
	 * @public
	 */
	
	app.disabled = function disabled(setting) {
	  return !this.set(setting);
	};
	
	/**
	 * Enable `setting`.
	 *
	 * @param {String} setting
	 * @return {app} for chaining
	 * @public
	 */
	
	app.enable = function enable(setting) {
	  return this.set(setting, true);
	};
	
	/**
	 * Disable `setting`.
	 *
	 * @param {String} setting
	 * @return {app} for chaining
	 * @public
	 */
	
	app.disable = function disable(setting) {
	  return this.set(setting, false);
	};
	
	/**
	 * Delegate `.VERB(...)` calls to `router.VERB(...)`.
	 */
	
	methods.forEach(function(method){
	  app[method] = function(path){
	    if (method === 'get' && arguments.length === 1) {
	      // app.get(setting)
	      return this.set(path);
	    }
	
	    this.lazyrouter();
	
	    var route = this._router.route(path);
	    route[method].apply(route, slice.call(arguments, 1));
	    return this;
	  };
	});
	
	/**
	 * Special-cased "all" method, applying the given route `path`,
	 * middleware, and callback to _every_ HTTP method.
	 *
	 * @param {String} path
	 * @param {Function} ...
	 * @return {app} for chaining
	 * @public
	 */
	
	app.all = function all(path) {
	  this.lazyrouter();
	
	  var route = this._router.route(path);
	  var args = slice.call(arguments, 1);
	
	  for (var i = 0; i < methods.length; i++) {
	    route[methods[i]].apply(route, args);
	  }
	
	  return this;
	};
	
	// del -> delete alias
	
	app.del = deprecate.function(app.delete, 'app.del: Use app.delete instead');
	
	/**
	 * Render the given view `name` name with `options`
	 * and a callback accepting an error and the
	 * rendered template string.
	 *
	 * Example:
	 *
	 *    app.render('email', { name: 'Tobi' }, function(err, html){
	 *      // ...
	 *    })
	 *
	 * @param {String} name
	 * @param {Object|Function} options or fn
	 * @param {Function} callback
	 * @public
	 */
	
	app.render = function render(name, options, callback) {
	  var cache = this.cache;
	  var done = callback;
	  var engines = this.engines;
	  var opts = options;
	  var renderOptions = {};
	  var view;
	
	  // support callback function as second arg
	  if (typeof options === 'function') {
	    done = options;
	    opts = {};
	  }
	
	  // merge app.locals
	  merge(renderOptions, this.locals);
	
	  // merge options._locals
	  if (opts._locals) {
	    merge(renderOptions, opts._locals);
	  }
	
	  // merge options
	  merge(renderOptions, opts);
	
	  // set .cache unless explicitly provided
	  if (renderOptions.cache == null) {
	    renderOptions.cache = this.enabled('view cache');
	  }
	
	  // primed cache
	  if (renderOptions.cache) {
	    view = cache[name];
	  }
	
	  // view
	  if (!view) {
	    var View = this.get('view');
	
	    view = new View(name, {
	      defaultEngine: this.get('view engine'),
	      root: this.get('views'),
	      engines: engines
	    });
	
	    if (!view.path) {
	      var dirs = Array.isArray(view.root) && view.root.length > 1
	        ? 'directories "' + view.root.slice(0, -1).join('", "') + '" or "' + view.root[view.root.length - 1] + '"'
	        : 'directory "' + view.root + '"'
	      var err = new Error('Failed to lookup view "' + name + '" in views ' + dirs);
	      err.view = view;
	      return done(err);
	    }
	
	    // prime the cache
	    if (renderOptions.cache) {
	      cache[name] = view;
	    }
	  }
	
	  // render
	  tryRender(view, renderOptions, done);
	};
	
	/**
	 * Listen for connections.
	 *
	 * A node `http.Server` is returned, with this
	 * application (which is a `Function`) as its
	 * callback. If you wish to create both an HTTP
	 * and HTTPS server you may do so with the "http"
	 * and "https" modules as shown here:
	 *
	 *    var http = require('http')
	 *      , https = require('https')
	 *      , express = require('express')
	 *      , app = express();
	 *
	 *    http.createServer(app).listen(80);
	 *    https.createServer({ ... }, app).listen(443);
	 *
	 * @return {http.Server}
	 * @public
	 */
	
	app.listen = function listen() {
	  var server = http.createServer(this);
	  return server.listen.apply(server, arguments);
	};
	
	/**
	 * Log error using console.error.
	 *
	 * @param {Error} err
	 * @private
	 */
	
	function logerror(err) {
	  /* istanbul ignore next */
	  if (this.get('env') !== 'test') console.error(err.stack || err.toString());
	}
	
	/**
	 * Try rendering a view.
	 * @private
	 */
	
	function tryRender(view, options, callback) {
	  try {
	    view.render(options, callback);
	  } catch (err) {
	    callback(err);
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

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
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, process, Buffer) {/*!
	 * finalhandler
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var debug = __webpack_require__(14)('finalhandler')
	var escapeHtml = __webpack_require__(17)
	var onFinished = __webpack_require__(18)
	var statuses = __webpack_require__(20)
	var unpipe = __webpack_require__(22)
	
	/**
	 * Module variables.
	 * @private
	 */
	
	/* istanbul ignore next */
	var defer = typeof setImmediate === 'function'
	  ? setImmediate
	  : function (fn) { process.nextTick(fn.bind.apply(fn, arguments)) }
	var isFinished = onFinished.isFinished
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = finalhandler
	
	/**
	 * Create a function to handle the final response.
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Object} [options]
	 * @return {Function}
	 * @public
	 */
	
	function finalhandler (req, res, options) {
	  var opts = options || {}
	
	  // get environment
	  var env = opts.env || process.env.NODE_ENV || 'development'
	
	  // get error callback
	  var onerror = opts.onerror
	
	  return function (err) {
	    var headers = Object.create(null)
	    var status
	
	    // ignore 404 on in-flight response
	    if (!err && res._header) {
	      debug('cannot 404 after headers sent')
	      return
	    }
	
	    // unhandled error
	    if (err) {
	      // respect status code from error
	      status = getErrorStatusCode(err) || res.statusCode
	
	      // default status code to 500 if outside valid range
	      if (typeof status !== 'number' || status < 400 || status > 599) {
	        status = 500
	      }
	
	      // respect err.headers
	      if (err.headers && (err.status === status || err.statusCode === status)) {
	        var keys = Object.keys(err.headers)
	        for (var i = 0; i < keys.length; i++) {
	          var key = keys[i]
	          headers[key] = err.headers[key]
	        }
	      }
	
	      // production gets a basic error message
	      var msg = env === 'production'
	        ? statuses[status]
	        : err.stack || err.toString()
	      msg = escapeHtml(msg)
	        .replace(/\n/g, '<br>')
	        .replace(/\x20{2}/g, ' &nbsp;') + '\n'
	    } else {
	      status = 404
	      msg = 'Cannot ' + escapeHtml(req.method) + ' ' + escapeHtml(req.originalUrl || req.url) + '\n'
	    }
	
	    debug('default %s', status)
	
	    // schedule onerror callback
	    if (err && onerror) {
	      defer(onerror, err, req, res)
	    }
	
	    // cannot actually respond
	    if (res._header) {
	      debug('cannot %d after headers sent', status)
	      req.socket.destroy()
	      return
	    }
	
	    // send response
	    send(req, res, status, headers, msg)
	  }
	}
	
	/**
	 * Get status code from Error object.
	 *
	 * @param {Error} err
	 * @return {number}
	 * @private
	 */
	
	function getErrorStatusCode (err) {
	  // check err.status
	  if (typeof err.status === 'number' && err.status >= 400 && err.status < 600) {
	    return err.status
	  }
	
	  // check err.statusCode
	  if (typeof err.statusCode === 'number' && err.statusCode >= 400 && err.statusCode < 600) {
	    return err.statusCode
	  }
	
	  return undefined
	}
	
	/**
	 * Send response.
	 *
	 * @param {IncomingMessage} req
	 * @param {OutgoingMessage} res
	 * @param {number} status
	 * @param {object} headers
	 * @param {string} body
	 * @private
	 */
	
	function send (req, res, status, headers, body) {
	  function write () {
	    // response status
	    res.statusCode = status
	    res.statusMessage = statuses[status]
	
	    // response headers
	    var keys = Object.keys(headers)
	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i]
	      res.setHeader(key, headers[key])
	    }
	
	    // security header for content sniffing
	    res.setHeader('X-Content-Type-Options', 'nosniff')
	
	    // standard headers
	    res.setHeader('Content-Type', 'text/html; charset=utf-8')
	    res.setHeader('Content-Length', Buffer.byteLength(body, 'utf8'))
	
	    if (req.method === 'HEAD') {
	      res.end()
	      return
	    }
	
	    res.end(body, 'utf8')
	  }
	
	  if (isFinished(req)) {
	    write()
	    return
	  }
	
	  // unpipe everything from the request
	  unpipe(req)
	
	  // flush the request
	  onFinished(req, write)
	  req.resume()
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).setImmediate, __webpack_require__(6), __webpack_require__(10).Buffer))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
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
	  this._clearFn.call(window, this._id);
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
	__webpack_require__(9);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

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
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(6)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(11)
	var ieee754 = __webpack_require__(12)
	var isArray = __webpack_require__(13)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict'
	
	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}
	
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63
	
	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}
	
	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}
	
	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)
	
	  arr = new Arr(len * 3 / 4 - placeHolders)
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len
	
	  var L = 0
	
	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }
	
	  parts.push(output)
	
	  return parts.join('')
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(15);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(16);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	/*!
	 * escape-html
	 * Copyright(c) 2012-2013 TJ Holowaychuk
	 * Copyright(c) 2015 Andreas Lubbe
	 * Copyright(c) 2015 Tiancheng "Timothy" Gu
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var matchHtmlRegExp = /["'&<>]/;
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = escapeHtml;
	
	/**
	 * Escape special characters in the given string of html.
	 *
	 * @param  {string} string The string to escape for inserting into HTML
	 * @return {string}
	 * @public
	 */
	
	function escapeHtml(string) {
	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);
	
	  if (!match) {
	    return str;
	  }
	
	  var escape;
	  var html = '';
	  var index = 0;
	  var lastIndex = 0;
	
	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34: // "
	        escape = '&quot;';
	        break;
	      case 38: // &
	        escape = '&amp;';
	        break;
	      case 39: // '
	        escape = '&#39;';
	        break;
	      case 60: // <
	        escape = '&lt;';
	        break;
	      case 62: // >
	        escape = '&gt;';
	        break;
	      default:
	        continue;
	    }
	
	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }
	
	    lastIndex = index + 1;
	    html += escape;
	  }
	
	  return lastIndex !== index
	    ? html + str.substring(lastIndex, index)
	    : html;
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, process) {/*!
	 * on-finished
	 * Copyright(c) 2013 Jonathan Ong
	 * Copyright(c) 2014 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = onFinished
	module.exports.isFinished = isFinished
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var first = __webpack_require__(19)
	
	/**
	 * Variables.
	 * @private
	 */
	
	/* istanbul ignore next */
	var defer = typeof setImmediate === 'function'
	  ? setImmediate
	  : function(fn){ process.nextTick(fn.bind.apply(fn, arguments)) }
	
	/**
	 * Invoke callback when the response has finished, useful for
	 * cleaning up resources afterwards.
	 *
	 * @param {object} msg
	 * @param {function} listener
	 * @return {object}
	 * @public
	 */
	
	function onFinished(msg, listener) {
	  if (isFinished(msg) !== false) {
	    defer(listener, null, msg)
	    return msg
	  }
	
	  // attach the listener to the message
	  attachListener(msg, listener)
	
	  return msg
	}
	
	/**
	 * Determine if message is already finished.
	 *
	 * @param {object} msg
	 * @return {boolean}
	 * @public
	 */
	
	function isFinished(msg) {
	  var socket = msg.socket
	
	  if (typeof msg.finished === 'boolean') {
	    // OutgoingMessage
	    return Boolean(msg.finished || (socket && !socket.writable))
	  }
	
	  if (typeof msg.complete === 'boolean') {
	    // IncomingMessage
	    return Boolean(msg.upgrade || !socket || !socket.readable || (msg.complete && !msg.readable))
	  }
	
	  // don't know
	  return undefined
	}
	
	/**
	 * Attach a finished listener to the message.
	 *
	 * @param {object} msg
	 * @param {function} callback
	 * @private
	 */
	
	function attachFinishedListener(msg, callback) {
	  var eeMsg
	  var eeSocket
	  var finished = false
	
	  function onFinish(error) {
	    eeMsg.cancel()
	    eeSocket.cancel()
	
	    finished = true
	    callback(error)
	  }
	
	  // finished on first message event
	  eeMsg = eeSocket = first([[msg, 'end', 'finish']], onFinish)
	
	  function onSocket(socket) {
	    // remove listener
	    msg.removeListener('socket', onSocket)
	
	    if (finished) return
	    if (eeMsg !== eeSocket) return
	
	    // finished on first socket event
	    eeSocket = first([[socket, 'error', 'close']], onFinish)
	  }
	
	  if (msg.socket) {
	    // socket already assigned
	    onSocket(msg.socket)
	    return
	  }
	
	  // wait for socket to be assigned
	  msg.on('socket', onSocket)
	
	  if (msg.socket === undefined) {
	    // node.js 0.8 patch
	    patchAssignSocket(msg, onSocket)
	  }
	}
	
	/**
	 * Attach the listener to the message.
	 *
	 * @param {object} msg
	 * @return {function}
	 * @private
	 */
	
	function attachListener(msg, listener) {
	  var attached = msg.__onFinished
	
	  // create a private single listener with queue
	  if (!attached || !attached.queue) {
	    attached = msg.__onFinished = createListener(msg)
	    attachFinishedListener(msg, attached)
	  }
	
	  attached.queue.push(listener)
	}
	
	/**
	 * Create listener on message.
	 *
	 * @param {object} msg
	 * @return {function}
	 * @private
	 */
	
	function createListener(msg) {
	  function listener(err) {
	    if (msg.__onFinished === listener) msg.__onFinished = null
	    if (!listener.queue) return
	
	    var queue = listener.queue
	    listener.queue = null
	
	    for (var i = 0; i < queue.length; i++) {
	      queue[i](err, msg)
	    }
	  }
	
	  listener.queue = []
	
	  return listener
	}
	
	/**
	 * Patch ServerResponse.prototype.assignSocket for node.js 0.8.
	 *
	 * @param {ServerResponse} res
	 * @param {function} callback
	 * @private
	 */
	
	function patchAssignSocket(res, callback) {
	  var assignSocket = res.assignSocket
	
	  if (typeof assignSocket !== 'function') return
	
	  // res.on('socket', callback) is broken in 0.8
	  res.assignSocket = function _assignSocket(socket) {
	    assignSocket.call(this, socket)
	    callback(socket)
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).setImmediate, __webpack_require__(6)))

/***/ },
/* 19 */
/***/ function(module, exports) {

	/*!
	 * ee-first
	 * Copyright(c) 2014 Jonathan Ong
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = first
	
	/**
	 * Get the first event in a set of event emitters and event pairs.
	 *
	 * @param {array} stuff
	 * @param {function} done
	 * @public
	 */
	
	function first(stuff, done) {
	  if (!Array.isArray(stuff))
	    throw new TypeError('arg must be an array of [ee, events...] arrays')
	
	  var cleanups = []
	
	  for (var i = 0; i < stuff.length; i++) {
	    var arr = stuff[i]
	
	    if (!Array.isArray(arr) || arr.length < 2)
	      throw new TypeError('each array member must be [ee, events...]')
	
	    var ee = arr[0]
	
	    for (var j = 1; j < arr.length; j++) {
	      var event = arr[j]
	      var fn = listener(event, callback)
	
	      // listen to the event
	      ee.on(event, fn)
	      // push this listener to the list of cleanups
	      cleanups.push({
	        ee: ee,
	        event: event,
	        fn: fn,
	      })
	    }
	  }
	
	  function callback() {
	    cleanup()
	    done.apply(null, arguments)
	  }
	
	  function cleanup() {
	    var x
	    for (var i = 0; i < cleanups.length; i++) {
	      x = cleanups[i]
	      x.ee.removeListener(x.event, x.fn)
	    }
	  }
	
	  function thunk(fn) {
	    done = fn
	  }
	
	  thunk.cancel = cleanup
	
	  return thunk
	}
	
	/**
	 * Create the event listener.
	 * @private
	 */
	
	function listener(event, done) {
	  return function onevent(arg1) {
	    var args = new Array(arguments.length)
	    var ee = this
	    var err = event === 'error'
	      ? arg1
	      : null
	
	    // copy args to prevent arguments escaping scope
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i]
	    }
	
	    done(err, ee, event, args)
	  }
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * statuses
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2016 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var codes = __webpack_require__(21)
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = status
	
	// array of status codes
	status.codes = populateStatusesMap(status, codes)
	
	// status codes for redirects
	status.redirect = {
	  300: true,
	  301: true,
	  302: true,
	  303: true,
	  305: true,
	  307: true,
	  308: true
	}
	
	// status codes for empty bodies
	status.empty = {
	  204: true,
	  205: true,
	  304: true
	}
	
	// status codes for when you should retry the request
	status.retry = {
	  502: true,
	  503: true,
	  504: true
	}
	
	/**
	 * Populate the statuses map for given codes.
	 * @private
	 */
	
	function populateStatusesMap (statuses, codes) {
	  var arr = []
	
	  Object.keys(codes).forEach(function forEachCode (code) {
	    var message = codes[code]
	    var status = Number(code)
	
	    // Populate properties
	    statuses[status] = message
	    statuses[message] = status
	    statuses[message.toLowerCase()] = status
	
	    // Add to array
	    arr.push(status)
	  })
	
	  return arr
	}
	
	/**
	 * Get the status code.
	 *
	 * Given a number, this will throw if it is not a known status
	 * code, otherwise the code will be returned. Given a string,
	 * the string will be parsed for a number and return the code
	 * if valid, otherwise will lookup the code assuming this is
	 * the status message.
	 *
	 * @param {string|number} code
	 * @returns {number}
	 * @public
	 */
	
	function status (code) {
	  if (typeof code === 'number') {
	    if (!status[code]) throw new Error('invalid status code: ' + code)
	    return code
	  }
	
	  if (typeof code !== 'string') {
	    throw new TypeError('code must be a number or string')
	  }
	
	  // '403'
	  var n = parseInt(code, 10)
	  if (!isNaN(n)) {
	    if (!status[n]) throw new Error('invalid status code: ' + n)
	    return n
	  }
	
	  n = status[code.toLowerCase()]
	  if (!n) throw new Error('invalid status message: "' + code + '"')
	  return n
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = {
		"100": "Continue",
		"101": "Switching Protocols",
		"102": "Processing",
		"200": "OK",
		"201": "Created",
		"202": "Accepted",
		"203": "Non-Authoritative Information",
		"204": "No Content",
		"205": "Reset Content",
		"206": "Partial Content",
		"207": "Multi-Status",
		"208": "Already Reported",
		"226": "IM Used",
		"300": "Multiple Choices",
		"301": "Moved Permanently",
		"302": "Found",
		"303": "See Other",
		"304": "Not Modified",
		"305": "Use Proxy",
		"306": "(Unused)",
		"307": "Temporary Redirect",
		"308": "Permanent Redirect",
		"400": "Bad Request",
		"401": "Unauthorized",
		"402": "Payment Required",
		"403": "Forbidden",
		"404": "Not Found",
		"405": "Method Not Allowed",
		"406": "Not Acceptable",
		"407": "Proxy Authentication Required",
		"408": "Request Timeout",
		"409": "Conflict",
		"410": "Gone",
		"411": "Length Required",
		"412": "Precondition Failed",
		"413": "Payload Too Large",
		"414": "URI Too Long",
		"415": "Unsupported Media Type",
		"416": "Range Not Satisfiable",
		"417": "Expectation Failed",
		"418": "I'm a teapot",
		"421": "Misdirected Request",
		"422": "Unprocessable Entity",
		"423": "Locked",
		"424": "Failed Dependency",
		"425": "Unordered Collection",
		"426": "Upgrade Required",
		"428": "Precondition Required",
		"429": "Too Many Requests",
		"431": "Request Header Fields Too Large",
		"451": "Unavailable For Legal Reasons",
		"500": "Internal Server Error",
		"501": "Not Implemented",
		"502": "Bad Gateway",
		"503": "Service Unavailable",
		"504": "Gateway Timeout",
		"505": "HTTP Version Not Supported",
		"506": "Variant Also Negotiates",
		"507": "Insufficient Storage",
		"508": "Loop Detected",
		"509": "Bandwidth Limit Exceeded",
		"510": "Not Extended",
		"511": "Network Authentication Required"
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	/*!
	 * unpipe
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = unpipe
	
	/**
	 * Determine if there are Node.js pipe-like data listeners.
	 * @private
	 */
	
	function hasPipeDataListeners(stream) {
	  var listeners = stream.listeners('data')
	
	  for (var i = 0; i < listeners.length; i++) {
	    if (listeners[i].name === 'ondata') {
	      return true
	    }
	  }
	
	  return false
	}
	
	/**
	 * Unpipe a stream from all destinations.
	 *
	 * @param {object} stream
	 * @public
	 */
	
	function unpipe(stream) {
	  if (!stream) {
	    throw new TypeError('argument stream is required')
	  }
	
	  if (typeof stream.unpipe === 'function') {
	    // new-style
	    stream.unpipe()
	    return
	  }
	
	  // Node.js 0.8 hack
	  if (!hasPipeDataListeners(stream)) {
	    return
	  }
	
	  var listener
	  var listeners = stream.listeners('close')
	
	  for (var i = 0; i < listeners.length; i++) {
	    listener = listeners[i]
	
	    if (listener.name !== 'cleanup' && listener.name !== 'onclose') {
	      continue
	    }
	
	    // invoke the listener
	    listener.call(stream)
	  }
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var Route = __webpack_require__(24);
	var Layer = __webpack_require__(29);
	var methods = __webpack_require__(31);
	var mixin = __webpack_require__(33);
	var debug = __webpack_require__(25)('express:router');
	var deprecate = __webpack_require__(34)('express');
	var flatten = __webpack_require__(28);
	var parseUrl = __webpack_require__(35);
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var objectRegExp = /^\[object (\S+)\]$/;
	var slice = Array.prototype.slice;
	var toString = Object.prototype.toString;
	
	/**
	 * Initialize a new `Router` with the given `options`.
	 *
	 * @param {Object} options
	 * @return {Router} which is an callable function
	 * @public
	 */
	
	var proto = module.exports = function(options) {
	  var opts = options || {};
	
	  function router(req, res, next) {
	    router.handle(req, res, next);
	  }
	
	  // mixin Router class functions
	  router.__proto__ = proto;
	
	  router.params = {};
	  router._params = [];
	  router.caseSensitive = opts.caseSensitive;
	  router.mergeParams = opts.mergeParams;
	  router.strict = opts.strict;
	  router.stack = [];
	
	  return router;
	};
	
	/**
	 * Map the given param placeholder `name`(s) to the given callback.
	 *
	 * Parameter mapping is used to provide pre-conditions to routes
	 * which use normalized placeholders. For example a _:user_id_ parameter
	 * could automatically load a user's information from the database without
	 * any additional code,
	 *
	 * The callback uses the same signature as middleware, the only difference
	 * being that the value of the placeholder is passed, in this case the _id_
	 * of the user. Once the `next()` function is invoked, just like middleware
	 * it will continue on to execute the route, or subsequent parameter functions.
	 *
	 * Just like in middleware, you must either respond to the request or call next
	 * to avoid stalling the request.
	 *
	 *  app.param('user_id', function(req, res, next, id){
	 *    User.find(id, function(err, user){
	 *      if (err) {
	 *        return next(err);
	 *      } else if (!user) {
	 *        return next(new Error('failed to load user'));
	 *      }
	 *      req.user = user;
	 *      next();
	 *    });
	 *  });
	 *
	 * @param {String} name
	 * @param {Function} fn
	 * @return {app} for chaining
	 * @public
	 */
	
	proto.param = function param(name, fn) {
	  // param logic
	  if (typeof name === 'function') {
	    deprecate('router.param(fn): Refactor to use path params');
	    this._params.push(name);
	    return;
	  }
	
	  // apply param functions
	  var params = this._params;
	  var len = params.length;
	  var ret;
	
	  if (name[0] === ':') {
	    deprecate('router.param(' + JSON.stringify(name) + ', fn): Use router.param(' + JSON.stringify(name.substr(1)) + ', fn) instead');
	    name = name.substr(1);
	  }
	
	  for (var i = 0; i < len; ++i) {
	    if (ret = params[i](name, fn)) {
	      fn = ret;
	    }
	  }
	
	  // ensure we end up with a
	  // middleware function
	  if ('function' !== typeof fn) {
	    throw new Error('invalid param() call for ' + name + ', got ' + fn);
	  }
	
	  (this.params[name] = this.params[name] || []).push(fn);
	  return this;
	};
	
	/**
	 * Dispatch a req, res into the router.
	 * @private
	 */
	
	proto.handle = function handle(req, res, out) {
	  var self = this;
	
	  debug('dispatching %s %s', req.method, req.url);
	
	  var search = 1 + req.url.indexOf('?');
	  var pathlength = search ? search - 1 : req.url.length;
	  var fqdn = req.url[0] !== '/' && 1 + req.url.substr(0, pathlength).indexOf('://');
	  var protohost = fqdn ? req.url.substr(0, req.url.indexOf('/', 2 + fqdn)) : '';
	  var idx = 0;
	  var removed = '';
	  var slashAdded = false;
	  var paramcalled = {};
	
	  // store options for OPTIONS request
	  // only used if OPTIONS request
	  var options = [];
	
	  // middleware and routes
	  var stack = self.stack;
	
	  // manage inter-router variables
	  var parentParams = req.params;
	  var parentUrl = req.baseUrl || '';
	  var done = restore(out, req, 'baseUrl', 'next', 'params');
	
	  // setup next layer
	  req.next = next;
	
	  // for options requests, respond with a default if nothing else responds
	  if (req.method === 'OPTIONS') {
	    done = wrap(done, function(old, err) {
	      if (err || options.length === 0) return old(err);
	      sendOptionsResponse(res, options, old);
	    });
	  }
	
	  // setup basic req values
	  req.baseUrl = parentUrl;
	  req.originalUrl = req.originalUrl || req.url;
	
	  next();
	
	  function next(err) {
	    var layerError = err === 'route'
	      ? null
	      : err;
	
	    // remove added slash
	    if (slashAdded) {
	      req.url = req.url.substr(1);
	      slashAdded = false;
	    }
	
	    // restore altered req.url
	    if (removed.length !== 0) {
	      req.baseUrl = parentUrl;
	      req.url = protohost + removed + req.url.substr(protohost.length);
	      removed = '';
	    }
	
	    // no more matching layers
	    if (idx >= stack.length) {
	      setImmediate(done, layerError);
	      return;
	    }
	
	    // get pathname of request
	    var path = getPathname(req);
	
	    if (path == null) {
	      return done(layerError);
	    }
	
	    // find next matching layer
	    var layer;
	    var match;
	    var route;
	
	    while (match !== true && idx < stack.length) {
	      layer = stack[idx++];
	      match = matchLayer(layer, path);
	      route = layer.route;
	
	      if (typeof match !== 'boolean') {
	        // hold on to layerError
	        layerError = layerError || match;
	      }
	
	      if (match !== true) {
	        continue;
	      }
	
	      if (!route) {
	        // process non-route handlers normally
	        continue;
	      }
	
	      if (layerError) {
	        // routes do not match with a pending error
	        match = false;
	        continue;
	      }
	
	      var method = req.method;
	      var has_method = route._handles_method(method);
	
	      // build up automatic options response
	      if (!has_method && method === 'OPTIONS') {
	        appendMethods(options, route._options());
	      }
	
	      // don't even bother matching route
	      if (!has_method && method !== 'HEAD') {
	        match = false;
	        continue;
	      }
	    }
	
	    // no match
	    if (match !== true) {
	      return done(layerError);
	    }
	
	    // store route for dispatch on change
	    if (route) {
	      req.route = route;
	    }
	
	    // Capture one-time layer values
	    req.params = self.mergeParams
	      ? mergeParams(layer.params, parentParams)
	      : layer.params;
	    var layerPath = layer.path;
	
	    // this should be done for the layer
	    self.process_params(layer, paramcalled, req, res, function (err) {
	      if (err) {
	        return next(layerError || err);
	      }
	
	      if (route) {
	        return layer.handle_request(req, res, next);
	      }
	
	      trim_prefix(layer, layerError, layerPath, path);
	    });
	  }
	
	  function trim_prefix(layer, layerError, layerPath, path) {
	    var c = path[layerPath.length];
	    if (c && '/' !== c && '.' !== c) return next(layerError);
	
	     // Trim off the part of the url that matches the route
	     // middleware (.use stuff) needs to have the path stripped
	    if (layerPath.length !== 0) {
	      debug('trim prefix (%s) from url %s', layerPath, req.url);
	      removed = layerPath;
	      req.url = protohost + req.url.substr(protohost.length + removed.length);
	
	      // Ensure leading slash
	      if (!fqdn && req.url[0] !== '/') {
	        req.url = '/' + req.url;
	        slashAdded = true;
	      }
	
	      // Setup base URL (no trailing slash)
	      req.baseUrl = parentUrl + (removed[removed.length - 1] === '/'
	        ? removed.substring(0, removed.length - 1)
	        : removed);
	    }
	
	    debug('%s %s : %s', layer.name, layerPath, req.originalUrl);
	
	    if (layerError) {
	      layer.handle_error(layerError, req, res, next);
	    } else {
	      layer.handle_request(req, res, next);
	    }
	  }
	};
	
	/**
	 * Process any parameters for the layer.
	 * @private
	 */
	
	proto.process_params = function process_params(layer, called, req, res, done) {
	  var params = this.params;
	
	  // captured parameters from the layer, keys and values
	  var keys = layer.keys;
	
	  // fast track
	  if (!keys || keys.length === 0) {
	    return done();
	  }
	
	  var i = 0;
	  var name;
	  var paramIndex = 0;
	  var key;
	  var paramVal;
	  var paramCallbacks;
	  var paramCalled;
	
	  // process params in order
	  // param callbacks can be async
	  function param(err) {
	    if (err) {
	      return done(err);
	    }
	
	    if (i >= keys.length ) {
	      return done();
	    }
	
	    paramIndex = 0;
	    key = keys[i++];
	
	    if (!key) {
	      return done();
	    }
	
	    name = key.name;
	    paramVal = req.params[name];
	    paramCallbacks = params[name];
	    paramCalled = called[name];
	
	    if (paramVal === undefined || !paramCallbacks) {
	      return param();
	    }
	
	    // param previously called with same value or error occurred
	    if (paramCalled && (paramCalled.match === paramVal
	      || (paramCalled.error && paramCalled.error !== 'route'))) {
	      // restore value
	      req.params[name] = paramCalled.value;
	
	      // next param
	      return param(paramCalled.error);
	    }
	
	    called[name] = paramCalled = {
	      error: null,
	      match: paramVal,
	      value: paramVal
	    };
	
	    paramCallback();
	  }
	
	  // single param callbacks
	  function paramCallback(err) {
	    var fn = paramCallbacks[paramIndex++];
	
	    // store updated value
	    paramCalled.value = req.params[key.name];
	
	    if (err) {
	      // store error
	      paramCalled.error = err;
	      param(err);
	      return;
	    }
	
	    if (!fn) return param();
	
	    try {
	      fn(req, res, paramCallback, paramVal, key.name);
	    } catch (e) {
	      paramCallback(e);
	    }
	  }
	
	  param();
	};
	
	/**
	 * Use the given middleware function, with optional path, defaulting to "/".
	 *
	 * Use (like `.all`) will run for any http METHOD, but it will not add
	 * handlers for those methods so OPTIONS requests will not consider `.use`
	 * functions even if they could respond.
	 *
	 * The other difference is that _route_ path is stripped and not visible
	 * to the handler function. The main effect of this feature is that mounted
	 * handlers can operate without any code changes regardless of the "prefix"
	 * pathname.
	 *
	 * @public
	 */
	
	proto.use = function use(fn) {
	  var offset = 0;
	  var path = '/';
	
	  // default path to '/'
	  // disambiguate router.use([fn])
	  if (typeof fn !== 'function') {
	    var arg = fn;
	
	    while (Array.isArray(arg) && arg.length !== 0) {
	      arg = arg[0];
	    }
	
	    // first arg is the path
	    if (typeof arg !== 'function') {
	      offset = 1;
	      path = fn;
	    }
	  }
	
	  var callbacks = flatten(slice.call(arguments, offset));
	
	  if (callbacks.length === 0) {
	    throw new TypeError('Router.use() requires middleware functions');
	  }
	
	  for (var i = 0; i < callbacks.length; i++) {
	    var fn = callbacks[i];
	
	    if (typeof fn !== 'function') {
	      throw new TypeError('Router.use() requires middleware function but got a ' + gettype(fn));
	    }
	
	    // add the middleware
	    debug('use %s %s', path, fn.name || '<anonymous>');
	
	    var layer = new Layer(path, {
	      sensitive: this.caseSensitive,
	      strict: false,
	      end: false
	    }, fn);
	
	    layer.route = undefined;
	
	    this.stack.push(layer);
	  }
	
	  return this;
	};
	
	/**
	 * Create a new Route for the given path.
	 *
	 * Each route contains a separate middleware stack and VERB handlers.
	 *
	 * See the Route api documentation for details on adding handlers
	 * and middleware to routes.
	 *
	 * @param {String} path
	 * @return {Route}
	 * @public
	 */
	
	proto.route = function route(path) {
	  var route = new Route(path);
	
	  var layer = new Layer(path, {
	    sensitive: this.caseSensitive,
	    strict: this.strict,
	    end: true
	  }, route.dispatch.bind(route));
	
	  layer.route = route;
	
	  this.stack.push(layer);
	  return route;
	};
	
	// create Router#VERB functions
	methods.concat('all').forEach(function(method){
	  proto[method] = function(path){
	    var route = this.route(path)
	    route[method].apply(route, slice.call(arguments, 1));
	    return this;
	  };
	});
	
	// append methods to a list of methods
	function appendMethods(list, addition) {
	  for (var i = 0; i < addition.length; i++) {
	    var method = addition[i];
	    if (list.indexOf(method) === -1) {
	      list.push(method);
	    }
	  }
	}
	
	// get pathname of request
	function getPathname(req) {
	  try {
	    return parseUrl(req).pathname;
	  } catch (err) {
	    return undefined;
	  }
	}
	
	// get type for error message
	function gettype(obj) {
	  var type = typeof obj;
	
	  if (type !== 'object') {
	    return type;
	  }
	
	  // inspect [[Class]] for objects
	  return toString.call(obj)
	    .replace(objectRegExp, '$1');
	}
	
	/**
	 * Match path to a layer.
	 *
	 * @param {Layer} layer
	 * @param {string} path
	 * @private
	 */
	
	function matchLayer(layer, path) {
	  try {
	    return layer.match(path);
	  } catch (err) {
	    return err;
	  }
	}
	
	// merge params with parent params
	function mergeParams(params, parent) {
	  if (typeof parent !== 'object' || !parent) {
	    return params;
	  }
	
	  // make copy of parent for base
	  var obj = mixin({}, parent);
	
	  // simple non-numeric merging
	  if (!(0 in params) || !(0 in parent)) {
	    return mixin(obj, params);
	  }
	
	  var i = 0;
	  var o = 0;
	
	  // determine numeric gaps
	  while (i in params) {
	    i++;
	  }
	
	  while (o in parent) {
	    o++;
	  }
	
	  // offset numeric indices in params before merge
	  for (i--; i >= 0; i--) {
	    params[i + o] = params[i];
	
	    // create holes for the merge when necessary
	    if (i < o) {
	      delete params[i];
	    }
	  }
	
	  return mixin(obj, params);
	}
	
	// restore obj props after function
	function restore(fn, obj) {
	  var props = new Array(arguments.length - 2);
	  var vals = new Array(arguments.length - 2);
	
	  for (var i = 0; i < props.length; i++) {
	    props[i] = arguments[i + 2];
	    vals[i] = obj[props[i]];
	  }
	
	  return function(err){
	    // restore vals
	    for (var i = 0; i < props.length; i++) {
	      obj[props[i]] = vals[i];
	    }
	
	    return fn.apply(this, arguments);
	  };
	}
	
	// send an OPTIONS response
	function sendOptionsResponse(res, options, next) {
	  try {
	    var body = options.join(',');
	    res.set('Allow', body);
	    res.send(body);
	  } catch (err) {
	    next(err);
	  }
	}
	
	// wrap a function
	function wrap(old, fn) {
	  return function proxy() {
	    var args = new Array(arguments.length + 1);
	
	    args[0] = old;
	    for (var i = 0, len = arguments.length; i < len; i++) {
	      args[i + 1] = arguments[i];
	    }
	
	    fn.apply(this, args);
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).setImmediate))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var debug = __webpack_require__(25)('express:router:route');
	var flatten = __webpack_require__(28);
	var Layer = __webpack_require__(29);
	var methods = __webpack_require__(31);
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var slice = Array.prototype.slice;
	var toString = Object.prototype.toString;
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = Route;
	
	/**
	 * Initialize `Route` with the given `path`,
	 *
	 * @param {String} path
	 * @public
	 */
	
	function Route(path) {
	  this.path = path;
	  this.stack = [];
	
	  debug('new %s', path);
	
	  // route handlers for various http methods
	  this.methods = {};
	}
	
	/**
	 * Determine if the route handles a given method.
	 * @private
	 */
	
	Route.prototype._handles_method = function _handles_method(method) {
	  if (this.methods._all) {
	    return true;
	  }
	
	  var name = method.toLowerCase();
	
	  if (name === 'head' && !this.methods['head']) {
	    name = 'get';
	  }
	
	  return Boolean(this.methods[name]);
	};
	
	/**
	 * @return {Array} supported HTTP methods
	 * @private
	 */
	
	Route.prototype._options = function _options() {
	  var methods = Object.keys(this.methods);
	
	  // append automatic head
	  if (this.methods.get && !this.methods.head) {
	    methods.push('head');
	  }
	
	  for (var i = 0; i < methods.length; i++) {
	    // make upper case
	    methods[i] = methods[i].toUpperCase();
	  }
	
	  return methods;
	};
	
	/**
	 * dispatch req, res into this route
	 * @private
	 */
	
	Route.prototype.dispatch = function dispatch(req, res, done) {
	  var idx = 0;
	  var stack = this.stack;
	  if (stack.length === 0) {
	    return done();
	  }
	
	  var method = req.method.toLowerCase();
	  if (method === 'head' && !this.methods['head']) {
	    method = 'get';
	  }
	
	  req.route = this;
	
	  next();
	
	  function next(err) {
	    if (err && err === 'route') {
	      return done();
	    }
	
	    var layer = stack[idx++];
	    if (!layer) {
	      return done(err);
	    }
	
	    if (layer.method && layer.method !== method) {
	      return next(err);
	    }
	
	    if (err) {
	      layer.handle_error(err, req, res, next);
	    } else {
	      layer.handle_request(req, res, next);
	    }
	  }
	};
	
	/**
	 * Add a handler for all HTTP verbs to this route.
	 *
	 * Behaves just like middleware and can respond or call `next`
	 * to continue processing.
	 *
	 * You can use multiple `.all` call to add multiple handlers.
	 *
	 *   function check_something(req, res, next){
	 *     next();
	 *   };
	 *
	 *   function validate_user(req, res, next){
	 *     next();
	 *   };
	 *
	 *   route
	 *   .all(validate_user)
	 *   .all(check_something)
	 *   .get(function(req, res, next){
	 *     res.send('hello world');
	 *   });
	 *
	 * @param {function} handler
	 * @return {Route} for chaining
	 * @api public
	 */
	
	Route.prototype.all = function all() {
	  var handles = flatten(slice.call(arguments));
	
	  for (var i = 0; i < handles.length; i++) {
	    var handle = handles[i];
	
	    if (typeof handle !== 'function') {
	      var type = toString.call(handle);
	      var msg = 'Route.all() requires callback functions but got a ' + type;
	      throw new TypeError(msg);
	    }
	
	    var layer = Layer('/', {}, handle);
	    layer.method = undefined;
	
	    this.methods._all = true;
	    this.stack.push(layer);
	  }
	
	  return this;
	};
	
	methods.forEach(function(method){
	  Route.prototype[method] = function(){
	    var handles = flatten(slice.call(arguments));
	
	    for (var i = 0; i < handles.length; i++) {
	      var handle = handles[i];
	
	      if (typeof handle !== 'function') {
	        var type = toString.call(handle);
	        var msg = 'Route.' + method + '() requires callback functions but got a ' + type;
	        throw new Error(msg);
	      }
	
	      debug('%s %s', method, this.path);
	
	      var layer = Layer('/', {}, handle);
	      layer.method = method;
	
	      this.methods[method] = true;
	      this.stack.push(layer);
	    }
	
	    return this;
	  };
	});


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(26);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(27);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict'
	
	/**
	 * Expose `arrayFlatten`.
	 */
	module.exports = arrayFlatten
	
	/**
	 * Recursive flatten function with depth.
	 *
	 * @param  {Array}  array
	 * @param  {Array}  result
	 * @param  {Number} depth
	 * @return {Array}
	 */
	function flattenWithDepth (array, result, depth) {
	  for (var i = 0; i < array.length; i++) {
	    var value = array[i]
	
	    if (depth > 0 && Array.isArray(value)) {
	      flattenWithDepth(value, result, depth - 1)
	    } else {
	      result.push(value)
	    }
	  }
	
	  return result
	}
	
	/**
	 * Recursive flatten function. Omitting depth is slightly faster.
	 *
	 * @param  {Array} array
	 * @param  {Array} result
	 * @return {Array}
	 */
	function flattenForever (array, result) {
	  for (var i = 0; i < array.length; i++) {
	    var value = array[i]
	
	    if (Array.isArray(value)) {
	      flattenForever(value, result)
	    } else {
	      result.push(value)
	    }
	  }
	
	  return result
	}
	
	/**
	 * Flatten an array, with the ability to define a depth.
	 *
	 * @param  {Array}  array
	 * @param  {Number} depth
	 * @return {Array}
	 */
	function arrayFlatten (array, depth) {
	  if (depth == null) {
	    return flattenForever(array, [])
	  }
	
	  return flattenWithDepth(array, [], depth)
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var pathRegexp = __webpack_require__(30);
	var debug = __webpack_require__(25)('express:router:layer');
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = Layer;
	
	function Layer(path, options, fn) {
	  if (!(this instanceof Layer)) {
	    return new Layer(path, options, fn);
	  }
	
	  debug('new %s', path);
	  var opts = options || {};
	
	  this.handle = fn;
	  this.name = fn.name || '<anonymous>';
	  this.params = undefined;
	  this.path = undefined;
	  this.regexp = pathRegexp(path, this.keys = [], opts);
	
	  if (path === '/' && opts.end === false) {
	    this.regexp.fast_slash = true;
	  }
	}
	
	/**
	 * Handle the error for the layer.
	 *
	 * @param {Error} error
	 * @param {Request} req
	 * @param {Response} res
	 * @param {function} next
	 * @api private
	 */
	
	Layer.prototype.handle_error = function handle_error(error, req, res, next) {
	  var fn = this.handle;
	
	  if (fn.length !== 4) {
	    // not a standard error handler
	    return next(error);
	  }
	
	  try {
	    fn(error, req, res, next);
	  } catch (err) {
	    next(err);
	  }
	};
	
	/**
	 * Handle the request for the layer.
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @param {function} next
	 * @api private
	 */
	
	Layer.prototype.handle_request = function handle(req, res, next) {
	  var fn = this.handle;
	
	  if (fn.length > 3) {
	    // not a standard request handler
	    return next();
	  }
	
	  try {
	    fn(req, res, next);
	  } catch (err) {
	    next(err);
	  }
	};
	
	/**
	 * Check if this route matches `path`, if so
	 * populate `.params`.
	 *
	 * @param {String} path
	 * @return {Boolean}
	 * @api private
	 */
	
	Layer.prototype.match = function match(path) {
	  if (path == null) {
	    // no path, nothing matches
	    this.params = undefined;
	    this.path = undefined;
	    return false;
	  }
	
	  if (this.regexp.fast_slash) {
	    // fast path non-ending match for / (everything matches)
	    this.params = {};
	    this.path = '';
	    return true;
	  }
	
	  var m = this.regexp.exec(path);
	
	  if (!m) {
	    this.params = undefined;
	    this.path = undefined;
	    return false;
	  }
	
	  // store values
	  this.params = {};
	  this.path = m[0];
	
	  var keys = this.keys;
	  var params = this.params;
	
	  for (var i = 1; i < m.length; i++) {
	    var key = keys[i - 1];
	    var prop = key.name;
	    var val = decode_param(m[i]);
	
	    if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
	      params[prop] = val;
	    }
	  }
	
	  return true;
	};
	
	/**
	 * Decode param value.
	 *
	 * @param {string} val
	 * @return {string}
	 * @private
	 */
	
	function decode_param(val) {
	  if (typeof val !== 'string' || val.length === 0) {
	    return val;
	  }
	
	  try {
	    return decodeURIComponent(val);
	  } catch (err) {
	    if (err instanceof URIError) {
	      err.message = 'Failed to decode param \'' + val + '\'';
	      err.status = err.statusCode = 400;
	    }
	
	    throw err;
	  }
	}


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * Expose `pathtoRegexp`.
	 */
	
	module.exports = pathtoRegexp;
	
	/**
	 * Match matching groups in a regular expression.
	 */
	var MATCHING_GROUP_REGEXP = /\((?!\?)/g;
	
	/**
	 * Normalize the given path string,
	 * returning a regular expression.
	 *
	 * An empty array should be passed,
	 * which will contain the placeholder
	 * key names. For example "/user/:id" will
	 * then contain ["id"].
	 *
	 * @param  {String|RegExp|Array} path
	 * @param  {Array} keys
	 * @param  {Object} options
	 * @return {RegExp}
	 * @api private
	 */
	
	function pathtoRegexp(path, keys, options) {
	  options = options || {};
	  keys = keys || [];
	  var strict = options.strict;
	  var end = options.end !== false;
	  var flags = options.sensitive ? '' : 'i';
	  var extraOffset = 0;
	  var keysOffset = keys.length;
	  var i = 0;
	  var name = 0;
	  var m;
	
	  if (path instanceof RegExp) {
	    while (m = MATCHING_GROUP_REGEXP.exec(path.source)) {
	      keys.push({
	        name: name++,
	        optional: false,
	        offset: m.index
	      });
	    }
	
	    return path;
	  }
	
	  if (Array.isArray(path)) {
	    // Map array parts into regexps and return their source. We also pass
	    // the same keys and options instance into every generation to get
	    // consistent matching groups before we join the sources together.
	    path = path.map(function (value) {
	      return pathtoRegexp(value, keys, options).source;
	    });
	
	    return new RegExp('(?:' + path.join('|') + ')', flags);
	  }
	
	  path = ('^' + path + (strict ? '' : path[path.length - 1] === '/' ? '?' : '/?'))
	    .replace(/\/\(/g, '/(?:')
	    .replace(/([\/\.])/g, '\\$1')
	    .replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g, function (match, slash, format, key, capture, star, optional, offset) {
	      slash = slash || '';
	      format = format || '';
	      capture = capture || '([^\\/' + format + ']+?)';
	      optional = optional || '';
	
	      keys.push({
	        name: key,
	        optional: !!optional,
	        offset: offset + extraOffset
	      });
	
	      var result = ''
	        + (optional ? '' : slash)
	        + '(?:'
	        + format + (optional ? slash : '') + capture
	        + (star ? '((?:[\\/' + format + '].+?)?)' : '')
	        + ')'
	        + optional;
	
	      extraOffset += result.length - match.length;
	
	      return result;
	    })
	    .replace(/\*/g, function (star, index) {
	      var len = keys.length
	
	      while (len-- > keysOffset && keys[len].offset > index) {
	        keys[len].offset += 3; // Replacement length minus asterisk length.
	      }
	
	      return '(.*)';
	    });
	
	  // This is a workaround for handling unnamed matching groups.
	  while (m = MATCHING_GROUP_REGEXP.exec(path)) {
	    var escapeCount = 0;
	    var index = m.index;
	
	    while (path.charAt(--index) === '\\') {
	      escapeCount++;
	    }
	
	    // It's possible to escape the bracket.
	    if (escapeCount % 2 === 1) {
	      continue;
	    }
	
	    if (keysOffset + i === keys.length || keys[keysOffset + i].offset > m.index) {
	      keys.splice(keysOffset + i, 0, {
	        name: name++, // Unnamed matching groups must be consistently linear.
	        optional: false,
	        offset: m.index
	      });
	    }
	
	    i++;
	  }
	
	  // If the path is non-ending, match until the end or a slash.
	  path += (end ? '$' : (path[path.length - 1] === '/' ? '' : '(?=\\/|$)'));
	
	  return new RegExp(path, flags);
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * methods
	 * Copyright(c) 2013-2014 TJ Holowaychuk
	 * Copyright(c) 2015-2016 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var http = __webpack_require__(32);
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = getCurrentNodeMethods() || getBasicNodeMethods();
	
	/**
	 * Get the current Node.js methods.
	 * @private
	 */
	
	function getCurrentNodeMethods() {
	  return http.METHODS && http.METHODS.map(function lowerCaseMethod(method) {
	    return method.toLowerCase();
	  });
	}
	
	/**
	 * Get the "basic" Node.js methods, a snapshot from Node.js 0.10.
	 * @private
	 */
	
	function getBasicNodeMethods() {
	  return [
	    'get',
	    'post',
	    'put',
	    'head',
	    'delete',
	    'options',
	    'trace',
	    'copy',
	    'lock',
	    'mkcol',
	    'move',
	    'purge',
	    'propfind',
	    'proppatch',
	    'unlock',
	    'report',
	    'mkactivity',
	    'checkout',
	    'merge',
	    'm-search',
	    'notify',
	    'subscribe',
	    'unsubscribe',
	    'patch',
	    'search',
	    'connect'
	  ];
	}


/***/ },
/* 32 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Merge object b with object a.
	 *
	 *     var a = { foo: 'bar' }
	 *       , b = { bar: 'baz' };
	 *
	 *     merge(a, b);
	 *     // => { foo: 'bar', bar: 'baz' }
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object}
	 * @api public
	 */
	
	exports = module.exports = function(a, b){
	  if (a && b) {
	    for (var key in b) {
	      a[key] = b[key];
	    }
	  }
	  return a;
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	/*!
	 * depd
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = depd
	
	/**
	 * Create deprecate for namespace in caller.
	 */
	
	function depd(namespace) {
	  if (!namespace) {
	    throw new TypeError('argument namespace is required')
	  }
	
	  function deprecate(message) {
	    // no-op in browser
	  }
	
	  deprecate._file = undefined
	  deprecate._ignored = true
	  deprecate._namespace = namespace
	  deprecate._traced = false
	  deprecate._warned = Object.create(null)
	
	  deprecate.function = wrapfunction
	  deprecate.property = wrapproperty
	
	  return deprecate
	}
	
	/**
	 * Return a wrapped function in a deprecation message.
	 *
	 * This is a no-op version of the wrapper, which does nothing but call
	 * validation.
	 */
	
	function wrapfunction(fn, message) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('argument fn must be a function')
	  }
	
	  return fn
	}
	
	/**
	 * Wrap property in a deprecation message.
	 *
	 * This is a no-op version of the wrapper, which does nothing but call
	 * validation.
	 */
	
	function wrapproperty(obj, prop, message) {
	  if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
	    throw new TypeError('argument obj must be object')
	  }
	
	  var descriptor = Object.getOwnPropertyDescriptor(obj, prop)
	
	  if (!descriptor) {
	    throw new TypeError('must call property on owner object')
	  }
	
	  if (!descriptor.configurable) {
	    throw new TypeError('property must be configurable')
	  }
	
	  return
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * parseurl
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2014 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module dependencies.
	 */
	
	var url = __webpack_require__(36)
	var parse = url.parse
	var Url = url.Url
	
	/**
	 * Pattern for a simple path case.
	 * See: https://github.com/joyent/node/pull/7878
	 */
	
	var simplePathRegExp = /^(\/\/?(?!\/)[^\?#\s]*)(\?[^#\s]*)?$/
	
	/**
	 * Exports.
	 */
	
	module.exports = parseurl
	module.exports.original = originalurl
	
	/**
	 * Parse the `req` url with memoization.
	 *
	 * @param {ServerRequest} req
	 * @return {Object}
	 * @api public
	 */
	
	function parseurl(req) {
	  var url = req.url
	
	  if (url === undefined) {
	    // URL is undefined
	    return undefined
	  }
	
	  var parsed = req._parsedUrl
	
	  if (fresh(url, parsed)) {
	    // Return cached URL parse
	    return parsed
	  }
	
	  // Parse the URL
	  parsed = fastparse(url)
	  parsed._raw = url
	
	  return req._parsedUrl = parsed
	};
	
	/**
	 * Parse the `req` original url with fallback and memoization.
	 *
	 * @param {ServerRequest} req
	 * @return {Object}
	 * @api public
	 */
	
	function originalurl(req) {
	  var url = req.originalUrl
	
	  if (typeof url !== 'string') {
	    // Fallback
	    return parseurl(req)
	  }
	
	  var parsed = req._parsedOriginalUrl
	
	  if (fresh(url, parsed)) {
	    // Return cached URL parse
	    return parsed
	  }
	
	  // Parse the URL
	  parsed = fastparse(url)
	  parsed._raw = url
	
	  return req._parsedOriginalUrl = parsed
	};
	
	/**
	 * Parse the `str` url with fast-path short-cut.
	 *
	 * @param {string} str
	 * @return {Object}
	 * @api private
	 */
	
	function fastparse(str) {
	  // Try fast path regexp
	  // See: https://github.com/joyent/node/pull/7878
	  var simplePath = typeof str === 'string' && simplePathRegExp.exec(str)
	
	  // Construct simple URL
	  if (simplePath) {
	    var pathname = simplePath[1]
	    var search = simplePath[2] || null
	    var url = Url !== undefined
	      ? new Url()
	      : {}
	    url.path = str
	    url.href = str
	    url.pathname = pathname
	    url.search = search
	    url.query = search && search.substr(1)
	
	    return url
	  }
	
	  return parse(str)
	}
	
	/**
	 * Determine if parsed is still fresh for url.
	 *
	 * @param {string} url
	 * @param {object} parsedUrl
	 * @return {boolean}
	 * @api private
	 */
	
	function fresh(url, parsedUrl) {
	  return typeof parsedUrl === 'object'
	    && parsedUrl !== null
	    && (Url === undefined || parsedUrl instanceof Url)
	    && parsedUrl._raw === url
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var punycode = __webpack_require__(37);
	var util = __webpack_require__(39);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // Special case for a simple path URL
	    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(40);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && util.isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!util.isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  // Copy chrome, IE, opera backslash-handling behavior.
	  // Back slashes before the query string get converted to forward slashes
	  // See: https://code.google.com/p/chromium/issues/detail?id=25916
	  var queryIndex = url.indexOf('?'),
	      splitter =
	          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
	      uSplit = url.split(splitter),
	      slashRegex = /\\/g;
	  uSplit[0] = uSplit[0].replace(slashRegex, '/');
	  url = uSplit.join(splitter);
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    var simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      this.path = rest;
	      this.href = rest;
	      this.pathname = simplePath[1];
	      if (simplePath[2]) {
	        this.search = simplePath[2];
	        if (parseQueryString) {
	          this.query = querystring.parse(this.search.substr(1));
	        } else {
	          this.query = this.search.substr(1);
	        }
	      } else if (parseQueryString) {
	        this.search = '';
	        this.query = {};
	      }
	      return this;
	    }
	  }
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a punycoded representation of "domain".
	      // It only converts parts of the domain name that
	      // have non-ASCII characters, i.e. it doesn't matter if
	      // you call it with a domain that already is ASCII-only.
	      this.hostname = punycode.toASCII(this.hostname);
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      if (rest.indexOf(ae) === -1)
	        continue;
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (util.isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      util.isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (util.isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  var tkeys = Object.keys(this);
	  for (var tk = 0; tk < tkeys.length; tk++) {
	    var tkey = tkeys[tk];
	    result[tkey] = this[tkey];
	  }
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    var rkeys = Object.keys(relative);
	    for (var rk = 0; rk < rkeys.length; rk++) {
	      var rkey = rkeys[rk];
	      if (rkey !== 'protocol')
	        result[rkey] = relative[rkey];
	    }
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      var keys = Object.keys(relative);
	      for (var v = 0; v < keys.length; v++) {
	        var k = keys[v];
	        result[k] = relative[k];
	      }
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!util.isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especially happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host || srcPath.length > 1) &&
	      (last === '.' || last === '..') || last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last === '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especially happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(38)(module), (function() { return this; }())))

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  isString: function(arg) {
	    return typeof(arg) === 'string';
	  },
	  isObject: function(arg) {
	    return typeof(arg) === 'object' && arg !== null;
	  },
	  isNull: function(arg) {
	    return arg === null;
	  },
	  isNullOrUndefined: function(arg) {
	    return arg == null;
	  }
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(41);
	exports.encode = exports.stringify = __webpack_require__(42);


/***/ },
/* 41 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 43 */
/***/ function(module, exports) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Initialization middleware, exposing the
	 * request and response to each other, as well
	 * as defaulting the X-Powered-By header field.
	 *
	 * @param {Function} app
	 * @return {Function}
	 * @api private
	 */
	
	exports.init = function(app){
	  return function expressInit(req, res, next){
	    if (app.enabled('x-powered-by')) res.setHeader('X-Powered-By', 'Express');
	    req.res = res;
	    res.req = req;
	    req.next = next;
	
	    req.__proto__ = app.request;
	    res.__proto__ = app.response;
	
	    res.locals = res.locals || Object.create(null);
	
	    next();
	  };
	};
	


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module dependencies.
	 */
	
	var parseUrl = __webpack_require__(35);
	var qs = __webpack_require__(45);
	
	/**
	 * @param {Object} options
	 * @return {Function}
	 * @api public
	 */
	
	module.exports = function query(options) {
	  var opts = Object.create(options || null);
	  var queryparse = qs.parse;
	
	  if (typeof options === 'function') {
	    queryparse = options;
	    opts = undefined;
	  }
	
	  if (opts !== undefined && opts.allowPrototypes === undefined) {
	    // back-compat for qs module
	    opts.allowPrototypes = true;
	  }
	
	  return function query(req, res, next){
	    if (!req.query) {
	      var val = parseUrl(req).query;
	      req.query = queryparse(val, opts);
	    }
	
	    next();
	  };
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Stringify = __webpack_require__(46);
	var Parse = __webpack_require__(48);
	
	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utils = __webpack_require__(47);
	
	var arrayPrefixGenerators = {
	    brackets: function brackets(prefix) {
	        return prefix + '[]';
	    },
	    indices: function indices(prefix, key) {
	        return prefix + '[' + key + ']';
	    },
	    repeat: function repeat(prefix) {
	        return prefix;
	    }
	};
	
	var defaults = {
	    delimiter: '&',
	    strictNullHandling: false,
	    skipNulls: false,
	    encode: true,
	    encoder: Utils.encode
	};
	
	var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots) {
	    var obj = object;
	    if (typeof filter === 'function') {
	        obj = filter(prefix, obj);
	    } else if (obj instanceof Date) {
	        obj = obj.toISOString();
	    } else if (obj === null) {
	        if (strictNullHandling) {
	            return encoder ? encoder(prefix) : prefix;
	        }
	
	        obj = '';
	    }
	
	    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || Utils.isBuffer(obj)) {
	        if (encoder) {
	            return [encoder(prefix) + '=' + encoder(obj)];
	        }
	        return [prefix + '=' + String(obj)];
	    }
	
	    var values = [];
	
	    if (typeof obj === 'undefined') {
	        return values;
	    }
	
	    var objKeys;
	    if (Array.isArray(filter)) {
	        objKeys = filter;
	    } else {
	        var keys = Object.keys(obj);
	        objKeys = sort ? keys.sort(sort) : keys;
	    }
	
	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];
	
	        if (skipNulls && obj[key] === null) {
	            continue;
	        }
	
	        if (Array.isArray(obj)) {
	            values = values.concat(stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots));
	        } else {
	            values = values.concat(stringify(obj[key], prefix + (allowDots ? '.' + key : '[' + key + ']'), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots));
	        }
	    }
	
	    return values;
	};
	
	module.exports = function (object, opts) {
	    var obj = object;
	    var options = opts || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
	    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
	    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
	    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
	    var encoder = encode ? (typeof options.encoder === 'function' ? options.encoder : defaults.encoder) : null;
	    var sort = typeof options.sort === 'function' ? options.sort : null;
	    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
	    var objKeys;
	    var filter;
	
	    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
	        throw new TypeError('Encoder has to be a function.');
	    }
	
	    if (typeof options.filter === 'function') {
	        filter = options.filter;
	        obj = filter('', obj);
	    } else if (Array.isArray(options.filter)) {
	        objKeys = filter = options.filter;
	    }
	
	    var keys = [];
	
	    if (typeof obj !== 'object' || obj === null) {
	        return '';
	    }
	
	    var arrayFormat;
	    if (options.arrayFormat in arrayPrefixGenerators) {
	        arrayFormat = options.arrayFormat;
	    } else if ('indices' in options) {
	        arrayFormat = options.indices ? 'indices' : 'repeat';
	    } else {
	        arrayFormat = 'indices';
	    }
	
	    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
	
	    if (!objKeys) {
	        objKeys = Object.keys(obj);
	    }
	
	    if (sort) {
	        objKeys.sort(sort);
	    }
	
	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];
	
	        if (skipNulls && obj[key] === null) {
	            continue;
	        }
	
	        keys = keys.concat(stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots));
	    }
	
	    return keys.join(delimiter);
	};


/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';
	
	var hexTable = (function () {
	    var array = new Array(256);
	    for (var i = 0; i < 256; ++i) {
	        array[i] = '%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase();
	    }
	
	    return array;
	}());
	
	exports.arrayToObject = function (source, options) {
	    var obj = options.plainObjects ? Object.create(null) : {};
	    for (var i = 0; i < source.length; ++i) {
	        if (typeof source[i] !== 'undefined') {
	            obj[i] = source[i];
	        }
	    }
	
	    return obj;
	};
	
	exports.merge = function (target, source, options) {
	    if (!source) {
	        return target;
	    }
	
	    if (typeof source !== 'object') {
	        if (Array.isArray(target)) {
	            target.push(source);
	        } else if (typeof target === 'object') {
	            target[source] = true;
	        } else {
	            return [target, source];
	        }
	
	        return target;
	    }
	
	    if (typeof target !== 'object') {
	        return [target].concat(source);
	    }
	
	    var mergeTarget = target;
	    if (Array.isArray(target) && !Array.isArray(source)) {
	        mergeTarget = exports.arrayToObject(target, options);
	    }
	
	    return Object.keys(source).reduce(function (acc, key) {
	        var value = source[key];
	
	        if (Object.prototype.hasOwnProperty.call(acc, key)) {
	            acc[key] = exports.merge(acc[key], value, options);
	        } else {
	            acc[key] = value;
	        }
	        return acc;
	    }, mergeTarget);
	};
	
	exports.decode = function (str) {
	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};
	
	exports.encode = function (str) {
	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	    // It has been adapted here for stricter adherence to RFC 3986
	    if (str.length === 0) {
	        return str;
	    }
	
	    var string = typeof str === 'string' ? str : String(str);
	
	    var out = '';
	    for (var i = 0; i < string.length; ++i) {
	        var c = string.charCodeAt(i);
	
	        if (
	            c === 0x2D || // -
	            c === 0x2E || // .
	            c === 0x5F || // _
	            c === 0x7E || // ~
	            (c >= 0x30 && c <= 0x39) || // 0-9
	            (c >= 0x41 && c <= 0x5A) || // a-z
	            (c >= 0x61 && c <= 0x7A) // A-Z
	        ) {
	            out += string.charAt(i);
	            continue;
	        }
	
	        if (c < 0x80) {
	            out = out + hexTable[c];
	            continue;
	        }
	
	        if (c < 0x800) {
	            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }
	
	        if (c < 0xD800 || c >= 0xE000) {
	            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }
	
	        i += 1;
	        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
	        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)];
	    }
	
	    return out;
	};
	
	exports.compact = function (obj, references) {
	    if (typeof obj !== 'object' || obj === null) {
	        return obj;
	    }
	
	    var refs = references || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }
	
	    refs.push(obj);
	
	    if (Array.isArray(obj)) {
	        var compacted = [];
	
	        for (var i = 0; i < obj.length; ++i) {
	            if (obj[i] && typeof obj[i] === 'object') {
	                compacted.push(exports.compact(obj[i], refs));
	            } else if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }
	
	        return compacted;
	    }
	
	    var keys = Object.keys(obj);
	    for (var j = 0; j < keys.length; ++j) {
	        var key = keys[j];
	        obj[key] = exports.compact(obj[key], refs);
	    }
	
	    return obj;
	};
	
	exports.isRegExp = function (obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};
	
	exports.isBuffer = function (obj) {
	    if (obj === null || typeof obj === 'undefined') {
	        return false;
	    }
	
	    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
	};


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utils = __webpack_require__(47);
	
	var defaults = {
	    delimiter: '&',
	    depth: 5,
	    arrayLimit: 20,
	    parameterLimit: 1000,
	    strictNullHandling: false,
	    plainObjects: false,
	    allowPrototypes: false,
	    allowDots: false,
	    decoder: Utils.decode
	};
	
	var parseValues = function parseValues(str, options) {
	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);
	
	    for (var i = 0; i < parts.length; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;
	
	        if (pos === -1) {
	            obj[options.decoder(part)] = '';
	
	            if (options.strictNullHandling) {
	                obj[options.decoder(part)] = null;
	            }
	        } else {
	            var key = options.decoder(part.slice(0, pos));
	            var val = options.decoder(part.slice(pos + 1));
	
	            if (Object.prototype.hasOwnProperty.call(obj, key)) {
	                obj[key] = [].concat(obj[key]).concat(val);
	            } else {
	                obj[key] = val;
	            }
	        }
	    }
	
	    return obj;
	};
	
	var parseObject = function parseObject(chain, val, options) {
	    if (!chain.length) {
	        return val;
	    }
	
	    var root = chain.shift();
	
	    var obj;
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(parseObject(chain, val, options));
	    } else {
	        obj = options.plainObjects ? Object.create(null) : {};
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        if (
	            !isNaN(index) &&
	            root !== cleanRoot &&
	            String(index) === cleanRoot &&
	            index >= 0 &&
	            (options.parseArrays && index <= options.arrayLimit)
	        ) {
	            obj = [];
	            obj[index] = parseObject(chain, val, options);
	        } else {
	            obj[cleanRoot] = parseObject(chain, val, options);
	        }
	    }
	
	    return obj;
	};
	
	var parseKeys = function parseKeys(givenKey, val, options) {
	    if (!givenKey) {
	        return;
	    }
	
	    // Transform dot notation to bracket notation
	    var key = options.allowDots ? givenKey.replace(/\.([^\.\[]+)/g, '[$1]') : givenKey;
	
	    // The regex chunks
	
	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;
	
	    // Get the parent
	
	    var segment = parent.exec(key);
	
	    // Stash the parent if it exists
	
	    var keys = [];
	    if (segment[1]) {
	        // If we aren't using plain objects, optionally prefix keys
	        // that would overwrite object prototype properties
	        if (!options.plainObjects && Object.prototype.hasOwnProperty(segment[1])) {
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }
	
	        keys.push(segment[1]);
	    }
	
	    // Loop through children appending to the array until we hit depth
	
	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {
	        i += 1;
	        if (!options.plainObjects && Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
	            if (!options.allowPrototypes) {
	                continue;
	            }
	        }
	        keys.push(segment[1]);
	    }
	
	    // If there's a remainder, just add whatever is left
	
	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }
	
	    return parseObject(keys, val, options);
	};
	
	module.exports = function (str, opts) {
	    var options = opts || {};
	
	    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
	        throw new TypeError('Decoder has to be a function.');
	    }
	
	    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
	    options.parseArrays = options.parseArrays !== false;
	    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
	    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
	    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
	    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
	    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
	
	    if (str === '' || str === null || typeof str === 'undefined') {
	        return options.plainObjects ? Object.create(null) : {};
	    }
	
	    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
	    var obj = options.plainObjects ? Object.create(null) : {};
	
	    // Iterate over the keys and setup the new object
	
	    var keys = Object.keys(tempObj);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var newObj = parseKeys(key, tempObj[key], options);
	        obj = Utils.merge(obj, newObj, options);
	    }
	
	    return Utils.compact(obj);
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var debug = __webpack_require__(25)('express:view');
	var path = __webpack_require__(50);
	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var utils = __webpack_require__(54);
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var dirname = path.dirname;
	var basename = path.basename;
	var extname = path.extname;
	var join = path.join;
	var resolve = path.resolve;
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = View;
	
	/**
	 * Initialize a new `View` with the given `name`.
	 *
	 * Options:
	 *
	 *   - `defaultEngine` the default template engine name
	 *   - `engines` template engine require() cache
	 *   - `root` root path for view lookup
	 *
	 * @param {string} name
	 * @param {object} options
	 * @public
	 */
	
	function View(name, options) {
	  var opts = options || {};
	
	  this.defaultEngine = opts.defaultEngine;
	  this.ext = extname(name);
	  this.name = name;
	  this.root = opts.root;
	
	  if (!this.ext && !this.defaultEngine) {
	    throw new Error('No default engine was specified and no extension was provided.');
	  }
	
	  var fileName = name;
	
	  if (!this.ext) {
	    // get extension from default engine name
	    this.ext = this.defaultEngine[0] !== '.'
	      ? '.' + this.defaultEngine
	      : this.defaultEngine;
	
	    fileName += this.ext;
	  }
	
	  if (!opts.engines[this.ext]) {
	    // load engine
	    opts.engines[this.ext] = __webpack_require__(121)(this.ext.substr(1)).__express;
	  }
	
	  // store loaded engine
	  this.engine = opts.engines[this.ext];
	
	  // lookup path
	  this.path = this.lookup(fileName);
	}
	
	/**
	 * Lookup view by the given `name`
	 *
	 * @param {string} name
	 * @private
	 */
	
	View.prototype.lookup = function lookup(name) {
	  var path;
	  var roots = [].concat(this.root);
	
	  debug('lookup "%s"', name);
	
	  for (var i = 0; i < roots.length && !path; i++) {
	    var root = roots[i];
	
	    // resolve the path
	    var loc = resolve(root, name);
	    var dir = dirname(loc);
	    var file = basename(loc);
	
	    // resolve the file
	    path = this.resolve(dir, file);
	  }
	
	  return path;
	};
	
	/**
	 * Render with the given options.
	 *
	 * @param {object} options
	 * @param {function} callback
	 * @private
	 */
	
	View.prototype.render = function render(options, callback) {
	  debug('render "%s"', this.path);
	  this.engine(this.path, options, callback);
	};
	
	/**
	 * Resolve the file within the given directory.
	 *
	 * @param {string} dir
	 * @param {string} file
	 * @private
	 */
	
	View.prototype.resolve = function resolve(dir, file) {
	  var ext = this.ext;
	
	  // <path>.<ext>
	  var path = join(dir, file);
	  var stat = tryStat(path);
	
	  if (stat && stat.isFile()) {
	    return path;
	  }
	
	  // <path>/index.<ext>
	  path = join(dir, basename(file, ext), 'index' + ext);
	  stat = tryStat(path);
	
	  if (stat && stat.isFile()) {
	    return path;
	  }
	};
	
	/**
	 * Return a stat, maybe.
	 *
	 * @param {string} path
	 * @return {fs.Stats}
	 * @private
	 */
	
	function tryStat(path) {
	  debug('stat "%s"', path);
	
	  try {
	    return fs.statSync(path);
	  } catch (e) {
	    return undefined;
	  }
	}


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	
	var isWindows = process.platform === 'win32';
	var util = __webpack_require__(51);
	
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  var res = [];
	  for (var i = 0; i < parts.length; i++) {
	    var p = parts[i];
	
	    // ignore empty parts
	    if (!p || p === '.')
	      continue;
	
	    if (p === '..') {
	      if (res.length && res[res.length - 1] !== '..') {
	        res.pop();
	      } else if (allowAboveRoot) {
	        res.push('..');
	      }
	    } else {
	      res.push(p);
	    }
	  }
	
	  return res;
	}
	
	// returns an array with empty elements removed from either end of the input
	// array or the original array if no elements need to be removed
	function trimArray(arr) {
	  var lastIndex = arr.length - 1;
	  var start = 0;
	  for (; start <= lastIndex; start++) {
	    if (arr[start])
	      break;
	  }
	
	  var end = lastIndex;
	  for (; end >= 0; end--) {
	    if (arr[end])
	      break;
	  }
	
	  if (start === 0 && end === lastIndex)
	    return arr;
	  if (start > end)
	    return [];
	  return arr.slice(start, end + 1);
	}
	
	// Regex to split a windows path into three parts: [*, device, slash,
	// tail] windows-only
	var splitDeviceRe =
	    /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	
	// Regex to split the tail part of the above into [*, dir, basename, ext]
	var splitTailRe =
	    /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;
	
	var win32 = {};
	
	// Function to split a filename into [root, dir, basename, ext]
	function win32SplitPath(filename) {
	  // Separate device+slash from tail
	  var result = splitDeviceRe.exec(filename),
	      device = (result[1] || '') + (result[2] || ''),
	      tail = result[3] || '';
	  // Split the tail into dir, basename and extension
	  var result2 = splitTailRe.exec(tail),
	      dir = result2[1],
	      basename = result2[2],
	      ext = result2[3];
	  return [device, dir, basename, ext];
	}
	
	function win32StatPath(path) {
	  var result = splitDeviceRe.exec(path),
	      device = result[1] || '',
	      isUnc = !!device && device[1] !== ':';
	  return {
	    device: device,
	    isUnc: isUnc,
	    isAbsolute: isUnc || !!result[2], // UNC paths are always absolute
	    tail: result[3]
	  };
	}
	
	function normalizeUNCRoot(device) {
	  return '\\\\' + device.replace(/^[\\\/]+/, '').replace(/[\\\/]+/g, '\\');
	}
	
	// path.resolve([from ...], to)
	win32.resolve = function() {
	  var resolvedDevice = '',
	      resolvedTail = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1; i--) {
	    var path;
	    if (i >= 0) {
	      path = arguments[i];
	    } else if (!resolvedDevice) {
	      path = process.cwd();
	    } else {
	      // Windows has the concept of drive-specific current working
	      // directories. If we've resolved a drive letter but not yet an
	      // absolute path, get cwd for that drive. We're sure the device is not
	      // an unc path at this points, because unc paths are always absolute.
	      path = process.env['=' + resolvedDevice];
	      // Verify that a drive-local cwd was found and that it actually points
	      // to our drive. If not, default to the drive's root.
	      if (!path || path.substr(0, 3).toLowerCase() !==
	          resolvedDevice.toLowerCase() + '\\') {
	        path = resolvedDevice + '\\';
	      }
	    }
	
	    // Skip empty and invalid entries
	    if (!util.isString(path)) {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    var result = win32StatPath(path),
	        device = result.device,
	        isUnc = result.isUnc,
	        isAbsolute = result.isAbsolute,
	        tail = result.tail;
	
	    if (device &&
	        resolvedDevice &&
	        device.toLowerCase() !== resolvedDevice.toLowerCase()) {
	      // This path points to another device so it is not applicable
	      continue;
	    }
	
	    if (!resolvedDevice) {
	      resolvedDevice = device;
	    }
	    if (!resolvedAbsolute) {
	      resolvedTail = tail + '\\' + resolvedTail;
	      resolvedAbsolute = isAbsolute;
	    }
	
	    if (resolvedDevice && resolvedAbsolute) {
	      break;
	    }
	  }
	
	  // Convert slashes to backslashes when `resolvedDevice` points to an UNC
	  // root. Also squash multiple slashes into a single one where appropriate.
	  if (isUnc) {
	    resolvedDevice = normalizeUNCRoot(resolvedDevice);
	  }
	
	  // At this point the path should be resolved to a full absolute path,
	  // but handle relative paths to be safe (might happen when process.cwd()
	  // fails)
	
	  // Normalize the tail path
	  resolvedTail = normalizeArray(resolvedTail.split(/[\\\/]+/),
	                                !resolvedAbsolute).join('\\');
	
	  return (resolvedDevice + (resolvedAbsolute ? '\\' : '') + resolvedTail) ||
	         '.';
	};
	
	
	win32.normalize = function(path) {
	  var result = win32StatPath(path),
	      device = result.device,
	      isUnc = result.isUnc,
	      isAbsolute = result.isAbsolute,
	      tail = result.tail,
	      trailingSlash = /[\\\/]$/.test(tail);
	
	  // Normalize the tail path
	  tail = normalizeArray(tail.split(/[\\\/]+/), !isAbsolute).join('\\');
	
	  if (!tail && !isAbsolute) {
	    tail = '.';
	  }
	  if (tail && trailingSlash) {
	    tail += '\\';
	  }
	
	  // Convert slashes to backslashes when `device` points to an UNC root.
	  // Also squash multiple slashes into a single one where appropriate.
	  if (isUnc) {
	    device = normalizeUNCRoot(device);
	  }
	
	  return device + (isAbsolute ? '\\' : '') + tail;
	};
	
	
	win32.isAbsolute = function(path) {
	  return win32StatPath(path).isAbsolute;
	};
	
	win32.join = function() {
	  var paths = [];
	  for (var i = 0; i < arguments.length; i++) {
	    var arg = arguments[i];
	    if (!util.isString(arg)) {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    if (arg) {
	      paths.push(arg);
	    }
	  }
	
	  var joined = paths.join('\\');
	
	  // Make sure that the joined path doesn't start with two slashes, because
	  // normalize() will mistake it for an UNC path then.
	  //
	  // This step is skipped when it is very clear that the user actually
	  // intended to point at an UNC path. This is assumed when the first
	  // non-empty string arguments starts with exactly two slashes followed by
	  // at least one more non-slash character.
	  //
	  // Note that for normalize() to treat a path as an UNC path it needs to
	  // have at least 2 components, so we don't filter for that here.
	  // This means that the user can use join to construct UNC paths from
	  // a server name and a share name; for example:
	  //   path.join('//server', 'share') -> '\\\\server\\share\')
	  if (!/^[\\\/]{2}[^\\\/]/.test(paths[0])) {
	    joined = joined.replace(/^[\\\/]{2,}/, '\\');
	  }
	
	  return win32.normalize(joined);
	};
	
	
	// path.relative(from, to)
	// it will solve the relative path from 'from' to 'to', for instance:
	// from = 'C:\\orandea\\test\\aaa'
	// to = 'C:\\orandea\\impl\\bbb'
	// The output of the function should be: '..\\..\\impl\\bbb'
	win32.relative = function(from, to) {
	  from = win32.resolve(from);
	  to = win32.resolve(to);
	
	  // windows is not case sensitive
	  var lowerFrom = from.toLowerCase();
	  var lowerTo = to.toLowerCase();
	
	  var toParts = trimArray(to.split('\\'));
	
	  var lowerFromParts = trimArray(lowerFrom.split('\\'));
	  var lowerToParts = trimArray(lowerTo.split('\\'));
	
	  var length = Math.min(lowerFromParts.length, lowerToParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (lowerFromParts[i] !== lowerToParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  if (samePartsLength == 0) {
	    return to;
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < lowerFromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('\\');
	};
	
	
	win32._makeLong = function(path) {
	  // Note: this will *probably* throw somewhere.
	  if (!util.isString(path))
	    return path;
	
	  if (!path) {
	    return '';
	  }
	
	  var resolvedPath = win32.resolve(path);
	
	  if (/^[a-zA-Z]\:\\/.test(resolvedPath)) {
	    // path is local filesystem path, which needs to be converted
	    // to long UNC path.
	    return '\\\\?\\' + resolvedPath;
	  } else if (/^\\\\[^?.]/.test(resolvedPath)) {
	    // path is network UNC path, which needs to be converted
	    // to long UNC path.
	    return '\\\\?\\UNC\\' + resolvedPath.substring(2);
	  }
	
	  return path;
	};
	
	
	win32.dirname = function(path) {
	  var result = win32SplitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	win32.basename = function(path, ext) {
	  var f = win32SplitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	win32.extname = function(path) {
	  return win32SplitPath(path)[3];
	};
	
	
	win32.format = function(pathObject) {
	  if (!util.isObject(pathObject)) {
	    throw new TypeError(
	        "Parameter 'pathObject' must be an object, not " + typeof pathObject
	    );
	  }
	
	  var root = pathObject.root || '';
	
	  if (!util.isString(root)) {
	    throw new TypeError(
	        "'pathObject.root' must be a string or undefined, not " +
	        typeof pathObject.root
	    );
	  }
	
	  var dir = pathObject.dir;
	  var base = pathObject.base || '';
	  if (!dir) {
	    return base;
	  }
	  if (dir[dir.length - 1] === win32.sep) {
	    return dir + base;
	  }
	  return dir + win32.sep + base;
	};
	
	
	win32.parse = function(pathString) {
	  if (!util.isString(pathString)) {
	    throw new TypeError(
	        "Parameter 'pathString' must be a string, not " + typeof pathString
	    );
	  }
	  var allParts = win32SplitPath(pathString);
	  if (!allParts || allParts.length !== 4) {
	    throw new TypeError("Invalid path '" + pathString + "'");
	  }
	  return {
	    root: allParts[0],
	    dir: allParts[0] + allParts[1].slice(0, -1),
	    base: allParts[2],
	    ext: allParts[3],
	    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
	  };
	};
	
	
	win32.sep = '\\';
	win32.delimiter = ';';
	
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var posix = {};
	
	
	function posixSplitPath(filename) {
	  return splitPathRe.exec(filename).slice(1);
	}
	
	
	// path.resolve([from ...], to)
	// posix version
	posix.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (!util.isString(path)) {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path[0] === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(resolvedPath.split('/'),
	                                !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	posix.normalize = function(path) {
	  var isAbsolute = posix.isAbsolute(path),
	      trailingSlash = path && path[path.length - 1] === '/';
	
	  // Normalize the path
	  path = normalizeArray(path.split('/'), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	posix.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	posix.join = function() {
	  var path = '';
	  for (var i = 0; i < arguments.length; i++) {
	    var segment = arguments[i];
	    if (!util.isString(segment)) {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    if (segment) {
	      if (!path) {
	        path += segment;
	      } else {
	        path += '/' + segment;
	      }
	    }
	  }
	  return posix.normalize(path);
	};
	
	
	// path.relative(from, to)
	// posix version
	posix.relative = function(from, to) {
	  from = posix.resolve(from).substr(1);
	  to = posix.resolve(to).substr(1);
	
	  var fromParts = trimArray(from.split('/'));
	  var toParts = trimArray(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	
	posix._makeLong = function(path) {
	  return path;
	};
	
	
	posix.dirname = function(path) {
	  var result = posixSplitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	posix.basename = function(path, ext) {
	  var f = posixSplitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	posix.extname = function(path) {
	  return posixSplitPath(path)[3];
	};
	
	
	posix.format = function(pathObject) {
	  if (!util.isObject(pathObject)) {
	    throw new TypeError(
	        "Parameter 'pathObject' must be an object, not " + typeof pathObject
	    );
	  }
	
	  var root = pathObject.root || '';
	
	  if (!util.isString(root)) {
	    throw new TypeError(
	        "'pathObject.root' must be a string or undefined, not " +
	        typeof pathObject.root
	    );
	  }
	
	  var dir = pathObject.dir ? pathObject.dir + posix.sep : '';
	  var base = pathObject.base || '';
	  return dir + base;
	};
	
	
	posix.parse = function(pathString) {
	  if (!util.isString(pathString)) {
	    throw new TypeError(
	        "Parameter 'pathString' must be a string, not " + typeof pathString
	    );
	  }
	  var allParts = posixSplitPath(pathString);
	  if (!allParts || allParts.length !== 4) {
	    throw new TypeError("Invalid path '" + pathString + "'");
	  }
	  allParts[1] = allParts[1] || '';
	  allParts[2] = allParts[2] || '';
	  allParts[3] = allParts[3] || '';
	
	  return {
	    root: allParts[0],
	    dir: allParts[0] + allParts[1].slice(0, -1),
	    base: allParts[2],
	    ext: allParts[3],
	    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
	  };
	};
	
	
	posix.sep = '/';
	posix.delimiter = ':';
	
	
	if (isWindows)
	  module.exports = win32;
	else /* posix */
	  module.exports = posix;
	
	module.exports.posix = posix;
	module.exports.win32 = win32;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(52);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(53);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(6)))

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 53 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module dependencies.
	 * @api private
	 */
	
	var contentDisposition = __webpack_require__(55);
	var contentType = __webpack_require__(56);
	var deprecate = __webpack_require__(34)('express');
	var flatten = __webpack_require__(28);
	var mime = __webpack_require__(57).mime;
	var basename = __webpack_require__(50).basename;
	var etag = __webpack_require__(84);
	var proxyaddr = __webpack_require__(118);
	var qs = __webpack_require__(45);
	var querystring = __webpack_require__(40);
	
	/**
	 * Return strong ETag for `body`.
	 *
	 * @param {String|Buffer} body
	 * @param {String} [encoding]
	 * @return {String}
	 * @api private
	 */
	
	exports.etag = function (body, encoding) {
	  var buf = !Buffer.isBuffer(body)
	    ? new Buffer(body, encoding)
	    : body;
	
	  return etag(buf, {weak: false});
	};
	
	/**
	 * Return weak ETag for `body`.
	 *
	 * @param {String|Buffer} body
	 * @param {String} [encoding]
	 * @return {String}
	 * @api private
	 */
	
	exports.wetag = function wetag(body, encoding){
	  var buf = !Buffer.isBuffer(body)
	    ? new Buffer(body, encoding)
	    : body;
	
	  return etag(buf, {weak: true});
	};
	
	/**
	 * Check if `path` looks absolute.
	 *
	 * @param {String} path
	 * @return {Boolean}
	 * @api private
	 */
	
	exports.isAbsolute = function(path){
	  if ('/' === path[0]) return true;
	  if (':' === path[1] && ('\\' === path[2] || '/' === path[2])) return true; // Windows device path
	  if ('\\\\' === path.substring(0, 2)) return true; // Microsoft Azure absolute path
	};
	
	/**
	 * Flatten the given `arr`.
	 *
	 * @param {Array} arr
	 * @return {Array}
	 * @api private
	 */
	
	exports.flatten = deprecate.function(flatten,
	  'utils.flatten: use array-flatten npm module instead');
	
	/**
	 * Normalize the given `type`, for example "html" becomes "text/html".
	 *
	 * @param {String} type
	 * @return {Object}
	 * @api private
	 */
	
	exports.normalizeType = function(type){
	  return ~type.indexOf('/')
	    ? acceptParams(type)
	    : { value: mime.lookup(type), params: {} };
	};
	
	/**
	 * Normalize `types`, for example "html" becomes "text/html".
	 *
	 * @param {Array} types
	 * @return {Array}
	 * @api private
	 */
	
	exports.normalizeTypes = function(types){
	  var ret = [];
	
	  for (var i = 0; i < types.length; ++i) {
	    ret.push(exports.normalizeType(types[i]));
	  }
	
	  return ret;
	};
	
	/**
	 * Generate Content-Disposition header appropriate for the filename.
	 * non-ascii filenames are urlencoded and a filename* parameter is added
	 *
	 * @param {String} filename
	 * @return {String}
	 * @api private
	 */
	
	exports.contentDisposition = deprecate.function(contentDisposition,
	  'utils.contentDisposition: use content-disposition npm module instead');
	
	/**
	 * Parse accept params `str` returning an
	 * object with `.value`, `.quality` and `.params`.
	 * also includes `.originalIndex` for stable sorting
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function acceptParams(str, index) {
	  var parts = str.split(/ *; */);
	  var ret = { value: parts[0], quality: 1, params: {}, originalIndex: index };
	
	  for (var i = 1; i < parts.length; ++i) {
	    var pms = parts[i].split(/ *= */);
	    if ('q' === pms[0]) {
	      ret.quality = parseFloat(pms[1]);
	    } else {
	      ret.params[pms[0]] = pms[1];
	    }
	  }
	
	  return ret;
	}
	
	/**
	 * Compile "etag" value to function.
	 *
	 * @param  {Boolean|String|Function} val
	 * @return {Function}
	 * @api private
	 */
	
	exports.compileETag = function(val) {
	  var fn;
	
	  if (typeof val === 'function') {
	    return val;
	  }
	
	  switch (val) {
	    case true:
	      fn = exports.wetag;
	      break;
	    case false:
	      break;
	    case 'strong':
	      fn = exports.etag;
	      break;
	    case 'weak':
	      fn = exports.wetag;
	      break;
	    default:
	      throw new TypeError('unknown value for etag function: ' + val);
	  }
	
	  return fn;
	}
	
	/**
	 * Compile "query parser" value to function.
	 *
	 * @param  {String|Function} val
	 * @return {Function}
	 * @api private
	 */
	
	exports.compileQueryParser = function compileQueryParser(val) {
	  var fn;
	
	  if (typeof val === 'function') {
	    return val;
	  }
	
	  switch (val) {
	    case true:
	      fn = querystring.parse;
	      break;
	    case false:
	      fn = newObject;
	      break;
	    case 'extended':
	      fn = parseExtendedQueryString;
	      break;
	    case 'simple':
	      fn = querystring.parse;
	      break;
	    default:
	      throw new TypeError('unknown value for query parser function: ' + val);
	  }
	
	  return fn;
	}
	
	/**
	 * Compile "proxy trust" value to function.
	 *
	 * @param  {Boolean|String|Number|Array|Function} val
	 * @return {Function}
	 * @api private
	 */
	
	exports.compileTrust = function(val) {
	  if (typeof val === 'function') return val;
	
	  if (val === true) {
	    // Support plain true/false
	    return function(){ return true };
	  }
	
	  if (typeof val === 'number') {
	    // Support trusting hop count
	    return function(a, i){ return i < val };
	  }
	
	  if (typeof val === 'string') {
	    // Support comma-separated values
	    val = val.split(/ *, */);
	  }
	
	  return proxyaddr.compile(val || []);
	}
	
	/**
	 * Set the charset in a given Content-Type string.
	 *
	 * @param {String} type
	 * @param {String} charset
	 * @return {String}
	 * @api private
	 */
	
	exports.setCharset = function setCharset(type, charset) {
	  if (!type || !charset) {
	    return type;
	  }
	
	  // parse type
	  var parsed = contentType.parse(type);
	
	  // set charset
	  parsed.parameters.charset = charset;
	
	  // format type
	  return contentType.format(parsed);
	};
	
	/**
	 * Parse an extended query string with qs.
	 *
	 * @return {Object}
	 * @private
	 */
	
	function parseExtendedQueryString(str) {
	  return qs.parse(str, {
	    allowPrototypes: true
	  });
	}
	
	/**
	 * Return new empty object.
	 *
	 * @return {Object}
	 * @api private
	 */
	
	function newObject() {
	  return {};
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * content-disposition
	 * Copyright(c) 2014 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module exports.
	 */
	
	module.exports = contentDisposition
	module.exports.parse = parse
	
	/**
	 * Module dependencies.
	 */
	
	var basename = __webpack_require__(50).basename
	
	/**
	 * RegExp to match non attr-char, *after* encodeURIComponent (i.e. not including "%")
	 */
	
	var encodeUriAttrCharRegExp = /[\x00-\x20"'\(\)*,\/:;<=>?@\[\\\]\{\}\x7f]/g
	
	/**
	 * RegExp to match percent encoding escape.
	 */
	
	var hexEscapeRegExp = /%[0-9A-Fa-f]{2}/
	var hexEscapeReplaceRegExp = /%([0-9A-Fa-f]{2})/g
	
	/**
	 * RegExp to match non-latin1 characters.
	 */
	
	var nonLatin1RegExp = /[^\x20-\x7e\xa0-\xff]/g
	
	/**
	 * RegExp to match quoted-pair in RFC 2616
	 *
	 * quoted-pair = "\" CHAR
	 * CHAR        = <any US-ASCII character (octets 0 - 127)>
	 */
	
	var qescRegExp = /\\([\u0000-\u007f])/g;
	
	/**
	 * RegExp to match chars that must be quoted-pair in RFC 2616
	 */
	
	var quoteRegExp = /([\\"])/g
	
	/**
	 * RegExp for various RFC 2616 grammar
	 *
	 * parameter     = token "=" ( token | quoted-string )
	 * token         = 1*<any CHAR except CTLs or separators>
	 * separators    = "(" | ")" | "<" | ">" | "@"
	 *               | "," | ";" | ":" | "\" | <">
	 *               | "/" | "[" | "]" | "?" | "="
	 *               | "{" | "}" | SP | HT
	 * quoted-string = ( <"> *(qdtext | quoted-pair ) <"> )
	 * qdtext        = <any TEXT except <">>
	 * quoted-pair   = "\" CHAR
	 * CHAR          = <any US-ASCII character (octets 0 - 127)>
	 * TEXT          = <any OCTET except CTLs, but including LWS>
	 * LWS           = [CRLF] 1*( SP | HT )
	 * CRLF          = CR LF
	 * CR            = <US-ASCII CR, carriage return (13)>
	 * LF            = <US-ASCII LF, linefeed (10)>
	 * SP            = <US-ASCII SP, space (32)>
	 * HT            = <US-ASCII HT, horizontal-tab (9)>
	 * CTL           = <any US-ASCII control character (octets 0 - 31) and DEL (127)>
	 * OCTET         = <any 8-bit sequence of data>
	 */
	
	var paramRegExp = /; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g
	var textRegExp = /^[\x20-\x7e\x80-\xff]+$/
	var tokenRegExp = /^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/
	
	/**
	 * RegExp for various RFC 5987 grammar
	 *
	 * ext-value     = charset  "'" [ language ] "'" value-chars
	 * charset       = "UTF-8" / "ISO-8859-1" / mime-charset
	 * mime-charset  = 1*mime-charsetc
	 * mime-charsetc = ALPHA / DIGIT
	 *               / "!" / "#" / "$" / "%" / "&"
	 *               / "+" / "-" / "^" / "_" / "`"
	 *               / "{" / "}" / "~"
	 * language      = ( 2*3ALPHA [ extlang ] )
	 *               / 4ALPHA
	 *               / 5*8ALPHA
	 * extlang       = *3( "-" 3ALPHA )
	 * value-chars   = *( pct-encoded / attr-char )
	 * pct-encoded   = "%" HEXDIG HEXDIG
	 * attr-char     = ALPHA / DIGIT
	 *               / "!" / "#" / "$" / "&" / "+" / "-" / "."
	 *               / "^" / "_" / "`" / "|" / "~"
	 */
	
	var extValueRegExp = /^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+\-\.^_`|~])+)$/
	
	/**
	 * RegExp for various RFC 6266 grammar
	 *
	 * disposition-type = "inline" | "attachment" | disp-ext-type
	 * disp-ext-type    = token
	 * disposition-parm = filename-parm | disp-ext-parm
	 * filename-parm    = "filename" "=" value
	 *                  | "filename*" "=" ext-value
	 * disp-ext-parm    = token "=" value
	 *                  | ext-token "=" ext-value
	 * ext-token        = <the characters in token, followed by "*">
	 */
	
	var dispositionTypeRegExp = /^([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *(?:$|;)/
	
	/**
	 * Create an attachment Content-Disposition header.
	 *
	 * @param {string} [filename]
	 * @param {object} [options]
	 * @param {string} [options.type=attachment]
	 * @param {string|boolean} [options.fallback=true]
	 * @return {string}
	 * @api public
	 */
	
	function contentDisposition(filename, options) {
	  var opts = options || {}
	
	  // get type
	  var type = opts.type || 'attachment'
	
	  // get parameters
	  var params = createparams(filename, opts.fallback)
	
	  // format into string
	  return format(new ContentDisposition(type, params))
	}
	
	/**
	 * Create parameters object from filename and fallback.
	 *
	 * @param {string} [filename]
	 * @param {string|boolean} [fallback=true]
	 * @return {object}
	 * @api private
	 */
	
	function createparams(filename, fallback) {
	  if (filename === undefined) {
	    return
	  }
	
	  var params = {}
	
	  if (typeof filename !== 'string') {
	    throw new TypeError('filename must be a string')
	  }
	
	  // fallback defaults to true
	  if (fallback === undefined) {
	    fallback = true
	  }
	
	  if (typeof fallback !== 'string' && typeof fallback !== 'boolean') {
	    throw new TypeError('fallback must be a string or boolean')
	  }
	
	  if (typeof fallback === 'string' && nonLatin1RegExp.test(fallback)) {
	    throw new TypeError('fallback must be ISO-8859-1 string')
	  }
	
	  // restrict to file base name
	  var name = basename(filename)
	
	  // determine if name is suitable for quoted string
	  var isQuotedString = textRegExp.test(name)
	
	  // generate fallback name
	  var fallbackName = typeof fallback !== 'string'
	    ? fallback && getlatin1(name)
	    : basename(fallback)
	  var hasFallback = typeof fallbackName === 'string' && fallbackName !== name
	
	  // set extended filename parameter
	  if (hasFallback || !isQuotedString || hexEscapeRegExp.test(name)) {
	    params['filename*'] = name
	  }
	
	  // set filename parameter
	  if (isQuotedString || hasFallback) {
	    params.filename = hasFallback
	      ? fallbackName
	      : name
	  }
	
	  return params
	}
	
	/**
	 * Format object to Content-Disposition header.
	 *
	 * @param {object} obj
	 * @param {string} obj.type
	 * @param {object} [obj.parameters]
	 * @return {string}
	 * @api private
	 */
	
	function format(obj) {
	  var parameters = obj.parameters
	  var type = obj.type
	
	  if (!type || typeof type !== 'string' || !tokenRegExp.test(type)) {
	    throw new TypeError('invalid type')
	  }
	
	  // start with normalized type
	  var string = String(type).toLowerCase()
	
	  // append parameters
	  if (parameters && typeof parameters === 'object') {
	    var param
	    var params = Object.keys(parameters).sort()
	
	    for (var i = 0; i < params.length; i++) {
	      param = params[i]
	
	      var val = param.substr(-1) === '*'
	        ? ustring(parameters[param])
	        : qstring(parameters[param])
	
	      string += '; ' + param + '=' + val
	    }
	  }
	
	  return string
	}
	
	/**
	 * Decode a RFC 6987 field value (gracefully).
	 *
	 * @param {string} str
	 * @return {string}
	 * @api private
	 */
	
	function decodefield(str) {
	  var match = extValueRegExp.exec(str)
	
	  if (!match) {
	    throw new TypeError('invalid extended field value')
	  }
	
	  var charset = match[1].toLowerCase()
	  var encoded = match[2]
	  var value
	
	  // to binary string
	  var binary = encoded.replace(hexEscapeReplaceRegExp, pdecode)
	
	  switch (charset) {
	    case 'iso-8859-1':
	      value = getlatin1(binary)
	      break
	    case 'utf-8':
	      value = new Buffer(binary, 'binary').toString('utf8')
	      break
	    default:
	      throw new TypeError('unsupported charset in extended field')
	  }
	
	  return value
	}
	
	/**
	 * Get ISO-8859-1 version of string.
	 *
	 * @param {string} val
	 * @return {string}
	 * @api private
	 */
	
	function getlatin1(val) {
	  // simple Unicode -> ISO-8859-1 transformation
	  return String(val).replace(nonLatin1RegExp, '?')
	}
	
	/**
	 * Parse Content-Disposition header string.
	 *
	 * @param {string} string
	 * @return {object}
	 * @api private
	 */
	
	function parse(string) {
	  if (!string || typeof string !== 'string') {
	    throw new TypeError('argument string is required')
	  }
	
	  var match = dispositionTypeRegExp.exec(string)
	
	  if (!match) {
	    throw new TypeError('invalid type format')
	  }
	
	  // normalize type
	  var index = match[0].length
	  var type = match[1].toLowerCase()
	
	  var key
	  var names = []
	  var params = {}
	  var value
	
	  // calculate index to start at
	  index = paramRegExp.lastIndex = match[0].substr(-1) === ';'
	    ? index - 1
	    : index
	
	  // match parameters
	  while (match = paramRegExp.exec(string)) {
	    if (match.index !== index) {
	      throw new TypeError('invalid parameter format')
	    }
	
	    index += match[0].length
	    key = match[1].toLowerCase()
	    value = match[2]
	
	    if (names.indexOf(key) !== -1) {
	      throw new TypeError('invalid duplicate parameter')
	    }
	
	    names.push(key)
	
	    if (key.indexOf('*') + 1 === key.length) {
	      // decode extended value
	      key = key.slice(0, -1)
	      value = decodefield(value)
	
	      // overwrite existing value
	      params[key] = value
	      continue
	    }
	
	    if (typeof params[key] === 'string') {
	      continue
	    }
	
	    if (value[0] === '"') {
	      // remove quotes and escapes
	      value = value
	        .substr(1, value.length - 2)
	        .replace(qescRegExp, '$1')
	    }
	
	    params[key] = value
	  }
	
	  if (index !== -1 && index !== string.length) {
	    throw new TypeError('invalid parameter format')
	  }
	
	  return new ContentDisposition(type, params)
	}
	
	/**
	 * Percent decode a single character.
	 *
	 * @param {string} str
	 * @param {string} hex
	 * @return {string}
	 * @api private
	 */
	
	function pdecode(str, hex) {
	  return String.fromCharCode(parseInt(hex, 16))
	}
	
	/**
	 * Percent encode a single character.
	 *
	 * @param {string} char
	 * @return {string}
	 * @api private
	 */
	
	function pencode(char) {
	  var hex = String(char)
	    .charCodeAt(0)
	    .toString(16)
	    .toUpperCase()
	  return hex.length === 1
	    ? '%0' + hex
	    : '%' + hex
	}
	
	/**
	 * Quote a string for HTTP.
	 *
	 * @param {string} val
	 * @return {string}
	 * @api private
	 */
	
	function qstring(val) {
	  var str = String(val)
	
	  return '"' + str.replace(quoteRegExp, '\\$1') + '"'
	}
	
	/**
	 * Encode a Unicode string for HTTP (RFC 5987).
	 *
	 * @param {string} val
	 * @return {string}
	 * @api private
	 */
	
	function ustring(val) {
	  var str = String(val)
	
	  // percent encode as UTF-8
	  var encoded = encodeURIComponent(str)
	    .replace(encodeUriAttrCharRegExp, pencode)
	
	  return 'UTF-8\'\'' + encoded
	}
	
	/**
	 * Class for parsed Content-Disposition header for v8 optimization
	 */
	
	function ContentDisposition(type, parameters) {
	  this.type = type
	  this.parameters = parameters
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 56 */
/***/ function(module, exports) {

	/*!
	 * content-type
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
	 *
	 * parameter     = token "=" ( token / quoted-string )
	 * token         = 1*tchar
	 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
	 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
	 *               / DIGIT / ALPHA
	 *               ; any VCHAR, except delimiters
	 * quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
	 * qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
	 * obs-text      = %x80-FF
	 * quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
	 */
	var paramRegExp = /; *([!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) */g
	var textRegExp = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/
	var tokenRegExp = /^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/
	
	/**
	 * RegExp to match quoted-pair in RFC 7230 sec 3.2.6
	 *
	 * quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
	 * obs-text    = %x80-FF
	 */
	var qescRegExp = /\\([\u000b\u0020-\u00ff])/g
	
	/**
	 * RegExp to match chars that must be quoted-pair in RFC 7230 sec 3.2.6
	 */
	var quoteRegExp = /([\\"])/g
	
	/**
	 * RegExp to match type in RFC 6838
	 *
	 * media-type = type "/" subtype
	 * type       = token
	 * subtype    = token
	 */
	var typeRegExp = /^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+\/[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/
	
	/**
	 * Module exports.
	 * @public
	 */
	
	exports.format = format
	exports.parse = parse
	
	/**
	 * Format object to media type.
	 *
	 * @param {object} obj
	 * @return {string}
	 * @public
	 */
	
	function format(obj) {
	  if (!obj || typeof obj !== 'object') {
	    throw new TypeError('argument obj is required')
	  }
	
	  var parameters = obj.parameters
	  var type = obj.type
	
	  if (!type || !typeRegExp.test(type)) {
	    throw new TypeError('invalid type')
	  }
	
	  var string = type
	
	  // append parameters
	  if (parameters && typeof parameters === 'object') {
	    var param
	    var params = Object.keys(parameters).sort()
	
	    for (var i = 0; i < params.length; i++) {
	      param = params[i]
	
	      if (!tokenRegExp.test(param)) {
	        throw new TypeError('invalid parameter name')
	      }
	
	      string += '; ' + param + '=' + qstring(parameters[param])
	    }
	  }
	
	  return string
	}
	
	/**
	 * Parse media type to object.
	 *
	 * @param {string|object} string
	 * @return {Object}
	 * @public
	 */
	
	function parse(string) {
	  if (!string) {
	    throw new TypeError('argument string is required')
	  }
	
	  if (typeof string === 'object') {
	    // support req/res-like objects as argument
	    string = getcontenttype(string)
	
	    if (typeof string !== 'string') {
	      throw new TypeError('content-type header is missing from object');
	    }
	  }
	
	  if (typeof string !== 'string') {
	    throw new TypeError('argument string is required to be a string')
	  }
	
	  var index = string.indexOf(';')
	  var type = index !== -1
	    ? string.substr(0, index).trim()
	    : string.trim()
	
	  if (!typeRegExp.test(type)) {
	    throw new TypeError('invalid media type')
	  }
	
	  var key
	  var match
	  var obj = new ContentType(type.toLowerCase())
	  var value
	
	  paramRegExp.lastIndex = index
	
	  while (match = paramRegExp.exec(string)) {
	    if (match.index !== index) {
	      throw new TypeError('invalid parameter format')
	    }
	
	    index += match[0].length
	    key = match[1].toLowerCase()
	    value = match[2]
	
	    if (value[0] === '"') {
	      // remove quotes and escapes
	      value = value
	        .substr(1, value.length - 2)
	        .replace(qescRegExp, '$1')
	    }
	
	    obj.parameters[key] = value
	  }
	
	  if (index !== -1 && index !== string.length) {
	    throw new TypeError('invalid parameter format')
	  }
	
	  return obj
	}
	
	/**
	 * Get content-type from req/res objects.
	 *
	 * @param {object}
	 * @return {Object}
	 * @private
	 */
	
	function getcontenttype(obj) {
	  if (typeof obj.getHeader === 'function') {
	    // res-like
	    return obj.getHeader('content-type')
	  }
	
	  if (typeof obj.headers === 'object') {
	    // req-like
	    return obj.headers && obj.headers['content-type']
	  }
	}
	
	/**
	 * Quote a string if necessary.
	 *
	 * @param {string} val
	 * @return {string}
	 * @private
	 */
	
	function qstring(val) {
	  var str = String(val)
	
	  // no need to quote tokens
	  if (tokenRegExp.test(str)) {
	    return str
	  }
	
	  if (str.length > 0 && !textRegExp.test(str)) {
	    throw new TypeError('invalid parameter value')
	  }
	
	  return '"' + str.replace(quoteRegExp, '\\$1') + '"'
	}
	
	/**
	 * Class to represent a content type.
	 * @private
	 */
	function ContentType(type) {
	  this.parameters = Object.create(null)
	  this.type = type
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * send
	 * Copyright(c) 2012 TJ Holowaychuk
	 * Copyright(c) 2014-2016 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var createError = __webpack_require__(58)
	var debug = __webpack_require__(61)('send')
	var deprecate = __webpack_require__(34)('send')
	var destroy = __webpack_require__(64)
	var encodeUrl = __webpack_require__(83)
	var escapeHtml = __webpack_require__(17)
	var etag = __webpack_require__(84)
	var EventEmitter = __webpack_require__(3).EventEmitter
	var fresh = __webpack_require__(114)
	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	var mime = __webpack_require__(115)
	var ms = __webpack_require__(63)
	var onFinished = __webpack_require__(18)
	var parseRange = __webpack_require__(117)
	var path = __webpack_require__(50)
	var statuses = __webpack_require__(20)
	var Stream = __webpack_require__(65)
	var util = __webpack_require__(51)
	
	/**
	 * Path function references.
	 * @private
	 */
	
	var extname = path.extname
	var join = path.join
	var normalize = path.normalize
	var resolve = path.resolve
	var sep = path.sep
	
	/**
	 * Regular expression for identifying a bytes Range header.
	 * @private
	 */
	
	var BYTES_RANGE_REGEXP = /^ *bytes=/
	
	/**
	 * Maximum value allowed for the max age.
	 * @private
	 */
	
	var MAX_MAXAGE = 60 * 60 * 24 * 365 * 1000 // 1 year
	
	/**
	 * Regular expression to match a path with a directory up component.
	 * @private
	 */
	
	var UP_PATH_REGEXP = /(?:^|[\\\/])\.\.(?:[\\\/]|$)/
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = send
	module.exports.mime = mime
	
	/**
	 * Shim EventEmitter.listenerCount for node.js < 0.10
	 */
	
	/* istanbul ignore next */
	var listenerCount = EventEmitter.listenerCount ||
	  function (emitter, type) { return emitter.listeners(type).length }
	
	/**
	 * Return a `SendStream` for `req` and `path`.
	 *
	 * @param {object} req
	 * @param {string} path
	 * @param {object} [options]
	 * @return {SendStream}
	 * @public
	 */
	
	function send (req, path, options) {
	  return new SendStream(req, path, options)
	}
	
	/**
	 * Initialize a `SendStream` with the given `path`.
	 *
	 * @param {Request} req
	 * @param {String} path
	 * @param {object} [options]
	 * @private
	 */
	
	function SendStream (req, path, options) {
	  Stream.call(this)
	
	  var opts = options || {}
	
	  this.options = opts
	  this.path = path
	  this.req = req
	
	  this._acceptRanges = opts.acceptRanges !== undefined
	    ? Boolean(opts.acceptRanges)
	    : true
	
	  this._cacheControl = opts.cacheControl !== undefined
	    ? Boolean(opts.cacheControl)
	    : true
	
	  this._etag = opts.etag !== undefined
	    ? Boolean(opts.etag)
	    : true
	
	  this._dotfiles = opts.dotfiles !== undefined
	    ? opts.dotfiles
	    : 'ignore'
	
	  if (this._dotfiles !== 'ignore' && this._dotfiles !== 'allow' && this._dotfiles !== 'deny') {
	    throw new TypeError('dotfiles option must be "allow", "deny", or "ignore"')
	  }
	
	  this._hidden = Boolean(opts.hidden)
	
	  if (opts.hidden !== undefined) {
	    deprecate('hidden: use dotfiles: \'' + (this._hidden ? 'allow' : 'ignore') + '\' instead')
	  }
	
	  // legacy support
	  if (opts.dotfiles === undefined) {
	    this._dotfiles = undefined
	  }
	
	  this._extensions = opts.extensions !== undefined
	    ? normalizeList(opts.extensions, 'extensions option')
	    : []
	
	  this._index = opts.index !== undefined
	    ? normalizeList(opts.index, 'index option')
	    : ['index.html']
	
	  this._lastModified = opts.lastModified !== undefined
	    ? Boolean(opts.lastModified)
	    : true
	
	  this._maxage = opts.maxAge || opts.maxage
	  this._maxage = typeof this._maxage === 'string'
	    ? ms(this._maxage)
	    : Number(this._maxage)
	  this._maxage = !isNaN(this._maxage)
	    ? Math.min(Math.max(0, this._maxage), MAX_MAXAGE)
	    : 0
	
	  this._root = opts.root
	    ? resolve(opts.root)
	    : null
	
	  if (!this._root && opts.from) {
	    this.from(opts.from)
	  }
	}
	
	/**
	 * Inherits from `Stream`.
	 */
	
	util.inherits(SendStream, Stream)
	
	/**
	 * Enable or disable etag generation.
	 *
	 * @param {Boolean} val
	 * @return {SendStream}
	 * @api public
	 */
	
	SendStream.prototype.etag = deprecate.function(function etag (val) {
	  this._etag = Boolean(val)
	  debug('etag %s', this._etag)
	  return this
	}, 'send.etag: pass etag as option')
	
	/**
	 * Enable or disable "hidden" (dot) files.
	 *
	 * @param {Boolean} path
	 * @return {SendStream}
	 * @api public
	 */
	
	SendStream.prototype.hidden = deprecate.function(function hidden (val) {
	  this._hidden = Boolean(val)
	  this._dotfiles = undefined
	  debug('hidden %s', this._hidden)
	  return this
	}, 'send.hidden: use dotfiles option')
	
	/**
	 * Set index `paths`, set to a falsy
	 * value to disable index support.
	 *
	 * @param {String|Boolean|Array} paths
	 * @return {SendStream}
	 * @api public
	 */
	
	SendStream.prototype.index = deprecate.function(function index (paths) {
	  var index = !paths ? [] : normalizeList(paths, 'paths argument')
	  debug('index %o', paths)
	  this._index = index
	  return this
	}, 'send.index: pass index as option')
	
	/**
	 * Set root `path`.
	 *
	 * @param {String} path
	 * @return {SendStream}
	 * @api public
	 */
	
	SendStream.prototype.root = function root (path) {
	  this._root = resolve(String(path))
	  debug('root %s', this._root)
	  return this
	}
	
	SendStream.prototype.from = deprecate.function(SendStream.prototype.root,
	  'send.from: pass root as option')
	
	SendStream.prototype.root = deprecate.function(SendStream.prototype.root,
	  'send.root: pass root as option')
	
	/**
	 * Set max-age to `maxAge`.
	 *
	 * @param {Number} maxAge
	 * @return {SendStream}
	 * @api public
	 */
	
	SendStream.prototype.maxage = deprecate.function(function maxage (maxAge) {
	  this._maxage = typeof maxAge === 'string'
	    ? ms(maxAge)
	    : Number(maxAge)
	  this._maxage = !isNaN(this._maxage)
	    ? Math.min(Math.max(0, this._maxage), MAX_MAXAGE)
	    : 0
	  debug('max-age %d', this._maxage)
	  return this
	}, 'send.maxage: pass maxAge as option')
	
	/**
	 * Emit error with `status`.
	 *
	 * @param {number} status
	 * @param {Error} [error]
	 * @private
	 */
	
	SendStream.prototype.error = function error (status, error) {
	  // emit if listeners instead of responding
	  if (listenerCount(this, 'error') !== 0) {
	    return this.emit('error', createError(error, status, {
	      expose: false
	    }))
	  }
	
	  var res = this.res
	  var msg = statuses[status]
	
	  // clear existing headers
	  clearHeaders(res)
	
	  // add error headers
	  if (error && error.headers) {
	    setHeaders(res, error.headers)
	  }
	
	  // send basic response
	  res.statusCode = status
	  res.setHeader('Content-Type', 'text/plain; charset=UTF-8')
	  res.setHeader('Content-Length', Buffer.byteLength(msg))
	  res.setHeader('X-Content-Type-Options', 'nosniff')
	  res.end(msg)
	}
	
	/**
	 * Check if the pathname ends with "/".
	 *
	 * @return {Boolean}
	 * @api private
	 */
	
	SendStream.prototype.hasTrailingSlash = function hasTrailingSlash () {
	  return this.path[this.path.length - 1] === '/'
	}
	
	/**
	 * Check if this is a conditional GET request.
	 *
	 * @return {Boolean}
	 * @api private
	 */
	
	SendStream.prototype.isConditionalGET = function isConditionalGET () {
	  return this.req.headers['if-none-match'] ||
	    this.req.headers['if-modified-since']
	}
	
	/**
	 * Strip content-* header fields.
	 *
	 * @private
	 */
	
	SendStream.prototype.removeContentHeaderFields = function removeContentHeaderFields () {
	  var res = this.res
	  var headers = Object.keys(res._headers || {})
	
	  for (var i = 0; i < headers.length; i++) {
	    var header = headers[i]
	    if (header.substr(0, 8) === 'content-' && header !== 'content-location') {
	      res.removeHeader(header)
	    }
	  }
	}
	
	/**
	 * Respond with 304 not modified.
	 *
	 * @api private
	 */
	
	SendStream.prototype.notModified = function notModified () {
	  var res = this.res
	  debug('not modified')
	  this.removeContentHeaderFields()
	  res.statusCode = 304
	  res.end()
	}
	
	/**
	 * Raise error that headers already sent.
	 *
	 * @api private
	 */
	
	SendStream.prototype.headersAlreadySent = function headersAlreadySent () {
	  var err = new Error('Can\'t set headers after they are sent.')
	  debug('headers already sent')
	  this.error(500, err)
	}
	
	/**
	 * Check if the request is cacheable, aka
	 * responded with 2xx or 304 (see RFC 2616 section 14.2{5,6}).
	 *
	 * @return {Boolean}
	 * @api private
	 */
	
	SendStream.prototype.isCachable = function isCachable () {
	  var statusCode = this.res.statusCode
	  return (statusCode >= 200 && statusCode < 300) ||
	    statusCode === 304
	}
	
	/**
	 * Handle stat() error.
	 *
	 * @param {Error} error
	 * @private
	 */
	
	SendStream.prototype.onStatError = function onStatError (error) {
	  switch (error.code) {
	    case 'ENAMETOOLONG':
	    case 'ENOENT':
	    case 'ENOTDIR':
	      this.error(404, error)
	      break
	    default:
	      this.error(500, error)
	      break
	  }
	}
	
	/**
	 * Check if the cache is fresh.
	 *
	 * @return {Boolean}
	 * @api private
	 */
	
	SendStream.prototype.isFresh = function isFresh () {
	  return fresh(this.req.headers, this.res._headers)
	}
	
	/**
	 * Check if the range is fresh.
	 *
	 * @return {Boolean}
	 * @api private
	 */
	
	SendStream.prototype.isRangeFresh = function isRangeFresh () {
	  var ifRange = this.req.headers['if-range']
	
	  if (!ifRange) {
	    return true
	  }
	
	  return ~ifRange.indexOf('"')
	    ? ~ifRange.indexOf(this.res._headers['etag'])
	    : Date.parse(this.res._headers['last-modified']) <= Date.parse(ifRange)
	}
	
	/**
	 * Redirect to path.
	 *
	 * @param {string} path
	 * @private
	 */
	
	SendStream.prototype.redirect = function redirect (path) {
	  if (listenerCount(this, 'directory') !== 0) {
	    this.emit('directory')
	    return
	  }
	
	  if (this.hasTrailingSlash()) {
	    this.error(403)
	    return
	  }
	
	  var loc = encodeUrl(collapseLeadingSlashes(path + '/'))
	  var msg = 'Redirecting to <a href="' + escapeHtml(loc) + '">' + escapeHtml(loc) + '</a>\n'
	  var res = this.res
	
	  // redirect
	  res.statusCode = 301
	  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
	  res.setHeader('Content-Length', Buffer.byteLength(msg))
	  res.setHeader('X-Content-Type-Options', 'nosniff')
	  res.setHeader('Location', loc)
	  res.end(msg)
	}
	
	/**
	 * Pipe to `res.
	 *
	 * @param {Stream} res
	 * @return {Stream} res
	 * @api public
	 */
	
	SendStream.prototype.pipe = function pipe (res) {
	  // root path
	  var root = this._root
	
	  // references
	  this.res = res
	
	  // decode the path
	  var path = decode(this.path)
	  if (path === -1) {
	    this.error(400)
	    return res
	  }
	
	  // null byte(s)
	  if (~path.indexOf('\0')) {
	    this.error(400)
	    return res
	  }
	
	  var parts
	  if (root !== null) {
	    // malicious path
	    if (UP_PATH_REGEXP.test(normalize('.' + sep + path))) {
	      debug('malicious path "%s"', path)
	      this.error(403)
	      return res
	    }
	
	    // join / normalize from optional root dir
	    path = normalize(join(root, path))
	    root = normalize(root + sep)
	
	    // explode path parts
	    parts = path.substr(root.length).split(sep)
	  } else {
	    // ".." is malicious without "root"
	    if (UP_PATH_REGEXP.test(path)) {
	      debug('malicious path "%s"', path)
	      this.error(403)
	      return res
	    }
	
	    // explode path parts
	    parts = normalize(path).split(sep)
	
	    // resolve the path
	    path = resolve(path)
	  }
	
	  // dotfile handling
	  if (containsDotFile(parts)) {
	    var access = this._dotfiles
	
	    // legacy support
	    if (access === undefined) {
	      access = parts[parts.length - 1][0] === '.'
	        ? (this._hidden ? 'allow' : 'ignore')
	        : 'allow'
	    }
	
	    debug('%s dotfile "%s"', access, path)
	    switch (access) {
	      case 'allow':
	        break
	      case 'deny':
	        this.error(403)
	        return res
	      case 'ignore':
	      default:
	        this.error(404)
	        return res
	    }
	  }
	
	  // index file support
	  if (this._index.length && this.path[this.path.length - 1] === '/') {
	    this.sendIndex(path)
	    return res
	  }
	
	  this.sendFile(path)
	  return res
	}
	
	/**
	 * Transfer `path`.
	 *
	 * @param {String} path
	 * @api public
	 */
	
	SendStream.prototype.send = function send (path, stat) {
	  var len = stat.size
	  var options = this.options
	  var opts = {}
	  var res = this.res
	  var req = this.req
	  var ranges = req.headers.range
	  var offset = options.start || 0
	
	  if (res._header) {
	    // impossible to send now
	    this.headersAlreadySent()
	    return
	  }
	
	  debug('pipe "%s"', path)
	
	  // set header fields
	  this.setHeader(path, stat)
	
	  // set content-type
	  this.type(path)
	
	  // conditional GET support
	  if (this.isConditionalGET() && this.isCachable() && this.isFresh()) {
	    this.notModified()
	    return
	  }
	
	  // adjust len to start/end options
	  len = Math.max(0, len - offset)
	  if (options.end !== undefined) {
	    var bytes = options.end - offset + 1
	    if (len > bytes) len = bytes
	  }
	
	  // Range support
	  if (this._acceptRanges && BYTES_RANGE_REGEXP.test(ranges)) {
	    // parse
	    ranges = parseRange(len, ranges, {
	      combine: true
	    })
	
	    // If-Range support
	    if (!this.isRangeFresh()) {
	      debug('range stale')
	      ranges = -2
	    }
	
	    // unsatisfiable
	    if (ranges === -1) {
	      debug('range unsatisfiable')
	
	      // Content-Range
	      res.setHeader('Content-Range', contentRange('bytes', len))
	
	      // 416 Requested Range Not Satisfiable
	      return this.error(416, {
	        headers: {'Content-Range': res.getHeader('Content-Range')}
	      })
	    }
	
	    // valid (syntactically invalid/multiple ranges are treated as a regular response)
	    if (ranges !== -2 && ranges.length === 1) {
	      debug('range %j', ranges)
	
	      // Content-Range
	      res.statusCode = 206
	      res.setHeader('Content-Range', contentRange('bytes', len, ranges[0]))
	
	      // adjust for requested range
	      offset += ranges[0].start
	      len = ranges[0].end - ranges[0].start + 1
	    }
	  }
	
	  // clone options
	  for (var prop in options) {
	    opts[prop] = options[prop]
	  }
	
	  // set read options
	  opts.start = offset
	  opts.end = Math.max(offset, offset + len - 1)
	
	  // content-length
	  res.setHeader('Content-Length', len)
	
	  // HEAD support
	  if (req.method === 'HEAD') {
	    res.end()
	    return
	  }
	
	  this.stream(path, opts)
	}
	
	/**
	 * Transfer file for `path`.
	 *
	 * @param {String} path
	 * @api private
	 */
	SendStream.prototype.sendFile = function sendFile (path) {
	  var i = 0
	  var self = this
	
	  debug('stat "%s"', path)
	  fs.stat(path, function onstat (err, stat) {
	    if (err && err.code === 'ENOENT' && !extname(path) && path[path.length - 1] !== sep) {
	      // not found, check extensions
	      return next(err)
	    }
	    if (err) return self.onStatError(err)
	    if (stat.isDirectory()) return self.redirect(self.path)
	    self.emit('file', path, stat)
	    self.send(path, stat)
	  })
	
	  function next (err) {
	    if (self._extensions.length <= i) {
	      return err
	        ? self.onStatError(err)
	        : self.error(404)
	    }
	
	    var p = path + '.' + self._extensions[i++]
	
	    debug('stat "%s"', p)
	    fs.stat(p, function (err, stat) {
	      if (err) return next(err)
	      if (stat.isDirectory()) return next()
	      self.emit('file', p, stat)
	      self.send(p, stat)
	    })
	  }
	}
	
	/**
	 * Transfer index for `path`.
	 *
	 * @param {String} path
	 * @api private
	 */
	SendStream.prototype.sendIndex = function sendIndex (path) {
	  var i = -1
	  var self = this
	
	  function next (err) {
	    if (++i >= self._index.length) {
	      if (err) return self.onStatError(err)
	      return self.error(404)
	    }
	
	    var p = join(path, self._index[i])
	
	    debug('stat "%s"', p)
	    fs.stat(p, function (err, stat) {
	      if (err) return next(err)
	      if (stat.isDirectory()) return next()
	      self.emit('file', p, stat)
	      self.send(p, stat)
	    })
	  }
	
	  next()
	}
	
	/**
	 * Stream `path` to the response.
	 *
	 * @param {String} path
	 * @param {Object} options
	 * @api private
	 */
	
	SendStream.prototype.stream = function stream (path, options) {
	  // TODO: this is all lame, refactor meeee
	  var finished = false
	  var self = this
	  var res = this.res
	
	  // pipe
	  var stream = fs.createReadStream(path, options)
	  this.emit('stream', stream)
	  stream.pipe(res)
	
	  // response finished, done with the fd
	  onFinished(res, function onfinished () {
	    finished = true
	    destroy(stream)
	  })
	
	  // error handling code-smell
	  stream.on('error', function onerror (err) {
	    // request already finished
	    if (finished) return
	
	    // clean up stream
	    finished = true
	    destroy(stream)
	
	    // error
	    self.onStatError(err)
	  })
	
	  // end
	  stream.on('end', function onend () {
	    self.emit('end')
	  })
	}
	
	/**
	 * Set content-type based on `path`
	 * if it hasn't been explicitly set.
	 *
	 * @param {String} path
	 * @api private
	 */
	
	SendStream.prototype.type = function type (path) {
	  var res = this.res
	
	  if (res.getHeader('Content-Type')) return
	
	  var type = mime.lookup(path)
	
	  if (!type) {
	    debug('no content-type')
	    return
	  }
	
	  var charset = mime.charsets.lookup(type)
	
	  debug('content-type %s', type)
	  res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''))
	}
	
	/**
	 * Set response header fields, most
	 * fields may be pre-defined.
	 *
	 * @param {String} path
	 * @param {Object} stat
	 * @api private
	 */
	
	SendStream.prototype.setHeader = function setHeader (path, stat) {
	  var res = this.res
	
	  this.emit('headers', res, path, stat)
	
	  if (this._acceptRanges && !res.getHeader('Accept-Ranges')) {
	    debug('accept ranges')
	    res.setHeader('Accept-Ranges', 'bytes')
	  }
	
	  if (this._cacheControl && !res.getHeader('Cache-Control')) {
	    var cacheControl = 'public, max-age=' + Math.floor(this._maxage / 1000)
	    debug('cache-control %s', cacheControl)
	    res.setHeader('Cache-Control', cacheControl)
	  }
	
	  if (this._lastModified && !res.getHeader('Last-Modified')) {
	    var modified = stat.mtime.toUTCString()
	    debug('modified %s', modified)
	    res.setHeader('Last-Modified', modified)
	  }
	
	  if (this._etag && !res.getHeader('ETag')) {
	    var val = etag(stat)
	    debug('etag %s', val)
	    res.setHeader('ETag', val)
	  }
	}
	
	/**
	 * Clear all headers from a response.
	 *
	 * @param {object} res
	 * @private
	 */
	
	function clearHeaders (res) {
	  res._headers = {}
	  res._headerNames = {}
	}
	
	/**
	 * Collapse all leading slashes into a single slash
	 *
	 * @param {string} str
	 * @private
	 */
	function collapseLeadingSlashes (str) {
	  for (var i = 0; i < str.length; i++) {
	    if (str[i] !== '/') {
	      break
	    }
	  }
	
	  return i > 1
	    ? '/' + str.substr(i)
	    : str
	}
	
	/**
	 * Determine if path parts contain a dotfile.
	 *
	 * @api private
	 */
	
	function containsDotFile (parts) {
	  for (var i = 0; i < parts.length; i++) {
	    if (parts[i][0] === '.') {
	      return true
	    }
	  }
	
	  return false
	}
	
	/**
	 * Create a Content-Range header.
	 *
	 * @param {string} type
	 * @param {number} size
	 * @param {array} [range]
	 */
	
	function contentRange (type, size, range) {
	  return type + ' ' + (range ? range.start + '-' + range.end : '*') + '/' + size
	}
	
	/**
	 * decodeURIComponent.
	 *
	 * Allows V8 to only deoptimize this fn instead of all
	 * of send().
	 *
	 * @param {String} path
	 * @api private
	 */
	
	function decode (path) {
	  try {
	    return decodeURIComponent(path)
	  } catch (err) {
	    return -1
	  }
	}
	
	/**
	 * Normalize the index option into an array.
	 *
	 * @param {boolean|string|array} val
	 * @param {string} name
	 * @private
	 */
	
	function normalizeList (val, name) {
	  var list = [].concat(val || [])
	
	  for (var i = 0; i < list.length; i++) {
	    if (typeof list[i] !== 'string') {
	      throw new TypeError(name + ' must be array of strings or false')
	    }
	  }
	
	  return list
	}
	
	/**
	 * Set an object of headers on a response.
	 *
	 * @param {object} res
	 * @param {object} headers
	 * @private
	 */
	
	function setHeaders (res, headers) {
	  var keys = Object.keys(headers)
	
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i]
	    res.setHeader(key, headers[key])
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * http-errors
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2016 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var setPrototypeOf = __webpack_require__(59)
	var statuses = __webpack_require__(20)
	var inherits = __webpack_require__(60)
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = createError
	module.exports.HttpError = createHttpErrorConstructor()
	
	// Populate exports for all constructors
	populateConstructorExports(module.exports, statuses.codes, module.exports.HttpError)
	
	/**
	 * Create a new HTTP Error.
	 *
	 * @returns {Error}
	 * @public
	 */
	
	function createError () {
	  // so much arity going on ~_~
	  var err
	  var msg
	  var status = 500
	  var props = {}
	  for (var i = 0; i < arguments.length; i++) {
	    var arg = arguments[i]
	    if (arg instanceof Error) {
	      err = arg
	      status = err.status || err.statusCode || status
	      continue
	    }
	    switch (typeof arg) {
	      case 'string':
	        msg = arg
	        break
	      case 'number':
	        status = arg
	        break
	      case 'object':
	        props = arg
	        break
	    }
	  }
	
	  if (typeof status !== 'number' || !statuses[status]) {
	    status = 500
	  }
	
	  // constructor
	  var HttpError = createError[status]
	
	  if (!err) {
	    // create error
	    err = HttpError
	      ? new HttpError(msg)
	      : new Error(msg || statuses[status])
	    Error.captureStackTrace(err, createError)
	  }
	
	  if (!HttpError || !(err instanceof HttpError)) {
	    // add properties to generic error
	    err.expose = status < 500
	    err.status = err.statusCode = status
	  }
	
	  for (var key in props) {
	    if (key !== 'status' && key !== 'statusCode') {
	      err[key] = props[key]
	    }
	  }
	
	  return err
	}
	
	/**
	 * Create HTTP error abstract base class.
	 * @private
	 */
	
	function createHttpErrorConstructor () {
	  function HttpError () {
	    throw new TypeError('cannot construct abstract class')
	  }
	
	  inherits(HttpError, Error)
	
	  return HttpError
	}
	
	/**
	 * Create a constructor for a client error.
	 * @private
	 */
	
	function createClientErrorConstructor (HttpError, name, code) {
	  var className = name.match(/Error$/) ? name : name + 'Error'
	
	  function ClientError (message) {
	    // create the error object
	    var err = new Error(message != null ? message : statuses[code])
	
	    // capture a stack trace to the construction point
	    Error.captureStackTrace(err, ClientError)
	
	    // adjust the [[Prototype]]
	    setPrototypeOf(err, ClientError.prototype)
	
	    // redefine the error name
	    Object.defineProperty(err, 'name', {
	      enumerable: false,
	      configurable: true,
	      value: className,
	      writable: true
	    })
	
	    return err
	  }
	
	  inherits(ClientError, HttpError)
	
	  ClientError.prototype.status = code
	  ClientError.prototype.statusCode = code
	  ClientError.prototype.expose = true
	
	  return ClientError
	}
	
	/**
	 * Create a constructor for a server error.
	 * @private
	 */
	
	function createServerErrorConstructor (HttpError, name, code) {
	  var className = name.match(/Error$/) ? name : name + 'Error'
	
	  function ServerError (message) {
	    // create the error object
	    var err = new Error(message != null ? message : statuses[code])
	
	    // capture a stack trace to the construction point
	    Error.captureStackTrace(err, ServerError)
	
	    // adjust the [[Prototype]]
	    setPrototypeOf(err, ServerError.prototype)
	
	    // redefine the error name
	    Object.defineProperty(err, 'name', {
	      enumerable: false,
	      configurable: true,
	      value: className,
	      writable: true
	    })
	
	    return err
	  }
	
	  inherits(ServerError, HttpError)
	
	  ServerError.prototype.status = code
	  ServerError.prototype.statusCode = code
	  ServerError.prototype.expose = false
	
	  return ServerError
	}
	
	/**
	 * Populate the exports object with constructors for every error class.
	 * @private
	 */
	
	function populateConstructorExports (exports, codes, HttpError) {
	  codes.forEach(function forEachCode (code) {
	    var CodeError
	    var name = toIdentifier(statuses[code])
	
	    switch (String(code).charAt(0)) {
	      case '4':
	        CodeError = createClientErrorConstructor(HttpError, name, code)
	        break
	      case '5':
	        CodeError = createServerErrorConstructor(HttpError, name, code)
	        break
	    }
	
	    if (CodeError) {
	      // export the constructor
	      exports[code] = CodeError
	      exports[name] = CodeError
	    }
	  })
	
	  // backwards-compatibility
	  exports["I'mateapot"] = exports.ImATeapot
	}
	
	/**
	 * Convert a string of words to a JavaScript identifier.
	 * @private
	 */
	
	function toIdentifier (str) {
	  return str.split(' ').map(function (token) {
	    return token.slice(0, 1).toUpperCase() + token.slice(1)
	  }).join('').replace(/[^ _0-9a-z]/gi, '')
	}


/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = Object.setPrototypeOf || ({__proto__:[]} instanceof Array ? setProtoOf : mixinProperties);
	
	function setProtoOf(obj, proto) {
		obj.__proto__ = proto;
		return obj;
	}
	
	function mixinProperties(obj, proto) {
		for (var prop in proto) {
			obj[prop] = proto[prop];
		}
		return obj;
	}


/***/ },
/* 60 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(62);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(63);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * destroy
	 * Copyright(c) 2014 Jonathan Ong
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var ReadStream = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).ReadStream
	var Stream = __webpack_require__(65)
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = destroy
	
	/**
	 * Destroy a stream.
	 *
	 * @param {object} stream
	 * @public
	 */
	
	function destroy(stream) {
	  if (stream instanceof ReadStream) {
	    return destroyReadStream(stream)
	  }
	
	  if (!(stream instanceof Stream)) {
	    return stream
	  }
	
	  if (typeof stream.destroy === 'function') {
	    stream.destroy()
	  }
	
	  return stream
	}
	
	/**
	 * Destroy a ReadStream.
	 *
	 * @param {object} stream
	 * @private
	 */
	
	function destroyReadStream(stream) {
	  stream.destroy()
	
	  if (typeof stream.close === 'function') {
	    // node.js core bug work-around
	    stream.on('open', onOpenClose)
	  }
	
	  return stream
	}
	
	/**
	 * On open handler to close stream.
	 * @private
	 */
	
	function onOpenClose() {
	  if (typeof this.fd === 'number') {
	    // actually close down the fd
	    this.close()
	  }
	}


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	module.exports = Stream;
	
	var EE = __webpack_require__(3).EventEmitter;
	var inherits = __webpack_require__(60);
	
	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(66);
	Stream.Writable = __webpack_require__(79);
	Stream.Duplex = __webpack_require__(80);
	Stream.Transform = __webpack_require__(81);
	Stream.PassThrough = __webpack_require__(82);
	
	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;
	
	
	
	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.
	
	function Stream() {
	  EE.call(this);
	}
	
	Stream.prototype.pipe = function(dest, options) {
	  var source = this;
	
	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }
	
	  source.on('data', ondata);
	
	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }
	
	  dest.on('drain', ondrain);
	
	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }
	
	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    dest.end();
	  }
	
	
	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    if (typeof dest.destroy === 'function') dest.destroy();
	  }
	
	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }
	
	  source.on('error', onerror);
	  dest.on('error', onerror);
	
	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);
	
	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);
	
	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);
	
	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);
	
	    dest.removeListener('close', cleanup);
	  }
	
	  source.on('end', cleanup);
	  source.on('close', cleanup);
	
	  dest.on('close', cleanup);
	
	  dest.emit('pipe', source);
	
	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var Stream = (function (){
	  try {
	    return __webpack_require__(65); // hack to fix a circular dependency issue when used with browserify
	  } catch(_){}
	}());
	exports = module.exports = __webpack_require__(67);
	exports.Stream = Stream || exports;
	exports.Readable = exports;
	exports.Writable = __webpack_require__(74);
	exports.Duplex = __webpack_require__(73);
	exports.Transform = __webpack_require__(77);
	exports.PassThrough = __webpack_require__(78);
	
	if (!process.browser && process.env.READABLE_STREAM === 'disable' && Stream) {
	  module.exports = Stream;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	module.exports = Readable;
	
	/*<replacement>*/
	var processNextTick = __webpack_require__(68);
	/*</replacement>*/
	
	/*<replacement>*/
	var isArray = __webpack_require__(13);
	/*</replacement>*/
	
	/*<replacement>*/
	var Duplex;
	/*</replacement>*/
	
	Readable.ReadableState = ReadableState;
	
	/*<replacement>*/
	var EE = __webpack_require__(3).EventEmitter;
	
	var EElistenerCount = function (emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/
	
	/*<replacement>*/
	var Stream;
	(function () {
	  try {
	    Stream = __webpack_require__(65);
	  } catch (_) {} finally {
	    if (!Stream) Stream = __webpack_require__(3).EventEmitter;
	  }
	})();
	/*</replacement>*/
	
	var Buffer = __webpack_require__(10).Buffer;
	/*<replacement>*/
	var bufferShim = __webpack_require__(69);
	/*</replacement>*/
	
	/*<replacement>*/
	var util = __webpack_require__(70);
	util.inherits = __webpack_require__(60);
	/*</replacement>*/
	
	/*<replacement>*/
	var debugUtil = __webpack_require__(71);
	var debug = void 0;
	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/
	
	var BufferList = __webpack_require__(72);
	var StringDecoder;
	
	util.inherits(Readable, Stream);
	
	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') {
	    return emitter.prependListener(event, fn);
	  } else {
	    // This is a hack to make sure that our error handler is attached before any
	    // userland ones.  NEVER DO THIS. This is here only because this code needs
	    // to continue to work with older versions of Node.js that do not include
	    // the prependListener() method. The goal is to eventually remove this hack.
	    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	  }
	}
	
	function ReadableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(73);
	
	  options = options || {};
	
	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
	
	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
	
	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;
	
	  // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()
	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;
	
	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;
	
	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;
	
	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = __webpack_require__(76).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	
	function Readable(options) {
	  Duplex = Duplex || __webpack_require__(73);
	
	  if (!(this instanceof Readable)) return new Readable(options);
	
	  this._readableState = new ReadableState(options, this);
	
	  // legacy
	  this.readable = true;
	
	  if (options && typeof options.read === 'function') this._read = options.read;
	
	  Stream.call(this);
	}
	
	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;
	
	  if (!state.objectMode && typeof chunk === 'string') {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = bufferShim.from(chunk, encoding);
	      encoding = '';
	    }
	  }
	
	  return readableAddChunk(this, state, chunk, encoding, false);
	};
	
	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};
	
	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	};
	
	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var _e = new Error('stream.unshift() after end event');
	      stream.emit('error', _e);
	    } else {
	      var skipAdd;
	      if (state.decoder && !addToFront && !encoding) {
	        chunk = state.decoder.write(chunk);
	        skipAdd = !state.objectMode && chunk.length === 0;
	      }
	
	      if (!addToFront) state.reading = false;
	
	      // Don't add to the buffer if we've decoded to an empty string chunk and
	      // we're not in object mode
	      if (!skipAdd) {
	        // if we want the data now, just emit it.
	        if (state.flowing && state.length === 0 && !state.sync) {
	          stream.emit('data', chunk);
	          stream.read(0);
	        } else {
	          // update the buffer info.
	          state.length += state.objectMode ? 1 : chunk.length;
	          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
	
	          if (state.needReadable) emitReadable(stream);
	        }
	      }
	
	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }
	
	  return needMoreData(state);
	}
	
	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}
	
	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = __webpack_require__(76).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};
	
	// Don't raise the hwm > 8MB
	var MAX_HWM = 0x800000;
	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }
	  return n;
	}
	
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;
	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  }
	  // If we're asking for more than the current hwm, then raise the hwm.
	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n;
	  // Don't have enough
	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }
	  return state.length;
	}
	
	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;
	
	  if (n !== 0) state.emittedReadable = false;
	
	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }
	
	  n = howMuchToRead(n, state);
	
	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }
	
	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.
	
	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);
	
	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }
	
	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	    // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.
	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }
	
	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;
	
	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  } else {
	    state.length -= n;
	  }
	
	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true;
	
	    // If we tried to read() past the EOF, then emit end on the next tick.
	    if (nOrig !== n && state.ended) endReadable(this);
	  }
	
	  if (ret !== null) this.emit('data', ret);
	
	  return ret;
	};
	
	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}
	
	function onEofChunk(stream, state) {
	  if (state.ended) return;
	  if (state.decoder) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;
	
	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}
	
	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
	  }
	}
	
	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}
	
	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    processNextTick(maybeReadMore_, stream, state);
	  }
	}
	
	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }
	  state.readingMore = false;
	}
	
	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  this.emit('error', new Error('_read() is not implemented'));
	};
	
	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;
	
	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
	
	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);
	
	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }
	
	  function onend() {
	    debug('onend');
	    dest.end();
	  }
	
	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	
	  var cleanedUp = false;
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);
	
	    cleanedUp = true;
	
	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }
	
	  // If the user pushes more data while we're writing to dest then we'll end up
	  // in ondata again. However, we only want to increase awaitDrain once because
	  // dest will only emit one 'drain' event for the multiple writes.
	  // => Introduce a guard on increasing awaitDrain.
	  var increasedAwaitDrain = false;
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    increasedAwaitDrain = false;
	    var ret = dest.write(chunk);
	    if (false === ret && !increasedAwaitDrain) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', src._readableState.awaitDrain);
	        src._readableState.awaitDrain++;
	        increasedAwaitDrain = true;
	      }
	      src.pause();
	    }
	  }
	
	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
	  }
	
	  // Make sure our error handler is attached before userland ones.
	  prependListener(dest, 'error', onerror);
	
	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);
	
	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }
	
	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);
	
	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }
	
	  return dest;
	};
	
	function pipeOnDrain(src) {
	  return function () {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}
	
	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;
	
	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;
	
	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;
	
	    if (!dest) dest = state.pipes;
	
	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this);
	    return this;
	  }
	
	  // slow case. multiple pipe destinations.
	
	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	
	    for (var i = 0; i < len; i++) {
	      dests[i].emit('unpipe', this);
	    }return this;
	  }
	
	  // try to find the right one.
	  var index = indexOf(state.pipes, dest);
	  if (index === -1) return this;
	
	  state.pipes.splice(index, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];
	
	  dest.emit('unpipe', this);
	
	  return this;
	};
	
	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	
	  if (ev === 'data') {
	    // Start flowing on next tick if stream isn't explicitly paused
	    if (this._readableState.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    var state = this._readableState;
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.emittedReadable = false;
	      if (!state.reading) {
	        processNextTick(nReadingNextTick, this);
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }
	
	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	
	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	}
	
	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    resume(this, state);
	  }
	  return this;
	};
	
	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    processNextTick(resume_, stream, state);
	  }
	}
	
	function resume_(stream, state) {
	  if (!state.reading) {
	    debug('resume read 0');
	    stream.read(0);
	  }
	
	  state.resumeScheduled = false;
	  state.awaitDrain = 0;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}
	
	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};
	
	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  while (state.flowing && stream.read() !== null) {}
	}
	
	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var state = this._readableState;
	  var paused = false;
	
	  var self = this;
	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) self.push(chunk);
	    }
	
	    self.push(null);
	  });
	
	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);
	
	    // don't skip over falsy values in objectMode
	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;
	
	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });
	
	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }
	
	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function (ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });
	
	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };
	
	  return self;
	};
	
	// exposed for testing purposes only.
	Readable._fromList = fromList;
	
	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;
	
	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = fromListPartial(n, state.buffer, state.decoder);
	  }
	
	  return ret;
	}
	
	// Extracts only enough buffered data to satisfy the amount requested.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromListPartial(n, list, hasStrings) {
	  var ret;
	  if (n < list.head.data.length) {
	    // slice is the same for buffers and strings
	    ret = list.head.data.slice(0, n);
	    list.head.data = list.head.data.slice(n);
	  } else if (n === list.head.data.length) {
	    // first chunk is a perfect match
	    ret = list.shift();
	  } else {
	    // result spans more than one buffer
	    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
	  }
	  return ret;
	}
	
	// Copies a specified amount of characters from the list of buffered data
	// chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBufferString(n, list) {
	  var p = list.head;
	  var c = 1;
	  var ret = p.data;
	  n -= ret.length;
	  while (p = p.next) {
	    var str = p.data;
	    var nb = n > str.length ? str.length : n;
	    if (nb === str.length) ret += str;else ret += str.slice(0, n);
	    n -= nb;
	    if (n === 0) {
	      if (nb === str.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = str.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}
	
	// Copies a specified amount of bytes from the list of buffered data chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBuffer(n, list) {
	  var ret = bufferShim.allocUnsafe(n);
	  var p = list.head;
	  var c = 1;
	  p.data.copy(ret);
	  n -= p.data.length;
	  while (p = p.next) {
	    var buf = p.data;
	    var nb = n > buf.length ? buf.length : n;
	    buf.copy(ret, ret.length - n, 0, nb);
	    n -= nb;
	    if (n === 0) {
	      if (nb === buf.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = buf.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}
	
	function endReadable(stream) {
	  var state = stream._readableState;
	
	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
	
	  if (!state.endEmitted) {
	    state.ended = true;
	    processNextTick(endReadableNT, state, stream);
	  }
	}
	
	function endReadableNT(state, stream) {
	  // Check that we didn't get one last unshift.
	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');
	  }
	}
	
	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	
	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	if (!process.version ||
	    process.version.indexOf('v0.') === 0 ||
	    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
	  module.exports = nextTick;
	} else {
	  module.exports = process.nextTick;
	}
	
	function nextTick(fn, arg1, arg2, arg3) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('"callback" argument must be a function');
	  }
	  var len = arguments.length;
	  var args, i;
	  switch (len) {
	  case 0:
	  case 1:
	    return process.nextTick(fn);
	  case 2:
	    return process.nextTick(function afterTickOne() {
	      fn.call(null, arg1);
	    });
	  case 3:
	    return process.nextTick(function afterTickTwo() {
	      fn.call(null, arg1, arg2);
	    });
	  case 4:
	    return process.nextTick(function afterTickThree() {
	      fn.call(null, arg1, arg2, arg3);
	    });
	  default:
	    args = new Array(len - 1);
	    i = 0;
	    while (i < args.length) {
	      args[i++] = arguments[i];
	    }
	    return process.nextTick(function afterTick() {
	      fn.apply(null, args);
	    });
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var buffer = __webpack_require__(10);
	var Buffer = buffer.Buffer;
	var SlowBuffer = buffer.SlowBuffer;
	var MAX_LEN = buffer.kMaxLength || 2147483647;
	exports.alloc = function alloc(size, fill, encoding) {
	  if (typeof Buffer.alloc === 'function') {
	    return Buffer.alloc(size, fill, encoding);
	  }
	  if (typeof encoding === 'number') {
	    throw new TypeError('encoding must not be number');
	  }
	  if (typeof size !== 'number') {
	    throw new TypeError('size must be a number');
	  }
	  if (size > MAX_LEN) {
	    throw new RangeError('size is too large');
	  }
	  var enc = encoding;
	  var _fill = fill;
	  if (_fill === undefined) {
	    enc = undefined;
	    _fill = 0;
	  }
	  var buf = new Buffer(size);
	  if (typeof _fill === 'string') {
	    var fillBuf = new Buffer(_fill, enc);
	    var flen = fillBuf.length;
	    var i = -1;
	    while (++i < size) {
	      buf[i] = fillBuf[i % flen];
	    }
	  } else {
	    buf.fill(_fill);
	  }
	  return buf;
	}
	exports.allocUnsafe = function allocUnsafe(size) {
	  if (typeof Buffer.allocUnsafe === 'function') {
	    return Buffer.allocUnsafe(size);
	  }
	  if (typeof size !== 'number') {
	    throw new TypeError('size must be a number');
	  }
	  if (size > MAX_LEN) {
	    throw new RangeError('size is too large');
	  }
	  return new Buffer(size);
	}
	exports.from = function from(value, encodingOrOffset, length) {
	  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
	    return Buffer.from(value, encodingOrOffset, length);
	  }
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number');
	  }
	  if (typeof value === 'string') {
	    return new Buffer(value, encodingOrOffset);
	  }
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    var offset = encodingOrOffset;
	    if (arguments.length === 1) {
	      return new Buffer(value);
	    }
	    if (typeof offset === 'undefined') {
	      offset = 0;
	    }
	    var len = length;
	    if (typeof len === 'undefined') {
	      len = value.byteLength - offset;
	    }
	    if (offset >= value.byteLength) {
	      throw new RangeError('\'offset\' is out of bounds');
	    }
	    if (len > value.byteLength - offset) {
	      throw new RangeError('\'length\' is out of bounds');
	    }
	    return new Buffer(value.slice(offset, offset + len));
	  }
	  if (Buffer.isBuffer(value)) {
	    var out = new Buffer(value.length);
	    value.copy(out, 0, 0, value.length);
	    return out;
	  }
	  if (value) {
	    if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer) || 'length' in value) {
	      return new Buffer(value);
	    }
	    if (value.type === 'Buffer' && Array.isArray(value.data)) {
	      return new Buffer(value.data);
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
	}
	exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
	  if (typeof Buffer.allocUnsafeSlow === 'function') {
	    return Buffer.allocUnsafeSlow(size);
	  }
	  if (typeof size !== 'number') {
	    throw new TypeError('size must be a number');
	  }
	  if (size >= MAX_LEN) {
	    throw new RangeError('size is too large');
	  }
	  return new SlowBuffer(size);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	
	function isArray(arg) {
	  if (Array.isArray) {
	    return Array.isArray(arg);
	  }
	  return objectToString(arg) === '[object Array]';
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = Buffer.isBuffer;
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 71 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Buffer = __webpack_require__(10).Buffer;
	/*<replacement>*/
	var bufferShim = __webpack_require__(69);
	/*</replacement>*/
	
	module.exports = BufferList;
	
	function BufferList() {
	  this.head = null;
	  this.tail = null;
	  this.length = 0;
	}
	
	BufferList.prototype.push = function (v) {
	  var entry = { data: v, next: null };
	  if (this.length > 0) this.tail.next = entry;else this.head = entry;
	  this.tail = entry;
	  ++this.length;
	};
	
	BufferList.prototype.unshift = function (v) {
	  var entry = { data: v, next: this.head };
	  if (this.length === 0) this.tail = entry;
	  this.head = entry;
	  ++this.length;
	};
	
	BufferList.prototype.shift = function () {
	  if (this.length === 0) return;
	  var ret = this.head.data;
	  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	  --this.length;
	  return ret;
	};
	
	BufferList.prototype.clear = function () {
	  this.head = this.tail = null;
	  this.length = 0;
	};
	
	BufferList.prototype.join = function (s) {
	  if (this.length === 0) return '';
	  var p = this.head;
	  var ret = '' + p.data;
	  while (p = p.next) {
	    ret += s + p.data;
	  }return ret;
	};
	
	BufferList.prototype.concat = function (n) {
	  if (this.length === 0) return bufferShim.alloc(0);
	  if (this.length === 1) return this.head.data;
	  var ret = bufferShim.allocUnsafe(n >>> 0);
	  var p = this.head;
	  var i = 0;
	  while (p) {
	    p.data.copy(ret, i);
	    i += p.data.length;
	    p = p.next;
	  }
	  return ret;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.
	
	'use strict';
	
	/*<replacement>*/
	
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    keys.push(key);
	  }return keys;
	};
	/*</replacement>*/
	
	module.exports = Duplex;
	
	/*<replacement>*/
	var processNextTick = __webpack_require__(68);
	/*</replacement>*/
	
	/*<replacement>*/
	var util = __webpack_require__(70);
	util.inherits = __webpack_require__(60);
	/*</replacement>*/
	
	var Readable = __webpack_require__(67);
	var Writable = __webpack_require__(74);
	
	util.inherits(Duplex, Readable);
	
	var keys = objectKeys(Writable.prototype);
	for (var v = 0; v < keys.length; v++) {
	  var method = keys[v];
	  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}
	
	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);
	
	  Readable.call(this, options);
	  Writable.call(this, options);
	
	  if (options && options.readable === false) this.readable = false;
	
	  if (options && options.writable === false) this.writable = false;
	
	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
	
	  this.once('end', onend);
	}
	
	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return;
	
	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  processNextTick(onEndNT, this);
	}
	
	function onEndNT(self) {
	  self.end();
	}
	
	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// A bit simpler than readable streams.
	// Implement an async ._write(chunk, encoding, cb), and it'll handle all
	// the drain event emission and buffering.
	
	'use strict';
	
	module.exports = Writable;
	
	/*<replacement>*/
	var processNextTick = __webpack_require__(68);
	/*</replacement>*/
	
	/*<replacement>*/
	var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
	/*</replacement>*/
	
	/*<replacement>*/
	var Duplex;
	/*</replacement>*/
	
	Writable.WritableState = WritableState;
	
	/*<replacement>*/
	var util = __webpack_require__(70);
	util.inherits = __webpack_require__(60);
	/*</replacement>*/
	
	/*<replacement>*/
	var internalUtil = {
	  deprecate: __webpack_require__(75)
	};
	/*</replacement>*/
	
	/*<replacement>*/
	var Stream;
	(function () {
	  try {
	    Stream = __webpack_require__(65);
	  } catch (_) {} finally {
	    if (!Stream) Stream = __webpack_require__(3).EventEmitter;
	  }
	})();
	/*</replacement>*/
	
	var Buffer = __webpack_require__(10).Buffer;
	/*<replacement>*/
	var bufferShim = __webpack_require__(69);
	/*</replacement>*/
	
	util.inherits(Writable, Stream);
	
	function nop() {}
	
	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	  this.next = null;
	}
	
	function WritableState(options, stream) {
	  Duplex = Duplex || __webpack_require__(73);
	
	  options = options || {};
	
	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
	
	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
	
	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;
	
	  // drain event flag.
	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;
	
	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;
	
	  // a flag to see when we're in the middle of a write.
	  this.writing = false;
	
	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;
	
	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };
	
	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;
	
	  // the amount that is being written when _write is called.
	  this.writelen = 0;
	
	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null;
	
	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;
	
	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;
	
	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	
	  // count buffered requests
	  this.bufferedRequestCount = 0;
	
	  // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two
	  this.corkedRequestsFree = new CorkedRequest(this);
	}
	
	WritableState.prototype.getBuffer = function getBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];
	  while (current) {
	    out.push(current);
	    current = current.next;
	  }
	  return out;
	};
	
	(function () {
	  try {
	    Object.defineProperty(WritableState.prototype, 'buffer', {
	      get: internalUtil.deprecate(function () {
	        return this.getBuffer();
	      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
	    });
	  } catch (_) {}
	})();
	
	// Test _writableState for inheritance to account for Duplex streams,
	// whose prototype chain only points to Readable.
	var realHasInstance;
	if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
	  realHasInstance = Function.prototype[Symbol.hasInstance];
	  Object.defineProperty(Writable, Symbol.hasInstance, {
	    value: function (object) {
	      if (realHasInstance.call(this, object)) return true;
	
	      return object && object._writableState instanceof WritableState;
	    }
	  });
	} else {
	  realHasInstance = function (object) {
	    return object instanceof this;
	  };
	}
	
	function Writable(options) {
	  Duplex = Duplex || __webpack_require__(73);
	
	  // Writable ctor is applied to Duplexes, too.
	  // `realHasInstance` is necessary because using plain `instanceof`
	  // would return false, as no `_writableState` property is attached.
	
	  // Trying to use the custom `instanceof` for Writable here will also break the
	  // Node.js LazyTransform implementation, which has a non-trivial getter for
	  // `_writableState` that would lead to infinite recursion.
	  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
	    return new Writable(options);
	  }
	
	  this._writableState = new WritableState(options, this);
	
	  // legacy.
	  this.writable = true;
	
	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;
	
	    if (typeof options.writev === 'function') this._writev = options.writev;
	  }
	
	  Stream.call(this);
	}
	
	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe, not readable'));
	};
	
	function writeAfterEnd(stream, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  processNextTick(cb, er);
	}
	
	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  var er = false;
	  // Always throw error if a null is written
	  // if we are not in object mode then throw
	  // if it is not a buffer, string, or undefined.
	  if (chunk === null) {
	    er = new TypeError('May not write null values to stream');
	  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  if (er) {
	    stream.emit('error', er);
	    processNextTick(cb, er);
	    valid = false;
	  }
	  return valid;
	}
	
	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;
	
	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
	
	  if (typeof cb !== 'function') cb = nop;
	
	  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }
	
	  return ret;
	};
	
	Writable.prototype.cork = function () {
	  var state = this._writableState;
	
	  state.corked++;
	};
	
	Writable.prototype.uncork = function () {
	  var state = this._writableState;
	
	  if (state.corked) {
	    state.corked--;
	
	    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};
	
	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};
	
	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = bufferShim.from(chunk, encoding);
	  }
	  return chunk;
	}
	
	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	
	  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;
	
	  state.length += len;
	
	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;
	
	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }
	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }
	
	  return ret;
	}
	
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}
	
	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;
	  if (sync) processNextTick(cb, er);else cb(er);
	
	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}
	
	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}
	
	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	
	  onwriteStateUpdate(state);
	
	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state);
	
	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }
	
	    if (sync) {
	      /*<replacement>*/
	      asyncWrite(afterWrite, stream, state, finished, cb);
	      /*</replacement>*/
	    } else {
	        afterWrite(stream, state, finished, cb);
	      }
	  }
	}
	
	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}
	
	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}
	
	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;
	
	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;
	
	    var count = 0;
	    while (entry) {
	      buffer[count] = entry;
	      entry = entry.next;
	      count += 1;
	    }
	
	    doWrite(stream, state, true, state.length, buffer, '', holder.finish);
	
	    // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite
	    state.pendingcb++;
	    state.lastBufferedRequest = null;
	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        break;
	      }
	    }
	
	    if (entry === null) state.lastBufferedRequest = null;
	  }
	
	  state.bufferedRequestCount = 0;
	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}
	
	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new Error('_write() is not implemented'));
	};
	
	Writable.prototype._writev = null;
	
	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;
	
	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);
	
	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }
	
	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished) endWritable(this, state, cb);
	};
	
	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}
	
	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}
	
	function finishMaybe(stream, state) {
	  var need = needFinish(state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else {
	      prefinish(stream, state);
	    }
	  }
	  return need;
	}
	
	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	  stream.writable = false;
	}
	
	// It seems a linked list but it is not
	// there will be only 2 of these for each stream
	function CorkedRequest(state) {
	  var _this = this;
	
	  this.next = null;
	  this.entry = null;
	
	  this.finish = function (err) {
	    var entry = _this.entry;
	    _this.entry = null;
	    while (entry) {
	      var cb = entry.callback;
	      state.pendingcb--;
	      cb(err);
	      entry = entry.next;
	    }
	    if (state.corkedRequestsFree) {
	      state.corkedRequestsFree.next = _this;
	    } else {
	      state.corkedRequestsFree = _this;
	    }
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(8).setImmediate))

/***/ },
/* 75 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module exports.
	 */
	
	module.exports = deprecate;
	
	/**
	 * Mark that a method should not be used.
	 * Returns a modified function which warns once by default.
	 *
	 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
	 *
	 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
	 * will throw an Error when invoked.
	 *
	 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
	 * will invoke `console.trace()` instead of `console.error()`.
	 *
	 * @param {Function} fn - the function to deprecate
	 * @param {String} msg - the string to print to the console when `fn` is invoked
	 * @returns {Function} a new "deprecated" version of `fn`
	 * @api public
	 */
	
	function deprecate (fn, msg) {
	  if (config('noDeprecation')) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (config('throwDeprecation')) {
	        throw new Error(msg);
	      } else if (config('traceDeprecation')) {
	        console.trace(msg);
	      } else {
	        console.warn(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	}
	
	/**
	 * Checks `localStorage` for boolean values for the given `name`.
	 *
	 * @param {String} name
	 * @returns {Boolean}
	 * @api private
	 */
	
	function config (name) {
	  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
	  try {
	    if (!global.localStorage) return false;
	  } catch (_) {
	    return false;
	  }
	  var val = global.localStorage[name];
	  if (null == val) return false;
	  return String(val).toLowerCase() === 'true';
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var Buffer = __webpack_require__(10).Buffer;
	
	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }
	
	
	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}
	
	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }
	
	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};
	
	
	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;
	
	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;
	
	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }
	
	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);
	
	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
	
	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;
	
	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }
	
	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);
	
	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }
	
	  charStr += buffer.toString(this.encoding, 0, end);
	
	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }
	
	  // or just emit the charStr
	  return charStr;
	};
	
	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;
	
	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];
	
	    // See http://en.wikipedia.org/wiki/UTF-8#Description
	
	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }
	
	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }
	
	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};
	
	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);
	
	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }
	
	  return res;
	};
	
	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}
	
	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}
	
	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.
	
	'use strict';
	
	module.exports = Transform;
	
	var Duplex = __webpack_require__(73);
	
	/*<replacement>*/
	var util = __webpack_require__(70);
	util.inherits = __webpack_require__(60);
	/*</replacement>*/
	
	util.inherits(Transform, Duplex);
	
	function TransformState(stream) {
	  this.afterTransform = function (er, data) {
	    return afterTransform(stream, er, data);
	  };
	
	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	  this.writeencoding = null;
	}
	
	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;
	
	  var cb = ts.writecb;
	
	  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));
	
	  ts.writechunk = null;
	  ts.writecb = null;
	
	  if (data !== null && data !== undefined) stream.push(data);
	
	  cb(er);
	
	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}
	
	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);
	
	  Duplex.call(this, options);
	
	  this._transformState = new TransformState(this);
	
	  var stream = this;
	
	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;
	
	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;
	
	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;
	
	    if (typeof options.flush === 'function') this._flush = options.flush;
	  }
	
	  // When the writable side finishes, then flush out anything remaining.
	  this.once('prefinish', function () {
	    if (typeof this._flush === 'function') this._flush(function (er, data) {
	      done(stream, er, data);
	    });else done(stream);
	  });
	}
	
	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};
	
	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function (chunk, encoding, cb) {
	  throw new Error('_transform() is not implemented');
	};
	
	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	};
	
	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function (n) {
	  var ts = this._transformState;
	
	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};
	
	function done(stream, er, data) {
	  if (er) return stream.emit('error', er);
	
	  if (data !== null && data !== undefined) stream.push(data);
	
	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;
	
	  if (ws.length) throw new Error('Calling transform done when ws.length != 0');
	
	  if (ts.transforming) throw new Error('Calling transform done when still transforming');
	
	  return stream.push(null);
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.
	
	'use strict';
	
	module.exports = PassThrough;
	
	var Transform = __webpack_require__(77);
	
	/*<replacement>*/
	var util = __webpack_require__(70);
	util.inherits = __webpack_require__(60);
	/*</replacement>*/
	
	util.inherits(PassThrough, Transform);
	
	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);
	
	  Transform.call(this, options);
	}
	
	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(74)


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(73)


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(77)


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(78)


/***/ },
/* 83 */
/***/ function(module, exports) {

	/*!
	 * encodeurl
	 * Copyright(c) 2016 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = encodeUrl
	
	/**
	 * RegExp to match non-URL code points, *after* encoding (i.e. not including "%")
	 * and including invalid escape sequences.
	 * @private
	 */
	
	var ENCODE_CHARS_REGEXP = /(?:[^\x21\x25\x26-\x3B\x3D\x3F-\x5B\x5D\x5F\x61-\x7A\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]))+/g
	
	/**
	 * RegExp to match unmatched surrogate pair.
	 * @private
	 */
	
	var UNMATCHED_SURROGATE_PAIR_REGEXP = /(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g
	
	/**
	 * String to replace unmatched surrogate pair with.
	 * @private
	 */
	
	var UNMATCHED_SURROGATE_PAIR_REPLACE = '$1\uFFFD$2'
	
	/**
	 * Encode a URL to a percent-encoded form, excluding already-encoded sequences.
	 *
	 * This function will take an already-encoded URL and encode all the non-URL
	 * code points. This function will not encode the "%" character unless it is
	 * not part of a valid sequence (`%20` will be left as-is, but `%foo` will
	 * be encoded as `%25foo`).
	 *
	 * This encode is meant to be "safe" and does not throw errors. It will try as
	 * hard as it can to properly encode the given URL, including replacing any raw,
	 * unpaired surrogate pairs with the Unicode replacement character prior to
	 * encoding.
	 *
	 * @param {string} url
	 * @return {string}
	 * @public
	 */
	
	function encodeUrl (url) {
	  return String(url)
	    .replace(UNMATCHED_SURROGATE_PAIR_REGEXP, UNMATCHED_SURROGATE_PAIR_REPLACE)
	    .replace(ENCODE_CHARS_REGEXP, encodeURI)
	}


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * etag
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = etag
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var crypto = __webpack_require__(85)
	var Stats = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Stats
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var base64PadCharRegExp = /=+$/
	var toString = Object.prototype.toString
	
	/**
	 * Generate an entity tag.
	 *
	 * @param {Buffer|string} entity
	 * @return {string}
	 * @private
	 */
	
	function entitytag(entity) {
	  if (entity.length === 0) {
	    // fast-path empty
	    return '"0-1B2M2Y8AsgTpgAmY7PhCfg"'
	  }
	
	  // compute hash of entity
	  var hash = crypto
	    .createHash('md5')
	    .update(entity, 'utf8')
	    .digest('base64')
	    .replace(base64PadCharRegExp, '')
	
	  // compute length of entity
	  var len = typeof entity === 'string'
	    ? Buffer.byteLength(entity, 'utf8')
	    : entity.length
	
	  return '"' + len.toString(16) + '-' + hash + '"'
	}
	
	/**
	 * Create a simple ETag.
	 *
	 * @param {string|Buffer|Stats} entity
	 * @param {object} [options]
	 * @param {boolean} [options.weak]
	 * @return {String}
	 * @public
	 */
	
	function etag(entity, options) {
	  if (entity == null) {
	    throw new TypeError('argument entity is required')
	  }
	
	  // support fs.Stats object
	  var isStats = isstats(entity)
	  var weak = options && typeof options.weak === 'boolean'
	    ? options.weak
	    : isStats
	
	  // validate argument
	  if (!isStats && typeof entity !== 'string' && !Buffer.isBuffer(entity)) {
	    throw new TypeError('argument entity must be string, Buffer, or fs.Stats')
	  }
	
	  // generate entity tag
	  var tag = isStats
	    ? stattag(entity)
	    : entitytag(entity)
	
	  return weak
	    ? 'W/' + tag
	    : tag
	}
	
	/**
	 * Determine if object is a Stats object.
	 *
	 * @param {object} obj
	 * @return {boolean}
	 * @api private
	 */
	
	function isstats(obj) {
	  // genuine fs.Stats
	  if (typeof Stats === 'function' && obj instanceof Stats) {
	    return true
	  }
	
	  // quack quack
	  return obj && typeof obj === 'object'
	    && 'ctime' in obj && toString.call(obj.ctime) === '[object Date]'
	    && 'mtime' in obj && toString.call(obj.mtime) === '[object Date]'
	    && 'ino' in obj && typeof obj.ino === 'number'
	    && 'size' in obj && typeof obj.size === 'number'
	}
	
	/**
	 * Generate a tag for a stat.
	 *
	 * @param {object} stat
	 * @return {string}
	 * @private
	 */
	
	function stattag(stat) {
	  var mtime = stat.mtime.getTime().toString(16)
	  var size = stat.size.toString(16)
	
	  return '"' + size + '-' + mtime + '"'
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var rng = __webpack_require__(86)
	
	function error () {
	  var m = [].slice.call(arguments).join(' ')
	  throw new Error([
	    m,
	    'we accept pull requests',
	    'http://github.com/dominictarr/crypto-browserify'
	    ].join('\n'))
	}
	
	exports.createHash = __webpack_require__(88)
	
	exports.createHmac = __webpack_require__(97)
	
	exports.randomBytes = function(size, callback) {
	  if (callback && callback.call) {
	    try {
	      callback.call(this, undefined, new Buffer(rng(size)))
	    } catch (err) { callback(err) }
	  } else {
	    return new Buffer(rng(size))
	  }
	}
	
	function each(a, f) {
	  for(var i in a)
	    f(a[i], i)
	}
	
	exports.getHashes = function () {
	  return ['sha1', 'sha256', 'sha512', 'md5', 'rmd160']
	}
	
	var p = __webpack_require__(98)(exports)
	exports.pbkdf2 = p.pbkdf2
	exports.pbkdf2Sync = p.pbkdf2Sync
	__webpack_require__(100)(exports, module.exports);
	
	// the least I can do is make error messages for the rest of the node.js/crypto api.
	each(['createCredentials'
	, 'createSign'
	, 'createVerify'
	, 'createDiffieHellman'
	], function (name) {
	  exports[name] = function () {
	    error('sorry,', name, 'is not implemented yet')
	  }
	})
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function() {
	  var g = ('undefined' === typeof window ? global : window) || {}
	  _crypto = (
	    g.crypto || g.msCrypto || __webpack_require__(87)
	  )
	  module.exports = function(size) {
	    // Modern Browsers
	    if(_crypto.getRandomValues) {
	      var bytes = new Buffer(size); //in browserify, this is an extended Uint8Array
	      /* This will not work in older browsers.
	       * See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
	       */
	    
	      _crypto.getRandomValues(bytes);
	      return bytes;
	    }
	    else if (_crypto.randomBytes) {
	      return _crypto.randomBytes(size)
	    }
	    else
	      throw new Error(
	        'secure random number generation not supported by this browser\n'+
	        'use chrome, FireFox or Internet Explorer 11'
	      )
	  }
	}())
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(10).Buffer))

/***/ },
/* 87 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(89)
	
	var md5 = toConstructor(__webpack_require__(94))
	var rmd160 = toConstructor(__webpack_require__(96))
	
	function toConstructor (fn) {
	  return function () {
	    var buffers = []
	    var m= {
	      update: function (data, enc) {
	        if(!Buffer.isBuffer(data)) data = new Buffer(data, enc)
	        buffers.push(data)
	        return this
	      },
	      digest: function (enc) {
	        var buf = Buffer.concat(buffers)
	        var r = fn(buf)
	        buffers = null
	        return enc ? r.toString(enc) : r
	      }
	    }
	    return m
	  }
	}
	
	module.exports = function (alg) {
	  if('md5' === alg) return new md5()
	  if('rmd160' === alg) return new rmd160()
	  return createHash(alg)
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var exports = module.exports = function (alg) {
	  var Alg = exports[alg]
	  if(!Alg) throw new Error(alg + ' is not supported (we accept pull requests)')
	  return new Alg()
	}
	
	var Buffer = __webpack_require__(10).Buffer
	var Hash   = __webpack_require__(90)(Buffer)
	
	exports.sha1 = __webpack_require__(91)(Buffer, Hash)
	exports.sha256 = __webpack_require__(92)(Buffer, Hash)
	exports.sha512 = __webpack_require__(93)(Buffer, Hash)


/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = function (Buffer) {
	
	  //prototype class for hash functions
	  function Hash (blockSize, finalSize) {
	    this._block = new Buffer(blockSize) //new Uint32Array(blockSize/4)
	    this._finalSize = finalSize
	    this._blockSize = blockSize
	    this._len = 0
	    this._s = 0
	  }
	
	  Hash.prototype.init = function () {
	    this._s = 0
	    this._len = 0
	  }
	
	  Hash.prototype.update = function (data, enc) {
	    if ("string" === typeof data) {
	      enc = enc || "utf8"
	      data = new Buffer(data, enc)
	    }
	
	    var l = this._len += data.length
	    var s = this._s = (this._s || 0)
	    var f = 0
	    var buffer = this._block
	
	    while (s < l) {
	      var t = Math.min(data.length, f + this._blockSize - (s % this._blockSize))
	      var ch = (t - f)
	
	      for (var i = 0; i < ch; i++) {
	        buffer[(s % this._blockSize) + i] = data[i + f]
	      }
	
	      s += ch
	      f += ch
	
	      if ((s % this._blockSize) === 0) {
	        this._update(buffer)
	      }
	    }
	    this._s = s
	
	    return this
	  }
	
	  Hash.prototype.digest = function (enc) {
	    // Suppose the length of the message M, in bits, is l
	    var l = this._len * 8
	
	    // Append the bit 1 to the end of the message
	    this._block[this._len % this._blockSize] = 0x80
	
	    // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
	    this._block.fill(0, this._len % this._blockSize + 1)
	
	    if (l % (this._blockSize * 8) >= this._finalSize * 8) {
	      this._update(this._block)
	      this._block.fill(0)
	    }
	
	    // to this append the block which is equal to the number l written in binary
	    // TODO: handle case where l is > Math.pow(2, 29)
	    this._block.writeInt32BE(l, this._blockSize - 4)
	
	    var hash = this._update(this._block) || this._hash()
	
	    return enc ? hash.toString(enc) : hash
	  }
	
	  Hash.prototype._update = function () {
	    throw new Error('_update must be implemented by subclass')
	  }
	
	  return Hash
	}


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
	 * in FIPS PUB 180-1
	 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for details.
	 */
	
	var inherits = __webpack_require__(51).inherits
	
	module.exports = function (Buffer, Hash) {
	
	  var A = 0|0
	  var B = 4|0
	  var C = 8|0
	  var D = 12|0
	  var E = 16|0
	
	  var W = new (typeof Int32Array === 'undefined' ? Array : Int32Array)(80)
	
	  var POOL = []
	
	  function Sha1 () {
	    if(POOL.length)
	      return POOL.pop().init()
	
	    if(!(this instanceof Sha1)) return new Sha1()
	    this._w = W
	    Hash.call(this, 16*4, 14*4)
	
	    this._h = null
	    this.init()
	  }
	
	  inherits(Sha1, Hash)
	
	  Sha1.prototype.init = function () {
	    this._a = 0x67452301
	    this._b = 0xefcdab89
	    this._c = 0x98badcfe
	    this._d = 0x10325476
	    this._e = 0xc3d2e1f0
	
	    Hash.prototype.init.call(this)
	    return this
	  }
	
	  Sha1.prototype._POOL = POOL
	  Sha1.prototype._update = function (X) {
	
	    var a, b, c, d, e, _a, _b, _c, _d, _e
	
	    a = _a = this._a
	    b = _b = this._b
	    c = _c = this._c
	    d = _d = this._d
	    e = _e = this._e
	
	    var w = this._w
	
	    for(var j = 0; j < 80; j++) {
	      var W = w[j] = j < 16 ? X.readInt32BE(j*4)
	        : rol(w[j - 3] ^ w[j -  8] ^ w[j - 14] ^ w[j - 16], 1)
	
	      var t = add(
	        add(rol(a, 5), sha1_ft(j, b, c, d)),
	        add(add(e, W), sha1_kt(j))
	      )
	
	      e = d
	      d = c
	      c = rol(b, 30)
	      b = a
	      a = t
	    }
	
	    this._a = add(a, _a)
	    this._b = add(b, _b)
	    this._c = add(c, _c)
	    this._d = add(d, _d)
	    this._e = add(e, _e)
	  }
	
	  Sha1.prototype._hash = function () {
	    if(POOL.length < 100) POOL.push(this)
	    var H = new Buffer(20)
	    //console.log(this._a|0, this._b|0, this._c|0, this._d|0, this._e|0)
	    H.writeInt32BE(this._a|0, A)
	    H.writeInt32BE(this._b|0, B)
	    H.writeInt32BE(this._c|0, C)
	    H.writeInt32BE(this._d|0, D)
	    H.writeInt32BE(this._e|0, E)
	    return H
	  }
	
	  /*
	   * Perform the appropriate triplet combination function for the current
	   * iteration
	   */
	  function sha1_ft(t, b, c, d) {
	    if(t < 20) return (b & c) | ((~b) & d);
	    if(t < 40) return b ^ c ^ d;
	    if(t < 60) return (b & c) | (b & d) | (c & d);
	    return b ^ c ^ d;
	  }
	
	  /*
	   * Determine the appropriate additive constant for the current iteration
	   */
	  function sha1_kt(t) {
	    return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
	           (t < 60) ? -1894007588 : -899497514;
	  }
	
	  /*
	   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	   * to work around bugs in some JS interpreters.
	   * //dominictarr: this is 10 years old, so maybe this can be dropped?)
	   *
	   */
	  function add(x, y) {
	    return (x + y ) | 0
	  //lets see how this goes on testling.
	  //  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  //  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  //  return (msw << 16) | (lsw & 0xFFFF);
	  }
	
	  /*
	   * Bitwise rotate a 32-bit number to the left.
	   */
	  function rol(num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt));
	  }
	
	  return Sha1
	}


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
	 * in FIPS 180-2
	 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 *
	 */
	
	var inherits = __webpack_require__(51).inherits
	
	module.exports = function (Buffer, Hash) {
	
	  var K = [
	      0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
	      0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
	      0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
	      0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
	      0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
	      0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
	      0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
	      0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
	      0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
	      0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
	      0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
	      0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
	      0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
	      0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
	      0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
	      0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
	    ]
	
	  var W = new Array(64)
	
	  function Sha256() {
	    this.init()
	
	    this._w = W //new Array(64)
	
	    Hash.call(this, 16*4, 14*4)
	  }
	
	  inherits(Sha256, Hash)
	
	  Sha256.prototype.init = function () {
	
	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0
	
	    this._len = this._s = 0
	
	    return this
	  }
	
	  function S (X, n) {
	    return (X >>> n) | (X << (32 - n));
	  }
	
	  function R (X, n) {
	    return (X >>> n);
	  }
	
	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }
	
	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }
	
	  function Sigma0256 (x) {
	    return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
	  }
	
	  function Sigma1256 (x) {
	    return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	  }
	
	  function Gamma0256 (x) {
	    return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
	  }
	
	  function Gamma1256 (x) {
	    return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
	  }
	
	  Sha256.prototype._update = function(M) {
	
	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var T1, T2
	
	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0
	
	    for (var j = 0; j < 64; j++) {
	      var w = W[j] = j < 16
	        ? M.readInt32BE(j * 4)
	        : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16]
	
	      T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w
	
	      T2 = Sigma0256(a) + Maj(a, b, c);
	      h = g; g = f; f = e; e = d + T1; d = c; c = b; b = a; a = T1 + T2;
	    }
	
	    this._a = (a + this._a) | 0
	    this._b = (b + this._b) | 0
	    this._c = (c + this._c) | 0
	    this._d = (d + this._d) | 0
	    this._e = (e + this._e) | 0
	    this._f = (f + this._f) | 0
	    this._g = (g + this._g) | 0
	    this._h = (h + this._h) | 0
	
	  };
	
	  Sha256.prototype._hash = function () {
	    var H = new Buffer(32)
	
	    H.writeInt32BE(this._a,  0)
	    H.writeInt32BE(this._b,  4)
	    H.writeInt32BE(this._c,  8)
	    H.writeInt32BE(this._d, 12)
	    H.writeInt32BE(this._e, 16)
	    H.writeInt32BE(this._f, 20)
	    H.writeInt32BE(this._g, 24)
	    H.writeInt32BE(this._h, 28)
	
	    return H
	  }
	
	  return Sha256
	
	}


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(51).inherits
	
	module.exports = function (Buffer, Hash) {
	  var K = [
	    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	  ]
	
	  var W = new Array(160)
	
	  function Sha512() {
	    this.init()
	    this._w = W
	
	    Hash.call(this, 128, 112)
	  }
	
	  inherits(Sha512, Hash)
	
	  Sha512.prototype.init = function () {
	
	    this._a = 0x6a09e667|0
	    this._b = 0xbb67ae85|0
	    this._c = 0x3c6ef372|0
	    this._d = 0xa54ff53a|0
	    this._e = 0x510e527f|0
	    this._f = 0x9b05688c|0
	    this._g = 0x1f83d9ab|0
	    this._h = 0x5be0cd19|0
	
	    this._al = 0xf3bcc908|0
	    this._bl = 0x84caa73b|0
	    this._cl = 0xfe94f82b|0
	    this._dl = 0x5f1d36f1|0
	    this._el = 0xade682d1|0
	    this._fl = 0x2b3e6c1f|0
	    this._gl = 0xfb41bd6b|0
	    this._hl = 0x137e2179|0
	
	    this._len = this._s = 0
	
	    return this
	  }
	
	  function S (X, Xl, n) {
	    return (X >>> n) | (Xl << (32 - n))
	  }
	
	  function Ch (x, y, z) {
	    return ((x & y) ^ ((~x) & z));
	  }
	
	  function Maj (x, y, z) {
	    return ((x & y) ^ (x & z) ^ (y & z));
	  }
	
	  Sha512.prototype._update = function(M) {
	
	    var W = this._w
	    var a, b, c, d, e, f, g, h
	    var al, bl, cl, dl, el, fl, gl, hl
	
	    a = this._a | 0
	    b = this._b | 0
	    c = this._c | 0
	    d = this._d | 0
	    e = this._e | 0
	    f = this._f | 0
	    g = this._g | 0
	    h = this._h | 0
	
	    al = this._al | 0
	    bl = this._bl | 0
	    cl = this._cl | 0
	    dl = this._dl | 0
	    el = this._el | 0
	    fl = this._fl | 0
	    gl = this._gl | 0
	    hl = this._hl | 0
	
	    for (var i = 0; i < 80; i++) {
	      var j = i * 2
	
	      var Wi, Wil
	
	      if (i < 16) {
	        Wi = W[j] = M.readInt32BE(j * 4)
	        Wil = W[j + 1] = M.readInt32BE(j * 4 + 4)
	
	      } else {
	        var x  = W[j - 15*2]
	        var xl = W[j - 15*2 + 1]
	        var gamma0  = S(x, xl, 1) ^ S(x, xl, 8) ^ (x >>> 7)
	        var gamma0l = S(xl, x, 1) ^ S(xl, x, 8) ^ S(xl, x, 7)
	
	        x  = W[j - 2*2]
	        xl = W[j - 2*2 + 1]
	        var gamma1  = S(x, xl, 19) ^ S(xl, x, 29) ^ (x >>> 6)
	        var gamma1l = S(xl, x, 19) ^ S(x, xl, 29) ^ S(xl, x, 6)
	
	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[j - 7*2]
	        var Wi7l = W[j - 7*2 + 1]
	
	        var Wi16  = W[j - 16*2]
	        var Wi16l = W[j - 16*2 + 1]
	
	        Wil = gamma0l + Wi7l
	        Wi  = gamma0  + Wi7 + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0)
	        Wil = Wil + gamma1l
	        Wi  = Wi  + gamma1  + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0)
	        Wil = Wil + Wi16l
	        Wi  = Wi  + Wi16 + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0)
	
	        W[j] = Wi
	        W[j + 1] = Wil
	      }
	
	      var maj = Maj(a, b, c)
	      var majl = Maj(al, bl, cl)
	
	      var sigma0h = S(a, al, 28) ^ S(al, a, 2) ^ S(al, a, 7)
	      var sigma0l = S(al, a, 28) ^ S(a, al, 2) ^ S(a, al, 7)
	      var sigma1h = S(e, el, 14) ^ S(e, el, 18) ^ S(el, e, 9)
	      var sigma1l = S(el, e, 14) ^ S(el, e, 18) ^ S(e, el, 9)
	
	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki = K[j]
	      var Kil = K[j + 1]
	
	      var ch = Ch(e, f, g)
	      var chl = Ch(el, fl, gl)
	
	      var t1l = hl + sigma1l
	      var t1 = h + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0)
	      t1l = t1l + chl
	      t1 = t1 + ch + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0)
	      t1l = t1l + Kil
	      t1 = t1 + Ki + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0)
	      t1l = t1l + Wil
	      t1 = t1 + Wi + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0)
	
	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl
	      var t2 = sigma0h + maj + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0)
	
	      h  = g
	      hl = gl
	      g  = f
	      gl = fl
	      f  = e
	      fl = el
	      el = (dl + t1l) | 0
	      e  = (d + t1 + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	      d  = c
	      dl = cl
	      c  = b
	      cl = bl
	      b  = a
	      bl = al
	      al = (t1l + t2l) | 0
	      a  = (t1 + t2 + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0
	    }
	
	    this._al = (this._al + al) | 0
	    this._bl = (this._bl + bl) | 0
	    this._cl = (this._cl + cl) | 0
	    this._dl = (this._dl + dl) | 0
	    this._el = (this._el + el) | 0
	    this._fl = (this._fl + fl) | 0
	    this._gl = (this._gl + gl) | 0
	    this._hl = (this._hl + hl) | 0
	
	    this._a = (this._a + a + ((this._al >>> 0) < (al >>> 0) ? 1 : 0)) | 0
	    this._b = (this._b + b + ((this._bl >>> 0) < (bl >>> 0) ? 1 : 0)) | 0
	    this._c = (this._c + c + ((this._cl >>> 0) < (cl >>> 0) ? 1 : 0)) | 0
	    this._d = (this._d + d + ((this._dl >>> 0) < (dl >>> 0) ? 1 : 0)) | 0
	    this._e = (this._e + e + ((this._el >>> 0) < (el >>> 0) ? 1 : 0)) | 0
	    this._f = (this._f + f + ((this._fl >>> 0) < (fl >>> 0) ? 1 : 0)) | 0
	    this._g = (this._g + g + ((this._gl >>> 0) < (gl >>> 0) ? 1 : 0)) | 0
	    this._h = (this._h + h + ((this._hl >>> 0) < (hl >>> 0) ? 1 : 0)) | 0
	  }
	
	  Sha512.prototype._hash = function () {
	    var H = new Buffer(64)
	
	    function writeInt64BE(h, l, offset) {
	      H.writeInt32BE(h, offset)
	      H.writeInt32BE(l, offset + 4)
	    }
	
	    writeInt64BE(this._a, this._al, 0)
	    writeInt64BE(this._b, this._bl, 8)
	    writeInt64BE(this._c, this._cl, 16)
	    writeInt64BE(this._d, this._dl, 24)
	    writeInt64BE(this._e, this._el, 32)
	    writeInt64BE(this._f, this._fl, 40)
	    writeInt64BE(this._g, this._gl, 48)
	    writeInt64BE(this._h, this._hl, 56)
	
	    return H
	  }
	
	  return Sha512
	
	}


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 */
	
	var helpers = __webpack_require__(95);
	
	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len)
	{
	  /* append padding */
	  x[len >> 5] |= 0x80 << ((len) % 32);
	  x[(((len + 64) >>> 9) << 4) + 14] = len;
	
	  var a =  1732584193;
	  var b = -271733879;
	  var c = -1732584194;
	  var d =  271733878;
	
	  for(var i = 0; i < x.length; i += 16)
	  {
	    var olda = a;
	    var oldb = b;
	    var oldc = c;
	    var oldd = d;
	
	    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
	    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
	    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
	    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
	    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
	    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
	    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
	    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
	    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
	    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
	
	    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
	    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
	    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
	    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
	    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
	    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
	    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
	    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
	    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
	    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
	
	    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
	    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
	    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
	    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
	    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
	    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
	    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
	    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
	    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
	    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
	    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
	    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
	    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
	    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
	
	    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
	    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
	    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
	    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
	    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
	    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
	    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
	    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
	    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
	    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
	    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
	    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
	    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
	    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
	
	    a = safe_add(a, olda);
	    b = safe_add(b, oldb);
	    c = safe_add(c, oldc);
	    d = safe_add(d, oldd);
	  }
	  return Array(a, b, c, d);
	
	}
	
	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t)
	{
	  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t)
	{
	  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t)
	{
	  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t)
	{
	  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}
	
	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y)
	{
	  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	  return (msw << 16) | (lsw & 0xFFFF);
	}
	
	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt)
	{
	  return (num << cnt) | (num >>> (32 - cnt));
	}
	
	module.exports = function md5(buf) {
	  return helpers.hash(buf, core_md5, 16);
	};


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var intSize = 4;
	var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
	var chrsz = 8;
	
	function toArray(buf, bigEndian) {
	  if ((buf.length % intSize) !== 0) {
	    var len = buf.length + (intSize - (buf.length % intSize));
	    buf = Buffer.concat([buf, zeroBuffer], len);
	  }
	
	  var arr = [];
	  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
	  for (var i = 0; i < buf.length; i += intSize) {
	    arr.push(fn.call(buf, i));
	  }
	  return arr;
	}
	
	function toBuffer(arr, size, bigEndian) {
	  var buf = new Buffer(size);
	  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
	  for (var i = 0; i < arr.length; i++) {
	    fn.call(buf, arr[i], i * 4, true);
	  }
	  return buf;
	}
	
	function hash(buf, fn, hashSize, bigEndian) {
	  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
	  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
	  return toBuffer(arr, hashSize, bigEndian);
	}
	
	module.exports = { hash: hash };
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = ripemd160
	
	
	
	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	
	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	// Constants table
	var zl = [
	    0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	    7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	    3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	    1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	    4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13];
	var zr = [
	    5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	    6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	    15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	    8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	    12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11];
	var sl = [
	     11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	    7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	    11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	      11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	    9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ];
	var sr = [
	    8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	    9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	    9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	    15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	    8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ];
	
	var hl =  [ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E];
	var hr =  [ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000];
	
	var bytesToWords = function (bytes) {
	  var words = [];
	  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
	    words[b >>> 5] |= bytes[i] << (24 - b % 32);
	  }
	  return words;
	};
	
	var wordsToBytes = function (words) {
	  var bytes = [];
	  for (var b = 0; b < words.length * 32; b += 8) {
	    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	  }
	  return bytes;
	};
	
	var processBlock = function (H, M, offset) {
	
	  // Swap endian
	  for (var i = 0; i < 16; i++) {
	    var offset_i = offset + i;
	    var M_offset_i = M[offset_i];
	
	    // Swap
	    M[offset_i] = (
	        (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	        (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	    );
	  }
	
	  // Working variables
	  var al, bl, cl, dl, el;
	  var ar, br, cr, dr, er;
	
	  ar = al = H[0];
	  br = bl = H[1];
	  cr = cl = H[2];
	  dr = dl = H[3];
	  er = el = H[4];
	  // Computation
	  var t;
	  for (var i = 0; i < 80; i += 1) {
	    t = (al +  M[offset+zl[i]])|0;
	    if (i<16){
	        t +=  f1(bl,cl,dl) + hl[0];
	    } else if (i<32) {
	        t +=  f2(bl,cl,dl) + hl[1];
	    } else if (i<48) {
	        t +=  f3(bl,cl,dl) + hl[2];
	    } else if (i<64) {
	        t +=  f4(bl,cl,dl) + hl[3];
	    } else {// if (i<80) {
	        t +=  f5(bl,cl,dl) + hl[4];
	    }
	    t = t|0;
	    t =  rotl(t,sl[i]);
	    t = (t+el)|0;
	    al = el;
	    el = dl;
	    dl = rotl(cl, 10);
	    cl = bl;
	    bl = t;
	
	    t = (ar + M[offset+zr[i]])|0;
	    if (i<16){
	        t +=  f5(br,cr,dr) + hr[0];
	    } else if (i<32) {
	        t +=  f4(br,cr,dr) + hr[1];
	    } else if (i<48) {
	        t +=  f3(br,cr,dr) + hr[2];
	    } else if (i<64) {
	        t +=  f2(br,cr,dr) + hr[3];
	    } else {// if (i<80) {
	        t +=  f1(br,cr,dr) + hr[4];
	    }
	    t = t|0;
	    t =  rotl(t,sr[i]) ;
	    t = (t+er)|0;
	    ar = er;
	    er = dr;
	    dr = rotl(cr, 10);
	    cr = br;
	    br = t;
	  }
	  // Intermediate hash value
	  t    = (H[1] + cl + dr)|0;
	  H[1] = (H[2] + dl + er)|0;
	  H[2] = (H[3] + el + ar)|0;
	  H[3] = (H[4] + al + br)|0;
	  H[4] = (H[0] + bl + cr)|0;
	  H[0] =  t;
	};
	
	function f1(x, y, z) {
	  return ((x) ^ (y) ^ (z));
	}
	
	function f2(x, y, z) {
	  return (((x)&(y)) | ((~x)&(z)));
	}
	
	function f3(x, y, z) {
	  return (((x) | (~(y))) ^ (z));
	}
	
	function f4(x, y, z) {
	  return (((x) & (z)) | ((y)&(~(z))));
	}
	
	function f5(x, y, z) {
	  return ((x) ^ ((y) |(~(z))));
	}
	
	function rotl(x,n) {
	  return (x<<n) | (x>>>(32-n));
	}
	
	function ripemd160(message) {
	  var H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
	
	  if (typeof message == 'string')
	    message = new Buffer(message, 'utf8');
	
	  var m = bytesToWords(message);
	
	  var nBitsLeft = message.length * 8;
	  var nBitsTotal = message.length * 8;
	
	  // Add padding
	  m[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	  m[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	      (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	      (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	  );
	
	  for (var i=0 ; i<m.length; i += 16) {
	    processBlock(H, m, i);
	  }
	
	  // Swap endian
	  for (var i = 0; i < 5; i++) {
	      // Shortcut
	    var H_i = H[i];
	
	    // Swap
	    H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	          (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	  }
	
	  var digestbytes = wordsToBytes(H);
	  return new Buffer(digestbytes);
	}
	
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(88)
	
	var zeroBuffer = new Buffer(128)
	zeroBuffer.fill(0)
	
	module.exports = Hmac
	
	function Hmac (alg, key) {
	  if(!(this instanceof Hmac)) return new Hmac(alg, key)
	  this._opad = opad
	  this._alg = alg
	
	  var blocksize = (alg === 'sha512') ? 128 : 64
	
	  key = this._key = !Buffer.isBuffer(key) ? new Buffer(key) : key
	
	  if(key.length > blocksize) {
	    key = createHash(alg).update(key).digest()
	  } else if(key.length < blocksize) {
	    key = Buffer.concat([key, zeroBuffer], blocksize)
	  }
	
	  var ipad = this._ipad = new Buffer(blocksize)
	  var opad = this._opad = new Buffer(blocksize)
	
	  for(var i = 0; i < blocksize; i++) {
	    ipad[i] = key[i] ^ 0x36
	    opad[i] = key[i] ^ 0x5C
	  }
	
	  this._hash = createHash(alg).update(ipad)
	}
	
	Hmac.prototype.update = function (data, enc) {
	  this._hash.update(data, enc)
	  return this
	}
	
	Hmac.prototype.digest = function (enc) {
	  var h = this._hash.digest()
	  return createHash(this._alg).update(this._opad).update(h).digest(enc)
	}
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var pbkdf2Export = __webpack_require__(99)
	
	module.exports = function (crypto, exports) {
	  exports = exports || {}
	
	  var exported = pbkdf2Export(crypto)
	
	  exports.pbkdf2 = exported.pbkdf2
	  exports.pbkdf2Sync = exported.pbkdf2Sync
	
	  return exports
	}


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function(crypto) {
	  function pbkdf2(password, salt, iterations, keylen, digest, callback) {
	    if ('function' === typeof digest) {
	      callback = digest
	      digest = undefined
	    }
	
	    if ('function' !== typeof callback)
	      throw new Error('No callback provided to pbkdf2')
	
	    setTimeout(function() {
	      var result
	
	      try {
	        result = pbkdf2Sync(password, salt, iterations, keylen, digest)
	      } catch (e) {
	        return callback(e)
	      }
	
	      callback(undefined, result)
	    })
	  }
	
	  function pbkdf2Sync(password, salt, iterations, keylen, digest) {
	    if ('number' !== typeof iterations)
	      throw new TypeError('Iterations not a number')
	
	    if (iterations < 0)
	      throw new TypeError('Bad iterations')
	
	    if ('number' !== typeof keylen)
	      throw new TypeError('Key length not a number')
	
	    if (keylen < 0)
	      throw new TypeError('Bad key length')
	
	    digest = digest || 'sha1'
	
	    if (!Buffer.isBuffer(password)) password = new Buffer(password)
	    if (!Buffer.isBuffer(salt)) salt = new Buffer(salt)
	
	    var hLen, l = 1, r, T
	    var DK = new Buffer(keylen)
	    var block1 = new Buffer(salt.length + 4)
	    salt.copy(block1, 0, 0, salt.length)
	
	    for (var i = 1; i <= l; i++) {
	      block1.writeUInt32BE(i, salt.length)
	
	      var U = crypto.createHmac(digest, password).update(block1).digest()
	
	      if (!hLen) {
	        hLen = U.length
	        T = new Buffer(hLen)
	        l = Math.ceil(keylen / hLen)
	        r = keylen - (l - 1) * hLen
	
	        if (keylen > (Math.pow(2, 32) - 1) * hLen)
	          throw new TypeError('keylen exceeds maximum length')
	      }
	
	      U.copy(T, 0, 0, hLen)
	
	      for (var j = 1; j < iterations; j++) {
	        U = crypto.createHmac(digest, password).update(U).digest()
	
	        for (var k = 0; k < hLen; k++) {
	          T[k] ^= U[k]
	        }
	      }
	
	      var destPos = (i - 1) * hLen
	      var len = (i == l ? r : hLen)
	      T.copy(DK, destPos, 0, len)
	    }
	
	    return DK
	  }
	
	  return {
	    pbkdf2: pbkdf2,
	    pbkdf2Sync: pbkdf2Sync
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (crypto, exports) {
	  exports = exports || {};
	  var ciphers = __webpack_require__(101)(crypto);
	  exports.createCipher = ciphers.createCipher;
	  exports.createCipheriv = ciphers.createCipheriv;
	  var deciphers = __webpack_require__(113)(crypto);
	  exports.createDecipher = deciphers.createDecipher;
	  exports.createDecipheriv = deciphers.createDecipheriv;
	  var modes = __webpack_require__(104);
	  function listCiphers () {
	    return Object.keys(modes);
	  }
	  exports.listCiphers = listCiphers;
	};
	


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(102);
	var Transform = __webpack_require__(103);
	var inherits = __webpack_require__(60);
	var modes = __webpack_require__(104);
	var ebtk = __webpack_require__(105);
	var StreamCipher = __webpack_require__(106);
	inherits(Cipher, Transform);
	function Cipher(mode, key, iv) {
	  if (!(this instanceof Cipher)) {
	    return new Cipher(mode, key, iv);
	  }
	  Transform.call(this);
	  this._cache = new Splitter();
	  this._cipher = new aes.AES(key);
	  this._prev = new Buffer(iv.length);
	  iv.copy(this._prev);
	  this._mode = mode;
	}
	Cipher.prototype._transform = function (data, _, next) {
	  this._cache.add(data);
	  var chunk;
	  var thing;
	  while ((chunk = this._cache.get())) {
	    thing = this._mode.encrypt(this, chunk);
	    this.push(thing);
	  }
	  next();
	};
	Cipher.prototype._flush = function (next) {
	  var chunk = this._cache.flush();
	  this.push(this._mode.encrypt(this, chunk));
	  this._cipher.scrub();
	  next();
	};
	
	
	function Splitter() {
	   if (!(this instanceof Splitter)) {
	    return new Splitter();
	  }
	  this.cache = new Buffer('');
	}
	Splitter.prototype.add = function (data) {
	  this.cache = Buffer.concat([this.cache, data]);
	};
	
	Splitter.prototype.get = function () {
	  if (this.cache.length > 15) {
	    var out = this.cache.slice(0, 16);
	    this.cache = this.cache.slice(16);
	    return out;
	  }
	  return null;
	};
	Splitter.prototype.flush = function () {
	  var len = 16 - this.cache.length;
	  var padBuff = new Buffer(len);
	
	  var i = -1;
	  while (++i < len) {
	    padBuff.writeUInt8(len, i);
	  }
	  var out = Buffer.concat([this.cache, padBuff]);
	  return out;
	};
	var modelist = {
	  ECB: __webpack_require__(107),
	  CBC: __webpack_require__(108),
	  CFB: __webpack_require__(110),
	  OFB: __webpack_require__(111),
	  CTR: __webpack_require__(112)
	};
	module.exports = function (crypto) {
	  function createCipheriv(suite, password, iv) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    if (typeof iv === 'string') {
	      iv = new Buffer(iv);
	    }
	    if (typeof password === 'string') {
	      password = new Buffer(password);
	    }
	    if (password.length !== config.key/8) {
	      throw new TypeError('invalid key length ' + password.length);
	    }
	    if (iv.length !== config.iv) {
	      throw new TypeError('invalid iv length ' + iv.length);
	    }
	    if (config.type === 'stream') {
	      return new StreamCipher(modelist[config.mode], password, iv);
	    }
	    return new Cipher(modelist[config.mode], password, iv);
	  }
	  function createCipher (suite, password) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    var keys = ebtk(crypto, password, config.key, config.iv);
	    return createCipheriv(suite, keys.key, keys.iv);
	  }
	  return {
	    createCipher: createCipher,
	    createCipheriv: createCipheriv
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var uint_max = Math.pow(2, 32);
	function fixup_uint32(x) {
	    var ret, x_pos;
	    ret = x > uint_max || x < 0 ? (x_pos = Math.abs(x) % uint_max, x < 0 ? uint_max - x_pos : x_pos) : x;
	    return ret;
	}
	function scrub_vec(v) {
	  var i, _i, _ref;
	  for (i = _i = 0, _ref = v.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
	    v[i] = 0;
	  }
	  return false;
	}
	
	function Global() {
	  var i;
	  this.SBOX = [];
	  this.INV_SBOX = [];
	  this.SUB_MIX = (function() {
	    var _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 4; i = ++_i) {
	      _results.push([]);
	    }
	    return _results;
	  })();
	  this.INV_SUB_MIX = (function() {
	    var _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 4; i = ++_i) {
	      _results.push([]);
	    }
	    return _results;
	  })();
	  this.init();
	  this.RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
	}
	
	Global.prototype.init = function() {
	  var d, i, sx, t, x, x2, x4, x8, xi, _i;
	  d = (function() {
	    var _i, _results;
	    _results = [];
	    for (i = _i = 0; _i < 256; i = ++_i) {
	      if (i < 128) {
	        _results.push(i << 1);
	      } else {
	        _results.push((i << 1) ^ 0x11b);
	      }
	    }
	    return _results;
	  })();
	  x = 0;
	  xi = 0;
	  for (i = _i = 0; _i < 256; i = ++_i) {
	    sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	    sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	    this.SBOX[x] = sx;
	    this.INV_SBOX[sx] = x;
	    x2 = d[x];
	    x4 = d[x2];
	    x8 = d[x4];
	    t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	    this.SUB_MIX[0][x] = (t << 24) | (t >>> 8);
	    this.SUB_MIX[1][x] = (t << 16) | (t >>> 16);
	    this.SUB_MIX[2][x] = (t << 8) | (t >>> 24);
	    this.SUB_MIX[3][x] = t;
	    t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	    this.INV_SUB_MIX[0][sx] = (t << 24) | (t >>> 8);
	    this.INV_SUB_MIX[1][sx] = (t << 16) | (t >>> 16);
	    this.INV_SUB_MIX[2][sx] = (t << 8) | (t >>> 24);
	    this.INV_SUB_MIX[3][sx] = t;
	    if (x === 0) {
	      x = xi = 1;
	    } else {
	      x = x2 ^ d[d[d[x8 ^ x2]]];
	      xi ^= d[d[xi]];
	    }
	  }
	  return true;
	};
	
	var G = new Global();
	
	
	AES.blockSize = 4 * 4;
	
	AES.prototype.blockSize = AES.blockSize;
	
	AES.keySize = 256 / 8;
	
	AES.prototype.keySize = AES.keySize;
	
	AES.ivSize = AES.blockSize;
	
	AES.prototype.ivSize = AES.ivSize;
	
	 function bufferToArray(buf) {
	  var len = buf.length/4;
	  var out = new Array(len);
	  var i = -1;
	  while (++i < len) {
	    out[i] = buf.readUInt32BE(i * 4);
	  }
	  return out;
	 }
	function AES(key) {
	  this._key = bufferToArray(key);
	  this._doReset();
	}
	
	AES.prototype._doReset = function() {
	  var invKsRow, keySize, keyWords, ksRow, ksRows, t, _i, _j;
	  keyWords = this._key;
	  keySize = keyWords.length;
	  this._nRounds = keySize + 6;
	  ksRows = (this._nRounds + 1) * 4;
	  this._keySchedule = [];
	  for (ksRow = _i = 0; 0 <= ksRows ? _i < ksRows : _i > ksRows; ksRow = 0 <= ksRows ? ++_i : --_i) {
	    this._keySchedule[ksRow] = ksRow < keySize ? keyWords[ksRow] : (t = this._keySchedule[ksRow - 1], (ksRow % keySize) === 0 ? (t = (t << 8) | (t >>> 24), t = (G.SBOX[t >>> 24] << 24) | (G.SBOX[(t >>> 16) & 0xff] << 16) | (G.SBOX[(t >>> 8) & 0xff] << 8) | G.SBOX[t & 0xff], t ^= G.RCON[(ksRow / keySize) | 0] << 24) : keySize > 6 && ksRow % keySize === 4 ? t = (G.SBOX[t >>> 24] << 24) | (G.SBOX[(t >>> 16) & 0xff] << 16) | (G.SBOX[(t >>> 8) & 0xff] << 8) | G.SBOX[t & 0xff] : void 0, this._keySchedule[ksRow - keySize] ^ t);
	  }
	  this._invKeySchedule = [];
	  for (invKsRow = _j = 0; 0 <= ksRows ? _j < ksRows : _j > ksRows; invKsRow = 0 <= ksRows ? ++_j : --_j) {
	    ksRow = ksRows - invKsRow;
	    t = this._keySchedule[ksRow - (invKsRow % 4 ? 0 : 4)];
	    this._invKeySchedule[invKsRow] = invKsRow < 4 || ksRow <= 4 ? t : G.INV_SUB_MIX[0][G.SBOX[t >>> 24]] ^ G.INV_SUB_MIX[1][G.SBOX[(t >>> 16) & 0xff]] ^ G.INV_SUB_MIX[2][G.SBOX[(t >>> 8) & 0xff]] ^ G.INV_SUB_MIX[3][G.SBOX[t & 0xff]];
	  }
	  return true;
	};
	
	AES.prototype.encryptBlock = function(M) {
	  M = bufferToArray(new Buffer(M));
	  var out = this._doCryptBlock(M, this._keySchedule, G.SUB_MIX, G.SBOX);
	  var buf = new Buffer(16);
	  buf.writeUInt32BE(out[0], 0);
	  buf.writeUInt32BE(out[1], 4);
	  buf.writeUInt32BE(out[2], 8);
	  buf.writeUInt32BE(out[3], 12);
	  return buf;
	};
	
	AES.prototype.decryptBlock = function(M) {
	  M = bufferToArray(new Buffer(M));
	  var temp = [M[3], M[1]];
	  M[1] = temp[0];
	  M[3] = temp[1];
	  var out = this._doCryptBlock(M, this._invKeySchedule, G.INV_SUB_MIX, G.INV_SBOX);
	  var buf = new Buffer(16);
	  buf.writeUInt32BE(out[0], 0);
	  buf.writeUInt32BE(out[3], 4);
	  buf.writeUInt32BE(out[2], 8);
	  buf.writeUInt32BE(out[1], 12);
	  return buf;
	};
	
	AES.prototype.scrub = function() {
	  scrub_vec(this._keySchedule);
	  scrub_vec(this._invKeySchedule);
	  scrub_vec(this._key);
	};
	
	AES.prototype._doCryptBlock = function(M, keySchedule, SUB_MIX, SBOX) {
	  var ksRow, round, s0, s1, s2, s3, t0, t1, t2, t3, _i, _ref;
	
	  s0 = M[0] ^ keySchedule[0];
	  s1 = M[1] ^ keySchedule[1];
	  s2 = M[2] ^ keySchedule[2];
	  s3 = M[3] ^ keySchedule[3];
	  ksRow = 4;
	  for (round = _i = 1, _ref = this._nRounds; 1 <= _ref ? _i < _ref : _i > _ref; round = 1 <= _ref ? ++_i : --_i) {
	    t0 = SUB_MIX[0][s0 >>> 24] ^ SUB_MIX[1][(s1 >>> 16) & 0xff] ^ SUB_MIX[2][(s2 >>> 8) & 0xff] ^ SUB_MIX[3][s3 & 0xff] ^ keySchedule[ksRow++];
	    t1 = SUB_MIX[0][s1 >>> 24] ^ SUB_MIX[1][(s2 >>> 16) & 0xff] ^ SUB_MIX[2][(s3 >>> 8) & 0xff] ^ SUB_MIX[3][s0 & 0xff] ^ keySchedule[ksRow++];
	    t2 = SUB_MIX[0][s2 >>> 24] ^ SUB_MIX[1][(s3 >>> 16) & 0xff] ^ SUB_MIX[2][(s0 >>> 8) & 0xff] ^ SUB_MIX[3][s1 & 0xff] ^ keySchedule[ksRow++];
	    t3 = SUB_MIX[0][s3 >>> 24] ^ SUB_MIX[1][(s0 >>> 16) & 0xff] ^ SUB_MIX[2][(s1 >>> 8) & 0xff] ^ SUB_MIX[3][s2 & 0xff] ^ keySchedule[ksRow++];
	    s0 = t0;
	    s1 = t1;
	    s2 = t2;
	    s3 = t3;
	  }
	  t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	  t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	  t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	  t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];
	  return [
	    fixup_uint32(t0),
	    fixup_uint32(t1),
	    fixup_uint32(t2),
	    fixup_uint32(t3)
	  ];
	
	};
	
	
	
	
	  exports.AES = AES;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var Transform = __webpack_require__(65).Transform;
	var inherits = __webpack_require__(60);
	
	module.exports = CipherBase;
	inherits(CipherBase, Transform);
	function CipherBase() {
	  Transform.call(this);
	}
	CipherBase.prototype.update = function (data, inputEnd, outputEnc) {
	  this.write(data, inputEnd);
	  var outData = new Buffer('');
	  var chunk;
	  while ((chunk = this.read())) {
	    outData = Buffer.concat([outData, chunk]);
	  }
	  if (outputEnc) {
	    outData = outData.toString(outputEnc);
	  }
	  return outData;
	};
	CipherBase.prototype.final = function (outputEnc) {
	  this.end();
	  var outData = new Buffer('');
	  var chunk;
	  while ((chunk = this.read())) {
	    outData = Buffer.concat([outData, chunk]);
	  }
	  if (outputEnc) {
	    outData = outData.toString(outputEnc);
	  }
	  return outData;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 104 */
/***/ function(module, exports) {

	exports['aes-128-ecb'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 0,
	  mode: 'ECB',
	  type: 'block'
	};
	exports['aes-192-ecb'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 0,
	  mode: 'ECB',
	  type: 'block'
	};
	exports['aes-256-ecb'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 0,
	  mode: 'ECB',
	  type: 'block'
	};
	exports['aes-128-cbc'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'CBC',
	  type: 'block'
	};
	exports['aes-192-cbc'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'CBC',
	  type: 'block'
	};
	exports['aes-256-cbc'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'CBC',
	  type: 'block'
	};
	exports['aes128'] = exports['aes-128-cbc'];
	exports['aes192'] = exports['aes-192-cbc'];
	exports['aes256'] = exports['aes-256-cbc'];
	exports['aes-128-cfb'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'CFB',
	  type: 'stream'
	};
	exports['aes-192-cfb'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'CFB',
	  type: 'stream'
	};
	exports['aes-256-cfb'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'CFB',
	  type: 'stream'
	};
	exports['aes-128-ofb'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'OFB',
	  type: 'stream'
	};
	exports['aes-192-ofb'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'OFB',
	  type: 'stream'
	};
	exports['aes-256-ofb'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'OFB',
	  type: 'stream'
	};
	exports['aes-128-ctr'] = {
	  cipher: 'AES',
	  key: 128,
	  iv: 16,
	  mode: 'CTR',
	  type: 'stream'
	};
	exports['aes-192-ctr'] = {
	  cipher: 'AES',
	  key: 192,
	  iv: 16,
	  mode: 'CTR',
	  type: 'stream'
	};
	exports['aes-256-ctr'] = {
	  cipher: 'AES',
	  key: 256,
	  iv: 16,
	  mode: 'CTR',
	  type: 'stream'
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {
	module.exports = function (crypto, password, keyLen, ivLen) {
	  keyLen = keyLen/8;
	  ivLen = ivLen || 0;
	  var ki = 0;
	  var ii = 0;
	  var key = new Buffer(keyLen);
	  var iv = new Buffer(ivLen);
	  var addmd = 0;
	  var md, md_buf;
	  var i;
	  while (true) {
	    md = crypto.createHash('md5');
	    if(addmd++ > 0) {
	       md.update(md_buf);
	    }
	    md.update(password);
	    md_buf = md.digest();
	    i = 0;
	    if(keyLen > 0) {
	      while(true) {
	        if(keyLen === 0) {
	          break;
	        }
	        if(i === md_buf.length) {
	          break;
	        }
	        key[ki++] = md_buf[i];
	        keyLen--;
	        i++;
	       }
	    }
	    if(ivLen > 0 && i !== md_buf.length) {
	      while(true) {
	        if(ivLen === 0) {
	          break;
	        }
	        if(i === md_buf.length) {
	          break;
	        }
	       iv[ii++] = md_buf[i];
	       ivLen--;
	       i++;
	     }
	   }
	   if(keyLen === 0 && ivLen === 0) {
	      break;
	    }
	  }
	  for(i=0;i<md_buf.length;i++) {
	    md_buf[i] = 0;
	  }
	  return {
	    key: key,
	    iv: iv
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(102);
	var Transform = __webpack_require__(103);
	var inherits = __webpack_require__(60);
	
	inherits(StreamCipher, Transform);
	module.exports = StreamCipher;
	function StreamCipher(mode, key, iv, decrypt) {
	  if (!(this instanceof StreamCipher)) {
	    return new StreamCipher(mode, key, iv);
	  }
	  Transform.call(this);
	  this._cipher = new aes.AES(key);
	  this._prev = new Buffer(iv.length);
	  this._cache = new Buffer('');
	  this._secCache = new Buffer('');
	  this._decrypt = decrypt;
	  iv.copy(this._prev);
	  this._mode = mode;
	}
	StreamCipher.prototype._transform = function (chunk, _, next) {
	  next(null, this._mode.encrypt(this, chunk, this._decrypt));
	};
	StreamCipher.prototype._flush = function (next) {
	  this._cipher.scrub();
	  next();
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 107 */
/***/ function(module, exports) {

	exports.encrypt = function (self, block) {
	  return self._cipher.encryptBlock(block);
	};
	exports.decrypt = function (self, block) {
	  return self._cipher.decryptBlock(block);
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var xor = __webpack_require__(109);
	exports.encrypt = function (self, block) {
	  var data = xor(block, self._prev);
	  self._prev = self._cipher.encryptBlock(data);
	  return self._prev;
	};
	exports.decrypt = function (self, block) {
	  var pad = self._prev;
	  self._prev = block;
	  var out = self._cipher.decryptBlock(block);
	  return xor(out, pad);
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = xor;
	function xor(a, b) {
	  var len = Math.min(a.length, b.length);
	  var out = new Buffer(len);
	  var i = -1;
	  while (++i < len) {
	    out.writeUInt8(a[i] ^ b[i], i);
	  }
	  return out;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(109);
	exports.encrypt = function (self, data, decrypt) {
	  var out = new Buffer('');
	  var len;
	  while (data.length) {
	    if (self._cache.length === 0) {
	      self._cache = self._cipher.encryptBlock(self._prev);
	      self._prev = new Buffer('');
	    }
	    if (self._cache.length <= data.length) {
	      len = self._cache.length;
	      out = Buffer.concat([out, encryptStart(self, data.slice(0, len), decrypt)]);
	      data = data.slice(len);
	    } else {
	      out = Buffer.concat([out, encryptStart(self, data, decrypt)]);
	      break;
	    }
	  }
	  return out;
	};
	function encryptStart(self, data, decrypt) {
	  var len = data.length;
	  var out = xor(data, self._cache);
	  self._cache = self._cache.slice(len);
	  self._prev = Buffer.concat([self._prev, decrypt?data:out]);
	  return out;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(109);
	function getBlock(self) {
	  self._prev = self._cipher.encryptBlock(self._prev);
	  return self._prev;
	}
	exports.encrypt = function (self, chunk) {
	  while (self._cache.length < chunk.length) {
	    self._cache = Buffer.concat([self._cache, getBlock(self)]);
	  }
	  var pad = self._cache.slice(0, chunk.length);
	  self._cache = self._cache.slice(chunk.length);
	  return xor(chunk, pad);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(109);
	function getBlock(self) {
	  var out = self._cipher.encryptBlock(self._prev);
	  incr32(self._prev);
	  return out;
	}
	exports.encrypt = function (self, chunk) {
	  while (self._cache.length < chunk.length) {
	    self._cache = Buffer.concat([self._cache, getBlock(self)]);
	  }
	  var pad = self._cache.slice(0, chunk.length);
	  self._cache = self._cache.slice(chunk.length);
	  return xor(chunk, pad);
	};
	function incr32(iv) {
	  var len = iv.length;
	  var item;
	  while (len--) {
	    item = iv.readUInt8(len);
	    if (item === 255) {
	      iv.writeUInt8(0, len);
	    } else {
	      item++;
	      iv.writeUInt8(item, len);
	      break;
	    }
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(102);
	var Transform = __webpack_require__(103);
	var inherits = __webpack_require__(60);
	var modes = __webpack_require__(104);
	var StreamCipher = __webpack_require__(106);
	var ebtk = __webpack_require__(105);
	
	inherits(Decipher, Transform);
	function Decipher(mode, key, iv) {
	  if (!(this instanceof Decipher)) {
	    return new Decipher(mode, key, iv);
	  }
	  Transform.call(this);
	  this._cache = new Splitter();
	  this._last = void 0;
	  this._cipher = new aes.AES(key);
	  this._prev = new Buffer(iv.length);
	  iv.copy(this._prev);
	  this._mode = mode;
	}
	Decipher.prototype._transform = function (data, _, next) {
	  this._cache.add(data);
	  var chunk;
	  var thing;
	  while ((chunk = this._cache.get())) {
	    thing = this._mode.decrypt(this, chunk);
	    this.push(thing);
	  }
	  next();
	};
	Decipher.prototype._flush = function (next) {
	  var chunk = this._cache.flush();
	  if (!chunk) {
	    return next;
	  }
	
	  this.push(unpad(this._mode.decrypt(this, chunk)));
	
	  next();
	};
	
	function Splitter() {
	   if (!(this instanceof Splitter)) {
	    return new Splitter();
	  }
	  this.cache = new Buffer('');
	}
	Splitter.prototype.add = function (data) {
	  this.cache = Buffer.concat([this.cache, data]);
	};
	
	Splitter.prototype.get = function () {
	  if (this.cache.length > 16) {
	    var out = this.cache.slice(0, 16);
	    this.cache = this.cache.slice(16);
	    return out;
	  }
	  return null;
	};
	Splitter.prototype.flush = function () {
	  if (this.cache.length) {
	    return this.cache;
	  }
	};
	function unpad(last) {
	  var padded = last[15];
	  if (padded === 16) {
	    return;
	  }
	  return last.slice(0, 16 - padded);
	}
	
	var modelist = {
	  ECB: __webpack_require__(107),
	  CBC: __webpack_require__(108),
	  CFB: __webpack_require__(110),
	  OFB: __webpack_require__(111),
	  CTR: __webpack_require__(112)
	};
	
	module.exports = function (crypto) {
	  function createDecipheriv(suite, password, iv) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    if (typeof iv === 'string') {
	      iv = new Buffer(iv);
	    }
	    if (typeof password === 'string') {
	      password = new Buffer(password);
	    }
	    if (password.length !== config.key/8) {
	      throw new TypeError('invalid key length ' + password.length);
	    }
	    if (iv.length !== config.iv) {
	      throw new TypeError('invalid iv length ' + iv.length);
	    }
	    if (config.type === 'stream') {
	      return new StreamCipher(modelist[config.mode], password, iv, true);
	    }
	    return new Decipher(modelist[config.mode], password, iv);
	  }
	
	  function createDecipher (suite, password) {
	    var config = modes[suite];
	    if (!config) {
	      throw new TypeError('invalid suite type');
	    }
	    var keys = ebtk(crypto, password, config.key, config.iv);
	    return createDecipheriv(suite, keys.key, keys.iv);
	  }
	  return {
	    createDecipher: createDecipher,
	    createDecipheriv: createDecipheriv
	  };
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 114 */
/***/ function(module, exports) {

	
	/**
	 * Expose `fresh()`.
	 */
	
	module.exports = fresh;
	
	/**
	 * Check freshness of `req` and `res` headers.
	 *
	 * When the cache is "fresh" __true__ is returned,
	 * otherwise __false__ is returned to indicate that
	 * the cache is now stale.
	 *
	 * @param {Object} req
	 * @param {Object} res
	 * @return {Boolean}
	 * @api public
	 */
	
	function fresh(req, res) {
	  // defaults
	  var etagMatches = true;
	  var notModified = true;
	
	  // fields
	  var modifiedSince = req['if-modified-since'];
	  var noneMatch = req['if-none-match'];
	  var lastModified = res['last-modified'];
	  var etag = res['etag'];
	  var cc = req['cache-control'];
	
	  // unconditional request
	  if (!modifiedSince && !noneMatch) return false;
	
	  // check for no-cache cache request directive
	  if (cc && cc.indexOf('no-cache') !== -1) return false;  
	
	  // parse if-none-match
	  if (noneMatch) noneMatch = noneMatch.split(/ *, */);
	
	  // if-none-match
	  if (noneMatch) {
	    etagMatches = noneMatch.some(function (match) {
	      return match === '*' || match === etag || match === 'W/' + etag;
	    });
	  }
	
	  // if-modified-since
	  if (modifiedSince) {
	    modifiedSince = new Date(modifiedSince);
	    lastModified = new Date(lastModified);
	    notModified = lastModified <= modifiedSince;
	  }
	
	  return !! (etagMatches && notModified);
	}


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var path = __webpack_require__(50);
	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	function Mime() {
	  // Map of extension -> mime type
	  this.types = Object.create(null);
	
	  // Map of mime type -> extension
	  this.extensions = Object.create(null);
	}
	
	/**
	 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
	 * to an array of extensions associated with the type.  The first extension is
	 * used as the default extension for the type.
	 *
	 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
	 *
	 * @param map (Object) type definitions
	 */
	Mime.prototype.define = function (map) {
	  for (var type in map) {
	    var exts = map[type];
	    for (var i = 0; i < exts.length; i++) {
	      if (process.env.DEBUG_MIME && this.types[exts]) {
	        console.warn(this._loading.replace(/.*\//, ''), 'changes "' + exts[i] + '" extension type from ' +
	          this.types[exts] + ' to ' + type);
	      }
	
	      this.types[exts[i]] = type;
	    }
	
	    // Default extension is the first one we encounter
	    if (!this.extensions[type]) {
	      this.extensions[type] = exts[0];
	    }
	  }
	};
	
	/**
	 * Load an Apache2-style ".types" file
	 *
	 * This may be called multiple times (it's expected).  Where files declare
	 * overlapping types/extensions, the last file wins.
	 *
	 * @param file (String) path of file to load.
	 */
	Mime.prototype.load = function(file) {
	  this._loading = file;
	  // Read file and split into lines
	  var map = {},
	      content = fs.readFileSync(file, 'ascii'),
	      lines = content.split(/[\r\n]+/);
	
	  lines.forEach(function(line) {
	    // Clean up whitespace/comments, and split into fields
	    var fields = line.replace(/\s*#.*|^\s*|\s*$/g, '').split(/\s+/);
	    map[fields.shift()] = fields;
	  });
	
	  this.define(map);
	
	  this._loading = null;
	};
	
	/**
	 * Lookup a mime type based on extension
	 */
	Mime.prototype.lookup = function(path, fallback) {
	  var ext = path.replace(/.*[\.\/\\]/, '').toLowerCase();
	
	  return this.types[ext] || fallback || this.default_type;
	};
	
	/**
	 * Return file extension associated with a mime type
	 */
	Mime.prototype.extension = function(mimeType) {
	  var type = mimeType.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();
	  return this.extensions[type];
	};
	
	// Default instance
	var mime = new Mime();
	
	// Define built-in types
	mime.define(__webpack_require__(116));
	
	// Default type
	mime.default_type = mime.lookup('bin');
	
	//
	// Additional API specific to the default instance
	//
	
	mime.Mime = Mime;
	
	/**
	 * Lookup a charset based on mime type.
	 */
	mime.charsets = {
	  lookup: function(mimeType, fallback) {
	    // Assume text types are utf8
	    return (/^text\//).test(mimeType) ? 'UTF-8' : fallback;
	  }
	};
	
	module.exports = mime;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 116 */
/***/ function(module, exports) {

	module.exports = {
		"application/andrew-inset": [
			"ez"
		],
		"application/applixware": [
			"aw"
		],
		"application/atom+xml": [
			"atom"
		],
		"application/atomcat+xml": [
			"atomcat"
		],
		"application/atomsvc+xml": [
			"atomsvc"
		],
		"application/ccxml+xml": [
			"ccxml"
		],
		"application/cdmi-capability": [
			"cdmia"
		],
		"application/cdmi-container": [
			"cdmic"
		],
		"application/cdmi-domain": [
			"cdmid"
		],
		"application/cdmi-object": [
			"cdmio"
		],
		"application/cdmi-queue": [
			"cdmiq"
		],
		"application/cu-seeme": [
			"cu"
		],
		"application/dash+xml": [
			"mdp"
		],
		"application/davmount+xml": [
			"davmount"
		],
		"application/docbook+xml": [
			"dbk"
		],
		"application/dssc+der": [
			"dssc"
		],
		"application/dssc+xml": [
			"xdssc"
		],
		"application/ecmascript": [
			"ecma"
		],
		"application/emma+xml": [
			"emma"
		],
		"application/epub+zip": [
			"epub"
		],
		"application/exi": [
			"exi"
		],
		"application/font-tdpfr": [
			"pfr"
		],
		"application/font-woff": [
			"woff"
		],
		"application/font-woff2": [
			"woff2"
		],
		"application/gml+xml": [
			"gml"
		],
		"application/gpx+xml": [
			"gpx"
		],
		"application/gxf": [
			"gxf"
		],
		"application/hyperstudio": [
			"stk"
		],
		"application/inkml+xml": [
			"ink",
			"inkml"
		],
		"application/ipfix": [
			"ipfix"
		],
		"application/java-archive": [
			"jar"
		],
		"application/java-serialized-object": [
			"ser"
		],
		"application/java-vm": [
			"class"
		],
		"application/javascript": [
			"js"
		],
		"application/json": [
			"json",
			"map"
		],
		"application/json5": [
			"json5"
		],
		"application/jsonml+json": [
			"jsonml"
		],
		"application/lost+xml": [
			"lostxml"
		],
		"application/mac-binhex40": [
			"hqx"
		],
		"application/mac-compactpro": [
			"cpt"
		],
		"application/mads+xml": [
			"mads"
		],
		"application/marc": [
			"mrc"
		],
		"application/marcxml+xml": [
			"mrcx"
		],
		"application/mathematica": [
			"ma",
			"nb",
			"mb"
		],
		"application/mathml+xml": [
			"mathml"
		],
		"application/mbox": [
			"mbox"
		],
		"application/mediaservercontrol+xml": [
			"mscml"
		],
		"application/metalink+xml": [
			"metalink"
		],
		"application/metalink4+xml": [
			"meta4"
		],
		"application/mets+xml": [
			"mets"
		],
		"application/mods+xml": [
			"mods"
		],
		"application/mp21": [
			"m21",
			"mp21"
		],
		"application/mp4": [
			"mp4s",
			"m4p"
		],
		"application/msword": [
			"doc",
			"dot"
		],
		"application/mxf": [
			"mxf"
		],
		"application/octet-stream": [
			"bin",
			"dms",
			"lrf",
			"mar",
			"so",
			"dist",
			"distz",
			"pkg",
			"bpk",
			"dump",
			"elc",
			"deploy",
			"buffer"
		],
		"application/oda": [
			"oda"
		],
		"application/oebps-package+xml": [
			"opf"
		],
		"application/ogg": [
			"ogx"
		],
		"application/omdoc+xml": [
			"omdoc"
		],
		"application/onenote": [
			"onetoc",
			"onetoc2",
			"onetmp",
			"onepkg"
		],
		"application/oxps": [
			"oxps"
		],
		"application/patch-ops-error+xml": [
			"xer"
		],
		"application/pdf": [
			"pdf"
		],
		"application/pgp-encrypted": [
			"pgp"
		],
		"application/pgp-signature": [
			"asc",
			"sig"
		],
		"application/pics-rules": [
			"prf"
		],
		"application/pkcs10": [
			"p10"
		],
		"application/pkcs7-mime": [
			"p7m",
			"p7c"
		],
		"application/pkcs7-signature": [
			"p7s"
		],
		"application/pkcs8": [
			"p8"
		],
		"application/pkix-attr-cert": [
			"ac"
		],
		"application/pkix-cert": [
			"cer"
		],
		"application/pkix-crl": [
			"crl"
		],
		"application/pkix-pkipath": [
			"pkipath"
		],
		"application/pkixcmp": [
			"pki"
		],
		"application/pls+xml": [
			"pls"
		],
		"application/postscript": [
			"ai",
			"eps",
			"ps"
		],
		"application/prs.cww": [
			"cww"
		],
		"application/pskc+xml": [
			"pskcxml"
		],
		"application/rdf+xml": [
			"rdf"
		],
		"application/reginfo+xml": [
			"rif"
		],
		"application/relax-ng-compact-syntax": [
			"rnc"
		],
		"application/resource-lists+xml": [
			"rl"
		],
		"application/resource-lists-diff+xml": [
			"rld"
		],
		"application/rls-services+xml": [
			"rs"
		],
		"application/rpki-ghostbusters": [
			"gbr"
		],
		"application/rpki-manifest": [
			"mft"
		],
		"application/rpki-roa": [
			"roa"
		],
		"application/rsd+xml": [
			"rsd"
		],
		"application/rss+xml": [
			"rss"
		],
		"application/rtf": [
			"rtf"
		],
		"application/sbml+xml": [
			"sbml"
		],
		"application/scvp-cv-request": [
			"scq"
		],
		"application/scvp-cv-response": [
			"scs"
		],
		"application/scvp-vp-request": [
			"spq"
		],
		"application/scvp-vp-response": [
			"spp"
		],
		"application/sdp": [
			"sdp"
		],
		"application/set-payment-initiation": [
			"setpay"
		],
		"application/set-registration-initiation": [
			"setreg"
		],
		"application/shf+xml": [
			"shf"
		],
		"application/smil+xml": [
			"smi",
			"smil"
		],
		"application/sparql-query": [
			"rq"
		],
		"application/sparql-results+xml": [
			"srx"
		],
		"application/srgs": [
			"gram"
		],
		"application/srgs+xml": [
			"grxml"
		],
		"application/sru+xml": [
			"sru"
		],
		"application/ssdl+xml": [
			"ssdl"
		],
		"application/ssml+xml": [
			"ssml"
		],
		"application/tei+xml": [
			"tei",
			"teicorpus"
		],
		"application/thraud+xml": [
			"tfi"
		],
		"application/timestamped-data": [
			"tsd"
		],
		"application/vnd.3gpp.pic-bw-large": [
			"plb"
		],
		"application/vnd.3gpp.pic-bw-small": [
			"psb"
		],
		"application/vnd.3gpp.pic-bw-var": [
			"pvb"
		],
		"application/vnd.3gpp2.tcap": [
			"tcap"
		],
		"application/vnd.3m.post-it-notes": [
			"pwn"
		],
		"application/vnd.accpac.simply.aso": [
			"aso"
		],
		"application/vnd.accpac.simply.imp": [
			"imp"
		],
		"application/vnd.acucobol": [
			"acu"
		],
		"application/vnd.acucorp": [
			"atc",
			"acutc"
		],
		"application/vnd.adobe.air-application-installer-package+zip": [
			"air"
		],
		"application/vnd.adobe.formscentral.fcdt": [
			"fcdt"
		],
		"application/vnd.adobe.fxp": [
			"fxp",
			"fxpl"
		],
		"application/vnd.adobe.xdp+xml": [
			"xdp"
		],
		"application/vnd.adobe.xfdf": [
			"xfdf"
		],
		"application/vnd.ahead.space": [
			"ahead"
		],
		"application/vnd.airzip.filesecure.azf": [
			"azf"
		],
		"application/vnd.airzip.filesecure.azs": [
			"azs"
		],
		"application/vnd.amazon.ebook": [
			"azw"
		],
		"application/vnd.americandynamics.acc": [
			"acc"
		],
		"application/vnd.amiga.ami": [
			"ami"
		],
		"application/vnd.android.package-archive": [
			"apk"
		],
		"application/vnd.anser-web-certificate-issue-initiation": [
			"cii"
		],
		"application/vnd.anser-web-funds-transfer-initiation": [
			"fti"
		],
		"application/vnd.antix.game-component": [
			"atx"
		],
		"application/vnd.apple.installer+xml": [
			"mpkg"
		],
		"application/vnd.apple.mpegurl": [
			"m3u8"
		],
		"application/vnd.aristanetworks.swi": [
			"swi"
		],
		"application/vnd.astraea-software.iota": [
			"iota"
		],
		"application/vnd.audiograph": [
			"aep"
		],
		"application/vnd.blueice.multipass": [
			"mpm"
		],
		"application/vnd.bmi": [
			"bmi"
		],
		"application/vnd.businessobjects": [
			"rep"
		],
		"application/vnd.chemdraw+xml": [
			"cdxml"
		],
		"application/vnd.chipnuts.karaoke-mmd": [
			"mmd"
		],
		"application/vnd.cinderella": [
			"cdy"
		],
		"application/vnd.claymore": [
			"cla"
		],
		"application/vnd.cloanto.rp9": [
			"rp9"
		],
		"application/vnd.clonk.c4group": [
			"c4g",
			"c4d",
			"c4f",
			"c4p",
			"c4u"
		],
		"application/vnd.cluetrust.cartomobile-config": [
			"c11amc"
		],
		"application/vnd.cluetrust.cartomobile-config-pkg": [
			"c11amz"
		],
		"application/vnd.commonspace": [
			"csp"
		],
		"application/vnd.contact.cmsg": [
			"cdbcmsg"
		],
		"application/vnd.cosmocaller": [
			"cmc"
		],
		"application/vnd.crick.clicker": [
			"clkx"
		],
		"application/vnd.crick.clicker.keyboard": [
			"clkk"
		],
		"application/vnd.crick.clicker.palette": [
			"clkp"
		],
		"application/vnd.crick.clicker.template": [
			"clkt"
		],
		"application/vnd.crick.clicker.wordbank": [
			"clkw"
		],
		"application/vnd.criticaltools.wbs+xml": [
			"wbs"
		],
		"application/vnd.ctc-posml": [
			"pml"
		],
		"application/vnd.cups-ppd": [
			"ppd"
		],
		"application/vnd.curl.car": [
			"car"
		],
		"application/vnd.curl.pcurl": [
			"pcurl"
		],
		"application/vnd.dart": [
			"dart"
		],
		"application/vnd.data-vision.rdz": [
			"rdz"
		],
		"application/vnd.dece.data": [
			"uvf",
			"uvvf",
			"uvd",
			"uvvd"
		],
		"application/vnd.dece.ttml+xml": [
			"uvt",
			"uvvt"
		],
		"application/vnd.dece.unspecified": [
			"uvx",
			"uvvx"
		],
		"application/vnd.dece.zip": [
			"uvz",
			"uvvz"
		],
		"application/vnd.denovo.fcselayout-link": [
			"fe_launch"
		],
		"application/vnd.dna": [
			"dna"
		],
		"application/vnd.dolby.mlp": [
			"mlp"
		],
		"application/vnd.dpgraph": [
			"dpg"
		],
		"application/vnd.dreamfactory": [
			"dfac"
		],
		"application/vnd.ds-keypoint": [
			"kpxx"
		],
		"application/vnd.dvb.ait": [
			"ait"
		],
		"application/vnd.dvb.service": [
			"svc"
		],
		"application/vnd.dynageo": [
			"geo"
		],
		"application/vnd.ecowin.chart": [
			"mag"
		],
		"application/vnd.enliven": [
			"nml"
		],
		"application/vnd.epson.esf": [
			"esf"
		],
		"application/vnd.epson.msf": [
			"msf"
		],
		"application/vnd.epson.quickanime": [
			"qam"
		],
		"application/vnd.epson.salt": [
			"slt"
		],
		"application/vnd.epson.ssf": [
			"ssf"
		],
		"application/vnd.eszigno3+xml": [
			"es3",
			"et3"
		],
		"application/vnd.ezpix-album": [
			"ez2"
		],
		"application/vnd.ezpix-package": [
			"ez3"
		],
		"application/vnd.fdf": [
			"fdf"
		],
		"application/vnd.fdsn.mseed": [
			"mseed"
		],
		"application/vnd.fdsn.seed": [
			"seed",
			"dataless"
		],
		"application/vnd.flographit": [
			"gph"
		],
		"application/vnd.fluxtime.clip": [
			"ftc"
		],
		"application/vnd.framemaker": [
			"fm",
			"frame",
			"maker",
			"book"
		],
		"application/vnd.frogans.fnc": [
			"fnc"
		],
		"application/vnd.frogans.ltf": [
			"ltf"
		],
		"application/vnd.fsc.weblaunch": [
			"fsc"
		],
		"application/vnd.fujitsu.oasys": [
			"oas"
		],
		"application/vnd.fujitsu.oasys2": [
			"oa2"
		],
		"application/vnd.fujitsu.oasys3": [
			"oa3"
		],
		"application/vnd.fujitsu.oasysgp": [
			"fg5"
		],
		"application/vnd.fujitsu.oasysprs": [
			"bh2"
		],
		"application/vnd.fujixerox.ddd": [
			"ddd"
		],
		"application/vnd.fujixerox.docuworks": [
			"xdw"
		],
		"application/vnd.fujixerox.docuworks.binder": [
			"xbd"
		],
		"application/vnd.fuzzysheet": [
			"fzs"
		],
		"application/vnd.genomatix.tuxedo": [
			"txd"
		],
		"application/vnd.geogebra.file": [
			"ggb"
		],
		"application/vnd.geogebra.tool": [
			"ggt"
		],
		"application/vnd.geometry-explorer": [
			"gex",
			"gre"
		],
		"application/vnd.geonext": [
			"gxt"
		],
		"application/vnd.geoplan": [
			"g2w"
		],
		"application/vnd.geospace": [
			"g3w"
		],
		"application/vnd.gmx": [
			"gmx"
		],
		"application/vnd.google-earth.kml+xml": [
			"kml"
		],
		"application/vnd.google-earth.kmz": [
			"kmz"
		],
		"application/vnd.grafeq": [
			"gqf",
			"gqs"
		],
		"application/vnd.groove-account": [
			"gac"
		],
		"application/vnd.groove-help": [
			"ghf"
		],
		"application/vnd.groove-identity-message": [
			"gim"
		],
		"application/vnd.groove-injector": [
			"grv"
		],
		"application/vnd.groove-tool-message": [
			"gtm"
		],
		"application/vnd.groove-tool-template": [
			"tpl"
		],
		"application/vnd.groove-vcard": [
			"vcg"
		],
		"application/vnd.hal+xml": [
			"hal"
		],
		"application/vnd.handheld-entertainment+xml": [
			"zmm"
		],
		"application/vnd.hbci": [
			"hbci"
		],
		"application/vnd.hhe.lesson-player": [
			"les"
		],
		"application/vnd.hp-hpgl": [
			"hpgl"
		],
		"application/vnd.hp-hpid": [
			"hpid"
		],
		"application/vnd.hp-hps": [
			"hps"
		],
		"application/vnd.hp-jlyt": [
			"jlt"
		],
		"application/vnd.hp-pcl": [
			"pcl"
		],
		"application/vnd.hp-pclxl": [
			"pclxl"
		],
		"application/vnd.ibm.minipay": [
			"mpy"
		],
		"application/vnd.ibm.modcap": [
			"afp",
			"listafp",
			"list3820"
		],
		"application/vnd.ibm.rights-management": [
			"irm"
		],
		"application/vnd.ibm.secure-container": [
			"sc"
		],
		"application/vnd.iccprofile": [
			"icc",
			"icm"
		],
		"application/vnd.igloader": [
			"igl"
		],
		"application/vnd.immervision-ivp": [
			"ivp"
		],
		"application/vnd.immervision-ivu": [
			"ivu"
		],
		"application/vnd.insors.igm": [
			"igm"
		],
		"application/vnd.intercon.formnet": [
			"xpw",
			"xpx"
		],
		"application/vnd.intergeo": [
			"i2g"
		],
		"application/vnd.intu.qbo": [
			"qbo"
		],
		"application/vnd.intu.qfx": [
			"qfx"
		],
		"application/vnd.ipunplugged.rcprofile": [
			"rcprofile"
		],
		"application/vnd.irepository.package+xml": [
			"irp"
		],
		"application/vnd.is-xpr": [
			"xpr"
		],
		"application/vnd.isac.fcs": [
			"fcs"
		],
		"application/vnd.jam": [
			"jam"
		],
		"application/vnd.jcp.javame.midlet-rms": [
			"rms"
		],
		"application/vnd.jisp": [
			"jisp"
		],
		"application/vnd.joost.joda-archive": [
			"joda"
		],
		"application/vnd.kahootz": [
			"ktz",
			"ktr"
		],
		"application/vnd.kde.karbon": [
			"karbon"
		],
		"application/vnd.kde.kchart": [
			"chrt"
		],
		"application/vnd.kde.kformula": [
			"kfo"
		],
		"application/vnd.kde.kivio": [
			"flw"
		],
		"application/vnd.kde.kontour": [
			"kon"
		],
		"application/vnd.kde.kpresenter": [
			"kpr",
			"kpt"
		],
		"application/vnd.kde.kspread": [
			"ksp"
		],
		"application/vnd.kde.kword": [
			"kwd",
			"kwt"
		],
		"application/vnd.kenameaapp": [
			"htke"
		],
		"application/vnd.kidspiration": [
			"kia"
		],
		"application/vnd.kinar": [
			"kne",
			"knp"
		],
		"application/vnd.koan": [
			"skp",
			"skd",
			"skt",
			"skm"
		],
		"application/vnd.kodak-descriptor": [
			"sse"
		],
		"application/vnd.las.las+xml": [
			"lasxml"
		],
		"application/vnd.llamagraphics.life-balance.desktop": [
			"lbd"
		],
		"application/vnd.llamagraphics.life-balance.exchange+xml": [
			"lbe"
		],
		"application/vnd.lotus-1-2-3": [
			"123"
		],
		"application/vnd.lotus-approach": [
			"apr"
		],
		"application/vnd.lotus-freelance": [
			"pre"
		],
		"application/vnd.lotus-notes": [
			"nsf"
		],
		"application/vnd.lotus-organizer": [
			"org"
		],
		"application/vnd.lotus-screencam": [
			"scm"
		],
		"application/vnd.lotus-wordpro": [
			"lwp"
		],
		"application/vnd.macports.portpkg": [
			"portpkg"
		],
		"application/vnd.mcd": [
			"mcd"
		],
		"application/vnd.medcalcdata": [
			"mc1"
		],
		"application/vnd.mediastation.cdkey": [
			"cdkey"
		],
		"application/vnd.mfer": [
			"mwf"
		],
		"application/vnd.mfmp": [
			"mfm"
		],
		"application/vnd.micrografx.flo": [
			"flo"
		],
		"application/vnd.micrografx.igx": [
			"igx"
		],
		"application/vnd.mif": [
			"mif"
		],
		"application/vnd.mobius.daf": [
			"daf"
		],
		"application/vnd.mobius.dis": [
			"dis"
		],
		"application/vnd.mobius.mbk": [
			"mbk"
		],
		"application/vnd.mobius.mqy": [
			"mqy"
		],
		"application/vnd.mobius.msl": [
			"msl"
		],
		"application/vnd.mobius.plc": [
			"plc"
		],
		"application/vnd.mobius.txf": [
			"txf"
		],
		"application/vnd.mophun.application": [
			"mpn"
		],
		"application/vnd.mophun.certificate": [
			"mpc"
		],
		"application/vnd.mozilla.xul+xml": [
			"xul"
		],
		"application/vnd.ms-artgalry": [
			"cil"
		],
		"application/vnd.ms-cab-compressed": [
			"cab"
		],
		"application/vnd.ms-excel": [
			"xls",
			"xlm",
			"xla",
			"xlc",
			"xlt",
			"xlw"
		],
		"application/vnd.ms-excel.addin.macroenabled.12": [
			"xlam"
		],
		"application/vnd.ms-excel.sheet.binary.macroenabled.12": [
			"xlsb"
		],
		"application/vnd.ms-excel.sheet.macroenabled.12": [
			"xlsm"
		],
		"application/vnd.ms-excel.template.macroenabled.12": [
			"xltm"
		],
		"application/vnd.ms-fontobject": [
			"eot"
		],
		"application/vnd.ms-htmlhelp": [
			"chm"
		],
		"application/vnd.ms-ims": [
			"ims"
		],
		"application/vnd.ms-lrm": [
			"lrm"
		],
		"application/vnd.ms-officetheme": [
			"thmx"
		],
		"application/vnd.ms-pki.seccat": [
			"cat"
		],
		"application/vnd.ms-pki.stl": [
			"stl"
		],
		"application/vnd.ms-powerpoint": [
			"ppt",
			"pps",
			"pot"
		],
		"application/vnd.ms-powerpoint.addin.macroenabled.12": [
			"ppam"
		],
		"application/vnd.ms-powerpoint.presentation.macroenabled.12": [
			"pptm"
		],
		"application/vnd.ms-powerpoint.slide.macroenabled.12": [
			"sldm"
		],
		"application/vnd.ms-powerpoint.slideshow.macroenabled.12": [
			"ppsm"
		],
		"application/vnd.ms-powerpoint.template.macroenabled.12": [
			"potm"
		],
		"application/vnd.ms-project": [
			"mpp",
			"mpt"
		],
		"application/vnd.ms-word.document.macroenabled.12": [
			"docm"
		],
		"application/vnd.ms-word.template.macroenabled.12": [
			"dotm"
		],
		"application/vnd.ms-works": [
			"wps",
			"wks",
			"wcm",
			"wdb"
		],
		"application/vnd.ms-wpl": [
			"wpl"
		],
		"application/vnd.ms-xpsdocument": [
			"xps"
		],
		"application/vnd.mseq": [
			"mseq"
		],
		"application/vnd.musician": [
			"mus"
		],
		"application/vnd.muvee.style": [
			"msty"
		],
		"application/vnd.mynfc": [
			"taglet"
		],
		"application/vnd.neurolanguage.nlu": [
			"nlu"
		],
		"application/vnd.nitf": [
			"ntf",
			"nitf"
		],
		"application/vnd.noblenet-directory": [
			"nnd"
		],
		"application/vnd.noblenet-sealer": [
			"nns"
		],
		"application/vnd.noblenet-web": [
			"nnw"
		],
		"application/vnd.nokia.n-gage.data": [
			"ngdat"
		],
		"application/vnd.nokia.radio-preset": [
			"rpst"
		],
		"application/vnd.nokia.radio-presets": [
			"rpss"
		],
		"application/vnd.novadigm.edm": [
			"edm"
		],
		"application/vnd.novadigm.edx": [
			"edx"
		],
		"application/vnd.novadigm.ext": [
			"ext"
		],
		"application/vnd.oasis.opendocument.chart": [
			"odc"
		],
		"application/vnd.oasis.opendocument.chart-template": [
			"otc"
		],
		"application/vnd.oasis.opendocument.database": [
			"odb"
		],
		"application/vnd.oasis.opendocument.formula": [
			"odf"
		],
		"application/vnd.oasis.opendocument.formula-template": [
			"odft"
		],
		"application/vnd.oasis.opendocument.graphics": [
			"odg"
		],
		"application/vnd.oasis.opendocument.graphics-template": [
			"otg"
		],
		"application/vnd.oasis.opendocument.image": [
			"odi"
		],
		"application/vnd.oasis.opendocument.image-template": [
			"oti"
		],
		"application/vnd.oasis.opendocument.presentation": [
			"odp"
		],
		"application/vnd.oasis.opendocument.presentation-template": [
			"otp"
		],
		"application/vnd.oasis.opendocument.spreadsheet": [
			"ods"
		],
		"application/vnd.oasis.opendocument.spreadsheet-template": [
			"ots"
		],
		"application/vnd.oasis.opendocument.text": [
			"odt"
		],
		"application/vnd.oasis.opendocument.text-master": [
			"odm"
		],
		"application/vnd.oasis.opendocument.text-template": [
			"ott"
		],
		"application/vnd.oasis.opendocument.text-web": [
			"oth"
		],
		"application/vnd.olpc-sugar": [
			"xo"
		],
		"application/vnd.oma.dd2+xml": [
			"dd2"
		],
		"application/vnd.openofficeorg.extension": [
			"oxt"
		],
		"application/vnd.openxmlformats-officedocument.presentationml.presentation": [
			"pptx"
		],
		"application/vnd.openxmlformats-officedocument.presentationml.slide": [
			"sldx"
		],
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow": [
			"ppsx"
		],
		"application/vnd.openxmlformats-officedocument.presentationml.template": [
			"potx"
		],
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
			"xlsx"
		],
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template": [
			"xltx"
		],
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
			"docx"
		],
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template": [
			"dotx"
		],
		"application/vnd.osgeo.mapguide.package": [
			"mgp"
		],
		"application/vnd.osgi.dp": [
			"dp"
		],
		"application/vnd.osgi.subsystem": [
			"esa"
		],
		"application/vnd.palm": [
			"pdb",
			"pqa",
			"oprc"
		],
		"application/vnd.pawaafile": [
			"paw"
		],
		"application/vnd.pg.format": [
			"str"
		],
		"application/vnd.pg.osasli": [
			"ei6"
		],
		"application/vnd.picsel": [
			"efif"
		],
		"application/vnd.pmi.widget": [
			"wg"
		],
		"application/vnd.pocketlearn": [
			"plf"
		],
		"application/vnd.powerbuilder6": [
			"pbd"
		],
		"application/vnd.previewsystems.box": [
			"box"
		],
		"application/vnd.proteus.magazine": [
			"mgz"
		],
		"application/vnd.publishare-delta-tree": [
			"qps"
		],
		"application/vnd.pvi.ptid1": [
			"ptid"
		],
		"application/vnd.quark.quarkxpress": [
			"qxd",
			"qxt",
			"qwd",
			"qwt",
			"qxl",
			"qxb"
		],
		"application/vnd.realvnc.bed": [
			"bed"
		],
		"application/vnd.recordare.musicxml": [
			"mxl"
		],
		"application/vnd.recordare.musicxml+xml": [
			"musicxml"
		],
		"application/vnd.rig.cryptonote": [
			"cryptonote"
		],
		"application/vnd.rim.cod": [
			"cod"
		],
		"application/vnd.rn-realmedia": [
			"rm"
		],
		"application/vnd.rn-realmedia-vbr": [
			"rmvb"
		],
		"application/vnd.route66.link66+xml": [
			"link66"
		],
		"application/vnd.sailingtracker.track": [
			"st"
		],
		"application/vnd.seemail": [
			"see"
		],
		"application/vnd.sema": [
			"sema"
		],
		"application/vnd.semd": [
			"semd"
		],
		"application/vnd.semf": [
			"semf"
		],
		"application/vnd.shana.informed.formdata": [
			"ifm"
		],
		"application/vnd.shana.informed.formtemplate": [
			"itp"
		],
		"application/vnd.shana.informed.interchange": [
			"iif"
		],
		"application/vnd.shana.informed.package": [
			"ipk"
		],
		"application/vnd.simtech-mindmapper": [
			"twd",
			"twds"
		],
		"application/vnd.smaf": [
			"mmf"
		],
		"application/vnd.smart.teacher": [
			"teacher"
		],
		"application/vnd.solent.sdkm+xml": [
			"sdkm",
			"sdkd"
		],
		"application/vnd.spotfire.dxp": [
			"dxp"
		],
		"application/vnd.spotfire.sfs": [
			"sfs"
		],
		"application/vnd.stardivision.calc": [
			"sdc"
		],
		"application/vnd.stardivision.draw": [
			"sda"
		],
		"application/vnd.stardivision.impress": [
			"sdd"
		],
		"application/vnd.stardivision.math": [
			"smf"
		],
		"application/vnd.stardivision.writer": [
			"sdw",
			"vor"
		],
		"application/vnd.stardivision.writer-global": [
			"sgl"
		],
		"application/vnd.stepmania.package": [
			"smzip"
		],
		"application/vnd.stepmania.stepchart": [
			"sm"
		],
		"application/vnd.sun.xml.calc": [
			"sxc"
		],
		"application/vnd.sun.xml.calc.template": [
			"stc"
		],
		"application/vnd.sun.xml.draw": [
			"sxd"
		],
		"application/vnd.sun.xml.draw.template": [
			"std"
		],
		"application/vnd.sun.xml.impress": [
			"sxi"
		],
		"application/vnd.sun.xml.impress.template": [
			"sti"
		],
		"application/vnd.sun.xml.math": [
			"sxm"
		],
		"application/vnd.sun.xml.writer": [
			"sxw"
		],
		"application/vnd.sun.xml.writer.global": [
			"sxg"
		],
		"application/vnd.sun.xml.writer.template": [
			"stw"
		],
		"application/vnd.sus-calendar": [
			"sus",
			"susp"
		],
		"application/vnd.svd": [
			"svd"
		],
		"application/vnd.symbian.install": [
			"sis",
			"sisx"
		],
		"application/vnd.syncml+xml": [
			"xsm"
		],
		"application/vnd.syncml.dm+wbxml": [
			"bdm"
		],
		"application/vnd.syncml.dm+xml": [
			"xdm"
		],
		"application/vnd.tao.intent-module-archive": [
			"tao"
		],
		"application/vnd.tcpdump.pcap": [
			"pcap",
			"cap",
			"dmp"
		],
		"application/vnd.tmobile-livetv": [
			"tmo"
		],
		"application/vnd.trid.tpt": [
			"tpt"
		],
		"application/vnd.triscape.mxs": [
			"mxs"
		],
		"application/vnd.trueapp": [
			"tra"
		],
		"application/vnd.ufdl": [
			"ufd",
			"ufdl"
		],
		"application/vnd.uiq.theme": [
			"utz"
		],
		"application/vnd.umajin": [
			"umj"
		],
		"application/vnd.unity": [
			"unityweb"
		],
		"application/vnd.uoml+xml": [
			"uoml"
		],
		"application/vnd.vcx": [
			"vcx"
		],
		"application/vnd.visio": [
			"vsd",
			"vst",
			"vss",
			"vsw"
		],
		"application/vnd.visionary": [
			"vis"
		],
		"application/vnd.vsf": [
			"vsf"
		],
		"application/vnd.wap.wbxml": [
			"wbxml"
		],
		"application/vnd.wap.wmlc": [
			"wmlc"
		],
		"application/vnd.wap.wmlscriptc": [
			"wmlsc"
		],
		"application/vnd.webturbo": [
			"wtb"
		],
		"application/vnd.wolfram.player": [
			"nbp"
		],
		"application/vnd.wordperfect": [
			"wpd"
		],
		"application/vnd.wqd": [
			"wqd"
		],
		"application/vnd.wt.stf": [
			"stf"
		],
		"application/vnd.xara": [
			"xar"
		],
		"application/vnd.xfdl": [
			"xfdl"
		],
		"application/vnd.yamaha.hv-dic": [
			"hvd"
		],
		"application/vnd.yamaha.hv-script": [
			"hvs"
		],
		"application/vnd.yamaha.hv-voice": [
			"hvp"
		],
		"application/vnd.yamaha.openscoreformat": [
			"osf"
		],
		"application/vnd.yamaha.openscoreformat.osfpvg+xml": [
			"osfpvg"
		],
		"application/vnd.yamaha.smaf-audio": [
			"saf"
		],
		"application/vnd.yamaha.smaf-phrase": [
			"spf"
		],
		"application/vnd.yellowriver-custom-menu": [
			"cmp"
		],
		"application/vnd.zul": [
			"zir",
			"zirz"
		],
		"application/vnd.zzazz.deck+xml": [
			"zaz"
		],
		"application/voicexml+xml": [
			"vxml"
		],
		"application/widget": [
			"wgt"
		],
		"application/winhlp": [
			"hlp"
		],
		"application/wsdl+xml": [
			"wsdl"
		],
		"application/wspolicy+xml": [
			"wspolicy"
		],
		"application/x-7z-compressed": [
			"7z"
		],
		"application/x-abiword": [
			"abw"
		],
		"application/x-ace-compressed": [
			"ace"
		],
		"application/x-apple-diskimage": [
			"dmg"
		],
		"application/x-authorware-bin": [
			"aab",
			"x32",
			"u32",
			"vox"
		],
		"application/x-authorware-map": [
			"aam"
		],
		"application/x-authorware-seg": [
			"aas"
		],
		"application/x-bcpio": [
			"bcpio"
		],
		"application/x-bittorrent": [
			"torrent"
		],
		"application/x-blorb": [
			"blb",
			"blorb"
		],
		"application/x-bzip": [
			"bz"
		],
		"application/x-bzip2": [
			"bz2",
			"boz"
		],
		"application/x-cbr": [
			"cbr",
			"cba",
			"cbt",
			"cbz",
			"cb7"
		],
		"application/x-cdlink": [
			"vcd"
		],
		"application/x-cfs-compressed": [
			"cfs"
		],
		"application/x-chat": [
			"chat"
		],
		"application/x-chess-pgn": [
			"pgn"
		],
		"application/x-chrome-extension": [
			"crx"
		],
		"application/x-conference": [
			"nsc"
		],
		"application/x-cpio": [
			"cpio"
		],
		"application/x-csh": [
			"csh"
		],
		"application/x-debian-package": [
			"deb",
			"udeb"
		],
		"application/x-dgc-compressed": [
			"dgc"
		],
		"application/x-director": [
			"dir",
			"dcr",
			"dxr",
			"cst",
			"cct",
			"cxt",
			"w3d",
			"fgd",
			"swa"
		],
		"application/x-doom": [
			"wad"
		],
		"application/x-dtbncx+xml": [
			"ncx"
		],
		"application/x-dtbook+xml": [
			"dtb"
		],
		"application/x-dtbresource+xml": [
			"res"
		],
		"application/x-dvi": [
			"dvi"
		],
		"application/x-envoy": [
			"evy"
		],
		"application/x-eva": [
			"eva"
		],
		"application/x-font-bdf": [
			"bdf"
		],
		"application/x-font-ghostscript": [
			"gsf"
		],
		"application/x-font-linux-psf": [
			"psf"
		],
		"application/x-font-otf": [
			"otf"
		],
		"application/x-font-pcf": [
			"pcf"
		],
		"application/x-font-snf": [
			"snf"
		],
		"application/x-font-ttf": [
			"ttf",
			"ttc"
		],
		"application/x-font-type1": [
			"pfa",
			"pfb",
			"pfm",
			"afm"
		],
		"application/x-freearc": [
			"arc"
		],
		"application/x-futuresplash": [
			"spl"
		],
		"application/x-gca-compressed": [
			"gca"
		],
		"application/x-glulx": [
			"ulx"
		],
		"application/x-gnumeric": [
			"gnumeric"
		],
		"application/x-gramps-xml": [
			"gramps"
		],
		"application/x-gtar": [
			"gtar"
		],
		"application/x-hdf": [
			"hdf"
		],
		"application/x-install-instructions": [
			"install"
		],
		"application/x-iso9660-image": [
			"iso"
		],
		"application/x-java-jnlp-file": [
			"jnlp"
		],
		"application/x-latex": [
			"latex"
		],
		"application/x-lua-bytecode": [
			"luac"
		],
		"application/x-lzh-compressed": [
			"lzh",
			"lha"
		],
		"application/x-mie": [
			"mie"
		],
		"application/x-mobipocket-ebook": [
			"prc",
			"mobi"
		],
		"application/x-ms-application": [
			"application"
		],
		"application/x-ms-shortcut": [
			"lnk"
		],
		"application/x-ms-wmd": [
			"wmd"
		],
		"application/x-ms-wmz": [
			"wmz"
		],
		"application/x-ms-xbap": [
			"xbap"
		],
		"application/x-msaccess": [
			"mdb"
		],
		"application/x-msbinder": [
			"obd"
		],
		"application/x-mscardfile": [
			"crd"
		],
		"application/x-msclip": [
			"clp"
		],
		"application/x-msdownload": [
			"exe",
			"dll",
			"com",
			"bat",
			"msi"
		],
		"application/x-msmediaview": [
			"mvb",
			"m13",
			"m14"
		],
		"application/x-msmetafile": [
			"wmf",
			"wmz",
			"emf",
			"emz"
		],
		"application/x-msmoney": [
			"mny"
		],
		"application/x-mspublisher": [
			"pub"
		],
		"application/x-msschedule": [
			"scd"
		],
		"application/x-msterminal": [
			"trm"
		],
		"application/x-mswrite": [
			"wri"
		],
		"application/x-netcdf": [
			"nc",
			"cdf"
		],
		"application/x-nzb": [
			"nzb"
		],
		"application/x-pkcs12": [
			"p12",
			"pfx"
		],
		"application/x-pkcs7-certificates": [
			"p7b",
			"spc"
		],
		"application/x-pkcs7-certreqresp": [
			"p7r"
		],
		"application/x-rar-compressed": [
			"rar"
		],
		"application/x-research-info-systems": [
			"ris"
		],
		"application/x-sh": [
			"sh"
		],
		"application/x-shar": [
			"shar"
		],
		"application/x-shockwave-flash": [
			"swf"
		],
		"application/x-silverlight-app": [
			"xap"
		],
		"application/x-sql": [
			"sql"
		],
		"application/x-stuffit": [
			"sit"
		],
		"application/x-stuffitx": [
			"sitx"
		],
		"application/x-subrip": [
			"srt"
		],
		"application/x-sv4cpio": [
			"sv4cpio"
		],
		"application/x-sv4crc": [
			"sv4crc"
		],
		"application/x-t3vm-image": [
			"t3"
		],
		"application/x-tads": [
			"gam"
		],
		"application/x-tar": [
			"tar"
		],
		"application/x-tcl": [
			"tcl"
		],
		"application/x-tex": [
			"tex"
		],
		"application/x-tex-tfm": [
			"tfm"
		],
		"application/x-texinfo": [
			"texinfo",
			"texi"
		],
		"application/x-tgif": [
			"obj"
		],
		"application/x-ustar": [
			"ustar"
		],
		"application/x-wais-source": [
			"src"
		],
		"application/x-web-app-manifest+json": [
			"webapp"
		],
		"application/x-x509-ca-cert": [
			"der",
			"crt"
		],
		"application/x-xfig": [
			"fig"
		],
		"application/x-xliff+xml": [
			"xlf"
		],
		"application/x-xpinstall": [
			"xpi"
		],
		"application/x-xz": [
			"xz"
		],
		"application/x-zmachine": [
			"z1",
			"z2",
			"z3",
			"z4",
			"z5",
			"z6",
			"z7",
			"z8"
		],
		"application/xaml+xml": [
			"xaml"
		],
		"application/xcap-diff+xml": [
			"xdf"
		],
		"application/xenc+xml": [
			"xenc"
		],
		"application/xhtml+xml": [
			"xhtml",
			"xht"
		],
		"application/xml": [
			"xml",
			"xsl",
			"xsd"
		],
		"application/xml-dtd": [
			"dtd"
		],
		"application/xop+xml": [
			"xop"
		],
		"application/xproc+xml": [
			"xpl"
		],
		"application/xslt+xml": [
			"xslt"
		],
		"application/xspf+xml": [
			"xspf"
		],
		"application/xv+xml": [
			"mxml",
			"xhvml",
			"xvml",
			"xvm"
		],
		"application/yang": [
			"yang"
		],
		"application/yin+xml": [
			"yin"
		],
		"application/zip": [
			"zip"
		],
		"audio/adpcm": [
			"adp"
		],
		"audio/basic": [
			"au",
			"snd"
		],
		"audio/midi": [
			"mid",
			"midi",
			"kar",
			"rmi"
		],
		"audio/mp4": [
			"mp4a",
			"m4a"
		],
		"audio/mpeg": [
			"mpga",
			"mp2",
			"mp2a",
			"mp3",
			"m2a",
			"m3a"
		],
		"audio/ogg": [
			"oga",
			"ogg",
			"spx"
		],
		"audio/s3m": [
			"s3m"
		],
		"audio/silk": [
			"sil"
		],
		"audio/vnd.dece.audio": [
			"uva",
			"uvva"
		],
		"audio/vnd.digital-winds": [
			"eol"
		],
		"audio/vnd.dra": [
			"dra"
		],
		"audio/vnd.dts": [
			"dts"
		],
		"audio/vnd.dts.hd": [
			"dtshd"
		],
		"audio/vnd.lucent.voice": [
			"lvp"
		],
		"audio/vnd.ms-playready.media.pya": [
			"pya"
		],
		"audio/vnd.nuera.ecelp4800": [
			"ecelp4800"
		],
		"audio/vnd.nuera.ecelp7470": [
			"ecelp7470"
		],
		"audio/vnd.nuera.ecelp9600": [
			"ecelp9600"
		],
		"audio/vnd.rip": [
			"rip"
		],
		"audio/webm": [
			"weba"
		],
		"audio/x-aac": [
			"aac"
		],
		"audio/x-aiff": [
			"aif",
			"aiff",
			"aifc"
		],
		"audio/x-caf": [
			"caf"
		],
		"audio/x-flac": [
			"flac"
		],
		"audio/x-matroska": [
			"mka"
		],
		"audio/x-mpegurl": [
			"m3u"
		],
		"audio/x-ms-wax": [
			"wax"
		],
		"audio/x-ms-wma": [
			"wma"
		],
		"audio/x-pn-realaudio": [
			"ram",
			"ra"
		],
		"audio/x-pn-realaudio-plugin": [
			"rmp"
		],
		"audio/x-wav": [
			"wav"
		],
		"audio/xm": [
			"xm"
		],
		"chemical/x-cdx": [
			"cdx"
		],
		"chemical/x-cif": [
			"cif"
		],
		"chemical/x-cmdf": [
			"cmdf"
		],
		"chemical/x-cml": [
			"cml"
		],
		"chemical/x-csml": [
			"csml"
		],
		"chemical/x-xyz": [
			"xyz"
		],
		"font/opentype": [
			"otf"
		],
		"image/bmp": [
			"bmp"
		],
		"image/cgm": [
			"cgm"
		],
		"image/g3fax": [
			"g3"
		],
		"image/gif": [
			"gif"
		],
		"image/ief": [
			"ief"
		],
		"image/jpeg": [
			"jpeg",
			"jpg",
			"jpe"
		],
		"image/ktx": [
			"ktx"
		],
		"image/png": [
			"png"
		],
		"image/prs.btif": [
			"btif"
		],
		"image/sgi": [
			"sgi"
		],
		"image/svg+xml": [
			"svg",
			"svgz"
		],
		"image/tiff": [
			"tiff",
			"tif"
		],
		"image/vnd.adobe.photoshop": [
			"psd"
		],
		"image/vnd.dece.graphic": [
			"uvi",
			"uvvi",
			"uvg",
			"uvvg"
		],
		"image/vnd.djvu": [
			"djvu",
			"djv"
		],
		"image/vnd.dvb.subtitle": [
			"sub"
		],
		"image/vnd.dwg": [
			"dwg"
		],
		"image/vnd.dxf": [
			"dxf"
		],
		"image/vnd.fastbidsheet": [
			"fbs"
		],
		"image/vnd.fpx": [
			"fpx"
		],
		"image/vnd.fst": [
			"fst"
		],
		"image/vnd.fujixerox.edmics-mmr": [
			"mmr"
		],
		"image/vnd.fujixerox.edmics-rlc": [
			"rlc"
		],
		"image/vnd.ms-modi": [
			"mdi"
		],
		"image/vnd.ms-photo": [
			"wdp"
		],
		"image/vnd.net-fpx": [
			"npx"
		],
		"image/vnd.wap.wbmp": [
			"wbmp"
		],
		"image/vnd.xiff": [
			"xif"
		],
		"image/webp": [
			"webp"
		],
		"image/x-3ds": [
			"3ds"
		],
		"image/x-cmu-raster": [
			"ras"
		],
		"image/x-cmx": [
			"cmx"
		],
		"image/x-freehand": [
			"fh",
			"fhc",
			"fh4",
			"fh5",
			"fh7"
		],
		"image/x-icon": [
			"ico"
		],
		"image/x-mrsid-image": [
			"sid"
		],
		"image/x-pcx": [
			"pcx"
		],
		"image/x-pict": [
			"pic",
			"pct"
		],
		"image/x-portable-anymap": [
			"pnm"
		],
		"image/x-portable-bitmap": [
			"pbm"
		],
		"image/x-portable-graymap": [
			"pgm"
		],
		"image/x-portable-pixmap": [
			"ppm"
		],
		"image/x-rgb": [
			"rgb"
		],
		"image/x-tga": [
			"tga"
		],
		"image/x-xbitmap": [
			"xbm"
		],
		"image/x-xpixmap": [
			"xpm"
		],
		"image/x-xwindowdump": [
			"xwd"
		],
		"message/rfc822": [
			"eml",
			"mime"
		],
		"model/iges": [
			"igs",
			"iges"
		],
		"model/mesh": [
			"msh",
			"mesh",
			"silo"
		],
		"model/vnd.collada+xml": [
			"dae"
		],
		"model/vnd.dwf": [
			"dwf"
		],
		"model/vnd.gdl": [
			"gdl"
		],
		"model/vnd.gtw": [
			"gtw"
		],
		"model/vnd.mts": [
			"mts"
		],
		"model/vnd.vtu": [
			"vtu"
		],
		"model/vrml": [
			"wrl",
			"vrml"
		],
		"model/x3d+binary": [
			"x3db",
			"x3dbz"
		],
		"model/x3d+vrml": [
			"x3dv",
			"x3dvz"
		],
		"model/x3d+xml": [
			"x3d",
			"x3dz"
		],
		"text/cache-manifest": [
			"appcache",
			"manifest"
		],
		"text/calendar": [
			"ics",
			"ifb"
		],
		"text/coffeescript": [
			"coffee"
		],
		"text/css": [
			"css"
		],
		"text/csv": [
			"csv"
		],
		"text/hjson": [
			"hjson"
		],
		"text/html": [
			"html",
			"htm"
		],
		"text/jade": [
			"jade"
		],
		"text/jsx": [
			"jsx"
		],
		"text/less": [
			"less"
		],
		"text/n3": [
			"n3"
		],
		"text/plain": [
			"txt",
			"text",
			"conf",
			"def",
			"list",
			"log",
			"in",
			"ini"
		],
		"text/prs.lines.tag": [
			"dsc"
		],
		"text/richtext": [
			"rtx"
		],
		"text/sgml": [
			"sgml",
			"sgm"
		],
		"text/stylus": [
			"stylus",
			"styl"
		],
		"text/tab-separated-values": [
			"tsv"
		],
		"text/troff": [
			"t",
			"tr",
			"roff",
			"man",
			"me",
			"ms"
		],
		"text/turtle": [
			"ttl"
		],
		"text/uri-list": [
			"uri",
			"uris",
			"urls"
		],
		"text/vcard": [
			"vcard"
		],
		"text/vnd.curl": [
			"curl"
		],
		"text/vnd.curl.dcurl": [
			"dcurl"
		],
		"text/vnd.curl.mcurl": [
			"mcurl"
		],
		"text/vnd.curl.scurl": [
			"scurl"
		],
		"text/vnd.dvb.subtitle": [
			"sub"
		],
		"text/vnd.fly": [
			"fly"
		],
		"text/vnd.fmi.flexstor": [
			"flx"
		],
		"text/vnd.graphviz": [
			"gv"
		],
		"text/vnd.in3d.3dml": [
			"3dml"
		],
		"text/vnd.in3d.spot": [
			"spot"
		],
		"text/vnd.sun.j2me.app-descriptor": [
			"jad"
		],
		"text/vnd.wap.wml": [
			"wml"
		],
		"text/vnd.wap.wmlscript": [
			"wmls"
		],
		"text/vtt": [
			"vtt"
		],
		"text/x-asm": [
			"s",
			"asm"
		],
		"text/x-c": [
			"c",
			"cc",
			"cxx",
			"cpp",
			"h",
			"hh",
			"dic"
		],
		"text/x-component": [
			"htc"
		],
		"text/x-fortran": [
			"f",
			"for",
			"f77",
			"f90"
		],
		"text/x-handlebars-template": [
			"hbs"
		],
		"text/x-java-source": [
			"java"
		],
		"text/x-lua": [
			"lua"
		],
		"text/x-markdown": [
			"markdown",
			"md",
			"mkd"
		],
		"text/x-nfo": [
			"nfo"
		],
		"text/x-opml": [
			"opml"
		],
		"text/x-pascal": [
			"p",
			"pas"
		],
		"text/x-sass": [
			"sass"
		],
		"text/x-scss": [
			"scss"
		],
		"text/x-setext": [
			"etx"
		],
		"text/x-sfv": [
			"sfv"
		],
		"text/x-uuencode": [
			"uu"
		],
		"text/x-vcalendar": [
			"vcs"
		],
		"text/x-vcard": [
			"vcf"
		],
		"text/yaml": [
			"yaml",
			"yml"
		],
		"video/3gpp": [
			"3gp"
		],
		"video/3gpp2": [
			"3g2"
		],
		"video/h261": [
			"h261"
		],
		"video/h263": [
			"h263"
		],
		"video/h264": [
			"h264"
		],
		"video/jpeg": [
			"jpgv"
		],
		"video/jpm": [
			"jpm",
			"jpgm"
		],
		"video/mj2": [
			"mj2",
			"mjp2"
		],
		"video/mp2t": [
			"ts"
		],
		"video/mp4": [
			"mp4",
			"mp4v",
			"mpg4"
		],
		"video/mpeg": [
			"mpeg",
			"mpg",
			"mpe",
			"m1v",
			"m2v"
		],
		"video/ogg": [
			"ogv"
		],
		"video/quicktime": [
			"qt",
			"mov"
		],
		"video/vnd.dece.hd": [
			"uvh",
			"uvvh"
		],
		"video/vnd.dece.mobile": [
			"uvm",
			"uvvm"
		],
		"video/vnd.dece.pd": [
			"uvp",
			"uvvp"
		],
		"video/vnd.dece.sd": [
			"uvs",
			"uvvs"
		],
		"video/vnd.dece.video": [
			"uvv",
			"uvvv"
		],
		"video/vnd.dvb.file": [
			"dvb"
		],
		"video/vnd.fvt": [
			"fvt"
		],
		"video/vnd.mpegurl": [
			"mxu",
			"m4u"
		],
		"video/vnd.ms-playready.media.pyv": [
			"pyv"
		],
		"video/vnd.uvvu.mp4": [
			"uvu",
			"uvvu"
		],
		"video/vnd.vivo": [
			"viv"
		],
		"video/webm": [
			"webm"
		],
		"video/x-f4v": [
			"f4v"
		],
		"video/x-fli": [
			"fli"
		],
		"video/x-flv": [
			"flv"
		],
		"video/x-m4v": [
			"m4v"
		],
		"video/x-matroska": [
			"mkv",
			"mk3d",
			"mks"
		],
		"video/x-mng": [
			"mng"
		],
		"video/x-ms-asf": [
			"asf",
			"asx"
		],
		"video/x-ms-vob": [
			"vob"
		],
		"video/x-ms-wm": [
			"wm"
		],
		"video/x-ms-wmv": [
			"wmv"
		],
		"video/x-ms-wmx": [
			"wmx"
		],
		"video/x-ms-wvx": [
			"wvx"
		],
		"video/x-msvideo": [
			"avi"
		],
		"video/x-sgi-movie": [
			"movie"
		],
		"video/x-smv": [
			"smv"
		],
		"x-conference/x-cooltalk": [
			"ice"
		]
	};

/***/ },
/* 117 */
/***/ function(module, exports) {

	/*!
	 * range-parser
	 * Copyright(c) 2012-2014 TJ Holowaychuk
	 * Copyright(c) 2015-2016 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = rangeParser
	
	/**
	 * Parse "Range" header `str` relative to the given file `size`.
	 *
	 * @param {Number} size
	 * @param {String} str
	 * @param {Object} [options]
	 * @return {Array}
	 * @public
	 */
	
	function rangeParser (size, str, options) {
	  var index = str.indexOf('=')
	
	  if (index === -1) {
	    return -2
	  }
	
	  // split the range string
	  var arr = str.slice(index + 1).split(',')
	  var ranges = []
	
	  // add ranges type
	  ranges.type = str.slice(0, index)
	
	  // parse all ranges
	  for (var i = 0; i < arr.length; i++) {
	    var range = arr[i].split('-')
	    var start = parseInt(range[0], 10)
	    var end = parseInt(range[1], 10)
	
	    // -nnn
	    if (isNaN(start)) {
	      start = size - end
	      end = size - 1
	    // nnn-
	    } else if (isNaN(end)) {
	      end = size - 1
	    }
	
	    // limit last-byte-pos to current length
	    if (end > size - 1) {
	      end = size - 1
	    }
	
	    // invalid or unsatisifiable
	    if (isNaN(start) || isNaN(end) || start > end || start < 0) {
	      continue
	    }
	
	    // add range
	    ranges.push({
	      start: start,
	      end: end
	    })
	  }
	
	  if (ranges.length < 1) {
	    // unsatisifiable
	    return -1
	  }
	
	  return options && options.combine
	    ? combineRanges(ranges)
	    : ranges
	}
	
	/**
	 * Combine overlapping & adjacent ranges.
	 * @private
	 */
	
	function combineRanges (ranges) {
	  var ordered = ranges.map(mapWithIndex).sort(sortByRangeStart)
	
	  for (var j = 0, i = 1; i < ordered.length; i++) {
	    var range = ordered[i]
	    var current = ordered[j]
	
	    if (range.start > current.end + 1) {
	      // next range
	      ordered[++j] = range
	    } else if (range.end > current.end) {
	      // extend range
	      current.end = range.end
	      current.index = Math.min(current.index, range.index)
	    }
	  }
	
	  // trim ordered array
	  ordered.length = j + 1
	
	  // generate combined range
	  var combined = ordered.sort(sortByRangeIndex).map(mapWithoutIndex)
	
	  // copy ranges type
	  combined.type = ranges.type
	
	  return combined
	}
	
	/**
	 * Map function to add index value to ranges.
	 * @private
	 */
	
	function mapWithIndex (range, index) {
	  return {
	    start: range.start,
	    end: range.end,
	    index: index
	  }
	}
	
	/**
	 * Map function to remove index value from ranges.
	 * @private
	 */
	
	function mapWithoutIndex (range) {
	  return {
	    start: range.start,
	    end: range.end
	  }
	}
	
	/**
	 * Sort function to sort ranges by index.
	 * @private
	 */
	
	function sortByRangeIndex (a, b) {
	  return a.index - b.index
	}
	
	/**
	 * Sort function to sort ranges by start position.
	 * @private
	 */
	
	function sortByRangeStart (a, b) {
	  return a.start - b.start
	}


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * proxy-addr
	 * Copyright(c) 2014-2016 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module exports.
	 */
	
	module.exports = proxyaddr;
	module.exports.all = alladdrs;
	module.exports.compile = compile;
	
	/**
	 * Module dependencies.
	 */
	
	var forwarded = __webpack_require__(119);
	var ipaddr = __webpack_require__(120);
	
	/**
	 * Variables.
	 */
	
	var digitre = /^[0-9]+$/;
	var isip = ipaddr.isValid;
	var parseip = ipaddr.parse;
	
	/**
	 * Pre-defined IP ranges.
	 */
	
	var ipranges = {
	  linklocal: ['169.254.0.0/16', 'fe80::/10'],
	  loopback: ['127.0.0.1/8', '::1/128'],
	  uniquelocal: ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', 'fc00::/7']
	};
	
	/**
	 * Get all addresses in the request, optionally stopping
	 * at the first untrusted.
	 *
	 * @param {Object} request
	 * @param {Function|Array|String} [trust]
	 * @api public
	 */
	
	function alladdrs(req, trust) {
	  // get addresses
	  var addrs = forwarded(req);
	
	  if (!trust) {
	    // Return all addresses
	    return addrs;
	  }
	
	  if (typeof trust !== 'function') {
	    trust = compile(trust);
	  }
	
	  for (var i = 0; i < addrs.length - 1; i++) {
	    if (trust(addrs[i], i)) continue;
	
	    addrs.length = i + 1;
	  }
	
	  return addrs;
	}
	
	/**
	 * Compile argument into trust function.
	 *
	 * @param {Array|String} val
	 * @api private
	 */
	
	function compile(val) {
	  if (!val) {
	    throw new TypeError('argument is required');
	  }
	
	  var trust = typeof val === 'string'
	    ? [val]
	    : val;
	
	  if (!Array.isArray(trust)) {
	    throw new TypeError('unsupported trust argument');
	  }
	
	  for (var i = 0; i < trust.length; i++) {
	    val = trust[i];
	
	    if (!ipranges.hasOwnProperty(val)) {
	      continue;
	    }
	
	    // Splice in pre-defined range
	    val = ipranges[val];
	    trust.splice.apply(trust, [i, 1].concat(val));
	    i += val.length - 1;
	  }
	
	  return compileTrust(compileRangeSubnets(trust));
	}
	
	/**
	 * Compile `arr` elements into range subnets.
	 *
	 * @param {Array} arr
	 * @api private
	 */
	
	function compileRangeSubnets(arr) {
	  var rangeSubnets = new Array(arr.length);
	
	  for (var i = 0; i < arr.length; i++) {
	    rangeSubnets[i] = parseipNotation(arr[i]);
	  }
	
	  return rangeSubnets;
	}
	
	/**
	 * Compile range subnet array into trust function.
	 *
	 * @param {Array} rangeSubnets
	 * @api private
	 */
	
	function compileTrust(rangeSubnets) {
	  // Return optimized function based on length
	  var len = rangeSubnets.length;
	  return len === 0
	    ? trustNone
	    : len === 1
	    ? trustSingle(rangeSubnets[0])
	    : trustMulti(rangeSubnets);
	}
	
	/**
	 * Parse IP notation string into range subnet.
	 *
	 * @param {String} note
	 * @api private
	 */
	
	function parseipNotation(note) {
	  var pos = note.lastIndexOf('/');
	  var str = pos !== -1
	    ? note.substring(0, pos)
	    : note;
	
	  if (!isip(str)) {
	    throw new TypeError('invalid IP address: ' + str);
	  }
	
	  var ip = parseip(str);
	
	  if (pos === -1 && ip.kind() === 'ipv6' && ip.isIPv4MappedAddress()) {
	    // Store as IPv4
	    ip = ip.toIPv4Address();
	  }
	
	  var max = ip.kind() === 'ipv6'
	    ? 128
	    : 32;
	
	  var range = pos !== -1
	    ? note.substring(pos + 1, note.length)
	    : null;
	
	  if (range === null) {
	    range = max;
	  } else if (digitre.test(range)) {
	    range = parseInt(range, 10);
	  } else if (ip.kind() === 'ipv4' && isip(range)) {
	    range = parseNetmask(range);
	  } else {
	    range = null;
	  }
	
	  if (range <= 0 || range > max) {
	    throw new TypeError('invalid range on address: ' + note);
	  }
	
	  return [ip, range];
	}
	
	/**
	 * Parse netmask string into CIDR range.
	 *
	 * @param {String} netmask
	 * @api private
	 */
	
	function parseNetmask(netmask) {
	  var ip = parseip(netmask);
	  var kind = ip.kind();
	
	  return kind === 'ipv4'
	    ? ip.prefixLengthFromSubnetMask()
	    : null;
	}
	
	/**
	 * Determine address of proxied request.
	 *
	 * @param {Object} request
	 * @param {Function|Array|String} trust
	 * @api public
	 */
	
	function proxyaddr(req, trust) {
	  if (!req) {
	    throw new TypeError('req argument is required');
	  }
	
	  if (!trust) {
	    throw new TypeError('trust argument is required');
	  }
	
	  var addrs = alladdrs(req, trust);
	  var addr = addrs[addrs.length - 1];
	
	  return addr;
	}
	
	/**
	 * Static trust function to trust nothing.
	 *
	 * @api private
	 */
	
	function trustNone() {
	  return false;
	}
	
	/**
	 * Compile trust function for multiple subnets.
	 *
	 * @param {Array} subnets
	 * @api private
	 */
	
	function trustMulti(subnets) {
	  return function trust(addr) {
	    if (!isip(addr)) return false;
	
	    var ip = parseip(addr);
	    var ipconv;
	    var kind = ip.kind();
	
	    for (var i = 0; i < subnets.length; i++) {
	      var subnet = subnets[i];
	      var subnetip = subnet[0];
	      var subnetkind = subnetip.kind();
	      var subnetrange = subnet[1];
	      var trusted = ip;
	
	      if (kind !== subnetkind) {
	        if (subnetkind === 'ipv4' && !ip.isIPv4MappedAddress()) {
	          // Incompatible IP addresses
	          continue;
	        }
	
	        if (!ipconv) {
	          // Convert IP to match subnet IP kind
	          ipconv = subnetkind === 'ipv4'
	            ? ip.toIPv4Address()
	            : ip.toIPv4MappedAddress();
	        }
	
	        trusted = ipconv;
	      }
	
	      if (trusted.match(subnetip, subnetrange)) {
	        return true;
	      }
	    }
	
	    return false;
	  };
	}
	
	/**
	 * Compile trust function for single subnet.
	 *
	 * @param {Object} subnet
	 * @api private
	 */
	
	function trustSingle(subnet) {
	  var subnetip = subnet[0];
	  var subnetkind = subnetip.kind();
	  var subnetisipv4 = subnetkind === 'ipv4';
	  var subnetrange = subnet[1];
	
	  return function trust(addr) {
	    if (!isip(addr)) return false;
	
	    var ip = parseip(addr);
	    var kind = ip.kind();
	
	    if (kind !== subnetkind) {
	      if (subnetisipv4 && !ip.isIPv4MappedAddress()) {
	        // Incompatible IP addresses
	        return false;
	      }
	
	      // Convert IP to match subnet IP kind
	      ip = subnetisipv4
	        ? ip.toIPv4Address()
	        : ip.toIPv4MappedAddress();
	    }
	
	    return ip.match(subnetip, subnetrange);
	  };
	}


/***/ },
/* 119 */
/***/ function(module, exports) {

	/*!
	 * forwarded
	 * Copyright(c) 2014 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	/**
	 * Module exports.
	 */
	
	module.exports = forwarded
	
	/**
	 * Get all addresses in the request, using the `X-Forwarded-For` header.
	 *
	 * @param {Object} req
	 * @api public
	 */
	
	function forwarded(req) {
	  if (!req) {
	    throw new TypeError('argument req is required')
	  }
	
	  // simple header parsing
	  var proxyAddrs = (req.headers['x-forwarded-for'] || '')
	    .split(/ *, */)
	    .filter(Boolean)
	    .reverse()
	  var socketAddr = req.connection.remoteAddress
	  var addrs = [socketAddr].concat(proxyAddrs)
	
	  // return all addresses
	  return addrs
	}


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {(function() {
	  var expandIPv6, ipaddr, ipv4Part, ipv4Regexes, ipv6Part, ipv6Regexes, matchCIDR, root;
	
	  ipaddr = {};
	
	  root = this;
	
	  if ((typeof module !== "undefined" && module !== null) && module.exports) {
	    module.exports = ipaddr;
	  } else {
	    root['ipaddr'] = ipaddr;
	  }
	
	  matchCIDR = function(first, second, partSize, cidrBits) {
	    var part, shift;
	    if (first.length !== second.length) {
	      throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
	    }
	    part = 0;
	    while (cidrBits > 0) {
	      shift = partSize - cidrBits;
	      if (shift < 0) {
	        shift = 0;
	      }
	      if (first[part] >> shift !== second[part] >> shift) {
	        return false;
	      }
	      cidrBits -= partSize;
	      part += 1;
	    }
	    return true;
	  };
	
	  ipaddr.subnetMatch = function(address, rangeList, defaultName) {
	    var rangeName, rangeSubnets, subnet, _i, _len;
	    if (defaultName == null) {
	      defaultName = 'unicast';
	    }
	    for (rangeName in rangeList) {
	      rangeSubnets = rangeList[rangeName];
	      if (rangeSubnets[0] && !(rangeSubnets[0] instanceof Array)) {
	        rangeSubnets = [rangeSubnets];
	      }
	      for (_i = 0, _len = rangeSubnets.length; _i < _len; _i++) {
	        subnet = rangeSubnets[_i];
	        if (address.match.apply(address, subnet)) {
	          return rangeName;
	        }
	      }
	    }
	    return defaultName;
	  };
	
	  ipaddr.IPv4 = (function() {
	    function IPv4(octets) {
	      var octet, _i, _len;
	      if (octets.length !== 4) {
	        throw new Error("ipaddr: ipv4 octet count should be 4");
	      }
	      for (_i = 0, _len = octets.length; _i < _len; _i++) {
	        octet = octets[_i];
	        if (!((0 <= octet && octet <= 255))) {
	          throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
	        }
	      }
	      this.octets = octets;
	    }
	
	    IPv4.prototype.kind = function() {
	      return 'ipv4';
	    };
	
	    IPv4.prototype.toString = function() {
	      return this.octets.join(".");
	    };
	
	    IPv4.prototype.toByteArray = function() {
	      return this.octets.slice(0);
	    };
	
	    IPv4.prototype.match = function(other, cidrRange) {
	      var _ref;
	      if (cidrRange === void 0) {
	        _ref = other, other = _ref[0], cidrRange = _ref[1];
	      }
	      if (other.kind() !== 'ipv4') {
	        throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
	      }
	      return matchCIDR(this.octets, other.octets, 8, cidrRange);
	    };
	
	    IPv4.prototype.SpecialRanges = {
	      unspecified: [[new IPv4([0, 0, 0, 0]), 8]],
	      broadcast: [[new IPv4([255, 255, 255, 255]), 32]],
	      multicast: [[new IPv4([224, 0, 0, 0]), 4]],
	      linkLocal: [[new IPv4([169, 254, 0, 0]), 16]],
	      loopback: [[new IPv4([127, 0, 0, 0]), 8]],
	      "private": [[new IPv4([10, 0, 0, 0]), 8], [new IPv4([172, 16, 0, 0]), 12], [new IPv4([192, 168, 0, 0]), 16]],
	      reserved: [[new IPv4([192, 0, 0, 0]), 24], [new IPv4([192, 0, 2, 0]), 24], [new IPv4([192, 88, 99, 0]), 24], [new IPv4([198, 51, 100, 0]), 24], [new IPv4([203, 0, 113, 0]), 24], [new IPv4([240, 0, 0, 0]), 4]]
	    };
	
	    IPv4.prototype.range = function() {
	      return ipaddr.subnetMatch(this, this.SpecialRanges);
	    };
	
	    IPv4.prototype.toIPv4MappedAddress = function() {
	      return ipaddr.IPv6.parse("::ffff:" + (this.toString()));
	    };
	
	    IPv4.prototype.prefixLengthFromSubnetMask = function() {
	      var cidr, i, octet, stop, zeros, zerotable, _i;
	      zerotable = {
	        0: 8,
	        128: 7,
	        192: 6,
	        224: 5,
	        240: 4,
	        248: 3,
	        252: 2,
	        254: 1,
	        255: 0
	      };
	      cidr = 0;
	      stop = false;
	      for (i = _i = 3; _i >= 0; i = _i += -1) {
	        octet = this.octets[i];
	        if (octet in zerotable) {
	          zeros = zerotable[octet];
	          if (stop && zeros !== 0) {
	            return null;
	          }
	          if (zeros !== 8) {
	            stop = true;
	          }
	          cidr += zeros;
	        } else {
	          return null;
	        }
	      }
	      return 32 - cidr;
	    };
	
	    return IPv4;
	
	  })();
	
	  ipv4Part = "(0?\\d+|0x[a-f0-9]+)";
	
	  ipv4Regexes = {
	    fourOctet: new RegExp("^" + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "$", 'i'),
	    longValue: new RegExp("^" + ipv4Part + "$", 'i')
	  };
	
	  ipaddr.IPv4.parser = function(string) {
	    var match, parseIntAuto, part, shift, value;
	    parseIntAuto = function(string) {
	      if (string[0] === "0" && string[1] !== "x") {
	        return parseInt(string, 8);
	      } else {
	        return parseInt(string);
	      }
	    };
	    if (match = string.match(ipv4Regexes.fourOctet)) {
	      return (function() {
	        var _i, _len, _ref, _results;
	        _ref = match.slice(1, 6);
	        _results = [];
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          part = _ref[_i];
	          _results.push(parseIntAuto(part));
	        }
	        return _results;
	      })();
	    } else if (match = string.match(ipv4Regexes.longValue)) {
	      value = parseIntAuto(match[1]);
	      if (value > 0xffffffff || value < 0) {
	        throw new Error("ipaddr: address outside defined range");
	      }
	      return ((function() {
	        var _i, _results;
	        _results = [];
	        for (shift = _i = 0; _i <= 24; shift = _i += 8) {
	          _results.push((value >> shift) & 0xff);
	        }
	        return _results;
	      })()).reverse();
	    } else {
	      return null;
	    }
	  };
	
	  ipaddr.IPv6 = (function() {
	    function IPv6(parts) {
	      var i, part, _i, _j, _len, _ref;
	      if (parts.length === 16) {
	        this.parts = [];
	        for (i = _i = 0; _i <= 14; i = _i += 2) {
	          this.parts.push((parts[i] << 8) | parts[i + 1]);
	        }
	      } else if (parts.length === 8) {
	        this.parts = parts;
	      } else {
	        throw new Error("ipaddr: ipv6 part count should be 8 or 16");
	      }
	      _ref = this.parts;
	      for (_j = 0, _len = _ref.length; _j < _len; _j++) {
	        part = _ref[_j];
	        if (!((0 <= part && part <= 0xffff))) {
	          throw new Error("ipaddr: ipv6 part should fit in 16 bits");
	        }
	      }
	    }
	
	    IPv6.prototype.kind = function() {
	      return 'ipv6';
	    };
	
	    IPv6.prototype.toString = function() {
	      var compactStringParts, part, pushPart, state, stringParts, _i, _len;
	      stringParts = (function() {
	        var _i, _len, _ref, _results;
	        _ref = this.parts;
	        _results = [];
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          part = _ref[_i];
	          _results.push(part.toString(16));
	        }
	        return _results;
	      }).call(this);
	      compactStringParts = [];
	      pushPart = function(part) {
	        return compactStringParts.push(part);
	      };
	      state = 0;
	      for (_i = 0, _len = stringParts.length; _i < _len; _i++) {
	        part = stringParts[_i];
	        switch (state) {
	          case 0:
	            if (part === '0') {
	              pushPart('');
	            } else {
	              pushPart(part);
	            }
	            state = 1;
	            break;
	          case 1:
	            if (part === '0') {
	              state = 2;
	            } else {
	              pushPart(part);
	            }
	            break;
	          case 2:
	            if (part !== '0') {
	              pushPart('');
	              pushPart(part);
	              state = 3;
	            }
	            break;
	          case 3:
	            pushPart(part);
	        }
	      }
	      if (state === 2) {
	        pushPart('');
	        pushPart('');
	      }
	      return compactStringParts.join(":");
	    };
	
	    IPv6.prototype.toByteArray = function() {
	      var bytes, part, _i, _len, _ref;
	      bytes = [];
	      _ref = this.parts;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        part = _ref[_i];
	        bytes.push(part >> 8);
	        bytes.push(part & 0xff);
	      }
	      return bytes;
	    };
	
	    IPv6.prototype.toNormalizedString = function() {
	      var part;
	      return ((function() {
	        var _i, _len, _ref, _results;
	        _ref = this.parts;
	        _results = [];
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          part = _ref[_i];
	          _results.push(part.toString(16));
	        }
	        return _results;
	      }).call(this)).join(":");
	    };
	
	    IPv6.prototype.match = function(other, cidrRange) {
	      var _ref;
	      if (cidrRange === void 0) {
	        _ref = other, other = _ref[0], cidrRange = _ref[1];
	      }
	      if (other.kind() !== 'ipv6') {
	        throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
	      }
	      return matchCIDR(this.parts, other.parts, 16, cidrRange);
	    };
	
	    IPv6.prototype.SpecialRanges = {
	      unspecified: [new IPv6([0, 0, 0, 0, 0, 0, 0, 0]), 128],
	      linkLocal: [new IPv6([0xfe80, 0, 0, 0, 0, 0, 0, 0]), 10],
	      multicast: [new IPv6([0xff00, 0, 0, 0, 0, 0, 0, 0]), 8],
	      loopback: [new IPv6([0, 0, 0, 0, 0, 0, 0, 1]), 128],
	      uniqueLocal: [new IPv6([0xfc00, 0, 0, 0, 0, 0, 0, 0]), 7],
	      ipv4Mapped: [new IPv6([0, 0, 0, 0, 0, 0xffff, 0, 0]), 96],
	      rfc6145: [new IPv6([0, 0, 0, 0, 0xffff, 0, 0, 0]), 96],
	      rfc6052: [new IPv6([0x64, 0xff9b, 0, 0, 0, 0, 0, 0]), 96],
	      '6to4': [new IPv6([0x2002, 0, 0, 0, 0, 0, 0, 0]), 16],
	      teredo: [new IPv6([0x2001, 0, 0, 0, 0, 0, 0, 0]), 32],
	      reserved: [[new IPv6([0x2001, 0xdb8, 0, 0, 0, 0, 0, 0]), 32]]
	    };
	
	    IPv6.prototype.range = function() {
	      return ipaddr.subnetMatch(this, this.SpecialRanges);
	    };
	
	    IPv6.prototype.isIPv4MappedAddress = function() {
	      return this.range() === 'ipv4Mapped';
	    };
	
	    IPv6.prototype.toIPv4Address = function() {
	      var high, low, _ref;
	      if (!this.isIPv4MappedAddress()) {
	        throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
	      }
	      _ref = this.parts.slice(-2), high = _ref[0], low = _ref[1];
	      return new ipaddr.IPv4([high >> 8, high & 0xff, low >> 8, low & 0xff]);
	    };
	
	    return IPv6;
	
	  })();
	
	  ipv6Part = "(?:[0-9a-f]+::?)+";
	
	  ipv6Regexes = {
	    "native": new RegExp("^(::)?(" + ipv6Part + ")?([0-9a-f]+)?(::)?$", 'i'),
	    transitional: new RegExp(("^((?:" + ipv6Part + ")|(?:::)(?:" + ipv6Part + ")?)") + ("" + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "$"), 'i')
	  };
	
	  expandIPv6 = function(string, parts) {
	    var colonCount, lastColon, part, replacement, replacementCount;
	    if (string.indexOf('::') !== string.lastIndexOf('::')) {
	      return null;
	    }
	    colonCount = 0;
	    lastColon = -1;
	    while ((lastColon = string.indexOf(':', lastColon + 1)) >= 0) {
	      colonCount++;
	    }
	    if (string.substr(0, 2) === '::') {
	      colonCount--;
	    }
	    if (string.substr(-2, 2) === '::') {
	      colonCount--;
	    }
	    if (colonCount > parts) {
	      return null;
	    }
	    replacementCount = parts - colonCount;
	    replacement = ':';
	    while (replacementCount--) {
	      replacement += '0:';
	    }
	    string = string.replace('::', replacement);
	    if (string[0] === ':') {
	      string = string.slice(1);
	    }
	    if (string[string.length - 1] === ':') {
	      string = string.slice(0, -1);
	    }
	    return (function() {
	      var _i, _len, _ref, _results;
	      _ref = string.split(":");
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        part = _ref[_i];
	        _results.push(parseInt(part, 16));
	      }
	      return _results;
	    })();
	  };
	
	  ipaddr.IPv6.parser = function(string) {
	    var match, octet, octets, parts, _i, _len;
	    if (string.match(ipv6Regexes['native'])) {
	      return expandIPv6(string, 8);
	    } else if (match = string.match(ipv6Regexes['transitional'])) {
	      parts = expandIPv6(match[1].slice(0, -1), 6);
	      if (parts) {
	        octets = [parseInt(match[2]), parseInt(match[3]), parseInt(match[4]), parseInt(match[5])];
	        for (_i = 0, _len = octets.length; _i < _len; _i++) {
	          octet = octets[_i];
	          if (!((0 <= octet && octet <= 255))) {
	            return null;
	          }
	        }
	        parts.push(octets[0] << 8 | octets[1]);
	        parts.push(octets[2] << 8 | octets[3]);
	        return parts;
	      }
	    }
	    return null;
	  };
	
	  ipaddr.IPv4.isIPv4 = ipaddr.IPv6.isIPv6 = function(string) {
	    return this.parser(string) !== null;
	  };
	
	  ipaddr.IPv4.isValid = function(string) {
	    var e;
	    try {
	      new this(this.parser(string));
	      return true;
	    } catch (_error) {
	      e = _error;
	      return false;
	    }
	  };
	
	  ipaddr.IPv4.isValidFourPartDecimal = function(string) {
	    if (ipaddr.IPv4.isValid(string) && string.match(/^\d+(\.\d+){3}$/)) {
	      return true;
	    } else {
	      return false;
	    }
	  };
	
	  ipaddr.IPv6.isValid = function(string) {
	    var e;
	    if (typeof string === "string" && string.indexOf(":") === -1) {
	      return false;
	    }
	    try {
	      new this(this.parser(string));
	      return true;
	    } catch (_error) {
	      e = _error;
	      return false;
	    }
	  };
	
	  ipaddr.IPv4.parse = ipaddr.IPv6.parse = function(string) {
	    var parts;
	    parts = this.parser(string);
	    if (parts === null) {
	      throw new Error("ipaddr: string is not formatted like ip address");
	    }
	    return new this(parts);
	  };
	
	  ipaddr.IPv4.parseCIDR = function(string) {
	    var maskLength, match;
	    if (match = string.match(/^(.+)\/(\d+)$/)) {
	      maskLength = parseInt(match[2]);
	      if (maskLength >= 0 && maskLength <= 32) {
	        return [this.parse(match[1]), maskLength];
	      }
	    }
	    throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");
	  };
	
	  ipaddr.IPv6.parseCIDR = function(string) {
	    var maskLength, match;
	    if (match = string.match(/^(.+)\/(\d+)$/)) {
	      maskLength = parseInt(match[2]);
	      if (maskLength >= 0 && maskLength <= 128) {
	        return [this.parse(match[1]), maskLength];
	      }
	    }
	    throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");
	  };
	
	  ipaddr.isValid = function(string) {
	    return ipaddr.IPv6.isValid(string) || ipaddr.IPv4.isValid(string);
	  };
	
	  ipaddr.parse = function(string) {
	    if (ipaddr.IPv6.isValid(string)) {
	      return ipaddr.IPv6.parse(string);
	    } else if (ipaddr.IPv4.isValid(string)) {
	      return ipaddr.IPv4.parse(string);
	    } else {
	      throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
	    }
	  };
	
	  ipaddr.parseCIDR = function(string) {
	    var e;
	    try {
	      return ipaddr.IPv6.parseCIDR(string);
	    } catch (_error) {
	      e = _error;
	      try {
	        return ipaddr.IPv4.parseCIDR(string);
	      } catch (_error) {
	        e = _error;
	        throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");
	      }
	    }
	  };
	
	  ipaddr.fromByteArray = function(bytes) {
	    var length;
	    length = bytes.length;
	    if (length === 4) {
	      return new ipaddr.IPv4(bytes);
	    } else if (length === 16) {
	      return new ipaddr.IPv6(bytes);
	    } else {
	      throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address");
	    }
	  };
	
	  ipaddr.process = function(string) {
	    var addr;
	    addr = this.parse(string);
	    if (addr.kind() === 'ipv6' && addr.isIPv4MappedAddress()) {
	      return addr.toIPv4Address();
	    } else {
	      return addr;
	    }
	  };
	
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(38)(module)))

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./application": 5,
		"./application.js": 5,
		"./express": 2,
		"./express.js": 2,
		"./middleware/init": 43,
		"./middleware/init.js": 43,
		"./middleware/query": 44,
		"./middleware/query.js": 44,
		"./request": 122,
		"./request.js": 122,
		"./response": 141,
		"./response.js": 141,
		"./router/index": 23,
		"./router/index.js": 23,
		"./router/layer": 29,
		"./router/layer.js": 29,
		"./router/route": 24,
		"./router/route.js": 24,
		"./utils": 54,
		"./utils.js": 54,
		"./view": 49,
		"./view.js": 49
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 121;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var accepts = __webpack_require__(123);
	var deprecate = __webpack_require__(34)('express');
	var isIP = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"net\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).isIP;
	var typeis = __webpack_require__(132);
	var http = __webpack_require__(134);
	var fresh = __webpack_require__(114);
	var parseRange = __webpack_require__(117);
	var parse = __webpack_require__(35);
	var proxyaddr = __webpack_require__(118);
	
	/**
	 * Request prototype.
	 */
	
	var req = exports = module.exports = {
	  __proto__: http.IncomingMessage.prototype
	};
	
	/**
	 * Return request header.
	 *
	 * The `Referrer` header field is special-cased,
	 * both `Referrer` and `Referer` are interchangeable.
	 *
	 * Examples:
	 *
	 *     req.get('Content-Type');
	 *     // => "text/plain"
	 *
	 *     req.get('content-type');
	 *     // => "text/plain"
	 *
	 *     req.get('Something');
	 *     // => undefined
	 *
	 * Aliased as `req.header()`.
	 *
	 * @param {String} name
	 * @return {String}
	 * @public
	 */
	
	req.get =
	req.header = function header(name) {
	  if (!name) {
	    throw new TypeError('name argument is required to req.get');
	  }
	
	  if (typeof name !== 'string') {
	    throw new TypeError('name must be a string to req.get');
	  }
	
	  var lc = name.toLowerCase();
	
	  switch (lc) {
	    case 'referer':
	    case 'referrer':
	      return this.headers.referrer
	        || this.headers.referer;
	    default:
	      return this.headers[lc];
	  }
	};
	
	/**
	 * To do: update docs.
	 *
	 * Check if the given `type(s)` is acceptable, returning
	 * the best match when true, otherwise `undefined`, in which
	 * case you should respond with 406 "Not Acceptable".
	 *
	 * The `type` value may be a single MIME type string
	 * such as "application/json", an extension name
	 * such as "json", a comma-delimited list such as "json, html, text/plain",
	 * an argument list such as `"json", "html", "text/plain"`,
	 * or an array `["json", "html", "text/plain"]`. When a list
	 * or array is given, the _best_ match, if any is returned.
	 *
	 * Examples:
	 *
	 *     // Accept: text/html
	 *     req.accepts('html');
	 *     // => "html"
	 *
	 *     // Accept: text/*, application/json
	 *     req.accepts('html');
	 *     // => "html"
	 *     req.accepts('text/html');
	 *     // => "text/html"
	 *     req.accepts('json, text');
	 *     // => "json"
	 *     req.accepts('application/json');
	 *     // => "application/json"
	 *
	 *     // Accept: text/*, application/json
	 *     req.accepts('image/png');
	 *     req.accepts('png');
	 *     // => undefined
	 *
	 *     // Accept: text/*;q=.5, application/json
	 *     req.accepts(['html', 'json']);
	 *     req.accepts('html', 'json');
	 *     req.accepts('html, json');
	 *     // => "json"
	 *
	 * @param {String|Array} type(s)
	 * @return {String|Array|Boolean}
	 * @public
	 */
	
	req.accepts = function(){
	  var accept = accepts(this);
	  return accept.types.apply(accept, arguments);
	};
	
	/**
	 * Check if the given `encoding`s are accepted.
	 *
	 * @param {String} ...encoding
	 * @return {String|Array}
	 * @public
	 */
	
	req.acceptsEncodings = function(){
	  var accept = accepts(this);
	  return accept.encodings.apply(accept, arguments);
	};
	
	req.acceptsEncoding = deprecate.function(req.acceptsEncodings,
	  'req.acceptsEncoding: Use acceptsEncodings instead');
	
	/**
	 * Check if the given `charset`s are acceptable,
	 * otherwise you should respond with 406 "Not Acceptable".
	 *
	 * @param {String} ...charset
	 * @return {String|Array}
	 * @public
	 */
	
	req.acceptsCharsets = function(){
	  var accept = accepts(this);
	  return accept.charsets.apply(accept, arguments);
	};
	
	req.acceptsCharset = deprecate.function(req.acceptsCharsets,
	  'req.acceptsCharset: Use acceptsCharsets instead');
	
	/**
	 * Check if the given `lang`s are acceptable,
	 * otherwise you should respond with 406 "Not Acceptable".
	 *
	 * @param {String} ...lang
	 * @return {String|Array}
	 * @public
	 */
	
	req.acceptsLanguages = function(){
	  var accept = accepts(this);
	  return accept.languages.apply(accept, arguments);
	};
	
	req.acceptsLanguage = deprecate.function(req.acceptsLanguages,
	  'req.acceptsLanguage: Use acceptsLanguages instead');
	
	/**
	 * Parse Range header field, capping to the given `size`.
	 *
	 * Unspecified ranges such as "0-" require knowledge of your resource length. In
	 * the case of a byte range this is of course the total number of bytes. If the
	 * Range header field is not given `undefined` is returned, `-1` when unsatisfiable,
	 * and `-2` when syntactically invalid.
	 *
	 * When ranges are returned, the array has a "type" property which is the type of
	 * range that is required (most commonly, "bytes"). Each array element is an object
	 * with a "start" and "end" property for the portion of the range.
	 *
	 * The "combine" option can be set to `true` and overlapping & adjacent ranges
	 * will be combined into a single range.
	 *
	 * NOTE: remember that ranges are inclusive, so for example "Range: users=0-3"
	 * should respond with 4 users when available, not 3.
	 *
	 * @param {number} size
	 * @param {object} [options]
	 * @param {boolean} [options.combine=false]
	 * @return {number|array}
	 * @public
	 */
	
	req.range = function range(size, options) {
	  var range = this.get('Range');
	  if (!range) return;
	  return parseRange(size, range, options);
	};
	
	/**
	 * Return the value of param `name` when present or `defaultValue`.
	 *
	 *  - Checks route placeholders, ex: _/user/:id_
	 *  - Checks body params, ex: id=12, {"id":12}
	 *  - Checks query string params, ex: ?id=12
	 *
	 * To utilize request bodies, `req.body`
	 * should be an object. This can be done by using
	 * the `bodyParser()` middleware.
	 *
	 * @param {String} name
	 * @param {Mixed} [defaultValue]
	 * @return {String}
	 * @public
	 */
	
	req.param = function param(name, defaultValue) {
	  var params = this.params || {};
	  var body = this.body || {};
	  var query = this.query || {};
	
	  var args = arguments.length === 1
	    ? 'name'
	    : 'name, default';
	  deprecate('req.param(' + args + '): Use req.params, req.body, or req.query instead');
	
	  if (null != params[name] && params.hasOwnProperty(name)) return params[name];
	  if (null != body[name]) return body[name];
	  if (null != query[name]) return query[name];
	
	  return defaultValue;
	};
	
	/**
	 * Check if the incoming request contains the "Content-Type"
	 * header field, and it contains the give mime `type`.
	 *
	 * Examples:
	 *
	 *      // With Content-Type: text/html; charset=utf-8
	 *      req.is('html');
	 *      req.is('text/html');
	 *      req.is('text/*');
	 *      // => true
	 *
	 *      // When Content-Type is application/json
	 *      req.is('json');
	 *      req.is('application/json');
	 *      req.is('application/*');
	 *      // => true
	 *
	 *      req.is('html');
	 *      // => false
	 *
	 * @param {String|Array} types...
	 * @return {String|false|null}
	 * @public
	 */
	
	req.is = function is(types) {
	  var arr = types;
	
	  // support flattened arguments
	  if (!Array.isArray(types)) {
	    arr = new Array(arguments.length);
	    for (var i = 0; i < arr.length; i++) {
	      arr[i] = arguments[i];
	    }
	  }
	
	  return typeis(this, arr);
	};
	
	/**
	 * Return the protocol string "http" or "https"
	 * when requested with TLS. When the "trust proxy"
	 * setting trusts the socket address, the
	 * "X-Forwarded-Proto" header field will be trusted
	 * and used if present.
	 *
	 * If you're running behind a reverse proxy that
	 * supplies https for you this may be enabled.
	 *
	 * @return {String}
	 * @public
	 */
	
	defineGetter(req, 'protocol', function protocol(){
	  var proto = this.connection.encrypted
	    ? 'https'
	    : 'http';
	  var trust = this.app.get('trust proxy fn');
	
	  if (!trust(this.connection.remoteAddress, 0)) {
	    return proto;
	  }
	
	  // Note: X-Forwarded-Proto is normally only ever a
	  //       single value, but this is to be safe.
	  proto = this.get('X-Forwarded-Proto') || proto;
	  return proto.split(/\s*,\s*/)[0];
	});
	
	/**
	 * Short-hand for:
	 *
	 *    req.protocol === 'https'
	 *
	 * @return {Boolean}
	 * @public
	 */
	
	defineGetter(req, 'secure', function secure(){
	  return this.protocol === 'https';
	});
	
	/**
	 * Return the remote address from the trusted proxy.
	 *
	 * The is the remote address on the socket unless
	 * "trust proxy" is set.
	 *
	 * @return {String}
	 * @public
	 */
	
	defineGetter(req, 'ip', function ip(){
	  var trust = this.app.get('trust proxy fn');
	  return proxyaddr(this, trust);
	});
	
	/**
	 * When "trust proxy" is set, trusted proxy addresses + client.
	 *
	 * For example if the value were "client, proxy1, proxy2"
	 * you would receive the array `["client", "proxy1", "proxy2"]`
	 * where "proxy2" is the furthest down-stream and "proxy1" and
	 * "proxy2" were trusted.
	 *
	 * @return {Array}
	 * @public
	 */
	
	defineGetter(req, 'ips', function ips() {
	  var trust = this.app.get('trust proxy fn');
	  var addrs = proxyaddr.all(this, trust);
	  return addrs.slice(1).reverse();
	});
	
	/**
	 * Return subdomains as an array.
	 *
	 * Subdomains are the dot-separated parts of the host before the main domain of
	 * the app. By default, the domain of the app is assumed to be the last two
	 * parts of the host. This can be changed by setting "subdomain offset".
	 *
	 * For example, if the domain is "tobi.ferrets.example.com":
	 * If "subdomain offset" is not set, req.subdomains is `["ferrets", "tobi"]`.
	 * If "subdomain offset" is 3, req.subdomains is `["tobi"]`.
	 *
	 * @return {Array}
	 * @public
	 */
	
	defineGetter(req, 'subdomains', function subdomains() {
	  var hostname = this.hostname;
	
	  if (!hostname) return [];
	
	  var offset = this.app.get('subdomain offset');
	  var subdomains = !isIP(hostname)
	    ? hostname.split('.').reverse()
	    : [hostname];
	
	  return subdomains.slice(offset);
	});
	
	/**
	 * Short-hand for `url.parse(req.url).pathname`.
	 *
	 * @return {String}
	 * @public
	 */
	
	defineGetter(req, 'path', function path() {
	  return parse(this).pathname;
	});
	
	/**
	 * Parse the "Host" header field to a hostname.
	 *
	 * When the "trust proxy" setting trusts the socket
	 * address, the "X-Forwarded-Host" header field will
	 * be trusted.
	 *
	 * @return {String}
	 * @public
	 */
	
	defineGetter(req, 'hostname', function hostname(){
	  var trust = this.app.get('trust proxy fn');
	  var host = this.get('X-Forwarded-Host');
	
	  if (!host || !trust(this.connection.remoteAddress, 0)) {
	    host = this.get('Host');
	  }
	
	  if (!host) return;
	
	  // IPv6 literal support
	  var offset = host[0] === '['
	    ? host.indexOf(']') + 1
	    : 0;
	  var index = host.indexOf(':', offset);
	
	  return index !== -1
	    ? host.substring(0, index)
	    : host;
	});
	
	// TODO: change req.host to return host in next major
	
	defineGetter(req, 'host', deprecate.function(function host(){
	  return this.hostname;
	}, 'req.host: Use req.hostname instead'));
	
	/**
	 * Check if the request is fresh, aka
	 * Last-Modified and/or the ETag
	 * still match.
	 *
	 * @return {Boolean}
	 * @public
	 */
	
	defineGetter(req, 'fresh', function(){
	  var method = this.method;
	  var s = this.res.statusCode;
	
	  // GET or HEAD for weak freshness validation only
	  if ('GET' !== method && 'HEAD' !== method) return false;
	
	  // 2xx or 304 as per rfc2616 14.26
	  if ((s >= 200 && s < 300) || 304 === s) {
	    return fresh(this.headers, (this.res._headers || {}));
	  }
	
	  return false;
	});
	
	/**
	 * Check if the request is stale, aka
	 * "Last-Modified" and / or the "ETag" for the
	 * resource has changed.
	 *
	 * @return {Boolean}
	 * @public
	 */
	
	defineGetter(req, 'stale', function stale(){
	  return !this.fresh;
	});
	
	/**
	 * Check if the request was an _XMLHttpRequest_.
	 *
	 * @return {Boolean}
	 * @public
	 */
	
	defineGetter(req, 'xhr', function xhr(){
	  var val = this.get('X-Requested-With') || '';
	  return val.toLowerCase() === 'xmlhttprequest';
	});
	
	/**
	 * Helper function for creating a getter on an object.
	 *
	 * @param {Object} obj
	 * @param {String} name
	 * @param {Function} getter
	 * @private
	 */
	function defineGetter(obj, name, getter) {
	  Object.defineProperty(obj, name, {
	    configurable: true,
	    enumerable: true,
	    get: getter
	  });
	};


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * accepts
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var Negotiator = __webpack_require__(124)
	var mime = __webpack_require__(129)
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = Accepts
	
	/**
	 * Create a new Accepts object for the given req.
	 *
	 * @param {object} req
	 * @public
	 */
	
	function Accepts(req) {
	  if (!(this instanceof Accepts))
	    return new Accepts(req)
	
	  this.headers = req.headers
	  this.negotiator = new Negotiator(req)
	}
	
	/**
	 * Check if the given `type(s)` is acceptable, returning
	 * the best match when true, otherwise `undefined`, in which
	 * case you should respond with 406 "Not Acceptable".
	 *
	 * The `type` value may be a single mime type string
	 * such as "application/json", the extension name
	 * such as "json" or an array `["json", "html", "text/plain"]`. When a list
	 * or array is given the _best_ match, if any is returned.
	 *
	 * Examples:
	 *
	 *     // Accept: text/html
	 *     this.types('html');
	 *     // => "html"
	 *
	 *     // Accept: text/*, application/json
	 *     this.types('html');
	 *     // => "html"
	 *     this.types('text/html');
	 *     // => "text/html"
	 *     this.types('json', 'text');
	 *     // => "json"
	 *     this.types('application/json');
	 *     // => "application/json"
	 *
	 *     // Accept: text/*, application/json
	 *     this.types('image/png');
	 *     this.types('png');
	 *     // => undefined
	 *
	 *     // Accept: text/*;q=.5, application/json
	 *     this.types(['html', 'json']);
	 *     this.types('html', 'json');
	 *     // => "json"
	 *
	 * @param {String|Array} types...
	 * @return {String|Array|Boolean}
	 * @public
	 */
	
	Accepts.prototype.type =
	Accepts.prototype.types = function (types_) {
	  var types = types_
	
	  // support flattened arguments
	  if (types && !Array.isArray(types)) {
	    types = new Array(arguments.length)
	    for (var i = 0; i < types.length; i++) {
	      types[i] = arguments[i]
	    }
	  }
	
	  // no types, return all requested types
	  if (!types || types.length === 0) {
	    return this.negotiator.mediaTypes()
	  }
	
	  if (!this.headers.accept) return types[0];
	  var mimes = types.map(extToMime);
	  var accepts = this.negotiator.mediaTypes(mimes.filter(validMime));
	  var first = accepts[0];
	  if (!first) return false;
	  return types[mimes.indexOf(first)];
	}
	
	/**
	 * Return accepted encodings or best fit based on `encodings`.
	 *
	 * Given `Accept-Encoding: gzip, deflate`
	 * an array sorted by quality is returned:
	 *
	 *     ['gzip', 'deflate']
	 *
	 * @param {String|Array} encodings...
	 * @return {String|Array}
	 * @public
	 */
	
	Accepts.prototype.encoding =
	Accepts.prototype.encodings = function (encodings_) {
	  var encodings = encodings_
	
	  // support flattened arguments
	  if (encodings && !Array.isArray(encodings)) {
	    encodings = new Array(arguments.length)
	    for (var i = 0; i < encodings.length; i++) {
	      encodings[i] = arguments[i]
	    }
	  }
	
	  // no encodings, return all requested encodings
	  if (!encodings || encodings.length === 0) {
	    return this.negotiator.encodings()
	  }
	
	  return this.negotiator.encodings(encodings)[0] || false
	}
	
	/**
	 * Return accepted charsets or best fit based on `charsets`.
	 *
	 * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
	 * an array sorted by quality is returned:
	 *
	 *     ['utf-8', 'utf-7', 'iso-8859-1']
	 *
	 * @param {String|Array} charsets...
	 * @return {String|Array}
	 * @public
	 */
	
	Accepts.prototype.charset =
	Accepts.prototype.charsets = function (charsets_) {
	  var charsets = charsets_
	
	  // support flattened arguments
	  if (charsets && !Array.isArray(charsets)) {
	    charsets = new Array(arguments.length)
	    for (var i = 0; i < charsets.length; i++) {
	      charsets[i] = arguments[i]
	    }
	  }
	
	  // no charsets, return all requested charsets
	  if (!charsets || charsets.length === 0) {
	    return this.negotiator.charsets()
	  }
	
	  return this.negotiator.charsets(charsets)[0] || false
	}
	
	/**
	 * Return accepted languages or best fit based on `langs`.
	 *
	 * Given `Accept-Language: en;q=0.8, es, pt`
	 * an array sorted by quality is returned:
	 *
	 *     ['es', 'pt', 'en']
	 *
	 * @param {String|Array} langs...
	 * @return {Array|String}
	 * @public
	 */
	
	Accepts.prototype.lang =
	Accepts.prototype.langs =
	Accepts.prototype.language =
	Accepts.prototype.languages = function (languages_) {
	  var languages = languages_
	
	  // support flattened arguments
	  if (languages && !Array.isArray(languages)) {
	    languages = new Array(arguments.length)
	    for (var i = 0; i < languages.length; i++) {
	      languages[i] = arguments[i]
	    }
	  }
	
	  // no languages, return all requested languages
	  if (!languages || languages.length === 0) {
	    return this.negotiator.languages()
	  }
	
	  return this.negotiator.languages(languages)[0] || false
	}
	
	/**
	 * Convert extnames to mime.
	 *
	 * @param {String} type
	 * @return {String}
	 * @private
	 */
	
	function extToMime(type) {
	  return type.indexOf('/') === -1
	    ? mime.lookup(type)
	    : type
	}
	
	/**
	 * Check if mime is valid.
	 *
	 * @param {String} type
	 * @return {String}
	 * @private
	 */
	
	function validMime(type) {
	  return typeof type === 'string';
	}


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * negotiator
	 * Copyright(c) 2012 Federico Romero
	 * Copyright(c) 2012-2014 Isaac Z. Schlueter
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Cached loaded submodules.
	 * @private
	 */
	
	var modules = Object.create(null);
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = Negotiator;
	module.exports.Negotiator = Negotiator;
	
	/**
	 * Create a Negotiator instance from a request.
	 * @param {object} request
	 * @public
	 */
	
	function Negotiator(request) {
	  if (!(this instanceof Negotiator)) {
	    return new Negotiator(request);
	  }
	
	  this.request = request;
	}
	
	Negotiator.prototype.charset = function charset(available) {
	  var set = this.charsets(available);
	  return set && set[0];
	};
	
	Negotiator.prototype.charsets = function charsets(available) {
	  var preferredCharsets = loadModule('charset').preferredCharsets;
	  return preferredCharsets(this.request.headers['accept-charset'], available);
	};
	
	Negotiator.prototype.encoding = function encoding(available) {
	  var set = this.encodings(available);
	  return set && set[0];
	};
	
	Negotiator.prototype.encodings = function encodings(available) {
	  var preferredEncodings = loadModule('encoding').preferredEncodings;
	  return preferredEncodings(this.request.headers['accept-encoding'], available);
	};
	
	Negotiator.prototype.language = function language(available) {
	  var set = this.languages(available);
	  return set && set[0];
	};
	
	Negotiator.prototype.languages = function languages(available) {
	  var preferredLanguages = loadModule('language').preferredLanguages;
	  return preferredLanguages(this.request.headers['accept-language'], available);
	};
	
	Negotiator.prototype.mediaType = function mediaType(available) {
	  var set = this.mediaTypes(available);
	  return set && set[0];
	};
	
	Negotiator.prototype.mediaTypes = function mediaTypes(available) {
	  var preferredMediaTypes = loadModule('mediaType').preferredMediaTypes;
	  return preferredMediaTypes(this.request.headers.accept, available);
	};
	
	// Backwards compatibility
	Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
	Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
	Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
	Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
	Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
	Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
	Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
	Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;
	
	/**
	 * Load the given module.
	 * @private
	 */
	
	function loadModule(moduleName) {
	  var module = modules[moduleName];
	
	  if (module !== undefined) {
	    return module;
	  }
	
	  // This uses a switch for static require analysis
	  switch (moduleName) {
	    case 'charset':
	      module = __webpack_require__(125);
	      break;
	    case 'encoding':
	      module = __webpack_require__(126);
	      break;
	    case 'language':
	      module = __webpack_require__(127);
	      break;
	    case 'mediaType':
	      module = __webpack_require__(128);
	      break;
	    default:
	      throw new Error('Cannot find module \'' + moduleName + '\'');
	  }
	
	  // Store to prevent invoking require()
	  modules[moduleName] = module;
	
	  return module;
	}


/***/ },
/* 125 */
/***/ function(module, exports) {

	/**
	 * negotiator
	 * Copyright(c) 2012 Isaac Z. Schlueter
	 * Copyright(c) 2014 Federico Romero
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = preferredCharsets;
	module.exports.preferredCharsets = preferredCharsets;
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
	
	/**
	 * Parse the Accept-Charset header.
	 * @private
	 */
	
	function parseAcceptCharset(accept) {
	  var accepts = accept.split(',');
	
	  for (var i = 0, j = 0; i < accepts.length; i++) {
	    var charset = parseCharset(accepts[i].trim(), i);
	
	    if (charset) {
	      accepts[j++] = charset;
	    }
	  }
	
	  // trim accepts
	  accepts.length = j;
	
	  return accepts;
	}
	
	/**
	 * Parse a charset from the Accept-Charset header.
	 * @private
	 */
	
	function parseCharset(str, i) {
	  var match = simpleCharsetRegExp.exec(str);
	  if (!match) return null;
	
	  var charset = match[1];
	  var q = 1;
	  if (match[2]) {
	    var params = match[2].split(';')
	    for (var i = 0; i < params.length; i ++) {
	      var p = params[i].trim().split('=');
	      if (p[0] === 'q') {
	        q = parseFloat(p[1]);
	        break;
	      }
	    }
	  }
	
	  return {
	    charset: charset,
	    q: q,
	    i: i
	  };
	}
	
	/**
	 * Get the priority of a charset.
	 * @private
	 */
	
	function getCharsetPriority(charset, accepted, index) {
	  var priority = {o: -1, q: 0, s: 0};
	
	  for (var i = 0; i < accepted.length; i++) {
	    var spec = specify(charset, accepted[i], index);
	
	    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
	      priority = spec;
	    }
	  }
	
	  return priority;
	}
	
	/**
	 * Get the specificity of the charset.
	 * @private
	 */
	
	function specify(charset, spec, index) {
	  var s = 0;
	  if(spec.charset.toLowerCase() === charset.toLowerCase()){
	    s |= 1;
	  } else if (spec.charset !== '*' ) {
	    return null
	  }
	
	  return {
	    i: index,
	    o: spec.i,
	    q: spec.q,
	    s: s
	  }
	}
	
	/**
	 * Get the preferred charsets from an Accept-Charset header.
	 * @public
	 */
	
	function preferredCharsets(accept, provided) {
	  // RFC 2616 sec 14.2: no header = *
	  var accepts = parseAcceptCharset(accept === undefined ? '*' : accept || '');
	
	  if (!provided) {
	    // sorted list of all charsets
	    return accepts
	      .filter(isQuality)
	      .sort(compareSpecs)
	      .map(getFullCharset);
	  }
	
	  var priorities = provided.map(function getPriority(type, index) {
	    return getCharsetPriority(type, accepts, index);
	  });
	
	  // sorted list of accepted charsets
	  return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
	    return provided[priorities.indexOf(priority)];
	  });
	}
	
	/**
	 * Compare two specs.
	 * @private
	 */
	
	function compareSpecs(a, b) {
	  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
	}
	
	/**
	 * Get full charset string.
	 * @private
	 */
	
	function getFullCharset(spec) {
	  return spec.charset;
	}
	
	/**
	 * Check if a spec has any quality.
	 * @private
	 */
	
	function isQuality(spec) {
	  return spec.q > 0;
	}


/***/ },
/* 126 */
/***/ function(module, exports) {

	/**
	 * negotiator
	 * Copyright(c) 2012 Isaac Z. Schlueter
	 * Copyright(c) 2014 Federico Romero
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = preferredEncodings;
	module.exports.preferredEncodings = preferredEncodings;
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var simpleEncodingRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
	
	/**
	 * Parse the Accept-Encoding header.
	 * @private
	 */
	
	function parseAcceptEncoding(accept) {
	  var accepts = accept.split(',');
	  var hasIdentity = false;
	  var minQuality = 1;
	
	  for (var i = 0, j = 0; i < accepts.length; i++) {
	    var encoding = parseEncoding(accepts[i].trim(), i);
	
	    if (encoding) {
	      accepts[j++] = encoding;
	      hasIdentity = hasIdentity || specify('identity', encoding);
	      minQuality = Math.min(minQuality, encoding.q || 1);
	    }
	  }
	
	  if (!hasIdentity) {
	    /*
	     * If identity doesn't explicitly appear in the accept-encoding header,
	     * it's added to the list of acceptable encoding with the lowest q
	     */
	    accepts[j++] = {
	      encoding: 'identity',
	      q: minQuality,
	      i: i
	    };
	  }
	
	  // trim accepts
	  accepts.length = j;
	
	  return accepts;
	}
	
	/**
	 * Parse an encoding from the Accept-Encoding header.
	 * @private
	 */
	
	function parseEncoding(str, i) {
	  var match = simpleEncodingRegExp.exec(str);
	  if (!match) return null;
	
	  var encoding = match[1];
	  var q = 1;
	  if (match[2]) {
	    var params = match[2].split(';');
	    for (var i = 0; i < params.length; i ++) {
	      var p = params[i].trim().split('=');
	      if (p[0] === 'q') {
	        q = parseFloat(p[1]);
	        break;
	      }
	    }
	  }
	
	  return {
	    encoding: encoding,
	    q: q,
	    i: i
	  };
	}
	
	/**
	 * Get the priority of an encoding.
	 * @private
	 */
	
	function getEncodingPriority(encoding, accepted, index) {
	  var priority = {o: -1, q: 0, s: 0};
	
	  for (var i = 0; i < accepted.length; i++) {
	    var spec = specify(encoding, accepted[i], index);
	
	    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
	      priority = spec;
	    }
	  }
	
	  return priority;
	}
	
	/**
	 * Get the specificity of the encoding.
	 * @private
	 */
	
	function specify(encoding, spec, index) {
	  var s = 0;
	  if(spec.encoding.toLowerCase() === encoding.toLowerCase()){
	    s |= 1;
	  } else if (spec.encoding !== '*' ) {
	    return null
	  }
	
	  return {
	    i: index,
	    o: spec.i,
	    q: spec.q,
	    s: s
	  }
	};
	
	/**
	 * Get the preferred encodings from an Accept-Encoding header.
	 * @public
	 */
	
	function preferredEncodings(accept, provided) {
	  var accepts = parseAcceptEncoding(accept || '');
	
	  if (!provided) {
	    // sorted list of all encodings
	    return accepts
	      .filter(isQuality)
	      .sort(compareSpecs)
	      .map(getFullEncoding);
	  }
	
	  var priorities = provided.map(function getPriority(type, index) {
	    return getEncodingPriority(type, accepts, index);
	  });
	
	  // sorted list of accepted encodings
	  return priorities.filter(isQuality).sort(compareSpecs).map(function getEncoding(priority) {
	    return provided[priorities.indexOf(priority)];
	  });
	}
	
	/**
	 * Compare two specs.
	 * @private
	 */
	
	function compareSpecs(a, b) {
	  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
	}
	
	/**
	 * Get full encoding string.
	 * @private
	 */
	
	function getFullEncoding(spec) {
	  return spec.encoding;
	}
	
	/**
	 * Check if a spec has any quality.
	 * @private
	 */
	
	function isQuality(spec) {
	  return spec.q > 0;
	}


/***/ },
/* 127 */
/***/ function(module, exports) {

	/**
	 * negotiator
	 * Copyright(c) 2012 Isaac Z. Schlueter
	 * Copyright(c) 2014 Federico Romero
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = preferredLanguages;
	module.exports.preferredLanguages = preferredLanguages;
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var simpleLanguageRegExp = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
	
	/**
	 * Parse the Accept-Language header.
	 * @private
	 */
	
	function parseAcceptLanguage(accept) {
	  var accepts = accept.split(',');
	
	  for (var i = 0, j = 0; i < accepts.length; i++) {
	    var langauge = parseLanguage(accepts[i].trim(), i);
	
	    if (langauge) {
	      accepts[j++] = langauge;
	    }
	  }
	
	  // trim accepts
	  accepts.length = j;
	
	  return accepts;
	}
	
	/**
	 * Parse a language from the Accept-Language header.
	 * @private
	 */
	
	function parseLanguage(str, i) {
	  var match = simpleLanguageRegExp.exec(str);
	  if (!match) return null;
	
	  var prefix = match[1],
	      suffix = match[2],
	      full = prefix;
	
	  if (suffix) full += "-" + suffix;
	
	  var q = 1;
	  if (match[3]) {
	    var params = match[3].split(';')
	    for (var i = 0; i < params.length; i ++) {
	      var p = params[i].split('=');
	      if (p[0] === 'q') q = parseFloat(p[1]);
	    }
	  }
	
	  return {
	    prefix: prefix,
	    suffix: suffix,
	    q: q,
	    i: i,
	    full: full
	  };
	}
	
	/**
	 * Get the priority of a language.
	 * @private
	 */
	
	function getLanguagePriority(language, accepted, index) {
	  var priority = {o: -1, q: 0, s: 0};
	
	  for (var i = 0; i < accepted.length; i++) {
	    var spec = specify(language, accepted[i], index);
	
	    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
	      priority = spec;
	    }
	  }
	
	  return priority;
	}
	
	/**
	 * Get the specificity of the language.
	 * @private
	 */
	
	function specify(language, spec, index) {
	  var p = parseLanguage(language)
	  if (!p) return null;
	  var s = 0;
	  if(spec.full.toLowerCase() === p.full.toLowerCase()){
	    s |= 4;
	  } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
	    s |= 2;
	  } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
	    s |= 1;
	  } else if (spec.full !== '*' ) {
	    return null
	  }
	
	  return {
	    i: index,
	    o: spec.i,
	    q: spec.q,
	    s: s
	  }
	};
	
	/**
	 * Get the preferred languages from an Accept-Language header.
	 * @public
	 */
	
	function preferredLanguages(accept, provided) {
	  // RFC 2616 sec 14.4: no header = *
	  var accepts = parseAcceptLanguage(accept === undefined ? '*' : accept || '');
	
	  if (!provided) {
	    // sorted list of all languages
	    return accepts
	      .filter(isQuality)
	      .sort(compareSpecs)
	      .map(getFullLanguage);
	  }
	
	  var priorities = provided.map(function getPriority(type, index) {
	    return getLanguagePriority(type, accepts, index);
	  });
	
	  // sorted list of accepted languages
	  return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
	    return provided[priorities.indexOf(priority)];
	  });
	}
	
	/**
	 * Compare two specs.
	 * @private
	 */
	
	function compareSpecs(a, b) {
	  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
	}
	
	/**
	 * Get full language string.
	 * @private
	 */
	
	function getFullLanguage(spec) {
	  return spec.full;
	}
	
	/**
	 * Check if a spec has any quality.
	 * @private
	 */
	
	function isQuality(spec) {
	  return spec.q > 0;
	}


/***/ },
/* 128 */
/***/ function(module, exports) {

	/**
	 * negotiator
	 * Copyright(c) 2012 Isaac Z. Schlueter
	 * Copyright(c) 2014 Federico Romero
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = preferredMediaTypes;
	module.exports.preferredMediaTypes = preferredMediaTypes;
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var simpleMediaTypeRegExp = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
	
	/**
	 * Parse the Accept header.
	 * @private
	 */
	
	function parseAccept(accept) {
	  var accepts = splitMediaTypes(accept);
	
	  for (var i = 0, j = 0; i < accepts.length; i++) {
	    var mediaType = parseMediaType(accepts[i].trim(), i);
	
	    if (mediaType) {
	      accepts[j++] = mediaType;
	    }
	  }
	
	  // trim accepts
	  accepts.length = j;
	
	  return accepts;
	}
	
	/**
	 * Parse a media type from the Accept header.
	 * @private
	 */
	
	function parseMediaType(str, i) {
	  var match = simpleMediaTypeRegExp.exec(str);
	  if (!match) return null;
	
	  var params = Object.create(null);
	  var q = 1;
	  var subtype = match[2];
	  var type = match[1];
	
	  if (match[3]) {
	    var kvps = splitParameters(match[3]).map(splitKeyValuePair);
	
	    for (var j = 0; j < kvps.length; j++) {
	      var pair = kvps[j];
	      var key = pair[0].toLowerCase();
	      var val = pair[1];
	
	      // get the value, unwrapping quotes
	      var value = val && val[0] === '"' && val[val.length - 1] === '"'
	        ? val.substr(1, val.length - 2)
	        : val;
	
	      if (key === 'q') {
	        q = parseFloat(value);
	        break;
	      }
	
	      // store parameter
	      params[key] = value;
	    }
	  }
	
	  return {
	    type: type,
	    subtype: subtype,
	    params: params,
	    q: q,
	    i: i
	  };
	}
	
	/**
	 * Get the priority of a media type.
	 * @private
	 */
	
	function getMediaTypePriority(type, accepted, index) {
	  var priority = {o: -1, q: 0, s: 0};
	
	  for (var i = 0; i < accepted.length; i++) {
	    var spec = specify(type, accepted[i], index);
	
	    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
	      priority = spec;
	    }
	  }
	
	  return priority;
	}
	
	/**
	 * Get the specificity of the media type.
	 * @private
	 */
	
	function specify(type, spec, index) {
	  var p = parseMediaType(type);
	  var s = 0;
	
	  if (!p) {
	    return null;
	  }
	
	  if(spec.type.toLowerCase() == p.type.toLowerCase()) {
	    s |= 4
	  } else if(spec.type != '*') {
	    return null;
	  }
	
	  if(spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
	    s |= 2
	  } else if(spec.subtype != '*') {
	    return null;
	  }
	
	  var keys = Object.keys(spec.params);
	  if (keys.length > 0) {
	    if (keys.every(function (k) {
	      return spec.params[k] == '*' || (spec.params[k] || '').toLowerCase() == (p.params[k] || '').toLowerCase();
	    })) {
	      s |= 1
	    } else {
	      return null
	    }
	  }
	
	  return {
	    i: index,
	    o: spec.i,
	    q: spec.q,
	    s: s,
	  }
	}
	
	/**
	 * Get the preferred media types from an Accept header.
	 * @public
	 */
	
	function preferredMediaTypes(accept, provided) {
	  // RFC 2616 sec 14.2: no header = */*
	  var accepts = parseAccept(accept === undefined ? '*/*' : accept || '');
	
	  if (!provided) {
	    // sorted list of all types
	    return accepts
	      .filter(isQuality)
	      .sort(compareSpecs)
	      .map(getFullType);
	  }
	
	  var priorities = provided.map(function getPriority(type, index) {
	    return getMediaTypePriority(type, accepts, index);
	  });
	
	  // sorted list of accepted types
	  return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
	    return provided[priorities.indexOf(priority)];
	  });
	}
	
	/**
	 * Compare two specs.
	 * @private
	 */
	
	function compareSpecs(a, b) {
	  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
	}
	
	/**
	 * Get full type string.
	 * @private
	 */
	
	function getFullType(spec) {
	  return spec.type + '/' + spec.subtype;
	}
	
	/**
	 * Check if a spec has any quality.
	 * @private
	 */
	
	function isQuality(spec) {
	  return spec.q > 0;
	}
	
	/**
	 * Count the number of quotes in a string.
	 * @private
	 */
	
	function quoteCount(string) {
	  var count = 0;
	  var index = 0;
	
	  while ((index = string.indexOf('"', index)) !== -1) {
	    count++;
	    index++;
	  }
	
	  return count;
	}
	
	/**
	 * Split a key value pair.
	 * @private
	 */
	
	function splitKeyValuePair(str) {
	  var index = str.indexOf('=');
	  var key;
	  var val;
	
	  if (index === -1) {
	    key = str;
	  } else {
	    key = str.substr(0, index);
	    val = str.substr(index + 1);
	  }
	
	  return [key, val];
	}
	
	/**
	 * Split an Accept header into media types.
	 * @private
	 */
	
	function splitMediaTypes(accept) {
	  var accepts = accept.split(',');
	
	  for (var i = 1, j = 0; i < accepts.length; i++) {
	    if (quoteCount(accepts[j]) % 2 == 0) {
	      accepts[++j] = accepts[i];
	    } else {
	      accepts[j] += ',' + accepts[i];
	    }
	  }
	
	  // trim accepts
	  accepts.length = j + 1;
	
	  return accepts;
	}
	
	/**
	 * Split a string of parameters.
	 * @private
	 */
	
	function splitParameters(str) {
	  var parameters = str.split(';');
	
	  for (var i = 1, j = 0; i < parameters.length; i++) {
	    if (quoteCount(parameters[j]) % 2 == 0) {
	      parameters[++j] = parameters[i];
	    } else {
	      parameters[j] += ';' + parameters[i];
	    }
	  }
	
	  // trim parameters
	  parameters.length = j + 1;
	
	  for (var i = 0; i < parameters.length; i++) {
	    parameters[i] = parameters[i].trim();
	  }
	
	  return parameters;
	}


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * mime-types
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var db = __webpack_require__(130)
	var extname = __webpack_require__(50).extname
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var extractTypeRegExp = /^\s*([^;\s]*)(?:;|\s|$)/
	var textTypeRegExp = /^text\//i
	
	/**
	 * Module exports.
	 * @public
	 */
	
	exports.charset = charset
	exports.charsets = { lookup: charset }
	exports.contentType = contentType
	exports.extension = extension
	exports.extensions = Object.create(null)
	exports.lookup = lookup
	exports.types = Object.create(null)
	
	// Populate the extensions/types maps
	populateMaps(exports.extensions, exports.types)
	
	/**
	 * Get the default charset for a MIME type.
	 *
	 * @param {string} type
	 * @return {boolean|string}
	 */
	
	function charset (type) {
	  if (!type || typeof type !== 'string') {
	    return false
	  }
	
	  // TODO: use media-typer
	  var match = extractTypeRegExp.exec(type)
	  var mime = match && db[match[1].toLowerCase()]
	
	  if (mime && mime.charset) {
	    return mime.charset
	  }
	
	  // default text/* to utf-8
	  if (match && textTypeRegExp.test(match[1])) {
	    return 'UTF-8'
	  }
	
	  return false
	}
	
	/**
	 * Create a full Content-Type header given a MIME type or extension.
	 *
	 * @param {string} str
	 * @return {boolean|string}
	 */
	
	function contentType (str) {
	  // TODO: should this even be in this module?
	  if (!str || typeof str !== 'string') {
	    return false
	  }
	
	  var mime = str.indexOf('/') === -1
	    ? exports.lookup(str)
	    : str
	
	  if (!mime) {
	    return false
	  }
	
	  // TODO: use content-type or other module
	  if (mime.indexOf('charset') === -1) {
	    var charset = exports.charset(mime)
	    if (charset) mime += '; charset=' + charset.toLowerCase()
	  }
	
	  return mime
	}
	
	/**
	 * Get the default extension for a MIME type.
	 *
	 * @param {string} type
	 * @return {boolean|string}
	 */
	
	function extension (type) {
	  if (!type || typeof type !== 'string') {
	    return false
	  }
	
	  // TODO: use media-typer
	  var match = extractTypeRegExp.exec(type)
	
	  // get extensions
	  var exts = match && exports.extensions[match[1].toLowerCase()]
	
	  if (!exts || !exts.length) {
	    return false
	  }
	
	  return exts[0]
	}
	
	/**
	 * Lookup the MIME type for a file path/extension.
	 *
	 * @param {string} path
	 * @return {boolean|string}
	 */
	
	function lookup (path) {
	  if (!path || typeof path !== 'string') {
	    return false
	  }
	
	  // get the extension ("ext" or ".ext" or full path)
	  var extension = extname('x.' + path)
	    .toLowerCase()
	    .substr(1)
	
	  if (!extension) {
	    return false
	  }
	
	  return exports.types[extension] || false
	}
	
	/**
	 * Populate the extensions and types maps.
	 * @private
	 */
	
	function populateMaps (extensions, types) {
	  // source preference (least -> most)
	  var preference = ['nginx', 'apache', undefined, 'iana']
	
	  Object.keys(db).forEach(function forEachMimeType (type) {
	    var mime = db[type]
	    var exts = mime.extensions
	
	    if (!exts || !exts.length) {
	      return
	    }
	
	    // mime -> extensions
	    extensions[type] = exts
	
	    // extension -> mime
	    for (var i = 0; i < exts.length; i++) {
	      var extension = exts[i]
	
	      if (types[extension]) {
	        var from = preference.indexOf(db[types[extension]].source)
	        var to = preference.indexOf(mime.source)
	
	        if (types[extension] !== 'application/octet-stream' &&
	          from > to || (from === to && types[extension].substr(0, 12) === 'application/')) {
	          // skip the remapping
	          continue
	        }
	      }
	
	      // set the extension -> mime
	      types[extension] = type
	    }
	  })
	}


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * mime-db
	 * Copyright(c) 2014 Jonathan Ong
	 * MIT Licensed
	 */
	
	/**
	 * Module exports.
	 */
	
	module.exports = __webpack_require__(131)


/***/ },
/* 131 */
/***/ function(module, exports) {

	module.exports = {
		"application/1d-interleaved-parityfec": {
			"source": "iana"
		},
		"application/3gpdash-qoe-report+xml": {
			"source": "iana"
		},
		"application/3gpp-ims+xml": {
			"source": "iana"
		},
		"application/a2l": {
			"source": "iana"
		},
		"application/activemessage": {
			"source": "iana"
		},
		"application/alto-costmap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-costmapfilter+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-directory+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointcost+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointcostparams+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointprop+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointpropparams+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-error+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-networkmap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-networkmapfilter+json": {
			"source": "iana",
			"compressible": true
		},
		"application/aml": {
			"source": "iana"
		},
		"application/andrew-inset": {
			"source": "iana",
			"extensions": [
				"ez"
			]
		},
		"application/applefile": {
			"source": "iana"
		},
		"application/applixware": {
			"source": "apache",
			"extensions": [
				"aw"
			]
		},
		"application/atf": {
			"source": "iana"
		},
		"application/atfx": {
			"source": "iana"
		},
		"application/atom+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"atom"
			]
		},
		"application/atomcat+xml": {
			"source": "iana",
			"extensions": [
				"atomcat"
			]
		},
		"application/atomdeleted+xml": {
			"source": "iana"
		},
		"application/atomicmail": {
			"source": "iana"
		},
		"application/atomsvc+xml": {
			"source": "iana",
			"extensions": [
				"atomsvc"
			]
		},
		"application/atxml": {
			"source": "iana"
		},
		"application/auth-policy+xml": {
			"source": "iana"
		},
		"application/bacnet-xdd+zip": {
			"source": "iana"
		},
		"application/batch-smtp": {
			"source": "iana"
		},
		"application/bdoc": {
			"compressible": false,
			"extensions": [
				"bdoc"
			]
		},
		"application/beep+xml": {
			"source": "iana"
		},
		"application/calendar+json": {
			"source": "iana",
			"compressible": true
		},
		"application/calendar+xml": {
			"source": "iana"
		},
		"application/call-completion": {
			"source": "iana"
		},
		"application/cals-1840": {
			"source": "iana"
		},
		"application/cbor": {
			"source": "iana"
		},
		"application/ccmp+xml": {
			"source": "iana"
		},
		"application/ccxml+xml": {
			"source": "iana",
			"extensions": [
				"ccxml"
			]
		},
		"application/cdfx+xml": {
			"source": "iana"
		},
		"application/cdmi-capability": {
			"source": "iana",
			"extensions": [
				"cdmia"
			]
		},
		"application/cdmi-container": {
			"source": "iana",
			"extensions": [
				"cdmic"
			]
		},
		"application/cdmi-domain": {
			"source": "iana",
			"extensions": [
				"cdmid"
			]
		},
		"application/cdmi-object": {
			"source": "iana",
			"extensions": [
				"cdmio"
			]
		},
		"application/cdmi-queue": {
			"source": "iana",
			"extensions": [
				"cdmiq"
			]
		},
		"application/cdni": {
			"source": "iana"
		},
		"application/cea": {
			"source": "iana"
		},
		"application/cea-2018+xml": {
			"source": "iana"
		},
		"application/cellml+xml": {
			"source": "iana"
		},
		"application/cfw": {
			"source": "iana"
		},
		"application/clue_info+xml": {
			"source": "iana"
		},
		"application/cms": {
			"source": "iana"
		},
		"application/cnrp+xml": {
			"source": "iana"
		},
		"application/coap-group+json": {
			"source": "iana",
			"compressible": true
		},
		"application/coap-payload": {
			"source": "iana"
		},
		"application/commonground": {
			"source": "iana"
		},
		"application/conference-info+xml": {
			"source": "iana"
		},
		"application/cose": {
			"source": "iana"
		},
		"application/cose-key": {
			"source": "iana"
		},
		"application/cose-key-set": {
			"source": "iana"
		},
		"application/cpl+xml": {
			"source": "iana"
		},
		"application/csrattrs": {
			"source": "iana"
		},
		"application/csta+xml": {
			"source": "iana"
		},
		"application/cstadata+xml": {
			"source": "iana"
		},
		"application/csvm+json": {
			"source": "iana",
			"compressible": true
		},
		"application/cu-seeme": {
			"source": "apache",
			"extensions": [
				"cu"
			]
		},
		"application/cybercash": {
			"source": "iana"
		},
		"application/dart": {
			"compressible": true
		},
		"application/dash+xml": {
			"source": "iana",
			"extensions": [
				"mpd"
			]
		},
		"application/dashdelta": {
			"source": "iana"
		},
		"application/davmount+xml": {
			"source": "iana",
			"extensions": [
				"davmount"
			]
		},
		"application/dca-rft": {
			"source": "iana"
		},
		"application/dcd": {
			"source": "iana"
		},
		"application/dec-dx": {
			"source": "iana"
		},
		"application/dialog-info+xml": {
			"source": "iana"
		},
		"application/dicom": {
			"source": "iana"
		},
		"application/dicom+json": {
			"source": "iana",
			"compressible": true
		},
		"application/dicom+xml": {
			"source": "iana"
		},
		"application/dii": {
			"source": "iana"
		},
		"application/dit": {
			"source": "iana"
		},
		"application/dns": {
			"source": "iana"
		},
		"application/docbook+xml": {
			"source": "apache",
			"extensions": [
				"dbk"
			]
		},
		"application/dskpp+xml": {
			"source": "iana"
		},
		"application/dssc+der": {
			"source": "iana",
			"extensions": [
				"dssc"
			]
		},
		"application/dssc+xml": {
			"source": "iana",
			"extensions": [
				"xdssc"
			]
		},
		"application/dvcs": {
			"source": "iana"
		},
		"application/ecmascript": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"ecma"
			]
		},
		"application/edi-consent": {
			"source": "iana"
		},
		"application/edi-x12": {
			"source": "iana",
			"compressible": false
		},
		"application/edifact": {
			"source": "iana",
			"compressible": false
		},
		"application/efi": {
			"source": "iana"
		},
		"application/emergencycalldata.comment+xml": {
			"source": "iana"
		},
		"application/emergencycalldata.deviceinfo+xml": {
			"source": "iana"
		},
		"application/emergencycalldata.providerinfo+xml": {
			"source": "iana"
		},
		"application/emergencycalldata.serviceinfo+xml": {
			"source": "iana"
		},
		"application/emergencycalldata.subscriberinfo+xml": {
			"source": "iana"
		},
		"application/emma+xml": {
			"source": "iana",
			"extensions": [
				"emma"
			]
		},
		"application/emotionml+xml": {
			"source": "iana"
		},
		"application/encaprtp": {
			"source": "iana"
		},
		"application/epp+xml": {
			"source": "iana"
		},
		"application/epub+zip": {
			"source": "iana",
			"extensions": [
				"epub"
			]
		},
		"application/eshop": {
			"source": "iana"
		},
		"application/exi": {
			"source": "iana",
			"extensions": [
				"exi"
			]
		},
		"application/fastinfoset": {
			"source": "iana"
		},
		"application/fastsoap": {
			"source": "iana"
		},
		"application/fdt+xml": {
			"source": "iana"
		},
		"application/fits": {
			"source": "iana"
		},
		"application/font-sfnt": {
			"source": "iana"
		},
		"application/font-tdpfr": {
			"source": "iana",
			"extensions": [
				"pfr"
			]
		},
		"application/font-woff": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"woff"
			]
		},
		"application/font-woff2": {
			"compressible": false,
			"extensions": [
				"woff2"
			]
		},
		"application/framework-attributes+xml": {
			"source": "iana"
		},
		"application/geo+json": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"geojson"
			]
		},
		"application/gml+xml": {
			"source": "iana",
			"extensions": [
				"gml"
			]
		},
		"application/gpx+xml": {
			"source": "apache",
			"extensions": [
				"gpx"
			]
		},
		"application/gxf": {
			"source": "apache",
			"extensions": [
				"gxf"
			]
		},
		"application/gzip": {
			"source": "iana",
			"compressible": false
		},
		"application/h224": {
			"source": "iana"
		},
		"application/held+xml": {
			"source": "iana"
		},
		"application/http": {
			"source": "iana"
		},
		"application/hyperstudio": {
			"source": "iana",
			"extensions": [
				"stk"
			]
		},
		"application/ibe-key-request+xml": {
			"source": "iana"
		},
		"application/ibe-pkg-reply+xml": {
			"source": "iana"
		},
		"application/ibe-pp-data": {
			"source": "iana"
		},
		"application/iges": {
			"source": "iana"
		},
		"application/im-iscomposing+xml": {
			"source": "iana"
		},
		"application/index": {
			"source": "iana"
		},
		"application/index.cmd": {
			"source": "iana"
		},
		"application/index.obj": {
			"source": "iana"
		},
		"application/index.response": {
			"source": "iana"
		},
		"application/index.vnd": {
			"source": "iana"
		},
		"application/inkml+xml": {
			"source": "iana",
			"extensions": [
				"ink",
				"inkml"
			]
		},
		"application/iotp": {
			"source": "iana"
		},
		"application/ipfix": {
			"source": "iana",
			"extensions": [
				"ipfix"
			]
		},
		"application/ipp": {
			"source": "iana"
		},
		"application/isup": {
			"source": "iana"
		},
		"application/its+xml": {
			"source": "iana"
		},
		"application/java-archive": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"jar",
				"war",
				"ear"
			]
		},
		"application/java-serialized-object": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"ser"
			]
		},
		"application/java-vm": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"class"
			]
		},
		"application/javascript": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": [
				"js"
			]
		},
		"application/jose": {
			"source": "iana"
		},
		"application/jose+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jrd+json": {
			"source": "iana",
			"compressible": true
		},
		"application/json": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": [
				"json",
				"map"
			]
		},
		"application/json-patch+json": {
			"source": "iana",
			"compressible": true
		},
		"application/json-seq": {
			"source": "iana"
		},
		"application/json5": {
			"extensions": [
				"json5"
			]
		},
		"application/jsonml+json": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"jsonml"
			]
		},
		"application/jwk+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jwk-set+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jwt": {
			"source": "iana"
		},
		"application/kpml-request+xml": {
			"source": "iana"
		},
		"application/kpml-response+xml": {
			"source": "iana"
		},
		"application/ld+json": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"jsonld"
			]
		},
		"application/lgr+xml": {
			"source": "iana"
		},
		"application/link-format": {
			"source": "iana"
		},
		"application/load-control+xml": {
			"source": "iana"
		},
		"application/lost+xml": {
			"source": "iana",
			"extensions": [
				"lostxml"
			]
		},
		"application/lostsync+xml": {
			"source": "iana"
		},
		"application/lxf": {
			"source": "iana"
		},
		"application/mac-binhex40": {
			"source": "iana",
			"extensions": [
				"hqx"
			]
		},
		"application/mac-compactpro": {
			"source": "apache",
			"extensions": [
				"cpt"
			]
		},
		"application/macwriteii": {
			"source": "iana"
		},
		"application/mads+xml": {
			"source": "iana",
			"extensions": [
				"mads"
			]
		},
		"application/manifest+json": {
			"charset": "UTF-8",
			"compressible": true,
			"extensions": [
				"webmanifest"
			]
		},
		"application/marc": {
			"source": "iana",
			"extensions": [
				"mrc"
			]
		},
		"application/marcxml+xml": {
			"source": "iana",
			"extensions": [
				"mrcx"
			]
		},
		"application/mathematica": {
			"source": "iana",
			"extensions": [
				"ma",
				"nb",
				"mb"
			]
		},
		"application/mathml+xml": {
			"source": "iana",
			"extensions": [
				"mathml"
			]
		},
		"application/mathml-content+xml": {
			"source": "iana"
		},
		"application/mathml-presentation+xml": {
			"source": "iana"
		},
		"application/mbms-associated-procedure-description+xml": {
			"source": "iana"
		},
		"application/mbms-deregister+xml": {
			"source": "iana"
		},
		"application/mbms-envelope+xml": {
			"source": "iana"
		},
		"application/mbms-msk+xml": {
			"source": "iana"
		},
		"application/mbms-msk-response+xml": {
			"source": "iana"
		},
		"application/mbms-protection-description+xml": {
			"source": "iana"
		},
		"application/mbms-reception-report+xml": {
			"source": "iana"
		},
		"application/mbms-register+xml": {
			"source": "iana"
		},
		"application/mbms-register-response+xml": {
			"source": "iana"
		},
		"application/mbms-schedule+xml": {
			"source": "iana"
		},
		"application/mbms-user-service-description+xml": {
			"source": "iana"
		},
		"application/mbox": {
			"source": "iana",
			"extensions": [
				"mbox"
			]
		},
		"application/media-policy-dataset+xml": {
			"source": "iana"
		},
		"application/media_control+xml": {
			"source": "iana"
		},
		"application/mediaservercontrol+xml": {
			"source": "iana",
			"extensions": [
				"mscml"
			]
		},
		"application/merge-patch+json": {
			"source": "iana",
			"compressible": true
		},
		"application/metalink+xml": {
			"source": "apache",
			"extensions": [
				"metalink"
			]
		},
		"application/metalink4+xml": {
			"source": "iana",
			"extensions": [
				"meta4"
			]
		},
		"application/mets+xml": {
			"source": "iana",
			"extensions": [
				"mets"
			]
		},
		"application/mf4": {
			"source": "iana"
		},
		"application/mikey": {
			"source": "iana"
		},
		"application/mods+xml": {
			"source": "iana",
			"extensions": [
				"mods"
			]
		},
		"application/moss-keys": {
			"source": "iana"
		},
		"application/moss-signature": {
			"source": "iana"
		},
		"application/mosskey-data": {
			"source": "iana"
		},
		"application/mosskey-request": {
			"source": "iana"
		},
		"application/mp21": {
			"source": "iana",
			"extensions": [
				"m21",
				"mp21"
			]
		},
		"application/mp4": {
			"source": "iana",
			"extensions": [
				"mp4s",
				"m4p"
			]
		},
		"application/mpeg4-generic": {
			"source": "iana"
		},
		"application/mpeg4-iod": {
			"source": "iana"
		},
		"application/mpeg4-iod-xmt": {
			"source": "iana"
		},
		"application/mrb-consumer+xml": {
			"source": "iana"
		},
		"application/mrb-publish+xml": {
			"source": "iana"
		},
		"application/msc-ivr+xml": {
			"source": "iana"
		},
		"application/msc-mixer+xml": {
			"source": "iana"
		},
		"application/msword": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"doc",
				"dot"
			]
		},
		"application/mud+json": {
			"source": "iana",
			"compressible": true
		},
		"application/mxf": {
			"source": "iana",
			"extensions": [
				"mxf"
			]
		},
		"application/nasdata": {
			"source": "iana"
		},
		"application/news-checkgroups": {
			"source": "iana"
		},
		"application/news-groupinfo": {
			"source": "iana"
		},
		"application/news-transmission": {
			"source": "iana"
		},
		"application/nlsml+xml": {
			"source": "iana"
		},
		"application/nss": {
			"source": "iana"
		},
		"application/ocsp-request": {
			"source": "iana"
		},
		"application/ocsp-response": {
			"source": "iana"
		},
		"application/octet-stream": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"bin",
				"dms",
				"lrf",
				"mar",
				"so",
				"dist",
				"distz",
				"pkg",
				"bpk",
				"dump",
				"elc",
				"deploy",
				"exe",
				"dll",
				"deb",
				"dmg",
				"iso",
				"img",
				"msi",
				"msp",
				"msm",
				"buffer"
			]
		},
		"application/oda": {
			"source": "iana",
			"extensions": [
				"oda"
			]
		},
		"application/odx": {
			"source": "iana"
		},
		"application/oebps-package+xml": {
			"source": "iana",
			"extensions": [
				"opf"
			]
		},
		"application/ogg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"ogx"
			]
		},
		"application/omdoc+xml": {
			"source": "apache",
			"extensions": [
				"omdoc"
			]
		},
		"application/onenote": {
			"source": "apache",
			"extensions": [
				"onetoc",
				"onetoc2",
				"onetmp",
				"onepkg"
			]
		},
		"application/oxps": {
			"source": "iana",
			"extensions": [
				"oxps"
			]
		},
		"application/p2p-overlay+xml": {
			"source": "iana"
		},
		"application/parityfec": {
			"source": "iana"
		},
		"application/patch-ops-error+xml": {
			"source": "iana",
			"extensions": [
				"xer"
			]
		},
		"application/pdf": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"pdf"
			]
		},
		"application/pdx": {
			"source": "iana"
		},
		"application/pgp-encrypted": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"pgp"
			]
		},
		"application/pgp-keys": {
			"source": "iana"
		},
		"application/pgp-signature": {
			"source": "iana",
			"extensions": [
				"asc",
				"sig"
			]
		},
		"application/pics-rules": {
			"source": "apache",
			"extensions": [
				"prf"
			]
		},
		"application/pidf+xml": {
			"source": "iana"
		},
		"application/pidf-diff+xml": {
			"source": "iana"
		},
		"application/pkcs10": {
			"source": "iana",
			"extensions": [
				"p10"
			]
		},
		"application/pkcs12": {
			"source": "iana"
		},
		"application/pkcs7-mime": {
			"source": "iana",
			"extensions": [
				"p7m",
				"p7c"
			]
		},
		"application/pkcs7-signature": {
			"source": "iana",
			"extensions": [
				"p7s"
			]
		},
		"application/pkcs8": {
			"source": "iana",
			"extensions": [
				"p8"
			]
		},
		"application/pkix-attr-cert": {
			"source": "iana",
			"extensions": [
				"ac"
			]
		},
		"application/pkix-cert": {
			"source": "iana",
			"extensions": [
				"cer"
			]
		},
		"application/pkix-crl": {
			"source": "iana",
			"extensions": [
				"crl"
			]
		},
		"application/pkix-pkipath": {
			"source": "iana",
			"extensions": [
				"pkipath"
			]
		},
		"application/pkixcmp": {
			"source": "iana",
			"extensions": [
				"pki"
			]
		},
		"application/pls+xml": {
			"source": "iana",
			"extensions": [
				"pls"
			]
		},
		"application/poc-settings+xml": {
			"source": "iana"
		},
		"application/postscript": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"ai",
				"eps",
				"ps"
			]
		},
		"application/ppsp-tracker+json": {
			"source": "iana",
			"compressible": true
		},
		"application/problem+json": {
			"source": "iana",
			"compressible": true
		},
		"application/problem+xml": {
			"source": "iana"
		},
		"application/provenance+xml": {
			"source": "iana"
		},
		"application/prs.alvestrand.titrax-sheet": {
			"source": "iana"
		},
		"application/prs.cww": {
			"source": "iana",
			"extensions": [
				"cww"
			]
		},
		"application/prs.hpub+zip": {
			"source": "iana"
		},
		"application/prs.nprend": {
			"source": "iana"
		},
		"application/prs.plucker": {
			"source": "iana"
		},
		"application/prs.rdf-xml-crypt": {
			"source": "iana"
		},
		"application/prs.xsf+xml": {
			"source": "iana"
		},
		"application/pskc+xml": {
			"source": "iana",
			"extensions": [
				"pskcxml"
			]
		},
		"application/qsig": {
			"source": "iana"
		},
		"application/raptorfec": {
			"source": "iana"
		},
		"application/rdap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/rdf+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"rdf"
			]
		},
		"application/reginfo+xml": {
			"source": "iana",
			"extensions": [
				"rif"
			]
		},
		"application/relax-ng-compact-syntax": {
			"source": "iana",
			"extensions": [
				"rnc"
			]
		},
		"application/remote-printing": {
			"source": "iana"
		},
		"application/reputon+json": {
			"source": "iana",
			"compressible": true
		},
		"application/resource-lists+xml": {
			"source": "iana",
			"extensions": [
				"rl"
			]
		},
		"application/resource-lists-diff+xml": {
			"source": "iana",
			"extensions": [
				"rld"
			]
		},
		"application/rfc+xml": {
			"source": "iana"
		},
		"application/riscos": {
			"source": "iana"
		},
		"application/rlmi+xml": {
			"source": "iana"
		},
		"application/rls-services+xml": {
			"source": "iana",
			"extensions": [
				"rs"
			]
		},
		"application/rpki-ghostbusters": {
			"source": "iana",
			"extensions": [
				"gbr"
			]
		},
		"application/rpki-manifest": {
			"source": "iana",
			"extensions": [
				"mft"
			]
		},
		"application/rpki-roa": {
			"source": "iana",
			"extensions": [
				"roa"
			]
		},
		"application/rpki-updown": {
			"source": "iana"
		},
		"application/rsd+xml": {
			"source": "apache",
			"extensions": [
				"rsd"
			]
		},
		"application/rss+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"rss"
			]
		},
		"application/rtf": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"rtf"
			]
		},
		"application/rtploopback": {
			"source": "iana"
		},
		"application/rtx": {
			"source": "iana"
		},
		"application/samlassertion+xml": {
			"source": "iana"
		},
		"application/samlmetadata+xml": {
			"source": "iana"
		},
		"application/sbml+xml": {
			"source": "iana",
			"extensions": [
				"sbml"
			]
		},
		"application/scaip+xml": {
			"source": "iana"
		},
		"application/scim+json": {
			"source": "iana",
			"compressible": true
		},
		"application/scvp-cv-request": {
			"source": "iana",
			"extensions": [
				"scq"
			]
		},
		"application/scvp-cv-response": {
			"source": "iana",
			"extensions": [
				"scs"
			]
		},
		"application/scvp-vp-request": {
			"source": "iana",
			"extensions": [
				"spq"
			]
		},
		"application/scvp-vp-response": {
			"source": "iana",
			"extensions": [
				"spp"
			]
		},
		"application/sdp": {
			"source": "iana",
			"extensions": [
				"sdp"
			]
		},
		"application/sep+xml": {
			"source": "iana"
		},
		"application/sep-exi": {
			"source": "iana"
		},
		"application/session-info": {
			"source": "iana"
		},
		"application/set-payment": {
			"source": "iana"
		},
		"application/set-payment-initiation": {
			"source": "iana",
			"extensions": [
				"setpay"
			]
		},
		"application/set-registration": {
			"source": "iana"
		},
		"application/set-registration-initiation": {
			"source": "iana",
			"extensions": [
				"setreg"
			]
		},
		"application/sgml": {
			"source": "iana"
		},
		"application/sgml-open-catalog": {
			"source": "iana"
		},
		"application/shf+xml": {
			"source": "iana",
			"extensions": [
				"shf"
			]
		},
		"application/sieve": {
			"source": "iana"
		},
		"application/simple-filter+xml": {
			"source": "iana"
		},
		"application/simple-message-summary": {
			"source": "iana"
		},
		"application/simplesymbolcontainer": {
			"source": "iana"
		},
		"application/slate": {
			"source": "iana"
		},
		"application/smil": {
			"source": "iana"
		},
		"application/smil+xml": {
			"source": "iana",
			"extensions": [
				"smi",
				"smil"
			]
		},
		"application/smpte336m": {
			"source": "iana"
		},
		"application/soap+fastinfoset": {
			"source": "iana"
		},
		"application/soap+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/sparql-query": {
			"source": "iana",
			"extensions": [
				"rq"
			]
		},
		"application/sparql-results+xml": {
			"source": "iana",
			"extensions": [
				"srx"
			]
		},
		"application/spirits-event+xml": {
			"source": "iana"
		},
		"application/sql": {
			"source": "iana"
		},
		"application/srgs": {
			"source": "iana",
			"extensions": [
				"gram"
			]
		},
		"application/srgs+xml": {
			"source": "iana",
			"extensions": [
				"grxml"
			]
		},
		"application/sru+xml": {
			"source": "iana",
			"extensions": [
				"sru"
			]
		},
		"application/ssdl+xml": {
			"source": "apache",
			"extensions": [
				"ssdl"
			]
		},
		"application/ssml+xml": {
			"source": "iana",
			"extensions": [
				"ssml"
			]
		},
		"application/tamp-apex-update": {
			"source": "iana"
		},
		"application/tamp-apex-update-confirm": {
			"source": "iana"
		},
		"application/tamp-community-update": {
			"source": "iana"
		},
		"application/tamp-community-update-confirm": {
			"source": "iana"
		},
		"application/tamp-error": {
			"source": "iana"
		},
		"application/tamp-sequence-adjust": {
			"source": "iana"
		},
		"application/tamp-sequence-adjust-confirm": {
			"source": "iana"
		},
		"application/tamp-status-query": {
			"source": "iana"
		},
		"application/tamp-status-response": {
			"source": "iana"
		},
		"application/tamp-update": {
			"source": "iana"
		},
		"application/tamp-update-confirm": {
			"source": "iana"
		},
		"application/tar": {
			"compressible": true
		},
		"application/tei+xml": {
			"source": "iana",
			"extensions": [
				"tei",
				"teicorpus"
			]
		},
		"application/thraud+xml": {
			"source": "iana",
			"extensions": [
				"tfi"
			]
		},
		"application/timestamp-query": {
			"source": "iana"
		},
		"application/timestamp-reply": {
			"source": "iana"
		},
		"application/timestamped-data": {
			"source": "iana",
			"extensions": [
				"tsd"
			]
		},
		"application/trig": {
			"source": "iana"
		},
		"application/ttml+xml": {
			"source": "iana"
		},
		"application/tve-trigger": {
			"source": "iana"
		},
		"application/ulpfec": {
			"source": "iana"
		},
		"application/urc-grpsheet+xml": {
			"source": "iana"
		},
		"application/urc-ressheet+xml": {
			"source": "iana"
		},
		"application/urc-targetdesc+xml": {
			"source": "iana"
		},
		"application/urc-uisocketdesc+xml": {
			"source": "iana"
		},
		"application/vcard+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vcard+xml": {
			"source": "iana"
		},
		"application/vemmi": {
			"source": "iana"
		},
		"application/vividence.scriptfile": {
			"source": "apache"
		},
		"application/vnd.3gpp-prose+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp-prose-pc3ch+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.access-transfer-events+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.bsf+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.mid-call+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.pic-bw-large": {
			"source": "iana",
			"extensions": [
				"plb"
			]
		},
		"application/vnd.3gpp.pic-bw-small": {
			"source": "iana",
			"extensions": [
				"psb"
			]
		},
		"application/vnd.3gpp.pic-bw-var": {
			"source": "iana",
			"extensions": [
				"pvb"
			]
		},
		"application/vnd.3gpp.sms": {
			"source": "iana"
		},
		"application/vnd.3gpp.sms+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.srvcc-ext+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.srvcc-info+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.state-and-event-info+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.ussd+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp2.bcmcsinfo+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp2.sms": {
			"source": "iana"
		},
		"application/vnd.3gpp2.tcap": {
			"source": "iana",
			"extensions": [
				"tcap"
			]
		},
		"application/vnd.3lightssoftware.imagescal": {
			"source": "iana"
		},
		"application/vnd.3m.post-it-notes": {
			"source": "iana",
			"extensions": [
				"pwn"
			]
		},
		"application/vnd.accpac.simply.aso": {
			"source": "iana",
			"extensions": [
				"aso"
			]
		},
		"application/vnd.accpac.simply.imp": {
			"source": "iana",
			"extensions": [
				"imp"
			]
		},
		"application/vnd.acucobol": {
			"source": "iana",
			"extensions": [
				"acu"
			]
		},
		"application/vnd.acucorp": {
			"source": "iana",
			"extensions": [
				"atc",
				"acutc"
			]
		},
		"application/vnd.adobe.air-application-installer-package+zip": {
			"source": "apache",
			"extensions": [
				"air"
			]
		},
		"application/vnd.adobe.flash.movie": {
			"source": "iana"
		},
		"application/vnd.adobe.formscentral.fcdt": {
			"source": "iana",
			"extensions": [
				"fcdt"
			]
		},
		"application/vnd.adobe.fxp": {
			"source": "iana",
			"extensions": [
				"fxp",
				"fxpl"
			]
		},
		"application/vnd.adobe.partial-upload": {
			"source": "iana"
		},
		"application/vnd.adobe.xdp+xml": {
			"source": "iana",
			"extensions": [
				"xdp"
			]
		},
		"application/vnd.adobe.xfdf": {
			"source": "iana",
			"extensions": [
				"xfdf"
			]
		},
		"application/vnd.aether.imp": {
			"source": "iana"
		},
		"application/vnd.ah-barcode": {
			"source": "iana"
		},
		"application/vnd.ahead.space": {
			"source": "iana",
			"extensions": [
				"ahead"
			]
		},
		"application/vnd.airzip.filesecure.azf": {
			"source": "iana",
			"extensions": [
				"azf"
			]
		},
		"application/vnd.airzip.filesecure.azs": {
			"source": "iana",
			"extensions": [
				"azs"
			]
		},
		"application/vnd.amazon.ebook": {
			"source": "apache",
			"extensions": [
				"azw"
			]
		},
		"application/vnd.amazon.mobi8-ebook": {
			"source": "iana"
		},
		"application/vnd.americandynamics.acc": {
			"source": "iana",
			"extensions": [
				"acc"
			]
		},
		"application/vnd.amiga.ami": {
			"source": "iana",
			"extensions": [
				"ami"
			]
		},
		"application/vnd.amundsen.maze+xml": {
			"source": "iana"
		},
		"application/vnd.android.package-archive": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"apk"
			]
		},
		"application/vnd.anki": {
			"source": "iana"
		},
		"application/vnd.anser-web-certificate-issue-initiation": {
			"source": "iana",
			"extensions": [
				"cii"
			]
		},
		"application/vnd.anser-web-funds-transfer-initiation": {
			"source": "apache",
			"extensions": [
				"fti"
			]
		},
		"application/vnd.antix.game-component": {
			"source": "iana",
			"extensions": [
				"atx"
			]
		},
		"application/vnd.apache.thrift.binary": {
			"source": "iana"
		},
		"application/vnd.apache.thrift.compact": {
			"source": "iana"
		},
		"application/vnd.apache.thrift.json": {
			"source": "iana"
		},
		"application/vnd.api+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.apple.installer+xml": {
			"source": "iana",
			"extensions": [
				"mpkg"
			]
		},
		"application/vnd.apple.mpegurl": {
			"source": "iana",
			"extensions": [
				"m3u8"
			]
		},
		"application/vnd.apple.pkpass": {
			"compressible": false,
			"extensions": [
				"pkpass"
			]
		},
		"application/vnd.arastra.swi": {
			"source": "iana"
		},
		"application/vnd.aristanetworks.swi": {
			"source": "iana",
			"extensions": [
				"swi"
			]
		},
		"application/vnd.artsquare": {
			"source": "iana"
		},
		"application/vnd.astraea-software.iota": {
			"source": "iana",
			"extensions": [
				"iota"
			]
		},
		"application/vnd.audiograph": {
			"source": "iana",
			"extensions": [
				"aep"
			]
		},
		"application/vnd.autopackage": {
			"source": "iana"
		},
		"application/vnd.avistar+xml": {
			"source": "iana"
		},
		"application/vnd.balsamiq.bmml+xml": {
			"source": "iana"
		},
		"application/vnd.balsamiq.bmpr": {
			"source": "iana"
		},
		"application/vnd.bekitzur-stech+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.biopax.rdf+xml": {
			"source": "iana"
		},
		"application/vnd.blueice.multipass": {
			"source": "iana",
			"extensions": [
				"mpm"
			]
		},
		"application/vnd.bluetooth.ep.oob": {
			"source": "iana"
		},
		"application/vnd.bluetooth.le.oob": {
			"source": "iana"
		},
		"application/vnd.bmi": {
			"source": "iana",
			"extensions": [
				"bmi"
			]
		},
		"application/vnd.businessobjects": {
			"source": "iana",
			"extensions": [
				"rep"
			]
		},
		"application/vnd.cab-jscript": {
			"source": "iana"
		},
		"application/vnd.canon-cpdl": {
			"source": "iana"
		},
		"application/vnd.canon-lips": {
			"source": "iana"
		},
		"application/vnd.cendio.thinlinc.clientconf": {
			"source": "iana"
		},
		"application/vnd.century-systems.tcp_stream": {
			"source": "iana"
		},
		"application/vnd.chemdraw+xml": {
			"source": "iana",
			"extensions": [
				"cdxml"
			]
		},
		"application/vnd.chess-pgn": {
			"source": "iana"
		},
		"application/vnd.chipnuts.karaoke-mmd": {
			"source": "iana",
			"extensions": [
				"mmd"
			]
		},
		"application/vnd.cinderella": {
			"source": "iana",
			"extensions": [
				"cdy"
			]
		},
		"application/vnd.cirpack.isdn-ext": {
			"source": "iana"
		},
		"application/vnd.citationstyles.style+xml": {
			"source": "iana"
		},
		"application/vnd.claymore": {
			"source": "iana",
			"extensions": [
				"cla"
			]
		},
		"application/vnd.cloanto.rp9": {
			"source": "iana",
			"extensions": [
				"rp9"
			]
		},
		"application/vnd.clonk.c4group": {
			"source": "iana",
			"extensions": [
				"c4g",
				"c4d",
				"c4f",
				"c4p",
				"c4u"
			]
		},
		"application/vnd.cluetrust.cartomobile-config": {
			"source": "iana",
			"extensions": [
				"c11amc"
			]
		},
		"application/vnd.cluetrust.cartomobile-config-pkg": {
			"source": "iana",
			"extensions": [
				"c11amz"
			]
		},
		"application/vnd.coffeescript": {
			"source": "iana"
		},
		"application/vnd.collection+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.collection.doc+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.collection.next+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.comicbook+zip": {
			"source": "iana"
		},
		"application/vnd.commerce-battelle": {
			"source": "iana"
		},
		"application/vnd.commonspace": {
			"source": "iana",
			"extensions": [
				"csp"
			]
		},
		"application/vnd.contact.cmsg": {
			"source": "iana",
			"extensions": [
				"cdbcmsg"
			]
		},
		"application/vnd.coreos.ignition+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.cosmocaller": {
			"source": "iana",
			"extensions": [
				"cmc"
			]
		},
		"application/vnd.crick.clicker": {
			"source": "iana",
			"extensions": [
				"clkx"
			]
		},
		"application/vnd.crick.clicker.keyboard": {
			"source": "iana",
			"extensions": [
				"clkk"
			]
		},
		"application/vnd.crick.clicker.palette": {
			"source": "iana",
			"extensions": [
				"clkp"
			]
		},
		"application/vnd.crick.clicker.template": {
			"source": "iana",
			"extensions": [
				"clkt"
			]
		},
		"application/vnd.crick.clicker.wordbank": {
			"source": "iana",
			"extensions": [
				"clkw"
			]
		},
		"application/vnd.criticaltools.wbs+xml": {
			"source": "iana",
			"extensions": [
				"wbs"
			]
		},
		"application/vnd.ctc-posml": {
			"source": "iana",
			"extensions": [
				"pml"
			]
		},
		"application/vnd.ctct.ws+xml": {
			"source": "iana"
		},
		"application/vnd.cups-pdf": {
			"source": "iana"
		},
		"application/vnd.cups-postscript": {
			"source": "iana"
		},
		"application/vnd.cups-ppd": {
			"source": "iana",
			"extensions": [
				"ppd"
			]
		},
		"application/vnd.cups-raster": {
			"source": "iana"
		},
		"application/vnd.cups-raw": {
			"source": "iana"
		},
		"application/vnd.curl": {
			"source": "iana"
		},
		"application/vnd.curl.car": {
			"source": "apache",
			"extensions": [
				"car"
			]
		},
		"application/vnd.curl.pcurl": {
			"source": "apache",
			"extensions": [
				"pcurl"
			]
		},
		"application/vnd.cyan.dean.root+xml": {
			"source": "iana"
		},
		"application/vnd.cybank": {
			"source": "iana"
		},
		"application/vnd.d2l.coursepackage1p0+zip": {
			"source": "iana"
		},
		"application/vnd.dart": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"dart"
			]
		},
		"application/vnd.data-vision.rdz": {
			"source": "iana",
			"extensions": [
				"rdz"
			]
		},
		"application/vnd.dataresource+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.debian.binary-package": {
			"source": "iana"
		},
		"application/vnd.dece.data": {
			"source": "iana",
			"extensions": [
				"uvf",
				"uvvf",
				"uvd",
				"uvvd"
			]
		},
		"application/vnd.dece.ttml+xml": {
			"source": "iana",
			"extensions": [
				"uvt",
				"uvvt"
			]
		},
		"application/vnd.dece.unspecified": {
			"source": "iana",
			"extensions": [
				"uvx",
				"uvvx"
			]
		},
		"application/vnd.dece.zip": {
			"source": "iana",
			"extensions": [
				"uvz",
				"uvvz"
			]
		},
		"application/vnd.denovo.fcselayout-link": {
			"source": "iana",
			"extensions": [
				"fe_launch"
			]
		},
		"application/vnd.desmume-movie": {
			"source": "iana"
		},
		"application/vnd.desmume.movie": {
			"source": "apache"
		},
		"application/vnd.dir-bi.plate-dl-nosuffix": {
			"source": "iana"
		},
		"application/vnd.dm.delegation+xml": {
			"source": "iana"
		},
		"application/vnd.dna": {
			"source": "iana",
			"extensions": [
				"dna"
			]
		},
		"application/vnd.document+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dolby.mlp": {
			"source": "apache",
			"extensions": [
				"mlp"
			]
		},
		"application/vnd.dolby.mobile.1": {
			"source": "iana"
		},
		"application/vnd.dolby.mobile.2": {
			"source": "iana"
		},
		"application/vnd.doremir.scorecloud-binary-document": {
			"source": "iana"
		},
		"application/vnd.dpgraph": {
			"source": "iana",
			"extensions": [
				"dpg"
			]
		},
		"application/vnd.dreamfactory": {
			"source": "iana",
			"extensions": [
				"dfac"
			]
		},
		"application/vnd.drive+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ds-keypoint": {
			"source": "apache",
			"extensions": [
				"kpxx"
			]
		},
		"application/vnd.dtg.local": {
			"source": "iana"
		},
		"application/vnd.dtg.local.flash": {
			"source": "iana"
		},
		"application/vnd.dtg.local.html": {
			"source": "iana"
		},
		"application/vnd.dvb.ait": {
			"source": "iana",
			"extensions": [
				"ait"
			]
		},
		"application/vnd.dvb.dvbj": {
			"source": "iana"
		},
		"application/vnd.dvb.esgcontainer": {
			"source": "iana"
		},
		"application/vnd.dvb.ipdcdftnotifaccess": {
			"source": "iana"
		},
		"application/vnd.dvb.ipdcesgaccess": {
			"source": "iana"
		},
		"application/vnd.dvb.ipdcesgaccess2": {
			"source": "iana"
		},
		"application/vnd.dvb.ipdcesgpdd": {
			"source": "iana"
		},
		"application/vnd.dvb.ipdcroaming": {
			"source": "iana"
		},
		"application/vnd.dvb.iptv.alfec-base": {
			"source": "iana"
		},
		"application/vnd.dvb.iptv.alfec-enhancement": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-aggregate-root+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-container+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-generic+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-ia-msglist+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-ia-registration-request+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-ia-registration-response+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-init+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.pfr": {
			"source": "iana"
		},
		"application/vnd.dvb.service": {
			"source": "iana",
			"extensions": [
				"svc"
			]
		},
		"application/vnd.dxr": {
			"source": "iana"
		},
		"application/vnd.dynageo": {
			"source": "iana",
			"extensions": [
				"geo"
			]
		},
		"application/vnd.dzr": {
			"source": "iana"
		},
		"application/vnd.easykaraoke.cdgdownload": {
			"source": "iana"
		},
		"application/vnd.ecdis-update": {
			"source": "iana"
		},
		"application/vnd.ecowin.chart": {
			"source": "iana",
			"extensions": [
				"mag"
			]
		},
		"application/vnd.ecowin.filerequest": {
			"source": "iana"
		},
		"application/vnd.ecowin.fileupdate": {
			"source": "iana"
		},
		"application/vnd.ecowin.series": {
			"source": "iana"
		},
		"application/vnd.ecowin.seriesrequest": {
			"source": "iana"
		},
		"application/vnd.ecowin.seriesupdate": {
			"source": "iana"
		},
		"application/vnd.emclient.accessrequest+xml": {
			"source": "iana"
		},
		"application/vnd.enliven": {
			"source": "iana",
			"extensions": [
				"nml"
			]
		},
		"application/vnd.enphase.envoy": {
			"source": "iana"
		},
		"application/vnd.eprints.data+xml": {
			"source": "iana"
		},
		"application/vnd.epson.esf": {
			"source": "iana",
			"extensions": [
				"esf"
			]
		},
		"application/vnd.epson.msf": {
			"source": "iana",
			"extensions": [
				"msf"
			]
		},
		"application/vnd.epson.quickanime": {
			"source": "iana",
			"extensions": [
				"qam"
			]
		},
		"application/vnd.epson.salt": {
			"source": "iana",
			"extensions": [
				"slt"
			]
		},
		"application/vnd.epson.ssf": {
			"source": "iana",
			"extensions": [
				"ssf"
			]
		},
		"application/vnd.ericsson.quickcall": {
			"source": "iana"
		},
		"application/vnd.espass-espass+zip": {
			"source": "iana"
		},
		"application/vnd.eszigno3+xml": {
			"source": "iana",
			"extensions": [
				"es3",
				"et3"
			]
		},
		"application/vnd.etsi.aoc+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.asic-e+zip": {
			"source": "iana"
		},
		"application/vnd.etsi.asic-s+zip": {
			"source": "iana"
		},
		"application/vnd.etsi.cug+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvcommand+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvdiscovery+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvprofile+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvsad-bc+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvsad-cod+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvsad-npvr+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvservice+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvsync+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvueprofile+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.mcid+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.mheg5": {
			"source": "iana"
		},
		"application/vnd.etsi.overload-control-policy-dataset+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.pstn+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.sci+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.simservs+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.timestamp-token": {
			"source": "iana"
		},
		"application/vnd.etsi.tsl+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.tsl.der": {
			"source": "iana"
		},
		"application/vnd.eudora.data": {
			"source": "iana"
		},
		"application/vnd.ezpix-album": {
			"source": "iana",
			"extensions": [
				"ez2"
			]
		},
		"application/vnd.ezpix-package": {
			"source": "iana",
			"extensions": [
				"ez3"
			]
		},
		"application/vnd.f-secure.mobile": {
			"source": "iana"
		},
		"application/vnd.fastcopy-disk-image": {
			"source": "iana"
		},
		"application/vnd.fdf": {
			"source": "iana",
			"extensions": [
				"fdf"
			]
		},
		"application/vnd.fdsn.mseed": {
			"source": "iana",
			"extensions": [
				"mseed"
			]
		},
		"application/vnd.fdsn.seed": {
			"source": "iana",
			"extensions": [
				"seed",
				"dataless"
			]
		},
		"application/vnd.ffsns": {
			"source": "iana"
		},
		"application/vnd.filmit.zfc": {
			"source": "iana"
		},
		"application/vnd.fints": {
			"source": "iana"
		},
		"application/vnd.firemonkeys.cloudcell": {
			"source": "iana"
		},
		"application/vnd.flographit": {
			"source": "iana",
			"extensions": [
				"gph"
			]
		},
		"application/vnd.fluxtime.clip": {
			"source": "iana",
			"extensions": [
				"ftc"
			]
		},
		"application/vnd.font-fontforge-sfd": {
			"source": "iana"
		},
		"application/vnd.framemaker": {
			"source": "iana",
			"extensions": [
				"fm",
				"frame",
				"maker",
				"book"
			]
		},
		"application/vnd.frogans.fnc": {
			"source": "iana",
			"extensions": [
				"fnc"
			]
		},
		"application/vnd.frogans.ltf": {
			"source": "iana",
			"extensions": [
				"ltf"
			]
		},
		"application/vnd.fsc.weblaunch": {
			"source": "iana",
			"extensions": [
				"fsc"
			]
		},
		"application/vnd.fujitsu.oasys": {
			"source": "iana",
			"extensions": [
				"oas"
			]
		},
		"application/vnd.fujitsu.oasys2": {
			"source": "iana",
			"extensions": [
				"oa2"
			]
		},
		"application/vnd.fujitsu.oasys3": {
			"source": "iana",
			"extensions": [
				"oa3"
			]
		},
		"application/vnd.fujitsu.oasysgp": {
			"source": "iana",
			"extensions": [
				"fg5"
			]
		},
		"application/vnd.fujitsu.oasysprs": {
			"source": "iana",
			"extensions": [
				"bh2"
			]
		},
		"application/vnd.fujixerox.art-ex": {
			"source": "iana"
		},
		"application/vnd.fujixerox.art4": {
			"source": "iana"
		},
		"application/vnd.fujixerox.ddd": {
			"source": "iana",
			"extensions": [
				"ddd"
			]
		},
		"application/vnd.fujixerox.docuworks": {
			"source": "iana",
			"extensions": [
				"xdw"
			]
		},
		"application/vnd.fujixerox.docuworks.binder": {
			"source": "iana",
			"extensions": [
				"xbd"
			]
		},
		"application/vnd.fujixerox.docuworks.container": {
			"source": "iana"
		},
		"application/vnd.fujixerox.hbpl": {
			"source": "iana"
		},
		"application/vnd.fut-misnet": {
			"source": "iana"
		},
		"application/vnd.fuzzysheet": {
			"source": "iana",
			"extensions": [
				"fzs"
			]
		},
		"application/vnd.genomatix.tuxedo": {
			"source": "iana",
			"extensions": [
				"txd"
			]
		},
		"application/vnd.geo+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.geocube+xml": {
			"source": "iana"
		},
		"application/vnd.geogebra.file": {
			"source": "iana",
			"extensions": [
				"ggb"
			]
		},
		"application/vnd.geogebra.tool": {
			"source": "iana",
			"extensions": [
				"ggt"
			]
		},
		"application/vnd.geometry-explorer": {
			"source": "iana",
			"extensions": [
				"gex",
				"gre"
			]
		},
		"application/vnd.geonext": {
			"source": "iana",
			"extensions": [
				"gxt"
			]
		},
		"application/vnd.geoplan": {
			"source": "iana",
			"extensions": [
				"g2w"
			]
		},
		"application/vnd.geospace": {
			"source": "iana",
			"extensions": [
				"g3w"
			]
		},
		"application/vnd.gerber": {
			"source": "iana"
		},
		"application/vnd.globalplatform.card-content-mgt": {
			"source": "iana"
		},
		"application/vnd.globalplatform.card-content-mgt-response": {
			"source": "iana"
		},
		"application/vnd.gmx": {
			"source": "iana",
			"extensions": [
				"gmx"
			]
		},
		"application/vnd.google-apps.document": {
			"compressible": false,
			"extensions": [
				"gdoc"
			]
		},
		"application/vnd.google-apps.presentation": {
			"compressible": false,
			"extensions": [
				"gslides"
			]
		},
		"application/vnd.google-apps.spreadsheet": {
			"compressible": false,
			"extensions": [
				"gsheet"
			]
		},
		"application/vnd.google-earth.kml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"kml"
			]
		},
		"application/vnd.google-earth.kmz": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"kmz"
			]
		},
		"application/vnd.gov.sk.e-form+xml": {
			"source": "iana"
		},
		"application/vnd.gov.sk.e-form+zip": {
			"source": "iana"
		},
		"application/vnd.gov.sk.xmldatacontainer+xml": {
			"source": "iana"
		},
		"application/vnd.grafeq": {
			"source": "iana",
			"extensions": [
				"gqf",
				"gqs"
			]
		},
		"application/vnd.gridmp": {
			"source": "iana"
		},
		"application/vnd.groove-account": {
			"source": "iana",
			"extensions": [
				"gac"
			]
		},
		"application/vnd.groove-help": {
			"source": "iana",
			"extensions": [
				"ghf"
			]
		},
		"application/vnd.groove-identity-message": {
			"source": "iana",
			"extensions": [
				"gim"
			]
		},
		"application/vnd.groove-injector": {
			"source": "iana",
			"extensions": [
				"grv"
			]
		},
		"application/vnd.groove-tool-message": {
			"source": "iana",
			"extensions": [
				"gtm"
			]
		},
		"application/vnd.groove-tool-template": {
			"source": "iana",
			"extensions": [
				"tpl"
			]
		},
		"application/vnd.groove-vcard": {
			"source": "iana",
			"extensions": [
				"vcg"
			]
		},
		"application/vnd.hal+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hal+xml": {
			"source": "iana",
			"extensions": [
				"hal"
			]
		},
		"application/vnd.handheld-entertainment+xml": {
			"source": "iana",
			"extensions": [
				"zmm"
			]
		},
		"application/vnd.hbci": {
			"source": "iana",
			"extensions": [
				"hbci"
			]
		},
		"application/vnd.hc+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hcl-bireports": {
			"source": "iana"
		},
		"application/vnd.hdt": {
			"source": "iana"
		},
		"application/vnd.heroku+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hhe.lesson-player": {
			"source": "iana",
			"extensions": [
				"les"
			]
		},
		"application/vnd.hp-hpgl": {
			"source": "iana",
			"extensions": [
				"hpgl"
			]
		},
		"application/vnd.hp-hpid": {
			"source": "iana",
			"extensions": [
				"hpid"
			]
		},
		"application/vnd.hp-hps": {
			"source": "iana",
			"extensions": [
				"hps"
			]
		},
		"application/vnd.hp-jlyt": {
			"source": "iana",
			"extensions": [
				"jlt"
			]
		},
		"application/vnd.hp-pcl": {
			"source": "iana",
			"extensions": [
				"pcl"
			]
		},
		"application/vnd.hp-pclxl": {
			"source": "iana",
			"extensions": [
				"pclxl"
			]
		},
		"application/vnd.httphone": {
			"source": "iana"
		},
		"application/vnd.hydrostatix.sof-data": {
			"source": "iana",
			"extensions": [
				"sfd-hdstx"
			]
		},
		"application/vnd.hyperdrive+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hzn-3d-crossword": {
			"source": "iana"
		},
		"application/vnd.ibm.afplinedata": {
			"source": "iana"
		},
		"application/vnd.ibm.electronic-media": {
			"source": "iana"
		},
		"application/vnd.ibm.minipay": {
			"source": "iana",
			"extensions": [
				"mpy"
			]
		},
		"application/vnd.ibm.modcap": {
			"source": "iana",
			"extensions": [
				"afp",
				"listafp",
				"list3820"
			]
		},
		"application/vnd.ibm.rights-management": {
			"source": "iana",
			"extensions": [
				"irm"
			]
		},
		"application/vnd.ibm.secure-container": {
			"source": "iana",
			"extensions": [
				"sc"
			]
		},
		"application/vnd.iccprofile": {
			"source": "iana",
			"extensions": [
				"icc",
				"icm"
			]
		},
		"application/vnd.ieee.1905": {
			"source": "iana"
		},
		"application/vnd.igloader": {
			"source": "iana",
			"extensions": [
				"igl"
			]
		},
		"application/vnd.immervision-ivp": {
			"source": "iana",
			"extensions": [
				"ivp"
			]
		},
		"application/vnd.immervision-ivu": {
			"source": "iana",
			"extensions": [
				"ivu"
			]
		},
		"application/vnd.ims.imsccv1p1": {
			"source": "iana"
		},
		"application/vnd.ims.imsccv1p2": {
			"source": "iana"
		},
		"application/vnd.ims.imsccv1p3": {
			"source": "iana"
		},
		"application/vnd.ims.lis.v2.result+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolconsumerprofile+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolproxy+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolproxy.id+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolsettings+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolsettings.simple+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.informedcontrol.rms+xml": {
			"source": "iana"
		},
		"application/vnd.informix-visionary": {
			"source": "iana"
		},
		"application/vnd.infotech.project": {
			"source": "iana"
		},
		"application/vnd.infotech.project+xml": {
			"source": "iana"
		},
		"application/vnd.innopath.wamp.notification": {
			"source": "iana"
		},
		"application/vnd.insors.igm": {
			"source": "iana",
			"extensions": [
				"igm"
			]
		},
		"application/vnd.intercon.formnet": {
			"source": "iana",
			"extensions": [
				"xpw",
				"xpx"
			]
		},
		"application/vnd.intergeo": {
			"source": "iana",
			"extensions": [
				"i2g"
			]
		},
		"application/vnd.intertrust.digibox": {
			"source": "iana"
		},
		"application/vnd.intertrust.nncp": {
			"source": "iana"
		},
		"application/vnd.intu.qbo": {
			"source": "iana",
			"extensions": [
				"qbo"
			]
		},
		"application/vnd.intu.qfx": {
			"source": "iana",
			"extensions": [
				"qfx"
			]
		},
		"application/vnd.iptc.g2.catalogitem+xml": {
			"source": "iana"
		},
		"application/vnd.iptc.g2.conceptitem+xml": {
			"source": "iana"
		},
		"application/vnd.iptc.g2.knowledgeitem+xml": {
			"source": "iana"
		},
		"application/vnd.iptc.g2.newsitem+xml": {
			"source": "iana"
		},
		"application/vnd.iptc.g2.newsmessage+xml": {
			"source": "iana"
		},
		"application/vnd.iptc.g2.packageitem+xml": {
			"source": "iana"
		},
		"application/vnd.iptc.g2.planningitem+xml": {
			"source": "iana"
		},
		"application/vnd.ipunplugged.rcprofile": {
			"source": "iana",
			"extensions": [
				"rcprofile"
			]
		},
		"application/vnd.irepository.package+xml": {
			"source": "iana",
			"extensions": [
				"irp"
			]
		},
		"application/vnd.is-xpr": {
			"source": "iana",
			"extensions": [
				"xpr"
			]
		},
		"application/vnd.isac.fcs": {
			"source": "iana",
			"extensions": [
				"fcs"
			]
		},
		"application/vnd.jam": {
			"source": "iana",
			"extensions": [
				"jam"
			]
		},
		"application/vnd.japannet-directory-service": {
			"source": "iana"
		},
		"application/vnd.japannet-jpnstore-wakeup": {
			"source": "iana"
		},
		"application/vnd.japannet-payment-wakeup": {
			"source": "iana"
		},
		"application/vnd.japannet-registration": {
			"source": "iana"
		},
		"application/vnd.japannet-registration-wakeup": {
			"source": "iana"
		},
		"application/vnd.japannet-setstore-wakeup": {
			"source": "iana"
		},
		"application/vnd.japannet-verification": {
			"source": "iana"
		},
		"application/vnd.japannet-verification-wakeup": {
			"source": "iana"
		},
		"application/vnd.jcp.javame.midlet-rms": {
			"source": "iana",
			"extensions": [
				"rms"
			]
		},
		"application/vnd.jisp": {
			"source": "iana",
			"extensions": [
				"jisp"
			]
		},
		"application/vnd.joost.joda-archive": {
			"source": "iana",
			"extensions": [
				"joda"
			]
		},
		"application/vnd.jsk.isdn-ngn": {
			"source": "iana"
		},
		"application/vnd.kahootz": {
			"source": "iana",
			"extensions": [
				"ktz",
				"ktr"
			]
		},
		"application/vnd.kde.karbon": {
			"source": "iana",
			"extensions": [
				"karbon"
			]
		},
		"application/vnd.kde.kchart": {
			"source": "iana",
			"extensions": [
				"chrt"
			]
		},
		"application/vnd.kde.kformula": {
			"source": "iana",
			"extensions": [
				"kfo"
			]
		},
		"application/vnd.kde.kivio": {
			"source": "iana",
			"extensions": [
				"flw"
			]
		},
		"application/vnd.kde.kontour": {
			"source": "iana",
			"extensions": [
				"kon"
			]
		},
		"application/vnd.kde.kpresenter": {
			"source": "iana",
			"extensions": [
				"kpr",
				"kpt"
			]
		},
		"application/vnd.kde.kspread": {
			"source": "iana",
			"extensions": [
				"ksp"
			]
		},
		"application/vnd.kde.kword": {
			"source": "iana",
			"extensions": [
				"kwd",
				"kwt"
			]
		},
		"application/vnd.kenameaapp": {
			"source": "iana",
			"extensions": [
				"htke"
			]
		},
		"application/vnd.kidspiration": {
			"source": "iana",
			"extensions": [
				"kia"
			]
		},
		"application/vnd.kinar": {
			"source": "iana",
			"extensions": [
				"kne",
				"knp"
			]
		},
		"application/vnd.koan": {
			"source": "iana",
			"extensions": [
				"skp",
				"skd",
				"skt",
				"skm"
			]
		},
		"application/vnd.kodak-descriptor": {
			"source": "iana",
			"extensions": [
				"sse"
			]
		},
		"application/vnd.las.las+xml": {
			"source": "iana",
			"extensions": [
				"lasxml"
			]
		},
		"application/vnd.liberty-request+xml": {
			"source": "iana"
		},
		"application/vnd.llamagraphics.life-balance.desktop": {
			"source": "iana",
			"extensions": [
				"lbd"
			]
		},
		"application/vnd.llamagraphics.life-balance.exchange+xml": {
			"source": "iana",
			"extensions": [
				"lbe"
			]
		},
		"application/vnd.lotus-1-2-3": {
			"source": "iana",
			"extensions": [
				"123"
			]
		},
		"application/vnd.lotus-approach": {
			"source": "iana",
			"extensions": [
				"apr"
			]
		},
		"application/vnd.lotus-freelance": {
			"source": "iana",
			"extensions": [
				"pre"
			]
		},
		"application/vnd.lotus-notes": {
			"source": "iana",
			"extensions": [
				"nsf"
			]
		},
		"application/vnd.lotus-organizer": {
			"source": "iana",
			"extensions": [
				"org"
			]
		},
		"application/vnd.lotus-screencam": {
			"source": "iana",
			"extensions": [
				"scm"
			]
		},
		"application/vnd.lotus-wordpro": {
			"source": "iana",
			"extensions": [
				"lwp"
			]
		},
		"application/vnd.macports.portpkg": {
			"source": "iana",
			"extensions": [
				"portpkg"
			]
		},
		"application/vnd.mapbox-vector-tile": {
			"source": "iana"
		},
		"application/vnd.marlin.drm.actiontoken+xml": {
			"source": "iana"
		},
		"application/vnd.marlin.drm.conftoken+xml": {
			"source": "iana"
		},
		"application/vnd.marlin.drm.license+xml": {
			"source": "iana"
		},
		"application/vnd.marlin.drm.mdcf": {
			"source": "iana"
		},
		"application/vnd.mason+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.maxmind.maxmind-db": {
			"source": "iana"
		},
		"application/vnd.mcd": {
			"source": "iana",
			"extensions": [
				"mcd"
			]
		},
		"application/vnd.medcalcdata": {
			"source": "iana",
			"extensions": [
				"mc1"
			]
		},
		"application/vnd.mediastation.cdkey": {
			"source": "iana",
			"extensions": [
				"cdkey"
			]
		},
		"application/vnd.meridian-slingshot": {
			"source": "iana"
		},
		"application/vnd.mfer": {
			"source": "iana",
			"extensions": [
				"mwf"
			]
		},
		"application/vnd.mfmp": {
			"source": "iana",
			"extensions": [
				"mfm"
			]
		},
		"application/vnd.micro+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.micrografx.flo": {
			"source": "iana",
			"extensions": [
				"flo"
			]
		},
		"application/vnd.micrografx.igx": {
			"source": "iana",
			"extensions": [
				"igx"
			]
		},
		"application/vnd.microsoft.portable-executable": {
			"source": "iana"
		},
		"application/vnd.miele+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.mif": {
			"source": "iana",
			"extensions": [
				"mif"
			]
		},
		"application/vnd.minisoft-hp3000-save": {
			"source": "iana"
		},
		"application/vnd.mitsubishi.misty-guard.trustweb": {
			"source": "iana"
		},
		"application/vnd.mobius.daf": {
			"source": "iana",
			"extensions": [
				"daf"
			]
		},
		"application/vnd.mobius.dis": {
			"source": "iana",
			"extensions": [
				"dis"
			]
		},
		"application/vnd.mobius.mbk": {
			"source": "iana",
			"extensions": [
				"mbk"
			]
		},
		"application/vnd.mobius.mqy": {
			"source": "iana",
			"extensions": [
				"mqy"
			]
		},
		"application/vnd.mobius.msl": {
			"source": "iana",
			"extensions": [
				"msl"
			]
		},
		"application/vnd.mobius.plc": {
			"source": "iana",
			"extensions": [
				"plc"
			]
		},
		"application/vnd.mobius.txf": {
			"source": "iana",
			"extensions": [
				"txf"
			]
		},
		"application/vnd.mophun.application": {
			"source": "iana",
			"extensions": [
				"mpn"
			]
		},
		"application/vnd.mophun.certificate": {
			"source": "iana",
			"extensions": [
				"mpc"
			]
		},
		"application/vnd.motorola.flexsuite": {
			"source": "iana"
		},
		"application/vnd.motorola.flexsuite.adsi": {
			"source": "iana"
		},
		"application/vnd.motorola.flexsuite.fis": {
			"source": "iana"
		},
		"application/vnd.motorola.flexsuite.gotap": {
			"source": "iana"
		},
		"application/vnd.motorola.flexsuite.kmr": {
			"source": "iana"
		},
		"application/vnd.motorola.flexsuite.ttc": {
			"source": "iana"
		},
		"application/vnd.motorola.flexsuite.wem": {
			"source": "iana"
		},
		"application/vnd.motorola.iprm": {
			"source": "iana"
		},
		"application/vnd.mozilla.xul+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"xul"
			]
		},
		"application/vnd.ms-3mfdocument": {
			"source": "iana"
		},
		"application/vnd.ms-artgalry": {
			"source": "iana",
			"extensions": [
				"cil"
			]
		},
		"application/vnd.ms-asf": {
			"source": "iana"
		},
		"application/vnd.ms-cab-compressed": {
			"source": "iana",
			"extensions": [
				"cab"
			]
		},
		"application/vnd.ms-color.iccprofile": {
			"source": "apache"
		},
		"application/vnd.ms-excel": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"xls",
				"xlm",
				"xla",
				"xlc",
				"xlt",
				"xlw"
			]
		},
		"application/vnd.ms-excel.addin.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"xlam"
			]
		},
		"application/vnd.ms-excel.sheet.binary.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"xlsb"
			]
		},
		"application/vnd.ms-excel.sheet.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"xlsm"
			]
		},
		"application/vnd.ms-excel.template.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"xltm"
			]
		},
		"application/vnd.ms-fontobject": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"eot"
			]
		},
		"application/vnd.ms-htmlhelp": {
			"source": "iana",
			"extensions": [
				"chm"
			]
		},
		"application/vnd.ms-ims": {
			"source": "iana",
			"extensions": [
				"ims"
			]
		},
		"application/vnd.ms-lrm": {
			"source": "iana",
			"extensions": [
				"lrm"
			]
		},
		"application/vnd.ms-office.activex+xml": {
			"source": "iana"
		},
		"application/vnd.ms-officetheme": {
			"source": "iana",
			"extensions": [
				"thmx"
			]
		},
		"application/vnd.ms-opentype": {
			"source": "apache",
			"compressible": true
		},
		"application/vnd.ms-package.obfuscated-opentype": {
			"source": "apache"
		},
		"application/vnd.ms-pki.seccat": {
			"source": "apache",
			"extensions": [
				"cat"
			]
		},
		"application/vnd.ms-pki.stl": {
			"source": "apache",
			"extensions": [
				"stl"
			]
		},
		"application/vnd.ms-playready.initiator+xml": {
			"source": "iana"
		},
		"application/vnd.ms-powerpoint": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"ppt",
				"pps",
				"pot"
			]
		},
		"application/vnd.ms-powerpoint.addin.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"ppam"
			]
		},
		"application/vnd.ms-powerpoint.presentation.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"pptm"
			]
		},
		"application/vnd.ms-powerpoint.slide.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"sldm"
			]
		},
		"application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"ppsm"
			]
		},
		"application/vnd.ms-powerpoint.template.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"potm"
			]
		},
		"application/vnd.ms-printdevicecapabilities+xml": {
			"source": "iana"
		},
		"application/vnd.ms-printing.printticket+xml": {
			"source": "apache"
		},
		"application/vnd.ms-printschematicket+xml": {
			"source": "iana"
		},
		"application/vnd.ms-project": {
			"source": "iana",
			"extensions": [
				"mpp",
				"mpt"
			]
		},
		"application/vnd.ms-tnef": {
			"source": "iana"
		},
		"application/vnd.ms-windows.devicepairing": {
			"source": "iana"
		},
		"application/vnd.ms-windows.nwprinting.oob": {
			"source": "iana"
		},
		"application/vnd.ms-windows.printerpairing": {
			"source": "iana"
		},
		"application/vnd.ms-windows.wsd.oob": {
			"source": "iana"
		},
		"application/vnd.ms-wmdrm.lic-chlg-req": {
			"source": "iana"
		},
		"application/vnd.ms-wmdrm.lic-resp": {
			"source": "iana"
		},
		"application/vnd.ms-wmdrm.meter-chlg-req": {
			"source": "iana"
		},
		"application/vnd.ms-wmdrm.meter-resp": {
			"source": "iana"
		},
		"application/vnd.ms-word.document.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"docm"
			]
		},
		"application/vnd.ms-word.template.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"dotm"
			]
		},
		"application/vnd.ms-works": {
			"source": "iana",
			"extensions": [
				"wps",
				"wks",
				"wcm",
				"wdb"
			]
		},
		"application/vnd.ms-wpl": {
			"source": "iana",
			"extensions": [
				"wpl"
			]
		},
		"application/vnd.ms-xpsdocument": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"xps"
			]
		},
		"application/vnd.msa-disk-image": {
			"source": "iana"
		},
		"application/vnd.mseq": {
			"source": "iana",
			"extensions": [
				"mseq"
			]
		},
		"application/vnd.msign": {
			"source": "iana"
		},
		"application/vnd.multiad.creator": {
			"source": "iana"
		},
		"application/vnd.multiad.creator.cif": {
			"source": "iana"
		},
		"application/vnd.music-niff": {
			"source": "iana"
		},
		"application/vnd.musician": {
			"source": "iana",
			"extensions": [
				"mus"
			]
		},
		"application/vnd.muvee.style": {
			"source": "iana",
			"extensions": [
				"msty"
			]
		},
		"application/vnd.mynfc": {
			"source": "iana",
			"extensions": [
				"taglet"
			]
		},
		"application/vnd.ncd.control": {
			"source": "iana"
		},
		"application/vnd.ncd.reference": {
			"source": "iana"
		},
		"application/vnd.nearst.inv+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.nervana": {
			"source": "iana"
		},
		"application/vnd.netfpx": {
			"source": "iana"
		},
		"application/vnd.neurolanguage.nlu": {
			"source": "iana",
			"extensions": [
				"nlu"
			]
		},
		"application/vnd.nintendo.nitro.rom": {
			"source": "iana"
		},
		"application/vnd.nintendo.snes.rom": {
			"source": "iana"
		},
		"application/vnd.nitf": {
			"source": "iana",
			"extensions": [
				"ntf",
				"nitf"
			]
		},
		"application/vnd.noblenet-directory": {
			"source": "iana",
			"extensions": [
				"nnd"
			]
		},
		"application/vnd.noblenet-sealer": {
			"source": "iana",
			"extensions": [
				"nns"
			]
		},
		"application/vnd.noblenet-web": {
			"source": "iana",
			"extensions": [
				"nnw"
			]
		},
		"application/vnd.nokia.catalogs": {
			"source": "iana"
		},
		"application/vnd.nokia.conml+wbxml": {
			"source": "iana"
		},
		"application/vnd.nokia.conml+xml": {
			"source": "iana"
		},
		"application/vnd.nokia.iptv.config+xml": {
			"source": "iana"
		},
		"application/vnd.nokia.isds-radio-presets": {
			"source": "iana"
		},
		"application/vnd.nokia.landmark+wbxml": {
			"source": "iana"
		},
		"application/vnd.nokia.landmark+xml": {
			"source": "iana"
		},
		"application/vnd.nokia.landmarkcollection+xml": {
			"source": "iana"
		},
		"application/vnd.nokia.n-gage.ac+xml": {
			"source": "iana"
		},
		"application/vnd.nokia.n-gage.data": {
			"source": "iana",
			"extensions": [
				"ngdat"
			]
		},
		"application/vnd.nokia.n-gage.symbian.install": {
			"source": "iana",
			"extensions": [
				"n-gage"
			]
		},
		"application/vnd.nokia.ncd": {
			"source": "iana"
		},
		"application/vnd.nokia.pcd+wbxml": {
			"source": "iana"
		},
		"application/vnd.nokia.pcd+xml": {
			"source": "iana"
		},
		"application/vnd.nokia.radio-preset": {
			"source": "iana",
			"extensions": [
				"rpst"
			]
		},
		"application/vnd.nokia.radio-presets": {
			"source": "iana",
			"extensions": [
				"rpss"
			]
		},
		"application/vnd.novadigm.edm": {
			"source": "iana",
			"extensions": [
				"edm"
			]
		},
		"application/vnd.novadigm.edx": {
			"source": "iana",
			"extensions": [
				"edx"
			]
		},
		"application/vnd.novadigm.ext": {
			"source": "iana",
			"extensions": [
				"ext"
			]
		},
		"application/vnd.ntt-local.content-share": {
			"source": "iana"
		},
		"application/vnd.ntt-local.file-transfer": {
			"source": "iana"
		},
		"application/vnd.ntt-local.ogw_remote-access": {
			"source": "iana"
		},
		"application/vnd.ntt-local.sip-ta_remote": {
			"source": "iana"
		},
		"application/vnd.ntt-local.sip-ta_tcp_stream": {
			"source": "iana"
		},
		"application/vnd.oasis.opendocument.chart": {
			"source": "iana",
			"extensions": [
				"odc"
			]
		},
		"application/vnd.oasis.opendocument.chart-template": {
			"source": "iana",
			"extensions": [
				"otc"
			]
		},
		"application/vnd.oasis.opendocument.database": {
			"source": "iana",
			"extensions": [
				"odb"
			]
		},
		"application/vnd.oasis.opendocument.formula": {
			"source": "iana",
			"extensions": [
				"odf"
			]
		},
		"application/vnd.oasis.opendocument.formula-template": {
			"source": "iana",
			"extensions": [
				"odft"
			]
		},
		"application/vnd.oasis.opendocument.graphics": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"odg"
			]
		},
		"application/vnd.oasis.opendocument.graphics-template": {
			"source": "iana",
			"extensions": [
				"otg"
			]
		},
		"application/vnd.oasis.opendocument.image": {
			"source": "iana",
			"extensions": [
				"odi"
			]
		},
		"application/vnd.oasis.opendocument.image-template": {
			"source": "iana",
			"extensions": [
				"oti"
			]
		},
		"application/vnd.oasis.opendocument.presentation": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"odp"
			]
		},
		"application/vnd.oasis.opendocument.presentation-template": {
			"source": "iana",
			"extensions": [
				"otp"
			]
		},
		"application/vnd.oasis.opendocument.spreadsheet": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"ods"
			]
		},
		"application/vnd.oasis.opendocument.spreadsheet-template": {
			"source": "iana",
			"extensions": [
				"ots"
			]
		},
		"application/vnd.oasis.opendocument.text": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"odt"
			]
		},
		"application/vnd.oasis.opendocument.text-master": {
			"source": "iana",
			"extensions": [
				"odm"
			]
		},
		"application/vnd.oasis.opendocument.text-template": {
			"source": "iana",
			"extensions": [
				"ott"
			]
		},
		"application/vnd.oasis.opendocument.text-web": {
			"source": "iana",
			"extensions": [
				"oth"
			]
		},
		"application/vnd.obn": {
			"source": "iana"
		},
		"application/vnd.oftn.l10n+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.contentaccessdownload+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.contentaccessstreaming+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.cspg-hexbinary": {
			"source": "iana"
		},
		"application/vnd.oipf.dae.svg+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.dae.xhtml+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.mippvcontrolmessage+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.pae.gem": {
			"source": "iana"
		},
		"application/vnd.oipf.spdiscovery+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.spdlist+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.ueprofile+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.userprofile+xml": {
			"source": "iana"
		},
		"application/vnd.olpc-sugar": {
			"source": "iana",
			"extensions": [
				"xo"
			]
		},
		"application/vnd.oma-scws-config": {
			"source": "iana"
		},
		"application/vnd.oma-scws-http-request": {
			"source": "iana"
		},
		"application/vnd.oma-scws-http-response": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.associated-procedure-parameter+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.drm-trigger+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.imd+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.ltkm": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.notification+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.provisioningtrigger": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.sgboot": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.sgdd+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.sgdu": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.simple-symbol-container": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.smartcard-trigger+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.sprov+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.stkm": {
			"source": "iana"
		},
		"application/vnd.oma.cab-address-book+xml": {
			"source": "iana"
		},
		"application/vnd.oma.cab-feature-handler+xml": {
			"source": "iana"
		},
		"application/vnd.oma.cab-pcc+xml": {
			"source": "iana"
		},
		"application/vnd.oma.cab-subs-invite+xml": {
			"source": "iana"
		},
		"application/vnd.oma.cab-user-prefs+xml": {
			"source": "iana"
		},
		"application/vnd.oma.dcd": {
			"source": "iana"
		},
		"application/vnd.oma.dcdc": {
			"source": "iana"
		},
		"application/vnd.oma.dd2+xml": {
			"source": "iana",
			"extensions": [
				"dd2"
			]
		},
		"application/vnd.oma.drm.risd+xml": {
			"source": "iana"
		},
		"application/vnd.oma.group-usage-list+xml": {
			"source": "iana"
		},
		"application/vnd.oma.lwm2m+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.lwm2m+tlv": {
			"source": "iana"
		},
		"application/vnd.oma.pal+xml": {
			"source": "iana"
		},
		"application/vnd.oma.poc.detailed-progress-report+xml": {
			"source": "iana"
		},
		"application/vnd.oma.poc.final-report+xml": {
			"source": "iana"
		},
		"application/vnd.oma.poc.groups+xml": {
			"source": "iana"
		},
		"application/vnd.oma.poc.invocation-descriptor+xml": {
			"source": "iana"
		},
		"application/vnd.oma.poc.optimized-progress-report+xml": {
			"source": "iana"
		},
		"application/vnd.oma.push": {
			"source": "iana"
		},
		"application/vnd.oma.scidm.messages+xml": {
			"source": "iana"
		},
		"application/vnd.oma.xcap-directory+xml": {
			"source": "iana"
		},
		"application/vnd.omads-email+xml": {
			"source": "iana"
		},
		"application/vnd.omads-file+xml": {
			"source": "iana"
		},
		"application/vnd.omads-folder+xml": {
			"source": "iana"
		},
		"application/vnd.omaloc-supl-init": {
			"source": "iana"
		},
		"application/vnd.onepager": {
			"source": "iana"
		},
		"application/vnd.openblox.game+xml": {
			"source": "iana"
		},
		"application/vnd.openblox.game-binary": {
			"source": "iana"
		},
		"application/vnd.openeye.oeb": {
			"source": "iana"
		},
		"application/vnd.openofficeorg.extension": {
			"source": "apache",
			"extensions": [
				"oxt"
			]
		},
		"application/vnd.openstreetmap.data+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.custom-properties+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawing+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.extended-properties+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml-template": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"pptx"
			]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slide": {
			"source": "iana",
			"extensions": [
				"sldx"
			]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
			"source": "iana",
			"extensions": [
				"ppsx"
			]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.template": {
			"source": "apache",
			"extensions": [
				"potx"
			]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml-template": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"xlsx"
			]
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
			"source": "apache",
			"extensions": [
				"xltx"
			]
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.theme+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.themeoverride+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.vmldrawing": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml-template": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"docx"
			]
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
			"source": "apache",
			"extensions": [
				"dotx"
			]
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-package.core-properties+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-package.relationships+xml": {
			"source": "iana"
		},
		"application/vnd.oracle.resource+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.orange.indata": {
			"source": "iana"
		},
		"application/vnd.osa.netdeploy": {
			"source": "iana"
		},
		"application/vnd.osgeo.mapguide.package": {
			"source": "iana",
			"extensions": [
				"mgp"
			]
		},
		"application/vnd.osgi.bundle": {
			"source": "iana"
		},
		"application/vnd.osgi.dp": {
			"source": "iana",
			"extensions": [
				"dp"
			]
		},
		"application/vnd.osgi.subsystem": {
			"source": "iana",
			"extensions": [
				"esa"
			]
		},
		"application/vnd.otps.ct-kip+xml": {
			"source": "iana"
		},
		"application/vnd.oxli.countgraph": {
			"source": "iana"
		},
		"application/vnd.pagerduty+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.palm": {
			"source": "iana",
			"extensions": [
				"pdb",
				"pqa",
				"oprc"
			]
		},
		"application/vnd.panoply": {
			"source": "iana"
		},
		"application/vnd.paos+xml": {
			"source": "iana"
		},
		"application/vnd.paos.xml": {
			"source": "apache"
		},
		"application/vnd.pawaafile": {
			"source": "iana",
			"extensions": [
				"paw"
			]
		},
		"application/vnd.pcos": {
			"source": "iana"
		},
		"application/vnd.pg.format": {
			"source": "iana",
			"extensions": [
				"str"
			]
		},
		"application/vnd.pg.osasli": {
			"source": "iana",
			"extensions": [
				"ei6"
			]
		},
		"application/vnd.piaccess.application-licence": {
			"source": "iana"
		},
		"application/vnd.picsel": {
			"source": "iana",
			"extensions": [
				"efif"
			]
		},
		"application/vnd.pmi.widget": {
			"source": "iana",
			"extensions": [
				"wg"
			]
		},
		"application/vnd.poc.group-advertisement+xml": {
			"source": "iana"
		},
		"application/vnd.pocketlearn": {
			"source": "iana",
			"extensions": [
				"plf"
			]
		},
		"application/vnd.powerbuilder6": {
			"source": "iana",
			"extensions": [
				"pbd"
			]
		},
		"application/vnd.powerbuilder6-s": {
			"source": "iana"
		},
		"application/vnd.powerbuilder7": {
			"source": "iana"
		},
		"application/vnd.powerbuilder7-s": {
			"source": "iana"
		},
		"application/vnd.powerbuilder75": {
			"source": "iana"
		},
		"application/vnd.powerbuilder75-s": {
			"source": "iana"
		},
		"application/vnd.preminet": {
			"source": "iana"
		},
		"application/vnd.previewsystems.box": {
			"source": "iana",
			"extensions": [
				"box"
			]
		},
		"application/vnd.proteus.magazine": {
			"source": "iana",
			"extensions": [
				"mgz"
			]
		},
		"application/vnd.publishare-delta-tree": {
			"source": "iana",
			"extensions": [
				"qps"
			]
		},
		"application/vnd.pvi.ptid1": {
			"source": "iana",
			"extensions": [
				"ptid"
			]
		},
		"application/vnd.pwg-multiplexed": {
			"source": "iana"
		},
		"application/vnd.pwg-xhtml-print+xml": {
			"source": "iana"
		},
		"application/vnd.qualcomm.brew-app-res": {
			"source": "iana"
		},
		"application/vnd.quarantainenet": {
			"source": "iana"
		},
		"application/vnd.quark.quarkxpress": {
			"source": "iana",
			"extensions": [
				"qxd",
				"qxt",
				"qwd",
				"qwt",
				"qxl",
				"qxb"
			]
		},
		"application/vnd.quobject-quoxdocument": {
			"source": "iana"
		},
		"application/vnd.radisys.moml+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-audit+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-audit-conf+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-audit-conn+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-audit-dialog+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-audit-stream+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-conf+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog-base+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog-fax-detect+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog-group+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog-speech+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog-transform+xml": {
			"source": "iana"
		},
		"application/vnd.rainstor.data": {
			"source": "iana"
		},
		"application/vnd.rapid": {
			"source": "iana"
		},
		"application/vnd.rar": {
			"source": "iana"
		},
		"application/vnd.realvnc.bed": {
			"source": "iana",
			"extensions": [
				"bed"
			]
		},
		"application/vnd.recordare.musicxml": {
			"source": "iana",
			"extensions": [
				"mxl"
			]
		},
		"application/vnd.recordare.musicxml+xml": {
			"source": "iana",
			"extensions": [
				"musicxml"
			]
		},
		"application/vnd.renlearn.rlprint": {
			"source": "iana"
		},
		"application/vnd.rig.cryptonote": {
			"source": "iana",
			"extensions": [
				"cryptonote"
			]
		},
		"application/vnd.rim.cod": {
			"source": "apache",
			"extensions": [
				"cod"
			]
		},
		"application/vnd.rn-realmedia": {
			"source": "apache",
			"extensions": [
				"rm"
			]
		},
		"application/vnd.rn-realmedia-vbr": {
			"source": "apache",
			"extensions": [
				"rmvb"
			]
		},
		"application/vnd.route66.link66+xml": {
			"source": "iana",
			"extensions": [
				"link66"
			]
		},
		"application/vnd.rs-274x": {
			"source": "iana"
		},
		"application/vnd.ruckus.download": {
			"source": "iana"
		},
		"application/vnd.s3sms": {
			"source": "iana"
		},
		"application/vnd.sailingtracker.track": {
			"source": "iana",
			"extensions": [
				"st"
			]
		},
		"application/vnd.sbm.cid": {
			"source": "iana"
		},
		"application/vnd.sbm.mid2": {
			"source": "iana"
		},
		"application/vnd.scribus": {
			"source": "iana"
		},
		"application/vnd.sealed.3df": {
			"source": "iana"
		},
		"application/vnd.sealed.csf": {
			"source": "iana"
		},
		"application/vnd.sealed.doc": {
			"source": "iana"
		},
		"application/vnd.sealed.eml": {
			"source": "iana"
		},
		"application/vnd.sealed.mht": {
			"source": "iana"
		},
		"application/vnd.sealed.net": {
			"source": "iana"
		},
		"application/vnd.sealed.ppt": {
			"source": "iana"
		},
		"application/vnd.sealed.tiff": {
			"source": "iana"
		},
		"application/vnd.sealed.xls": {
			"source": "iana"
		},
		"application/vnd.sealedmedia.softseal.html": {
			"source": "iana"
		},
		"application/vnd.sealedmedia.softseal.pdf": {
			"source": "iana"
		},
		"application/vnd.seemail": {
			"source": "iana",
			"extensions": [
				"see"
			]
		},
		"application/vnd.sema": {
			"source": "iana",
			"extensions": [
				"sema"
			]
		},
		"application/vnd.semd": {
			"source": "iana",
			"extensions": [
				"semd"
			]
		},
		"application/vnd.semf": {
			"source": "iana",
			"extensions": [
				"semf"
			]
		},
		"application/vnd.shana.informed.formdata": {
			"source": "iana",
			"extensions": [
				"ifm"
			]
		},
		"application/vnd.shana.informed.formtemplate": {
			"source": "iana",
			"extensions": [
				"itp"
			]
		},
		"application/vnd.shana.informed.interchange": {
			"source": "iana",
			"extensions": [
				"iif"
			]
		},
		"application/vnd.shana.informed.package": {
			"source": "iana",
			"extensions": [
				"ipk"
			]
		},
		"application/vnd.simtech-mindmapper": {
			"source": "iana",
			"extensions": [
				"twd",
				"twds"
			]
		},
		"application/vnd.siren+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.smaf": {
			"source": "iana",
			"extensions": [
				"mmf"
			]
		},
		"application/vnd.smart.notebook": {
			"source": "iana"
		},
		"application/vnd.smart.teacher": {
			"source": "iana",
			"extensions": [
				"teacher"
			]
		},
		"application/vnd.software602.filler.form+xml": {
			"source": "iana"
		},
		"application/vnd.software602.filler.form-xml-zip": {
			"source": "iana"
		},
		"application/vnd.solent.sdkm+xml": {
			"source": "iana",
			"extensions": [
				"sdkm",
				"sdkd"
			]
		},
		"application/vnd.spotfire.dxp": {
			"source": "iana",
			"extensions": [
				"dxp"
			]
		},
		"application/vnd.spotfire.sfs": {
			"source": "iana",
			"extensions": [
				"sfs"
			]
		},
		"application/vnd.sss-cod": {
			"source": "iana"
		},
		"application/vnd.sss-dtf": {
			"source": "iana"
		},
		"application/vnd.sss-ntf": {
			"source": "iana"
		},
		"application/vnd.stardivision.calc": {
			"source": "apache",
			"extensions": [
				"sdc"
			]
		},
		"application/vnd.stardivision.draw": {
			"source": "apache",
			"extensions": [
				"sda"
			]
		},
		"application/vnd.stardivision.impress": {
			"source": "apache",
			"extensions": [
				"sdd"
			]
		},
		"application/vnd.stardivision.math": {
			"source": "apache",
			"extensions": [
				"smf"
			]
		},
		"application/vnd.stardivision.writer": {
			"source": "apache",
			"extensions": [
				"sdw",
				"vor"
			]
		},
		"application/vnd.stardivision.writer-global": {
			"source": "apache",
			"extensions": [
				"sgl"
			]
		},
		"application/vnd.stepmania.package": {
			"source": "iana",
			"extensions": [
				"smzip"
			]
		},
		"application/vnd.stepmania.stepchart": {
			"source": "iana",
			"extensions": [
				"sm"
			]
		},
		"application/vnd.street-stream": {
			"source": "iana"
		},
		"application/vnd.sun.wadl+xml": {
			"source": "iana"
		},
		"application/vnd.sun.xml.calc": {
			"source": "apache",
			"extensions": [
				"sxc"
			]
		},
		"application/vnd.sun.xml.calc.template": {
			"source": "apache",
			"extensions": [
				"stc"
			]
		},
		"application/vnd.sun.xml.draw": {
			"source": "apache",
			"extensions": [
				"sxd"
			]
		},
		"application/vnd.sun.xml.draw.template": {
			"source": "apache",
			"extensions": [
				"std"
			]
		},
		"application/vnd.sun.xml.impress": {
			"source": "apache",
			"extensions": [
				"sxi"
			]
		},
		"application/vnd.sun.xml.impress.template": {
			"source": "apache",
			"extensions": [
				"sti"
			]
		},
		"application/vnd.sun.xml.math": {
			"source": "apache",
			"extensions": [
				"sxm"
			]
		},
		"application/vnd.sun.xml.writer": {
			"source": "apache",
			"extensions": [
				"sxw"
			]
		},
		"application/vnd.sun.xml.writer.global": {
			"source": "apache",
			"extensions": [
				"sxg"
			]
		},
		"application/vnd.sun.xml.writer.template": {
			"source": "apache",
			"extensions": [
				"stw"
			]
		},
		"application/vnd.sus-calendar": {
			"source": "iana",
			"extensions": [
				"sus",
				"susp"
			]
		},
		"application/vnd.svd": {
			"source": "iana",
			"extensions": [
				"svd"
			]
		},
		"application/vnd.swiftview-ics": {
			"source": "iana"
		},
		"application/vnd.symbian.install": {
			"source": "apache",
			"extensions": [
				"sis",
				"sisx"
			]
		},
		"application/vnd.syncml+xml": {
			"source": "iana",
			"extensions": [
				"xsm"
			]
		},
		"application/vnd.syncml.dm+wbxml": {
			"source": "iana",
			"extensions": [
				"bdm"
			]
		},
		"application/vnd.syncml.dm+xml": {
			"source": "iana",
			"extensions": [
				"xdm"
			]
		},
		"application/vnd.syncml.dm.notification": {
			"source": "iana"
		},
		"application/vnd.syncml.dmddf+wbxml": {
			"source": "iana"
		},
		"application/vnd.syncml.dmddf+xml": {
			"source": "iana"
		},
		"application/vnd.syncml.dmtnds+wbxml": {
			"source": "iana"
		},
		"application/vnd.syncml.dmtnds+xml": {
			"source": "iana"
		},
		"application/vnd.syncml.ds.notification": {
			"source": "iana"
		},
		"application/vnd.tableschema+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.tao.intent-module-archive": {
			"source": "iana",
			"extensions": [
				"tao"
			]
		},
		"application/vnd.tcpdump.pcap": {
			"source": "iana",
			"extensions": [
				"pcap",
				"cap",
				"dmp"
			]
		},
		"application/vnd.tmd.mediaflex.api+xml": {
			"source": "iana"
		},
		"application/vnd.tml": {
			"source": "iana"
		},
		"application/vnd.tmobile-livetv": {
			"source": "iana",
			"extensions": [
				"tmo"
			]
		},
		"application/vnd.tri.onesource": {
			"source": "iana"
		},
		"application/vnd.trid.tpt": {
			"source": "iana",
			"extensions": [
				"tpt"
			]
		},
		"application/vnd.triscape.mxs": {
			"source": "iana",
			"extensions": [
				"mxs"
			]
		},
		"application/vnd.trueapp": {
			"source": "iana",
			"extensions": [
				"tra"
			]
		},
		"application/vnd.truedoc": {
			"source": "iana"
		},
		"application/vnd.ubisoft.webplayer": {
			"source": "iana"
		},
		"application/vnd.ufdl": {
			"source": "iana",
			"extensions": [
				"ufd",
				"ufdl"
			]
		},
		"application/vnd.uiq.theme": {
			"source": "iana",
			"extensions": [
				"utz"
			]
		},
		"application/vnd.umajin": {
			"source": "iana",
			"extensions": [
				"umj"
			]
		},
		"application/vnd.unity": {
			"source": "iana",
			"extensions": [
				"unityweb"
			]
		},
		"application/vnd.uoml+xml": {
			"source": "iana",
			"extensions": [
				"uoml"
			]
		},
		"application/vnd.uplanet.alert": {
			"source": "iana"
		},
		"application/vnd.uplanet.alert-wbxml": {
			"source": "iana"
		},
		"application/vnd.uplanet.bearer-choice": {
			"source": "iana"
		},
		"application/vnd.uplanet.bearer-choice-wbxml": {
			"source": "iana"
		},
		"application/vnd.uplanet.cacheop": {
			"source": "iana"
		},
		"application/vnd.uplanet.cacheop-wbxml": {
			"source": "iana"
		},
		"application/vnd.uplanet.channel": {
			"source": "iana"
		},
		"application/vnd.uplanet.channel-wbxml": {
			"source": "iana"
		},
		"application/vnd.uplanet.list": {
			"source": "iana"
		},
		"application/vnd.uplanet.list-wbxml": {
			"source": "iana"
		},
		"application/vnd.uplanet.listcmd": {
			"source": "iana"
		},
		"application/vnd.uplanet.listcmd-wbxml": {
			"source": "iana"
		},
		"application/vnd.uplanet.signal": {
			"source": "iana"
		},
		"application/vnd.uri-map": {
			"source": "iana"
		},
		"application/vnd.valve.source.material": {
			"source": "iana"
		},
		"application/vnd.vcx": {
			"source": "iana",
			"extensions": [
				"vcx"
			]
		},
		"application/vnd.vd-study": {
			"source": "iana"
		},
		"application/vnd.vectorworks": {
			"source": "iana"
		},
		"application/vnd.vel+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.verimatrix.vcas": {
			"source": "iana"
		},
		"application/vnd.vidsoft.vidconference": {
			"source": "iana"
		},
		"application/vnd.visio": {
			"source": "iana",
			"extensions": [
				"vsd",
				"vst",
				"vss",
				"vsw"
			]
		},
		"application/vnd.visionary": {
			"source": "iana",
			"extensions": [
				"vis"
			]
		},
		"application/vnd.vividence.scriptfile": {
			"source": "iana"
		},
		"application/vnd.vsf": {
			"source": "iana",
			"extensions": [
				"vsf"
			]
		},
		"application/vnd.wap.sic": {
			"source": "iana"
		},
		"application/vnd.wap.slc": {
			"source": "iana"
		},
		"application/vnd.wap.wbxml": {
			"source": "iana",
			"extensions": [
				"wbxml"
			]
		},
		"application/vnd.wap.wmlc": {
			"source": "iana",
			"extensions": [
				"wmlc"
			]
		},
		"application/vnd.wap.wmlscriptc": {
			"source": "iana",
			"extensions": [
				"wmlsc"
			]
		},
		"application/vnd.webturbo": {
			"source": "iana",
			"extensions": [
				"wtb"
			]
		},
		"application/vnd.wfa.p2p": {
			"source": "iana"
		},
		"application/vnd.wfa.wsc": {
			"source": "iana"
		},
		"application/vnd.windows.devicepairing": {
			"source": "iana"
		},
		"application/vnd.wmc": {
			"source": "iana"
		},
		"application/vnd.wmf.bootstrap": {
			"source": "iana"
		},
		"application/vnd.wolfram.mathematica": {
			"source": "iana"
		},
		"application/vnd.wolfram.mathematica.package": {
			"source": "iana"
		},
		"application/vnd.wolfram.player": {
			"source": "iana",
			"extensions": [
				"nbp"
			]
		},
		"application/vnd.wordperfect": {
			"source": "iana",
			"extensions": [
				"wpd"
			]
		},
		"application/vnd.wqd": {
			"source": "iana",
			"extensions": [
				"wqd"
			]
		},
		"application/vnd.wrq-hp3000-labelled": {
			"source": "iana"
		},
		"application/vnd.wt.stf": {
			"source": "iana",
			"extensions": [
				"stf"
			]
		},
		"application/vnd.wv.csp+wbxml": {
			"source": "iana"
		},
		"application/vnd.wv.csp+xml": {
			"source": "iana"
		},
		"application/vnd.wv.ssp+xml": {
			"source": "iana"
		},
		"application/vnd.xacml+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.xara": {
			"source": "iana",
			"extensions": [
				"xar"
			]
		},
		"application/vnd.xfdl": {
			"source": "iana",
			"extensions": [
				"xfdl"
			]
		},
		"application/vnd.xfdl.webform": {
			"source": "iana"
		},
		"application/vnd.xmi+xml": {
			"source": "iana"
		},
		"application/vnd.xmpie.cpkg": {
			"source": "iana"
		},
		"application/vnd.xmpie.dpkg": {
			"source": "iana"
		},
		"application/vnd.xmpie.plan": {
			"source": "iana"
		},
		"application/vnd.xmpie.ppkg": {
			"source": "iana"
		},
		"application/vnd.xmpie.xlim": {
			"source": "iana"
		},
		"application/vnd.yamaha.hv-dic": {
			"source": "iana",
			"extensions": [
				"hvd"
			]
		},
		"application/vnd.yamaha.hv-script": {
			"source": "iana",
			"extensions": [
				"hvs"
			]
		},
		"application/vnd.yamaha.hv-voice": {
			"source": "iana",
			"extensions": [
				"hvp"
			]
		},
		"application/vnd.yamaha.openscoreformat": {
			"source": "iana",
			"extensions": [
				"osf"
			]
		},
		"application/vnd.yamaha.openscoreformat.osfpvg+xml": {
			"source": "iana",
			"extensions": [
				"osfpvg"
			]
		},
		"application/vnd.yamaha.remote-setup": {
			"source": "iana"
		},
		"application/vnd.yamaha.smaf-audio": {
			"source": "iana",
			"extensions": [
				"saf"
			]
		},
		"application/vnd.yamaha.smaf-phrase": {
			"source": "iana",
			"extensions": [
				"spf"
			]
		},
		"application/vnd.yamaha.through-ngn": {
			"source": "iana"
		},
		"application/vnd.yamaha.tunnel-udpencap": {
			"source": "iana"
		},
		"application/vnd.yaoweme": {
			"source": "iana"
		},
		"application/vnd.yellowriver-custom-menu": {
			"source": "iana",
			"extensions": [
				"cmp"
			]
		},
		"application/vnd.zul": {
			"source": "iana",
			"extensions": [
				"zir",
				"zirz"
			]
		},
		"application/vnd.zzazz.deck+xml": {
			"source": "iana",
			"extensions": [
				"zaz"
			]
		},
		"application/voicexml+xml": {
			"source": "iana",
			"extensions": [
				"vxml"
			]
		},
		"application/vq-rtcpxr": {
			"source": "iana"
		},
		"application/watcherinfo+xml": {
			"source": "iana"
		},
		"application/whoispp-query": {
			"source": "iana"
		},
		"application/whoispp-response": {
			"source": "iana"
		},
		"application/widget": {
			"source": "iana",
			"extensions": [
				"wgt"
			]
		},
		"application/winhlp": {
			"source": "apache",
			"extensions": [
				"hlp"
			]
		},
		"application/wita": {
			"source": "iana"
		},
		"application/wordperfect5.1": {
			"source": "iana"
		},
		"application/wsdl+xml": {
			"source": "iana",
			"extensions": [
				"wsdl"
			]
		},
		"application/wspolicy+xml": {
			"source": "iana",
			"extensions": [
				"wspolicy"
			]
		},
		"application/x-7z-compressed": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"7z"
			]
		},
		"application/x-abiword": {
			"source": "apache",
			"extensions": [
				"abw"
			]
		},
		"application/x-ace-compressed": {
			"source": "apache",
			"extensions": [
				"ace"
			]
		},
		"application/x-amf": {
			"source": "apache"
		},
		"application/x-apple-diskimage": {
			"source": "apache",
			"extensions": [
				"dmg"
			]
		},
		"application/x-authorware-bin": {
			"source": "apache",
			"extensions": [
				"aab",
				"x32",
				"u32",
				"vox"
			]
		},
		"application/x-authorware-map": {
			"source": "apache",
			"extensions": [
				"aam"
			]
		},
		"application/x-authorware-seg": {
			"source": "apache",
			"extensions": [
				"aas"
			]
		},
		"application/x-bcpio": {
			"source": "apache",
			"extensions": [
				"bcpio"
			]
		},
		"application/x-bdoc": {
			"compressible": false,
			"extensions": [
				"bdoc"
			]
		},
		"application/x-bittorrent": {
			"source": "apache",
			"extensions": [
				"torrent"
			]
		},
		"application/x-blorb": {
			"source": "apache",
			"extensions": [
				"blb",
				"blorb"
			]
		},
		"application/x-bzip": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"bz"
			]
		},
		"application/x-bzip2": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"bz2",
				"boz"
			]
		},
		"application/x-cbr": {
			"source": "apache",
			"extensions": [
				"cbr",
				"cba",
				"cbt",
				"cbz",
				"cb7"
			]
		},
		"application/x-cdlink": {
			"source": "apache",
			"extensions": [
				"vcd"
			]
		},
		"application/x-cfs-compressed": {
			"source": "apache",
			"extensions": [
				"cfs"
			]
		},
		"application/x-chat": {
			"source": "apache",
			"extensions": [
				"chat"
			]
		},
		"application/x-chess-pgn": {
			"source": "apache",
			"extensions": [
				"pgn"
			]
		},
		"application/x-chrome-extension": {
			"extensions": [
				"crx"
			]
		},
		"application/x-cocoa": {
			"source": "nginx",
			"extensions": [
				"cco"
			]
		},
		"application/x-compress": {
			"source": "apache"
		},
		"application/x-conference": {
			"source": "apache",
			"extensions": [
				"nsc"
			]
		},
		"application/x-cpio": {
			"source": "apache",
			"extensions": [
				"cpio"
			]
		},
		"application/x-csh": {
			"source": "apache",
			"extensions": [
				"csh"
			]
		},
		"application/x-deb": {
			"compressible": false
		},
		"application/x-debian-package": {
			"source": "apache",
			"extensions": [
				"deb",
				"udeb"
			]
		},
		"application/x-dgc-compressed": {
			"source": "apache",
			"extensions": [
				"dgc"
			]
		},
		"application/x-director": {
			"source": "apache",
			"extensions": [
				"dir",
				"dcr",
				"dxr",
				"cst",
				"cct",
				"cxt",
				"w3d",
				"fgd",
				"swa"
			]
		},
		"application/x-doom": {
			"source": "apache",
			"extensions": [
				"wad"
			]
		},
		"application/x-dtbncx+xml": {
			"source": "apache",
			"extensions": [
				"ncx"
			]
		},
		"application/x-dtbook+xml": {
			"source": "apache",
			"extensions": [
				"dtb"
			]
		},
		"application/x-dtbresource+xml": {
			"source": "apache",
			"extensions": [
				"res"
			]
		},
		"application/x-dvi": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"dvi"
			]
		},
		"application/x-envoy": {
			"source": "apache",
			"extensions": [
				"evy"
			]
		},
		"application/x-eva": {
			"source": "apache",
			"extensions": [
				"eva"
			]
		},
		"application/x-font-bdf": {
			"source": "apache",
			"extensions": [
				"bdf"
			]
		},
		"application/x-font-dos": {
			"source": "apache"
		},
		"application/x-font-framemaker": {
			"source": "apache"
		},
		"application/x-font-ghostscript": {
			"source": "apache",
			"extensions": [
				"gsf"
			]
		},
		"application/x-font-libgrx": {
			"source": "apache"
		},
		"application/x-font-linux-psf": {
			"source": "apache",
			"extensions": [
				"psf"
			]
		},
		"application/x-font-otf": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"otf"
			]
		},
		"application/x-font-pcf": {
			"source": "apache",
			"extensions": [
				"pcf"
			]
		},
		"application/x-font-snf": {
			"source": "apache",
			"extensions": [
				"snf"
			]
		},
		"application/x-font-speedo": {
			"source": "apache"
		},
		"application/x-font-sunos-news": {
			"source": "apache"
		},
		"application/x-font-ttf": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"ttf",
				"ttc"
			]
		},
		"application/x-font-type1": {
			"source": "apache",
			"extensions": [
				"pfa",
				"pfb",
				"pfm",
				"afm"
			]
		},
		"application/x-font-vfont": {
			"source": "apache"
		},
		"application/x-freearc": {
			"source": "apache",
			"extensions": [
				"arc"
			]
		},
		"application/x-futuresplash": {
			"source": "apache",
			"extensions": [
				"spl"
			]
		},
		"application/x-gca-compressed": {
			"source": "apache",
			"extensions": [
				"gca"
			]
		},
		"application/x-glulx": {
			"source": "apache",
			"extensions": [
				"ulx"
			]
		},
		"application/x-gnumeric": {
			"source": "apache",
			"extensions": [
				"gnumeric"
			]
		},
		"application/x-gramps-xml": {
			"source": "apache",
			"extensions": [
				"gramps"
			]
		},
		"application/x-gtar": {
			"source": "apache",
			"extensions": [
				"gtar"
			]
		},
		"application/x-gzip": {
			"source": "apache"
		},
		"application/x-hdf": {
			"source": "apache",
			"extensions": [
				"hdf"
			]
		},
		"application/x-httpd-php": {
			"compressible": true,
			"extensions": [
				"php"
			]
		},
		"application/x-install-instructions": {
			"source": "apache",
			"extensions": [
				"install"
			]
		},
		"application/x-iso9660-image": {
			"source": "apache",
			"extensions": [
				"iso"
			]
		},
		"application/x-java-archive-diff": {
			"source": "nginx",
			"extensions": [
				"jardiff"
			]
		},
		"application/x-java-jnlp-file": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"jnlp"
			]
		},
		"application/x-javascript": {
			"compressible": true
		},
		"application/x-latex": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"latex"
			]
		},
		"application/x-lua-bytecode": {
			"extensions": [
				"luac"
			]
		},
		"application/x-lzh-compressed": {
			"source": "apache",
			"extensions": [
				"lzh",
				"lha"
			]
		},
		"application/x-makeself": {
			"source": "nginx",
			"extensions": [
				"run"
			]
		},
		"application/x-mie": {
			"source": "apache",
			"extensions": [
				"mie"
			]
		},
		"application/x-mobipocket-ebook": {
			"source": "apache",
			"extensions": [
				"prc",
				"mobi"
			]
		},
		"application/x-mpegurl": {
			"compressible": false
		},
		"application/x-ms-application": {
			"source": "apache",
			"extensions": [
				"application"
			]
		},
		"application/x-ms-shortcut": {
			"source": "apache",
			"extensions": [
				"lnk"
			]
		},
		"application/x-ms-wmd": {
			"source": "apache",
			"extensions": [
				"wmd"
			]
		},
		"application/x-ms-wmz": {
			"source": "apache",
			"extensions": [
				"wmz"
			]
		},
		"application/x-ms-xbap": {
			"source": "apache",
			"extensions": [
				"xbap"
			]
		},
		"application/x-msaccess": {
			"source": "apache",
			"extensions": [
				"mdb"
			]
		},
		"application/x-msbinder": {
			"source": "apache",
			"extensions": [
				"obd"
			]
		},
		"application/x-mscardfile": {
			"source": "apache",
			"extensions": [
				"crd"
			]
		},
		"application/x-msclip": {
			"source": "apache",
			"extensions": [
				"clp"
			]
		},
		"application/x-msdos-program": {
			"extensions": [
				"exe"
			]
		},
		"application/x-msdownload": {
			"source": "apache",
			"extensions": [
				"exe",
				"dll",
				"com",
				"bat",
				"msi"
			]
		},
		"application/x-msmediaview": {
			"source": "apache",
			"extensions": [
				"mvb",
				"m13",
				"m14"
			]
		},
		"application/x-msmetafile": {
			"source": "apache",
			"extensions": [
				"wmf",
				"wmz",
				"emf",
				"emz"
			]
		},
		"application/x-msmoney": {
			"source": "apache",
			"extensions": [
				"mny"
			]
		},
		"application/x-mspublisher": {
			"source": "apache",
			"extensions": [
				"pub"
			]
		},
		"application/x-msschedule": {
			"source": "apache",
			"extensions": [
				"scd"
			]
		},
		"application/x-msterminal": {
			"source": "apache",
			"extensions": [
				"trm"
			]
		},
		"application/x-mswrite": {
			"source": "apache",
			"extensions": [
				"wri"
			]
		},
		"application/x-netcdf": {
			"source": "apache",
			"extensions": [
				"nc",
				"cdf"
			]
		},
		"application/x-ns-proxy-autoconfig": {
			"compressible": true,
			"extensions": [
				"pac"
			]
		},
		"application/x-nzb": {
			"source": "apache",
			"extensions": [
				"nzb"
			]
		},
		"application/x-perl": {
			"source": "nginx",
			"extensions": [
				"pl",
				"pm"
			]
		},
		"application/x-pilot": {
			"source": "nginx",
			"extensions": [
				"prc",
				"pdb"
			]
		},
		"application/x-pkcs12": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"p12",
				"pfx"
			]
		},
		"application/x-pkcs7-certificates": {
			"source": "apache",
			"extensions": [
				"p7b",
				"spc"
			]
		},
		"application/x-pkcs7-certreqresp": {
			"source": "apache",
			"extensions": [
				"p7r"
			]
		},
		"application/x-rar-compressed": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"rar"
			]
		},
		"application/x-redhat-package-manager": {
			"source": "nginx",
			"extensions": [
				"rpm"
			]
		},
		"application/x-research-info-systems": {
			"source": "apache",
			"extensions": [
				"ris"
			]
		},
		"application/x-sea": {
			"source": "nginx",
			"extensions": [
				"sea"
			]
		},
		"application/x-sh": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"sh"
			]
		},
		"application/x-shar": {
			"source": "apache",
			"extensions": [
				"shar"
			]
		},
		"application/x-shockwave-flash": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"swf"
			]
		},
		"application/x-silverlight-app": {
			"source": "apache",
			"extensions": [
				"xap"
			]
		},
		"application/x-sql": {
			"source": "apache",
			"extensions": [
				"sql"
			]
		},
		"application/x-stuffit": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"sit"
			]
		},
		"application/x-stuffitx": {
			"source": "apache",
			"extensions": [
				"sitx"
			]
		},
		"application/x-subrip": {
			"source": "apache",
			"extensions": [
				"srt"
			]
		},
		"application/x-sv4cpio": {
			"source": "apache",
			"extensions": [
				"sv4cpio"
			]
		},
		"application/x-sv4crc": {
			"source": "apache",
			"extensions": [
				"sv4crc"
			]
		},
		"application/x-t3vm-image": {
			"source": "apache",
			"extensions": [
				"t3"
			]
		},
		"application/x-tads": {
			"source": "apache",
			"extensions": [
				"gam"
			]
		},
		"application/x-tar": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"tar"
			]
		},
		"application/x-tcl": {
			"source": "apache",
			"extensions": [
				"tcl",
				"tk"
			]
		},
		"application/x-tex": {
			"source": "apache",
			"extensions": [
				"tex"
			]
		},
		"application/x-tex-tfm": {
			"source": "apache",
			"extensions": [
				"tfm"
			]
		},
		"application/x-texinfo": {
			"source": "apache",
			"extensions": [
				"texinfo",
				"texi"
			]
		},
		"application/x-tgif": {
			"source": "apache",
			"extensions": [
				"obj"
			]
		},
		"application/x-ustar": {
			"source": "apache",
			"extensions": [
				"ustar"
			]
		},
		"application/x-wais-source": {
			"source": "apache",
			"extensions": [
				"src"
			]
		},
		"application/x-web-app-manifest+json": {
			"compressible": true,
			"extensions": [
				"webapp"
			]
		},
		"application/x-www-form-urlencoded": {
			"source": "iana",
			"compressible": true
		},
		"application/x-x509-ca-cert": {
			"source": "apache",
			"extensions": [
				"der",
				"crt",
				"pem"
			]
		},
		"application/x-xfig": {
			"source": "apache",
			"extensions": [
				"fig"
			]
		},
		"application/x-xliff+xml": {
			"source": "apache",
			"extensions": [
				"xlf"
			]
		},
		"application/x-xpinstall": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"xpi"
			]
		},
		"application/x-xz": {
			"source": "apache",
			"extensions": [
				"xz"
			]
		},
		"application/x-zmachine": {
			"source": "apache",
			"extensions": [
				"z1",
				"z2",
				"z3",
				"z4",
				"z5",
				"z6",
				"z7",
				"z8"
			]
		},
		"application/x400-bp": {
			"source": "iana"
		},
		"application/xacml+xml": {
			"source": "iana"
		},
		"application/xaml+xml": {
			"source": "apache",
			"extensions": [
				"xaml"
			]
		},
		"application/xcap-att+xml": {
			"source": "iana"
		},
		"application/xcap-caps+xml": {
			"source": "iana"
		},
		"application/xcap-diff+xml": {
			"source": "iana",
			"extensions": [
				"xdf"
			]
		},
		"application/xcap-el+xml": {
			"source": "iana"
		},
		"application/xcap-error+xml": {
			"source": "iana"
		},
		"application/xcap-ns+xml": {
			"source": "iana"
		},
		"application/xcon-conference-info+xml": {
			"source": "iana"
		},
		"application/xcon-conference-info-diff+xml": {
			"source": "iana"
		},
		"application/xenc+xml": {
			"source": "iana",
			"extensions": [
				"xenc"
			]
		},
		"application/xhtml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"xhtml",
				"xht"
			]
		},
		"application/xhtml-voice+xml": {
			"source": "apache"
		},
		"application/xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"xml",
				"xsl",
				"xsd",
				"rng"
			]
		},
		"application/xml-dtd": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"dtd"
			]
		},
		"application/xml-external-parsed-entity": {
			"source": "iana"
		},
		"application/xml-patch+xml": {
			"source": "iana"
		},
		"application/xmpp+xml": {
			"source": "iana"
		},
		"application/xop+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"xop"
			]
		},
		"application/xproc+xml": {
			"source": "apache",
			"extensions": [
				"xpl"
			]
		},
		"application/xslt+xml": {
			"source": "iana",
			"extensions": [
				"xslt"
			]
		},
		"application/xspf+xml": {
			"source": "apache",
			"extensions": [
				"xspf"
			]
		},
		"application/xv+xml": {
			"source": "iana",
			"extensions": [
				"mxml",
				"xhvml",
				"xvml",
				"xvm"
			]
		},
		"application/yang": {
			"source": "iana",
			"extensions": [
				"yang"
			]
		},
		"application/yang-data+json": {
			"source": "iana",
			"compressible": true
		},
		"application/yang-data+xml": {
			"source": "iana"
		},
		"application/yang-patch+json": {
			"source": "iana",
			"compressible": true
		},
		"application/yang-patch+xml": {
			"source": "iana"
		},
		"application/yin+xml": {
			"source": "iana",
			"extensions": [
				"yin"
			]
		},
		"application/zip": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"zip"
			]
		},
		"application/zlib": {
			"source": "iana"
		},
		"audio/1d-interleaved-parityfec": {
			"source": "iana"
		},
		"audio/32kadpcm": {
			"source": "iana"
		},
		"audio/3gpp": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"3gpp"
			]
		},
		"audio/3gpp2": {
			"source": "iana"
		},
		"audio/ac3": {
			"source": "iana"
		},
		"audio/adpcm": {
			"source": "apache",
			"extensions": [
				"adp"
			]
		},
		"audio/amr": {
			"source": "iana"
		},
		"audio/amr-wb": {
			"source": "iana"
		},
		"audio/amr-wb+": {
			"source": "iana"
		},
		"audio/aptx": {
			"source": "iana"
		},
		"audio/asc": {
			"source": "iana"
		},
		"audio/atrac-advanced-lossless": {
			"source": "iana"
		},
		"audio/atrac-x": {
			"source": "iana"
		},
		"audio/atrac3": {
			"source": "iana"
		},
		"audio/basic": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"au",
				"snd"
			]
		},
		"audio/bv16": {
			"source": "iana"
		},
		"audio/bv32": {
			"source": "iana"
		},
		"audio/clearmode": {
			"source": "iana"
		},
		"audio/cn": {
			"source": "iana"
		},
		"audio/dat12": {
			"source": "iana"
		},
		"audio/dls": {
			"source": "iana"
		},
		"audio/dsr-es201108": {
			"source": "iana"
		},
		"audio/dsr-es202050": {
			"source": "iana"
		},
		"audio/dsr-es202211": {
			"source": "iana"
		},
		"audio/dsr-es202212": {
			"source": "iana"
		},
		"audio/dv": {
			"source": "iana"
		},
		"audio/dvi4": {
			"source": "iana"
		},
		"audio/eac3": {
			"source": "iana"
		},
		"audio/encaprtp": {
			"source": "iana"
		},
		"audio/evrc": {
			"source": "iana"
		},
		"audio/evrc-qcp": {
			"source": "iana"
		},
		"audio/evrc0": {
			"source": "iana"
		},
		"audio/evrc1": {
			"source": "iana"
		},
		"audio/evrcb": {
			"source": "iana"
		},
		"audio/evrcb0": {
			"source": "iana"
		},
		"audio/evrcb1": {
			"source": "iana"
		},
		"audio/evrcnw": {
			"source": "iana"
		},
		"audio/evrcnw0": {
			"source": "iana"
		},
		"audio/evrcnw1": {
			"source": "iana"
		},
		"audio/evrcwb": {
			"source": "iana"
		},
		"audio/evrcwb0": {
			"source": "iana"
		},
		"audio/evrcwb1": {
			"source": "iana"
		},
		"audio/evs": {
			"source": "iana"
		},
		"audio/fwdred": {
			"source": "iana"
		},
		"audio/g711-0": {
			"source": "iana"
		},
		"audio/g719": {
			"source": "iana"
		},
		"audio/g722": {
			"source": "iana"
		},
		"audio/g7221": {
			"source": "iana"
		},
		"audio/g723": {
			"source": "iana"
		},
		"audio/g726-16": {
			"source": "iana"
		},
		"audio/g726-24": {
			"source": "iana"
		},
		"audio/g726-32": {
			"source": "iana"
		},
		"audio/g726-40": {
			"source": "iana"
		},
		"audio/g728": {
			"source": "iana"
		},
		"audio/g729": {
			"source": "iana"
		},
		"audio/g7291": {
			"source": "iana"
		},
		"audio/g729d": {
			"source": "iana"
		},
		"audio/g729e": {
			"source": "iana"
		},
		"audio/gsm": {
			"source": "iana"
		},
		"audio/gsm-efr": {
			"source": "iana"
		},
		"audio/gsm-hr-08": {
			"source": "iana"
		},
		"audio/ilbc": {
			"source": "iana"
		},
		"audio/ip-mr_v2.5": {
			"source": "iana"
		},
		"audio/isac": {
			"source": "apache"
		},
		"audio/l16": {
			"source": "iana"
		},
		"audio/l20": {
			"source": "iana"
		},
		"audio/l24": {
			"source": "iana",
			"compressible": false
		},
		"audio/l8": {
			"source": "iana"
		},
		"audio/lpc": {
			"source": "iana"
		},
		"audio/midi": {
			"source": "apache",
			"extensions": [
				"mid",
				"midi",
				"kar",
				"rmi"
			]
		},
		"audio/mobile-xmf": {
			"source": "iana"
		},
		"audio/mp3": {
			"compressible": false,
			"extensions": [
				"mp3"
			]
		},
		"audio/mp4": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"m4a",
				"mp4a"
			]
		},
		"audio/mp4a-latm": {
			"source": "iana"
		},
		"audio/mpa": {
			"source": "iana"
		},
		"audio/mpa-robust": {
			"source": "iana"
		},
		"audio/mpeg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"mpga",
				"mp2",
				"mp2a",
				"mp3",
				"m2a",
				"m3a"
			]
		},
		"audio/mpeg4-generic": {
			"source": "iana"
		},
		"audio/musepack": {
			"source": "apache"
		},
		"audio/ogg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"oga",
				"ogg",
				"spx"
			]
		},
		"audio/opus": {
			"source": "iana"
		},
		"audio/parityfec": {
			"source": "iana"
		},
		"audio/pcma": {
			"source": "iana"
		},
		"audio/pcma-wb": {
			"source": "iana"
		},
		"audio/pcmu": {
			"source": "iana"
		},
		"audio/pcmu-wb": {
			"source": "iana"
		},
		"audio/prs.sid": {
			"source": "iana"
		},
		"audio/qcelp": {
			"source": "iana"
		},
		"audio/raptorfec": {
			"source": "iana"
		},
		"audio/red": {
			"source": "iana"
		},
		"audio/rtp-enc-aescm128": {
			"source": "iana"
		},
		"audio/rtp-midi": {
			"source": "iana"
		},
		"audio/rtploopback": {
			"source": "iana"
		},
		"audio/rtx": {
			"source": "iana"
		},
		"audio/s3m": {
			"source": "apache",
			"extensions": [
				"s3m"
			]
		},
		"audio/silk": {
			"source": "apache",
			"extensions": [
				"sil"
			]
		},
		"audio/smv": {
			"source": "iana"
		},
		"audio/smv-qcp": {
			"source": "iana"
		},
		"audio/smv0": {
			"source": "iana"
		},
		"audio/sp-midi": {
			"source": "iana"
		},
		"audio/speex": {
			"source": "iana"
		},
		"audio/t140c": {
			"source": "iana"
		},
		"audio/t38": {
			"source": "iana"
		},
		"audio/telephone-event": {
			"source": "iana"
		},
		"audio/tone": {
			"source": "iana"
		},
		"audio/uemclip": {
			"source": "iana"
		},
		"audio/ulpfec": {
			"source": "iana"
		},
		"audio/vdvi": {
			"source": "iana"
		},
		"audio/vmr-wb": {
			"source": "iana"
		},
		"audio/vnd.3gpp.iufp": {
			"source": "iana"
		},
		"audio/vnd.4sb": {
			"source": "iana"
		},
		"audio/vnd.audiokoz": {
			"source": "iana"
		},
		"audio/vnd.celp": {
			"source": "iana"
		},
		"audio/vnd.cisco.nse": {
			"source": "iana"
		},
		"audio/vnd.cmles.radio-events": {
			"source": "iana"
		},
		"audio/vnd.cns.anp1": {
			"source": "iana"
		},
		"audio/vnd.cns.inf1": {
			"source": "iana"
		},
		"audio/vnd.dece.audio": {
			"source": "iana",
			"extensions": [
				"uva",
				"uvva"
			]
		},
		"audio/vnd.digital-winds": {
			"source": "iana",
			"extensions": [
				"eol"
			]
		},
		"audio/vnd.dlna.adts": {
			"source": "iana"
		},
		"audio/vnd.dolby.heaac.1": {
			"source": "iana"
		},
		"audio/vnd.dolby.heaac.2": {
			"source": "iana"
		},
		"audio/vnd.dolby.mlp": {
			"source": "iana"
		},
		"audio/vnd.dolby.mps": {
			"source": "iana"
		},
		"audio/vnd.dolby.pl2": {
			"source": "iana"
		},
		"audio/vnd.dolby.pl2x": {
			"source": "iana"
		},
		"audio/vnd.dolby.pl2z": {
			"source": "iana"
		},
		"audio/vnd.dolby.pulse.1": {
			"source": "iana"
		},
		"audio/vnd.dra": {
			"source": "iana",
			"extensions": [
				"dra"
			]
		},
		"audio/vnd.dts": {
			"source": "iana",
			"extensions": [
				"dts"
			]
		},
		"audio/vnd.dts.hd": {
			"source": "iana",
			"extensions": [
				"dtshd"
			]
		},
		"audio/vnd.dvb.file": {
			"source": "iana"
		},
		"audio/vnd.everad.plj": {
			"source": "iana"
		},
		"audio/vnd.hns.audio": {
			"source": "iana"
		},
		"audio/vnd.lucent.voice": {
			"source": "iana",
			"extensions": [
				"lvp"
			]
		},
		"audio/vnd.ms-playready.media.pya": {
			"source": "iana",
			"extensions": [
				"pya"
			]
		},
		"audio/vnd.nokia.mobile-xmf": {
			"source": "iana"
		},
		"audio/vnd.nortel.vbk": {
			"source": "iana"
		},
		"audio/vnd.nuera.ecelp4800": {
			"source": "iana",
			"extensions": [
				"ecelp4800"
			]
		},
		"audio/vnd.nuera.ecelp7470": {
			"source": "iana",
			"extensions": [
				"ecelp7470"
			]
		},
		"audio/vnd.nuera.ecelp9600": {
			"source": "iana",
			"extensions": [
				"ecelp9600"
			]
		},
		"audio/vnd.octel.sbc": {
			"source": "iana"
		},
		"audio/vnd.qcelp": {
			"source": "iana"
		},
		"audio/vnd.rhetorex.32kadpcm": {
			"source": "iana"
		},
		"audio/vnd.rip": {
			"source": "iana",
			"extensions": [
				"rip"
			]
		},
		"audio/vnd.rn-realaudio": {
			"compressible": false
		},
		"audio/vnd.sealedmedia.softseal.mpeg": {
			"source": "iana"
		},
		"audio/vnd.vmx.cvsd": {
			"source": "iana"
		},
		"audio/vnd.wave": {
			"compressible": false
		},
		"audio/vorbis": {
			"source": "iana",
			"compressible": false
		},
		"audio/vorbis-config": {
			"source": "iana"
		},
		"audio/wav": {
			"compressible": false,
			"extensions": [
				"wav"
			]
		},
		"audio/wave": {
			"compressible": false,
			"extensions": [
				"wav"
			]
		},
		"audio/webm": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"weba"
			]
		},
		"audio/x-aac": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"aac"
			]
		},
		"audio/x-aiff": {
			"source": "apache",
			"extensions": [
				"aif",
				"aiff",
				"aifc"
			]
		},
		"audio/x-caf": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"caf"
			]
		},
		"audio/x-flac": {
			"source": "apache",
			"extensions": [
				"flac"
			]
		},
		"audio/x-m4a": {
			"source": "nginx",
			"extensions": [
				"m4a"
			]
		},
		"audio/x-matroska": {
			"source": "apache",
			"extensions": [
				"mka"
			]
		},
		"audio/x-mpegurl": {
			"source": "apache",
			"extensions": [
				"m3u"
			]
		},
		"audio/x-ms-wax": {
			"source": "apache",
			"extensions": [
				"wax"
			]
		},
		"audio/x-ms-wma": {
			"source": "apache",
			"extensions": [
				"wma"
			]
		},
		"audio/x-pn-realaudio": {
			"source": "apache",
			"extensions": [
				"ram",
				"ra"
			]
		},
		"audio/x-pn-realaudio-plugin": {
			"source": "apache",
			"extensions": [
				"rmp"
			]
		},
		"audio/x-realaudio": {
			"source": "nginx",
			"extensions": [
				"ra"
			]
		},
		"audio/x-tta": {
			"source": "apache"
		},
		"audio/x-wav": {
			"source": "apache",
			"extensions": [
				"wav"
			]
		},
		"audio/xm": {
			"source": "apache",
			"extensions": [
				"xm"
			]
		},
		"chemical/x-cdx": {
			"source": "apache",
			"extensions": [
				"cdx"
			]
		},
		"chemical/x-cif": {
			"source": "apache",
			"extensions": [
				"cif"
			]
		},
		"chemical/x-cmdf": {
			"source": "apache",
			"extensions": [
				"cmdf"
			]
		},
		"chemical/x-cml": {
			"source": "apache",
			"extensions": [
				"cml"
			]
		},
		"chemical/x-csml": {
			"source": "apache",
			"extensions": [
				"csml"
			]
		},
		"chemical/x-pdb": {
			"source": "apache"
		},
		"chemical/x-xyz": {
			"source": "apache",
			"extensions": [
				"xyz"
			]
		},
		"font/opentype": {
			"compressible": true,
			"extensions": [
				"otf"
			]
		},
		"image/bmp": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"bmp"
			]
		},
		"image/cgm": {
			"source": "iana",
			"extensions": [
				"cgm"
			]
		},
		"image/dicom-rle": {
			"source": "iana"
		},
		"image/emf": {
			"source": "iana"
		},
		"image/fits": {
			"source": "iana"
		},
		"image/g3fax": {
			"source": "iana",
			"extensions": [
				"g3"
			]
		},
		"image/gif": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"gif"
			]
		},
		"image/ief": {
			"source": "iana",
			"extensions": [
				"ief"
			]
		},
		"image/jls": {
			"source": "iana"
		},
		"image/jp2": {
			"source": "iana"
		},
		"image/jpeg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"jpeg",
				"jpg",
				"jpe"
			]
		},
		"image/jpm": {
			"source": "iana"
		},
		"image/jpx": {
			"source": "iana"
		},
		"image/ktx": {
			"source": "iana",
			"extensions": [
				"ktx"
			]
		},
		"image/naplps": {
			"source": "iana"
		},
		"image/pjpeg": {
			"compressible": false
		},
		"image/png": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"png"
			]
		},
		"image/prs.btif": {
			"source": "iana",
			"extensions": [
				"btif"
			]
		},
		"image/prs.pti": {
			"source": "iana"
		},
		"image/pwg-raster": {
			"source": "iana"
		},
		"image/sgi": {
			"source": "apache",
			"extensions": [
				"sgi"
			]
		},
		"image/svg+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"svg",
				"svgz"
			]
		},
		"image/t38": {
			"source": "iana"
		},
		"image/tiff": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"tiff",
				"tif"
			]
		},
		"image/tiff-fx": {
			"source": "iana"
		},
		"image/vnd.adobe.photoshop": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"psd"
			]
		},
		"image/vnd.airzip.accelerator.azv": {
			"source": "iana"
		},
		"image/vnd.cns.inf2": {
			"source": "iana"
		},
		"image/vnd.dece.graphic": {
			"source": "iana",
			"extensions": [
				"uvi",
				"uvvi",
				"uvg",
				"uvvg"
			]
		},
		"image/vnd.djvu": {
			"source": "iana",
			"extensions": [
				"djvu",
				"djv"
			]
		},
		"image/vnd.dvb.subtitle": {
			"source": "iana",
			"extensions": [
				"sub"
			]
		},
		"image/vnd.dwg": {
			"source": "iana",
			"extensions": [
				"dwg"
			]
		},
		"image/vnd.dxf": {
			"source": "iana",
			"extensions": [
				"dxf"
			]
		},
		"image/vnd.fastbidsheet": {
			"source": "iana",
			"extensions": [
				"fbs"
			]
		},
		"image/vnd.fpx": {
			"source": "iana",
			"extensions": [
				"fpx"
			]
		},
		"image/vnd.fst": {
			"source": "iana",
			"extensions": [
				"fst"
			]
		},
		"image/vnd.fujixerox.edmics-mmr": {
			"source": "iana",
			"extensions": [
				"mmr"
			]
		},
		"image/vnd.fujixerox.edmics-rlc": {
			"source": "iana",
			"extensions": [
				"rlc"
			]
		},
		"image/vnd.globalgraphics.pgb": {
			"source": "iana"
		},
		"image/vnd.microsoft.icon": {
			"source": "iana"
		},
		"image/vnd.mix": {
			"source": "iana"
		},
		"image/vnd.mozilla.apng": {
			"source": "iana"
		},
		"image/vnd.ms-modi": {
			"source": "iana",
			"extensions": [
				"mdi"
			]
		},
		"image/vnd.ms-photo": {
			"source": "apache",
			"extensions": [
				"wdp"
			]
		},
		"image/vnd.net-fpx": {
			"source": "iana",
			"extensions": [
				"npx"
			]
		},
		"image/vnd.radiance": {
			"source": "iana"
		},
		"image/vnd.sealed.png": {
			"source": "iana"
		},
		"image/vnd.sealedmedia.softseal.gif": {
			"source": "iana"
		},
		"image/vnd.sealedmedia.softseal.jpg": {
			"source": "iana"
		},
		"image/vnd.svf": {
			"source": "iana"
		},
		"image/vnd.tencent.tap": {
			"source": "iana"
		},
		"image/vnd.valve.source.texture": {
			"source": "iana"
		},
		"image/vnd.wap.wbmp": {
			"source": "iana",
			"extensions": [
				"wbmp"
			]
		},
		"image/vnd.xiff": {
			"source": "iana",
			"extensions": [
				"xif"
			]
		},
		"image/vnd.zbrush.pcx": {
			"source": "iana"
		},
		"image/webp": {
			"source": "apache",
			"extensions": [
				"webp"
			]
		},
		"image/wmf": {
			"source": "iana"
		},
		"image/x-3ds": {
			"source": "apache",
			"extensions": [
				"3ds"
			]
		},
		"image/x-cmu-raster": {
			"source": "apache",
			"extensions": [
				"ras"
			]
		},
		"image/x-cmx": {
			"source": "apache",
			"extensions": [
				"cmx"
			]
		},
		"image/x-freehand": {
			"source": "apache",
			"extensions": [
				"fh",
				"fhc",
				"fh4",
				"fh5",
				"fh7"
			]
		},
		"image/x-icon": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"ico"
			]
		},
		"image/x-jng": {
			"source": "nginx",
			"extensions": [
				"jng"
			]
		},
		"image/x-mrsid-image": {
			"source": "apache",
			"extensions": [
				"sid"
			]
		},
		"image/x-ms-bmp": {
			"source": "nginx",
			"compressible": true,
			"extensions": [
				"bmp"
			]
		},
		"image/x-pcx": {
			"source": "apache",
			"extensions": [
				"pcx"
			]
		},
		"image/x-pict": {
			"source": "apache",
			"extensions": [
				"pic",
				"pct"
			]
		},
		"image/x-portable-anymap": {
			"source": "apache",
			"extensions": [
				"pnm"
			]
		},
		"image/x-portable-bitmap": {
			"source": "apache",
			"extensions": [
				"pbm"
			]
		},
		"image/x-portable-graymap": {
			"source": "apache",
			"extensions": [
				"pgm"
			]
		},
		"image/x-portable-pixmap": {
			"source": "apache",
			"extensions": [
				"ppm"
			]
		},
		"image/x-rgb": {
			"source": "apache",
			"extensions": [
				"rgb"
			]
		},
		"image/x-tga": {
			"source": "apache",
			"extensions": [
				"tga"
			]
		},
		"image/x-xbitmap": {
			"source": "apache",
			"extensions": [
				"xbm"
			]
		},
		"image/x-xcf": {
			"compressible": false
		},
		"image/x-xpixmap": {
			"source": "apache",
			"extensions": [
				"xpm"
			]
		},
		"image/x-xwindowdump": {
			"source": "apache",
			"extensions": [
				"xwd"
			]
		},
		"message/cpim": {
			"source": "iana"
		},
		"message/delivery-status": {
			"source": "iana"
		},
		"message/disposition-notification": {
			"source": "iana"
		},
		"message/external-body": {
			"source": "iana"
		},
		"message/feedback-report": {
			"source": "iana"
		},
		"message/global": {
			"source": "iana"
		},
		"message/global-delivery-status": {
			"source": "iana"
		},
		"message/global-disposition-notification": {
			"source": "iana"
		},
		"message/global-headers": {
			"source": "iana"
		},
		"message/http": {
			"source": "iana",
			"compressible": false
		},
		"message/imdn+xml": {
			"source": "iana",
			"compressible": true
		},
		"message/news": {
			"source": "iana"
		},
		"message/partial": {
			"source": "iana",
			"compressible": false
		},
		"message/rfc822": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"eml",
				"mime"
			]
		},
		"message/s-http": {
			"source": "iana"
		},
		"message/sip": {
			"source": "iana"
		},
		"message/sipfrag": {
			"source": "iana"
		},
		"message/tracking-status": {
			"source": "iana"
		},
		"message/vnd.si.simp": {
			"source": "iana"
		},
		"message/vnd.wfa.wsc": {
			"source": "iana"
		},
		"model/gltf+json": {
			"source": "iana",
			"compressible": true
		},
		"model/iges": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"igs",
				"iges"
			]
		},
		"model/mesh": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"msh",
				"mesh",
				"silo"
			]
		},
		"model/vnd.collada+xml": {
			"source": "iana",
			"extensions": [
				"dae"
			]
		},
		"model/vnd.dwf": {
			"source": "iana",
			"extensions": [
				"dwf"
			]
		},
		"model/vnd.flatland.3dml": {
			"source": "iana"
		},
		"model/vnd.gdl": {
			"source": "iana",
			"extensions": [
				"gdl"
			]
		},
		"model/vnd.gs-gdl": {
			"source": "apache"
		},
		"model/vnd.gs.gdl": {
			"source": "iana"
		},
		"model/vnd.gtw": {
			"source": "iana",
			"extensions": [
				"gtw"
			]
		},
		"model/vnd.moml+xml": {
			"source": "iana"
		},
		"model/vnd.mts": {
			"source": "iana",
			"extensions": [
				"mts"
			]
		},
		"model/vnd.opengex": {
			"source": "iana"
		},
		"model/vnd.parasolid.transmit.binary": {
			"source": "iana"
		},
		"model/vnd.parasolid.transmit.text": {
			"source": "iana"
		},
		"model/vnd.rosette.annotated-data-model": {
			"source": "iana"
		},
		"model/vnd.valve.source.compiled-map": {
			"source": "iana"
		},
		"model/vnd.vtu": {
			"source": "iana",
			"extensions": [
				"vtu"
			]
		},
		"model/vrml": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"wrl",
				"vrml"
			]
		},
		"model/x3d+binary": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"x3db",
				"x3dbz"
			]
		},
		"model/x3d+fastinfoset": {
			"source": "iana"
		},
		"model/x3d+vrml": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"x3dv",
				"x3dvz"
			]
		},
		"model/x3d+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"x3d",
				"x3dz"
			]
		},
		"model/x3d-vrml": {
			"source": "iana"
		},
		"multipart/alternative": {
			"source": "iana",
			"compressible": false
		},
		"multipart/appledouble": {
			"source": "iana"
		},
		"multipart/byteranges": {
			"source": "iana"
		},
		"multipart/digest": {
			"source": "iana"
		},
		"multipart/encrypted": {
			"source": "iana",
			"compressible": false
		},
		"multipart/form-data": {
			"source": "iana",
			"compressible": false
		},
		"multipart/header-set": {
			"source": "iana"
		},
		"multipart/mixed": {
			"source": "iana",
			"compressible": false
		},
		"multipart/parallel": {
			"source": "iana"
		},
		"multipart/related": {
			"source": "iana",
			"compressible": false
		},
		"multipart/report": {
			"source": "iana"
		},
		"multipart/signed": {
			"source": "iana",
			"compressible": false
		},
		"multipart/voice-message": {
			"source": "iana"
		},
		"multipart/x-mixed-replace": {
			"source": "iana"
		},
		"text/1d-interleaved-parityfec": {
			"source": "iana"
		},
		"text/cache-manifest": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"appcache",
				"manifest"
			]
		},
		"text/calendar": {
			"source": "iana",
			"extensions": [
				"ics",
				"ifb"
			]
		},
		"text/calender": {
			"compressible": true
		},
		"text/cmd": {
			"compressible": true
		},
		"text/coffeescript": {
			"extensions": [
				"coffee",
				"litcoffee"
			]
		},
		"text/css": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"css"
			]
		},
		"text/csv": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"csv"
			]
		},
		"text/csv-schema": {
			"source": "iana"
		},
		"text/directory": {
			"source": "iana"
		},
		"text/dns": {
			"source": "iana"
		},
		"text/ecmascript": {
			"source": "iana"
		},
		"text/encaprtp": {
			"source": "iana"
		},
		"text/enriched": {
			"source": "iana"
		},
		"text/fwdred": {
			"source": "iana"
		},
		"text/grammar-ref-list": {
			"source": "iana"
		},
		"text/hjson": {
			"extensions": [
				"hjson"
			]
		},
		"text/html": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"html",
				"htm",
				"shtml"
			]
		},
		"text/jade": {
			"extensions": [
				"jade"
			]
		},
		"text/javascript": {
			"source": "iana",
			"compressible": true
		},
		"text/jcr-cnd": {
			"source": "iana"
		},
		"text/jsx": {
			"compressible": true,
			"extensions": [
				"jsx"
			]
		},
		"text/less": {
			"extensions": [
				"less"
			]
		},
		"text/markdown": {
			"source": "iana"
		},
		"text/mathml": {
			"source": "nginx",
			"extensions": [
				"mml"
			]
		},
		"text/mizar": {
			"source": "iana"
		},
		"text/n3": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"n3"
			]
		},
		"text/parameters": {
			"source": "iana"
		},
		"text/parityfec": {
			"source": "iana"
		},
		"text/plain": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"txt",
				"text",
				"conf",
				"def",
				"list",
				"log",
				"in",
				"ini"
			]
		},
		"text/provenance-notation": {
			"source": "iana"
		},
		"text/prs.fallenstein.rst": {
			"source": "iana"
		},
		"text/prs.lines.tag": {
			"source": "iana",
			"extensions": [
				"dsc"
			]
		},
		"text/prs.prop.logic": {
			"source": "iana"
		},
		"text/raptorfec": {
			"source": "iana"
		},
		"text/red": {
			"source": "iana"
		},
		"text/rfc822-headers": {
			"source": "iana"
		},
		"text/richtext": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"rtx"
			]
		},
		"text/rtf": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"rtf"
			]
		},
		"text/rtp-enc-aescm128": {
			"source": "iana"
		},
		"text/rtploopback": {
			"source": "iana"
		},
		"text/rtx": {
			"source": "iana"
		},
		"text/sgml": {
			"source": "iana",
			"extensions": [
				"sgml",
				"sgm"
			]
		},
		"text/slim": {
			"extensions": [
				"slim",
				"slm"
			]
		},
		"text/stylus": {
			"extensions": [
				"stylus",
				"styl"
			]
		},
		"text/t140": {
			"source": "iana"
		},
		"text/tab-separated-values": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"tsv"
			]
		},
		"text/troff": {
			"source": "iana",
			"extensions": [
				"t",
				"tr",
				"roff",
				"man",
				"me",
				"ms"
			]
		},
		"text/turtle": {
			"source": "iana",
			"extensions": [
				"ttl"
			]
		},
		"text/ulpfec": {
			"source": "iana"
		},
		"text/uri-list": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"uri",
				"uris",
				"urls"
			]
		},
		"text/vcard": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"vcard"
			]
		},
		"text/vnd.a": {
			"source": "iana"
		},
		"text/vnd.abc": {
			"source": "iana"
		},
		"text/vnd.ascii-art": {
			"source": "iana"
		},
		"text/vnd.curl": {
			"source": "iana",
			"extensions": [
				"curl"
			]
		},
		"text/vnd.curl.dcurl": {
			"source": "apache",
			"extensions": [
				"dcurl"
			]
		},
		"text/vnd.curl.mcurl": {
			"source": "apache",
			"extensions": [
				"mcurl"
			]
		},
		"text/vnd.curl.scurl": {
			"source": "apache",
			"extensions": [
				"scurl"
			]
		},
		"text/vnd.debian.copyright": {
			"source": "iana"
		},
		"text/vnd.dmclientscript": {
			"source": "iana"
		},
		"text/vnd.dvb.subtitle": {
			"source": "iana",
			"extensions": [
				"sub"
			]
		},
		"text/vnd.esmertec.theme-descriptor": {
			"source": "iana"
		},
		"text/vnd.fly": {
			"source": "iana",
			"extensions": [
				"fly"
			]
		},
		"text/vnd.fmi.flexstor": {
			"source": "iana",
			"extensions": [
				"flx"
			]
		},
		"text/vnd.graphviz": {
			"source": "iana",
			"extensions": [
				"gv"
			]
		},
		"text/vnd.in3d.3dml": {
			"source": "iana",
			"extensions": [
				"3dml"
			]
		},
		"text/vnd.in3d.spot": {
			"source": "iana",
			"extensions": [
				"spot"
			]
		},
		"text/vnd.iptc.newsml": {
			"source": "iana"
		},
		"text/vnd.iptc.nitf": {
			"source": "iana"
		},
		"text/vnd.latex-z": {
			"source": "iana"
		},
		"text/vnd.motorola.reflex": {
			"source": "iana"
		},
		"text/vnd.ms-mediapackage": {
			"source": "iana"
		},
		"text/vnd.net2phone.commcenter.command": {
			"source": "iana"
		},
		"text/vnd.radisys.msml-basic-layout": {
			"source": "iana"
		},
		"text/vnd.si.uricatalogue": {
			"source": "iana"
		},
		"text/vnd.sun.j2me.app-descriptor": {
			"source": "iana",
			"extensions": [
				"jad"
			]
		},
		"text/vnd.trolltech.linguist": {
			"source": "iana"
		},
		"text/vnd.wap.si": {
			"source": "iana"
		},
		"text/vnd.wap.sl": {
			"source": "iana"
		},
		"text/vnd.wap.wml": {
			"source": "iana",
			"extensions": [
				"wml"
			]
		},
		"text/vnd.wap.wmlscript": {
			"source": "iana",
			"extensions": [
				"wmls"
			]
		},
		"text/vtt": {
			"charset": "UTF-8",
			"compressible": true,
			"extensions": [
				"vtt"
			]
		},
		"text/x-asm": {
			"source": "apache",
			"extensions": [
				"s",
				"asm"
			]
		},
		"text/x-c": {
			"source": "apache",
			"extensions": [
				"c",
				"cc",
				"cxx",
				"cpp",
				"h",
				"hh",
				"dic"
			]
		},
		"text/x-component": {
			"source": "nginx",
			"extensions": [
				"htc"
			]
		},
		"text/x-fortran": {
			"source": "apache",
			"extensions": [
				"f",
				"for",
				"f77",
				"f90"
			]
		},
		"text/x-gwt-rpc": {
			"compressible": true
		},
		"text/x-handlebars-template": {
			"extensions": [
				"hbs"
			]
		},
		"text/x-java-source": {
			"source": "apache",
			"extensions": [
				"java"
			]
		},
		"text/x-jquery-tmpl": {
			"compressible": true
		},
		"text/x-lua": {
			"extensions": [
				"lua"
			]
		},
		"text/x-markdown": {
			"compressible": true,
			"extensions": [
				"markdown",
				"md",
				"mkd"
			]
		},
		"text/x-nfo": {
			"source": "apache",
			"extensions": [
				"nfo"
			]
		},
		"text/x-opml": {
			"source": "apache",
			"extensions": [
				"opml"
			]
		},
		"text/x-pascal": {
			"source": "apache",
			"extensions": [
				"p",
				"pas"
			]
		},
		"text/x-processing": {
			"compressible": true,
			"extensions": [
				"pde"
			]
		},
		"text/x-sass": {
			"extensions": [
				"sass"
			]
		},
		"text/x-scss": {
			"extensions": [
				"scss"
			]
		},
		"text/x-setext": {
			"source": "apache",
			"extensions": [
				"etx"
			]
		},
		"text/x-sfv": {
			"source": "apache",
			"extensions": [
				"sfv"
			]
		},
		"text/x-suse-ymp": {
			"compressible": true,
			"extensions": [
				"ymp"
			]
		},
		"text/x-uuencode": {
			"source": "apache",
			"extensions": [
				"uu"
			]
		},
		"text/x-vcalendar": {
			"source": "apache",
			"extensions": [
				"vcs"
			]
		},
		"text/x-vcard": {
			"source": "apache",
			"extensions": [
				"vcf"
			]
		},
		"text/xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"xml"
			]
		},
		"text/xml-external-parsed-entity": {
			"source": "iana"
		},
		"text/yaml": {
			"extensions": [
				"yaml",
				"yml"
			]
		},
		"video/1d-interleaved-parityfec": {
			"source": "apache"
		},
		"video/3gpp": {
			"source": "apache",
			"extensions": [
				"3gp",
				"3gpp"
			]
		},
		"video/3gpp-tt": {
			"source": "apache"
		},
		"video/3gpp2": {
			"source": "apache",
			"extensions": [
				"3g2"
			]
		},
		"video/bmpeg": {
			"source": "apache"
		},
		"video/bt656": {
			"source": "apache"
		},
		"video/celb": {
			"source": "apache"
		},
		"video/dv": {
			"source": "apache"
		},
		"video/encaprtp": {
			"source": "apache"
		},
		"video/h261": {
			"source": "apache",
			"extensions": [
				"h261"
			]
		},
		"video/h263": {
			"source": "apache",
			"extensions": [
				"h263"
			]
		},
		"video/h263-1998": {
			"source": "apache"
		},
		"video/h263-2000": {
			"source": "apache"
		},
		"video/h264": {
			"source": "apache",
			"extensions": [
				"h264"
			]
		},
		"video/h264-rcdo": {
			"source": "apache"
		},
		"video/h264-svc": {
			"source": "apache"
		},
		"video/h265": {
			"source": "apache"
		},
		"video/iso.segment": {
			"source": "apache"
		},
		"video/jpeg": {
			"source": "apache",
			"extensions": [
				"jpgv"
			]
		},
		"video/jpeg2000": {
			"source": "apache"
		},
		"video/jpm": {
			"source": "apache",
			"extensions": [
				"jpm",
				"jpgm"
			]
		},
		"video/mj2": {
			"source": "apache",
			"extensions": [
				"mj2",
				"mjp2"
			]
		},
		"video/mp1s": {
			"source": "apache"
		},
		"video/mp2p": {
			"source": "apache"
		},
		"video/mp2t": {
			"source": "apache",
			"extensions": [
				"ts"
			]
		},
		"video/mp4": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"mp4",
				"mp4v",
				"mpg4"
			]
		},
		"video/mp4v-es": {
			"source": "apache"
		},
		"video/mpeg": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"mpeg",
				"mpg",
				"mpe",
				"m1v",
				"m2v"
			]
		},
		"video/mpeg4-generic": {
			"source": "apache"
		},
		"video/mpv": {
			"source": "apache"
		},
		"video/nv": {
			"source": "apache"
		},
		"video/ogg": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"ogv"
			]
		},
		"video/parityfec": {
			"source": "apache"
		},
		"video/pointer": {
			"source": "apache"
		},
		"video/quicktime": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"qt",
				"mov"
			]
		},
		"video/raptorfec": {
			"source": "apache"
		},
		"video/raw": {
			"source": "apache"
		},
		"video/rtp-enc-aescm128": {
			"source": "apache"
		},
		"video/rtploopback": {
			"source": "apache"
		},
		"video/rtx": {
			"source": "apache"
		},
		"video/smpte292m": {
			"source": "apache"
		},
		"video/ulpfec": {
			"source": "apache"
		},
		"video/vc1": {
			"source": "apache"
		},
		"video/vnd.cctv": {
			"source": "apache"
		},
		"video/vnd.dece.hd": {
			"source": "apache",
			"extensions": [
				"uvh",
				"uvvh"
			]
		},
		"video/vnd.dece.mobile": {
			"source": "apache",
			"extensions": [
				"uvm",
				"uvvm"
			]
		},
		"video/vnd.dece.mp4": {
			"source": "apache"
		},
		"video/vnd.dece.pd": {
			"source": "apache",
			"extensions": [
				"uvp",
				"uvvp"
			]
		},
		"video/vnd.dece.sd": {
			"source": "apache",
			"extensions": [
				"uvs",
				"uvvs"
			]
		},
		"video/vnd.dece.video": {
			"source": "apache",
			"extensions": [
				"uvv",
				"uvvv"
			]
		},
		"video/vnd.directv.mpeg": {
			"source": "apache"
		},
		"video/vnd.directv.mpeg-tts": {
			"source": "apache"
		},
		"video/vnd.dlna.mpeg-tts": {
			"source": "apache"
		},
		"video/vnd.dvb.file": {
			"source": "apache",
			"extensions": [
				"dvb"
			]
		},
		"video/vnd.fvt": {
			"source": "apache",
			"extensions": [
				"fvt"
			]
		},
		"video/vnd.hns.video": {
			"source": "apache"
		},
		"video/vnd.iptvforum.1dparityfec-1010": {
			"source": "apache"
		},
		"video/vnd.iptvforum.1dparityfec-2005": {
			"source": "apache"
		},
		"video/vnd.iptvforum.2dparityfec-1010": {
			"source": "apache"
		},
		"video/vnd.iptvforum.2dparityfec-2005": {
			"source": "apache"
		},
		"video/vnd.iptvforum.ttsavc": {
			"source": "apache"
		},
		"video/vnd.iptvforum.ttsmpeg2": {
			"source": "apache"
		},
		"video/vnd.motorola.video": {
			"source": "apache"
		},
		"video/vnd.motorola.videop": {
			"source": "apache"
		},
		"video/vnd.mpegurl": {
			"source": "apache",
			"extensions": [
				"mxu",
				"m4u"
			]
		},
		"video/vnd.ms-playready.media.pyv": {
			"source": "apache",
			"extensions": [
				"pyv"
			]
		},
		"video/vnd.nokia.interleaved-multimedia": {
			"source": "apache"
		},
		"video/vnd.nokia.videovoip": {
			"source": "apache"
		},
		"video/vnd.objectvideo": {
			"source": "apache"
		},
		"video/vnd.radgamettools.bink": {
			"source": "apache"
		},
		"video/vnd.radgamettools.smacker": {
			"source": "apache"
		},
		"video/vnd.sealed.mpeg1": {
			"source": "apache"
		},
		"video/vnd.sealed.mpeg4": {
			"source": "apache"
		},
		"video/vnd.sealed.swf": {
			"source": "apache"
		},
		"video/vnd.sealedmedia.softseal.mov": {
			"source": "apache"
		},
		"video/vnd.uvvu.mp4": {
			"source": "apache",
			"extensions": [
				"uvu",
				"uvvu"
			]
		},
		"video/vnd.vivo": {
			"source": "apache",
			"extensions": [
				"viv"
			]
		},
		"video/vp8": {
			"source": "apache"
		},
		"video/webm": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"webm"
			]
		},
		"video/x-f4v": {
			"source": "apache",
			"extensions": [
				"f4v"
			]
		},
		"video/x-fli": {
			"source": "apache",
			"extensions": [
				"fli"
			]
		},
		"video/x-flv": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"flv"
			]
		},
		"video/x-m4v": {
			"source": "apache",
			"extensions": [
				"m4v"
			]
		},
		"video/x-matroska": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"mkv",
				"mk3d",
				"mks"
			]
		},
		"video/x-mng": {
			"source": "apache",
			"extensions": [
				"mng"
			]
		},
		"video/x-ms-asf": {
			"source": "apache",
			"extensions": [
				"asf",
				"asx"
			]
		},
		"video/x-ms-vob": {
			"source": "apache",
			"extensions": [
				"vob"
			]
		},
		"video/x-ms-wm": {
			"source": "apache",
			"extensions": [
				"wm"
			]
		},
		"video/x-ms-wmv": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"wmv"
			]
		},
		"video/x-ms-wmx": {
			"source": "apache",
			"extensions": [
				"wmx"
			]
		},
		"video/x-ms-wvx": {
			"source": "apache",
			"extensions": [
				"wvx"
			]
		},
		"video/x-msvideo": {
			"source": "apache",
			"extensions": [
				"avi"
			]
		},
		"video/x-sgi-movie": {
			"source": "apache",
			"extensions": [
				"movie"
			]
		},
		"video/x-smv": {
			"source": "apache",
			"extensions": [
				"smv"
			]
		},
		"x-conference/x-cooltalk": {
			"source": "apache",
			"extensions": [
				"ice"
			]
		},
		"x-shader/x-fragment": {
			"compressible": true
		},
		"x-shader/x-vertex": {
			"compressible": true
		}
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * type-is
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var typer = __webpack_require__(133)
	var mime = __webpack_require__(129)
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = typeofrequest
	module.exports.is = typeis
	module.exports.hasBody = hasbody
	module.exports.normalize = normalize
	module.exports.match = mimeMatch
	
	/**
	 * Compare a `value` content-type with `types`.
	 * Each `type` can be an extension like `html`,
	 * a special shortcut like `multipart` or `urlencoded`,
	 * or a mime type.
	 *
	 * If no types match, `false` is returned.
	 * Otherwise, the first `type` that matches is returned.
	 *
	 * @param {String} value
	 * @param {Array} types
	 * @public
	 */
	
	function typeis (value, types_) {
	  var i
	  var types = types_
	
	  // remove parameters and normalize
	  var val = tryNormalizeType(value)
	
	  // no type or invalid
	  if (!val) {
	    return false
	  }
	
	  // support flattened arguments
	  if (types && !Array.isArray(types)) {
	    types = new Array(arguments.length - 1)
	    for (i = 0; i < types.length; i++) {
	      types[i] = arguments[i + 1]
	    }
	  }
	
	  // no types, return the content type
	  if (!types || !types.length) {
	    return val
	  }
	
	  var type
	  for (i = 0; i < types.length; i++) {
	    if (mimeMatch(normalize(type = types[i]), val)) {
	      return type[0] === '+' || type.indexOf('*') !== -1
	        ? val
	        : type
	    }
	  }
	
	  // no matches
	  return false
	}
	
	/**
	 * Check if a request has a request body.
	 * A request with a body __must__ either have `transfer-encoding`
	 * or `content-length` headers set.
	 * http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.3
	 *
	 * @param {Object} request
	 * @return {Boolean}
	 * @public
	 */
	
	function hasbody (req) {
	  return req.headers['transfer-encoding'] !== undefined ||
	    !isNaN(req.headers['content-length'])
	}
	
	/**
	 * Check if the incoming request contains the "Content-Type"
	 * header field, and it contains any of the give mime `type`s.
	 * If there is no request body, `null` is returned.
	 * If there is no content type, `false` is returned.
	 * Otherwise, it returns the first `type` that matches.
	 *
	 * Examples:
	 *
	 *     // With Content-Type: text/html; charset=utf-8
	 *     this.is('html'); // => 'html'
	 *     this.is('text/html'); // => 'text/html'
	 *     this.is('text/*', 'application/json'); // => 'text/html'
	 *
	 *     // When Content-Type is application/json
	 *     this.is('json', 'urlencoded'); // => 'json'
	 *     this.is('application/json'); // => 'application/json'
	 *     this.is('html', 'application/*'); // => 'application/json'
	 *
	 *     this.is('html'); // => false
	 *
	 * @param {String|Array} types...
	 * @return {String|false|null}
	 * @public
	 */
	
	function typeofrequest (req, types_) {
	  var types = types_
	
	  // no body
	  if (!hasbody(req)) {
	    return null
	  }
	
	  // support flattened arguments
	  if (arguments.length > 2) {
	    types = new Array(arguments.length - 1)
	    for (var i = 0; i < types.length; i++) {
	      types[i] = arguments[i + 1]
	    }
	  }
	
	  // request content type
	  var value = req.headers['content-type']
	
	  return typeis(value, types)
	}
	
	/**
	 * Normalize a mime type.
	 * If it's a shorthand, expand it to a valid mime type.
	 *
	 * In general, you probably want:
	 *
	 *   var type = is(req, ['urlencoded', 'json', 'multipart']);
	 *
	 * Then use the appropriate body parsers.
	 * These three are the most common request body types
	 * and are thus ensured to work.
	 *
	 * @param {String} type
	 * @private
	 */
	
	function normalize (type) {
	  if (typeof type !== 'string') {
	    // invalid type
	    return false
	  }
	
	  switch (type) {
	    case 'urlencoded':
	      return 'application/x-www-form-urlencoded'
	    case 'multipart':
	      return 'multipart/*'
	  }
	
	  if (type[0] === '+') {
	    // "+json" -> "*/*+json" expando
	    return '*/*' + type
	  }
	
	  return type.indexOf('/') === -1
	    ? mime.lookup(type)
	    : type
	}
	
	/**
	 * Check if `expected` mime type
	 * matches `actual` mime type with
	 * wildcard and +suffix support.
	 *
	 * @param {String} expected
	 * @param {String} actual
	 * @return {Boolean}
	 * @private
	 */
	
	function mimeMatch (expected, actual) {
	  // invalid type
	  if (expected === false) {
	    return false
	  }
	
	  // split types
	  var actualParts = actual.split('/')
	  var expectedParts = expected.split('/')
	
	  // invalid format
	  if (actualParts.length !== 2 || expectedParts.length !== 2) {
	    return false
	  }
	
	  // validate type
	  if (expectedParts[0] !== '*' && expectedParts[0] !== actualParts[0]) {
	    return false
	  }
	
	  // validate suffix wildcard
	  if (expectedParts[1].substr(0, 2) === '*+') {
	    return expectedParts[1].length <= actualParts[1].length + 1 &&
	      expectedParts[1].substr(1) === actualParts[1].substr(1 - expectedParts[1].length)
	  }
	
	  // validate subtype
	  if (expectedParts[1] !== '*' && expectedParts[1] !== actualParts[1]) {
	    return false
	  }
	
	  return true
	}
	
	/**
	 * Normalize a type and remove parameters.
	 *
	 * @param {string} value
	 * @return {string}
	 * @private
	 */
	
	function normalizeType (value) {
	  // parse the type
	  var type = typer.parse(value)
	
	  // remove the parameters
	  type.parameters = undefined
	
	  // reformat it
	  return typer.format(type)
	}
	
	/**
	 * Try to normalize a type and remove parameters.
	 *
	 * @param {string} value
	 * @return {string}
	 * @private
	 */
	
	function tryNormalizeType (value) {
	  try {
	    return normalizeType(value)
	  } catch (err) {
	    return null
	  }
	}


/***/ },
/* 133 */
/***/ function(module, exports) {

	/*!
	 * media-typer
	 * Copyright(c) 2014 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	/**
	 * RegExp to match *( ";" parameter ) in RFC 2616 sec 3.7
	 *
	 * parameter     = token "=" ( token | quoted-string )
	 * token         = 1*<any CHAR except CTLs or separators>
	 * separators    = "(" | ")" | "<" | ">" | "@"
	 *               | "," | ";" | ":" | "\" | <">
	 *               | "/" | "[" | "]" | "?" | "="
	 *               | "{" | "}" | SP | HT
	 * quoted-string = ( <"> *(qdtext | quoted-pair ) <"> )
	 * qdtext        = <any TEXT except <">>
	 * quoted-pair   = "\" CHAR
	 * CHAR          = <any US-ASCII character (octets 0 - 127)>
	 * TEXT          = <any OCTET except CTLs, but including LWS>
	 * LWS           = [CRLF] 1*( SP | HT )
	 * CRLF          = CR LF
	 * CR            = <US-ASCII CR, carriage return (13)>
	 * LF            = <US-ASCII LF, linefeed (10)>
	 * SP            = <US-ASCII SP, space (32)>
	 * SHT           = <US-ASCII HT, horizontal-tab (9)>
	 * CTL           = <any US-ASCII control character (octets 0 - 31) and DEL (127)>
	 * OCTET         = <any 8-bit sequence of data>
	 */
	var paramRegExp = /; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u0020-\u007e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g;
	var textRegExp = /^[\u0020-\u007e\u0080-\u00ff]+$/
	var tokenRegExp = /^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/
	
	/**
	 * RegExp to match quoted-pair in RFC 2616
	 *
	 * quoted-pair = "\" CHAR
	 * CHAR        = <any US-ASCII character (octets 0 - 127)>
	 */
	var qescRegExp = /\\([\u0000-\u007f])/g;
	
	/**
	 * RegExp to match chars that must be quoted-pair in RFC 2616
	 */
	var quoteRegExp = /([\\"])/g;
	
	/**
	 * RegExp to match type in RFC 6838
	 *
	 * type-name = restricted-name
	 * subtype-name = restricted-name
	 * restricted-name = restricted-name-first *126restricted-name-chars
	 * restricted-name-first  = ALPHA / DIGIT
	 * restricted-name-chars  = ALPHA / DIGIT / "!" / "#" /
	 *                          "$" / "&" / "-" / "^" / "_"
	 * restricted-name-chars =/ "." ; Characters before first dot always
	 *                              ; specify a facet name
	 * restricted-name-chars =/ "+" ; Characters after last plus always
	 *                              ; specify a structured syntax suffix
	 * ALPHA =  %x41-5A / %x61-7A   ; A-Z / a-z
	 * DIGIT =  %x30-39             ; 0-9
	 */
	var subtypeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/
	var typeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/
	var typeRegExp = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
	
	/**
	 * Module exports.
	 */
	
	exports.format = format
	exports.parse = parse
	
	/**
	 * Format object to media type.
	 *
	 * @param {object} obj
	 * @return {string}
	 * @api public
	 */
	
	function format(obj) {
	  if (!obj || typeof obj !== 'object') {
	    throw new TypeError('argument obj is required')
	  }
	
	  var parameters = obj.parameters
	  var subtype = obj.subtype
	  var suffix = obj.suffix
	  var type = obj.type
	
	  if (!type || !typeNameRegExp.test(type)) {
	    throw new TypeError('invalid type')
	  }
	
	  if (!subtype || !subtypeNameRegExp.test(subtype)) {
	    throw new TypeError('invalid subtype')
	  }
	
	  // format as type/subtype
	  var string = type + '/' + subtype
	
	  // append +suffix
	  if (suffix) {
	    if (!typeNameRegExp.test(suffix)) {
	      throw new TypeError('invalid suffix')
	    }
	
	    string += '+' + suffix
	  }
	
	  // append parameters
	  if (parameters && typeof parameters === 'object') {
	    var param
	    var params = Object.keys(parameters).sort()
	
	    for (var i = 0; i < params.length; i++) {
	      param = params[i]
	
	      if (!tokenRegExp.test(param)) {
	        throw new TypeError('invalid parameter name')
	      }
	
	      string += '; ' + param + '=' + qstring(parameters[param])
	    }
	  }
	
	  return string
	}
	
	/**
	 * Parse media type to object.
	 *
	 * @param {string|object} string
	 * @return {Object}
	 * @api public
	 */
	
	function parse(string) {
	  if (!string) {
	    throw new TypeError('argument string is required')
	  }
	
	  // support req/res-like objects as argument
	  if (typeof string === 'object') {
	    string = getcontenttype(string)
	  }
	
	  if (typeof string !== 'string') {
	    throw new TypeError('argument string is required to be a string')
	  }
	
	  var index = string.indexOf(';')
	  var type = index !== -1
	    ? string.substr(0, index)
	    : string
	
	  var key
	  var match
	  var obj = splitType(type)
	  var params = {}
	  var value
	
	  paramRegExp.lastIndex = index
	
	  while (match = paramRegExp.exec(string)) {
	    if (match.index !== index) {
	      throw new TypeError('invalid parameter format')
	    }
	
	    index += match[0].length
	    key = match[1].toLowerCase()
	    value = match[2]
	
	    if (value[0] === '"') {
	      // remove quotes and escapes
	      value = value
	        .substr(1, value.length - 2)
	        .replace(qescRegExp, '$1')
	    }
	
	    params[key] = value
	  }
	
	  if (index !== -1 && index !== string.length) {
	    throw new TypeError('invalid parameter format')
	  }
	
	  obj.parameters = params
	
	  return obj
	}
	
	/**
	 * Get content-type from req/res objects.
	 *
	 * @param {object}
	 * @return {Object}
	 * @api private
	 */
	
	function getcontenttype(obj) {
	  if (typeof obj.getHeader === 'function') {
	    // res-like
	    return obj.getHeader('content-type')
	  }
	
	  if (typeof obj.headers === 'object') {
	    // req-like
	    return obj.headers && obj.headers['content-type']
	  }
	}
	
	/**
	 * Quote a string if necessary.
	 *
	 * @param {string} val
	 * @return {string}
	 * @api private
	 */
	
	function qstring(val) {
	  var str = String(val)
	
	  // no need to quote tokens
	  if (tokenRegExp.test(str)) {
	    return str
	  }
	
	  if (str.length > 0 && !textRegExp.test(str)) {
	    throw new TypeError('invalid parameter value')
	  }
	
	  return '"' + str.replace(quoteRegExp, '\\$1') + '"'
	}
	
	/**
	 * Simply "type/subtype+siffx" into parts.
	 *
	 * @param {string} string
	 * @return {Object}
	 * @api private
	 */
	
	function splitType(string) {
	  var match = typeRegExp.exec(string.toLowerCase())
	
	  if (!match) {
	    throw new TypeError('invalid media type')
	  }
	
	  var type = match[1]
	  var subtype = match[2]
	  var suffix
	
	  // suffix after last +
	  var index = subtype.lastIndexOf('+')
	  if (index !== -1) {
	    suffix = subtype.substr(index + 1)
	    subtype = subtype.substr(0, index)
	  }
	
	  var obj = {
	    type: type,
	    subtype: subtype,
	    suffix: suffix
	  }
	
	  return obj
	}


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var ClientRequest = __webpack_require__(135)
	var extend = __webpack_require__(139)
	var statusCodes = __webpack_require__(140)
	var url = __webpack_require__(36)
	
	var http = exports
	
	http.request = function (opts, cb) {
		if (typeof opts === 'string')
			opts = url.parse(opts)
		else
			opts = extend(opts)
	
		// Normally, the page is loaded from http or https, so not specifying a protocol
		// will result in a (valid) protocol-relative url. However, this won't work if
		// the protocol is something else, like 'file:'
		var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? 'http:' : ''
	
		var protocol = opts.protocol || defaultProtocol
		var host = opts.hostname || opts.host
		var port = opts.port
		var path = opts.path || '/'
	
		// Necessary for IPv6 addresses
		if (host && host.indexOf(':') !== -1)
			host = '[' + host + ']'
	
		// This may be a relative url. The browser should always be able to interpret it correctly.
		opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path
		opts.method = (opts.method || 'GET').toUpperCase()
		opts.headers = opts.headers || {}
	
		// Also valid opts.auth, opts.mode
	
		var req = new ClientRequest(opts)
		if (cb)
			req.on('response', cb)
		return req
	}
	
	http.get = function get (opts, cb) {
		var req = http.request(opts, cb)
		req.end()
		return req
	}
	
	http.Agent = function () {}
	http.Agent.defaultMaxSockets = 4
	
	http.STATUS_CODES = statusCodes
	
	http.METHODS = [
		'CHECKOUT',
		'CONNECT',
		'COPY',
		'DELETE',
		'GET',
		'HEAD',
		'LOCK',
		'M-SEARCH',
		'MERGE',
		'MKACTIVITY',
		'MKCOL',
		'MOVE',
		'NOTIFY',
		'OPTIONS',
		'PATCH',
		'POST',
		'PROPFIND',
		'PROPPATCH',
		'PURGE',
		'PUT',
		'REPORT',
		'SEARCH',
		'SUBSCRIBE',
		'TRACE',
		'UNLOCK',
		'UNSUBSCRIBE'
	]
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global, process) {var capability = __webpack_require__(136)
	var inherits = __webpack_require__(60)
	var response = __webpack_require__(137)
	var stream = __webpack_require__(66)
	var toArrayBuffer = __webpack_require__(138)
	
	var IncomingMessage = response.IncomingMessage
	var rStates = response.readyStates
	
	function decideMode (preferBinary, useFetch) {
		if (capability.fetch && useFetch) {
			return 'fetch'
		} else if (capability.mozchunkedarraybuffer) {
			return 'moz-chunked-arraybuffer'
		} else if (capability.msstream) {
			return 'ms-stream'
		} else if (capability.arraybuffer && preferBinary) {
			return 'arraybuffer'
		} else if (capability.vbArray && preferBinary) {
			return 'text:vbarray'
		} else {
			return 'text'
		}
	}
	
	var ClientRequest = module.exports = function (opts) {
		var self = this
		stream.Writable.call(self)
	
		self._opts = opts
		self._body = []
		self._headers = {}
		if (opts.auth)
			self.setHeader('Authorization', 'Basic ' + new Buffer(opts.auth).toString('base64'))
		Object.keys(opts.headers).forEach(function (name) {
			self.setHeader(name, opts.headers[name])
		})
	
		var preferBinary
		var useFetch = true
		if (opts.mode === 'disable-fetch' || 'timeout' in opts) {
			// If the use of XHR should be preferred and includes preserving the 'content-type' header.
			// Force XHR to be used since the Fetch API does not yet support timeouts.
			useFetch = false
			preferBinary = true
		} else if (opts.mode === 'prefer-streaming') {
			// If streaming is a high priority but binary compatibility and
			// the accuracy of the 'content-type' header aren't
			preferBinary = false
		} else if (opts.mode === 'allow-wrong-content-type') {
			// If streaming is more important than preserving the 'content-type' header
			preferBinary = !capability.overrideMimeType
		} else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
			// Use binary if text streaming may corrupt data or the content-type header, or for speed
			preferBinary = true
		} else {
			throw new Error('Invalid value for opts.mode')
		}
		self._mode = decideMode(preferBinary, useFetch)
	
		self.on('finish', function () {
			self._onFinish()
		})
	}
	
	inherits(ClientRequest, stream.Writable)
	
	ClientRequest.prototype.setHeader = function (name, value) {
		var self = this
		var lowerName = name.toLowerCase()
		// This check is not necessary, but it prevents warnings from browsers about setting unsafe
		// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
		// http-browserify did it, so I will too.
		if (unsafeHeaders.indexOf(lowerName) !== -1)
			return
	
		self._headers[lowerName] = {
			name: name,
			value: value
		}
	}
	
	ClientRequest.prototype.getHeader = function (name) {
		var self = this
		return self._headers[name.toLowerCase()].value
	}
	
	ClientRequest.prototype.removeHeader = function (name) {
		var self = this
		delete self._headers[name.toLowerCase()]
	}
	
	ClientRequest.prototype._onFinish = function () {
		var self = this
	
		if (self._destroyed)
			return
		var opts = self._opts
	
		var headersObj = self._headers
		var body = null
		if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'PATCH' || opts.method === 'MERGE') {
			if (capability.blobConstructor) {
				body = new global.Blob(self._body.map(function (buffer) {
					return toArrayBuffer(buffer)
				}), {
					type: (headersObj['content-type'] || {}).value || ''
				})
			} else {
				// get utf8 string
				body = Buffer.concat(self._body).toString()
			}
		}
	
		if (self._mode === 'fetch') {
			var headers = Object.keys(headersObj).map(function (name) {
				return [headersObj[name].name, headersObj[name].value]
			})
	
			global.fetch(self._opts.url, {
				method: self._opts.method,
				headers: headers,
				body: body || undefined,
				mode: 'cors',
				credentials: opts.withCredentials ? 'include' : 'same-origin'
			}).then(function (response) {
				self._fetchResponse = response
				self._connect()
			}, function (reason) {
				self.emit('error', reason)
			})
		} else {
			var xhr = self._xhr = new global.XMLHttpRequest()
			try {
				xhr.open(self._opts.method, self._opts.url, true)
			} catch (err) {
				process.nextTick(function () {
					self.emit('error', err)
				})
				return
			}
	
			// Can't set responseType on really old browsers
			if ('responseType' in xhr)
				xhr.responseType = self._mode.split(':')[0]
	
			if ('withCredentials' in xhr)
				xhr.withCredentials = !!opts.withCredentials
	
			if (self._mode === 'text' && 'overrideMimeType' in xhr)
				xhr.overrideMimeType('text/plain; charset=x-user-defined')
	
			if ('timeout' in opts) {
				xhr.timeout = opts.timeout
				xhr.ontimeout = function () {
					self.emit('timeout')
				}
			}
	
			Object.keys(headersObj).forEach(function (name) {
				xhr.setRequestHeader(headersObj[name].name, headersObj[name].value)
			})
	
			self._response = null
			xhr.onreadystatechange = function () {
				switch (xhr.readyState) {
					case rStates.LOADING:
					case rStates.DONE:
						self._onXHRProgress()
						break
				}
			}
			// Necessary for streaming in Firefox, since xhr.response is ONLY defined
			// in onprogress, not in onreadystatechange with xhr.readyState = 3
			if (self._mode === 'moz-chunked-arraybuffer') {
				xhr.onprogress = function () {
					self._onXHRProgress()
				}
			}
	
			xhr.onerror = function () {
				if (self._destroyed)
					return
				self.emit('error', new Error('XHR error'))
			}
	
			try {
				xhr.send(body)
			} catch (err) {
				process.nextTick(function () {
					self.emit('error', err)
				})
				return
			}
		}
	}
	
	/**
	 * Checks if xhr.status is readable and non-zero, indicating no error.
	 * Even though the spec says it should be available in readyState 3,
	 * accessing it throws an exception in IE8
	 */
	function statusValid (xhr) {
		try {
			var status = xhr.status
			return (status !== null && status !== 0)
		} catch (e) {
			return false
		}
	}
	
	ClientRequest.prototype._onXHRProgress = function () {
		var self = this
	
		if (!statusValid(self._xhr) || self._destroyed)
			return
	
		if (!self._response)
			self._connect()
	
		self._response._onXHRProgress()
	}
	
	ClientRequest.prototype._connect = function () {
		var self = this
	
		if (self._destroyed)
			return
	
		self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode)
		self._response.on('error', function(err) {
			self.emit('error', err)
		})
	
		self.emit('response', self._response)
	}
	
	ClientRequest.prototype._write = function (chunk, encoding, cb) {
		var self = this
	
		self._body.push(chunk)
		cb()
	}
	
	ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function () {
		var self = this
		self._destroyed = true
		if (self._response)
			self._response._destroyed = true
		if (self._xhr)
			self._xhr.abort()
		// Currently, there isn't a way to truly abort a fetch.
		// If you like bikeshedding, see https://github.com/whatwg/fetch/issues/27
	}
	
	ClientRequest.prototype.end = function (data, encoding, cb) {
		var self = this
		if (typeof data === 'function') {
			cb = data
			data = undefined
		}
	
		stream.Writable.prototype.end.call(self, data, encoding, cb)
	}
	
	ClientRequest.prototype.flushHeaders = function () {}
	ClientRequest.prototype.setTimeout = function () {}
	ClientRequest.prototype.setNoDelay = function () {}
	ClientRequest.prototype.setSocketKeepAlive = function () {}
	
	// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
	var unsafeHeaders = [
		'accept-charset',
		'accept-encoding',
		'access-control-request-headers',
		'access-control-request-method',
		'connection',
		'content-length',
		'cookie',
		'cookie2',
		'date',
		'dnt',
		'expect',
		'host',
		'keep-alive',
		'origin',
		'referer',
		'te',
		'trailer',
		'transfer-encoding',
		'upgrade',
		'user-agent',
		'via'
	]
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer, (function() { return this; }()), __webpack_require__(6)))

/***/ },
/* 136 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {exports.fetch = isFunction(global.fetch) && isFunction(global.ReadableStream)
	
	exports.blobConstructor = false
	try {
		new Blob([new ArrayBuffer(1)])
		exports.blobConstructor = true
	} catch (e) {}
	
	// The xhr request to example.com may violate some restrictive CSP configurations,
	// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
	// and assume support for certain features below.
	var xhr
	function getXHR () {
		// Cache the xhr value
		if (xhr !== undefined) return xhr
	
		if (global.XMLHttpRequest) {
			xhr = new global.XMLHttpRequest()
			// If XDomainRequest is available (ie only, where xhr might not work
			// cross domain), use the page location. Otherwise use example.com
			// Note: this doesn't actually make an http request.
			try {
				xhr.open('GET', global.XDomainRequest ? '/' : 'https://example.com')
			} catch(e) {
				xhr = null
			}
		} else {
			// Service workers don't have XHR
			xhr = null
		}
		return xhr
	}
	
	function checkTypeSupport (type) {
		var xhr = getXHR()
		if (!xhr) return false
		try {
			xhr.responseType = type
			return xhr.responseType === type
		} catch (e) {}
		return false
	}
	
	// For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
	// Safari 7.1 appears to have fixed this bug.
	var haveArrayBuffer = typeof global.ArrayBuffer !== 'undefined'
	var haveSlice = haveArrayBuffer && isFunction(global.ArrayBuffer.prototype.slice)
	
	// If fetch is supported, then arraybuffer will be supported too. Skip calling
	// checkTypeSupport(), since that calls getXHR().
	exports.arraybuffer = exports.fetch || (haveArrayBuffer && checkTypeSupport('arraybuffer'))
	
	// These next two tests unavoidably show warnings in Chrome. Since fetch will always
	// be used if it's available, just return false for these to avoid the warnings.
	exports.msstream = !exports.fetch && haveSlice && checkTypeSupport('ms-stream')
	exports.mozchunkedarraybuffer = !exports.fetch && haveArrayBuffer &&
		checkTypeSupport('moz-chunked-arraybuffer')
	
	// If fetch is supported, then overrideMimeType will be supported too. Skip calling
	// getXHR().
	exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false)
	
	exports.vbArray = isFunction(global.VBArray)
	
	function isFunction (value) {
		return typeof value === 'function'
	}
	
	xhr = null // Help gc
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, Buffer, global) {var capability = __webpack_require__(136)
	var inherits = __webpack_require__(60)
	var stream = __webpack_require__(66)
	
	var rStates = exports.readyStates = {
		UNSENT: 0,
		OPENED: 1,
		HEADERS_RECEIVED: 2,
		LOADING: 3,
		DONE: 4
	}
	
	var IncomingMessage = exports.IncomingMessage = function (xhr, response, mode) {
		var self = this
		stream.Readable.call(self)
	
		self._mode = mode
		self.headers = {}
		self.rawHeaders = []
		self.trailers = {}
		self.rawTrailers = []
	
		// Fake the 'close' event, but only once 'end' fires
		self.on('end', function () {
			// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
			process.nextTick(function () {
				self.emit('close')
			})
		})
	
		if (mode === 'fetch') {
			self._fetchResponse = response
	
			self.url = response.url
			self.statusCode = response.status
			self.statusMessage = response.statusText
			
			response.headers.forEach(function(header, key){
				self.headers[key.toLowerCase()] = header
				self.rawHeaders.push(key, header)
			})
	
	
			// TODO: this doesn't respect backpressure. Once WritableStream is available, this can be fixed
			var reader = response.body.getReader()
			function read () {
				reader.read().then(function (result) {
					if (self._destroyed)
						return
					if (result.done) {
						self.push(null)
						return
					}
					self.push(new Buffer(result.value))
					read()
				}).catch(function(err) {
					self.emit('error', err)
				})
			}
			read()
	
		} else {
			self._xhr = xhr
			self._pos = 0
	
			self.url = xhr.responseURL
			self.statusCode = xhr.status
			self.statusMessage = xhr.statusText
			var headers = xhr.getAllResponseHeaders().split(/\r?\n/)
			headers.forEach(function (header) {
				var matches = header.match(/^([^:]+):\s*(.*)/)
				if (matches) {
					var key = matches[1].toLowerCase()
					if (key === 'set-cookie') {
						if (self.headers[key] === undefined) {
							self.headers[key] = []
						}
						self.headers[key].push(matches[2])
					} else if (self.headers[key] !== undefined) {
						self.headers[key] += ', ' + matches[2]
					} else {
						self.headers[key] = matches[2]
					}
					self.rawHeaders.push(matches[1], matches[2])
				}
			})
	
			self._charset = 'x-user-defined'
			if (!capability.overrideMimeType) {
				var mimeType = self.rawHeaders['mime-type']
				if (mimeType) {
					var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/)
					if (charsetMatch) {
						self._charset = charsetMatch[1].toLowerCase()
					}
				}
				if (!self._charset)
					self._charset = 'utf-8' // best guess
			}
		}
	}
	
	inherits(IncomingMessage, stream.Readable)
	
	IncomingMessage.prototype._read = function () {}
	
	IncomingMessage.prototype._onXHRProgress = function () {
		var self = this
	
		var xhr = self._xhr
	
		var response = null
		switch (self._mode) {
			case 'text:vbarray': // For IE9
				if (xhr.readyState !== rStates.DONE)
					break
				try {
					// This fails in IE8
					response = new global.VBArray(xhr.responseBody).toArray()
				} catch (e) {}
				if (response !== null) {
					self.push(new Buffer(response))
					break
				}
				// Falls through in IE8	
			case 'text':
				try { // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
					response = xhr.responseText
				} catch (e) {
					self._mode = 'text:vbarray'
					break
				}
				if (response.length > self._pos) {
					var newData = response.substr(self._pos)
					if (self._charset === 'x-user-defined') {
						var buffer = new Buffer(newData.length)
						for (var i = 0; i < newData.length; i++)
							buffer[i] = newData.charCodeAt(i) & 0xff
	
						self.push(buffer)
					} else {
						self.push(newData, self._charset)
					}
					self._pos = response.length
				}
				break
			case 'arraybuffer':
				if (xhr.readyState !== rStates.DONE || !xhr.response)
					break
				response = xhr.response
				self.push(new Buffer(new Uint8Array(response)))
				break
			case 'moz-chunked-arraybuffer': // take whole
				response = xhr.response
				if (xhr.readyState !== rStates.LOADING || !response)
					break
				self.push(new Buffer(new Uint8Array(response)))
				break
			case 'ms-stream':
				response = xhr.response
				if (xhr.readyState !== rStates.LOADING)
					break
				var reader = new global.MSStreamReader()
				reader.onprogress = function () {
					if (reader.result.byteLength > self._pos) {
						self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))))
						self._pos = reader.result.byteLength
					}
				}
				reader.onload = function () {
					self.push(null)
				}
				// reader.onerror = ??? // TODO: this
				reader.readAsArrayBuffer(response)
				break
		}
	
		// The ms-stream case handles end separately in reader.onload()
		if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
			self.push(null)
		}
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), __webpack_require__(10).Buffer, (function() { return this; }())))

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var Buffer = __webpack_require__(10).Buffer
	
	module.exports = function (buf) {
		// If the buffer is backed by a Uint8Array, a faster version will work
		if (buf instanceof Uint8Array) {
			// If the buffer isn't a subarray, return the underlying ArrayBuffer
			if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
				return buf.buffer
			} else if (typeof buf.buffer.slice === 'function') {
				// Otherwise we need to get a proper copy
				return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
			}
		}
	
		if (Buffer.isBuffer(buf)) {
			// This is the slow version that will work with any Buffer
			// implementation (even in old browsers)
			var arrayCopy = new Uint8Array(buf.length)
			var len = buf.length
			for (var i = 0; i < len; i++) {
				arrayCopy[i] = buf[i]
			}
			return arrayCopy.buffer
		} else {
			throw new Error('Argument must be a Buffer')
		}
	}


/***/ },
/* 139 */
/***/ function(module, exports) {

	module.exports = extend
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	function extend() {
	    var target = {}
	
	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]
	
	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key]
	            }
	        }
	    }
	
	    return target
	}


/***/ },
/* 140 */
/***/ function(module, exports) {

	module.exports = {
	  "100": "Continue",
	  "101": "Switching Protocols",
	  "102": "Processing",
	  "200": "OK",
	  "201": "Created",
	  "202": "Accepted",
	  "203": "Non-Authoritative Information",
	  "204": "No Content",
	  "205": "Reset Content",
	  "206": "Partial Content",
	  "207": "Multi-Status",
	  "208": "Already Reported",
	  "226": "IM Used",
	  "300": "Multiple Choices",
	  "301": "Moved Permanently",
	  "302": "Found",
	  "303": "See Other",
	  "304": "Not Modified",
	  "305": "Use Proxy",
	  "307": "Temporary Redirect",
	  "308": "Permanent Redirect",
	  "400": "Bad Request",
	  "401": "Unauthorized",
	  "402": "Payment Required",
	  "403": "Forbidden",
	  "404": "Not Found",
	  "405": "Method Not Allowed",
	  "406": "Not Acceptable",
	  "407": "Proxy Authentication Required",
	  "408": "Request Timeout",
	  "409": "Conflict",
	  "410": "Gone",
	  "411": "Length Required",
	  "412": "Precondition Failed",
	  "413": "Payload Too Large",
	  "414": "URI Too Long",
	  "415": "Unsupported Media Type",
	  "416": "Range Not Satisfiable",
	  "417": "Expectation Failed",
	  "418": "I'm a teapot",
	  "421": "Misdirected Request",
	  "422": "Unprocessable Entity",
	  "423": "Locked",
	  "424": "Failed Dependency",
	  "425": "Unordered Collection",
	  "426": "Upgrade Required",
	  "428": "Precondition Required",
	  "429": "Too Many Requests",
	  "431": "Request Header Fields Too Large",
	  "451": "Unavailable For Legal Reasons",
	  "500": "Internal Server Error",
	  "501": "Not Implemented",
	  "502": "Bad Gateway",
	  "503": "Service Unavailable",
	  "504": "Gateway Timeout",
	  "505": "HTTP Version Not Supported",
	  "506": "Variant Also Negotiates",
	  "507": "Insufficient Storage",
	  "508": "Loop Detected",
	  "509": "Bandwidth Limit Exceeded",
	  "510": "Not Extended",
	  "511": "Network Authentication Required"
	}


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, setImmediate) {/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var contentDisposition = __webpack_require__(55);
	var deprecate = __webpack_require__(34)('express');
	var encodeUrl = __webpack_require__(83);
	var escapeHtml = __webpack_require__(17);
	var http = __webpack_require__(134);
	var isAbsolute = __webpack_require__(54).isAbsolute;
	var onFinished = __webpack_require__(18);
	var path = __webpack_require__(50);
	var merge = __webpack_require__(33);
	var sign = __webpack_require__(142).sign;
	var normalizeType = __webpack_require__(54).normalizeType;
	var normalizeTypes = __webpack_require__(54).normalizeTypes;
	var setCharset = __webpack_require__(54).setCharset;
	var statusCodes = http.STATUS_CODES;
	var cookie = __webpack_require__(143);
	var send = __webpack_require__(57);
	var extname = path.extname;
	var mime = send.mime;
	var resolve = path.resolve;
	var vary = __webpack_require__(144);
	
	/**
	 * Response prototype.
	 */
	
	var res = module.exports = {
	  __proto__: http.ServerResponse.prototype
	};
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var charsetRegExp = /;\s*charset\s*=/;
	
	/**
	 * Set status `code`.
	 *
	 * @param {Number} code
	 * @return {ServerResponse}
	 * @public
	 */
	
	res.status = function status(code) {
	  this.statusCode = code;
	  return this;
	};
	
	/**
	 * Set Link header field with the given `links`.
	 *
	 * Examples:
	 *
	 *    res.links({
	 *      next: 'http://api.example.com/users?page=2',
	 *      last: 'http://api.example.com/users?page=5'
	 *    });
	 *
	 * @param {Object} links
	 * @return {ServerResponse}
	 * @public
	 */
	
	res.links = function(links){
	  var link = this.get('Link') || '';
	  if (link) link += ', ';
	  return this.set('Link', link + Object.keys(links).map(function(rel){
	    return '<' + links[rel] + '>; rel="' + rel + '"';
	  }).join(', '));
	};
	
	/**
	 * Send a response.
	 *
	 * Examples:
	 *
	 *     res.send(new Buffer('wahoo'));
	 *     res.send({ some: 'json' });
	 *     res.send('<p>some html</p>');
	 *
	 * @param {string|number|boolean|object|Buffer} body
	 * @public
	 */
	
	res.send = function send(body) {
	  var chunk = body;
	  var encoding;
	  var len;
	  var req = this.req;
	  var type;
	
	  // settings
	  var app = this.app;
	
	  // allow status / body
	  if (arguments.length === 2) {
	    // res.send(body, status) backwards compat
	    if (typeof arguments[0] !== 'number' && typeof arguments[1] === 'number') {
	      deprecate('res.send(body, status): Use res.status(status).send(body) instead');
	      this.statusCode = arguments[1];
	    } else {
	      deprecate('res.send(status, body): Use res.status(status).send(body) instead');
	      this.statusCode = arguments[0];
	      chunk = arguments[1];
	    }
	  }
	
	  // disambiguate res.send(status) and res.send(status, num)
	  if (typeof chunk === 'number' && arguments.length === 1) {
	    // res.send(status) will set status message as text string
	    if (!this.get('Content-Type')) {
	      this.type('txt');
	    }
	
	    deprecate('res.send(status): Use res.sendStatus(status) instead');
	    this.statusCode = chunk;
	    chunk = statusCodes[chunk];
	  }
	
	  switch (typeof chunk) {
	    // string defaulting to html
	    case 'string':
	      if (!this.get('Content-Type')) {
	        this.type('html');
	      }
	      break;
	    case 'boolean':
	    case 'number':
	    case 'object':
	      if (chunk === null) {
	        chunk = '';
	      } else if (Buffer.isBuffer(chunk)) {
	        if (!this.get('Content-Type')) {
	          this.type('bin');
	        }
	      } else {
	        return this.json(chunk);
	      }
	      break;
	  }
	
	  // write strings in utf-8
	  if (typeof chunk === 'string') {
	    encoding = 'utf8';
	    type = this.get('Content-Type');
	
	    // reflect this in content-type
	    if (typeof type === 'string') {
	      this.set('Content-Type', setCharset(type, 'utf-8'));
	    }
	  }
	
	  // populate Content-Length
	  if (chunk !== undefined) {
	    if (!Buffer.isBuffer(chunk)) {
	      // convert chunk to Buffer; saves later double conversions
	      chunk = new Buffer(chunk, encoding);
	      encoding = undefined;
	    }
	
	    len = chunk.length;
	    this.set('Content-Length', len);
	  }
	
	  // populate ETag
	  var etag;
	  var generateETag = len !== undefined && app.get('etag fn');
	  if (typeof generateETag === 'function' && !this.get('ETag')) {
	    if ((etag = generateETag(chunk, encoding))) {
	      this.set('ETag', etag);
	    }
	  }
	
	  // freshness
	  if (req.fresh) this.statusCode = 304;
	
	  // strip irrelevant headers
	  if (204 === this.statusCode || 304 === this.statusCode) {
	    this.removeHeader('Content-Type');
	    this.removeHeader('Content-Length');
	    this.removeHeader('Transfer-Encoding');
	    chunk = '';
	  }
	
	  if (req.method === 'HEAD') {
	    // skip body for HEAD
	    this.end();
	  } else {
	    // respond
	    this.end(chunk, encoding);
	  }
	
	  return this;
	};
	
	/**
	 * Send JSON response.
	 *
	 * Examples:
	 *
	 *     res.json(null);
	 *     res.json({ user: 'tj' });
	 *
	 * @param {string|number|boolean|object} obj
	 * @public
	 */
	
	res.json = function json(obj) {
	  var val = obj;
	
	  // allow status / body
	  if (arguments.length === 2) {
	    // res.json(body, status) backwards compat
	    if (typeof arguments[1] === 'number') {
	      deprecate('res.json(obj, status): Use res.status(status).json(obj) instead');
	      this.statusCode = arguments[1];
	    } else {
	      deprecate('res.json(status, obj): Use res.status(status).json(obj) instead');
	      this.statusCode = arguments[0];
	      val = arguments[1];
	    }
	  }
	
	  // settings
	  var app = this.app;
	  var replacer = app.get('json replacer');
	  var spaces = app.get('json spaces');
	  var body = stringify(val, replacer, spaces);
	
	  // content-type
	  if (!this.get('Content-Type')) {
	    this.set('Content-Type', 'application/json');
	  }
	
	  return this.send(body);
	};
	
	/**
	 * Send JSON response with JSONP callback support.
	 *
	 * Examples:
	 *
	 *     res.jsonp(null);
	 *     res.jsonp({ user: 'tj' });
	 *
	 * @param {string|number|boolean|object} obj
	 * @public
	 */
	
	res.jsonp = function jsonp(obj) {
	  var val = obj;
	
	  // allow status / body
	  if (arguments.length === 2) {
	    // res.json(body, status) backwards compat
	    if (typeof arguments[1] === 'number') {
	      deprecate('res.jsonp(obj, status): Use res.status(status).json(obj) instead');
	      this.statusCode = arguments[1];
	    } else {
	      deprecate('res.jsonp(status, obj): Use res.status(status).jsonp(obj) instead');
	      this.statusCode = arguments[0];
	      val = arguments[1];
	    }
	  }
	
	  // settings
	  var app = this.app;
	  var replacer = app.get('json replacer');
	  var spaces = app.get('json spaces');
	  var body = stringify(val, replacer, spaces);
	  var callback = this.req.query[app.get('jsonp callback name')];
	
	  // content-type
	  if (!this.get('Content-Type')) {
	    this.set('X-Content-Type-Options', 'nosniff');
	    this.set('Content-Type', 'application/json');
	  }
	
	  // fixup callback
	  if (Array.isArray(callback)) {
	    callback = callback[0];
	  }
	
	  // jsonp
	  if (typeof callback === 'string' && callback.length !== 0) {
	    this.charset = 'utf-8';
	    this.set('X-Content-Type-Options', 'nosniff');
	    this.set('Content-Type', 'text/javascript');
	
	    // restrict callback charset
	    callback = callback.replace(/[^\[\]\w$.]/g, '');
	
	    // replace chars not allowed in JavaScript that are in JSON
	    body = body
	      .replace(/\u2028/g, '\\u2028')
	      .replace(/\u2029/g, '\\u2029');
	
	    // the /**/ is a specific security mitigation for "Rosetta Flash JSONP abuse"
	    // the typeof check is just to reduce client error noise
	    body = '/**/ typeof ' + callback + ' === \'function\' && ' + callback + '(' + body + ');';
	  }
	
	  return this.send(body);
	};
	
	/**
	 * Send given HTTP status code.
	 *
	 * Sets the response status to `statusCode` and the body of the
	 * response to the standard description from node's http.STATUS_CODES
	 * or the statusCode number if no description.
	 *
	 * Examples:
	 *
	 *     res.sendStatus(200);
	 *
	 * @param {number} statusCode
	 * @public
	 */
	
	res.sendStatus = function sendStatus(statusCode) {
	  var body = statusCodes[statusCode] || String(statusCode);
	
	  this.statusCode = statusCode;
	  this.type('txt');
	
	  return this.send(body);
	};
	
	/**
	 * Transfer the file at the given `path`.
	 *
	 * Automatically sets the _Content-Type_ response header field.
	 * The callback `callback(err)` is invoked when the transfer is complete
	 * or when an error occurs. Be sure to check `res.sentHeader`
	 * if you wish to attempt responding, as the header and some data
	 * may have already been transferred.
	 *
	 * Options:
	 *
	 *   - `maxAge`   defaulting to 0 (can be string converted by `ms`)
	 *   - `root`     root directory for relative filenames
	 *   - `headers`  object of headers to serve with file
	 *   - `dotfiles` serve dotfiles, defaulting to false; can be `"allow"` to send them
	 *
	 * Other options are passed along to `send`.
	 *
	 * Examples:
	 *
	 *  The following example illustrates how `res.sendFile()` may
	 *  be used as an alternative for the `static()` middleware for
	 *  dynamic situations. The code backing `res.sendFile()` is actually
	 *  the same code, so HTTP cache support etc is identical.
	 *
	 *     app.get('/user/:uid/photos/:file', function(req, res){
	 *       var uid = req.params.uid
	 *         , file = req.params.file;
	 *
	 *       req.user.mayViewFilesFrom(uid, function(yes){
	 *         if (yes) {
	 *           res.sendFile('/uploads/' + uid + '/' + file);
	 *         } else {
	 *           res.send(403, 'Sorry! you cant see that.');
	 *         }
	 *       });
	 *     });
	 *
	 * @public
	 */
	
	res.sendFile = function sendFile(path, options, callback) {
	  var done = callback;
	  var req = this.req;
	  var res = this;
	  var next = req.next;
	  var opts = options || {};
	
	  if (!path) {
	    throw new TypeError('path argument is required to res.sendFile');
	  }
	
	  // support function as second arg
	  if (typeof options === 'function') {
	    done = options;
	    opts = {};
	  }
	
	  if (!opts.root && !isAbsolute(path)) {
	    throw new TypeError('path must be absolute or specify root to res.sendFile');
	  }
	
	  // create file stream
	  var pathname = encodeURI(path);
	  var file = send(req, pathname, opts);
	
	  // transfer
	  sendfile(res, file, opts, function (err) {
	    if (done) return done(err);
	    if (err && err.code === 'EISDIR') return next();
	
	    // next() all but write errors
	    if (err && err.code !== 'ECONNABORTED' && err.syscall !== 'write') {
	      next(err);
	    }
	  });
	};
	
	/**
	 * Transfer the file at the given `path`.
	 *
	 * Automatically sets the _Content-Type_ response header field.
	 * The callback `callback(err)` is invoked when the transfer is complete
	 * or when an error occurs. Be sure to check `res.sentHeader`
	 * if you wish to attempt responding, as the header and some data
	 * may have already been transferred.
	 *
	 * Options:
	 *
	 *   - `maxAge`   defaulting to 0 (can be string converted by `ms`)
	 *   - `root`     root directory for relative filenames
	 *   - `headers`  object of headers to serve with file
	 *   - `dotfiles` serve dotfiles, defaulting to false; can be `"allow"` to send them
	 *
	 * Other options are passed along to `send`.
	 *
	 * Examples:
	 *
	 *  The following example illustrates how `res.sendfile()` may
	 *  be used as an alternative for the `static()` middleware for
	 *  dynamic situations. The code backing `res.sendfile()` is actually
	 *  the same code, so HTTP cache support etc is identical.
	 *
	 *     app.get('/user/:uid/photos/:file', function(req, res){
	 *       var uid = req.params.uid
	 *         , file = req.params.file;
	 *
	 *       req.user.mayViewFilesFrom(uid, function(yes){
	 *         if (yes) {
	 *           res.sendfile('/uploads/' + uid + '/' + file);
	 *         } else {
	 *           res.send(403, 'Sorry! you cant see that.');
	 *         }
	 *       });
	 *     });
	 *
	 * @public
	 */
	
	res.sendfile = function (path, options, callback) {
	  var done = callback;
	  var req = this.req;
	  var res = this;
	  var next = req.next;
	  var opts = options || {};
	
	  // support function as second arg
	  if (typeof options === 'function') {
	    done = options;
	    opts = {};
	  }
	
	  // create file stream
	  var file = send(req, path, opts);
	
	  // transfer
	  sendfile(res, file, opts, function (err) {
	    if (done) return done(err);
	    if (err && err.code === 'EISDIR') return next();
	
	    // next() all but write errors
	    if (err && err.code !== 'ECONNABORT' && err.syscall !== 'write') {
	      next(err);
	    }
	  });
	};
	
	res.sendfile = deprecate.function(res.sendfile,
	  'res.sendfile: Use res.sendFile instead');
	
	/**
	 * Transfer the file at the given `path` as an attachment.
	 *
	 * Optionally providing an alternate attachment `filename`,
	 * and optional callback `callback(err)`. The callback is invoked
	 * when the data transfer is complete, or when an error has
	 * ocurred. Be sure to check `res.headersSent` if you plan to respond.
	 *
	 * This method uses `res.sendfile()`.
	 *
	 * @public
	 */
	
	res.download = function download(path, filename, callback) {
	  var done = callback;
	  var name = filename;
	
	  // support function as second arg
	  if (typeof filename === 'function') {
	    done = filename;
	    name = null;
	  }
	
	  // set Content-Disposition when file is sent
	  var headers = {
	    'Content-Disposition': contentDisposition(name || path)
	  };
	
	  // Resolve the full path for sendFile
	  var fullPath = resolve(path);
	
	  return this.sendFile(fullPath, { headers: headers }, done);
	};
	
	/**
	 * Set _Content-Type_ response header with `type` through `mime.lookup()`
	 * when it does not contain "/", or set the Content-Type to `type` otherwise.
	 *
	 * Examples:
	 *
	 *     res.type('.html');
	 *     res.type('html');
	 *     res.type('json');
	 *     res.type('application/json');
	 *     res.type('png');
	 *
	 * @param {String} type
	 * @return {ServerResponse} for chaining
	 * @public
	 */
	
	res.contentType =
	res.type = function contentType(type) {
	  var ct = type.indexOf('/') === -1
	    ? mime.lookup(type)
	    : type;
	
	  return this.set('Content-Type', ct);
	};
	
	/**
	 * Respond to the Acceptable formats using an `obj`
	 * of mime-type callbacks.
	 *
	 * This method uses `req.accepted`, an array of
	 * acceptable types ordered by their quality values.
	 * When "Accept" is not present the _first_ callback
	 * is invoked, otherwise the first match is used. When
	 * no match is performed the server responds with
	 * 406 "Not Acceptable".
	 *
	 * Content-Type is set for you, however if you choose
	 * you may alter this within the callback using `res.type()`
	 * or `res.set('Content-Type', ...)`.
	 *
	 *    res.format({
	 *      'text/plain': function(){
	 *        res.send('hey');
	 *      },
	 *
	 *      'text/html': function(){
	 *        res.send('<p>hey</p>');
	 *      },
	 *
	 *      'appliation/json': function(){
	 *        res.send({ message: 'hey' });
	 *      }
	 *    });
	 *
	 * In addition to canonicalized MIME types you may
	 * also use extnames mapped to these types:
	 *
	 *    res.format({
	 *      text: function(){
	 *        res.send('hey');
	 *      },
	 *
	 *      html: function(){
	 *        res.send('<p>hey</p>');
	 *      },
	 *
	 *      json: function(){
	 *        res.send({ message: 'hey' });
	 *      }
	 *    });
	 *
	 * By default Express passes an `Error`
	 * with a `.status` of 406 to `next(err)`
	 * if a match is not made. If you provide
	 * a `.default` callback it will be invoked
	 * instead.
	 *
	 * @param {Object} obj
	 * @return {ServerResponse} for chaining
	 * @public
	 */
	
	res.format = function(obj){
	  var req = this.req;
	  var next = req.next;
	
	  var fn = obj.default;
	  if (fn) delete obj.default;
	  var keys = Object.keys(obj);
	
	  var key = keys.length > 0
	    ? req.accepts(keys)
	    : false;
	
	  this.vary("Accept");
	
	  if (key) {
	    this.set('Content-Type', normalizeType(key).value);
	    obj[key](req, this, next);
	  } else if (fn) {
	    fn();
	  } else {
	    var err = new Error('Not Acceptable');
	    err.status = err.statusCode = 406;
	    err.types = normalizeTypes(keys).map(function(o){ return o.value });
	    next(err);
	  }
	
	  return this;
	};
	
	/**
	 * Set _Content-Disposition_ header to _attachment_ with optional `filename`.
	 *
	 * @param {String} filename
	 * @return {ServerResponse}
	 * @public
	 */
	
	res.attachment = function attachment(filename) {
	  if (filename) {
	    this.type(extname(filename));
	  }
	
	  this.set('Content-Disposition', contentDisposition(filename));
	
	  return this;
	};
	
	/**
	 * Append additional header `field` with value `val`.
	 *
	 * Example:
	 *
	 *    res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
	 *    res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
	 *    res.append('Warning', '199 Miscellaneous warning');
	 *
	 * @param {String} field
	 * @param {String|Array} val
	 * @return {ServerResponse} for chaining
	 * @public
	 */
	
	res.append = function append(field, val) {
	  var prev = this.get(field);
	  var value = val;
	
	  if (prev) {
	    // concat the new and prev vals
	    value = Array.isArray(prev) ? prev.concat(val)
	      : Array.isArray(val) ? [prev].concat(val)
	      : [prev, val];
	  }
	
	  return this.set(field, value);
	};
	
	/**
	 * Set header `field` to `val`, or pass
	 * an object of header fields.
	 *
	 * Examples:
	 *
	 *    res.set('Foo', ['bar', 'baz']);
	 *    res.set('Accept', 'application/json');
	 *    res.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
	 *
	 * Aliased as `res.header()`.
	 *
	 * @param {String|Object} field
	 * @param {String|Array} val
	 * @return {ServerResponse} for chaining
	 * @public
	 */
	
	res.set =
	res.header = function header(field, val) {
	  if (arguments.length === 2) {
	    var value = Array.isArray(val)
	      ? val.map(String)
	      : String(val);
	
	    // add charset to content-type
	    if (field.toLowerCase() === 'content-type' && !charsetRegExp.test(value)) {
	      var charset = mime.charsets.lookup(value.split(';')[0]);
	      if (charset) value += '; charset=' + charset.toLowerCase();
	    }
	
	    this.setHeader(field, value);
	  } else {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	  }
	  return this;
	};
	
	/**
	 * Get value for header `field`.
	 *
	 * @param {String} field
	 * @return {String}
	 * @public
	 */
	
	res.get = function(field){
	  return this.getHeader(field);
	};
	
	/**
	 * Clear cookie `name`.
	 *
	 * @param {String} name
	 * @param {Object} [options]
	 * @return {ServerResponse} for chaining
	 * @public
	 */
	
	res.clearCookie = function clearCookie(name, options) {
	  var opts = merge({ expires: new Date(1), path: '/' }, options);
	
	  return this.cookie(name, '', opts);
	};
	
	/**
	 * Set cookie `name` to `value`, with the given `options`.
	 *
	 * Options:
	 *
	 *    - `maxAge`   max-age in milliseconds, converted to `expires`
	 *    - `signed`   sign the cookie
	 *    - `path`     defaults to "/"
	 *
	 * Examples:
	 *
	 *    // "Remember Me" for 15 minutes
	 *    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
	 *
	 *    // save as above
	 *    res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
	 *
	 * @param {String} name
	 * @param {String|Object} value
	 * @param {Options} options
	 * @return {ServerResponse} for chaining
	 * @public
	 */
	
	res.cookie = function (name, value, options) {
	  var opts = merge({}, options);
	  var secret = this.req.secret;
	  var signed = opts.signed;
	
	  if (signed && !secret) {
	    throw new Error('cookieParser("secret") required for signed cookies');
	  }
	
	  var val = typeof value === 'object'
	    ? 'j:' + JSON.stringify(value)
	    : String(value);
	
	  if (signed) {
	    val = 's:' + sign(val, secret);
	  }
	
	  if ('maxAge' in opts) {
	    opts.expires = new Date(Date.now() + opts.maxAge);
	    opts.maxAge /= 1000;
	  }
	
	  if (opts.path == null) {
	    opts.path = '/';
	  }
	
	  this.append('Set-Cookie', cookie.serialize(name, String(val), opts));
	
	  return this;
	};
	
	/**
	 * Set the location header to `url`.
	 *
	 * The given `url` can also be "back", which redirects
	 * to the _Referrer_ or _Referer_ headers or "/".
	 *
	 * Examples:
	 *
	 *    res.location('/foo/bar').;
	 *    res.location('http://example.com');
	 *    res.location('../login');
	 *
	 * @param {String} url
	 * @return {ServerResponse} for chaining
	 * @public
	 */
	
	res.location = function location(url) {
	  var loc = url;
	
	  // "back" is an alias for the referrer
	  if (url === 'back') {
	    loc = this.req.get('Referrer') || '/';
	  }
	
	  // set location
	  return this.set('Location', encodeUrl(loc));
	};
	
	/**
	 * Redirect to the given `url` with optional response `status`
	 * defaulting to 302.
	 *
	 * The resulting `url` is determined by `res.location()`, so
	 * it will play nicely with mounted apps, relative paths,
	 * `"back"` etc.
	 *
	 * Examples:
	 *
	 *    res.redirect('/foo/bar');
	 *    res.redirect('http://example.com');
	 *    res.redirect(301, 'http://example.com');
	 *    res.redirect('../login'); // /blog/post/1 -> /blog/login
	 *
	 * @public
	 */
	
	res.redirect = function redirect(url) {
	  var address = url;
	  var body;
	  var status = 302;
	
	  // allow status / url
	  if (arguments.length === 2) {
	    if (typeof arguments[0] === 'number') {
	      status = arguments[0];
	      address = arguments[1];
	    } else {
	      deprecate('res.redirect(url, status): Use res.redirect(status, url) instead');
	      status = arguments[1];
	    }
	  }
	
	  // Set location header
	  address = this.location(address).get('Location');
	
	  // Support text/{plain,html} by default
	  this.format({
	    text: function(){
	      body = statusCodes[status] + '. Redirecting to ' + address;
	    },
	
	    html: function(){
	      var u = escapeHtml(address);
	      body = '<p>' + statusCodes[status] + '. Redirecting to <a href="' + u + '">' + u + '</a></p>';
	    },
	
	    default: function(){
	      body = '';
	    }
	  });
	
	  // Respond
	  this.statusCode = status;
	  this.set('Content-Length', Buffer.byteLength(body));
	
	  if (this.req.method === 'HEAD') {
	    this.end();
	  } else {
	    this.end(body);
	  }
	};
	
	/**
	 * Add `field` to Vary. If already present in the Vary set, then
	 * this call is simply ignored.
	 *
	 * @param {Array|String} field
	 * @return {ServerResponse} for chaining
	 * @public
	 */
	
	res.vary = function(field){
	  // checks for back-compat
	  if (!field || (Array.isArray(field) && !field.length)) {
	    deprecate('res.vary(): Provide a field name');
	    return this;
	  }
	
	  vary(this, field);
	
	  return this;
	};
	
	/**
	 * Render `view` with the given `options` and optional callback `fn`.
	 * When a callback function is given a response will _not_ be made
	 * automatically, otherwise a response of _200_ and _text/html_ is given.
	 *
	 * Options:
	 *
	 *  - `cache`     boolean hinting to the engine it should cache
	 *  - `filename`  filename of the view being rendered
	 *
	 * @public
	 */
	
	res.render = function render(view, options, callback) {
	  var app = this.req.app;
	  var done = callback;
	  var opts = options || {};
	  var req = this.req;
	  var self = this;
	
	  // support callback function as second arg
	  if (typeof options === 'function') {
	    done = options;
	    opts = {};
	  }
	
	  // merge res.locals
	  opts._locals = self.locals;
	
	  // default callback to respond
	  done = done || function (err, str) {
	    if (err) return req.next(err);
	    self.send(str);
	  };
	
	  // render
	  app.render(view, opts, done);
	};
	
	// pipe the send file stream
	function sendfile(res, file, options, callback) {
	  var done = false;
	  var streaming;
	
	  // request aborted
	  function onaborted() {
	    if (done) return;
	    done = true;
	
	    var err = new Error('Request aborted');
	    err.code = 'ECONNABORTED';
	    callback(err);
	  }
	
	  // directory
	  function ondirectory() {
	    if (done) return;
	    done = true;
	
	    var err = new Error('EISDIR, read');
	    err.code = 'EISDIR';
	    callback(err);
	  }
	
	  // errors
	  function onerror(err) {
	    if (done) return;
	    done = true;
	    callback(err);
	  }
	
	  // ended
	  function onend() {
	    if (done) return;
	    done = true;
	    callback();
	  }
	
	  // file
	  function onfile() {
	    streaming = false;
	  }
	
	  // finished
	  function onfinish(err) {
	    if (err && err.code === 'ECONNRESET') return onaborted();
	    if (err) return onerror(err);
	    if (done) return;
	
	    setImmediate(function () {
	      if (streaming !== false && !done) {
	        onaborted();
	        return;
	      }
	
	      if (done) return;
	      done = true;
	      callback();
	    });
	  }
	
	  // streaming
	  function onstream() {
	    streaming = true;
	  }
	
	  file.on('directory', ondirectory);
	  file.on('end', onend);
	  file.on('error', onerror);
	  file.on('file', onfile);
	  file.on('stream', onstream);
	  onFinished(res, onfinish);
	
	  if (options.headers) {
	    // set headers on successful transfer
	    file.on('headers', function headers(res) {
	      var obj = options.headers;
	      var keys = Object.keys(obj);
	
	      for (var i = 0; i < keys.length; i++) {
	        var k = keys[i];
	        res.setHeader(k, obj[k]);
	      }
	    });
	  }
	
	  // pipe
	  file.pipe(res);
	}
	
	/**
	 * Stringify JSON, like JSON.stringify, but v8 optimized.
	 * @private
	 */
	
	function stringify(value, replacer, spaces) {
	  // v8 checks arguments.length for optimizing simple call
	  // https://bugs.chromium.org/p/v8/issues/detail?id=4730
	  return replacer || spaces
	    ? JSON.stringify(value, replacer, spaces)
	    : JSON.stringify(value);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer, __webpack_require__(8).setImmediate))

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var crypto = __webpack_require__(85);
	
	/**
	 * Sign the given `val` with `secret`.
	 *
	 * @param {String} val
	 * @param {String} secret
	 * @return {String}
	 * @api private
	 */
	
	exports.sign = function(val, secret){
	  if ('string' != typeof val) throw new TypeError("Cookie value must be provided as a string.");
	  if ('string' != typeof secret) throw new TypeError("Secret string must be provided.");
	  return val + '.' + crypto
	    .createHmac('sha256', secret)
	    .update(val)
	    .digest('base64')
	    .replace(/\=+$/, '');
	};
	
	/**
	 * Unsign and decode the given `val` with `secret`,
	 * returning `false` if the signature is invalid.
	 *
	 * @param {String} val
	 * @param {String} secret
	 * @return {String|Boolean}
	 * @api private
	 */
	
	exports.unsign = function(val, secret){
	  if ('string' != typeof val) throw new TypeError("Signed cookie string must be provided.");
	  if ('string' != typeof secret) throw new TypeError("Secret string must be provided.");
	  var str = val.slice(0, val.lastIndexOf('.'))
	    , mac = exports.sign(str, secret);
	  
	  return sha1(mac) == sha1(val) ? str : false;
	};
	
	/**
	 * Private
	 */
	
	function sha1(str){
	  return crypto.createHash('sha1').update(str).digest('hex');
	}


/***/ },
/* 143 */
/***/ function(module, exports) {

	/*!
	 * cookie
	 * Copyright(c) 2012-2014 Roman Shtylman
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module exports.
	 * @public
	 */
	
	exports.parse = parse;
	exports.serialize = serialize;
	
	/**
	 * Module variables.
	 * @private
	 */
	
	var decode = decodeURIComponent;
	var encode = encodeURIComponent;
	var pairSplitRegExp = /; */;
	
	/**
	 * RegExp to match field-content in RFC 7230 sec 3.2
	 *
	 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
	 * field-vchar   = VCHAR / obs-text
	 * obs-text      = %x80-FF
	 */
	
	var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
	
	/**
	 * Parse a cookie header.
	 *
	 * Parse the given cookie header string into an object
	 * The object has the various cookies as keys(names) => values
	 *
	 * @param {string} str
	 * @param {object} [options]
	 * @return {object}
	 * @public
	 */
	
	function parse(str, options) {
	  if (typeof str !== 'string') {
	    throw new TypeError('argument str must be a string');
	  }
	
	  var obj = {}
	  var opt = options || {};
	  var pairs = str.split(pairSplitRegExp);
	  var dec = opt.decode || decode;
	
	  for (var i = 0; i < pairs.length; i++) {
	    var pair = pairs[i];
	    var eq_idx = pair.indexOf('=');
	
	    // skip things that don't look like key=value
	    if (eq_idx < 0) {
	      continue;
	    }
	
	    var key = pair.substr(0, eq_idx).trim()
	    var val = pair.substr(++eq_idx, pair.length).trim();
	
	    // quoted values
	    if ('"' == val[0]) {
	      val = val.slice(1, -1);
	    }
	
	    // only assign once
	    if (undefined == obj[key]) {
	      obj[key] = tryDecode(val, dec);
	    }
	  }
	
	  return obj;
	}
	
	/**
	 * Serialize data into a cookie header.
	 *
	 * Serialize the a name value pair into a cookie string suitable for
	 * http headers. An optional options object specified cookie parameters.
	 *
	 * serialize('foo', 'bar', { httpOnly: true })
	 *   => "foo=bar; httpOnly"
	 *
	 * @param {string} name
	 * @param {string} val
	 * @param {object} [options]
	 * @return {string}
	 * @public
	 */
	
	function serialize(name, val, options) {
	  var opt = options || {};
	  var enc = opt.encode || encode;
	
	  if (typeof enc !== 'function') {
	    throw new TypeError('option encode is invalid');
	  }
	
	  if (!fieldContentRegExp.test(name)) {
	    throw new TypeError('argument name is invalid');
	  }
	
	  var value = enc(val);
	
	  if (value && !fieldContentRegExp.test(value)) {
	    throw new TypeError('argument val is invalid');
	  }
	
	  var str = name + '=' + value;
	
	  if (null != opt.maxAge) {
	    var maxAge = opt.maxAge - 0;
	    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
	    str += '; Max-Age=' + Math.floor(maxAge);
	  }
	
	  if (opt.domain) {
	    if (!fieldContentRegExp.test(opt.domain)) {
	      throw new TypeError('option domain is invalid');
	    }
	
	    str += '; Domain=' + opt.domain;
	  }
	
	  if (opt.path) {
	    if (!fieldContentRegExp.test(opt.path)) {
	      throw new TypeError('option path is invalid');
	    }
	
	    str += '; Path=' + opt.path;
	  }
	
	  if (opt.expires) {
	    if (typeof opt.expires.toUTCString !== 'function') {
	      throw new TypeError('option expires is invalid');
	    }
	
	    str += '; Expires=' + opt.expires.toUTCString();
	  }
	
	  if (opt.httpOnly) {
	    str += '; HttpOnly';
	  }
	
	  if (opt.secure) {
	    str += '; Secure';
	  }
	
	  if (opt.sameSite) {
	    var sameSite = typeof opt.sameSite === 'string'
	      ? opt.sameSite.toLowerCase() : opt.sameSite;
	
	    switch (sameSite) {
	      case true:
	        str += '; SameSite=Strict';
	        break;
	      case 'lax':
	        str += '; SameSite=Lax';
	        break;
	      case 'strict':
	        str += '; SameSite=Strict';
	        break;
	      default:
	        throw new TypeError('option sameSite is invalid');
	    }
	  }
	
	  return str;
	}
	
	/**
	 * Try decoding a string using a decoding function.
	 *
	 * @param {string} str
	 * @param {function} decode
	 * @private
	 */
	
	function tryDecode(str, decode) {
	  try {
	    return decode(str);
	  } catch (e) {
	    return str;
	  }
	}


/***/ },
/* 144 */
/***/ function(module, exports) {

	/*!
	 * vary
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict';
	
	/**
	 * Module exports.
	 */
	
	module.exports = vary;
	module.exports.append = append;
	
	/**
	 * RegExp to match field-name in RFC 7230 sec 3.2
	 *
	 * field-name    = token
	 * token         = 1*tchar
	 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
	 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
	 *               / DIGIT / ALPHA
	 *               ; any VCHAR, except delimiters
	 */
	
	var fieldNameRegExp = /^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/
	
	/**
	 * Append a field to a vary header.
	 *
	 * @param {String} header
	 * @param {String|Array} field
	 * @return {String}
	 * @api public
	 */
	
	function append(header, field) {
	  if (typeof header !== 'string') {
	    throw new TypeError('header argument is required');
	  }
	
	  if (!field) {
	    throw new TypeError('field argument is required');
	  }
	
	  // get fields array
	  var fields = !Array.isArray(field)
	    ? parse(String(field))
	    : field;
	
	  // assert on invalid field names
	  for (var i = 0; i < fields.length; i++) {
	    if (!fieldNameRegExp.test(fields[i])) {
	      throw new TypeError('field argument contains an invalid header name');
	    }
	  }
	
	  // existing, unspecified vary
	  if (header === '*') {
	    return header;
	  }
	
	  // enumerate current values
	  var val = header;
	  var vals = parse(header.toLowerCase());
	
	  // unspecified vary
	  if (fields.indexOf('*') !== -1 || vals.indexOf('*') !== -1) {
	    return '*';
	  }
	
	  for (var i = 0; i < fields.length; i++) {
	    var fld = fields[i].toLowerCase();
	
	    // append value (case-preserving)
	    if (vals.indexOf(fld) === -1) {
	      vals.push(fld);
	      val = val
	        ? val + ', ' + fields[i]
	        : fields[i];
	    }
	  }
	
	  return val;
	}
	
	/**
	 * Parse a vary header into an array.
	 *
	 * @param {String} header
	 * @return {Array}
	 * @api private
	 */
	
	function parse(header) {
	  return header.trim().split(/ *, */);
	}
	
	/**
	 * Mark that a request is varied on a header field.
	 *
	 * @param {Object} res
	 * @param {String|Array} field
	 * @api public
	 */
	
	function vary(res, field) {
	  if (!res || !res.getHeader || !res.setHeader) {
	    // quack quack
	    throw new TypeError('res argument is required');
	  }
	
	  // get existing header
	  var val = res.getHeader('Vary') || ''
	  var header = Array.isArray(val)
	    ? val.join(', ')
	    : String(val);
	
	  // set new header
	  if ((val = append(header, field))) {
	    res.setHeader('Vary', val);
	  }
	}


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * serve-static
	 * Copyright(c) 2010 Sencha Inc.
	 * Copyright(c) 2011 TJ Holowaychuk
	 * Copyright(c) 2014-2016 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var encodeUrl = __webpack_require__(83)
	var escapeHtml = __webpack_require__(17)
	var parseUrl = __webpack_require__(35)
	var resolve = __webpack_require__(50).resolve
	var send = __webpack_require__(146)
	var url = __webpack_require__(36)
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = serveStatic
	module.exports.mime = send.mime
	
	/**
	 * @param {string} root
	 * @param {object} [options]
	 * @return {function}
	 * @public
	 */
	
	function serveStatic (root, options) {
	  if (!root) {
	    throw new TypeError('root path required')
	  }
	
	  if (typeof root !== 'string') {
	    throw new TypeError('root path must be a string')
	  }
	
	  // copy options object
	  var opts = Object.create(options || null)
	
	  // fall-though
	  var fallthrough = opts.fallthrough !== false
	
	  // default redirect
	  var redirect = opts.redirect !== false
	
	  // headers listener
	  var setHeaders = opts.setHeaders
	
	  if (setHeaders && typeof setHeaders !== 'function') {
	    throw new TypeError('option setHeaders must be function')
	  }
	
	  // setup options for send
	  opts.maxage = opts.maxage || opts.maxAge || 0
	  opts.root = resolve(root)
	
	  // construct directory listener
	  var onDirectory = redirect
	    ? createRedirectDirectoryListener()
	    : createNotFoundDirectoryListener()
	
	  return function serveStatic (req, res, next) {
	    if (req.method !== 'GET' && req.method !== 'HEAD') {
	      if (fallthrough) {
	        return next()
	      }
	
	      // method not allowed
	      res.statusCode = 405
	      res.setHeader('Allow', 'GET, HEAD')
	      res.setHeader('Content-Length', '0')
	      res.end()
	      return
	    }
	
	    var forwardError = !fallthrough
	    var originalUrl = parseUrl.original(req)
	    var path = parseUrl(req).pathname
	
	    // make sure redirect occurs at mount
	    if (path === '/' && originalUrl.pathname.substr(-1) !== '/') {
	      path = ''
	    }
	
	    // create send stream
	    var stream = send(req, path, opts)
	
	    // add directory handler
	    stream.on('directory', onDirectory)
	
	    // add headers listener
	    if (setHeaders) {
	      stream.on('headers', setHeaders)
	    }
	
	    // add file listener for fallthrough
	    if (fallthrough) {
	      stream.on('file', function onFile () {
	        // once file is determined, always forward error
	        forwardError = true
	      })
	    }
	
	    // forward errors
	    stream.on('error', function error (err) {
	      if (forwardError || !(err.statusCode < 500)) {
	        next(err)
	        return
	      }
	
	      next()
	    })
	
	    // pipe
	    stream.pipe(res)
	  }
	}
	
	/**
	 * Collapse all leading slashes into a single slash
	 * @private
	 */
	function collapseLeadingSlashes (str) {
	  for (var i = 0; i < str.length; i++) {
	    if (str[i] !== '/') {
	      break
	    }
	  }
	
	  return i > 1
	    ? '/' + str.substr(i)
	    : str
	}
	
	/**
	 * Create a directory listener that just 404s.
	 * @private
	 */
	
	function createNotFoundDirectoryListener () {
	  return function notFound () {
	    this.error(404)
	  }
	}
	
	/**
	 * Create a directory listener that performs a redirect.
	 * @private
	 */
	
	function createRedirectDirectoryListener () {
	  return function redirect () {
	    if (this.hasTrailingSlash()) {
	      this.error(404)
	      return
	    }
	
	    // get original URL
	    var originalUrl = parseUrl.original(this.req)
	
	    // append trailing slash
	    originalUrl.path = null
	    originalUrl.pathname = collapseLeadingSlashes(originalUrl.pathname + '/')
	
	    // reformat the URL
	    var loc = encodeUrl(url.format(originalUrl))
	    var msg = 'Redirecting to <a href="' + escapeHtml(loc) + '">' + escapeHtml(loc) + '</a>\n'
	    var res = this.res
	
	    // send redirect response
	    res.statusCode = 301
	    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
	    res.setHeader('Content-Length', Buffer.byteLength(msg))
	    res.setHeader('X-Content-Type-Options', 'nosniff')
	    res.setHeader('Location', loc)
	    res.end(msg)
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * send
	 * Copyright(c) 2012 TJ Holowaychuk
	 * Copyright(c) 2014-2016 Douglas Christopher Wilson
	 * MIT Licensed
	 */
	
	'use strict'
	
	/**
	 * Module dependencies.
	 * @private
	 */
	
	var createError = __webpack_require__(58)
	var debug = __webpack_require__(147)('send')
	var deprecate = __webpack_require__(34)('send')
	var destroy = __webpack_require__(64)
	var encodeUrl = __webpack_require__(83)
	var escapeHtml = __webpack_require__(17)
	var etag = __webpack_require__(84)
	var EventEmitter = __webpack_require__(3).EventEmitter
	var fresh = __webpack_require__(114)
	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	var mime = __webpack_require__(115)
	var ms = __webpack_require__(150)
	var onFinished = __webpack_require__(18)
	var parseRange = __webpack_require__(117)
	var path = __webpack_require__(50)
	var statuses = __webpack_require__(20)
	var Stream = __webpack_require__(65)
	var util = __webpack_require__(51)
	
	/**
	 * Path function references.
	 * @private
	 */
	
	var extname = path.extname
	var join = path.join
	var normalize = path.normalize
	var resolve = path.resolve
	var sep = path.sep
	
	/**
	 * Regular expression for identifying a bytes Range header.
	 * @private
	 */
	
	var BYTES_RANGE_REGEXP = /^ *bytes=/
	
	/**
	 * Maximum value allowed for the max age.
	 * @private
	 */
	
	var MAX_MAXAGE = 60 * 60 * 24 * 365 * 1000 // 1 year
	
	/**
	 * Regular expression to match a path with a directory up component.
	 * @private
	 */
	
	var UP_PATH_REGEXP = /(?:^|[\\\/])\.\.(?:[\\\/]|$)/
	
	/**
	 * Module exports.
	 * @public
	 */
	
	module.exports = send
	module.exports.mime = mime
	
	/**
	 * Shim EventEmitter.listenerCount for node.js < 0.10
	 */
	
	/* istanbul ignore next */
	var listenerCount = EventEmitter.listenerCount ||
	  function (emitter, type) { return emitter.listeners(type).length }
	
	/**
	 * Return a `SendStream` for `req` and `path`.
	 *
	 * @param {object} req
	 * @param {string} path
	 * @param {object} [options]
	 * @return {SendStream}
	 * @public
	 */
	
	function send (req, path, options) {
	  return new SendStream(req, path, options)
	}
	
	/**
	 * Initialize a `SendStream` with the given `path`.
	 *
	 * @param {Request} req
	 * @param {String} path
	 * @param {object} [options]
	 * @private
	 */
	
	function SendStream (req, path, options) {
	  Stream.call(this)
	
	  var opts = options || {}
	
	  this.options = opts
	  this.path = path
	  this.req = req
	
	  this._acceptRanges = opts.acceptRanges !== undefined
	    ? Boolean(opts.acceptRanges)
	    : true
	
	  this._cacheControl = opts.cacheControl !== undefined
	    ? Boolean(opts.cacheControl)
	    : true
	
	  this._etag = opts.etag !== undefined
	    ? Boolean(opts.etag)
	    : true
	
	  this._dotfiles = opts.dotfiles !== undefined
	    ? opts.dotfiles
	    : 'ignore'
	
	  if (this._dotfiles !== 'ignore' && this._dotfiles !== 'allow' && this._dotfiles !== 'deny') {
	    throw new TypeError('dotfiles option must be "allow", "deny", or "ignore"')
	  }
	
	  this._hidden = Boolean(opts.hidden)
	
	  if (opts.hidden !== undefined) {
	    deprecate('hidden: use dotfiles: \'' + (this._hidden ? 'allow' : 'ignore') + '\' instead')
	  }
	
	  // legacy support
	  if (opts.dotfiles === undefined) {
	    this._dotfiles = undefined
	  }
	
	  this._extensions = opts.extensions !== undefined
	    ? normalizeList(opts.extensions, 'extensions option')
	    : []
	
	  this._index = opts.index !== undefined
	    ? normalizeList(opts.index, 'index option')
	    : ['index.html']
	
	  this._lastModified = opts.lastModified !== undefined
	    ? Boolean(opts.lastModified)
	    : true
	
	  this._maxage = opts.maxAge || opts.maxage
	  this._maxage = typeof this._maxage === 'string'
	    ? ms(this._maxage)
	    : Number(this._maxage)
	  this._maxage = !isNaN(this._maxage)
	    ? Math.min(Math.max(0, this._maxage), MAX_MAXAGE)
	    : 0
	
	  this._root = opts.root
	    ? resolve(opts.root)
	    : null
	
	  if (!this._root && opts.from) {
	    this.from(opts.from)
	  }
	}
	
	/**
	 * Inherits from `Stream`.
	 */
	
	util.inherits(SendStream, Stream)
	
	/**
	 * Enable or disable etag generation.
	 *
	 * @param {Boolean} val
	 * @return {SendStream}
	 * @api public
	 */
	
	SendStream.prototype.etag = deprecate.function(function etag (val) {
	  this._etag = Boolean(val)
	  debug('etag %s', this._etag)
	  return this
	}, 'send.etag: pass etag as option')
	
	/**
	 * Enable or disable "hidden" (dot) files.
	 *
	 * @param {Boolean} path
	 * @return {SendStream}
	 * @api public
	 */
	
	SendStream.prototype.hidden = deprecate.function(function hidden (val) {
	  this._hidden = Boolean(val)
	  this._dotfiles = undefined
	  debug('hidden %s', this._hidden)
	  return this
	}, 'send.hidden: use dotfiles option')
	
	/**
	 * Set index `paths`, set to a falsy
	 * value to disable index support.
	 *
	 * @param {String|Boolean|Array} paths
	 * @return {SendStream}
	 * @api public
	 */
	
	SendStream.prototype.index = deprecate.function(function index (paths) {
	  var index = !paths ? [] : normalizeList(paths, 'paths argument')
	  debug('index %o', paths)
	  this._index = index
	  return this
	}, 'send.index: pass index as option')
	
	/**
	 * Set root `path`.
	 *
	 * @param {String} path
	 * @return {SendStream}
	 * @api public
	 */
	
	SendStream.prototype.root = function root (path) {
	  this._root = resolve(String(path))
	  debug('root %s', this._root)
	  return this
	}
	
	SendStream.prototype.from = deprecate.function(SendStream.prototype.root,
	  'send.from: pass root as option')
	
	SendStream.prototype.root = deprecate.function(SendStream.prototype.root,
	  'send.root: pass root as option')
	
	/**
	 * Set max-age to `maxAge`.
	 *
	 * @param {Number} maxAge
	 * @return {SendStream}
	 * @api public
	 */
	
	SendStream.prototype.maxage = deprecate.function(function maxage (maxAge) {
	  this._maxage = typeof maxAge === 'string'
	    ? ms(maxAge)
	    : Number(maxAge)
	  this._maxage = !isNaN(this._maxage)
	    ? Math.min(Math.max(0, this._maxage), MAX_MAXAGE)
	    : 0
	  debug('max-age %d', this._maxage)
	  return this
	}, 'send.maxage: pass maxAge as option')
	
	/**
	 * Emit error with `status`.
	 *
	 * @param {number} status
	 * @param {Error} [error]
	 * @private
	 */
	
	SendStream.prototype.error = function error (status, error) {
	  // emit if listeners instead of responding
	  if (listenerCount(this, 'error') !== 0) {
	    return this.emit('error', createError(error, status, {
	      expose: false
	    }))
	  }
	
	  var res = this.res
	  var msg = statuses[status]
	
	  // clear existing headers
	  clearHeaders(res)
	
	  // add error headers
	  if (error && error.headers) {
	    setHeaders(res, error.headers)
	  }
	
	  // send basic response
	  res.statusCode = status
	  res.setHeader('Content-Type', 'text/plain; charset=UTF-8')
	  res.setHeader('Content-Length', Buffer.byteLength(msg))
	  res.setHeader('X-Content-Type-Options', 'nosniff')
	  res.end(msg)
	}
	
	/**
	 * Check if the pathname ends with "/".
	 *
	 * @return {Boolean}
	 * @api private
	 */
	
	SendStream.prototype.hasTrailingSlash = function hasTrailingSlash () {
	  return this.path[this.path.length - 1] === '/'
	}
	
	/**
	 * Check if this is a conditional GET request.
	 *
	 * @return {Boolean}
	 * @api private
	 */
	
	SendStream.prototype.isConditionalGET = function isConditionalGET () {
	  return this.req.headers['if-none-match'] ||
	    this.req.headers['if-modified-since']
	}
	
	/**
	 * Strip content-* header fields.
	 *
	 * @private
	 */
	
	SendStream.prototype.removeContentHeaderFields = function removeContentHeaderFields () {
	  var res = this.res
	  var headers = Object.keys(res._headers || {})
	
	  for (var i = 0; i < headers.length; i++) {
	    var header = headers[i]
	    if (header.substr(0, 8) === 'content-' && header !== 'content-location') {
	      res.removeHeader(header)
	    }
	  }
	}
	
	/**
	 * Respond with 304 not modified.
	 *
	 * @api private
	 */
	
	SendStream.prototype.notModified = function notModified () {
	  var res = this.res
	  debug('not modified')
	  this.removeContentHeaderFields()
	  res.statusCode = 304
	  res.end()
	}
	
	/**
	 * Raise error that headers already sent.
	 *
	 * @api private
	 */
	
	SendStream.prototype.headersAlreadySent = function headersAlreadySent () {
	  var err = new Error('Can\'t set headers after they are sent.')
	  debug('headers already sent')
	  this.error(500, err)
	}
	
	/**
	 * Check if the request is cacheable, aka
	 * responded with 2xx or 304 (see RFC 2616 section 14.2{5,6}).
	 *
	 * @return {Boolean}
	 * @api private
	 */
	
	SendStream.prototype.isCachable = function isCachable () {
	  var statusCode = this.res.statusCode
	  return (statusCode >= 200 && statusCode < 300) ||
	    statusCode === 304
	}
	
	/**
	 * Handle stat() error.
	 *
	 * @param {Error} error
	 * @private
	 */
	
	SendStream.prototype.onStatError = function onStatError (error) {
	  switch (error.code) {
	    case 'ENAMETOOLONG':
	    case 'ENOENT':
	    case 'ENOTDIR':
	      this.error(404, error)
	      break
	    default:
	      this.error(500, error)
	      break
	  }
	}
	
	/**
	 * Check if the cache is fresh.
	 *
	 * @return {Boolean}
	 * @api private
	 */
	
	SendStream.prototype.isFresh = function isFresh () {
	  return fresh(this.req.headers, this.res._headers)
	}
	
	/**
	 * Check if the range is fresh.
	 *
	 * @return {Boolean}
	 * @api private
	 */
	
	SendStream.prototype.isRangeFresh = function isRangeFresh () {
	  var ifRange = this.req.headers['if-range']
	
	  if (!ifRange) {
	    return true
	  }
	
	  return ~ifRange.indexOf('"')
	    ? ~ifRange.indexOf(this.res._headers['etag'])
	    : Date.parse(this.res._headers['last-modified']) <= Date.parse(ifRange)
	}
	
	/**
	 * Redirect to path.
	 *
	 * @param {string} path
	 * @private
	 */
	
	SendStream.prototype.redirect = function redirect (path) {
	  if (listenerCount(this, 'directory') !== 0) {
	    this.emit('directory')
	    return
	  }
	
	  if (this.hasTrailingSlash()) {
	    this.error(403)
	    return
	  }
	
	  var loc = encodeUrl(collapseLeadingSlashes(path + '/'))
	  var msg = 'Redirecting to <a href="' + escapeHtml(loc) + '">' + escapeHtml(loc) + '</a>\n'
	  var res = this.res
	
	  // redirect
	  res.statusCode = 301
	  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
	  res.setHeader('Content-Length', Buffer.byteLength(msg))
	  res.setHeader('X-Content-Type-Options', 'nosniff')
	  res.setHeader('Location', loc)
	  res.end(msg)
	}
	
	/**
	 * Pipe to `res.
	 *
	 * @param {Stream} res
	 * @return {Stream} res
	 * @api public
	 */
	
	SendStream.prototype.pipe = function pipe (res) {
	  // root path
	  var root = this._root
	
	  // references
	  this.res = res
	
	  // decode the path
	  var path = decode(this.path)
	  if (path === -1) {
	    this.error(400)
	    return res
	  }
	
	  // null byte(s)
	  if (~path.indexOf('\0')) {
	    this.error(400)
	    return res
	  }
	
	  var parts
	  if (root !== null) {
	    // malicious path
	    if (UP_PATH_REGEXP.test(normalize('.' + sep + path))) {
	      debug('malicious path "%s"', path)
	      this.error(403)
	      return res
	    }
	
	    // join / normalize from optional root dir
	    path = normalize(join(root, path))
	    root = normalize(root + sep)
	
	    // explode path parts
	    parts = path.substr(root.length).split(sep)
	  } else {
	    // ".." is malicious without "root"
	    if (UP_PATH_REGEXP.test(path)) {
	      debug('malicious path "%s"', path)
	      this.error(403)
	      return res
	    }
	
	    // explode path parts
	    parts = normalize(path).split(sep)
	
	    // resolve the path
	    path = resolve(path)
	  }
	
	  // dotfile handling
	  if (containsDotFile(parts)) {
	    var access = this._dotfiles
	
	    // legacy support
	    if (access === undefined) {
	      access = parts[parts.length - 1][0] === '.'
	        ? (this._hidden ? 'allow' : 'ignore')
	        : 'allow'
	    }
	
	    debug('%s dotfile "%s"', access, path)
	    switch (access) {
	      case 'allow':
	        break
	      case 'deny':
	        this.error(403)
	        return res
	      case 'ignore':
	      default:
	        this.error(404)
	        return res
	    }
	  }
	
	  // index file support
	  if (this._index.length && this.path[this.path.length - 1] === '/') {
	    this.sendIndex(path)
	    return res
	  }
	
	  this.sendFile(path)
	  return res
	}
	
	/**
	 * Transfer `path`.
	 *
	 * @param {String} path
	 * @api public
	 */
	
	SendStream.prototype.send = function send (path, stat) {
	  var len = stat.size
	  var options = this.options
	  var opts = {}
	  var res = this.res
	  var req = this.req
	  var ranges = req.headers.range
	  var offset = options.start || 0
	
	  if (res._header) {
	    // impossible to send now
	    this.headersAlreadySent()
	    return
	  }
	
	  debug('pipe "%s"', path)
	
	  // set header fields
	  this.setHeader(path, stat)
	
	  // set content-type
	  this.type(path)
	
	  // conditional GET support
	  if (this.isConditionalGET() && this.isCachable() && this.isFresh()) {
	    this.notModified()
	    return
	  }
	
	  // adjust len to start/end options
	  len = Math.max(0, len - offset)
	  if (options.end !== undefined) {
	    var bytes = options.end - offset + 1
	    if (len > bytes) len = bytes
	  }
	
	  // Range support
	  if (this._acceptRanges && BYTES_RANGE_REGEXP.test(ranges)) {
	    // parse
	    ranges = parseRange(len, ranges, {
	      combine: true
	    })
	
	    // If-Range support
	    if (!this.isRangeFresh()) {
	      debug('range stale')
	      ranges = -2
	    }
	
	    // unsatisfiable
	    if (ranges === -1) {
	      debug('range unsatisfiable')
	
	      // Content-Range
	      res.setHeader('Content-Range', contentRange('bytes', len))
	
	      // 416 Requested Range Not Satisfiable
	      return this.error(416, {
	        headers: {'Content-Range': res.getHeader('Content-Range')}
	      })
	    }
	
	    // valid (syntactically invalid/multiple ranges are treated as a regular response)
	    if (ranges !== -2 && ranges.length === 1) {
	      debug('range %j', ranges)
	
	      // Content-Range
	      res.statusCode = 206
	      res.setHeader('Content-Range', contentRange('bytes', len, ranges[0]))
	
	      // adjust for requested range
	      offset += ranges[0].start
	      len = ranges[0].end - ranges[0].start + 1
	    }
	  }
	
	  // clone options
	  for (var prop in options) {
	    opts[prop] = options[prop]
	  }
	
	  // set read options
	  opts.start = offset
	  opts.end = Math.max(offset, offset + len - 1)
	
	  // content-length
	  res.setHeader('Content-Length', len)
	
	  // HEAD support
	  if (req.method === 'HEAD') {
	    res.end()
	    return
	  }
	
	  this.stream(path, opts)
	}
	
	/**
	 * Transfer file for `path`.
	 *
	 * @param {String} path
	 * @api private
	 */
	SendStream.prototype.sendFile = function sendFile (path) {
	  var i = 0
	  var self = this
	
	  debug('stat "%s"', path)
	  fs.stat(path, function onstat (err, stat) {
	    if (err && err.code === 'ENOENT' && !extname(path) && path[path.length - 1] !== sep) {
	      // not found, check extensions
	      return next(err)
	    }
	    if (err) return self.onStatError(err)
	    if (stat.isDirectory()) return self.redirect(self.path)
	    self.emit('file', path, stat)
	    self.send(path, stat)
	  })
	
	  function next (err) {
	    if (self._extensions.length <= i) {
	      return err
	        ? self.onStatError(err)
	        : self.error(404)
	    }
	
	    var p = path + '.' + self._extensions[i++]
	
	    debug('stat "%s"', p)
	    fs.stat(p, function (err, stat) {
	      if (err) return next(err)
	      if (stat.isDirectory()) return next()
	      self.emit('file', p, stat)
	      self.send(p, stat)
	    })
	  }
	}
	
	/**
	 * Transfer index for `path`.
	 *
	 * @param {String} path
	 * @api private
	 */
	SendStream.prototype.sendIndex = function sendIndex (path) {
	  var i = -1
	  var self = this
	
	  function next (err) {
	    if (++i >= self._index.length) {
	      if (err) return self.onStatError(err)
	      return self.error(404)
	    }
	
	    var p = join(path, self._index[i])
	
	    debug('stat "%s"', p)
	    fs.stat(p, function (err, stat) {
	      if (err) return next(err)
	      if (stat.isDirectory()) return next()
	      self.emit('file', p, stat)
	      self.send(p, stat)
	    })
	  }
	
	  next()
	}
	
	/**
	 * Stream `path` to the response.
	 *
	 * @param {String} path
	 * @param {Object} options
	 * @api private
	 */
	
	SendStream.prototype.stream = function stream (path, options) {
	  // TODO: this is all lame, refactor meeee
	  var finished = false
	  var self = this
	  var res = this.res
	
	  // pipe
	  var stream = fs.createReadStream(path, options)
	  this.emit('stream', stream)
	  stream.pipe(res)
	
	  // response finished, done with the fd
	  onFinished(res, function onfinished () {
	    finished = true
	    destroy(stream)
	  })
	
	  // error handling code-smell
	  stream.on('error', function onerror (err) {
	    // request already finished
	    if (finished) return
	
	    // clean up stream
	    finished = true
	    destroy(stream)
	
	    // error
	    self.onStatError(err)
	  })
	
	  // end
	  stream.on('end', function onend () {
	    self.emit('end')
	  })
	}
	
	/**
	 * Set content-type based on `path`
	 * if it hasn't been explicitly set.
	 *
	 * @param {String} path
	 * @api private
	 */
	
	SendStream.prototype.type = function type (path) {
	  var res = this.res
	
	  if (res.getHeader('Content-Type')) return
	
	  var type = mime.lookup(path)
	
	  if (!type) {
	    debug('no content-type')
	    return
	  }
	
	  var charset = mime.charsets.lookup(type)
	
	  debug('content-type %s', type)
	  res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''))
	}
	
	/**
	 * Set response header fields, most
	 * fields may be pre-defined.
	 *
	 * @param {String} path
	 * @param {Object} stat
	 * @api private
	 */
	
	SendStream.prototype.setHeader = function setHeader (path, stat) {
	  var res = this.res
	
	  this.emit('headers', res, path, stat)
	
	  if (this._acceptRanges && !res.getHeader('Accept-Ranges')) {
	    debug('accept ranges')
	    res.setHeader('Accept-Ranges', 'bytes')
	  }
	
	  if (this._cacheControl && !res.getHeader('Cache-Control')) {
	    var cacheControl = 'public, max-age=' + Math.floor(this._maxage / 1000)
	    debug('cache-control %s', cacheControl)
	    res.setHeader('Cache-Control', cacheControl)
	  }
	
	  if (this._lastModified && !res.getHeader('Last-Modified')) {
	    var modified = stat.mtime.toUTCString()
	    debug('modified %s', modified)
	    res.setHeader('Last-Modified', modified)
	  }
	
	  if (this._etag && !res.getHeader('ETag')) {
	    var val = etag(stat)
	    debug('etag %s', val)
	    res.setHeader('ETag', val)
	  }
	}
	
	/**
	 * Clear all headers from a response.
	 *
	 * @param {object} res
	 * @private
	 */
	
	function clearHeaders (res) {
	  res._headers = {}
	  res._headerNames = {}
	}
	
	/**
	 * Collapse all leading slashes into a single slash
	 *
	 * @param {string} str
	 * @private
	 */
	function collapseLeadingSlashes (str) {
	  for (var i = 0; i < str.length; i++) {
	    if (str[i] !== '/') {
	      break
	    }
	  }
	
	  return i > 1
	    ? '/' + str.substr(i)
	    : str
	}
	
	/**
	 * Determine if path parts contain a dotfile.
	 *
	 * @api private
	 */
	
	function containsDotFile (parts) {
	  for (var i = 0; i < parts.length; i++) {
	    if (parts[i][0] === '.') {
	      return true
	    }
	  }
	
	  return false
	}
	
	/**
	 * Create a Content-Range header.
	 *
	 * @param {string} type
	 * @param {number} size
	 * @param {array} [range]
	 */
	
	function contentRange (type, size, range) {
	  return type + ' ' + (range ? range.start + '-' + range.end : '*') + '/' + size
	}
	
	/**
	 * decodeURIComponent.
	 *
	 * Allows V8 to only deoptimize this fn instead of all
	 * of send().
	 *
	 * @param {String} path
	 * @api private
	 */
	
	function decode (path) {
	  try {
	    return decodeURIComponent(path)
	  } catch (err) {
	    return -1
	  }
	}
	
	/**
	 * Normalize the index option into an array.
	 *
	 * @param {boolean|string|array} val
	 * @param {string} name
	 * @private
	 */
	
	function normalizeList (val, name) {
	  var list = [].concat(val || [])
	
	  for (var i = 0; i < list.length; i++) {
	    if (typeof list[i] !== 'string') {
	      throw new TypeError(name + ' must be array of strings or false')
	    }
	  }
	
	  return list
	}
	
	/**
	 * Set an object of headers on a response.
	 *
	 * @param {object} res
	 * @param {object} headers
	 * @private
	 */
	
	function setHeaders (res, headers) {
	  var keys = Object.keys(headers)
	
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i]
	    res.setHeader(key, headers[key])
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(148);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(149);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 149 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 150 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var router=__webpack_require__(1).Router();
	
	module.exports=router.
	get('/',function(req,res,next){
	res.send('Hit Users Page').
	catch(next);
	
	
	
	
	
	});

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var router=__webpack_require__(1).Router();
	
	module.exports=router.
	get('/',function(req,res,next){
	res.send('Hit Messages Page').
	catch(next);
	
	
	
	
	
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map