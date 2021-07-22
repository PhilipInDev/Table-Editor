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
})({"class/GridSelection.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GridSelection = /*#__PURE__*/function () {
  function GridSelection() {
    _classCallCheck(this, GridSelection);
  }

  _createClass(GridSelection, null, [{
    key: "initSelection",
    value: function initSelection() {
      GridSelection.selection.enable(); // console.log(selection.getSelection())

      GridSelection.selection.on('beforestart', function (_ref) {
        var store = _ref.store,
            event = _ref.event;

        if (!event.ctrlKey && !event.metaKey) {
          // Unselect all elements
          var _iterator = _createForOfIteratorHelper(store.stored),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var el = _step.value;
              el.classList.remove('cell-selected');
            } // Clear previous selection

          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          GridSelection.selection.clearSelection();
          GridSelection.selectedCells = [];
        } // Use this event to decide whether a selection should take place or not.
        // For example if the user should be able to normally interact with input-elements you 
        // may want to prevent a selection if the user clicks such a element:

      }).on('start', function (_ref2) {
        var store = _ref2.store,
            event = _ref2.event;

        // Unselect all elements
        var _iterator2 = _createForOfIteratorHelper(store.stored),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var el = _step2.value;
            el.classList.remove('cell-selected');
          } // Clear previous selection

        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        GridSelection.selection.clearSelection(); // A selection got initiated, you could now clear the previous selection or
        // keep it if in case of multi-selection.
        // console.log('start', evt);
      }).on('move', function (_ref3) {
        var _ref3$store$changed = _ref3.store.changed,
            added = _ref3$store$changed.added,
            removed = _ref3$store$changed.removed,
            event = _ref3.event;

        var _iterator3 = _createForOfIteratorHelper(added),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var el = _step3.value;

            if (!el.classList.contains('cell-on-dblclick')) {
              el.classList.add('cell-selected');
              el.focus();
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        console.log(removed);

        var _iterator4 = _createForOfIteratorHelper(removed),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _el = _step4.value;

            _el.classList.remove('cell-selected');
          } // Here you can update elements based on their state.
          // console.log('move', evt);

        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }).on('stop', function (_ref4) {
        var selected = _ref4.store.selected;
        GridSelection.selection.keepSelection();
        GridSelection.selectedCells = [];
        GridSelection.selectedTd = [];
        GridSelection.selectedTh = []; // Do something with the selected elements.

        selected.forEach(function (el) {
          if (el.tagName === 'TH' && !el.classList.contains('cell-on-dblclick')) {
            GridSelection.selectedTh.push(el);
          }

          if (el.tagName === 'TD' && !el.classList.contains('cell-on-dblclick')) {
            GridSelection.selectedTd.push(el);
          }
        });

        if (GridSelection.selectedTh.length && GridSelection.selectedTd.length) {
          var _GridSelection$select, _GridSelection$select2;

          (_GridSelection$select = GridSelection.selectedCells).push.apply(_GridSelection$select, _toConsumableArray(GridSelection.selectedTh));

          (_GridSelection$select2 = GridSelection.selectedCells).push.apply(_GridSelection$select2, _toConsumableArray(GridSelection.selectedTd));
        }

        if (!GridSelection.selectedTh.length && GridSelection.selectedTd.length) {
          var _GridSelection$select3;

          (_GridSelection$select3 = GridSelection.selectedCells).push.apply(_GridSelection$select3, _toConsumableArray(GridSelection.selectedTd));
        }

        if (GridSelection.selectedTh.length && !GridSelection.selectedTd.length) {
          var _GridSelection$select4;

          (_GridSelection$select4 = GridSelection.selectedCells).push.apply(_GridSelection$select4, _toConsumableArray(GridSelection.selectedTh));
        }
      });
    }
  }, {
    key: "selectionSettings",
    value: function selectionSettings() {
      GridSelection.selection = new SelectionArea({
        // Class for the selection-area itself (the element).
        selectionAreaClass: 'selection-area',
        // Class for the selection-area container.
        selectionContainerClass: 'selection-area-container',
        // Query selector or dom-node to set up container for the selection-area element.
        container: '.table-grid-wrapper',
        // document object - if you want to use it within an embed document (or iframe).
        // Query selectors for elements which can be selected.
        selectables: ['td', 'th'],
        // Query selectors for elements from where a selection can be started from.
        startareas: ['h3', '.cell-text'],
        // Configuration in case a selectable gets just clicked.
        singleTap: {
          // Enable single-click selection (Also disables range-selection via shift + ctrl).
          allow: false,
          intersect: 'native'
        },
        // Specifies what should be done if already selected elements get selected again.
        //   invert: Invert selection for elements which were already selected
        //   keep: Keep selected elements (use clearSelection() to remove those)
        //   drop: Remove stored elements after they have been touched
        overlap: 'invert',
        // On which point an element should be selected.
        // Available modes are cover (cover the entire element), center (touch the center) or
        // the default mode is touch (just touching it).
        intersect: 'touch',
        // px, how many pixels the point should move before starting the selection (combined distance).
        // Or specifiy the threshold for each axis by passing an object like {x: <number>, y: <number>}.
        startThreshold: 10,
        // Scroll configuration.
        scrolling: {
          // On scrollable areas the number on px per frame is devided by this amount.
          // Default is 10 to provide a enjoyable scroll experience.
          speedDivider: 10,
          // Browsers handle mouse-wheel events differently, this number will be used as 
          // numerator to calculate the mount of px while scrolling manually: manualScrollSpeed / scrollSpeedDivider.
          manualSpeed: 750
        },
        // Query selectors for elements which will be used as boundaries for the selection.
        boundaries: ['.table-grid-wrapper']
      });
    }
  }]);

  return GridSelection;
}();

exports.default = GridSelection;

_defineProperty(GridSelection, "selectedCells", void 0);

_defineProperty(GridSelection, "selectedTh", void 0);

_defineProperty(GridSelection, "selectedTd", void 0);

_defineProperty(GridSelection, "selection", void 0);
},{}],"class/GridKeyboardSnippets.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GridSelection = _interopRequireDefault(require("./GridSelection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GridKeyboardSnippets = /*#__PURE__*/function () {
  function GridKeyboardSnippets() {
    _classCallCheck(this, GridKeyboardSnippets);
  }

  _createClass(GridKeyboardSnippets, null, [{
    key: "copyTextFromSelectedCells",
    value: function copyTextFromSelectedCells() {
      if (_GridSelection.default.selectedCells.length) {
        GridKeyboardSnippets.textForClipBoard = '';
        GridKeyboardSnippets.textForTable = '';

        for (var i = 0; i < _GridSelection.default.selectedCells.length; i++) {
          GridKeyboardSnippets.textForClipBoard += _GridSelection.default.selectedCells[i].querySelectorAll('h3, div.cell-text')[0].textContent + ' ';
          GridKeyboardSnippets.textForTable += _GridSelection.default.selectedCells[i].querySelectorAll('h3, div.cell-text')[0].textContent + '/&!/';
        }

        GridKeyboardSnippets.textForTable = GridKeyboardSnippets.textForTable.slice(0, GridKeyboardSnippets.textForTable.length - 4);
      }
    }
  }, {
    key: "copyTextFromSelection",
    value: function copyTextFromSelection() {
      if (!_GridSelection.default.selectedCells.length && GridKeyboardSnippets.SELECTION_OBJ.rangeCount) {
        GridKeyboardSnippets.textForClipBoard = '';
        GridKeyboardSnippets.textForTable = '';
        GridKeyboardSnippets.textForClipBoard = GridKeyboardSnippets.SELECTION_OBJ.toString();
        GridKeyboardSnippets.textForTable = GridKeyboardSnippets.SELECTION_OBJ.toString() + '/&!/';
        GridKeyboardSnippets.textForTable = GridKeyboardSnippets.textForTable.slice(0, GridKeyboardSnippets.textForTable.length - 4);
      }
    }
  }, {
    key: "copyTextMain",
    value: function copyTextMain(e) {
      GridKeyboardSnippets.keysPressed[e.key] = true;

      if (GridKeyboardSnippets.keysPressed['Control'] && e.key === 'c' && (GridKeyboardSnippets.SELECTION_OBJ.rangeCount || _GridSelection.default.selectedCells)) {
        GridKeyboardSnippets.copyTextFromSelectedCells();
        GridKeyboardSnippets.copyTextFromSelection();
        console.log(GridKeyboardSnippets.textForClipBoard);
        GridKeyboardSnippets.clipBoard.writeText(GridKeyboardSnippets.textForClipBoard);
      }
    }
  }, {
    key: "pasteText",
    value: function pasteText(e) {
      if (_GridSelection.default.selectedCells.length && GridKeyboardSnippets.keysPressed['Control'] && e.key === 'v') {
        GridKeyboardSnippets.keysPressed[e.key] = true;
        var textArr = GridKeyboardSnippets.textForTable.split('/&!/').length > 1 ? GridKeyboardSnippets.textForTable.split('/&!/') : [GridKeyboardSnippets.textForTable];
        var textIndex = 0;

        for (var i = 0; i < _GridSelection.default.selectedCells.length; i++) {
          _GridSelection.default.selectedCells[i].querySelectorAll('h3, div.cell-text')[0].textContent = textArr[textIndex];
          textIndex++;

          if (textIndex === textArr.length) {
            textIndex = 0;
          }
        }
      }
    }
  }, {
    key: "deleteCellTextOnKeyDown",
    value: function deleteCellTextOnKeyDown(e) {
      if ((e.key === 'Backspace' || e.key === 'Delete') && _GridSelection.default.selectedCells.length) {
        e.preventDefault();

        _GridSelection.default.selectedCells.forEach(function (el) {
          el.querySelectorAll('h3, div.cell-text')[0].textContent = '';
        });
      }
    }
  }, {
    key: "cutFromTable",
    value: function cutFromTable(event) {
      GridKeyboardSnippets.keysPressed[event.key] = true;

      if (GridKeyboardSnippets.keysPressed['Control'] && event.key == 'x') {
        GridKeyboardSnippets.copyTextFromSelectedCells();
        GridKeyboardSnippets.copyTextFromSelection();
        GridKeyboardSnippets.clipBoard.writeText(GridKeyboardSnippets.textForClipBoard);

        _GridSelection.default.selectedCells.forEach(function (el) {
          el.querySelectorAll('h3, div.cell-text')[0].textContent = '';
        });
      }
    }
  }, {
    key: "cleanKeysPressed",
    value: function cleanKeysPressed(event) {
      delete GridKeyboardSnippets.keysPressed[event.key];
    }
  }]);

  return GridKeyboardSnippets;
}();

exports.default = GridKeyboardSnippets;

_defineProperty(GridKeyboardSnippets, "textForClipBoard", void 0);

_defineProperty(GridKeyboardSnippets, "textForTable", void 0);

_defineProperty(GridKeyboardSnippets, "clipBoard", navigator.clipboard);

_defineProperty(GridKeyboardSnippets, "SELECTION_OBJ", window.getSelection());

_defineProperty(GridKeyboardSnippets, "keysPressed", {});
},{"./GridSelection":"class/GridSelection.js"}],"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","class/GridKeyboardSnippets.js"], null)
//# sourceMappingURL=/GridKeyboardSnippets.ecf9ee35.js.map