# Domanip.js

A lightweight DOM manipulation library inspired by jQuery.

["See it in action"](http://christiancho.tech/domanipjs)

## Getting Started

Download `scripts/domanip.js` and include it in your HTML files. Alternatively, download the original files `lib/dom_node_collection.js` and `lib/main.js` and use `webpack` to compile the files.

### DOM Selection

The function `$l` is the selector. You can select DOM elements by their class, ids, or HTML element type. The result will be an array.

#### Functions

Once you have the DOM elements selected, there are a few functions you can use to manipulate them. Here are a few:

- `html(textContent)`: returns HTML content inside the element if `textContent` is not provided. Sets the HTML conent otherwise.
- `attr(attribute, value)`: returns the value of the `attribute` if `value` is not provided. Otherwise, sets the value of the `attribute` to `value`.
- `find(selector)`: returns the DOM elements of the children of the element
- `on(event, callback)`: places an event listener on the DOM element with the callback (also see `off(event)`)

#### Ajax

DomanipJS also comes with an Ajax function, `$l.ajax(options)`. By default, the options are:

```javascript
{
  method: 'get',
  url: '',
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  data: {},
  success: () => {},
  error: () => {},
  dataType: 'jsonp'
};
```

#### Testing DomanipJS

Once you have the `domanip.js` included in your script tag, you can use Chrome or Firefox developer tools and test all of the DomanipJS functions in the console.
