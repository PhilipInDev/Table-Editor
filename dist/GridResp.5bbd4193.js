// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"class/GridOnClick.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GridResp = _interopRequireDefault(require("./GridResp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GridOnClick = /*#__PURE__*/function () {
  function GridOnClick() {
    _classCallCheck(this, GridOnClick);
  }

  _createClass(GridOnClick, null, [{
    key: "cellOnClick",
    value: function cellOnClick(e) {
      if (e.target !== GridOnClick.previousTarget && GridOnClick.cellTarget && GridOnClick.previousTarget && (e.target.getAttribute('class') === 'cell-text' || e.target.tagName === 'H3' || e.target.getAttribute('class') === 'resize-handle')) {
        var _document$querySelect, _document$querySelect2, _document$querySelect3, _GridOnClick$previous, _GridOnClick$previous2, _GridOnClick$previous3, _GridOnClick$previous4, _GridOnClick$previous5;

        (_document$querySelect = document.querySelector('.cell-on-click')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.classList.remove('cell-on-click');
        (_document$querySelect2 = document.querySelector('.cell-resize-handler')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.remove();
        (_document$querySelect3 = document.querySelector('.th-on-click')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.classList.remove('th-on-click');
        (_GridOnClick$previous = GridOnClick.previousTarget) === null || _GridOnClick$previous === void 0 ? void 0 : (_GridOnClick$previous2 = _GridOnClick$previous.parentNode) === null || _GridOnClick$previous2 === void 0 ? void 0 : _GridOnClick$previous2.classList.remove('cell-on-dblclick');
        (_GridOnClick$previous3 = GridOnClick.previousTarget) === null || _GridOnClick$previous3 === void 0 ? void 0 : _GridOnClick$previous3.classList.remove('text-on-dblclick');
        (_GridOnClick$previous4 = GridOnClick.previousTarget) === null || _GridOnClick$previous4 === void 0 ? void 0 : _GridOnClick$previous4.setAttribute('contenteditable', 'false');

        _GridResp.default.thWidthCheck(e.target);

        if (((_GridOnClick$previous5 = GridOnClick.previousTarget) === null || _GridOnClick$previous5 === void 0 ? void 0 : _GridOnClick$previous5.tagName) !== 'H3' && GridOnClick.previousTarget) {
          var _GridOnClick$previous6;

          _GridResp.default.keepColWidth((_GridOnClick$previous6 = GridOnClick.previousTarget) === null || _GridOnClick$previous6 === void 0 ? void 0 : _GridOnClick$previous6.parentNode, _GridResp.default.thWidth, 'px', 0, '100', '%', 200);

          _GridResp.default.keepCellHeight();
        }

        GridOnClick.cellTarget = null;
      }

      if (e.target.getAttribute('class') === 'cell-text') {
        var _document$querySelect4, _document$querySelect5;

        GridOnClick.cellTarget = e.target.parentNode;
        GridOnClick.previousTarget = e.target;
        (_document$querySelect4 = document.querySelector('.cell-on-click')) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.classList.remove('cell-on-click');
        GridOnClick.cellTarget.classList.add('cell-on-click');
        (_document$querySelect5 = document.querySelector('.cell-resize-handler')) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.remove();
        GridOnClick.resizeHandler.classList.add('cell-resize-handler');
        GridOnClick.cellTarget.append(GridOnClick.resizeHandler);

        _GridResp.default.thWidthCheck(e.target);

        _GridResp.default.keepColWidth(GridOnClick.cellTarget, _GridResp.default.thWidth, 'px', 0, '100', '%', 200);

        _GridResp.default.keepCellHeight(GridOnClick.cellTarget, GridOnClick.cellTarget.offsetHeight, 'px');
      }

      if (e.target.tagName === 'H3') {
        GridOnClick.previousTarget = e.target;
        GridOnClick.cellTarget = e.target.parentNode;
        GridOnClick.cellTarget.classList.add('th-on-click');
      }
    }
  }, {
    key: "cellOnDblClick",
    value: function cellOnDblClick(e) {
      if (e.target.tagName === 'H3' || e.target.getAttribute('class') === 'cell-text') {
        e.target.setAttribute('contenteditable', 'true');
        e.target.parentNode.classList.add('cell-on-dblclick');
        e.target.classList.add('text-on-dblclick');
        e.target.focus();
      }
    }
  }]);

  return GridOnClick;
}();

exports.default = GridOnClick;

_defineProperty(GridOnClick, "cellTarget", null);

_defineProperty(GridOnClick, "resizeHandler", document.createElement('div'));

_defineProperty(GridOnClick, "previousTarget", null);
},{"./GridResp":"class/GridResp.js"}],"class/GridResp.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GridOnClick = _interopRequireDefault(require("./GridOnClick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GridResp = /*#__PURE__*/function () {
  function GridResp() {
    _classCallCheck(this, GridResp);
  }

  _createClass(GridResp, null, [{
    key: "thWidthCheck",
    value: function thWidthCheck(target) {
      GridResp.th = document.querySelectorAll('th');
      GridResp.th = GridResp.th[target.parentNode.cellIndex];
      GridResp.thWidth = GridResp.th.offsetWidth;
    }
  }, {
    key: "keepColWidth",
    value: function keepColWidth(cell, thWidth, unit, timeout1, tdWidth, unitTd, timeout2) {
      setTimeout(function () {
        var _GridResp$th;

        return (_GridResp$th = GridResp.th) === null || _GridResp$th === void 0 ? void 0 : _GridResp$th.style.setProperty('width', thWidth + unit, 'important');
      }, timeout1);
      setTimeout(function (target) {
        target.style.setProperty('width', tdWidth + unitTd, 'important');
      }, timeout2, cell);
    }
  }, {
    key: "keepCellHeight",
    value: function keepCellHeight() {
      var cell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _GridOnClick.default.cellTarget;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '100';
      var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '%';
      cell === null || cell === void 0 ? void 0 : cell.style.setProperty('height', height + unit, 'important');
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      requestAnimationFrame(function () {
        GridResp.handler = GridResp.cellBeingResized.getBoundingClientRect();
        GridResp.cellBeingResized.parentNode.style.width = "".concat(GridResp.cellBeingResized.parentNode.offsetWidth + (e.clientX + document.documentElement.scrollLeft - (GridResp.handler.left + pageXOffset + GridResp.cellBeingResized.offsetWidth)), "px");

        if (GridResp.isResizeBoth) {
          GridResp.cellBeingResized.parentNode.style.height = "".concat(GridResp.cellBeingResized.parentNode.offsetHeight + (e.clientY + document.documentElement.scrollTop - (GridResp.handler.top + pageYOffset + GridResp.cellBeingResized.offsetHeight)), "px");
        }
      });
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      window.removeEventListener('mousemove', GridResp.onMouseMove);
      window.removeEventListener('mouseup', GridResp.onMouseUp);
    }
  }, {
    key: "initTableResponsivnes",
    value: function initTableResponsivnes(e) {
      if (e.target.getAttribute('class') === 'resize-handle') {
        GridResp.isResizeBoth = false;
        GridResp.cellBeingResized = e.target;

        if (_GridOnClick.default.cellTarget) {
          GridResp.keepColWidth(_GridOnClick.default.cellTarget, _GridOnClick.default.cellTarget.offsetWidth, 'px', 0, '100', '%', 200);
          GridResp.keepCellHeight();
        }

        window.addEventListener('mousemove', GridResp.onMouseMove);
        window.addEventListener('mouseup', GridResp.onMouseUp);
      }

      if (e.target.getAttribute('class') === 'cell-resize-handler') {
        GridResp.isResizeBoth = true;
        GridResp.cellBeingResized = e.target;
        GridResp.thWidthCheck(e.target);
        GridResp.keepColWidth(_GridOnClick.default.cellTarget, '100', '%', 200, GridResp.thWidth, 'px', 0);
        GridResp.keepCellHeight(_GridOnClick.default.cellTarget, _GridOnClick.default.cellTarget.offsetHeight, 'px');
        window.addEventListener('mousemove', GridResp.onMouseMove);
        window.addEventListener('mouseup', GridResp.onMouseUp);
      }
    }
  }]);

  return GridResp;
}();

exports.default = GridResp;

_defineProperty(GridResp, "cellBeingResized", null);

_defineProperty(GridResp, "isResizeBoth", false);

_defineProperty(GridResp, "handler", null);

_defineProperty(GridResp, "th", null);

_defineProperty(GridResp, "thWidth", null);
},{"./GridOnClick":"class/GridOnClick.js"}],"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35245" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","class/GridResp.js"], null)
//# sourceMappingURL=/GridResp.5bbd4193.js.map