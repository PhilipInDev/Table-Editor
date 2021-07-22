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
})({"class/GridResp.js":[function(require,module,exports) {
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
},{"./GridOnClick":"class/GridOnClick.js"}],"class/GridOnClick.js":[function(require,module,exports) {
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
},{"./GridResp":"class/GridResp.js"}],"class/GridContextMenu.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GridOnClick = _interopRequireDefault(require("./GridOnClick"));

var _GridView = _interopRequireDefault(require("./GridView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GridContextMenu = /*#__PURE__*/function () {
  function GridContextMenu() {
    _classCallCheck(this, GridContextMenu);
  }

  _createClass(GridContextMenu, null, [{
    key: "contextmenuPopUp",
    value: function contextmenuPopUp(e) {
      e.preventDefault();

      _GridOnClick.default.cellOnClick(e);

      GridContextMenu.currentTarget = e.target.parentNode;

      if (e.target.getAttribute('class') === 'cell-text' || e.target.tagName === 'H3') {
        GridContextMenu.POP_UP_BOX.style.top = GridContextMenu.pageY + 'px';
        GridContextMenu.POP_UP_BOX.style.left = GridContextMenu.pageX + 'px';
        GridContextMenu.POP_UP_BOX.style.display = 'block';
        GridContextMenu.undoEl.style.pointerEvents = 'none';
        GridContextMenu.undoEl.classList.add('untarget');
        GridContextMenu.redoEl.style.pointerEvents = 'none';
        GridContextMenu.redoEl.classList.add('untarget');

        if (GridContextMenu.undoArr.length) {
          GridContextMenu.undoEl.style.pointerEvents = 'auto';
          GridContextMenu.undoEl.classList.remove('untarget');
          console.log('pointer');
        }

        if (GridContextMenu.redoArr.length) {
          GridContextMenu.redoEl.style.pointerEvents = 'auto';
          GridContextMenu.redoEl.classList.remove('untarget');
        }
      }
    }
  }, {
    key: "contextMenuClickControler",
    value: function contextMenuClickControler(e) {
      if (e.target.getAttribute('id') === 'row-above' && GridContextMenu.currentTarget.parentNode.rowIndex !== 0) {
        GridContextMenu.insertRowAbove();
        GridContextMenu.undoArr.push({
          method: 'insertRowAbove',
          target: GridContextMenu.currentTarget
        });
      }

      if (e.target.getAttribute('id') === 'row-below') {
        GridContextMenu.insertRowBelow();
        GridContextMenu.undoArr.push({
          method: 'insertRowBelow',
          target: GridContextMenu.currentTarget
        });
      }

      if (e.target.getAttribute('id') === 'col-leftside') {
        GridContextMenu.insertColumnLeftside();
        GridContextMenu.undoArr.push({
          method: 'insertColumnLeftside',
          target: GridContextMenu.currentTarget
        });
      }

      if (e.target.getAttribute('id') === 'col-rightside') {
        GridContextMenu.insertColumnRightside();
        GridContextMenu.undoArr.push({
          method: 'insertColumnRightside',
          target: GridContextMenu.currentTarget
        });
      }

      if (e.target.getAttribute('id') === 'remove-row' && GridContextMenu.currentTarget.tagName === 'TD') {
        GridContextMenu.removeRow();
        GridContextMenu.undoArr.push({
          method: 'removeRow',
          index: GridContextMenu.rowInd,
          row: GridContextMenu.rowToRecover
        });
      }

      if (e.target.getAttribute('id') === 'remove-col') {
        GridContextMenu.removeColumn();
        GridContextMenu.undoArr.push({
          method: 'removeColumn',
          index: GridContextMenu.cellInd,
          column: GridContextMenu.columnToRecover
        });
        GridContextMenu.columnToRecover = [];
      }

      if (e.target.getAttribute('id') === 'undo') {
        GridContextMenu.undo(GridContextMenu.undoArr);
      }

      if (e.target.getAttribute('id') === 'redo') {
        GridContextMenu.redo(GridContextMenu.redoArr);
      }

      console.log(GridContextMenu.undoArr);
      console.log(GridContextMenu.redoArr);
    }
  }, {
    key: "insertRowAbove",
    value: function insertRowAbove() {
      var trToAddRowBefore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : GridContextMenu.currentTarget.parentNode;
      var newRow = document.createElement('tr');
      var newTd;
      var numOfTd = trToAddRowBefore.querySelectorAll('td').length;

      for (var i = 0; i < numOfTd; i++) {
        newTd = document.createElement('td');
        newTd.innerHTML = "<div class=\"cell-text\" tabindex=\"-1\"></div>";
        newTd.setAttribute('contenteditable', 'false');
        newRow.append(newTd);
      }

      trToAddRowBefore.parentNode.insertBefore(newRow, trToAddRowBefore);
    }
  }, {
    key: "insertRowBelow",
    value: function insertRowBelow() {
      var trToAddRowBefore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : GridContextMenu.currentTarget.parentNode;
      var newRow = document.createElement('tr');
      var newTd;
      var numOfTd = trToAddRowBefore.querySelectorAll('td').length ? trToAddRowBefore.querySelectorAll('td').length : trToAddRowBefore.querySelectorAll('th').length;
      console.log(numOfTd);

      for (var i = 0; i < numOfTd; i++) {
        newTd = document.createElement('td');
        newTd.innerHTML = "<div class=\"cell-text\" tabindex=\"-1\"></div>";
        newTd.setAttribute('contenteditable', 'false');
        newRow.append(newTd);
      }

      trToAddRowBefore.after(newRow);
    }
  }, {
    key: "insertColumnLeftside",
    value: function insertColumnLeftside() {
      var columnToInsert = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : GridContextMenu.currentTarget.cellIndex;
      var TABLE_TR = _GridView.default.tableGrid.rows;
      var TABLE_WIDTH = TABLE_TR[0].querySelectorAll('th').length;
      var currentTargetIndex = index;
      var elToInsertLeft;
      var newEl;

      if (!columnToInsert.length) {
        for (var k = 0; k < TABLE_TR.length; k++) {
          if (k === 0) {
            newEl = document.createElement('th');
            newEl.innerHTML = "<h3 tabindex=\"-1\" contenteditable=\"false\"></h3> <span class=\"resize-handle\"></span>";
            columnToInsert.push(newEl);
          }

          if (k > 0) {
            newEl = document.createElement('td');
            newEl.innerHTML = "<div class=\"cell-text\" tabindex=\"-1\"></div>";
            newEl.setAttribute('contenteditable', 'false');
            columnToInsert.push(newEl);
          }
        }
      }

      for (var i = 0; i < TABLE_TR.length; i++) {
        for (var j = 0; j < TABLE_WIDTH; j++) {
          if (j === currentTargetIndex && i === 0) {
            elToInsertLeft = TABLE_TR[i].querySelectorAll('th')[currentTargetIndex];
            TABLE_TR[i].insertBefore(columnToInsert[i], elToInsertLeft);
          }

          if (j === currentTargetIndex && i !== 0) {
            elToInsertLeft = TABLE_TR[i].querySelectorAll('td')[currentTargetIndex];
            TABLE_TR[i].insertBefore(columnToInsert[i], elToInsertLeft);
          }
        }
      }

      GridContextMenu.changeNumOfColumns(TABLE_WIDTH, 1);
    }
  }, {
    key: "insertColumnRightside",
    value: function insertColumnRightside() {
      var columnToInsert = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : GridContextMenu.currentTarget.cellIndex;
      var TABLE_TR = _GridView.default.tableGrid.rows;
      var TABLE_WIDTH = TABLE_TR[0].querySelectorAll('th').length;
      var currentTargetIndex = index;
      var elToInsertRight;
      var newEl;

      if (!columnToInsert.length) {
        for (var k = 0; k < TABLE_TR.length; k++) {
          if (k === 0) {
            newEl = document.createElement('th');
            newEl.innerHTML = "<h3 tabindex=\"-1\" contenteditable=\"false\"></h3> <span class=\"resize-handle\"></span>";
            columnToInsert.push(newEl);
          }

          if (k > 0) {
            newEl = document.createElement('td');
            newEl.innerHTML = "<div class=\"cell-text\" tabindex=\"-1\"></div>";
            newEl.setAttribute('contenteditable', 'false');
            columnToInsert.push(newEl);
          }
        }
      }

      for (var i = 0; i < TABLE_TR.length; i++) {
        for (var j = 0; j < TABLE_WIDTH; j++) {
          if (j === currentTargetIndex && i === 0) {
            elToInsertRight = TABLE_TR[i].querySelectorAll('th')[currentTargetIndex];
            elToInsertRight.after(columnToInsert[i]);
          }

          if (j === currentTargetIndex && i !== 0) {
            elToInsertRight = TABLE_TR[i].querySelectorAll('td')[currentTargetIndex];
            elToInsertRight.after(columnToInsert[i]);
          }
        }
      }

      GridContextMenu.changeNumOfColumns(TABLE_WIDTH, 1);
    }
  }, {
    key: "removeRow",
    value: function removeRow() {
      var rowToRemove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : GridContextMenu.currentTarget.parentNode;
      GridContextMenu.rowToRecover = GridContextMenu.currentTarget.parentNode;
      GridContextMenu.rowInd = GridContextMenu.rowToRecover.rowIndex - 1;
      rowToRemove.remove();
    }
  }, {
    key: "removeColumn",
    value: function removeColumn() {
      var indexCell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : GridContextMenu.currentTarget.cellIndex;
      var TABLE_TR = _GridView.default.tableGrid.rows;
      var TABLE_WIDTH = TABLE_TR[0].querySelectorAll('th').length;
      var CURR_TARGET_INDEX = indexCell;

      if (indexCell > 0) {
        GridContextMenu.cellInd = {
          i: indexCell - 1,
          dir: 'right'
        };
      }

      if (indexCell === 0) {
        GridContextMenu.cellInd = {
          i: 0,
          dir: 'left'
        };
      }

      var elToRemove;

      for (var i = 0; i < TABLE_TR.length; i++) {
        for (var j = 0; j < TABLE_WIDTH; j++) {
          if (j === CURR_TARGET_INDEX) {
            elToRemove = TABLE_TR[i].children[j];
            GridContextMenu.columnToRecover.push(elToRemove);
            elToRemove.remove();
          }
        }
      }

      GridContextMenu.changeNumOfColumns(TABLE_WIDTH, -1);
    }
  }, {
    key: "undo",
    value: function undo(undoArr) {
      var actionToUndo = undoArr[undoArr.length - 1];

      if (actionToUndo) {
        if (actionToUndo.method === 'insertRowAbove') {
          _GridView.default.tableGrid.deleteRow(actionToUndo.target.parentNode.rowIndex - 1);
        }

        if (actionToUndo.method === 'insertRowBelow') {
          _GridView.default.tableGrid.deleteRow(actionToUndo.target.parentNode.rowIndex + 1);
        }

        if (actionToUndo.method === 'insertColumnLeftside') {
          GridContextMenu.removeColumn(actionToUndo.target.cellIndex - 1);
        }

        if (actionToUndo.method === 'insertColumnRightside') {
          GridContextMenu.removeColumn(actionToUndo.target.cellIndex + 1);
        }

        if (actionToUndo.method === 'removeRow') {
          var rowInsertNearTo = _GridView.default.tableGrid.rows[actionToUndo.index];
          rowInsertNearTo.after(actionToUndo.row);
        }

        if (actionToUndo.method === 'removeColumn') {
          if (actionToUndo.index.dir === 'right') GridContextMenu.insertColumnRightside(actionToUndo.column, actionToUndo.index.i);
          if (actionToUndo.index.dir === 'left') GridContextMenu.insertColumnLeftside(actionToUndo.column, actionToUndo.index.i);
        }

        GridContextMenu.redoArr.push(undoArr.pop());
      }
    }
  }, {
    key: "redo",
    value: function redo(redoArr) {
      var actionToRedo = redoArr[redoArr.length - 1];
      console.log(actionToRedo);

      if (actionToRedo) {
        if (actionToRedo.method === 'insertRowAbove') {
          GridContextMenu.insertRowAbove(actionToRedo.target.parentNode);
        }

        if (actionToRedo.method === 'insertRowBelow') {
          GridContextMenu.insertRowBelow(actionToRedo.target.parentNode);
        }

        if (actionToRedo.method === 'insertColumnLeftside') {
          GridContextMenu.insertColumnLeftside([], actionToRedo.target.cellIndex);
        }

        if (actionToRedo.method === 'insertColumnRightside') {
          GridContextMenu.insertColumnRightside([], actionToRedo.target.cellIndex);
        }

        if (actionToRedo.method === 'removeRow') {
          GridContextMenu.removeRow(actionToRedo.rowToRecover);
        }

        if (actionToRedo.method === 'removeColumn') {
          if (actionToRedo.index.dir === 'left') GridContextMenu.removeColumn(0);
          if (actionToRedo.index.dir === 'right') GridContextMenu.removeColumn(actionToRedo.index.i + 1);
        }
      }

      redoArr.pop();
    }
  }, {
    key: "changeNumOfColumns",
    value: function changeNumOfColumns(tableWidth, mod) {
      _GridView.default.tableGrid.style.gridTemplateColumns = "repeat(".concat(tableWidth + mod, ", fit-content(200px))");
    }
  }, {
    key: "clickImprove",
    value: function clickImprove() {
      document.querySelector('.wrapper').addEventListener('mousedown', function (e) {
        if (e.target !== GridContextMenu.POP_UP_BOX && e.target.tagName !== 'LI') {
          GridContextMenu.POP_UP_BOX.style.display = 'none';
        }

        if (e.target.tagName === 'LI') {
          setTimeout(function () {
            return GridContextMenu.POP_UP_BOX.style.display = 'none';
          }, 200);
        }
      });
    }
  }]);

  return GridContextMenu;
}();

exports.default = GridContextMenu;

_defineProperty(GridContextMenu, "POP_UP_BOX", document.querySelector('.popup'));

_defineProperty(GridContextMenu, "columnToRecover", []);

_defineProperty(GridContextMenu, "rowToRecover", void 0);

_defineProperty(GridContextMenu, "cellInd", void 0);

_defineProperty(GridContextMenu, "rowInd", void 0);

_defineProperty(GridContextMenu, "undoArr", []);

_defineProperty(GridContextMenu, "redoArr", []);

_defineProperty(GridContextMenu, "pageX", 0);

_defineProperty(GridContextMenu, "pageY", 0);

_defineProperty(GridContextMenu, "undoEl", document.querySelector('#undo'));

_defineProperty(GridContextMenu, "redoEl", document.querySelector('#redo'));
},{"./GridOnClick":"class/GridOnClick.js","./GridView":"class/GridView.js"}],"class/GridView.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GridContextMenu = _interopRequireDefault(require("./GridContextMenu"));

var _MenusControlers = _interopRequireDefault(require("./MenusControlers"));

var _HandleFiles = _interopRequireDefault(require("./HandleFiles"));

var _GridOnClick = _interopRequireDefault(require("./GridOnClick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GridView = /*#__PURE__*/function () {
  function GridView() {
    _classCallCheck(this, GridView);
  }

  _createClass(GridView, null, [{
    key: "drawTable",
    value: function drawTable(e) {
      if (GridView.tableGrid.getAttribute('data-file-name') !== e.target.parentNode.getAttribute('data-file-name')) {
        var currentTableValue = GridView.readGridCellsValues();

        if (GridView.tableGrid.getAttribute('data-file-name')) {
          _HandleFiles.default.changeFileValueAtStorage(GridView.tableGrid.getAttribute('data-file-name'), currentTableValue, true);
        }

        _GridOnClick.default.previousTarget = null;
        _GridContextMenu.default.undoArr = [];
        _GridContextMenu.default.redoArr = [];
        GridView.tableGrid.querySelectorAll('*').forEach(function (n) {
          return n.remove();
        });
        GridView.tableGrid.setAttribute('data-file-name', e.target.parentNode.getAttribute('data-file-name'));
        var FILE_STR = sessionStorage.getItem(e.target.parentNode.getAttribute('data-file-name'));
        var FILE = JSON.parse(FILE_STR);

        var fileArr = _HandleFiles.default.csvToArray(FILE.result);

        var TABLE_WIDTH = fileArr[0].length;
        console.log(fileArr);
        var fileRow = [];
        var tr, th, td;
        GridView.tableGrid.append(GridView.thead);
        GridView.tableGrid.append(GridView.tbody);

        for (var i = 0; i < fileArr.length; i++) {
          fileRow = fileArr[i];
          tr = document.createElement('tr');

          for (var j = 0; j < fileRow.length; j++) {
            if (i === 0 && fileRow.length) {
              th = document.createElement('th');
              th.innerHTML = "<h3 contenteditable=\"false\" tabindex=\"-1\">".concat(fileRow[j], "</h3><span class=\"resize-handle\">");
              tr.append(th);
            }

            if (i > 0 && fileRow.length) {
              td = document.createElement('td');
              td.innerHTML = "<div class=\"cell-text\" contenteditable=\"false\" tabindex=\"-1\">".concat(fileRow[j], "</div>");
              tr.append(td);
            }
          }

          if (i === 0) {
            GridView.tableGrid.querySelector('thead').append(tr);
          }

          if (i > 0) {
            GridView.tableGrid.querySelector('tbody').append(tr);
          }
        }

        _GridContextMenu.default.changeNumOfColumns(TABLE_WIDTH, 0);
      }
    }
  }, {
    key: "readGridCellsValues",
    value: function readGridCellsValues() {
      var allCells = GridView.tableGrid.querySelectorAll('h3, .cell-text');
      var tableWidth = GridView.tableGrid.querySelectorAll('h3').length;
      var result = '';

      var VALUES_READER = function VALUES_READER(el, ind, tableWidth, isComma) {
        if ((ind + 1) % tableWidth !== 0) {
          result += isComma ? '"' + el.textContent + '",' : el.textContent + ',';
        }

        if ((ind + 1) % tableWidth === 0 && ind !== allCells.length && ind !== 0) {
          result += isComma ? '"' + el.textContent + '"' : el.textContent;
          result += '\n';
        }
      };

      allCells.forEach(function (el, ind) {
        if (!el.textContent.includes(',')) {
          VALUES_READER(el, ind, tableWidth, false);
        }

        if (el.textContent.includes(',')) {
          VALUES_READER(el, ind, tableWidth, true);
        }
      });
      return result.trim();
    }
  }]);

  return GridView;
}();

exports.default = GridView;

_defineProperty(GridView, "tableGrid", document.querySelector('.table-grid'));

_defineProperty(GridView, "tableWrapper", document.querySelector('.table-grid-wrapper'));

_defineProperty(GridView, "th", document.createElement('th'));

_defineProperty(GridView, "td", document.createElement('td'));

_defineProperty(GridView, "tr", document.createElement('tr'));

_defineProperty(GridView, "thead", document.createElement('thead'));

_defineProperty(GridView, "tbody", document.createElement('tbody'));

_defineProperty(GridView, "unsavedTables", {});
},{"./GridContextMenu":"class/GridContextMenu.js","./MenusControlers":"class/MenusControlers.js","./HandleFiles":"class/HandleFiles.js","./GridOnClick":"class/GridOnClick.js"}],"class/MenusControlers.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GridView = _interopRequireDefault(require("./GridView"));

var _HandleFiles = _interopRequireDefault(require("./HandleFiles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MenusControlers = /*#__PURE__*/function () {
  function MenusControlers() {
    _classCallCheck(this, MenusControlers);
  }

  _createClass(MenusControlers, null, [{
    key: "dropAndDownOpenerInit",
    value: function dropAndDownOpenerInit(upload, buttonBox) {
      upload.onclick = function () {
        MenusControlers.dropArea.dropAreaEl.classList.toggle(MenusControlers.dropArea.classWhichOpen);
        MenusControlers.buttonClicked(buttonBox);
        MenusControlers.filePanel.filePanelEl.classList.remove(MenusControlers.filePanel.filePanelOpen);

        if (MenusControlers.filePanel.fileEmptyCaution) {
          MenusControlers.filePanel.fileEmptyCaution.classList.remove(MenusControlers.filePanel.fileEmptyCautionOpen);
        }

        document.querySelectorAll(MenusControlers.filePanel.fileBoxClass).forEach(function (elem) {
          elem.classList.remove(MenusControlers.filePanel.fileBoxOpen);
        });
      };
    }
  }, {
    key: "filePanelOpenerInit",
    value: function filePanelOpenerInit(openButton, buttonBox) {
      openButton.onclick = function () {
        MenusControlers.filePanel.filePanelEl.classList.toggle(MenusControlers.filePanel.filePanelOpen);
        var fileBoxes = document.querySelectorAll(MenusControlers.filePanel.fileBoxClass);
        var transitionTime = 0.1;
        var STEP = 0.12;
        MenusControlers.buttonClicked(buttonBox);
        MenusControlers.dropArea.dropAreaEl.classList.remove(MenusControlers.dropArea.classWhichOpen);

        if (MenusControlers.filePanel.fileEmptyCaution) {
          MenusControlers.filePanel.fileEmptyCaution.classList.toggle(MenusControlers.filePanel.fileEmptyCautionOpen);
        }

        if (MenusControlers.filePanel.fileEmptyCaution && sessionStorage.length !== 0) {
          MenusControlers.filePanel.fileEmptyCaution.classList.remove(MenusControlers.filePanel.fileEmptyCautionOpen);
        }

        fileBoxes.forEach(function (elem) {
          elem.classList.toggle(MenusControlers.filePanel.fileBoxOpen);
          elem.style.transition = "width ".concat(transitionTime, "s ease .2s, height .2s ease 0s");
          transitionTime += STEP;
        });
      };
    }
  }, {
    key: "buttonClicked",
    value: function buttonClicked(buttonBox) {
      var bool = buttonBox.classList.contains('menu-controlers-clicked');
      document.querySelectorAll('.menu-controlers-clicked').forEach(function (elem) {
        elem.classList.remove('menu-controlers-clicked');
      });

      if (!bool) {
        buttonBox.classList.add('menu-controlers-clicked');
      }
    }
  }, {
    key: "listenAndAddChangesToFileName",
    value: function listenAndAddChangesToFileName() {
      MenusControlers.filePanel.filePanelEl.addEventListener('focusout', function (e) {
        if (e.target.getAttribute('class') === MenusControlers.filePanel.fileNameClass) {
          var ssFileObj = JSON.parse(sessionStorage.getItem(e.target.parentNode.getAttribute('data-file-name')));
          ssFileObj.name = e.target.textContent;
          sessionStorage.setItem(e.target.parentNode.getAttribute('data-file-name'), JSON.stringify(ssFileObj));
        }
      });
    }
  }, {
    key: "addRemoveOnClick",
    value: function addRemoveOnClick(storageName) {
      for (var _len = arguments.length, removeButtons = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        removeButtons[_key - 1] = arguments[_key];
      }

      removeButtons.forEach(function (elem) {
        elem.onclick = function () {
          MenusControlers.removeFile(storageName);
        };
      });
    }
  }, {
    key: "onclickControllerFilePanel",
    value: function onclickControllerFilePanel() {
      MenusControlers.filePanel.filePanelEl.onclick = function (e) {
        if (e.target.getAttribute('class') === 'file-panel__save-file-as') {
          document.querySelector('.save-as').classList.add('open-disp-flex-op-vis');
          document.querySelector('body').classList.add('lock-budy');
          document.querySelector('.save-as').downloadMethod = _HandleFiles.default.downloadFile;
          document.querySelector('.save-as').storageName = e.target.parentNode.getAttribute('data-file-name');
          window.addEventListener('click', _HandleFiles.default.downloadFilesTypeChooser);
        }

        if (e.target.getAttribute('class') === 'file-panel__download-file') {
          _HandleFiles.default.downloadFile(null, e.target.parentNode.getAttribute('data-file-name'));
        }

        if (e.target.getAttribute('class') === 'file-panel__open-file') {
          _GridView.default.drawTable(e);
        }

        if (e.target.getAttribute('class') === 'file-panel__delete-all') {
          var SS_LENGTH = sessionStorage.length;
          var ssKeys = [];

          for (var i = 0; i < SS_LENGTH; i++) {
            ssKeys.push(sessionStorage.key(i));
          }

          for (var j = 0; j < ssKeys.length; j++) {
            MenusControlers.removeFile(ssKeys[j]);
          }
        }

        if (e.target.getAttribute('class') === 'file-panel__download-all' && sessionStorage.length > 0) {
          document.querySelector('.save-as').classList.add('open-disp-flex-op-vis');
          document.querySelector('body').classList.add('lock-budy');
          document.querySelector('.save-as').downloadMethod = _HandleFiles.default.zipAndDownloadAllFiles;
          window.addEventListener('click', _HandleFiles.default.downloadFilesTypeChooser);
        }
      };
    }
  }, {
    key: "removeFile",
    value: function removeFile(storageName) {
      sessionStorage.removeItem("".concat(storageName));

      var _iterator = _createForOfIteratorHelper(document.querySelectorAll("[data-file-name=\"".concat(storageName, "\"]"))),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;

          if (el !== _GridView.default.tableGrid) {
            el.remove();
            continue;
          }

          _GridView.default.tableGrid.querySelectorAll('*').forEach(function (n) {
            return n.remove();
          });

          _GridView.default.tableGrid.setAttribute('data-file-name', '');
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (sessionStorage.length === 0) {
        MenusControlers.filePanel.fileEmptyCaution.classList.add(MenusControlers.filePanel.fileEmptyCautionOpen);
      }
    }
  }]);

  return MenusControlers;
}();

exports.default = MenusControlers;

_defineProperty(MenusControlers, "dropArea", {
  dropAreaEl: document.querySelector('#dropArea'),
  classWhichOpen: 'open-upload'
});

_defineProperty(MenusControlers, "filePanel", {
  filePanelEl: document.querySelector('.file-panel'),
  filePanelOpen: 'open-file-panel',
  fileBoxClass: '.file-panel__file-box',
  fileBoxOpen: 'open-file-box',
  fileNameClass: 'file-panel__file-name',
  fileEmptyCaution: document.querySelector('.file-panel__empty-caution'),
  fileEmptyCautionOpen: 'open-fp-empty-caution'
});
},{"./GridView":"class/GridView.js","./HandleFiles":"class/HandleFiles.js"}],"../../../../../../usr/lib/node_modules/parcel-bundler/node_modules/base64-js/index.js":[function(require,module,exports) {
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

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"../../../../../../usr/lib/node_modules/parcel-bundler/node_modules/ieee754/index.js":[function(require,module,exports) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
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
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

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
  var eLen = (nBytes * 8) - mLen - 1
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
      m = ((value * c) - 1) * Math.pow(2, mLen)
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

},{}],"../../../../../../usr/lib/node_modules/parcel-bundler/node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../../../../../../usr/lib/node_modules/parcel-bundler/node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

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

},{"base64-js":"../../../../../../usr/lib/node_modules/parcel-bundler/node_modules/base64-js/index.js","ieee754":"../../../../../../usr/lib/node_modules/parcel-bundler/node_modules/ieee754/index.js","isarray":"../../../../../../usr/lib/node_modules/parcel-bundler/node_modules/isarray/index.js","buffer":"../../../../../../usr/lib/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"node_modules/jszip/dist/jszip.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
var Buffer = require("buffer").Buffer;
/*!

JSZip v3.6.0 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).JSZip=e()}}(function(){return function s(a,o,u){function h(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(f)return f(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return h(t||e)},i,i.exports,s,a,o,u)}return o[r].exports}for(var f="function"==typeof require&&require,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(e,t,r){"use strict";var c=e("./utils"),l=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,u=[],h=0,f=e.length,l=f,d="string"!==c.getTypeOf(e);h<e.length;)l=f-h,n=d?(t=e[h++],r=h<f?e[h++]:0,h<f?e[h++]:0):(t=e.charCodeAt(h++),r=h<f?e.charCodeAt(h++):0,h<f?e.charCodeAt(h++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<l?(15&r)<<2|n>>6:64,o=2<l?63&n:64,u.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return u.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,u=0;if("data:"===e.substr(0,"data:".length))throw new Error("Invalid base64 input, it looks like a data url.");var h,f=3*(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(h=l.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),h[u++]=t,64!==s&&(h[u++]=r),64!==a&&(h[u++]=n);return h}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(e){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils"),a=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r){var n=a,i=0+r;e^=-1;for(var s=0;s<i;s++)e=e>>>8^n[255&(e^t[s])];return-1^e}(0|t,e,e.length):function(e,t,r){var n=a,i=0+r;e^=-1;for(var s=0;s<i;s++)e=e>>>8^n[255&(e^t.charCodeAt(s))];return-1^e}(0|t,e,e.length):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function u(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(u,a),u.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},u.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},u.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},u.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new u("Deflate",e)},r.uncompressWorker=function(){return new u("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function I(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function i(e,t,r,n,i,s){var a,o,u=e.file,h=e.compression,f=s!==B.utf8encode,l=O.transformTo("string",s(u.name)),d=O.transformTo("string",B.utf8encode(u.name)),c=u.comment,p=O.transformTo("string",s(c)),m=O.transformTo("string",B.utf8encode(c)),_=d.length!==u.name.length,g=m.length!==c.length,v="",b="",w="",y=u.dir,k=u.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),f||!_&&!g||(S|=2048);var z,E=0,C=0;y&&(E|=16),"UNIX"===i?(C=798,E|=((z=u.unixPermissions)||(z=y?16893:33204),(65535&z)<<16)):(C=20,E|=63&(u.dosPermissions||0)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v+="up"+I((b=I(1,1)+I(T(l),4)+d).length,2)+b),g&&(v+="uc"+I((w=I(1,1)+I(T(p),4)+m).length,2)+w);var A="";return A+="\n\0",A+=I(S,2),A+=h.magic,A+=I(a,2),A+=I(o,2),A+=I(x.crc32,4),A+=I(x.compressedSize,4),A+=I(x.uncompressedSize,4),A+=I(l.length,2),A+=I(v.length,2),{fileRecord:R.LOCAL_FILE_HEADER+A+l+v,dirRecord:R.CENTRAL_FILE_HEADER+I(C,2)+A+I(p.length,2)+"\0\0\0\0"+I(E,4)+I(n,4)+l+v+p}}var O=e("../utils"),s=e("../stream/GenericWorker"),B=e("../utf8"),T=e("../crc32"),R=e("../signature");function n(e,t,r,n){s.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}O.inherits(n,s),n.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,s.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},n.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=i(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},n.prototype.closedSource=function(e){this.accumulate=!1;var t,r=this.streamFiles&&!e.file.dir,n=i(e,r,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(n.dirRecord),r)this.push({data:(t=e,R.DATA_DESCRIPTOR+I(t.crc32,4)+I(t.compressedSize,4)+I(t.uncompressedSize,4)),meta:{percent:100}});else for(this.push({data:n.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},n.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r,n,i,s,a,o,u=this.bytesWritten-e,h=(r=this.dirRecords.length,n=u,i=e,s=this.zipComment,a=this.encodeFileName,o=O.transformTo("string",a(s)),R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+I(r,2)+I(r,2)+I(n,4)+I(i,4)+I(o.length,2)+o);this.push({data:h,meta:{percent:100}})},n.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},n.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},n.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},n.prototype.error=function(e){var t=this._sources;if(!s.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},n.prototype.lock=function(){s.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=n},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var h=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),u=0;try{e.forEach(function(e,t){u++;var r=function(e,t){var r=e||t,n=h[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=u}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files={},this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.5.0",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var n=e("./utils"),i=e("./external"),o=e("./utf8"),u=e("./zipEntries"),s=e("./stream/Crc32Probe"),h=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new s);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,s){var a=this;return s=n.extend(s||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:o.utf8decode}),h.isNode&&h.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):n.prepareContent("the loaded zip file",e,!0,s.optimizedBinaryString,s.base64).then(function(e){var t=new u(s);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(s.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n];a.file(i.fileNameStr,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:s.createFolders})}return t.zipComment.length&&(a.comment=t.zipComment),a})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=f.getTypeOf(t),s=f.extend(r||{},d);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=h(e)),s.createFolders&&(n=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""}(e))&&g.call(this,n,!0);var a,o="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!o),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string"),a=t instanceof c||t instanceof l?t:m.isNode&&m.isStream(t)?new _(e,t):f.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var u=new p(e,a,s);this.files[e]=u}function h(e){return"/"!==e.slice(-1)&&(e+="/"),e}var i=e("./utf8"),f=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),d=e("./defaults"),c=e("./compressedObject"),p=e("./zipObject"),o=e("./generate"),m=e("./nodejsUtils"),_=e("./nodejs/NodejsStreamInputAdapter"),g=function(e,t){return t=void 0!==t?t:d.createFolders,e=h(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function u(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)this.files.hasOwnProperty(t)&&(n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n))},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(u(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(u(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=g.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(e){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=f.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");f.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(e){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(e){},lastIndexOfSignature:function(e){},readAndCheckSignature:function(e){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),u=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new u(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),f=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function u(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}u.prototype={accumulate:function(e){return o=this,u=e,new a.Promise(function(t,r){var n=[],i=o._internalType,s=o._outputType,a=o._mimeType;o.on("data",function(e,t){n.push(e),u&&u(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return f.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()});var o,u},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=u},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),u=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),h=new Array(256),i=0;i<256;i++)h[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function f(){n.call(this,"utf-8 encode")}h[254]=h[254]=1,s.utf8encode=function(e){return u.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=u.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return u.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=h[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(u.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(u.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(u.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+h[e[r]]>t?r:t}(t),i=t;n!==t.length&&(u.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(f,n),f.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=f},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,o){"use strict";var u=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),n=e("set-immediate-shim"),f=e("./external");function i(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}o.newBlob=function(t,r){o.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var s={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return u.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return u.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function a(e){var t=65536,r=o.getTypeOf(e),n=!0;if("uint8array"===r?n=s.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=s.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return s.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return s.stringifyByChar(e)}function d(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}o.applyFromCharCode=a;var c={};c.string={string:i,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:a,array:i,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return a(new Uint8Array(e))},array:function(e){return d(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:i,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:a,array:function(e){return d(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:i,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:a,array:function(e){return d(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return d(e,new Uint8Array(e.length))},nodebuffer:i},o.transformTo=function(e,t){if(t=t||"",!e)return t;o.checkSupport(e);var r=o.getTypeOf(t);return c[r][e](t)},o.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":u.nodebuffer&&r.isBuffer(e)?"nodebuffer":u.uint8array&&e instanceof Uint8Array?"uint8array":u.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},o.checkSupport=function(e){if(!u[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},o.MAX_VALUE_16BITS=65535,o.MAX_VALUE_32BITS=-1,o.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},o.delay=function(e,t,r){n(function(){e.apply(r||null,t||[])})},o.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},o.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])arguments[e].hasOwnProperty(t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},o.prepareContent=function(n,e,i,s,a){return f.Promise.resolve(e).then(function(n){return u.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new f.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):n}).then(function(e){var t,r=o.getTypeOf(e);return r?("arraybuffer"===r?e=o.transformTo("uint8array",e):"string"===r&&(a?e=h.decode(e):i&&!0!==s&&(e=l(t=e,u.uint8array?new Uint8Array(t.length):new Array(t.length)))),e):f.Promise.reject(new Error("Can't read the data of '"+n+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=(e("./utf8"),e("./support"));function u(e){this.files=[],this.loadOptions=e}u.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=u},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),u=e("./compressions"),h=e("./support");function f(e,t){this.options=e,this.loadOptions=t}f.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in u)if(u.hasOwnProperty(t)&&u[t].magic===e)return u[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(e){if(this.extraFields[1]){var t=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=t.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=t.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=t.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=t.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=h.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=f},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),u=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new u("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof u?this._data:new i(this._data)}};for(var h=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],f=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},l=0;l<h.length;l++)n.prototype[h[l]]=f;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,f,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(h),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){h(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(h,0)};else{var o=new t.MessageChannel;o.port1.onmessage=h,r=function(){o.port2.postMessage(0)}}var u=[];function h(){var e,t;n=!0;for(var r=u.length;r;){for(t=u,u=[],e=-1;++e<r;)t[e]();r=u.length}n=!1}f.exports=function(e){1!==u.push(e)||n||r()}}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function h(){}var f={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==h&&c(this,e)}function u(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function l(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return f.reject(t,e)}e===t?f.reject(t,new TypeError("Cannot resolve promise with itself")):f.resolve(t,e)})}function d(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function c(t,e){var r=!1;function n(e){r||(r=!0,f.reject(t,e))}function i(e){r||(r=!0,f.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(h);return this.state!==n?l(r,this.state===a?e:t,this.outcome):this.queue.push(new u(r,e,t)),r},u.prototype.callFulfilled=function(e){f.resolve(this.promise,e)},u.prototype.otherCallFulfilled=function(e){l(this.promise,this.onFulfilled,e)},u.prototype.callRejected=function(e){f.reject(this.promise,e)},u.prototype.otherCallRejected=function(e){l(this.promise,this.onRejected,e)},f.resolve=function(e,t){var r=p(d,t);if("error"===r.status)return f.reject(e,r.value);var n=r.value;if(n)c(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},f.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){return e instanceof this?e:f.resolve(new this(h),e)},o.reject=function(e){var t=new this(h);return f.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);for(var s=new Array(n),a=0,t=-1,o=new this(h);++t<n;)u(e[t],t);return o;function u(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,f.resolve(o,s))},function(e){i||(i=!0,f.reject(o,e))})}},o.race=function(e){if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var t=e.length,r=!1;if(!t)return this.resolve([]);for(var n,i=-1,s=new this(h);++i<t;)n=e[i],this.resolve(n).then(function(e){r||(r=!0,f.resolve(s,e))},function(e){r||(r=!0,f.reject(s,e))});return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),u=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),h=Object.prototype.toString,f=0,l=-1,d=0,c=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:l,method:c,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==f)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?u.string2buf(t.dictionary):"[object ArrayBuffer]"===h.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==f)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=u.string2buf(e):"[object ArrayBuffer]"===h.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==f)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(u.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===f):2!==n||(this.onEnd(f),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===f&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var d=e("./zlib/inflate"),c=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=c.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=d.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,d.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,u=this.strm,h=this.options.chunkSize,f=this.options.dictionary,l=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?u.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?u.input=new Uint8Array(e):u.input=e,u.next_in=0,u.avail_in=u.input.length;do{if(0===u.avail_out&&(u.output=new c.Buf8(h),u.next_out=0,u.avail_out=h),(r=d.inflate(u,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&f&&(o="string"==typeof f?p.string2buf(f):"[object ArrayBuffer]"===_.call(f)?new Uint8Array(f):f,r=d.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===l&&(r=m.Z_OK,l=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);u.next_out&&(0!==u.avail_out&&r!==m.Z_STREAM_END&&(0!==u.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(u.output,u.next_out),s=u.next_out-i,a=p.buf2string(u.output,i),u.next_out=s,u.avail_out=h-s,s&&c.arraySet(u.output,u.output,i,s,0),this.onData(a)):this.onData(c.shrinkBuf(u.output,u.next_out)))),0===u.avail_in&&0===u.avail_out&&(l=!0)}while((0<u.avail_in||0===u.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=d.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(u.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=c.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var u=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var h=new u.Buf8(256),n=0;n<256;n++)h[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function f(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,u.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}h[254]=h[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new u.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return f(e,e.length)},r.binstring2buf=function(e){for(var t=new u.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=h[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return f(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+h[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var u,d=e("../utils/common"),h=e("./trees"),c=e("./adler32"),p=e("./crc32"),n=e("./messages"),f=0,l=0,m=-2,i=2,_=8,s=286,a=30,o=19,g=2*s+1,v=15,b=3,w=258,y=w+b+1,k=42,x=113;function S(e,t){return e.msg=n[t],t}function z(e){return(e<<1)-(4<e?9:0)}function E(e){for(var t=e.length;0<=--t;)e[t]=0}function C(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(d.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function A(e,t){h._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,C(e.strm)}function I(e,t){e.pending_buf[e.pending++]=t}function O(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function B(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,u=e.strstart>e.w_size-y?e.strstart-(e.w_size-y):0,h=e.window,f=e.w_mask,l=e.prev,d=e.strstart+w,c=h[s+a-1],p=h[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(h[(r=t)+a]===p&&h[r+a-1]===c&&h[r]===h[s]&&h[++r]===h[s+1]){s+=2,r++;do{}while(h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&s<d);if(n=w-(d-s),s=d-w,a<n){if(e.match_start=t,o<=(a=n))break;c=h[s+a-1],p=h[s+a]}}}while((t=l[t&f])>u&&0!=--i);return a<=e.lookahead?a:e.lookahead}function T(e){var t,r,n,i,s,a,o,u,h,f,l=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=l+(l-y)){for(d.arraySet(e.window,e.window,l,l,0),e.match_start-=l,e.strstart-=l,e.block_start-=l,t=r=e.hash_size;n=e.head[--t],e.head[t]=l<=n?n-l:0,--r;);for(t=r=l;n=e.prev[--t],e.prev[t]=l<=n?n-l:0,--r;);i+=l}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,u=e.strstart+e.lookahead,f=void 0,(h=i)<(f=a.avail_in)&&(f=h),r=0===f?0:(a.avail_in-=f,d.arraySet(o,a.input,a.next_in,f,u),1===a.state.wrap?a.adler=c(a.adler,o,f,u):2===a.state.wrap&&(a.adler=p(a.adler,o,f,u)),a.next_in+=f,a.total_in+=f,f),e.lookahead+=r,e.lookahead+e.insert>=b)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+b-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<b)););}while(e.lookahead<y&&0!==e.strm.avail_in)}function R(e,t){for(var r,n;;){if(e.lookahead<y){if(T(e),e.lookahead<y&&t===f)return 1;if(0===e.lookahead)break}if(r=0,e.lookahead>=b&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+b-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-y&&(e.match_length=B(e,r)),e.match_length>=b)if(n=h._tr_tally(e,e.strstart-e.match_start,e.match_length-b),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=b){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+b-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=h._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(A(e,!1),0===e.strm.avail_out))return 1}return e.insert=e.strstart<b-1?e.strstart:b-1,4===t?(A(e,!0),0===e.strm.avail_out?3:4):e.last_lit&&(A(e,!1),0===e.strm.avail_out)?1:2}function D(e,t){for(var r,n,i;;){if(e.lookahead<y){if(T(e),e.lookahead<y&&t===f)return 1;if(0===e.lookahead)break}if(r=0,e.lookahead>=b&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+b-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=b-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-y&&(e.match_length=B(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===b&&4096<e.strstart-e.match_start)&&(e.match_length=b-1)),e.prev_length>=b&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-b,n=h._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-b),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+b-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=b-1,e.strstart++,n&&(A(e,!1),0===e.strm.avail_out))return 1}else if(e.match_available){if((n=h._tr_tally(e,0,e.window[e.strstart-1]))&&A(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return 1}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=h._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<b-1?e.strstart:b-1,4===t?(A(e,!0),0===e.strm.avail_out?3:4):e.last_lit&&(A(e,!1),0===e.strm.avail_out)?1:2}function F(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function N(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=_,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new d.Buf16(2*g),this.dyn_dtree=new d.Buf16(2*(2*a+1)),this.bl_tree=new d.Buf16(2*(2*o+1)),E(this.dyn_ltree),E(this.dyn_dtree),E(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new d.Buf16(v+1),this.heap=new d.Buf16(2*s+1),E(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new d.Buf16(2*s+1),E(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function U(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?k:x,e.adler=2===t.wrap?0:1,t.last_flush=f,h._tr_init(t),l):S(e,m)}function P(e){var t,r=U(e);return r===l&&((t=e.state).window_size=2*t.w_size,E(t.head),t.max_lazy_match=u[t.level].max_lazy,t.good_match=u[t.level].good_length,t.nice_match=u[t.level].nice_length,t.max_chain_length=u[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=b-1,t.match_available=0,t.ins_h=0),r}function L(e,t,r,n,i,s){if(!e)return m;var a=1;if(-1===t&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||9<i||r!==_||n<8||15<n||t<0||9<t||s<0||4<s)return S(e,m);8===n&&(n=9);var o=new N;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+b-1)/b),o.window=new d.Buf8(2*o.w_size),o.head=new d.Buf16(o.hash_size),o.prev=new d.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new d.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,P(e)}u=[new F(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(T(e),0===e.lookahead&&t===f)return 1;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,A(e,!1),0===e.strm.avail_out))return 1;if(e.strstart-e.block_start>=e.w_size-y&&(A(e,!1),0===e.strm.avail_out))return 1}return e.insert=0,4===t?(A(e,!0),0===e.strm.avail_out?3:4):(e.strstart>e.block_start&&(A(e,!1),e.strm.avail_out),1)}),new F(4,4,8,4,R),new F(4,5,16,8,R),new F(4,6,32,32,R),new F(4,4,16,16,D),new F(8,16,32,32,D),new F(8,16,128,128,D),new F(8,32,128,256,D),new F(32,128,258,1024,D),new F(32,258,258,4096,D)],r.deflateInit=function(e,t){return L(e,t,_,15,8,0)},r.deflateInit2=L,r.deflateReset=P,r.deflateResetKeep=U,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?m:(e.state.gzhead=t,l):m},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?S(e,m):m;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&4!==t)return S(e,0===e.avail_out?-5:m);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===k)if(2===n.wrap)e.adler=0,I(n,31),I(n,139),I(n,8),n.gzhead?(I(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),I(n,255&n.gzhead.time),I(n,n.gzhead.time>>8&255),I(n,n.gzhead.time>>16&255),I(n,n.gzhead.time>>24&255),I(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),I(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(I(n,255&n.gzhead.extra.length),I(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(I(n,0),I(n,0),I(n,0),I(n,0),I(n,0),I(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),I(n,3),n.status=x);else{var a=_+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=x,O(n,a),0!==n.strstart&&(O(n,e.adler>>>16),O(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),C(e),i=n.pending,n.pending!==n.pending_buf_size));)I(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),C(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,I(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),C(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,I(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&C(e),n.pending+2<=n.pending_buf_size&&(I(n,255&e.adler),I(n,e.adler>>8&255),e.adler=0,n.status=x)):n.status=x),0!==n.pending){if(C(e),0===e.avail_out)return n.last_flush=-1,l}else if(0===e.avail_in&&z(t)<=z(r)&&4!==t)return S(e,-5);if(666===n.status&&0!==e.avail_in)return S(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==f&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(T(e),0===e.lookahead)){if(t===f)return 1;break}if(e.match_length=0,r=h._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(A(e,!1),0===e.strm.avail_out))return 1}return e.insert=0,4===t?(A(e,!0),0===e.strm.avail_out?3:4):e.last_lit&&(A(e,!1),0===e.strm.avail_out)?1:2}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=w){if(T(e),e.lookahead<=w&&t===f)return 1;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=b&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+w;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=w-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=b?(r=h._tr_tally(e,1,e.match_length-b),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=h._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(A(e,!1),0===e.strm.avail_out))return 1}return e.insert=0,4===t?(A(e,!0),0===e.strm.avail_out?3:4):e.last_lit&&(A(e,!1),0===e.strm.avail_out)?1:2}(n,t):u[n.level].func(n,t);if(3!==o&&4!==o||(n.status=666),1===o||3===o)return 0===e.avail_out&&(n.last_flush=-1),l;if(2===o&&(1===t?h._tr_align(n):5!==t&&(h._tr_stored_block(n,0,0,!1),3===t&&(E(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),C(e),0===e.avail_out))return n.last_flush=-1,l}return 4!==t?l:n.wrap<=0?1:(2===n.wrap?(I(n,255&e.adler),I(n,e.adler>>8&255),I(n,e.adler>>16&255),I(n,e.adler>>24&255),I(n,255&e.total_in),I(n,e.total_in>>8&255),I(n,e.total_in>>16&255),I(n,e.total_in>>24&255)):(O(n,e.adler>>>16),O(n,65535&e.adler)),C(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?l:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==k&&69!==t&&73!==t&&91!==t&&103!==t&&t!==x&&666!==t?S(e,m):(e.state=null,t===x?S(e,-3):l):m},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,u,h,f=t.length;if(!e||!e.state)return m;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==k||r.lookahead)return m;for(1===s&&(e.adler=c(e.adler,t,f,0)),r.wrap=0,f>=r.w_size&&(0===s&&(E(r.head),r.strstart=0,r.block_start=0,r.insert=0),h=new d.Buf8(r.w_size),d.arraySet(h,t,f-r.w_size,r.w_size,0),t=h,f=r.w_size),a=e.avail_in,o=e.next_in,u=e.input,e.avail_in=f,e.next_in=0,e.input=t,T(r);r.lookahead>=b;){for(n=r.strstart,i=r.lookahead-(b-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+b-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=b-1,T(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=b-1,r.match_available=0,e.next_in=o,e.input=u,e.avail_in=a,r.wrap=s,l},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,u,h,f,l,d,c,p,m,_,g,v,b,w,y,k,x,S,z,E;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,E=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),u=r.dmax,h=r.wsize,f=r.whave,l=r.wnext,d=r.window,c=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,v=(1<<r.distbits)-1;e:do{p<15&&(c+=z[n++]<<p,p+=8,c+=z[n++]<<p,p+=8),b=m[c&g];t:for(;;){if(c>>>=w=b>>>24,p-=w,0==(w=b>>>16&255))E[s++]=65535&b;else{if(!(16&w)){if(0==(64&w)){b=m[(65535&b)+(c&(1<<w)-1)];continue t}if(32&w){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}y=65535&b,(w&=15)&&(p<w&&(c+=z[n++]<<p,p+=8),y+=c&(1<<w)-1,c>>>=w,p-=w),p<15&&(c+=z[n++]<<p,p+=8,c+=z[n++]<<p,p+=8),b=_[c&v];r:for(;;){if(c>>>=w=b>>>24,p-=w,!(16&(w=b>>>16&255))){if(0==(64&w)){b=_[(65535&b)+(c&(1<<w)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&b,p<(w&=15)&&(c+=z[n++]<<p,(p+=8)<w&&(c+=z[n++]<<p,p+=8)),u<(k+=c&(1<<w)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(c>>>=w,p-=w,(w=s-a)<k){if(f<(w=k-w)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=d,(x=0)===l){if(x+=h-w,w<y){for(y-=w;E[s++]=d[x++],--w;);x=s-k,S=E}}else if(l<w){if(x+=h+l-w,(w-=l)<y){for(y-=w;E[s++]=d[x++],--w;);if(x=0,l<y){for(y-=w=l;E[s++]=d[x++],--w;);x=s-k,S=E}}}else if(x+=l-w,w<y){for(y-=w;E[s++]=d[x++],--w;);x=s-k,S=E}for(;2<y;)E[s++]=S[x++],E[s++]=S[x++],E[s++]=S[x++],y-=3;y&&(E[s++]=S[x++],1<y&&(E[s++]=S[x++]))}else{for(x=s-k;E[s++]=E[x++],E[s++]=E[x++],E[s++]=E[x++],2<(y-=3););y&&(E[s++]=E[x++],1<y&&(E[s++]=E[x++]))}break}}break}}while(n<i&&s<o);n-=y=p>>3,c&=(1<<(p-=y<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=c,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),T=e("./inffast"),R=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function u(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function h(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=u(e,t))!==N&&(e.state=null),r):U}var f,l,d=!0;function j(e){if(d){var t;for(f=new I.Buf32(512),l=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(R(D,e.lens,0,288,f,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;R(F,e.lens,0,32,l,0,e.work,{bits:5}),d=!1}e.lencode=f,e.lenbits=9,e.distcode=l,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=u,r.inflateResetKeep=a,r.inflateInit=function(e){return h(e,15)},r.inflateInit2=h,r.inflate=function(e,t){var r,n,i,s,a,o,u,h,f,l,d,c,p,m,_,g,v,b,w,y,k,x,S,z,E=0,C=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,u=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,h=r.hold,f=r.bits,l=o,d=u,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(2&r.wrap&&35615===h){C[r.check=0]=255&h,C[1]=h>>>8&255,r.check=B(r.check,C,2,0),f=h=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&h)<<8)+(h>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&h)){e.msg="unknown compression method",r.mode=30;break}if(f-=4,k=8+(15&(h>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&h?10:12,f=h=0;break;case 2:for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(r.flags=h,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=h>>8&1),512&r.flags&&(C[0]=255&h,C[1]=h>>>8&255,r.check=B(r.check,C,2,0)),f=h=0,r.mode=3;case 3:for(;f<32;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.head&&(r.head.time=h),512&r.flags&&(C[0]=255&h,C[1]=h>>>8&255,C[2]=h>>>16&255,C[3]=h>>>24&255,r.check=B(r.check,C,4,0)),f=h=0,r.mode=4;case 4:for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.head&&(r.head.xflags=255&h,r.head.os=h>>8),512&r.flags&&(C[0]=255&h,C[1]=h>>>8&255,r.check=B(r.check,C,2,0)),f=h=0,r.mode=5;case 5:if(1024&r.flags){for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.length=h,r.head&&(r.head.extra_len=h),512&r.flags&&(C[0]=255&h,C[1]=h>>>8&255,r.check=B(r.check,C,2,0)),f=h=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(c=r.length)&&(c=o),c&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,c,k)),512&r.flags&&(r.check=B(r.check,n,c,s)),o-=c,s+=c,r.length-=c),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(c=0;k=n[s+c++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,n,c,s)),o-=c,s+=c,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(c=0;k=n[s+c++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,n,c,s)),o-=c,s+=c,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(h!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}f=h=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;f<32;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}e.adler=r.check=L(h),f=h=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=u,e.next_in=s,e.avail_in=o,r.hold=h,r.bits=f,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){h>>>=7&f,f-=7&f,r.mode=27;break}for(;f<3;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}switch(r.last=1&h,f-=1,3&(h>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;h>>>=2,f-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}h>>>=2,f-=2;break;case 14:for(h>>>=7&f,f-=7&f;f<32;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if((65535&h)!=(h>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&h,f=h=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(c=r.length){if(o<c&&(c=o),u<c&&(c=u),0===c)break e;I.arraySet(i,n,s,c,a),o-=c,s+=c,u-=c,a+=c,r.length-=c;break}r.mode=12;break;case 17:for(;f<14;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(r.nlen=257+(31&h),h>>>=5,f-=5,r.ndist=1+(31&h),h>>>=5,f-=5,r.ncode=4+(15&h),h>>>=4,f-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;f<3;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.lens[A[r.have++]]=7&h,h>>>=3,f-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=R(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(E=r.lencode[h&(1<<r.lenbits)-1])>>>16&255,v=65535&E,!((_=E>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(v<16)h>>>=_,f-=_,r.lens[r.have++]=v;else{if(16===v){for(z=_+2;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(h>>>=_,f-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],c=3+(3&h),h>>>=2,f-=2}else if(17===v){for(z=_+3;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}f-=_,k=0,c=3+(7&(h>>>=_)),h>>>=3,f-=3}else{for(z=_+7;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}f-=_,k=0,c=11+(127&(h>>>=_)),h>>>=7,f-=7}if(r.have+c>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;c--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=R(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=R(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=u){e.next_out=a,e.avail_out=u,e.next_in=s,e.avail_in=o,r.hold=h,r.bits=f,T(e,d),a=e.next_out,i=e.output,u=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,h=r.hold,f=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(E=r.lencode[h&(1<<r.lenbits)-1])>>>16&255,v=65535&E,!((_=E>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(g&&0==(240&g)){for(b=_,w=g,y=v;g=(E=r.lencode[y+((h&(1<<b+w)-1)>>b)])>>>16&255,v=65535&E,!(b+(_=E>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}h>>>=b,f-=b,r.back+=b}if(h>>>=_,f-=_,r.back+=_,r.length=v,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.length+=h&(1<<r.extra)-1,h>>>=r.extra,f-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(E=r.distcode[h&(1<<r.distbits)-1])>>>16&255,v=65535&E,!((_=E>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(0==(240&g)){for(b=_,w=g,y=v;g=(E=r.distcode[y+((h&(1<<b+w)-1)>>b)])>>>16&255,v=65535&E,!(b+(_=E>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}h>>>=b,f-=b,r.back+=b}if(h>>>=_,f-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=v,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.offset+=h&(1<<r.extra)-1,h>>>=r.extra,f-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===u)break e;if(c=d-u,r.offset>c){if((c=r.offset-c)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=c>r.wnext?(c-=r.wnext,r.wsize-c):r.wnext-c,c>r.length&&(c=r.length),m=r.window}else m=i,p=a-r.offset,c=r.length;for(u<c&&(c=u),u-=c,r.length-=c;i[a++]=m[p++],--c;);0===r.length&&(r.mode=21);break;case 26:if(0===u)break e;i[a++]=r.length,u--,r.mode=21;break;case 27:if(r.wrap){for(;f<32;){if(0===o)break e;o--,h|=n[s++]<<f,f+=8}if(d-=u,e.total_out+=d,r.total+=d,d&&(e.adler=r.check=r.flags?B(r.check,i,d,a-d):O(r.check,i,d,a-d)),d=u,(r.flags?h:L(h))!==r.check){e.msg="incorrect data check",r.mode=30;break}f=h=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;f<32;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(h!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}f=h=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=u,e.next_in=s,e.avail_in=o,r.hold=h,r.bits=f,(r.wsize||d!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,d-e.avail_out)?(r.mode=31,-4):(l-=e.avail_in,d-=e.avail_out,e.total_in+=l,e.total_out+=d,r.total+=d,r.wrap&&d&&(e.adler=r.check=r.flags?B(r.check,i,d,e.next_out-d):O(r.check,i,d,e.next_out-d)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==l&&0===d||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var u,h,f,l,d,c,p,m,_,g=o.bits,v=0,b=0,w=0,y=0,k=0,x=0,S=0,z=0,E=0,C=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),T=null,R=0;for(v=0;v<=15;v++)O[v]=0;for(b=0;b<n;b++)O[t[r+b]]++;for(k=g,y=15;1<=y&&0===O[y];y--);if(y<k&&(k=y),0===y)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(w=1;w<y&&0===O[w];w++);for(k<w&&(k=w),v=z=1;v<=15;v++)if(z<<=1,(z-=O[v])<0)return-1;if(0<z&&(0===e||1!==y))return-1;for(B[1]=0,v=1;v<15;v++)B[v+1]=B[v]+O[v];for(b=0;b<n;b++)0!==t[r+b]&&(a[B[t[r+b]]++]=b);if(c=0===e?(A=T=a,19):1===e?(A=F,I-=257,T=N,R-=257,256):(A=U,T=P,-1),v=w,d=s,S=b=C=0,f=-1,l=(E=1<<(x=k))-1,1===e&&852<E||2===e&&592<E)return 1;for(;;){for(p=v-S,_=a[b]<c?(m=0,a[b]):a[b]>c?(m=T[R+a[b]],A[I+a[b]]):(m=96,0),u=1<<v-S,w=h=1<<x;i[d+(C>>S)+(h-=u)]=p<<24|m<<16|_|0,0!==h;);for(u=1<<v-1;C&u;)u>>=1;if(0!==u?(C&=u-1,C+=u):C=0,b++,0==--O[v]){if(v===y)break;v=t[r+a[b]]}if(k<v&&(C&l)!==f){for(0===S&&(S=k),d+=w,z=1<<(x=v-S);x+S<y&&!((z-=O[x+S])<=0);)x++,z<<=1;if(E+=1<<x,1===e&&852<E||2===e&&592<E)return 1;i[f=C&l]=k<<24|x<<16|d-s|0}}return 0!==C&&(i[d+C]=v-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var o=e("../utils/common");function n(e){for(var t=e.length;0<=--t;)e[t]=0}var _=15,i=16,u=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],h=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],f=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],l=new Array(576);n(l);var d=new Array(60);n(d);var c=new Array(512);n(c);var p=new Array(256);n(p);var m=new Array(29);n(m);var g,v,b,w=new Array(30);function y(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function s(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function k(e){return e<256?c[e]:c[256+(e>>>7)]}function x(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function S(e,t,r){e.bi_valid>i-r?(e.bi_buf|=t<<e.bi_valid&65535,x(e,e.bi_buf),e.bi_buf=t>>i-e.bi_valid,e.bi_valid+=r-i):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function z(e,t,r){S(e,r[2*t],r[2*t+1])}function E(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function C(e,t,r){var n,i,s=new Array(_+1),a=0;for(n=1;n<=_;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=E(s[o]++,o))}}function A(e){var t;for(t=0;t<286;t++)e.dyn_ltree[2*t]=0;for(t=0;t<30;t++)e.dyn_dtree[2*t]=0;for(t=0;t<19;t++)e.bl_tree[2*t]=0;e.dyn_ltree[512]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function I(e){8<e.bi_valid?x(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function O(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function B(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&O(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!O(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function T(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?z(e,i,t):(z(e,(s=p[i])+256+1,t),0!==(a=u[s])&&S(e,i-=m[s],a),z(e,s=k(--n),r),0!==(a=h[s])&&S(e,n-=w[s],a)),o<e.last_lit;);z(e,256,t)}function R(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,u=t.stat_desc.elems,h=-1;for(e.heap_len=0,e.heap_max=573,r=0;r<u;r++)0!==s[2*r]?(e.heap[++e.heap_len]=h=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=h<2?++h:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=h,r=e.heap_len>>1;1<=r;r--)B(e,s,r);for(i=u;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],B(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,B(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,u=t.dyn_tree,h=t.max_code,f=t.stat_desc.static_tree,l=t.stat_desc.has_stree,d=t.stat_desc.extra_bits,c=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=_;s++)e.bl_count[s]=0;for(u[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<573;r++)p<(s=u[2*u[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),u[2*n+1]=s,h<n||(e.bl_count[s]++,a=0,c<=n&&(a=d[n-c]),o=u[2*n],e.opt_len+=o*(s+a),l&&(e.static_len+=o*(f[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)h<(i=e.heap[--r])||(u[2*i+1]!==s&&(e.opt_len+=(s-u[2*i+1])*u[2*i],u[2*i+1]=s),n--)}}(e,t),C(s,h,e.bl_count)}function D(e,t,r){var n,i,s=-1,a=t[1],o=0,u=7,h=4;for(0===a&&(u=138,h=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<u&&i===a||(o<h?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[32]++):o<=10?e.bl_tree[34]++:e.bl_tree[36]++,s=i,h=(o=0)===a?(u=138,3):i===a?(u=6,3):(u=7,4))}function F(e,t,r){var n,i,s=-1,a=t[1],o=0,u=7,h=4;for(0===a&&(u=138,h=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<u&&i===a)){if(o<h)for(;z(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(z(e,i,e.bl_tree),o--),z(e,16,e.bl_tree),S(e,o-3,2)):o<=10?(z(e,17,e.bl_tree),S(e,o-3,3)):(z(e,18,e.bl_tree),S(e,o-11,7));s=i,h=(o=0)===a?(u=138,3):i===a?(u=6,3):(u=7,4)}}n(w);var N=!1;function U(e,t,r,n){var i,s,a;S(e,0+(n?1:0),3),s=t,a=r,I(i=e),x(i,a),x(i,~a),o.arraySet(i.pending_buf,i.window,s,a,i.pending),i.pending+=a}r._tr_init=function(e){N||(function(){var e,t,r,n,i,s=new Array(_+1);for(n=r=0;n<28;n++)for(m[n]=r,e=0;e<1<<u[n];e++)p[r++]=n;for(p[r-1]=n,n=i=0;n<16;n++)for(w[n]=i,e=0;e<1<<h[n];e++)c[i++]=n;for(i>>=7;n<30;n++)for(w[n]=i<<7,e=0;e<1<<h[n]-7;e++)c[256+i++]=n;for(t=0;t<=_;t++)s[t]=0;for(e=0;e<=143;)l[2*e+1]=8,e++,s[8]++;for(;e<=255;)l[2*e+1]=9,e++,s[9]++;for(;e<=279;)l[2*e+1]=7,e++,s[7]++;for(;e<=287;)l[2*e+1]=8,e++,s[8]++;for(C(l,287,s),e=0;e<30;e++)d[2*e+1]=5,d[2*e]=E(e,5);g=new y(l,u,257,286,_),v=new y(d,h,0,30,_),b=new y(new Array(0),a,0,19,7)}(),N=!0),e.l_desc=new s(e.dyn_ltree,g),e.d_desc=new s(e.dyn_dtree,v),e.bl_desc=new s(e.bl_tree,b),e.bi_buf=0,e.bi_valid=0,A(e)},r._tr_stored_block=U,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return 0;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return 1;for(t=32;t<256;t++)if(0!==e.dyn_ltree[2*t])return 1;return 0}(e)),R(e,e.l_desc),R(e,e.d_desc),a=function(e){var t;for(D(e,e.dyn_ltree,e.l_desc.max_code),D(e,e.dyn_dtree,e.d_desc.max_code),R(e,e.bl_desc),t=18;3<=t&&0===e.bl_tree[2*f[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?U(e,t,r,n):4===e.strategy||s===i?(S(e,2+(n?1:0),3),T(e,l,d)):(S(e,4+(n?1:0),3),function(e,t,r,n){var i;for(S(e,t-257,5),S(e,r-1,5),S(e,n-4,4),i=0;i<n;i++)S(e,e.bl_tree[2*f[i]+1],3);F(e,e.dyn_ltree,t-1),F(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),T(e,e.dyn_ltree,e.dyn_dtree)),A(e),n&&I(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(p[r]+256+1)]++,e.dyn_dtree[2*k(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){var t;S(e,2,3),z(e,256,l),16===(t=e).bi_valid?(x(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):8<=t.bi_valid&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){"use strict";t.exports="function"==typeof setImmediate?setImmediate:function(){var e=[].slice.apply(arguments);e.splice(1,0,0),setTimeout.apply(null,e)}},{}]},{},[10])(10)})}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)})}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)})}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)})}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});
},{"buffer":"../../../../../../usr/lib/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"class/HandleFiles.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MenusControlers = _interopRequireDefault(require("./MenusControlers"));

var _jszip = _interopRequireDefault(require("jszip"));

var _GridView = _interopRequireDefault(require("./GridView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
    HandleFiles class has methods to read files with FileReader and create there view in html document;
    You shold add there methods for handling files in format 'as/Type/', such as asExcel, asTxt and others;

    **asCsv()**{
        input:{
            file: file from dataTransfer(only 1) :object
        },
        output:{
            false: if file has a copy at sessionStorage
        }

        If file doesn`t have a copy at sessionStorage, it would be added there with the key set to file.name without .type ending;
        If there is/are file/s with the same name, numbers 1-5 would be added in the and of the file.name;
        Stringifyed: fileAtSStorage{
                        name: file.name,
                        type: type,
                        result: FileReader result,
                        size: file.size/1000
                    }
        Calls HandleFiles.createFileViewAtMenus() 
    }

    **createFileViewAtMenus()**{
        input:{
            file: from sessionStorage  :string,
            storageName: key for sessionStorag  :string,
            fileContainer: element where method will create html view  :HTML element,
            iconClass: class for icon(csv, excel..)  :string,
            readiness: load completed of error  :bool
        }
        output: -
        
        Adds html elements with information about files to 'file-panel' and 'file-container';
        Calls MenusControlers methods(listenAndAddChangesToFileName(),onclickControllerFilePanel, addRemoveOnClick()) to add onclick events on buttons and make file-name editable;
    }

    **iconChooser()**{
        input: {
            type: files` type. Ex: 'text/csv' or 'csv  :string
        }
        output: class of icon which corresponds to files` type
    }
*/
var HandleFiles = /*#__PURE__*/function () {
  function HandleFiles() {
    _classCallCheck(this, HandleFiles);
  }

  _createClass(HandleFiles, null, [{
    key: "asCsv",
    value: function asCsv(file) {
      var fileContainer = document.querySelector('.file-container');
      var readers = new FileReader();
      readers.readAsText(file);

      readers.onerror = function () {
        console.log('Error uploading');
        HandleFiles.createFileViewAtMenus(file, file.name, fileContainer, 'fas fa-file-csv csv-icon', false);
      };

      readers.onload = function () {
        var newName = HandleFiles.addNewFileToStorage(file, readers.result.trim(), true);
        HandleFiles.createFileViewAtMenus(sessionStorage.getItem(newName), newName, fileContainer, 'fas fa-file-csv csv-icon', true);
      };
    }
  }, {
    key: "createFileViewAtMenus",
    value: function createFileViewAtMenus(file, storageName, fileContainer, iconClass, readiness) {
      var _document$querySelect;

      file = typeof file === 'string' ? JSON.parse(file) : file;
      var fileBox = document.createElement('div'),
          icon = document.createElement('i'),
          fileName = document.createElement('p'),
          progress = document.createElement('div'),
          trash = document.createElement('i');
      fileBox.setAttribute('class', 'file-box');
      fileBox.setAttribute('data-file-name', "".concat(storageName));
      icon.setAttribute('class', iconClass);
      fileName.setAttribute('class', 'file-name');
      fileName.setAttribute('title', "".concat(file.name));
      fileName.textContent = file.name;
      progress.setAttribute('class', 'progress');
      trash.setAttribute('class', 'fas fa-trash file-trash-icon trash');
      fileBox.append(icon, fileName, progress, trash);
      fileContainer.append(fileBox);
      var filePanel = document.querySelector('.file-panel');
      var openFileBox = filePanel.classList.contains('open-file-panel') ? 'open-file-box' : '';
      fileBox = document.createElement('div');
      fileBox.setAttribute('class', "file-panel__file-box ".concat(openFileBox));
      fileBox.setAttribute('data-file-name', storageName);
      fileBox.innerHTML = "<i class=\"".concat(iconClass, " file-panel__icon\"></i>\n        <p class=\"file-panel__file-name\" contenteditable=\"true\">").concat(file.name, "</p>\n        <p class=\"file-panel__file-type\">").concat(file.type.toLowerCase(), "</p>\n        <p class=\"file-panel__file-size\">").concat((+file.size).toFixed(1) + 'KB', "</p>\n        <i class=\"far fa-trash-alt trash\" ></i>\n        <button class=\"file-panel__save-file-as\">Save As</button>\n        <button class=\"file-panel__download-file\">Download</button>\n        <button class=\"file-panel__open-file\">Open</button>");
      (_document$querySelect = document.querySelector('.file-panel__empty-caution')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.classList.remove('open-fp-empty-caution');
      filePanel.append(fileBox);

      _MenusControlers.default.listenAndAddChangesToFileName();

      if (typeof filePanel.onclick !== 'function') {
        _MenusControlers.default.onclickControllerFilePanel(file);
      }

      var _iterator = _createForOfIteratorHelper(document.querySelectorAll('.fa-trash-alt')),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;

          if (typeof el.onclick !== "function") {
            _MenusControlers.default.addRemoveOnClick(storageName, trash, el);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (readiness) {
        var progressDone = document.createElement('i');
        progressDone.setAttribute('class', 'fas fa-check progress-done');
        progress.style.border = '2px solid rgb(70, 180, 55)';
        progress.append(progressDone);
      }

      if (!readiness) {
        var progressError = document.createElement('i');
        progressError.setAttribute('class', 'fas fa-times progress-error');
        progress.append(progressError);
      }
    }
  }, {
    key: "showCaution",
    value: function showCaution(elem) {
      elem.style.animation = 'caution 3s linear';
      setTimeout(function () {
        return elem.style.animation = 'none';
      }, 3000);
    }
  }, {
    key: "iconChooser",
    value: function iconChooser(type) {
      type = type.toLowerCase();

      if (type === 'text/csv' || type === 'csv') {
        return 'fas fa-file-csv csv-icon';
      }
    }
  }, {
    key: "csvToArray",
    value: function csvToArray(text) {
      var p = '',
          row = [''],
          ret = [row],
          i = 0,
          r = 0,
          s = !0,
          l;

      var _iterator2 = _createForOfIteratorHelper(text),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          l = _step2.value;

          if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
          } else if (',' === l && s) l = row[++i] = '';else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = ''];
            i = 0;
          } else row[i] += l;

          p = l;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return ret;
    }
  }, {
    key: "addNewFileToStorage",
    value: function addNewFileToStorage() {
      var fileObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var convertedValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var sessionStor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var STORAGE = sessionStor ? sessionStorage : localStorage;
      var FILE_NAME = fileObj.name.slice(0, fileObj.name.indexOf('.'));
      var TYPE = fileObj.name.slice(fileObj.name.indexOf('.') + 1, fileObj.name.length);

      if (!STORAGE || !FILE_NAME || !TYPE) {
        console.log('Adding file to storage missed');
        return false;
      }

      var strToAddInStor = JSON.stringify({
        result: convertedValue,
        name: FILE_NAME,
        size: "".concat(fileObj.size / 1000),
        type: TYPE
      });
      var key;
      var storageName = FILE_NAME;
      var number = 0;

      for (var k = 0; k < STORAGE.length; k++) {
        key = STORAGE.key(k);

        if (strToAddInStor === STORAGE.getItem(key)) {
          console.log('in');
          HandleFiles.showCaution(document.querySelector("[data-file-name=\"".concat(FILE_NAME, "\"]")));
          return false;
        }

        if (FILE_NAME === key) {
          number++;
          storageName += "".concat(number);
        }
      }

      STORAGE.setItem("".concat(storageName), strToAddInStor);
      return storageName;
    }
  }, {
    key: "deleteFileFromStorage",
    value: function deleteFileFromStorage() {
      var storageName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var sessionStor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var STORAGE = sessionStor ? sessionStorage : localStorage;

      if (STORAGE && storageName) {
        STORAGE.removeItem(storageName);
        return true;
      }

      console.log('Delete from storage missed');
      return false;
    }
  }, {
    key: "changeFileValueAtStorage",
    value: function changeFileValueAtStorage() {
      var storageName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var newValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var sessionStor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var STORAGE = sessionStor ? sessionStorage : localStorage;
      var file = JSON.parse(STORAGE.getItem(storageName));

      if (storageName && STORAGE) {
        file.result = newValue;
        STORAGE.setItem(storageName, JSON.stringify(file));
        return file;
      }

      console.log('Changing storage file value missed');
      return false;
    }
  }, {
    key: "byteCount",
    value: function byteCount(s) {
      return encodeURI(s).split(/%..|./).length - 1;
    }
  }, {
    key: "downloadFile",
    value: function downloadFile(typeArg, storageName) {
      if (_GridView.default.tableGrid.getAttribute('data-file-name')) {
        HandleFiles.changeFileValueAtStorage(_GridView.default.tableGrid.getAttribute('data-file-name'), _GridView.default.readGridCellsValues(), true);
      }

      var ELEMENT = document.createElement('a');
      var FILE_STR = sessionStorage.getItem(storageName);
      var FILE = JSON.parse(FILE_STR);
      var type = typeArg ? typeArg : FILE.type;
      var blob = new Blob([FILE.result], {
        type: 'text/csv'
      });
      ELEMENT.setAttribute('href', URL.createObjectURL(blob));
      ELEMENT.setAttribute('download', "".concat(FILE.name + '.' + type));
      ELEMENT.style.display = 'none';
      document.querySelector('body').append(ELEMENT);
      ELEMENT.click();
      document.querySelector('body').removeChild(ELEMENT);
    }
  }, {
    key: "zipAndDownloadAllFiles",
    value: function zipAndDownloadAllFiles(typeArg) {
      var zip = new _jszip.default();
      var key = '';
      var file = {};
      var type;
      var DOWNLOAD_LINK = document.createElement('a');

      if (_GridView.default.tableGrid.getAttribute('data-file-name')) {
        HandleFiles.changeFileValueAtStorage(_GridView.default.tableGrid.getAttribute('data-file-name'), _GridView.default.readGridCellsValues(), true);
      }

      for (var i = 0; i < sessionStorage.length; i++) {
        key = sessionStorage.key(i);
        file = JSON.parse(sessionStorage.getItem(key));
        type = typeArg ? typeArg : file.type;
        zip.file("".concat(key + '.' + type), file.result);
      }

      zip.generateAsync({
        type: "blob"
      }).then(function (content) {
        DOWNLOAD_LINK.href = URL.createObjectURL(content);
        DOWNLOAD_LINK.download = "tables_pack.zip";
        document.querySelector('body').append(DOWNLOAD_LINK);
        DOWNLOAD_LINK.click();
        DOWNLOAD_LINK.remove();
      });
    }
  }, {
    key: "downloadFilesTypeChooser",
    value: function downloadFilesTypeChooser(e) {
      var optionClass = e.target.getAttribute('class');
      var saveAsBox = document.querySelector('.save-as');
      console.log(e.target);

      if ((optionClass === 'save-as__option' || optionClass === 'save-as__text') && e.target.getAttribute('data-file-type') === 'csv') {
        saveAsBox.downloadMethod('csv', saveAsBox.storageName);
      }

      if ((optionClass === 'save-as__option' || optionClass === 'save-as__text') && e.target.getAttribute('data-file-type') === 'xlsx') {
        saveAsBox.downloadMethod('xlsx', saveAsBox.storageName);
      }

      if ((optionClass === 'save-as__option' || optionClass === 'save-as__text') && !e.target.getAttribute('data-file-type')) {
        saveAsBox.downloadMethod(null, saveAsBox.storageName);
      }

      if (optionClass === 'save-as__option' || optionClass === 'save-as__text' || e.target === document.querySelector('body')) {
        window.removeEventListener('click', HandleFiles.downloadFilesTypeChooser);
        document.querySelector('.save-as').classList.remove('open-disp-flex-op-vis');
        document.querySelector('body').classList.remove('lock-budy');
      }
    }
  }]);

  return HandleFiles;
}();

exports.default = HandleFiles;
},{"./MenusControlers":"class/MenusControlers.js","jszip":"node_modules/jszip/dist/jszip.min.js","./GridView":"class/GridView.js"}],"class/UploadFromDragNDrop.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HandleFiles = _interopRequireDefault(require("./HandleFiles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
    Class UploadFromDragNDrop adds functionallity of drag and drop to the 'dropArea';
    You should make instance of class and set 'dropArea' to element you wanted to use as drag and drop zone;
    Than use method 'useAsDropZone' to this instance;


    **useAsDropZone()**{
        input: {
            handleAs: array of strings, ex: ['csv', 'excel'...]
        },
        output: -

        Method adds functionallity of drag and drop and passes uploaded files to the 'HandleFiles' class
        Files validates by static methods 'validateSizeAndNum' and 'validateTypeAndChooseHandler'- which also
        chooses handler corresponding to input object and what 'handleAs' arguments came;
        You should write additional 'if' statement at 'validateTypeAndChooseHandler' method when adding a new 
        file handler;
    }
    **validateSizeAndNum()**{
        input: {
            files: files from dataTransfer
        },
        output:{
            false: if size > 5mb or/and if number of files > 5,
            true: !-//-
        }

        Validates size and number of files;
        Shows warning by using HandleFiles.showCaution() method;
    }
    **validateTypeAndChooseHandler()**{
        input{
            files: files from dataTransfer
            handleAs: array of strings, ex: ['csv', 'excel'...]
        },
        output{
            false: if none of handlers can treat input files
        }

        Sorts files by size;
        Pushes files to the handler of corresponding type; Ex., for CSV files => HandleFiles.asCsv(SortedFiles)
    }
*/
var UploadFromDragNDrop = /*#__PURE__*/function () {
  function UploadFromDragNDrop(dropArea) {
    var _document$getElementB;

    _classCallCheck(this, UploadFromDragNDrop);

    this.dropArea = (_document$getElementB = document.getElementById(dropArea)) !== null && _document$getElementB !== void 0 ? _document$getElementB : document.querySelector(dropArea);
  }

  _createClass(UploadFromDragNDrop, [{
    key: "useAsDropZone",
    value: function useAsDropZone(handleAs) {
      var dropArea = this.dropArea;
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
        dropArea.addEventListener(eventName, UploadFromDragNDrop.preventDefaults, false);
      });
      ['dragenter', 'dragover'].forEach(function (eventName) {
        dropArea.addEventListener(eventName, highlight, false);
      });
      ['dragleave', 'drop'].forEach(function (eventName) {
        dropArea.addEventListener(eventName, unhighlight, false);
      });

      function highlight(e) {
        dropArea.classList.add('highlight');
      }

      function unhighlight(e) {
        dropArea.classList.remove('highlight');
      }

      dropArea.addEventListener('drop', handleDrop, false);

      function handleDrop(e) {
        var dt = e.dataTransfer;
        var files = dt.files;

        if (UploadFromDragNDrop.validateSizeAndNum(files)) {
          UploadFromDragNDrop.validateTypeAndChooseHandler(files, handleAs);
        }
      }
    }
  }], [{
    key: "preventDefaults",
    value: function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, {
    key: "validateSizeAndNum",
    value: function validateSizeAndNum(files) {
      var sizeSum = 0;
      var uploadFilesNum = files.length;
      var MAX_FILES_NUM = 5,
          MAX_SIZE = 5000;
      var key, fileObj;

      for (var j = 0; j < sessionStorage.length; j++) {
        key = sessionStorage.key(j);
        fileObj = JSON.parse(sessionStorage.getItem(key));

        if (fileObj.size) {
          sizeSum += +fileObj.size;
          uploadFilesNum++;
        }
      }

      for (var i = 0; i < files.length; i++) {
        sizeSum += +files[i].size / 1000;
      }

      if (sizeSum >= MAX_SIZE) {
        _HandleFiles.default.showCaution(document.querySelector('.caution-size'));

        console.log('size');
        return false;
      }

      if (uploadFilesNum > MAX_FILES_NUM) {
        _HandleFiles.default.showCaution(document.querySelector('.caution-num'));

        console.log('num');
        return false;
      }

      return true;
    }
  }, {
    key: "validateTypeAndChooseHandler",
    value: function validateTypeAndChooseHandler(files, choosenHandlers) {
      var sortedFiles = _toConsumableArray(files).sort(function (a, b) {
        return a.size > b.size ? 1 : -1;
      });

      for (var i = 0; i < sortedFiles.length; i++) {
        if (sortedFiles[i].type === 'text/csv' && choosenHandlers.includes('CSV')) {
          _HandleFiles.default.asCsv(sortedFiles[i]);
        } else {
          console.log('not csv');

          _HandleFiles.default.showCaution(document.querySelector('.caution-type'));

          return false;
        }
      }
    }
  }]);

  return UploadFromDragNDrop;
}();

exports.default = UploadFromDragNDrop;
},{"./HandleFiles":"class/HandleFiles.js"}],"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","class/UploadFromDragNDrop.js"], null)
//# sourceMappingURL=/UploadFromDragNDrop.f8a80d71.js.map