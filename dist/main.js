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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../../../../Users/Ivan/Documents/GitHub/GitHubFinder/src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../../Users/Ivan/Documents/GitHub/GitHubFinder/node_modules/cross-fetch/dist/browser-polyfill.js":
/*!*****************************************************************************************************!*\
  !*** C:/Users/Ivan/Documents/GitHub/GitHubFinder/node_modules/cross-fetch/dist/browser-polyfill.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function(self) {\n\n  if (self.fetch) {\n    return\n  }\n\n  var support = {\n    searchParams: 'URLSearchParams' in self,\n    iterable: 'Symbol' in self && 'iterator' in Symbol,\n    blob: 'FileReader' in self && 'Blob' in self && (function() {\n      try {\n        new Blob();\n        return true\n      } catch(e) {\n        return false\n      }\n    })(),\n    formData: 'FormData' in self,\n    arrayBuffer: 'ArrayBuffer' in self\n  };\n\n  if (support.arrayBuffer) {\n    var viewClasses = [\n      '[object Int8Array]',\n      '[object Uint8Array]',\n      '[object Uint8ClampedArray]',\n      '[object Int16Array]',\n      '[object Uint16Array]',\n      '[object Int32Array]',\n      '[object Uint32Array]',\n      '[object Float32Array]',\n      '[object Float64Array]'\n    ];\n\n    var isDataView = function(obj) {\n      return obj && DataView.prototype.isPrototypeOf(obj)\n    };\n\n    var isArrayBufferView = ArrayBuffer.isView || function(obj) {\n      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1\n    };\n  }\n\n  function normalizeName(name) {\n    if (typeof name !== 'string') {\n      name = String(name);\n    }\n    if (/[^a-z0-9\\-#$%&'*+.\\^_`|~]/i.test(name)) {\n      throw new TypeError('Invalid character in header field name')\n    }\n    return name.toLowerCase()\n  }\n\n  function normalizeValue(value) {\n    if (typeof value !== 'string') {\n      value = String(value);\n    }\n    return value\n  }\n\n  // Build a destructive iterator for the value list\n  function iteratorFor(items) {\n    var iterator = {\n      next: function() {\n        var value = items.shift();\n        return {done: value === undefined, value: value}\n      }\n    };\n\n    if (support.iterable) {\n      iterator[Symbol.iterator] = function() {\n        return iterator\n      };\n    }\n\n    return iterator\n  }\n\n  function Headers(headers) {\n    this.map = {};\n\n    if (headers instanceof Headers) {\n      headers.forEach(function(value, name) {\n        this.append(name, value);\n      }, this);\n    } else if (Array.isArray(headers)) {\n      headers.forEach(function(header) {\n        this.append(header[0], header[1]);\n      }, this);\n    } else if (headers) {\n      Object.getOwnPropertyNames(headers).forEach(function(name) {\n        this.append(name, headers[name]);\n      }, this);\n    }\n  }\n\n  Headers.prototype.append = function(name, value) {\n    name = normalizeName(name);\n    value = normalizeValue(value);\n    var oldValue = this.map[name];\n    this.map[name] = oldValue ? oldValue+','+value : value;\n  };\n\n  Headers.prototype['delete'] = function(name) {\n    delete this.map[normalizeName(name)];\n  };\n\n  Headers.prototype.get = function(name) {\n    name = normalizeName(name);\n    return this.has(name) ? this.map[name] : null\n  };\n\n  Headers.prototype.has = function(name) {\n    return this.map.hasOwnProperty(normalizeName(name))\n  };\n\n  Headers.prototype.set = function(name, value) {\n    this.map[normalizeName(name)] = normalizeValue(value);\n  };\n\n  Headers.prototype.forEach = function(callback, thisArg) {\n    for (var name in this.map) {\n      if (this.map.hasOwnProperty(name)) {\n        callback.call(thisArg, this.map[name], name, this);\n      }\n    }\n  };\n\n  Headers.prototype.keys = function() {\n    var items = [];\n    this.forEach(function(value, name) { items.push(name); });\n    return iteratorFor(items)\n  };\n\n  Headers.prototype.values = function() {\n    var items = [];\n    this.forEach(function(value) { items.push(value); });\n    return iteratorFor(items)\n  };\n\n  Headers.prototype.entries = function() {\n    var items = [];\n    this.forEach(function(value, name) { items.push([name, value]); });\n    return iteratorFor(items)\n  };\n\n  if (support.iterable) {\n    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;\n  }\n\n  function consumed(body) {\n    if (body.bodyUsed) {\n      return Promise.reject(new TypeError('Already read'))\n    }\n    body.bodyUsed = true;\n  }\n\n  function fileReaderReady(reader) {\n    return new Promise(function(resolve, reject) {\n      reader.onload = function() {\n        resolve(reader.result);\n      };\n      reader.onerror = function() {\n        reject(reader.error);\n      };\n    })\n  }\n\n  function readBlobAsArrayBuffer(blob) {\n    var reader = new FileReader();\n    var promise = fileReaderReady(reader);\n    reader.readAsArrayBuffer(blob);\n    return promise\n  }\n\n  function readBlobAsText(blob) {\n    var reader = new FileReader();\n    var promise = fileReaderReady(reader);\n    reader.readAsText(blob);\n    return promise\n  }\n\n  function readArrayBufferAsText(buf) {\n    var view = new Uint8Array(buf);\n    var chars = new Array(view.length);\n\n    for (var i = 0; i < view.length; i++) {\n      chars[i] = String.fromCharCode(view[i]);\n    }\n    return chars.join('')\n  }\n\n  function bufferClone(buf) {\n    if (buf.slice) {\n      return buf.slice(0)\n    } else {\n      var view = new Uint8Array(buf.byteLength);\n      view.set(new Uint8Array(buf));\n      return view.buffer\n    }\n  }\n\n  function Body() {\n    this.bodyUsed = false;\n\n    this._initBody = function(body) {\n      this._bodyInit = body;\n      if (!body) {\n        this._bodyText = '';\n      } else if (typeof body === 'string') {\n        this._bodyText = body;\n      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {\n        this._bodyBlob = body;\n      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {\n        this._bodyFormData = body;\n      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {\n        this._bodyText = body.toString();\n      } else if (support.arrayBuffer && support.blob && isDataView(body)) {\n        this._bodyArrayBuffer = bufferClone(body.buffer);\n        // IE 10-11 can't handle a DataView body.\n        this._bodyInit = new Blob([this._bodyArrayBuffer]);\n      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {\n        this._bodyArrayBuffer = bufferClone(body);\n      } else {\n        throw new Error('unsupported BodyInit type')\n      }\n\n      if (!this.headers.get('content-type')) {\n        if (typeof body === 'string') {\n          this.headers.set('content-type', 'text/plain;charset=UTF-8');\n        } else if (this._bodyBlob && this._bodyBlob.type) {\n          this.headers.set('content-type', this._bodyBlob.type);\n        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {\n          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');\n        }\n      }\n    };\n\n    if (support.blob) {\n      this.blob = function() {\n        var rejected = consumed(this);\n        if (rejected) {\n          return rejected\n        }\n\n        if (this._bodyBlob) {\n          return Promise.resolve(this._bodyBlob)\n        } else if (this._bodyArrayBuffer) {\n          return Promise.resolve(new Blob([this._bodyArrayBuffer]))\n        } else if (this._bodyFormData) {\n          throw new Error('could not read FormData body as blob')\n        } else {\n          return Promise.resolve(new Blob([this._bodyText]))\n        }\n      };\n\n      this.arrayBuffer = function() {\n        if (this._bodyArrayBuffer) {\n          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)\n        } else {\n          return this.blob().then(readBlobAsArrayBuffer)\n        }\n      };\n    }\n\n    this.text = function() {\n      var rejected = consumed(this);\n      if (rejected) {\n        return rejected\n      }\n\n      if (this._bodyBlob) {\n        return readBlobAsText(this._bodyBlob)\n      } else if (this._bodyArrayBuffer) {\n        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))\n      } else if (this._bodyFormData) {\n        throw new Error('could not read FormData body as text')\n      } else {\n        return Promise.resolve(this._bodyText)\n      }\n    };\n\n    if (support.formData) {\n      this.formData = function() {\n        return this.text().then(decode)\n      };\n    }\n\n    this.json = function() {\n      return this.text().then(JSON.parse)\n    };\n\n    return this\n  }\n\n  // HTTP methods whose capitalization should be normalized\n  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];\n\n  function normalizeMethod(method) {\n    var upcased = method.toUpperCase();\n    return (methods.indexOf(upcased) > -1) ? upcased : method\n  }\n\n  function Request(input, options) {\n    options = options || {};\n    var body = options.body;\n\n    if (input instanceof Request) {\n      if (input.bodyUsed) {\n        throw new TypeError('Already read')\n      }\n      this.url = input.url;\n      this.credentials = input.credentials;\n      if (!options.headers) {\n        this.headers = new Headers(input.headers);\n      }\n      this.method = input.method;\n      this.mode = input.mode;\n      if (!body && input._bodyInit != null) {\n        body = input._bodyInit;\n        input.bodyUsed = true;\n      }\n    } else {\n      this.url = String(input);\n    }\n\n    this.credentials = options.credentials || this.credentials || 'omit';\n    if (options.headers || !this.headers) {\n      this.headers = new Headers(options.headers);\n    }\n    this.method = normalizeMethod(options.method || this.method || 'GET');\n    this.mode = options.mode || this.mode || null;\n    this.referrer = null;\n\n    if ((this.method === 'GET' || this.method === 'HEAD') && body) {\n      throw new TypeError('Body not allowed for GET or HEAD requests')\n    }\n    this._initBody(body);\n  }\n\n  Request.prototype.clone = function() {\n    return new Request(this, { body: this._bodyInit })\n  };\n\n  function decode(body) {\n    var form = new FormData();\n    body.trim().split('&').forEach(function(bytes) {\n      if (bytes) {\n        var split = bytes.split('=');\n        var name = split.shift().replace(/\\+/g, ' ');\n        var value = split.join('=').replace(/\\+/g, ' ');\n        form.append(decodeURIComponent(name), decodeURIComponent(value));\n      }\n    });\n    return form\n  }\n\n  function parseHeaders(rawHeaders) {\n    var headers = new Headers();\n    // Replace instances of \\r\\n and \\n followed by at least one space or horizontal tab with a space\n    // https://tools.ietf.org/html/rfc7230#section-3.2\n    var preProcessedHeaders = rawHeaders.replace(/\\r?\\n[\\t ]+/g, ' ');\n    preProcessedHeaders.split(/\\r?\\n/).forEach(function(line) {\n      var parts = line.split(':');\n      var key = parts.shift().trim();\n      if (key) {\n        var value = parts.join(':').trim();\n        headers.append(key, value);\n      }\n    });\n    return headers\n  }\n\n  Body.call(Request.prototype);\n\n  function Response(bodyInit, options) {\n    if (!options) {\n      options = {};\n    }\n\n    this.type = 'default';\n    this.status = options.status === undefined ? 200 : options.status;\n    this.ok = this.status >= 200 && this.status < 300;\n    this.statusText = 'statusText' in options ? options.statusText : 'OK';\n    this.headers = new Headers(options.headers);\n    this.url = options.url || '';\n    this._initBody(bodyInit);\n  }\n\n  Body.call(Response.prototype);\n\n  Response.prototype.clone = function() {\n    return new Response(this._bodyInit, {\n      status: this.status,\n      statusText: this.statusText,\n      headers: new Headers(this.headers),\n      url: this.url\n    })\n  };\n\n  Response.error = function() {\n    var response = new Response(null, {status: 0, statusText: ''});\n    response.type = 'error';\n    return response\n  };\n\n  var redirectStatuses = [301, 302, 303, 307, 308];\n\n  Response.redirect = function(url, status) {\n    if (redirectStatuses.indexOf(status) === -1) {\n      throw new RangeError('Invalid status code')\n    }\n\n    return new Response(null, {status: status, headers: {location: url}})\n  };\n\n  self.Headers = Headers;\n  self.Request = Request;\n  self.Response = Response;\n\n  self.fetch = function(input, init) {\n    return new Promise(function(resolve, reject) {\n      var request = new Request(input, init);\n      var xhr = new XMLHttpRequest();\n\n      xhr.onload = function() {\n        var options = {\n          status: xhr.status,\n          statusText: xhr.statusText,\n          headers: parseHeaders(xhr.getAllResponseHeaders() || '')\n        };\n        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');\n        var body = 'response' in xhr ? xhr.response : xhr.responseText;\n        resolve(new Response(body, options));\n      };\n\n      xhr.onerror = function() {\n        reject(new TypeError('Network request failed'));\n      };\n\n      xhr.ontimeout = function() {\n        reject(new TypeError('Network request failed'));\n      };\n\n      xhr.open(request.method, request.url, true);\n\n      if (request.credentials === 'include') {\n        xhr.withCredentials = true;\n      } else if (request.credentials === 'omit') {\n        xhr.withCredentials = false;\n      }\n\n      if ('responseType' in xhr && support.blob) {\n        xhr.responseType = 'blob';\n      }\n\n      request.headers.forEach(function(value, name) {\n        xhr.setRequestHeader(name, value);\n      });\n\n      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);\n    })\n  };\n  self.fetch.polyfill = true;\n})(typeof self !== 'undefined' ? self : this);\n\n\n//# sourceURL=webpack:///C:/Users/Ivan/Documents/GitHub/GitHubFinder/node_modules/cross-fetch/dist/browser-polyfill.js?");

/***/ }),

/***/ "../../../../Users/Ivan/Documents/GitHub/GitHubFinder/node_modules/graphql-request/dist/src/index.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Ivan/Documents/GitHub/GitHubFinder/node_modules/graphql-request/dist/src/index.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || Object.assign || function(t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n        s = arguments[i];\n        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n            t[p] = s[p];\n    }\n    return t;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = y[op[0] & 2 ? \"return\" : op[0] ? \"throw\" : \"next\"]) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [0, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)\n            t[p[i]] = s[p[i]];\n    return t;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar types_1 = __webpack_require__(/*! ./types */ \"../../../../Users/Ivan/Documents/GitHub/GitHubFinder/node_modules/graphql-request/dist/src/types.js\");\nvar types_2 = __webpack_require__(/*! ./types */ \"../../../../Users/Ivan/Documents/GitHub/GitHubFinder/node_modules/graphql-request/dist/src/types.js\");\nexports.ClientError = types_2.ClientError;\n__webpack_require__(/*! cross-fetch/polyfill */ \"../../../../Users/Ivan/Documents/GitHub/GitHubFinder/node_modules/cross-fetch/dist/browser-polyfill.js\");\nvar GraphQLClient = /** @class */ (function () {\n    function GraphQLClient(url, options) {\n        this.url = url;\n        this.options = options || {};\n    }\n    GraphQLClient.prototype.rawRequest = function (query, variables) {\n        return __awaiter(this, void 0, void 0, function () {\n            var _a, headers, others, body, response, result, headers_1, status_1, errorResult;\n            return __generator(this, function (_b) {\n                switch (_b.label) {\n                    case 0:\n                        _a = this.options, headers = _a.headers, others = __rest(_a, [\"headers\"]);\n                        body = JSON.stringify({\n                            query: query,\n                            variables: variables ? variables : undefined,\n                        });\n                        return [4 /*yield*/, fetch(this.url, __assign({ method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, headers), body: body }, others))];\n                    case 1:\n                        response = _b.sent();\n                        return [4 /*yield*/, getResult(response)];\n                    case 2:\n                        result = _b.sent();\n                        if (response.ok && !result.errors && result.data) {\n                            headers_1 = response.headers, status_1 = response.status;\n                            return [2 /*return*/, __assign({}, result, { headers: headers_1, status: status_1 })];\n                        }\n                        else {\n                            errorResult = typeof result === 'string' ? { error: result } : result;\n                            throw new types_1.ClientError(__assign({}, errorResult, { status: response.status, headers: response.headers }), { query: query, variables: variables });\n                        }\n                        return [2 /*return*/];\n                }\n            });\n        });\n    };\n    GraphQLClient.prototype.request = function (query, variables) {\n        return __awaiter(this, void 0, void 0, function () {\n            var _a, headers, others, body, response, result, errorResult;\n            return __generator(this, function (_b) {\n                switch (_b.label) {\n                    case 0:\n                        _a = this.options, headers = _a.headers, others = __rest(_a, [\"headers\"]);\n                        body = JSON.stringify({\n                            query: query,\n                            variables: variables ? variables : undefined,\n                        });\n                        return [4 /*yield*/, fetch(this.url, __assign({ method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, headers), body: body }, others))];\n                    case 1:\n                        response = _b.sent();\n                        return [4 /*yield*/, getResult(response)];\n                    case 2:\n                        result = _b.sent();\n                        if (response.ok && !result.errors && result.data) {\n                            return [2 /*return*/, result.data];\n                        }\n                        else {\n                            errorResult = typeof result === 'string' ? { error: result } : result;\n                            throw new types_1.ClientError(__assign({}, errorResult, { status: response.status }), { query: query, variables: variables });\n                        }\n                        return [2 /*return*/];\n                }\n            });\n        });\n    };\n    GraphQLClient.prototype.setHeaders = function (headers) {\n        this.options.headers = headers;\n        return this;\n    };\n    GraphQLClient.prototype.setHeader = function (key, value) {\n        var headers = this.options.headers;\n        if (headers) {\n            headers[key] = value;\n        }\n        else {\n            this.options.headers = (_a = {}, _a[key] = value, _a);\n        }\n        return this;\n        var _a;\n    };\n    return GraphQLClient;\n}());\nexports.GraphQLClient = GraphQLClient;\nfunction rawRequest(url, query, variables) {\n    return __awaiter(this, void 0, void 0, function () {\n        var client;\n        return __generator(this, function (_a) {\n            client = new GraphQLClient(url);\n            return [2 /*return*/, client.rawRequest(query, variables)];\n        });\n    });\n}\nexports.rawRequest = rawRequest;\nfunction request(url, query, variables) {\n    return __awaiter(this, void 0, void 0, function () {\n        var client;\n        return __generator(this, function (_a) {\n            client = new GraphQLClient(url);\n            return [2 /*return*/, client.request(query, variables)];\n        });\n    });\n}\nexports.request = request;\nexports.default = request;\nfunction getResult(response) {\n    return __awaiter(this, void 0, void 0, function () {\n        var contentType;\n        return __generator(this, function (_a) {\n            contentType = response.headers.get('Content-Type');\n            if (contentType && contentType.startsWith('application/json')) {\n                return [2 /*return*/, response.json()];\n            }\n            else {\n                return [2 /*return*/, response.text()];\n            }\n            return [2 /*return*/];\n        });\n    });\n}\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///C:/Users/Ivan/Documents/GitHub/GitHubFinder/node_modules/graphql-request/dist/src/index.js?");

/***/ }),

/***/ "../../../../Users/Ivan/Documents/GitHub/GitHubFinder/node_modules/graphql-request/dist/src/types.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/Ivan/Documents/GitHub/GitHubFinder/node_modules/graphql-request/dist/src/types.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = Object.setPrototypeOf ||\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ClientError = /** @class */ (function (_super) {\n    __extends(ClientError, _super);\n    function ClientError(response, request) {\n        var _this = this;\n        var message = ClientError.extractMessage(response) + \": \" + JSON.stringify({ response: response, request: request });\n        _this = _super.call(this, message) || this;\n        _this.response = response;\n        _this.request = request;\n        // this is needed as Safari doesn't support .captureStackTrace\n        /* tslint:disable-next-line */\n        if (typeof Error.captureStackTrace === 'function') {\n            Error.captureStackTrace(_this, ClientError);\n        }\n        return _this;\n    }\n    ClientError.extractMessage = function (response) {\n        try {\n            return response.errors[0].message;\n        }\n        catch (e) {\n            return \"GraphQL Error (Code: \" + response.status + \")\";\n        }\n    };\n    return ClientError;\n}(Error));\nexports.ClientError = ClientError;\n//# sourceMappingURL=types.js.map\n\n//# sourceURL=webpack:///C:/Users/Ivan/Documents/GitHub/GitHubFinder/node_modules/graphql-request/dist/src/types.js?");

/***/ }),

/***/ "../../../../Users/Ivan/Documents/GitHub/GitHubFinder/src/js/index.js":
/*!*******************************************************************!*\
  !*** C:/Users/Ivan/Documents/GitHub/GitHubFinder/src/js/index.js ***!
  \*******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var graphql_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-request */ \"../../../../Users/Ivan/Documents/GitHub/GitHubFinder/node_modules/graphql-request/dist/src/index.js\");\n/* harmony import */ var graphql_request__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_request__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _queries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./queries */ \"../../../../Users/Ivan/Documents/GitHub/GitHubFinder/src/js/queries.js\");\n\r\n\r\n\r\n\r\nconst endpoint = 'https://api.github.com/graphql'\r\n\r\n// Getting an access key from LS.\r\nvar access = localStorage.getItem('access')\r\n\r\n// Checking LS for presence of an access key.\r\nif (access === null || undefined || ``) {\r\n\tconsole.log('Insert an access key for access search!')\r\n} else {\r\n\tconsole.log('The access key has been loaded successfully.')\r\n}\r\n\r\n// Input an access key.\r\ndocument.getElementById('Form-AccessKey').addEventListener('submit', e => {\r\n\taccess = document.getElementById('AccessKey').value\r\n\tlocalStorage.setItem('access', `${access}`)\r\n\te.preventDefault()\r\n})\r\n\r\n// A GraphQl request function.\r\nasync function GitHubGraphQL(query, variables) {\r\n\tconst graphQLClient = new graphql_request__WEBPACK_IMPORTED_MODULE_0__[\"GraphQLClient\"](endpoint, {\r\n\t\theaders: {authorization: `bearer ${access}`},\r\n\t})\r\n\treturn await graphQLClient.request(query, variables)\r\n}\r\n\r\n// Getting a user login to find the user.\r\ndocument.getElementById('Form-UserByLogin').addEventListener('submit', e => {\r\n\tconst login = document.getElementById('UserByLogin').value\r\n\tlet variables = {login: `${login}`}\r\n    GitHubGraphQL(_queries__WEBPACK_IMPORTED_MODULE_1__[\"queryProfileUser\"], variables)\r\n\t\t.then(data => console.log(JSON.stringify(data, undefined, 2)))\r\n\t\t.catch(error => console.error(error))\r\n\te.preventDefault()\r\n})\r\n\r\n// Getting part of a user login for searching a user.\r\ndocument.getElementById('Form-UserSearcher').addEventListener('submit', e => {\r\n\tconst login = document.getElementById('UserSearcher').value\r\n\tlet variables = {login: `${login}`}\r\n\tGitHubGraphQL(_queries__WEBPACK_IMPORTED_MODULE_1__[\"querySearchUsers\"], variables)\r\n\t\t.then(data => console.log(JSON.stringify(data, undefined, 2)))\r\n\t\t.catch(error => console.error(error))\r\n\te.preventDefault()\r\n})\r\n\r\n// Make a tab active.\r\nlet tabs = document.querySelectorAll('.tab')\r\nlet forms = document.querySelectorAll('form')\r\n\r\n// Switching tabs and forms\r\ntabs.forEach(Element => {\r\n\tElement.addEventListener('click', function () {\r\n\t\ttabs.forEach(element => element.classList.remove('active'))\r\n\t\tforms.forEach(element => element.classList.remove('active'))\r\n\t\tthis.classList.add('active')\r\n\r\n\t\tforms.forEach(Element => {\r\n\t\t\tif (Element.id.replace('Form-', '') === this.id.replace('Tab-', '')) {\r\n\t\t\t\tElement.classList.add('active')\r\n\t\t\t}\r\n\t\t})\r\n\t})\r\n})\r\n\r\n\n\n//# sourceURL=webpack:///C:/Users/Ivan/Documents/GitHub/GitHubFinder/src/js/index.js?");

/***/ }),

/***/ "../../../../Users/Ivan/Documents/GitHub/GitHubFinder/src/js/queries.js":
/*!*********************************************************************!*\
  !*** C:/Users/Ivan/Documents/GitHub/GitHubFinder/src/js/queries.js ***!
  \*********************************************************************/
/*! exports provided: querySearchUsers, queryProfileUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"querySearchUsers\", function() { return querySearchUsers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"queryProfileUser\", function() { return queryProfileUser; });\nconst querySearchUsers = `\r\nquery userFinder($login: String!) {\r\n\tsearch(first: 15, type: USER, query: $login) {\r\n\t\tedges {\r\n\t\t\ttextMatches {\r\n\t\t\t\tfragment\r\n\t\t\t\tproperty\r\n\t\t\t}\r\n\t\t}\r\n\t\tuserCount\r\n\t\tpageInfo {\r\n\t\t\thasNextPage\r\n\t\t\thasPreviousPage\r\n\t\t}\r\n\t}\r\n}`;\r\n\r\nconst queryProfileUser = `\r\n    query userProfile($login: String!) {\r\n\tuser(login: $login) {\r\n\t\tname\r\n\t\temail\r\n\t\tcompany\r\n\t\tcreatedAt\r\n\t\tlocation\r\n\t\tavatarUrl\r\n\t\twebsiteUrl\r\n\t\tid\r\n\t\tisEmployee\r\n\t\tisHireable\r\n\t\tisDeveloperProgramMember\r\n\t\trepositories(first: 50) {\r\n\t\t\ttotalCount\r\n\t\t\tpageInfo {\r\n\t\t\t\thasNextPage\r\n\t\t\t\thasPreviousPage\r\n\t\t\t\tstartCursor\r\n\t\t\t\tendCursor\r\n\t\t\t}\r\n\t\t\tnodes {\r\n\t\t\t\tname\r\n\t\t\t\tcreatedAt\r\n\t\t\t\turl\r\n\t\t\t}\r\n\t\t}\r\n\t\tgists {\r\n\t\t\ttotalCount\r\n\t\t}\r\n\t\tfollowers {\r\n\t\t\ttotalCount\r\n\t\t}\r\n\t\tfollowing {\r\n\t\t\ttotalCount\r\n\t\t}\r\n\t}\r\n}`;\n\n//# sourceURL=webpack:///C:/Users/Ivan/Documents/GitHub/GitHubFinder/src/js/queries.js?");

/***/ })

/******/ });