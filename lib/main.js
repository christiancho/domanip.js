const DOMNodeCollection = require('./dom_node_collection.js');

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

$l( () => {
  console.log("DOM content loaded!");
});
