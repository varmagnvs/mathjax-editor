/*!
 * 
 * MathJax Editor
 * https://github.com/ianlucas/mathjax-editor
 * 
 * (c) 2016, Ian Lucas.
 * Released under the MIT license
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MathJaxEditor"] = factory();
	else
		root["MathJaxEditor"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Editor = __webpack_require__(1);

	var _Editor2 = _interopRequireDefault(_Editor);

	var _extendMathJax = __webpack_require__(3);

	var _extendMathJax2 = _interopRequireDefault(_extendMathJax);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	window.addEventListener('load', _extendMathJax2.default);

	/**
	 * This is the MathJaxEditor class.
	 * 
	 * It has an API on top of the Editor class.
	 */

	var MathJaxEditor = function () {
	  /**
	   * Creates an instance of Editor.
	   * 
	   * @constructor
	   */
	  function MathJaxEditor(options) {
	    _classCallCheck(this, MathJaxEditor);

	    var editor = new _Editor2.default(options);
	    this.editor = editor;
	  }

	  /**
	   * This inserts a command into the editor.
	   * 
	   * @param {String} command
	   * @param {Number} blocks
	   * 
	   * @return {Void}
	   */


	  _createClass(MathJaxEditor, [{
	    key: 'insertCommand',
	    value: function insertCommand(command) {
	      var blocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	      this.editor.insertCommand(command, blocks);
	    }
	  }]);

	  return MathJaxEditor;
	}();

	module.exports = MathJaxEditor;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var KEY_BACKSPACE = 8;
	var KEY_LEFT = 37;
	var KEY_RIGHT = 39;

	var Editor = function () {
	  /**
	   * This is the main class of the Editor.
	   * 
	   * It contains all methods to deal with the cursor and math input.
	   * It accepts an object as first argument, which must contain the options.
	   * 
	   * @param {Object} options
	   * @param {DOMElement|String} options.el - The DOM Element itself or a string selector.
	   * 
	   * @constructor
	   */
	  function Editor(_ref) {
	    var _this = this;

	    var el = _ref.el;

	    _classCallCheck(this, Editor);

	    var Element = MathJax.HTML.Element;

	    var $el = (0, _utils.mustFindElement)(el);
	    var $container = Element('div', { className: 'mj-ed-container' });
	    var $input = Element('input', { className: 'mj-ed-input' });
	    var $display = Element('div', { className: 'mj-ed-display' }, ['\\(\\cursor\\)']);
	    var $debug = Element('pre', {}, ['|']);

	    $el.parentNode.replaceChild($container, $el);
	    $container.appendChild($input);
	    $container.appendChild($display);
	    $container.appendChild($debug);

	    $input.addEventListener('keydown', this.handleInputEvent.bind(this));
	    $input.addEventListener('keyup', this.handleInputEvent.bind(this));

	    MathJax.Hub.Queue(['Typeset', MathJax.Hub, $display], function () {
	      _this.jaxElement = MathJax.Hub.getAllJax($display)[0];
	    }, function () {
	      $display.style.minHeight = $display.offsetHeight + 'px';
	    });

	    this.$container = $container;
	    this.$debug = $debug;
	    this.$display = $display;
	    this.$input = $input;
	    this.cursor = 0;
	    this.value = '';
	  }

	  /**
	   * This will update `this.$debug` inner HTML so that we can see
	   * the raw Jax written by the user input.
	   * (At the moment it updates the JaxElement, too)
	   * 
	   * @param {String} value - Jax to be used. It defaults to the editor's value.
	   * 
	   * @return {Void}
	   */


	  _createClass(Editor, [{
	    key: 'updateDebug',
	    value: function updateDebug() {
	      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.value;

	      var before = value.slice(0, this.cursor);
	      var after = value.slice(this.cursor);
	      this.$debug.innerHTML = before + '|' + after;
	      this.updateJaxElement(before + '{\\cursor}' + after);
	    }

	    /**
	     * Updates the Jax Element inside of `this.display`.
	     * 
	     * @param {String} jax
	     * @param {Function} callback
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'updateJaxElement',
	    value: function updateJaxElement(jax) {
	      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Function;

	      MathJax.Hub.Queue(['Text', this.jaxElement, jax], callback);
	    }

	    /**
	     * This updates the cursor position based on the amount
	     * of movement is given.
	     * 
	     * PS: The meaning of the variable `next` is not the next index,
	     *     but the next value the cursor will hold.
	     * 
	     * @param {Number} amount
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'updateCursor',
	    value: function updateCursor() {
	      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      var next = this.cursor + amount;
	      var current = this.cursor;
	      var value = this.value;
	      var length = value.length;

	      // Moving to the left.
	      if (amount < 0) {
	        if (value[next] === '{') {
	          var i = next;
	          while (i--) {
	            if (value[i] === '\\') {
	              break;
	            }
	          }
	          next = i;
	        }
	      }

	      // Moving to the right.
	      if (amount > 0) {
	        if (value[current] === '\\') {
	          var _i = next;
	          while (_i++ < length) {
	            if (value[_i] === '{') {
	              break;
	            }
	          }
	          next = _i + 1;
	        }

	        if (value[next] === '{') {
	          next += 1;
	        }
	      }

	      this.cursor = next;
	      this.updateDebug();
	    }

	    /**
	     * Find a jax command at given position.
	     * 
	     * For instance, consider this as the current value of the editor:
	     * 
	     *     '\sqrt{2}'
	     * 
	     * If the given position is the index of any character of the
	     * command '\sqrt', it will return the start and the end of the
	     * command.
	     * 
	     * @param {Number} position
	     * 
	     * @return {Object}
	     */

	  }, {
	    key: 'findCommandAt',
	    value: function findCommandAt(position) {
	      var coordinates = { start: null, end: null };
	      var value = this.value;
	      var length = value.length;
	      var previous = position - 1;
	      var next = position + 1;
	      var i = void 0;

	      i = next;

	      while (i--) {
	        if (value[i] === '\\') {
	          coordinates.start = i;
	          break;
	        }
	      }

	      i = previous;

	      while (i++ < value.length) {
	        if (value[i] === '}' && value[i + 1] !== '{') {
	          coordinates.end = i;
	          break;
	        }
	      }

	      if (coordinates.end === null) {
	        coordinates.end = i;
	      }

	      return coordinates;
	    }

	    /**
	     * This will handle the events of `this.$input`.
	     * It captures the key pressed and what the user have typed.
	     * 
	     * @param {KeyboardEvent} e
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'handleInputEvent',
	    value: function handleInputEvent(e) {
	      var _this2 = this;

	      var $input = this.$input;
	      var inputValue = $input.value.trim();
	      var which = e.keyCode;

	      $input.value = '';

	      if (e.type === 'keyup') {
	        which = null;
	      }

	      if (!inputValue.length) {
	        return this.handleInput(which);
	      }

	      inputValue.split('').forEach(function (char) {
	        _this2.handleInput(which, char);
	      });
	    }

	    /**
	     * Handles the user input.
	     * 
	     * @param {Number} which - Which key was pressed.
	     * @param {String} char - The character that was typed.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'handleInput',
	    value: function handleInput(which, char) {
	      switch (which) {
	        case KEY_LEFT:
	          if (this.cursor > 0) {
	            this.updateCursor(-1);
	          }
	          return;

	        case KEY_RIGHT:
	          if (this.cursor < this.value.length) {
	            this.updateCursor(1);
	          }
	          return;

	        case KEY_BACKSPACE:
	          this.erase();
	          return;
	      }

	      if (which) {
	        console.warn('The key ' + which + ' was pressed.');
	      }

	      if (!char) {
	        return;
	      }

	      this.insert(char);
	    }

	    /**
	     * Insert a piece of text in editor's value.
	     * 
	     * @param {String} value
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'insert',
	    value: function insert(value) {
	      var cursor = this.cursor;
	      var current = this.value;

	      if (cursor === -1) {
	        this.value = value + current;
	        this.cursor += value.length;
	        this.updateDebug();
	      }

	      this.cursor += value.length;

	      var before = current.slice(0, cursor);
	      var after = current.slice(cursor);
	      this.value = before + value + after;

	      this.updateDebug();
	    }

	    /**
	     * Inserts a command in the editor.
	     * 
	     * The cursor will moved to the first "block" ({}).
	     * 
	     * @param {String} command - The command.
	     * @param {Number} blocks - The quantity of blocks it requires.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'insertCommand',
	    value: function insertCommand(command) {
	      var blocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	      // e.q. \sqrt
	      command = command + '{';
	      this.insert(command);
	      this.value += '}' + '{}'.repeat(blocks - 1);
	      this.$input.focus();
	      this.updateDebug();
	    }

	    /**
	     * Erases the character before the cursor.
	     * 
	     * @return {Void}
	     */

	  }, {
	    key: 'erase',
	    value: function erase() {
	      var current = this.cursor;
	      var previous = this.cursor - 1;
	      var value = this.value;
	      var before = void 0;
	      var after = void 0;

	      if (~['{', '}'].indexOf(value[previous])) {
	        var coordinates = this.findCommandAt(current);
	        before = value.slice(0, coordinates.start);
	        after = value.slice(coordinates.end + 1);
	      } else {
	        before = value.slice(0, current - 1);
	        after = value.slice(current);
	      }

	      this.value = before + after;
	      this.cursor = before.length;
	      this.updateDebug();
	    }
	  }]);

	  return Editor;
	}();

	exports.default = Editor;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mustFindElement = mustFindElement;
	/**
	 * Tries to find the specified element. If it fails, an error is thrown.
	 * 
	 * @param {DOMElement|string} el - An element or a selector.
	 * 
	 * @return {DOMElement}
	 */
	function mustFindElement(el) {
	  var error = new Error('You must define a target element.');

	  if (!el) {
	    throw error;
	  }

	  if (typeof el === 'string') {
	    var $el = document.querySelector(el);
	    if (!$el) {
	      throw error;
	    }
	    return $el;
	  }

	  // Yeah, we just assume an element was given...
	  return el;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = extendMathJax;

	var _stylesheet = __webpack_require__(4);

	var _stylesheet2 = _interopRequireDefault(_stylesheet);

	var _utils = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * This will extend MathJax so that we can put our simple
	 * cursor there.
	 */
	function extendMathJax() {
	  var TEX = MathJax.InputJax.TeX;
	  var MML = MathJax.ElementJax.mml;

	  MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
	    TEX.Definitions.Add({
	      macros: {
	        cursor: "Cursor"
	      }
	    }, null, true);

	    MML.mcursor = MML.mbase.Subclass({
	      type: "cursor", isToken: true,
	      isSpacelike: function isSpacelike() {
	        return true;
	      },
	      texClass: MML.TEXCLASS.ORD,
	      defaults: {
	        mathvariant: MML.INHERIT,
	        mathsize: MML.INHERIT,
	        mathbackground: MML.INHERIT,
	        mathcolor: MML.INHERIT,
	        dir: MML.INHERIT
	      }
	    });

	    TEX.Parse.Augment({
	      Cursor: function Cursor(name) {
	        var $cursor = MML.mcursor('|');
	        this.Push($cursor);
	      }
	    });
	  });

	  /**
	   * Append our editor styles on the DOM.
	   * Maybe an external dependency with real CSS extension instead?
	   */

	  var $style = document.createElement('style');
	  $style.innerHTML = _stylesheet2.default;
	  document.head.appendChild($style);
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	module.exports = "\n.mjx-cursor {\n  -webkit-animation: 1s mj-ed-blink step-end infinite;\n  -moz-animation: 1s mj-ed-blink step-end infinite;\n  -ms-animation: 1s mj-ed-blink step-end infinite;\n  -o-animation: 1s mj-ed-blink step-end infinite;\n  animation: 1s mj-ed-blink step-end infinite;\n}\n\n@keyframes mj-ed-blink {\n  from, to {\n    color: transparent;\n  }\n  50% {\n    color: black;\n  }\n}\n\n@-moz-keyframes mj-ed-blink {\n  from, to {\n    color: transparent;\n  }\n  50% {\n    color: black;\n  }\n}\n\n@-webkit-keyframes mj-ed-blink {\n  from, to {\n    color: transparent;\n  }\n  50% {\n    color: black;\n  }\n}\n\n@-ms-keyframes mj-ed-blink {\n  from, to {\n    color: transparent;\n  }\n  50% {\n    color: black;\n  }\n}\n\n@-o-keyframes mj-ed-blink {\n  from, to {\n    color: transparent;\n  }\n  50% {\n    color: black;\n  }\n}\n";

/***/ }
/******/ ])
});
;