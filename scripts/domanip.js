/******/ (function(modules) { // webpackBootstrap
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

	const DOMNodeCollection = __webpack_require__(1);

	$l = function (selector) {

	  let result;

	  if (selector instanceof Function){
	    document.addEventListener('DOMContentLoaded', selector);
	  } else if (selector instanceof HTMLElement) {
	    result = [selector];
	  } else {

	    result = Array.from(document.querySelectorAll(selector));
	  }
	  return (new DOMNodeCollection(result));

	};

	$l.extend = function (...args) {
	  const firstObject = args[0];
	  args.slice(1).forEach( arg => {
	    Object.keys(arg).forEach ( prop => {
	      firstObject[prop] = arg[prop];
	    });
	  });
	  return firstObject;
	};

	$l.ajax = function (options) {

	  const defaults = {
	    method: 'get',
	    url: '',
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    data: {},
	    success: () => {},
	    error: () => {},
	    dataType: 'jsonp'
	  };
	  $l.extend(defaults, options);

	  const xhr = new XMLHttpRequest();
	  xhr.open(defaults.method, defaults.url);
	  xhr.onload = function() {
	    if (xhr.status >= 200 && xhr.status < 300) {
	      defaults.success(xhr.response);
	    } else {
	      defaults.error(xhr.response);
	    }
	  };
	  xhr.send(JSON.stringify(defaults.data));
	};

	window.$l = $l;

	$l( () => {
	  console.log("DOM content loaded!");
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {

	  constructor(elements) {
	    this.elements = elements;
	    return this;
	  }

	  each (callback) {
	    this.elements.forEach(callback);
	  }

	  html(textContent) {
	    if (textContent !== undefined) {
	      this.each( (el) => el.innerHTML = textContent );
	    } else {
	      return this.elements[0].innerHTML;
	    }
	  }

	  empty() {
	    this.html("");
	  }

	  append(content) {
	    if (content instanceof HTMLElement) content = $l(content);
	    if (typeof content === "string") {
	      this.each( (el) => el.innerHTML += content);
	    } else if ( content instanceof DOMNodeCollection ) {
	      this.each( (el) => {
	        content.each ( (contentEl) => {
	          el.appendChild(contentEl.cloneNode(true));
	        });
	      });
	    }
	  }

	  attr(attribute, value) {
	    if (value === undefined) {
	      return this.elements[0].getAttribute(attribute);
	    } else {
	      this.each( el => el.setAttribute(attribute, value) );
	    }
	  }

	  addClass(className) {
	    this.each ( el => el.className += ` ${className}` );
	  }

	  removeClass(className) {
	    this.each ( el => {
	      el.className = el.className.split(" ").filter( c => c !== className ).join(' ');
	    });
	  }

	  children() {
	    let result = [];
	    this.each ( el => {
	      result = result.concat( Array.from(el.children) );
	    });
	    return new DOMNodeCollection(result);
	  }

	  parent() {
	    let result = [];
	    this.each ( el => {
	      result = result.concat( el.parentElement );
	    });
	    return new DOMNodeCollection(result);
	  }

	  find(selector) {
	    let result = [];
	    this.each ((child) => {
	      const selectedChildren = child.querySelectorAll(selector);
	      if (selectedChildren.length > 0) result = result.concat(child.querySelectorAll(selector));
	    });
	    return new DOMNodeCollection(result);
	  }

	  remove() {
	    this.each ((el) => {
	      el.outerHTML = "";
	    });
	    this.elements = [];
	  }

	  on(event, callback) {
	    this.each( el => {
	      el.addEventListener(event, callback);
	      el[event] = callback;
	    });
	  }

	  off(event) {
	    this.each( el => {
	      el.removeEventListener(event, el[event]);
	    });

	  }

	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);