# Domanip.js

A lightweight DOM manipulation library inspired by jQuery.

[See it in action](http://christiancho.tech/domanip.js)

## Getting Started

Download `scripts/domanip.js` and include it in your HTML files. Alternatively, download the original files `lib/dom_node_collection.js` and `lib/main.js` and use `webpack` to compile the files. The file will be successfully loaded if the console in the browser reads `DOM content loaded!`. You can remove this output on line 58 of `lib/main.js`.

### Basic Structure

The core class of Domanip.js is `DOMNodeCollection`. It contains an array of all DOM elements and its functions use the class' `each` function to call the function on each DOM element. As an example:

```javascript
attr(attribute, value) {
  if (value === undefined) {
    return this.elements[0].getAttribute(attribute);
  } else {
    this.each( el => el.setAttribute(attribute, value) );
  }
}
```

### DOM Selection

The function `$l` is the selector. You can select DOM elements by their class, ids, or HTML element type. The result will be an array.

#### Functions

Once you have the DOM elements selected, there are a few functions you can use to manipulate them.

- `append(content)`: adds `content` to the end of the `DOMNodeCollection`'s `elements` array.
- `addClass(className)`: adds `className` to the DOM elements' class properties.
- `attr(attribute, value)`: returns the value of the `attribute` if `value` is not provided. Otherwise, sets the value of the `attribute` to `value`.
- `children()`: returns all of the nested DOM elements as a `DOMNodeCollection`.
- `css(cssKey, value)`: returns the value of the `cssKey` in its style property if `value` is not provided. Otherwise, sets the value of the `cssKey` to `value`.
- `parent()`: returns the parent DOM element as a `DOMNodeCollection`.
- `remove()`: removes the DOM element from the page.
- `removeClass(className)`: removes `className` from the DOM elements' class properties.
- `find(selector)`: returns nested DOM elements that meet the `selector` criteria.
- `find(selector)`: returns the DOM elements of the children of the element
- `html(textContent)`: returns HTML content inside the element if `textContent` is not provided. Sets the HTML conent otherwise.
- `on(event, callback)`: places an event listener on the DOM element with the callback (also see `off(event)`)
- `off(event)`: removes the specified event listener on the DOM element

##### Extends

`$l.extend` is a simple function to return the merged result of any number of JavaScript objects.

##### Ajax

DomanipJS also comes with an Ajax function, `$l.ajax(options)`. By default, the options are provided but the use of `$l.extend` ensures that any options passed in are preserved.

```javascript
$l.ajax = function (options) {

  return new Promise( (success, error) => {
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
  });
};
```

###### Promises

`$l.ajax` returns a Promise object that allows for chaining `then` or `catch` calls.

#### Testing DomanipJS

Once you have the `domanip.js` included in your script tag, you can use Chrome or Firefox developer tools and test all of the DomanipJS functions in the console.
