/**
 * WebView OnScroll
 * @var {Function}
 */
function WebViewOnScroll() {
  // @see https://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
  function scrollInfo() {
    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    // Return
    return { "left": left, "top": top };
  }
  // Bind events and send data back to RN!
  document.addEventListener('scroll', function() {
    window.postMessage(JSON.stringify({ "type": "__WebViewOnScroll", "scroll": scrollInfo() }));
  });
  //.end
}

/**
 * WebView OnWillNavigate
 * @see https://github.com/electron/electron/issues/4191
 * @var {Function}
 * @param {null}|{undefined}|{bool}|{Object} rules Prevent rules
 */
function WebViewOnWillNavigate(rules) {
  document.addEventListener('click', function(e) {
    // Format input(s)
    // +++ will navigate?
    var willNav = (typeof rules === "boolean") ? rules : true;
    // Find matched element
    var target = null;
    // +++ get dom tree
    var path = (e.path || (e.composedPath && e.composedPath())) || [];
    if (!path.length) {
      var ele = e.target;
      while(ele) {
        path.push(ele);
        ele = (ele.parentNode || ele.parentElement);
      }
    }
    for (var i = 0; i < path.length; i++) {
      if (path[i] && (path[i].href !== undefined)) {
        target = path[i];
        break;
      }
    }
    // Send data back to RN!
    if (target) {
      window.postMessage(JSON.stringify({
        "type": "__WebViewWillNavigate",
        "uri": target.href
      }));
    }
    // Prevent navigate?
    // alert('willNav: ' + JSON.stringify(willNav));
    if (!willNav) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
  //.end
  // alert('WebViewOnWillNavigate' + JSON.stringify(rules));
}

/**
 * @var {Function}
 */
function injectedJS(func, params = null) {
  return `(function(){ (${func})(${JSON.stringify(params)}); })();`;
};

/**
 * @var {Function}
 */
export function injectWebViewOnSroll(params) {
  return injectedJS(WebViewOnScroll, params);
}

/**
 * @var {Function}
 */
export function injectWebViewOnWillNavigate(params) {
  return injectedJS(WebViewOnWillNavigate, params);
}
