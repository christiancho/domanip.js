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

  css(cssKey, value) {
    if (value === undefined){
      return this.elements[0].style[cssKey];
    } else {
      this.each( el => el.style[cssKey] = value );
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
