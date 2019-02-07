!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["responsive-helpers"]=t():n["responsive-helpers"]=t()}("undefined"!=typeof self?self:this,function(){return function(n){var t={};function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)e.d(r,o,function(t){return n[t]}.bind(null,o));return r},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=0)}([function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function o(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function i(n,t,e){return t&&o(n.prototype,t),e&&o(n,e),n}e.r(t);var a=function(){function n(t,e,o){r(this,n),this.name=t,this.from=e,this.to=o}return i(n,[{key:"isInfinite",get:function(){return void 0===this.to||null===this.to}}]),n}(),u=function(){function n(t){r(this,n),this._rangesArray=[];var e=Object.entries(t);e=e.sort(function(n,t){return n[1]-t[1]});for(var o=0;o<e.length;o++){var i=e[o],u=i[0],c=i[1],f=void 0;o<e.length-1&&(f=e[o+1][1]-1);var s=new a(u,c,f);this._rangesArray.push(s)}}return i(n,[{key:"get",value:function(n){for(var t=0;t<this._rangesArray.length;t++)if(this._rangesArray[t].name===n)return this._rangesArray[t]}},{key:"map",get:function(){var n={};return this.array.forEach(function(t){n[t.name]=t}),n}},{key:"array",get:function(){return this._rangesArray}},{key:"first",get:function(){return this._rangesArray[0]}},{key:"second",get:function(){return this._rangesArray[1]}},{key:"last",get:function(){return this._rangesArray[this._rangesArray.length-1]}}]),n}(),c=function(){function n(t){r(this,n),Object.keys(t).forEach(function(e){var r=t[e];delete t[e],t[n._normalizeKey(e)]=r}),this._map=t}return i(n,[{key:"get",value:function(n){return this._map[n]}},{key:"set",value:function(n,t){this._map[n]=t}},{key:"value",value:function(n){var t;return this.forEach(function(e,r){r.from<=n&&(r.isInfinite||n<=r.to)&&(t=e)}),t}},{key:"forEach",value:function(n){var t=this;this.rangeSet.array.forEach(function(e){n(t._map[e.name],e)})}},{key:"crosssect",value:function(t){for(var e,r,o,i=this,a=this.rangeSet,u=t.rangeSet,c=0,f=0,s=0,l=null,v=null,y={},p=function(){e!==s&&(y[s]={val1:i.get(l.name),val2:t.get(v.name)})};;){if(r=a.array[c],o=u.array[f],void 0===r&&void 0===o){e=null,p();break}void 0===r?(e=o.from,p(),v=o,f++):void 0===o?(e=r.from,p(),l=r,c++):r.from>=o.from?(e=o.from,p(),v=o,f++):(e=r.from,p(),l=r,c++),s=e}return new n(y)}},{key:"css",value:function(n){var t="";return this.forEach(function(e,r){t+="\n            @media only screen and (min-width: ".concat(r.from,"px) ").concat(r.isInfinite?"":"and (max-width: ".concat(r.to,"px)")," {\n                ").concat(n(e,r),"\n            }\n        ")}),t}},{key:"rangeSet",get:function(){var n=Object.keys(this._map),t={};return n.forEach(function(n){t[n]=parseInt(n)}),new u(t)}}]),n}();function f(n,t,e){return(f=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}()?Reflect.construct:function(n,t,e){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(n,r));return e&&s(o,e.prototype),o}).apply(null,arguments)}function s(n,t){return(s=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,t)}function l(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.forEach(function(t){v(n,t,e[t])})}return n}function v(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function y(n){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function p(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function m(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function h(n,t,e){return t&&m(n.prototype,t),e&&m(n,e),n}function d(n){return n.replace(/([A-Z])/g,function(n){return"-".concat(n[0].toLowerCase())})}c._normalizeKey=function(n){return"string"==typeof n&&isNaN(parseInt(n))?u.main.get(n).from:n};var b=function(){function n(){var t=this;p(this,n),this._vals={};for(var e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];r.forEach(function(n){t.add$(n)})}return h(n,[{key:"clone",value:function(){var t=[];return Object.entries(this._vals).forEach(function(n){var e=n[0],r=n[1];t.push({unit:e,val:"object"===y(r)?l({},r):r})}),f(n,t)}},{key:"add",value:function(n){return this.clone().add$(n)}},{key:"add$",value:function(t){var e=this;return n._normalizeVal(t).forEach(function(n){"lin"===n.unit?(e._vals.lin||(e._vals.lin={from:0,slope:0}),e._vals.lin.from+=n.val.from,e._vals.lin.slope+=n.val.slope):(e._vals[n.unit]||(e._vals[n.unit]=0),e._vals[n.unit]+=n.val)}),this}},{key:"subtract",value:function(t){return this.clone().add$(new n(t).multiply$(-1))}},{key:"multiply$",value:function(n){var t=this;return Object.entries(this._vals).forEach(function(e){var r=e[0],o=e[1];"lin"===r?(o.from*=n,o.slope*=n):t._vals[r]*=n}),this}},{key:"multiply",value:function(n){return this.clone().multiply$(n)}},{key:"divide",value:function(n){return this.clone().multiply$(1/n)}},{key:"getValueFromOffset",value:function(n){var t=this.clone();return t.vals.lin&&(t.vals.lin.from+=t.vals.lin.slope*n),t}},{key:"val",value:function(n,t){return t=t||0,"px"===n?this._vals.lin?this._vals.lin.from+this._vals.lin.slope*t:0:this._vals[n]?this._vals[n]:0}},{key:"css",value:function(n){var t="";return Object.entries(this._vals).forEach(function(e){var r=e[0],o=e[1];""!==t&&(t+=" + "),"lin"===e[0]?t+="".concat(o.slope,"*100vw + ").concat(-o.slope*n+o.from,"px"):t+="".concat(o).concat(r)}),"calc(".concat(t,")")}},{key:"vals",get:function(){return this._vals}}]),n}();b._normalizeVal=function(n){if(n instanceof b){var t=[];return Object.entries(n.vals).forEach(function(n){t.push({unit:n[0],val:n[1]})}),t}if(Array.isArray(n))return[{unit:"lin",val:{from:n[0],slope:n[1]}}];if("object"===y(n))return[n];if("number"==typeof n)return[{unit:"lin",val:{from:n,slope:0}}];if("string"==typeof n){var e=n.match(/([\d\.]+)([a-z%]*)/),r=parseFloat(e[1]),o=e[2];return""===o||"px"===o?[{unit:"lin",val:{from:r,slope:0}}]:[{unit:o,val:r}]}throw"Bad input argument for _normalizeVal in ResponsiveSizeSegmentValue"};var g=function(){function n(t){if(p(this,n),void 0===t||"null"==typeof t)throw new Error("ResponsiveSize must not be constructed with undefined or null");if(Array.isArray(t))throw new Error("ResponsiveSize must not be constructed with array: ".concat(t,". Maybe you meant rslin instead of rs?"));if("object"!==y(t))t={0:t};else if(0===Object.keys(t).length)throw new Error("ResponsiveSize input object can't be empty!");var e;(e=t instanceof c?t:new c(t)).forEach(function(n,t){n instanceof b?e.set(t.from,{rssv:n,from:t.from}):e.set(t.from,{rssv:new b(n),from:t.from})}),this._rangeMap=e}return h(n,[{key:"css",value:function(n){return this._rangeMap.css(function(t,e){return"".concat(d(n),": ").concat(t.rssv.css(e.from),";")})}},{key:"multiply",value:function(t){var e={};return this._rangeMap.forEach(function(n,r){e[r.from]=n.rssv.multiply(t)}),new n(e)}},{key:"divide",value:function(n){return this.multiply(1/n)}},{key:"add",value:function(t){var e=this.map.crosssect(t.map),r={};return e.forEach(function(n,t){var e=n.val1.from,o=n.val1.rssv.getValueFromOffset(t.from-e),i=n.val2.from,a=n.val2.rssv.getValueFromOffset(t.from-i),u=o.add(a);r[t.from]=u}),new n(r)}},{key:"subtract",value:function(n){return this.add(n.multiply(-1))}},{key:"val",value:function(n,t){var e=this._rangeMap.value(n).from,r=this._rangeMap.value(n).rssv;return void 0===t?r:r.val(t,n-e)}},{key:"map",get:function(){return this._rangeMap}}]),n}();function _(n){return new b(n)}function k(n){return n instanceof g?n:new g(n)}function w(n,t,e){e=e||!1;var r={0:n},o=(t-n)/(u.main.last.from-u.main.second.from);return r[u.main.second.from]=[n,o],e||(r[u.main.last.from]=t),new g(r)}function j(n){var t="";return Object.entries(n).forEach(function(n){var e=n[0],r=n[1];t+=r instanceof g?r.css(e):"".concat(d(e),": ").concat(r,";")}),t}function O(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}var S=function(){function n(t){!function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.container=t.container,this.colNumber=t.colNumber,this.gutter=t.gutter,this.margin=k("100vw").subtract(t.container).divide(2),this.col=this.container.subtract(this.gutter.multiply(t.colNumber-1)).divide(t.colNumber)}var t,e,r;return t=n,(e=[{key:"cols",value:function(n){return this.col.multiply(n).add(this.gutter.multiply(n-1))}}])&&O(t.prototype,e),r&&O(t,r),n}();S.normalizeGridItemParams=function(n){return"number"==typeof n?{cols:n,offset:0,order:0}:Array.isArray(n)?{cols:n[0]||0,offset:n[1]||0,order:n[2]||0}:(n.cols=n.cols||0,n.offset=n.offset||0,n.order=n.order||0,n)},e.d(t,"ResponsiveSize",function(){return g}),e.d(t,"ResponsiveSizeSegmentValue",function(){return b}),e.d(t,"rs",function(){return k}),e.d(t,"rssv",function(){return _}),e.d(t,"rslin",function(){return w}),e.d(t,"stylesToCSS",function(){return j}),e.d(t,"RangeMap",function(){return c}),e.d(t,"RangeSet",function(){return u}),e.d(t,"Range",function(){return a}),e.d(t,"Layout",function(){return S})}])});