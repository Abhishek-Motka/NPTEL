webpackJsonp([2,4],{

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(210);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(286)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--9-1!../node_modules/postcss-loader/index.js??postcss!./styles.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--9-1!../node_modules/postcss-loader/index.js??postcss!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\n.button {\n  padding: 10px 5px;\n  color: white;\n  text-align: center;\n  border-radius: 5px;\n  outline: none;\n  border: none;\n}\n\n.button-pri {\n  background: #02D1BF;\n}\n\n.button-pri-2 {\n  background: #029FCB;\n}\n\n.button-dan {\n  background: #DB4437;\n}\n\n.push-button {\n  box-shadow: lightgrey 2px 2px 5px 2px;\n}\n\n.push-button:hover {\n  box-shadow: #888 2px 2px 10px 1px;\n  transition: box-shadow 0.2s;\n}\n\n.push-button:active, .push-button::-moz-selection {\n  transform: scale(0.95, 0.95);\n}\n\n.push-button:active, .push-button::selection {\n  -webkit-transform: scale(0.95, 0.95);\n          transform: scale(0.95, 0.95);\n}\n\n.clickable:hover {\n  cursor: pointer;\n}\n\n/* You can add global styles to this file, and also import other style files */\nhtml {\n\tcolor: black;\n\tfont-family: \"open sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n\tfont-size: 1em;\n\theight: 100%;\n}\n\nbody {\n\tbackground: #F3F3F4;\n\tmargin: 0;\n\tpadding: 0;\n\tvertical-align: middle;\n\theight: 100%;\n}\n\n.btn-primary {\n\tbackground: #1ab394;\n\tborder: 1px solid #1ab394;\n\tborder-radius: 5px;\n}\n\nflash-messages {\n\ttext-align: center;\n\ttext-transform: capitalize;\n}\n\napp-dashboard {\n\theight: 100%;\n}\n\n.formControlError {\n\tpadding: 3px 0 0 3px;\n\tcolor: #B22;\n\tfont-size: 0.95em;\n\tfont-weight: bold;\n}\n\n.heading-container {\n\tpadding: 5px;\n\tpadding-top: 10px;\n\ttext-overflow: ellipsis;\n\t-webkit-font-smoothing: antialiasing;\n\tfont-size: 1.10em;\n\tletter-spacing: 0px;\n\tfont-family: \"open-sans\", sans-serif;\n\tcolor: #707070;\n}\n\n.body-container {\n\tpadding: 15px;\n\ttext-overflow: ellipsis;\n\t-webkit-font-smoothing: antialiasing;\n\tfont-size: 1.0em;\n\tcolor: #707070;\n}\n\n.form-group {\n\tmargin-top: 15px;\n\tmargin-bottom: 22px;\n}\n\nhr {\n\tborder-width: 1px;\n\tborder-color: lightgray;\n\tpadding-bottom: 0;\n\tmargin-bottom: 0;\n  margin-top: 5px;\n}\n\nlabel {\n\tvertical-align: middle;\n\tline-height: 2.0em;\n}\n\ninput {\n\twidth: 100%;\n\tpadding: 3px 5px 3px 8px;\n}\n\n.hr-dashed {\n\tborder-style: dashed;\n\tborder-width: 1px;\n}\n\nnav li {\n\tcursor: pointer;\n}\n\n.icon {\n\tmargin-right: 8px;\n}\n\n.icon-small {\n  font-size: 1.3em;\n  padding-left: 5px;\n  padding-right: 5px;\n  line-height: 200%;\n  vertical-align: middle;\n  cursor: pointer;\n}\n\n.search-icon {\n  font-size: 1.1em;\n  padding-left: 5px;\n  padding-right: 5px;\n  line-height: 1.0em;\n  vertical-align: middle;\n  cursor: pointer;\n}\n\n.small-icon {\n\tfont-size: 0.9em;\n\tmargin-left: 15px;\n\tvertical-align: middle;\n}\n\n.box-container {\n\tmargin: 0;\n\tbox-shadow: #BBB 1px 1px 3px 1px;\n\toverflow-y: auto;\n\tborder-top: 2px solid lightblue;\n\tbackground: white;\n\tmargin-bottom: 20px;\n}\n\ntbody td {\n\tfont-size: 0.85em;\n}\n\n.ng2-datetime .input-group-addon{\n\tdisplay: none;\n}\n\n.ng2-datetime input {\n\tpadding: 3px 5px 3px 8px;\n\tfont-size: 0.97em;\n\tfont-weight: normal;\n\toutline: none;\n\tmargin: 0;\n\tcolor: gray;\n\tborder-radius: 0;\n}\n\n.ng2-datetime input:hover, .ng2-datetime input:focus, .ng2-datetime input:active {\n\toutline: none;\n\tmargin: 0;\n\tborder-radius: 0;\n\tborder: 1px solid #4FAF50;\n}\n\n.ng2-datetime:focus, .ng2-datetime:hover, .ng2-datetime:active {\n\toutline: none;\n}\n\n.ng2-datetime .input-group {\n\tmargin-top: 0;\n\twidth: 100%;\n}\n\n.ng2-datetime .form-control {\n\theight: auto;\n}\n\n@media (max-width: 991px) {\n\n\t.nav-collapse .nav-item {\n\t\tdisplay: none;\n\t}\n\n}\n\n#followUp-ndate .input-group, #form-date .ng2-datetime .input-group {\n\twidth: 90%;\n}\n\nselect {\n  width: 105%;\n  padding: 5px 0px 5px 1px;\n  border: 1px solid lightgray;\n}\n\ninput, textarea {\n  border: 1px solid lightgray;\n  width: 90%;\n  padding: 5px;\n  padding-left: 5px;\n}\n\n.container-fluid {\n  height: calc(100%-0px);\n  overflow: auto;\n}\n\ninput:hover, input:focus, input:active, select:focus, select:hover, select:active, textarea:hover, textarea:active, textarea:focus {\n  outline: none;\n  border: 1px solid lightgray;\n}\n\ninput:focus, input:active, textarea:focus, textarea:active, select:focus, select:active {\n\tborder: 1px solid #4FAF50;\n\toutline: none;\n\tpadding: 3px 5px 3px 8px;\n}\n\n.input-error, .input-error:focus, .input-error:active {\n\tborder: 1px dashed red;\n\toutline: none;\n\tpadding: 3px 5px 3px 8px;\n}\n\n.glyphicon {\n  top: auto;\n}\n\ntd {\n  text-transform: uppercase;\n}\n\n.btn-primary, .btn-primary:focus {\n  background: #23c6FF;\n  border-color: #23C6FF;\n  outline: none;\n}\n\n.btn-primary:hover, .btn-primary:active {\n\tbackground: #23C6C8;\n\tborder-color: #23C6C8;\n\toutline: none;\n}\n\n.btn {\n  margin: 5px;\n}\n\n.btn-danger:focus {\n  background: #DB4437;\n  border-color: #DB4437;\n  outline: none;\n}\n\n.submit-btn {\n  margin: 0;\n  padding: 3px 12px;\n  border-radius: 4px;\n}\n", ""]);

// exports


/***/ }),

/***/ 286:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(135);


/***/ }),

/***/ 7:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ })

},[295]);
//# sourceMappingURL=styles.bundle.js.map