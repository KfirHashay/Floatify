import require$$0, { useContext, useCallback, useRef, useState, useReducer, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ":where(.overlay-library){box-sizing:border-box;font-family:inherit;line-height:inherit}:where(.overlay-library *),:where(.overlay-library :after),:where(.overlay-library :before){box-sizing:inherit;margin:0;padding:0}:where(.overlay-library h1,.overlay-library h2,.overlay-library h3,.overlay-library h4,.overlay-library h5,.overlay-library h6,.overlay-library p,.overlay-library figure,.overlay-library blockquote,.overlay-library pre){margin:0;padding:0}:where(.overlay-library ul,.overlay-library ol){list-style:none;padding:0}:where(.overlay-library button,.overlay-library input,.overlay-library select,.overlay-library textarea){background:none;border:none;font:inherit;outline:none}:where(.overlay-library img,.overlay-library video){display:block;height:auto;max-width:100%}:where(.overlay-library a){color:inherit;text-decoration:none}:where(.overlay-library html){overflow-x:hidden}:where(.overlay-library body){-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}:where(.overlay-library button:focus,.overlay-library input:focus,.overlay-library select:focus,.overlay-library textarea:focus){outline:2px solid var(--focus-color,#007aff);outline-offset:2px}:where(.overlay-library .overlay-portal){overflow:hidden}@media (prefers-reduced-motion:reduce){:where(.overlay-library *){animation:none!important;transition:none!important}}:root{--overlay-primary-color:#007aff;--overlay-secondary-color:#0051cb;--overlay-text-color:#1a1a1a;--overlay-bg-color:#fff;--overlay-dark-primary:#0a84ff;--overlay-dark-secondary:#05f;--overlay-dark-text:#fff;--overlay-dark-bg:#000;--overlay-font-family:system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,sans-serif;--overlay-font-size-sm:14px;--overlay-font-size-md:16px;--overlay-font-size-lg:18px;--overlay-font-weight-light:300;--overlay-font-weight-normal:400;--overlay-font-weight-bold:600;--overlay-padding-sm:8px;--overlay-padding-md:12px;--overlay-padding-lg:16px;--overlay-gap-sm:4px;--overlay-gap-md:8px;--overlay-gap-lg:12px;--overlay-border-radius:12px;--di-border-radius:var(--overlay-border-radius);--overlay-shadow-sm:0px 2px 5px rgba(0,0,0,.1);--overlay-shadow-md:0px 4px 10px rgba(0,0,0,.15);--overlay-shadow-lg:0px 6px 20px rgba(0,0,0,.2);--overlay-border-color:rgba(0,0,0,.1);--overlay-border-width:1px;--overlay-collapsed-width:120px;--overlay-collapsed-height:36px;--overlay-expanded-width:350px;--overlay-expanded-height:120px;--di-duration-fast:150ms;--di-duration-normal:300ms;--di-transition-timing:ease-in-out;--di-spring-timing:cubic-bezier(0.34,1.56,0.64,1);--di-overlay-transition:width var(--di-duration-normal) var(--di-transition-timing),height var(--di-duration-normal) var(--di-transition-timing),transform var(--di-duration-fast) var(--di-transition-timing),opacity var(--di-duration-fast) var(--di-transition-timing);--overlay-transition:0.3s ease-in-out;--overlay-scale-hover:1.02;--overlay-z-index:1000}@media (prefers-color-scheme:dark){:root{--overlay-primary-color:var(--overlay-dark-primary);--overlay-secondary-color:var(--overlay-dark-secondary);--overlay-text-color:var(--overlay-dark-text);--overlay-bg-color:var(--overlay-dark-bg);--overlay-border-color:hsla(0,0%,100%,.1)}}@keyframes overlay-expand{0%{opacity:.8;transform:scale(.96)}to{opacity:1;transform:scale(1)}}@keyframes overlay-collapse{0%{transform:scale(1)}to{transform:scale(.96)}}@keyframes overlay-swipe-left{0%{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-100%)}}@keyframes overlay-swipe-right{0%{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(100%)}}@keyframes slide-left{0%{transform:translateX(0)}to{transform:translateX(-100%)}}@keyframes slide-right{0%{transform:translateX(0)}to{transform:translateX(100%)}}@keyframes alert-pulse{0%,to{box-shadow:0 0 0 0 rgba(var(--di-alert-rgb,255,69,58),.4);transform:scale(1)}50%{box-shadow:0 0 0 10px rgba(var(--di-alert-rgb,255,69,58),0);transform:scale(1.03)}}:where(.overlay-library){color:var(--overlay-text-color);font-family:var(--overlay-font-family);font-size:var(--overlay-font-size-md);line-height:1.5}:where(.overlay-library .overlay-container){align-items:center;display:flex;flex-direction:column;gap:var(--overlay-gap-md);left:50%;max-width:90vw;padding:var(--overlay-padding-md);position:fixed;top:0;transform:translateX(-50%);width:auto;z-index:var(--overlay-z-index)}:where(.overlay-library .overlay-flex){align-items:center;display:flex;gap:var(--overlay-gap-sm);justify-content:center}:where(.overlay-library .overlay-grid){display:grid;gap:var(--overlay-gap-md)}:where(.overlay-library .overlay-hidden){display:none!important}:where(.overlay-library .overlay-visible){display:block!important}:where(.overlay-library .overlay-scroll){max-height:80vh;overflow:auto}:where(.overlay-library button,.overlay-library input,.overlay-library select){cursor:pointer}:where(.overlay-library button:focus,.overlay-library input:focus){outline:2px solid var(--overlay-primary-color);outline-offset:2px}@media (max-width:768px){:where(.overlay-library .overlay-container){padding:var(--overlay-padding-sm);width:95vw}}.overlay-styled .overlay-card--expanded{backdrop-filter:blur(calc(var(--di-glass-blur, 12px)*1.2));-webkit-backdrop-filter:blur(calc(var(--di-glass-blur, 12px)*1.2));border-radius:var(--di-expanded-radius,32px);box-shadow:0 12px 36px rgba(0,0,0,.2)}.overlay-styled .overlay-card--collapsed,.overlay-styled .overlay-card--expanded{opacity:1;transition:width var(--di-duration-normal) var(--di-transition-timing),height var(--di-duration-normal) var(--di-transition-timing),transform var(--di-duration-normal) var(--di-transition-timing),opacity var(--di-duration-fast) ease-out,visibility 0s linear;visibility:visible}.overlay-styled .overlay-card--collapsed{border-radius:calc(var(--overlay-collapsed-height, 36px)/2);transform:none}.overlay-styled .overlay-card--hidden{opacity:0;pointer-events:none;transform:translateY(-100%);transition:opacity var(--di-duration-fast) ease-out,transform var(--di-duration-normal) ease-out,visibility 0s linear var(--di-duration-normal);visibility:hidden}.overlay-styled .overlay-card--alert,.overlay-styled .overlay-card--hidden{height:var(--overlay-collapsed-height,36px);width:var(--overlay-collapsed-width,120px)}.overlay-styled .overlay-card--alert{animation:alert-pulse 2s ease-in-out infinite;backdrop-filter:none;-webkit-backdrop-filter:none;background-color:var(--di-alert-bg,rgba(255,69,58,.95));border-radius:calc(var(--overlay-collapsed-height, 36px)/2);opacity:1;transform:none;visibility:visible}.overlay-styled .overlay-card:focus-visible{box-shadow:0 0 0 3px var(--di-focus-ring,rgba(0,122,255,.8));outline:none}.overlay-styled .overlay-portal{backdrop-filter:blur(var(--di-glass-blur));-webkit-backdrop-filter:blur(var(--di-glass-blur));background-color:rgba(var(--di-background-rgb),var(--di-glass-opacity));border-radius:calc(var(--overlay-collapsed-height)/2);box-shadow:0 8px 24px rgba(0,0,0,.2);color:var(--di-text);cursor:pointer;height:var(--overlay-collapsed-height);left:0;overflow:hidden;top:var(--di-top-offset,12px);transform:none;transition:var(--di-overlay-transition),visibility 0s linear,background-color .15s ease-in-out,backdrop-filter .15s ease-in-out,box-shadow .3s var(--di-transition-timing),border-radius .3s var(--di-transition-timing);user-select:none;width:var(--overlay-collapsed-width);will-change:transform,width,height,opacity,visibility;z-index:var(--di-z-index,9999)}.overlay-styled .overlay-portal[data-state=expanded]{border-radius:var(--di-border-radius);height:var(--overlay-expanded-height,120px);width:var(--overlay-expanded-width,350px)}.overlay-styled .overlay-portal[data-state=collapsed]{border-radius:calc(var(--overlay-collapsed-height)/2);height:var(--overlay-collapsed-height,36px);width:var(--overlay-collapsed-width,120px)}.overlay-styled .overlay-portal:hover{transform:scale(var(--di-hover-scale))}.overlay-styled .overlay-portal:active{transform:scale(var(--di-active-scale))}.overlay-styled .overlay-portal:focus-visible{outline:2px solid var(--overlay-focus-ring,rgba(0,122,255,.8));outline-offset:2px;transform:scale(var(--di-hover-scale))}.overlay-styled .overlay-container{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;display:flex;justify-content:center;opacity:1;padding:var(--overlay-padding,8px);transition:transform .2s ease-in-out}.overlay-styled .overlay-portal:empty{display:none;pointer-events:none}.overlay-styled .overlay-portal[data-hidden=true]{opacity:0;transition:opacity .2s ease-in-out,visibility 0s linear .2s;visibility:hidden}.overlay-styled .overlay-container[data-animating=true]{transform:scale(.98)}.overlay-styled .overlay-portal[data-channel] .overlay-container{overflow:hidden;position:relative}.overlay-styled .overlay-container[data-direction=next]{animation:slide-left .2s ease-out forwards}.overlay-styled .overlay-container[data-direction=prev]{animation:slide-right .2s ease-out forwards}.overlay-styled .overlay-multiple-container{align-items:flex-start;display:flex;flex-wrap:wrap;gap:var(--overlay-gap-lg,12px);justify-content:center}@media (max-width:480px){.overlay-styled .overlay-multiple-container{align-items:center;flex-direction:column}}.overlay-portal--sticky{position:sticky;top:0}@media (min-width:481px){.overlay-portal--top{top:0}.overlay-portal--bottom,.overlay-portal--top{left:50%;position:fixed;transform:translateX(-50%)}.overlay-portal--bottom{bottom:0}.overlay-portal--center{left:50%;position:fixed;top:50%;transform:translate(-50%,-50%)}.overlay-portal--top-left{left:0;position:fixed;top:0;transform:none}.overlay-portal--top-right{left:auto;position:fixed;right:0;top:0;transform:none}.overlay-portal--bottom-left{bottom:0;left:0;position:fixed;transform:none}.overlay-portal--bottom-right{bottom:0;left:auto;position:fixed;right:0;transform:none}}.overlay-styled .overlay-card{background-color:rgba(var(--di-background-rgb),var(--di-glass-opacity));border-radius:var(--di-border-radius);box-shadow:var(--di-shadow);cursor:pointer;display:flex;flex-direction:column;font-size:var(--overlay-font-size-md);gap:var(--overlay-gap-sm);max-width:350px;padding:var(--overlay-padding-md);transform-origin:center;transition:var(--di-overlay-transition),box-shadow .3s var(--di-transition-timing),background-color .15s ease-in-out,backdrop-filter .2s ease-in-out;user-select:none;width:fit-content;will-change:width,height,transform,opacity}.overlay-styled .overlay-card--collapsed{align-items:center;animation:overlay-collapse var(--di-duration-normal) var(--di-transition-timing);border-radius:calc(var(--overlay-collapsed-height)/2);height:var(--overlay-collapsed-height,36px);justify-content:center;min-width:var(--overlay-collapsed-width,120px);overflow:hidden;padding:var(--overlay-padding-sm);text-align:center;width:var(--overlay-collapsed-width,120px)}.overlay-styled .overlay-card--expanded{animation:overlay-expand var(--di-duration-normal) var(--di-transition-timing);border-radius:var(--di-border-radius);height:var(--overlay-expanded-height,120px);justify-content:space-between;padding:var(--overlay-padding-lg);width:var(--overlay-expanded-width,350px)}.overlay-styled .overlay-card-title{font-size:var(--overlay-font-size-lg);font-weight:var(--overlay-font-weight-bold);text-align:center}.overlay-styled .overlay-card-body{font-size:var(--overlay-font-size-md);opacity:0;text-align:center;transition:opacity var(--di-duration-normal) var(--di-transition-timing)}.overlay-styled .overlay-card--expanded .overlay-card-body{opacity:1}.overlay-styled .overlay-card:hover{box-shadow:var(--di-shadow);transform:scale(var(--di-hover-scale))}.overlay-styled .overlay-card:active{transform:scale(var(--di-active-scale))}.overlay-styled .overlay-card:focus-visible{transform:scale(var(--di-hover-scale))}.overlay-styled .overlay-card--swipe-left{animation:overlay-swipe-left .2s ease-out forwards}.overlay-styled .overlay-card--swipe-right{animation:overlay-swipe-right .2s ease-out forwards}.overlay-styled .overlay-card-actions{align-items:center;display:flex;justify-content:space-between;margin-top:var(--overlay-gap-md)}.overlay-styled .overlay-card-remove{background:transparent;border:none;color:var(--di-text);cursor:pointer;font-size:18px;padding:var(--overlay-padding-sm);transition:var(--overlay-transition)}.overlay-styled .overlay-card-remove:hover{opacity:.7}.overlay-styled .overlay-card-swipe-next,.overlay-styled .overlay-card-swipe-prev{background:var(--overlay-primary-color);border-radius:var(--di-border-radius);color:var(--di-text);cursor:pointer;font-size:var(--overlay-font-size-md);padding:var(--overlay-padding-sm) var(--overlay-padding-md);transition:var(--overlay-transition)}.overlay-styled .overlay-card-swipe-next:hover,.overlay-styled .overlay-card-swipe-prev:hover{background:var(--overlay-secondary-color)}.overlay-styled .overlay-card-swipe-next:disabled,.overlay-styled .overlay-card-swipe-prev:disabled{cursor:not-allowed;opacity:.4}.overlay-styled .overlay-card-swipe-prev{margin-right:auto}.overlay-styled .overlay-card-swipe-next{margin-left:auto}:root{--di-background:hsla(0,0%,7%,.75);--di-background-solid:#121212;--di-background-rgb:18,18,18;--di-text:hsla(0,0%,100%,.97);--di-shadow:rgba(0,0,0,.35);--di-focus-ring:hsla(0,0%,100%,.7);--di-glass-opacity:0.75;--di-glass-blur:16px;--di-glass-border:hsla(0,0%,100%,.1);--di-glass-shadow-primary:rgba(0,0,0,.35);--di-glass-shadow-secondary:rgba(0,0,0,.25);--di-hover-scale:1.03;--di-active-scale:0.97;--di-hover-brightness:1.1;--di-active-brightness:0.9;--di-accent:#0a84ff;--di-accent-gradient:linear-gradient(120deg,#0a84ff,#06c);--di-alert-bg:rgba(255,69,58,.97);--di-alert-rgb:255,69,58;--di-success-bg:rgba(48,209,88,.97);--di-success-rgb:48,209,88;--di-warning-bg:rgba(255,214,10,.97);--di-warning-rgb:255,214,10;--di-error-bg:rgba(255,69,58,.97);--di-error-rgb:255,69,58}[data-theme=light]{--di-background:hsla(0,0%,98%,.75);--di-background-solid:#fafafa;--di-background-rgb:250,250,250;--di-text:hsla(0,0%,4%,.97);--di-shadow:rgba(0,0,0,.2);--di-focus-ring:rgba(0,0,0,.3);--di-glass-border:rgba(0,0,0,.1);--di-glass-shadow-primary:rgba(0,0,0,.2);--di-glass-shadow-secondary:rgba(0,0,0,.15)}html{transition:background-color .3s ease-in-out,color .3s ease-in-out}.overlay-styled .overlay-card{backdrop-filter:blur(var(--di-glass-blur));-webkit-backdrop-filter:blur(var(--di-glass-blur));background-color:var(--di-background);border:1px solid var(--di-glass-border);box-shadow:0 6px 16px var(--di-shadow);color:var(--di-text)}.overlay-styled .overlay-portal{backdrop-filter:none;-webkit-backdrop-filter:none;background-color:transparent;border:none;box-shadow:none;color:inherit;transition:background-color .2s ease-in-out,box-shadow .2s ease-in-out,border-color .2s ease-in-out}[data-theme=light] .overlay-styled .overlay-card{background-color:var(--di-background);border:1px solid var(--di-glass-border);box-shadow:0 4px 12px var(--di-shadow);color:var(--di-text)}.overlay-card:focus-visible{outline:2px solid var(--di-focus-ring);outline-offset:3px}.overlay-styled .overlay-card{transition:background-color .2s ease-in-out,box-shadow .2s ease-in-out,border-color .2s ease-in-out,color .2s ease-in-out}";
styleInject(css_248z);

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE$2
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
	        case REACT_FRAGMENT_TYPE:
	          return "Fragment";
	        case REACT_PORTAL_TYPE:
	          return "Portal";
	        case REACT_PROFILER_TYPE:
	          return "Profiler";
	        case REACT_STRICT_MODE_TYPE:
	          return "StrictMode";
	        case REACT_SUSPENSE_TYPE:
	          return "Suspense";
	        case REACT_SUSPENSE_LIST_TYPE:
	          return "SuspenseList";
	      }
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_CONTEXT_TYPE:
	            return (type.displayName || "Context") + ".Provider";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
	          case REACT_LAZY_TYPE:
	            innerType = type._payload;
	            type = type._init;
	            try {
	              return getComponentNameFromType(type(innerType));
	            } catch (x) {}
	        }
	      return null;
	    }
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function checkKeyStringCoercion(value) {
	      try {
	        testStringCoercion(value);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = true;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function disabledLog() {}
	    function disableLogs() {
	      if (0 === disabledDepth) {
	        prevLog = console.log;
	        prevInfo = console.info;
	        prevWarn = console.warn;
	        prevError = console.error;
	        prevGroup = console.group;
	        prevGroupCollapsed = console.groupCollapsed;
	        prevGroupEnd = console.groupEnd;
	        var props = {
	          configurable: true,
	          enumerable: true,
	          value: disabledLog,
	          writable: true
	        };
	        Object.defineProperties(console, {
	          info: props,
	          log: props,
	          warn: props,
	          error: props,
	          group: props,
	          groupCollapsed: props,
	          groupEnd: props
	        });
	      }
	      disabledDepth++;
	    }
	    function reenableLogs() {
	      disabledDepth--;
	      if (0 === disabledDepth) {
	        var props = { configurable: true, enumerable: true, writable: true };
	        Object.defineProperties(console, {
	          log: assign({}, props, { value: prevLog }),
	          info: assign({}, props, { value: prevInfo }),
	          warn: assign({}, props, { value: prevWarn }),
	          error: assign({}, props, { value: prevError }),
	          group: assign({}, props, { value: prevGroup }),
	          groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
	          groupEnd: assign({}, props, { value: prevGroupEnd })
	        });
	      }
	      0 > disabledDepth &&
	        console.error(
	          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
	        );
	    }
	    function describeBuiltInComponentFrame(name) {
	      if (void 0 === prefix)
	        try {
	          throw Error();
	        } catch (x) {
	          var match = x.stack.trim().match(/\n( *(at )?)/);
	          prefix = (match && match[1]) || "";
	          suffix =
	            -1 < x.stack.indexOf("\n    at")
	              ? " (<anonymous>)"
	              : -1 < x.stack.indexOf("@")
	                ? "@unknown:0:0"
	                : "";
	        }
	      return "\n" + prefix + name + suffix;
	    }
	    function describeNativeComponentFrame(fn, construct) {
	      if (!fn || reentry) return "";
	      var frame = componentFrameCache.get(fn);
	      if (void 0 !== frame) return frame;
	      reentry = true;
	      frame = Error.prepareStackTrace;
	      Error.prepareStackTrace = void 0;
	      var previousDispatcher = null;
	      previousDispatcher = ReactSharedInternals.H;
	      ReactSharedInternals.H = null;
	      disableLogs();
	      try {
	        var RunInRootFrame = {
	          DetermineComponentFrameRoot: function () {
	            try {
	              if (construct) {
	                var Fake = function () {
	                  throw Error();
	                };
	                Object.defineProperty(Fake.prototype, "props", {
	                  set: function () {
	                    throw Error();
	                  }
	                });
	                if ("object" === typeof Reflect && Reflect.construct) {
	                  try {
	                    Reflect.construct(Fake, []);
	                  } catch (x) {
	                    var control = x;
	                  }
	                  Reflect.construct(fn, [], Fake);
	                } else {
	                  try {
	                    Fake.call();
	                  } catch (x$0) {
	                    control = x$0;
	                  }
	                  fn.call(Fake.prototype);
	                }
	              } else {
	                try {
	                  throw Error();
	                } catch (x$1) {
	                  control = x$1;
	                }
	                (Fake = fn()) &&
	                  "function" === typeof Fake.catch &&
	                  Fake.catch(function () {});
	              }
	            } catch (sample) {
	              if (sample && control && "string" === typeof sample.stack)
	                return [sample.stack, control.stack];
	            }
	            return [null, null];
	          }
	        };
	        RunInRootFrame.DetermineComponentFrameRoot.displayName =
	          "DetermineComponentFrameRoot";
	        var namePropDescriptor = Object.getOwnPropertyDescriptor(
	          RunInRootFrame.DetermineComponentFrameRoot,
	          "name"
	        );
	        namePropDescriptor &&
	          namePropDescriptor.configurable &&
	          Object.defineProperty(
	            RunInRootFrame.DetermineComponentFrameRoot,
	            "name",
	            { value: "DetermineComponentFrameRoot" }
	          );
	        var _RunInRootFrame$Deter =
	            RunInRootFrame.DetermineComponentFrameRoot(),
	          sampleStack = _RunInRootFrame$Deter[0],
	          controlStack = _RunInRootFrame$Deter[1];
	        if (sampleStack && controlStack) {
	          var sampleLines = sampleStack.split("\n"),
	            controlLines = controlStack.split("\n");
	          for (
	            _RunInRootFrame$Deter = namePropDescriptor = 0;
	            namePropDescriptor < sampleLines.length &&
	            !sampleLines[namePropDescriptor].includes(
	              "DetermineComponentFrameRoot"
	            );

	          )
	            namePropDescriptor++;
	          for (
	            ;
	            _RunInRootFrame$Deter < controlLines.length &&
	            !controlLines[_RunInRootFrame$Deter].includes(
	              "DetermineComponentFrameRoot"
	            );

	          )
	            _RunInRootFrame$Deter++;
	          if (
	            namePropDescriptor === sampleLines.length ||
	            _RunInRootFrame$Deter === controlLines.length
	          )
	            for (
	              namePropDescriptor = sampleLines.length - 1,
	                _RunInRootFrame$Deter = controlLines.length - 1;
	              1 <= namePropDescriptor &&
	              0 <= _RunInRootFrame$Deter &&
	              sampleLines[namePropDescriptor] !==
	                controlLines[_RunInRootFrame$Deter];

	            )
	              _RunInRootFrame$Deter--;
	          for (
	            ;
	            1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter;
	            namePropDescriptor--, _RunInRootFrame$Deter--
	          )
	            if (
	              sampleLines[namePropDescriptor] !==
	              controlLines[_RunInRootFrame$Deter]
	            ) {
	              if (1 !== namePropDescriptor || 1 !== _RunInRootFrame$Deter) {
	                do
	                  if (
	                    (namePropDescriptor--,
	                    _RunInRootFrame$Deter--,
	                    0 > _RunInRootFrame$Deter ||
	                      sampleLines[namePropDescriptor] !==
	                        controlLines[_RunInRootFrame$Deter])
	                  ) {
	                    var _frame =
	                      "\n" +
	                      sampleLines[namePropDescriptor].replace(
	                        " at new ",
	                        " at "
	                      );
	                    fn.displayName &&
	                      _frame.includes("<anonymous>") &&
	                      (_frame = _frame.replace("<anonymous>", fn.displayName));
	                    "function" === typeof fn &&
	                      componentFrameCache.set(fn, _frame);
	                    return _frame;
	                  }
	                while (1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter);
	              }
	              break;
	            }
	        }
	      } finally {
	        (reentry = false),
	          (ReactSharedInternals.H = previousDispatcher),
	          reenableLogs(),
	          (Error.prepareStackTrace = frame);
	      }
	      sampleLines = (sampleLines = fn ? fn.displayName || fn.name : "")
	        ? describeBuiltInComponentFrame(sampleLines)
	        : "";
	      "function" === typeof fn && componentFrameCache.set(fn, sampleLines);
	      return sampleLines;
	    }
	    function describeUnknownElementTypeFrameInDEV(type) {
	      if (null == type) return "";
	      if ("function" === typeof type) {
	        var prototype = type.prototype;
	        return describeNativeComponentFrame(
	          type,
	          !(!prototype || !prototype.isReactComponent)
	        );
	      }
	      if ("string" === typeof type) return describeBuiltInComponentFrame(type);
	      switch (type) {
	        case REACT_SUSPENSE_TYPE:
	          return describeBuiltInComponentFrame("Suspense");
	        case REACT_SUSPENSE_LIST_TYPE:
	          return describeBuiltInComponentFrame("SuspenseList");
	      }
	      if ("object" === typeof type)
	        switch (type.$$typeof) {
	          case REACT_FORWARD_REF_TYPE:
	            return (type = describeNativeComponentFrame(type.render, false)), type;
	          case REACT_MEMO_TYPE:
	            return describeUnknownElementTypeFrameInDEV(type.type);
	          case REACT_LAZY_TYPE:
	            prototype = type._payload;
	            type = type._init;
	            try {
	              return describeUnknownElementTypeFrameInDEV(type(prototype));
	            } catch (x) {}
	        }
	      return "";
	    }
	    function getOwner() {
	      var dispatcher = ReactSharedInternals.A;
	      return null === dispatcher ? null : dispatcher.getOwner();
	    }
	    function hasValidKey(config) {
	      if (hasOwnProperty.call(config, "key")) {
	        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
	        if (getter && getter.isReactWarning) return false;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = true),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = true;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: true
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = true),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(type, key, self, source, owner, props) {
	      self = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== self ? self : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: false,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: false, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: null
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      source,
	      self
	    ) {
	      if (
	        "string" === typeof type ||
	        "function" === typeof type ||
	        type === REACT_FRAGMENT_TYPE ||
	        type === REACT_PROFILER_TYPE ||
	        type === REACT_STRICT_MODE_TYPE ||
	        type === REACT_SUSPENSE_TYPE ||
	        type === REACT_SUSPENSE_LIST_TYPE ||
	        type === REACT_OFFSCREEN_TYPE ||
	        ("object" === typeof type &&
	          null !== type &&
	          (type.$$typeof === REACT_LAZY_TYPE ||
	            type.$$typeof === REACT_MEMO_TYPE ||
	            type.$$typeof === REACT_CONTEXT_TYPE ||
	            type.$$typeof === REACT_CONSUMER_TYPE ||
	            type.$$typeof === REACT_FORWARD_REF_TYPE ||
	            type.$$typeof === REACT_CLIENT_REFERENCE$1 ||
	            void 0 !== type.getModuleId))
	      ) {
	        var children = config.children;
	        if (void 0 !== children)
	          if (isStaticChildren)
	            if (isArrayImpl(children)) {
	              for (
	                isStaticChildren = 0;
	                isStaticChildren < children.length;
	                isStaticChildren++
	              )
	                validateChildKeys(children[isStaticChildren], type);
	              Object.freeze && Object.freeze(children);
	            } else
	              console.error(
	                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	              );
	          else validateChildKeys(children, type);
	      } else {
	        children = "";
	        if (
	          void 0 === type ||
	          ("object" === typeof type &&
	            null !== type &&
	            0 === Object.keys(type).length)
	        )
	          children +=
	            " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
	        null === type
	          ? (isStaticChildren = "null")
	          : isArrayImpl(type)
	            ? (isStaticChildren = "array")
	            : void 0 !== type && type.$$typeof === REACT_ELEMENT_TYPE
	              ? ((isStaticChildren =
	                  "<" +
	                  (getComponentNameFromType(type.type) || "Unknown") +
	                  " />"),
	                (children =
	                  " Did you accidentally export a JSX literal instead of a component?"))
	              : (isStaticChildren = typeof type);
	        console.error(
	          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
	          isStaticChildren,
	          children
	        );
	      }
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = true));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(type, children, self, source, getOwner(), maybeKey);
	    }
	    function validateChildKeys(node, parentType) {
	      if (
	        "object" === typeof node &&
	        node &&
	        node.$$typeof !== REACT_CLIENT_REFERENCE
	      )
	        if (isArrayImpl(node))
	          for (var i = 0; i < node.length; i++) {
	            var child = node[i];
	            isValidElement(child) && validateExplicitKey(child, parentType);
	          }
	        else if (isValidElement(node))
	          node._store && (node._store.validated = 1);
	        else if (
	          (null === node || "object" !== typeof node
	            ? (i = null)
	            : ((i =
	                (MAYBE_ITERATOR_SYMBOL && node[MAYBE_ITERATOR_SYMBOL]) ||
	                node["@@iterator"]),
	              (i = "function" === typeof i ? i : null)),
	          "function" === typeof i &&
	            i !== node.entries &&
	            ((i = i.call(node)), i !== node))
	        )
	          for (; !(node = i.next()).done; )
	            isValidElement(node.value) &&
	              validateExplicitKey(node.value, parentType);
	    }
	    function isValidElement(object) {
	      return (
	        "object" === typeof object &&
	        null !== object &&
	        object.$$typeof === REACT_ELEMENT_TYPE
	      );
	    }
	    function validateExplicitKey(element, parentType) {
	      if (
	        element._store &&
	        !element._store.validated &&
	        null == element.key &&
	        ((element._store.validated = 1),
	        (parentType = getCurrentComponentErrorInfo(parentType)),
	        !ownerHasKeyUseWarning[parentType])
	      ) {
	        ownerHasKeyUseWarning[parentType] = true;
	        var childOwner = "";
	        element &&
	          null != element._owner &&
	          element._owner !== getOwner() &&
	          ((childOwner = null),
	          "number" === typeof element._owner.tag
	            ? (childOwner = getComponentNameFromType(element._owner.type))
	            : "string" === typeof element._owner.name &&
	              (childOwner = element._owner.name),
	          (childOwner = " It was passed a child from " + childOwner + "."));
	        var prevGetCurrentStack = ReactSharedInternals.getCurrentStack;
	        ReactSharedInternals.getCurrentStack = function () {
	          var stack = describeUnknownElementTypeFrameInDEV(element.type);
	          prevGetCurrentStack && (stack += prevGetCurrentStack() || "");
	          return stack;
	        };
	        console.error(
	          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
	          parentType,
	          childOwner
	        );
	        ReactSharedInternals.getCurrentStack = prevGetCurrentStack;
	      }
	    }
	    function getCurrentComponentErrorInfo(parentType) {
	      var info = "",
	        owner = getOwner();
	      owner &&
	        (owner = getComponentNameFromType(owner.type)) &&
	        (info = "\n\nCheck the render method of `" + owner + "`.");
	      info ||
	        ((parentType = getComponentNameFromType(parentType)) &&
	          (info =
	            "\n\nCheck the top-level render call using <" + parentType + ">."));
	      return info;
	    }
	    var React = require$$0,
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"),
	      MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
	      REACT_CLIENT_REFERENCE$2 = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      assign = Object.assign,
	      REACT_CLIENT_REFERENCE$1 = Symbol.for("react.client.reference"),
	      isArrayImpl = Array.isArray,
	      disabledDepth = 0,
	      prevLog,
	      prevInfo,
	      prevWarn,
	      prevError,
	      prevGroup,
	      prevGroupCollapsed,
	      prevGroupEnd;
	    disabledLog.__reactDisabledLog = true;
	    var prefix,
	      suffix,
	      reentry = false;
	    var componentFrameCache = new (
	      "function" === typeof WeakMap ? WeakMap : Map
	    )();
	    var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var didWarnAboutKeySpread = {},
	      ownerHasKeyUseWarning = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey, source, self) {
	      return jsxDEVImpl(type, config, maybeKey, false, source, self);
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey, source, self) {
	      return jsxDEVImpl(type, config, maybeKey, true, source, self);
	    };
	  })();
	return reactJsxRuntime_development;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;

	if (process.env.NODE_ENV === 'production') {
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	} else {
	  jsxRuntime.exports = requireReactJsxRuntime_development();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

/**
 * channelReducer.ts
 *
 * A sub-reducer that updates a single channel based on actions
 * targeting that channel (ADD_CARD, REMOVE_CARD, SWIPE_NEXT_CARD, etc.).
 */
function channelReducer(channel, action) {
    switch (action.type) {
        case 'ADD_CARD': {
            // Ensure action.payload.channelId matches this channel
            if (action.payload.channelId !== channel.channelId)
                return channel;
            const { card } = action.payload;
            return {
                ...channel,
                cards: [...channel.cards, card],
            };
        }
        case 'REMOVE_CARD': {
            if (action.payload.channelId !== channel.channelId)
                return channel;
            const { cardId } = action.payload;
            return {
                ...channel,
                cards: channel.cards.filter((c) => c.id !== cardId),
            };
        }
        case 'SWIPE_NEXT_CARD': {
            if (action.payload.channelId !== channel.channelId)
                return channel;
            if (channel.cards.length === 0)
                return channel; // nothing to swipe
            const nextIndex = Math.min(channel.activeCardIndex + 1, channel.cards.length - 1);
            return {
                ...channel,
                activeCardIndex: nextIndex,
            };
        }
        case 'SWIPE_PREV_CARD': {
            if (action.payload.channelId !== channel.channelId)
                return channel;
            if (channel.cards.length === 0)
                return channel; // nothing to swipe
            const prevIndex = Math.max(channel.activeCardIndex - 1, 0);
            return {
                ...channel,
                activeCardIndex: prevIndex,
            };
        }
        case 'UPDATE_CHANNEL_STATE': {
            if (action.payload.channelId !== channel.channelId)
                return channel;
            const { newState } = action.payload;
            return {
                ...channel,
                state: newState,
            };
        }
        case 'CLEAR_CHANNEL_CARDS': {
            if (action.payload.channelId !== channel.channelId)
                return channel;
            return {
                ...channel,
                cards: [],
                activeCardIndex: 0,
            };
        }
        default:
            // If the action doesn't match, return channel unchanged
            return channel;
    }
}

/**
 * aggregatorReducer.ts
 *
 * The main reducer that manages OverlayAggregatorState.
 * Delegates channel-level actions to channelReducer.
 */
function aggregatorReducer(state, action) {
    switch (action.type) {
        // 1. CHANNEL LIFECYCLE
        case 'REGISTER_CHANNEL': {
            const { channelId, priority } = action.payload;
            // If the channel already exists, do nothing or update it
            if (state.channels[channelId]) {
                return state;
            }
            // Create a new channel with default values
            const newChannel = {
                channelId,
                priority,
                cards: [],
                activeCardIndex: 0,
                state: 'hidden', // default overlay state
            };
            return {
                ...state,
                channels: {
                    ...state.channels,
                    [channelId]: newChannel,
                },
            };
        }
        case 'UNREGISTER_CHANNEL': {
            const { channelId } = action.payload;
            if (!state.channels[channelId]) {
                return state; // channel doesn't exist
            }
            // Shallow copy channels, remove target
            const updatedChannels = { ...state.channels };
            delete updatedChannels[channelId];
            // If we were displaying that channel, clear activeChannelId
            const isActive = state.activeChannelId === channelId;
            return {
                ...state,
                channels: updatedChannels,
                activeChannelId: isActive ? null : state.activeChannelId,
            };
        }
        // 2. ACTIVE CHANNEL MANAGEMENT
        case 'SET_ACTIVE_CHANNEL': {
            const { channelId } = action.payload;
            // Optional concurrency logic: check if channelId is valid, priority rules, etc.
            if (!state.channels[channelId])
                return state;
            return {
                ...state,
                activeChannelId: channelId,
            };
        }
        // 3. DELEGATE CHANNEL-LEVEL ACTIONS
        case 'UPDATE_CHANNEL_STATE':
        case 'ADD_CARD':
        case 'REMOVE_CARD':
        case 'SWIPE_NEXT_CARD':
        case 'SWIPE_PREV_CARD':
        case 'CLEAR_CHANNEL_CARDS': {
            const channelId = 'channelId' in action.payload ? action.payload.channelId : null;
            if (!channelId || !state.channels[channelId]) {
                return state; // channel doesn't exist or invalid
            }
            // Delegate to sub-reducer for channel
            const oldChannel = state.channels[channelId];
            const updatedChannel = channelReducer(oldChannel, action);
            let nextState = {
                ...state,
                channels: {
                    ...state.channels,
                    [channelId]: updatedChannel,
                },
            };
            // Optional concurrency example:
            // If a card is added to a higher-priority channel, switch active?
            if (action.type === 'ADD_CARD') {
                const newChannelPriority = updatedChannel.priority;
                const currentActive = nextState.activeChannelId ? nextState.channels[nextState.activeChannelId] : null;
                const isHigherPriority = !currentActive || newChannelPriority > currentActive.priority;
                if (isHigherPriority) {
                    nextState = {
                        ...nextState,
                        activeChannelId: channelId,
                    };
                }
            }
            return nextState;
        }
        default:
            return state;
    }
}

/**
 * aggregatorContext.ts
 *
 * Creates and exports the aggregator context for your overlay system.
 * Other files, like aggregatorProvider.ts, will set its value.
 */
// Create the context but provide an undefined default, so we can
// throw an error if used outside a provider.
const AggregatorContext = require$$0.createContext(undefined);

/**
 * useAggregator.ts
 *
 * Provides a custom hook that consumes the aggregator context,
 * returning state, dispatch, and convenience action creators.
 * This hook covers all the main overlay aggregator features: register/unregister,
 * set active, update states, add/remove/swipe cards, etc.
 *
 * Now includes helper methods to demonstrate usage of all imported types.
 */
/**
 * useAggregator
 *
 * A custom hook to access the overlay aggregator's state and dispatch.
 * It provides typed action creators for all major operations:
 * - registerChannel, unregisterChannel
 * - setActiveChannel, updateChannelState
 * - addCard, removeCard
 * - swipeNextCard, swipePrevCard
 * - clearChannelCards
 *
 * Additionally, we include helper getters to showcase usage of the Channel and OverlayCard types.
 */
function useAggregator() {
    const context = useContext(AggregatorContext);
    if (!context) {
        throw new Error('useAggregator must be used within an AggregatorProvider');
    }
    const { state, dispatch } = context;
    // ----- CHANNEL LIFECYCLE -----
    /**
     * Registers a new channel in the aggregator if it doesn't already exist.
     * @param channelId Unique identifier for the channel.
     * @param priority Higher priority channels may override others if concurrency logic is used.
     */
    const registerChannel = useCallback((channelId, priority) => {
        dispatch({ type: 'REGISTER_CHANNEL', payload: { channelId, priority } });
    }, [dispatch]);
    /**
     * Unregisters an existing channel, removing it from the aggregator.
     * If it was active, activeChannelId becomes null.
     * @param channelId The channel to remove.
     */
    const unregisterChannel = useCallback((channelId) => {
        dispatch({ type: 'UNREGISTER_CHANNEL', payload: { channelId } });
    }, [dispatch]);
    /**
     * Sets which channel should be active in the aggregator.
     * @param channelId The channel to focus.
     */
    const setActiveChannel = useCallback((channelId) => {
        dispatch({ type: 'SET_ACTIVE_CHANNEL', payload: { channelId } });
    }, [dispatch]);
    // ----- CHANNEL STATE -----
    /**
     * Updates a channel's overlay state (e.g., 'collapsed', 'expanded', 'alert').
     * @param channelId Channel to update.
     * @param newState The new overlay state.
     */
    const updateChannelState = useCallback((channelId, newState) => {
        dispatch({
            type: 'UPDATE_CHANNEL_STATE',
            payload: { channelId, newState },
        });
    }, [dispatch]);
    // ----- CARD MANAGEMENT -----
    /**
     * Adds a new card to the specified channel.
     * @param channelId Which channel to add the card to.
     * @param card The overlay card object to add.
     */
    const addCard = useCallback((channelId, card) => {
        dispatch({ type: 'ADD_CARD', payload: { channelId, card } });
    }, [dispatch]);
    /**
     * Removes a card from a channel.
     * @param channelId The channel whose card is to be removed.
     * @param cardId The unique card ID to remove.
     */
    const removeCard = useCallback((channelId, cardId) => {
        dispatch({ type: 'REMOVE_CARD', payload: { channelId, cardId } });
    }, [dispatch]);
    /**
     * Clears all cards in a given channel.
     * @param channelId The channel to clear.
     */
    const clearChannelCards = useCallback((channelId) => {
        dispatch({ type: 'CLEAR_CHANNEL_CARDS', payload: { channelId } });
    }, [dispatch]);
    // ----- SWIPING / NAVIGATION -----
    /**
     * Moves to the next card in the channel's queue (if any).
     * @param channelId The channel in which we navigate.
     */
    const swipeNextCard = useCallback((channelId) => {
        dispatch({ type: 'SWIPE_NEXT_CARD', payload: { channelId } });
    }, [dispatch]);
    /**
     * Moves to the previous card in the channel's queue (if any).
     * @param channelId The channel in which we navigate.
     */
    const swipePrevCard = useCallback((channelId) => {
        dispatch({ type: 'SWIPE_PREV_CARD', payload: { channelId } });
    }, [dispatch]);
    // ----- HELPER GETTERS -----
    /**
     * Returns the channel object for the given channelId, or undefined if not found.
     * @param channelId The channel to retrieve.
     */
    const getChannel = useCallback((channelId) => {
        return state.channels[channelId];
    }, [state]);
    /**
     * Returns the currently active channel (if any), or null if none is active.
     */
    const getActiveChannel = useCallback(() => {
        const activeId = state.activeChannelId;
        if (!activeId)
            return null;
        return state.channels[activeId] || null;
    }, [state]);
    /**
     * Gets the currently displayed card in a given channel, if any.
     * @param channelId The channel whose active card we want.
     */
    const getActiveCard = useCallback((channelId) => {
        const ch = state.channels[channelId];
        if (!ch || ch.cards.length === 0)
            return null;
        return ch.cards[ch.activeCardIndex] || null;
    }, [state]);
    // Return everything needed for aggregator usage.
    return {
        // Raw aggregator state
        state,
        // Low-level dispatch (if needed)
        dispatch,
        // Channel lifecycle
        registerChannel,
        unregisterChannel,
        // Active channel
        setActiveChannel,
        updateChannelState,
        // Cards
        addCard,
        removeCard,
        clearChannelCards,
        // Swiping
        swipeNextCard,
        swipePrevCard,
        // Helper getters
        getChannel,
        getActiveChannel,
        getActiveCard,
    };
}

function OverlayCard({ channelId, card }) {
    const { state, updateChannelState, removeCard, swipeNextCard, swipePrevCard, } = useAggregator();
    const touchStartX = useRef(null);
    const touchDeltaX = useRef(0);
    const swipeTriggered = useRef(false);
    const [direction, setDirection] = useState(null);
    const channel = state.channels[channelId];
    if (!channel)
        return null;
    const isExpanded = channel.state === 'expanded';
    // 🔹 Toggle expand/collapse on click
    const handleToggle = useCallback(() => {
        if (swipeTriggered.current) {
            swipeTriggered.current = false;
            return;
        }
        updateChannelState(channelId, isExpanded ? 'collapsed' : 'expanded');
    }, [channelId, isExpanded, updateChannelState]);
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };
    const handleTouchMove = (e) => {
        if (touchStartX.current !== null) {
            touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
        }
    };
    const handleTouchEnd = () => {
        if (touchStartX.current === null)
            return;
        const deltaX = touchDeltaX.current;
        const THRESHOLD = 50;
        if (Math.abs(deltaX) >= THRESHOLD) {
            swipeTriggered.current = true;
            if (deltaX < 0) {
                setDirection('next');
                swipeNextCard(channelId);
            }
            else {
                setDirection('prev');
                swipePrevCard(channelId);
            }
            setTimeout(() => setDirection(null), 200);
        }
        touchStartX.current = null;
        touchDeltaX.current = 0;
    };
    const directionClass = direction === 'next'
        ? 'overlay-card--swipe-left'
        : direction === 'prev'
            ? 'overlay-card--swipe-right'
            : '';
    return (jsxRuntimeExports.jsxs("div", { className: `overlay-card ${isExpanded ? 'overlay-card--expanded' : 'overlay-card--collapsed'} ${directionClass}`, onClick: handleToggle, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, role: "button", tabIndex: 0, "aria-expanded": isExpanded, "aria-label": `Overlay Card - ${card.title}`, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle();
            }
        }, children: [card.icon && (jsxRuntimeExports.jsx("div", { className: "overlay-card-icon", "aria-hidden": "true", children: card.icon })), jsxRuntimeExports.jsxs("div", { className: "overlay-card-content", children: [jsxRuntimeExports.jsx("h3", { className: "overlay-card-title", children: card.title }), jsxRuntimeExports.jsx("p", { className: "overlay-card-body", style: {
                            opacity: isExpanded ? 1 : 0,
                            height: isExpanded ? 'auto' : 0,
                        }, children: card.content })] }), isExpanded && (jsxRuntimeExports.jsxs("div", { className: "overlay-card-actions", children: [jsxRuntimeExports.jsx("button", { className: "overlay-card-swipe-prev", "aria-label": "Previous item", onClick: (e) => {
                            e.stopPropagation();
                            swipePrevCard(channelId);
                        }, children: "\u25C0" }), jsxRuntimeExports.jsx("button", { className: "overlay-card-remove", "aria-label": "Close overlay", onClick: (e) => {
                            e.stopPropagation();
                            removeCard(channelId, card.id);
                        }, children: "\u2716" }), jsxRuntimeExports.jsx("button", { className: "overlay-card-swipe-next", "aria-label": "Next item", onClick: (e) => {
                            e.stopPropagation();
                            swipeNextCard(channelId);
                        }, children: "\u25B6" })] }))] }));
}

function OverlayPortal({ concurrencyMode = 'single', portalRoot, unstyled, sticky = false, position = 'top', }) {
    const overlayClass = `overlay-library ${unstyled ? '' : 'overlay-styled'}`;
    const { state, getActiveChannel, getActiveCard } = useAggregator();
    const root = portalRoot ?? document.body;
    // 🔹 SINGLE CONCURRENCY MODE: Only show the active channel's card
    if (concurrencyMode === 'single') {
        const activeChannel = getActiveChannel();
        // Nothing to render when there is no active channel
        if (!activeChannel)
            return null;
        const activeCard = getActiveCard(activeChannel.channelId);
        // Guard against an active channel with no cards
        if (!activeCard)
            return null;
        return ReactDOM.createPortal(jsxRuntimeExports.jsx("div", { className: overlayClass, children: jsxRuntimeExports.jsx("div", { role: "status", "aria-live": "polite", children: jsxRuntimeExports.jsx(DefaultOverlay, { channelId: activeChannel.channelId, cardId: activeCard.id, sticky: sticky, position: position }) }) }), root);
    }
    // 🔹 MULTIPLE CONCURRENCY MODE: Display multiple active overlays
    const activeChannels = Object.values(state.channels).filter((ch) => ch.cards.length > 0);
    // Nothing to render if no channel currently holds cards
    if (activeChannels.length === 0)
        return null;
    const overlays = activeChannels
        .map((channel) => {
        const activeCard = getActiveCard(channel.channelId);
        return activeCard ? (jsxRuntimeExports.jsx(DefaultOverlay, { channelId: channel.channelId, cardId: activeCard.id, sticky: sticky, position: position }, channel.channelId)) : null;
    })
        .filter(Boolean);
    // Guard against channels that have no active cards
    if (overlays.length === 0)
        return null;
    return ReactDOM.createPortal(jsxRuntimeExports.jsx("div", { className: overlayClass, children: jsxRuntimeExports.jsx("div", { role: "status", "aria-live": "polite", className: "overlay-multiple-container", children: overlays }) }), root);
}
/**
 * DefaultOverlay
 *
 * Fetches the correct card from the aggregator and renders it.
 */
function DefaultOverlay({ channelId, cardId, sticky, position, }) {
    const { removeCard, swipeNextCard, swipePrevCard, state } = useAggregator();
    const channel = state.channels[channelId];
    if (!channel)
        return null;
    const card = channel.cards.find((c) => c.id === cardId);
    if (!card)
        return null;
    const portalClasses = [
        'overlay-portal',
        sticky ? 'overlay-portal--sticky' : '',
        `overlay-portal--${position}`,
    ]
        .filter(Boolean)
        .join(' ');
    return (jsxRuntimeExports.jsx("div", { className: "overlay-container", children: jsxRuntimeExports.jsx("div", { className: portalClasses, "data-state": channel.state, children: jsxRuntimeExports.jsx(OverlayCard, { channelId: channelId, card: card }) }) }));
}

// A simple default aggregator state
const initialAggregatorState = {
    channels: {},
    activeChannelId: null,
};
/**
 * AggregatorProvider
 *
 * The main context provider for your overlay aggregator.
 * Supports concurrency modes, auto-dismiss, and an optional debug mode.
 * When the `debug` prop is enabled, every dispatched action will be logged
 * along with the state before and after the update.
 * Typically, your app will wrap around `<AggregatorProvider>` or `<Floatify>`
 * so that child components can dispatch overlay actions or read aggregator state.
 */
function AggregatorProvider({ children, concurrencyMode = 'single', autoDismiss = false, autoDismissTimeout = 3000, debug = false, portalRoot, unstyled = false, sticky = false, position = 'top', }) {
    const [state, baseDispatch] = useReducer(aggregatorReducer, initialAggregatorState);
    // Keep a ref to the latest state so the debug logger can read
    // the state before dispatch updates it
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);
    // Dispatch wrapper that logs action and state transitions when debug is enabled
    const debugDispatch = useCallback((action) => {
        if (debug) {
            const prevState = stateRef.current;
            const nextState = aggregatorReducer(prevState, action);
            console.groupCollapsed(`[Floatify] ${action.type}`);
            console.log('prev state', prevState);
            console.log('action', action);
            console.log('next state', nextState);
            console.groupEnd();
        }
        baseDispatch(action);
    }, [debug, baseDispatch]);
    // Use the debug wrapper only when the flag is true
    const dispatch = debug ? debugDispatch : baseDispatch;
    // If concurrencyMode = 'priority', you might do additional logic in the aggregator reducer
    // or here in a side effect (e.g., watch new channels or new cards and auto-select highest priority).
    // Currently, we rely on aggregatorReducer logic for concurrency.
    // Auto-dismiss example: watch for newly added cards and set a timer
    useEffect(() => {
        if (!autoDismiss)
            return;
        // Minimal example: you could track newly added cards. In practice, you'd store times or track item changes.
    }, [autoDismiss, autoDismissTimeout, state.channels]);
    // Memoize the context value so we don't cause re-renders beyond the aggregator state changes
    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);
    return (jsxRuntimeExports.jsxs(AggregatorContext.Provider, { value: contextValue, children: [children, jsxRuntimeExports.jsx(OverlayPortal, { portalRoot: portalRoot, concurrencyMode: concurrencyMode, unstyled: unstyled, autoDismiss: autoDismiss, sticky: sticky, position: position })] }));
}

function Floatify(props) {
    return jsxRuntimeExports.jsx(AggregatorProvider, { ...props });
}

export { Floatify, useAggregator };
