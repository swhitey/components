(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"0qAl":function(t,e){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}},"5WRv":function(t,e,r){var n=r("iNmH"),o=r("Qatm"),c=r("Zhxd"),u=r("kluZ");t.exports=function(t){return n(t)||o(t)||c(t)||u()}},"A2+M":function(t,e,r){var n=r("X8hv");t.exports={MDXRenderer:n}},Qatm:function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},WI9V:function(t,e){function r(e,n){return t.exports=r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},r(e,n)}t.exports=r},X8hv:function(t,e,r){var n=r("uUj8"),o=r("5WRv"),c=r("OvAC"),u=r("PE9J");function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){c(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var f=r("mXGw"),p=r("/FXl").mdx,l=r("BfwJ").useMDXScope;t.exports=function(t){var e=t.scope,r=t.children,c=u(t,["scope","children"]),i=l(e),s=f.useMemo((function(){if(!r)return null;var t=a({React:f,mdx:p},i),e=Object.keys(t),c=e.map((function(e){return t[e]}));return n(Function,["_fn"].concat(o(e),[""+r])).apply(void 0,[{}].concat(o(c)))}),[r,e]);return f.createElement(s,a({},c))}},iNmH:function(t,e,r){var n=r("+Sw5");t.exports=function(t){if(Array.isArray(t))return n(t)}},kluZ:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},uUj8:function(t,e,r){var n=r("WI9V"),o=r("0qAl");function c(e,r,u){return o()?t.exports=c=Reflect.construct:t.exports=c=function(t,e,r){var o=[null];o.push.apply(o,e);var c=new(Function.bind.apply(t,o));return r&&n(c,r.prototype),c},c.apply(null,arguments)}t.exports=c},wJ8q:function(t,e,r){"use strict";r.r(e);var n=r("A2+M"),o=r("mXGw"),c=r.n(o),u=r("w26e"),i=r("tqj0");e.default=function(t){var e=t.data.mdx,r=e.frontmatter.title;return c.a.createElement(i.a,null,c.a.createElement(u.a,{as:"h1",fontSize:"xxxxlarge"},r),c.a.createElement(n.MDXRenderer,null,e.body))}}}]);
//# sourceMappingURL=component---src-layout-default-tsx-ea030b8b66f601cc5424.js.map