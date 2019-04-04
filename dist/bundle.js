!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["responsive-helpers"]=t():n["responsive-helpers"]=t()}("undefined"!=typeof self?self:this,function(){return function(n){var t={};function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)e.d(r,o,function(t){return n[t]}.bind(null,o));return r},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=0)}([function(n,t,e){"use strict";function r(n){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function o(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function i(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function a(n,t,e){return t&&i(n.prototype,t),e&&i(n,e),n}e.r(t);var u=function(){function n(t,e,r){o(this,n),this.name=t,this.from=e,this.to=r}return a(n,[{key:"css",value:function(n){return this.mediaQuery?"@media ".concat(this.mediaQuery," {\n                ").concat(n,"\n            }"):n}},{key:"isInfinite",get:function(){return void 0===this.to||null===this.to}},{key:"isCurrent",get:function(){return this.from<=window.innerWidth&&(void 0===this.to||window.innerWidth<=this.to)}},{key:"mediaQuery",get:function(){var n="undefined"===this.from||null===this.from||0===this.from?void 0:"(min-width: ".concat(this.from,"px)"),t=this.isInfinite?void 0:"(max-width: ".concat(this.to,"px)");return n&&t?"".concat(n," and ").concat(t):!n&&t?t:n&&!t?n:void 0}}]),n}(),f=function(){function n(t){o(this,n),this._rangesArray=[];var e=Object.entries(t);e=e.sort(function(n,t){return n[1]-t[1]});for(var r=0;r<e.length;r++){var i=e[r],a=i[0],f=i[1],s=void 0;r<e.length-1&&(s=e[r+1][1]-1);var c=new u(a,f,s);this._rangesArray.push(c),this[a]=c}}return a(n,[{key:"get",value:function(n){for(var t=0;t<this._rangesArray.length;t++)if(this._rangesArray[t].name===n)return this._rangesArray[t]}},{key:"fromTo",value:function(n,t){var e=this.get(n),r=this.get(t);return new u(void 0,e.from,r.to)}},{key:"from",value:function(n){var t=this.get(n);return new u(void 0,t.from,void 0)}},{key:"to",value:function(n){var t=this.get(n);return new u(void 0,0,t.to)}},{key:"map",get:function(){var n={};return this.array.forEach(function(t){n[t.name]=t}),n}},{key:"array",get:function(){return this._rangesArray}},{key:"first",get:function(){return this._rangesArray[0]}},{key:"second",get:function(){return this._rangesArray[1]}},{key:"last",get:function(){return this._rangesArray[this._rangesArray.length-1]}},{key:"current",get:function(){for(var n=0;n<this._rangesArray.length;n++)if(this._rangesArray[n].isCurrent)return this._rangesArray[n]}}]),n}(),s=function(){function n(t){o(this,n),"object"!==r(t)&&(t={0:t}),Object.keys(t).forEach(function(e){var r=t[e];delete t[e],t[n._normalizeKey(e)]=r}),this._map=t}return a(n,[{key:"get",value:function(n){return this._map[n]}},{key:"set",value:function(n,t){this._map[n]=t}},{key:"value",value:function(n){var t;return this.forEach(function(e,r){r.from<=n&&(r.isInfinite||n<=r.to)&&(t=e)}),t}},{key:"forEach",value:function(n){var t=this;this.rangeSet.array.forEach(function(e){n(t._map[e.name],e)})}},{key:"crosssect",value:function(t){for(var e,r,o,i=this,a=this.rangeSet,u=t.rangeSet,f=0,s=0,c=0,l=null,v=null,y={},m=function(){e!==c&&(y[c]={val1:i.get(l.name),val2:t.get(v.name)})};;){if(r=a.array[f],o=u.array[s],void 0===r&&void 0===o){e=null,m();break}void 0===r?(e=o.from,m(),v=o,s++):void 0===o?(e=r.from,m(),l=r,f++):r.from>=o.from?(e=o.from,m(),v=o,s++):(e=r.from,m(),l=r,f++),c=e}return new n(y)}},{key:"css",value:function(n){var t="";return this.forEach(function(e,r){t+=r.css(n(e,r))}),t}},{key:"rangeSet",get:function(){var n=Object.keys(this._map),t={};return n.forEach(function(n){t[n]=parseInt(n)}),new f(t)}},{key:"current",get:function(){return this.value(window.innerWidth)}}]),n}();function c(n,t,e){return(c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}()?Reflect.construct:function(n,t,e){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(n,r));return e&&l(o,e.prototype),o}).apply(null,arguments)}function l(n,t){return(l=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,t)}function v(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.forEach(function(t){y(n,t,e[t])})}return n}function y(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function m(n){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function p(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function h(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function d(n,t,e){return t&&h(n.prototype,t),e&&h(n,e),n}s._normalizeKey=function(n){return"string"==typeof n&&isNaN(parseInt(n))?f.main.get(n).from:n};var g=function(){function n(){var t=this;p(this,n),this._vals={};for(var e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];r.forEach(function(n){t.add$(n)})}return d(n,[{key:"clone",value:function(){var t=[];return Object.entries(this._vals).forEach(function(n){var e=n[0],r=n[1];t.push({unit:e,val:"object"===m(r)?v({},r):r})}),c(n,t)}},{key:"add",value:function(n){return this.clone().add$(n)}},{key:"add$",value:function(t){var e=this;return n._normalizeVal(t).forEach(function(n){"lin"===n.unit?(e._vals.lin||(e._vals.lin={from:0,slope:0}),e._vals.lin.from+=n.val.from,e._vals.lin.slope+=n.val.slope):(e._vals[n.unit]||(e._vals[n.unit]=0),e._vals[n.unit]+=n.val)}),this}},{key:"subtract",value:function(t){return this.clone().add$(new n(t).multiply$(-1))}},{key:"multiply$",value:function(n){var t=this;return Object.entries(this._vals).forEach(function(e){var r=e[0],o=e[1];"lin"===r?(o.from*=n,o.slope*=n):t._vals[r]*=n}),this}},{key:"multiply",value:function(n){return this.clone().multiply$(n)}},{key:"divide",value:function(n){return this.clone().multiply$(1/n)}},{key:"getValueFromOffset",value:function(n){var t=this.clone();return t.vals.lin&&(t.vals.lin.from+=t.vals.lin.slope*n),t}},{key:"val",value:function(n,t){return t=t||0,"px"===n?this._vals.lin?this._vals.lin.from+this._vals.lin.slope*t:0:this._vals[n]?this._vals[n]:0}},{key:"css",value:function(n){var t="";return Object.entries(this._vals).forEach(function(e){var r=e[0],o=e[1];""!==t&&(t+=" + "),"lin"===e[0]?t+="".concat(o.slope,"*100vw + ").concat(-o.slope*n+o.from,"px"):t+="".concat(o).concat(r)}),"calc(".concat(t,")")}},{key:"vals",get:function(){return this._vals}}]),n}();g._normalizeVal=function(n){if(n instanceof g){var t=[];return Object.entries(n.vals).forEach(function(n){t.push({unit:n[0],val:n[1]})}),t}if(Array.isArray(n))return[{unit:"lin",val:{from:n[0],slope:n[1]}}];if("object"===m(n))return[n];if("number"==typeof n)return[{unit:"lin",val:{from:n,slope:0}}];if("string"==typeof n){var e=n.match(/([\d\.]+)([a-z%]*)/),r=parseFloat(e[1]),o=e[2];return""===o||"px"===o?[{unit:"lin",val:{from:r,slope:0}}]:[{unit:o,val:r}]}throw"Bad input argument for _normalizeVal in ResponsiveSizeSegmentValue"};var b=function(){function n(t){if(p(this,n),void 0===t||"null"==typeof t)throw new Error("ResponsiveSize must not be constructed with undefined or null");if(Array.isArray(t))throw new Error("ResponsiveSize must not be constructed with array: ".concat(t,". Maybe you meant rslin instead of rs?"));if("object"!==m(t))t={0:t};else if(0===Object.keys(t).length)throw new Error("ResponsiveSize input object can't be empty!");var e;(e=t instanceof s?t:new s(t)).forEach(function(t,r){t instanceof g?e.set(r.from,{rssv:t,from:r.from}):t instanceof n?t._rangeMap.crosssect(e).forEach(function(n,t){var o=n.val1;n.val2;r.from<=t.from&&t.to<=r.to&&e.set(t.from,{rssv:o.rssv.getValueFromOffset(t.from-o.from),from:t.from})}):e.set(r.from,{rssv:new g(t),from:r.from})}),this._rangeMap=e}return d(n,[{key:"css",value:function(n){return this._rangeMap.css(function(t,e){return"".concat(function(n){return n.replace(/([A-Z])/g,function(n){return"-".concat(n[0].toLowerCase())})}(n),": ").concat(t.rssv.css(e.from),";")})}},{key:"multiply",value:function(t){var e=n._normalizeScalarInput(t),r={};return e.crosssect(this._rangeMap).forEach(function(n,t){var e=n.val1,o=n.val2.rssv;r[t.from]=o.multiply(e)}),new n(r)}},{key:"divide",value:function(t){var e=n._normalizeScalarInput(t),r={};return e.forEach(function(n,t){r[t.from]=1/n}),this.multiply(r)}},{key:"add",value:function(t){var e=this.map.crosssect(t.map),r={};return e.forEach(function(n,t){var e=n.val1.from,o=n.val1.rssv.getValueFromOffset(t.from-e),i=n.val2.from,a=n.val2.rssv.getValueFromOffset(t.from-i),u=o.add(a);r[t.from]=u}),new n(r)}},{key:"subtract",value:function(n){return this.add(n.multiply(-1))}},{key:"val",value:function(n,t){var e=this._rangeMap.value(n).from,r=this._rangeMap.value(n).rssv;return void 0===t?r:r.val(t,n-e)}},{key:"map",get:function(){return this._rangeMap}}]),n}();function _(n){return new g(n)}function w(n){return n instanceof b?n:new b(n)}function k(n,t,e){e=e||!1;var r={0:n},o=(t-n)/(f.main.last.from-f.main.second.from);return r[f.main.second.from]=[n,o],e||(r[f.main.last.from]=t),new b(r)}b._normalizeScalarInput=function(n){var t;if(n instanceof s)t=n;else if("object"===m(n))t=new s(n);else{if("number"!=typeof n)throw new Error("bad input for RangeMap.multiply or RangeMap.divide");t=new s({0:n})}return t},e.d(t,"ResponsiveSize",function(){return b}),e.d(t,"ResponsiveSizeSegmentValue",function(){return g}),e.d(t,"rs",function(){return w}),e.d(t,"rssv",function(){return _}),e.d(t,"rslin",function(){return k}),e.d(t,"RangeMap",function(){return s}),e.d(t,"RangeSet",function(){return f}),e.d(t,"Range",function(){return u}),f.main=new f({xs:0,xs_plus:420,sm:720,md:960,lg:1200,lg_plus:1366,xl:1600,xl_plus:2e3})}])});