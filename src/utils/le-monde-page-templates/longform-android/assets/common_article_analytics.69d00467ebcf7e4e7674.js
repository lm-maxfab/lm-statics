!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=170)}([function(t,e,n){"use strict";n.d(e,"e",(function(){return o})),n.d(e,"g",(function(){return r})),n.d(e,"j",(function(){return i})),n.d(e,"h",(function(){return s})),n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return l})),n.d(e,"f",(function(){return u})),n.d(e,"l",(function(){return f})),n.d(e,"k",(function(){return d})),n.d(e,"d",(function(){return p})),n.d(e,"i",(function(){return h}));n(26);const o=(t,e,n)=>e.split(".").reduce((t,e)=>t&&t[e]||n,t||{}),r=t=>({id:t.getAttribute("id"),videoId:t.getAttribute("data-id"),videoUrl:t.getAttribute("data-url"),videoProvider:t.getAttribute("data-provider"),autoplay:"true"===t.getAttribute("data-autoplay"),showinfo:"true"===t.getAttribute("data-showinfo")}),i=(t,e)=>Boolean(t[e]&&t[e].player),s=(t,e)=>{if(!t)return null;const n=document.createElement("iframe");return n.setAttribute("id","iframe_".concat(t)),n.setAttribute("src",e),n.setAttribute("width","100%"),n.setAttribute("height","100%"),n.setAttribute("frameborder","0"),n.setAttribute("marginwidth","0"),n.setAttribute("marginheight","0"),n.setAttribute("scrolling","no"),n.setAttribute("seamless","true"),n.setAttribute("allowfullscreen","true"),n.setAttribute("allow","fullscreen"),document.getElementById(t).appendChild(n),n},c=(t,e=document)=>e.querySelector(t),a=(t,e=document)=>e.querySelectorAll(t),l=(t,e,n=document)=>Array.prototype.forEach.call(a(t,n),e),u=()=>{const t=c("html");return t&&t.hasAttribute("data-color-mode")?t.getAttribute("data-color-mode")||"light":o(window.lmd,"applicationVars.accessibility.theme","light")},f=(t,e)=>{const n=t=>parseInt(t,10)||0,o=(t||"0").split(".").map(n),r=(e||"0").split(".").map(n);for(;o.length<r.length;)o.push(0);for(;r.length<o.length;)r.push(0);for(let t=0;t<o.length;t+=1){if(o[t]>r[t])return 1;if(o[t]<r[t])return-1}return 0},d=(t,e=!1)=>{document.fonts?e&&void 0!==document.fonts.values&&"undefined"!=typeof Promise?void 0!==Promise.allSettled?Promise.allSettled(Array.from(document.fonts.values(),t=>t.load())).finally(t):Promise.all(Array.from(document.fonts.values(),t=>t.load())).finally(t):document.fonts.ready.finally(t):t.call(window)},p=(t,e=null,n=!1)=>{const o=(t||"").trim();return(o.toLowerCase().match(new RegExp("^[a-z0-9\\+\\-\\.]+://.*"))||[]).length>0?o:"//"===o.substring(0,2)?"https:".concat(o):"/"===o.substring(0,1)?e&&"/"!==e.substring(0,1)?p("".concat(e).concat(o),null,!0):"".concat(n?"https:/":"").concat(o):"".concat(n?"https://":"").concat(o)},h=t=>{if(t){const e=t.trim().toLowerCase().split(".").slice(-2).join(".");return new RegExp("^(loc\\-|tst\\-|int\\-|stg\\-|prd\\-)?lemonde\\.fr$").test(e)}return!1}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var o=n(9),r=n(20);t.exports=n(4)?function(t,e,n){return o.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var o=n(6)("wks"),r=n(8),i=n(1).Symbol,s="function"==typeof i;(t.exports=function(t){return o[t]||(o[t]=s&&i[t]||(s?i:r)("Symbol."+t))}).store=o},function(t,e,n){t.exports=!n(18)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var o=n(7),r=n(1),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:o.version,mode:n(17)?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},function(t,e){var n=t.exports={version:"2.6.12"};"number"==typeof __e&&(__e=n)},function(t,e){var n=0,o=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+o).toString(36))}},function(t,e,n){var o=n(10),r=n(29),i=n(30),s=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(o(t),e=i(e,!0),o(n),r)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var o=n(11);t.exports=function(t){if(!o(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports={}},function(t,e,n){var o=n(32),r=n(21);t.exports=function(t){return o(r(t))}},function(t,e,n){var o=n(1),r=n(2),i=n(5),s=n(8)("src"),c=n(36),a=(""+c).split("toString");n(7).inspectSource=function(t){return c.call(t)},(t.exports=function(t,e,n,c){var l="function"==typeof n;l&&(i(n,"name")||r(n,"name",e)),t[e]!==n&&(l&&(i(n,s)||r(n,s,t[e]?""+t[e]:a.join(String(e)))),t===o?t[e]=n:c?t[e]?t[e]=n:r(t,e,n):(delete t[e],r(t,e,n)))})(Function.prototype,"toString",(function(){return"function"==typeof this&&this[s]||c.call(this)}))},function(t,e,n){var o=n(6)("keys"),r=n(8);t.exports=function(t){return o[t]||(o[t]=r(t))}},function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var o=n(0);const r=(t,e,n={})=>!!Object.prototype.hasOwnProperty.call(t,e)&&("function"==typeof t[e]?(t[e](n||{}),!0):"function"==typeof t[e].postMessage&&(t[e].postMessage(n||{}),!0)),i=(t,e={})=>"undefined"!=typeof LMDAndroid&&LMDAndroid?r(LMDAndroid,"lmdHandleAction",JSON.stringify({action:t,parameters:e})):"undefined"!=typeof LMFRAndroid&&LMFRAndroid?r(LMFRAndroid,"lmdHandleAction",JSON.stringify({action:t,parameters:e})):r(Object(o.e)(window,"webkit.messageHandlers",{}),"lmdHandleAction",{action:t,parameters:e})},function(t,e){t.exports=!1},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var o=n(11),r=n(1).document,i=o(r)&&o(r.createElement);t.exports=function(t){return i?r.createElement(t):{}}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var o=n(42),r=n(24);t.exports=Object.keys||function(t){return o(t,r)}},function(t,e){var n=Math.ceil,o=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?o:n)(t)}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var o=n(9).f,r=n(5),i=n(3)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,i)&&o(t,i,{configurable:!0,value:e})}},function(t,e,n){for(var o=n(27),r=n(22),i=n(14),s=n(1),c=n(2),a=n(12),l=n(3),u=l("iterator"),f=l("toStringTag"),d=a.Array,p={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},h=r(p),g=0;g<h.length;g++){var m,v=h[g],_=p[v],y=s[v],b=y&&y.prototype;if(b&&(b[u]||c(b,u,d),b[f]||c(b,f,v),a[v]=d,_))for(m in o)b[m]||i(b,m,o[m],!0)}},function(t,e,n){"use strict";var o=n(28),r=n(31),i=n(12),s=n(13);t.exports=n(34)(Array,"Array",(function(t,e){this._t=s(t),this._i=0,this._k=e}),(function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,r(1)):r(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])}),"values"),i.Arguments=i.Array,o("keys"),o("values"),o("entries")},function(t,e,n){var o=n(3)("unscopables"),r=Array.prototype;null==r[o]&&n(2)(r,o,{}),t.exports=function(t){r[o][t]=!0}},function(t,e,n){t.exports=!n(4)&&!n(18)((function(){return 7!=Object.defineProperty(n(19)("div"),"a",{get:function(){return 7}}).a}))},function(t,e,n){var o=n(11);t.exports=function(t,e){if(!o(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!o(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var o=n(33);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==o(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){"use strict";var o=n(17),r=n(35),i=n(14),s=n(2),c=n(12),a=n(39),l=n(25),u=n(47),f=n(3)("iterator"),d=!([].keys&&"next"in[].keys()),p=function(){return this};t.exports=function(t,e,n,h,g,m,v){a(n,e,h);var _,y,b,w=function(t){if(!d&&t in x)return x[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},O=e+" Iterator",S="values"==g,L=!1,x=t.prototype,E=x[f]||x["@@iterator"]||g&&x[g],A=E||w(g),j=g?S?w("entries"):A:void 0,T="Array"==e&&x.entries||E;if(T&&(b=u(T.call(new t)))!==Object.prototype&&b.next&&(l(b,O,!0),o||"function"==typeof b[f]||s(b,f,p)),S&&E&&"values"!==E.name&&(L=!0,A=function(){return E.call(this)}),o&&!v||!d&&!L&&x[f]||s(x,f,A),c[e]=A,c[O]=p,g)if(_={values:S?A:w("values"),keys:m?A:w("keys"),entries:j},v)for(y in _)y in x||i(x,y,_[y]);else r(r.P+r.F*(d||L),e,_);return _}},function(t,e,n){var o=n(1),r=n(7),i=n(2),s=n(14),c=n(37),a=function(t,e,n){var l,u,f,d,p=t&a.F,h=t&a.G,g=t&a.S,m=t&a.P,v=t&a.B,_=h?o:g?o[e]||(o[e]={}):(o[e]||{}).prototype,y=h?r:r[e]||(r[e]={}),b=y.prototype||(y.prototype={});for(l in h&&(n=e),n)f=((u=!p&&_&&void 0!==_[l])?_:n)[l],d=v&&u?c(f,o):m&&"function"==typeof f?c(Function.call,f):f,_&&s(_,l,f,t&a.U),y[l]!=f&&i(y,l,d),m&&b[l]!=f&&(b[l]=f)};o.core=r,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){t.exports=n(6)("native-function-to-string",Function.toString)},function(t,e,n){var o=n(38);t.exports=function(t,e,n){if(o(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,o){return t.call(e,n,o)};case 3:return function(n,o,r){return t.call(e,n,o,r)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){"use strict";var o=n(40),r=n(20),i=n(25),s={};n(2)(s,n(3)("iterator"),(function(){return this})),t.exports=function(t,e,n){t.prototype=o(s,{next:r(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var o=n(10),r=n(41),i=n(24),s=n(15)("IE_PROTO"),c=function(){},a=function(){var t,e=n(19)("iframe"),o=i.length;for(e.style.display="none",n(46).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;o--;)delete a.prototype[i[o]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(c.prototype=o(t),n=new c,c.prototype=null,n[s]=t):n=a(),void 0===e?n:r(n,e)}},function(t,e,n){var o=n(9),r=n(10),i=n(22);t.exports=n(4)?Object.defineProperties:function(t,e){r(t);for(var n,s=i(e),c=s.length,a=0;c>a;)o.f(t,n=s[a++],e[n]);return t}},function(t,e,n){var o=n(5),r=n(13),i=n(43)(!1),s=n(15)("IE_PROTO");t.exports=function(t,e){var n,c=r(t),a=0,l=[];for(n in c)n!=s&&o(c,n)&&l.push(n);for(;e.length>a;)o(c,n=e[a++])&&(~i(l,n)||l.push(n));return l}},function(t,e,n){var o=n(13),r=n(44),i=n(45);t.exports=function(t){return function(e,n,s){var c,a=o(e),l=r(a.length),u=i(s,l);if(t&&n!=n){for(;l>u;)if((c=a[u++])!=c)return!0}else for(;l>u;u++)if((t||u in a)&&a[u]===n)return t||u||0;return!t&&-1}}},function(t,e,n){var o=n(23),r=Math.min;t.exports=function(t){return t>0?r(o(t),9007199254740991):0}},function(t,e,n){var o=n(23),r=Math.max,i=Math.min;t.exports=function(t,e){return(t=o(t))<0?r(t+e,0):i(t,e)}},function(t,e,n){var o=n(1).document;t.exports=o&&o.documentElement},function(t,e,n){var o=n(5),r=n(48),i=n(15)("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),o(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},function(t,e,n){var o=n(21);t.exports=function(t){return Object(o(t))}},,,,,,,,,,,,function(t,e,n){"use strict";const o=(t,e)=>t.getAttribute("data-"+e),r=t=>"true"===o(t,"was-processed"),i=function(t){return t.getBoundingClientRect().top+window.pageYOffset-t.ownerDocument.documentElement.clientTop},s=function(t){return t.getBoundingClientRect().left+window.pageXOffset-t.ownerDocument.documentElement.clientLeft};function c(t,e,n){return!(function(t,e,n){return(e===window?window.innerHeight+window.pageYOffset:i(e)+e.offsetHeight)<=i(t)-n}(t,e,n)||function(t,e,n){return(e===window?window.pageYOffset:i(e))>=i(t)+n+t.offsetHeight}(t,e,n)||function(t,e,n){const o=window.innerWidth;return(e===window?o+window.pageXOffset:s(e)+o)<=s(t)-n}(t,e,n)||function(t,e,n){return(e===window?window.pageXOffset:s(e))>=s(t)+n+t.offsetWidth}(t,e,n))}const a=function(t,e){var n;let o=new t(e);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:o}})}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:o})}window.dispatchEvent(n)};const l=(t,e)=>e?t.replace(/\.(jpe?g|png)/gi,".webp"):t,u="undefined"!=typeof window,f=u&&!("onscroll"in window)||/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),d=u&&"classList"in document.createElement("p"),p=u&&(!(!(h=document.createElement("canvas")).getContext||!h.getContext("2d"))&&0===h.toDataURL("image/webp").indexOf("data:".concat("image/webp")));var h;const g=(t,e)=>{d?t.classList.add(e):t.className+=(t.className?" ":"")+e},m=function(t,e,n,r){for(let i,s=0;i=t.children[s];s+=1)if("SOURCE"===i.tagName){let t=o(i,n);v(i,e,t,r)}},v=function(t,e,n,o){n&&t.setAttribute(e,l(n,o))},_={IMG:(t,e)=>{const n=p&&e.to_webp,r=e.data_srcset,i=t.parentNode;i&&"PICTURE"===i.tagName&&m(i,"srcset",r,n);const s=o(t,e.data_sizes);v(t,"sizes",s);const c=o(t,r);v(t,"srcset",c,n);const a=o(t,e.data_src);v(t,"src",a,n)},IFRAME:(t,e)=>{const n=o(t,e.data_src);v(t,"src",n)},VIDEO:(t,e)=>{const n=e.data_src,r=o(t,n);m(t,"src",n),v(t,"src",r),t.load()}},y=(t,e)=>{const n=e._settings,r=t.tagName,i=_[r];if(i)return i(t,n),e._updateLoadingCount(1),void(e._elements=(s=e._elements,c=t,s.filter(t=>t!==c)));var s,c;((t,e)=>{const n=p&&e.to_webp,r=o(t,e.data_src),i=o(t,e.data_bg);if(r){let e=l(r,n);t.style.backgroundImage='url("'.concat(e,'")')}if(i){let e=l(i,n);t.style.backgroundImage=e}})(t,n)},b=function(t,e){t&&t(e)},w=(t,e,n)=>{t.addEventListener(e,n)},O=(t,e,n)=>{t.removeEventListener(e,n)},S=(t,e,n)=>{O(t,"load",e),O(t,"loadeddata",e),O(t,"error",n)},L=function(t,e,n){var o=n._settings;const r=e?o.class_loaded:o.class_error,i=e?o.callback_load:o.callback_error,s=t.target;((t,e)=>{d?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")})(s,o.class_loading),g(s,r),b(i,s),n._updateLoadingCount(-1)},x=(t,e)=>{const n=r=>{L(r,!0,e),S(t,n,o)},o=r=>{L(r,!1,e),S(t,n,o)};((t,e,n)=>{w(t,"load",e),w(t,"loadeddata",e),w(t,"error",n)})(t,n,o)},E=["IMG","IFRAME","VIDEO"];const A=function(t){this._settings=Object.assign({},{elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_initial:"initial",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_enter:null,callback_finish:null,to_webp:!1},t),this._loadingCount=0,this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._boundHandleScroll=this.handleScroll.bind(this),this._isFirstLoop=!0,window.addEventListener("resize",this._boundHandleScroll),this.update()};A.prototype={_loopThroughElements:function(t){const e=this._settings,n=this._elements,o=n?n.length:0;let r,i=[],s=this._isFirstLoop;if(s&&(this._isFirstLoop=!1),0!==o){for(r=0;r<o;r++){let o=n[r];e.skip_invisible&&null===o.offsetParent||(t||c(o,e.container,e.threshold))&&(s&&g(o,e.class_initial),this.load(o),i.push(r))}((t,e)=>{for(;e.length;)t.splice(e.pop(),1)})(n,i)}else this._stopScrollHandler()},_startScrollHandler:function(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._boundHandleScroll))},_stopScrollHandler:function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._boundHandleScroll))},_updateLoadingCount:function(t){this._loadingCount+=t,0===this._elements.length&&0===this._loadingCount&&b(this._settings.callback_finish)},handleScroll:function(){const t=this._settings.throttle;if(0!==t){let e=Date.now(),n=t-(e-this._previousLoopTime);n<=0||n>t?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=e,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(function(){this._previousLoopTime=Date.now(),this._loopTimeout=null,this._loopThroughElements()}.bind(this),n))}else this._loopThroughElements()},loadAll:function(){this._loopThroughElements(!0)},update:function(t){const e=this._settings,n=t||this._queryOriginNode.querySelectorAll(e.elements_selector);this._elements=(t=>t.filter(t=>!r(t)))(Array.prototype.slice.call(n)),f?this.loadAll():(this._loopThroughElements(),this._startScrollHandler())},destroy:function(){window.removeEventListener("resize",this._boundHandleScroll),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null},load:function(t,e){!function(t,e,n){var o=e._settings;!n&&r(t)||(b(o.callback_enter,t),E.indexOf(t.tagName)>-1&&(x(t,e),g(t,o.class_loading)),y(t,e),(t=>{((t,e,n)=>{var o="data-"+e;null!==n?t.setAttribute(o,n):t.removeAttribute(o)})(t,"was-processed","true")})(t),b(o.callback_set,t))}(t,this,e)}},u&&function(t,e){if(e)if(e.length)for(let n,o=0;n=e[o];o+=1)a(t,n);else a(t,e)}(A,window.lazyLoadOptions),e.a=A},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";n.r(e);var o=n(0),r=n(16),i=n(60);const s=(t,e)=>{new i.a({elements_selector:t,threshold:0,callback_enter:e})},c=(t,e)=>{Object(o.c)(t,t=>{t.addEventListener("click",e)})},a=(t,e={})=>(Array.prototype.forEach.call(t,(n,r)=>{if("amplitude"===n.provider){const n=Object(o.e)(window.lmd,"applicationVars.sourceDeeplink",null);if(n){const t=new URL(n);e["type de une"]=t.searchParams.get("amp-home-type"),e["nav: source a la une"]=t.searchParams.get("amp-home-source")}t[r].properties=Object.assign(t[r].properties||{},Object.fromEntries(Object.entries(e).filter(t=>null!=t)))}}),t);(()=>{window.lmd=window.lmd||{};const t=Object(o.e)(window.lmd,"analyticsProviders.visibility",[]);t.length>0&&window.lmd.addWebviewStateListener("active",!0,()=>{const e=Object(o.e)(window.lmd,"firstPublishedDate",null);Object(r.a)("core.trackEvent",{tags:a(t,{"contenu: age de publication":e?Math.floor(Math.max(new Date-new Date(e),0)/864e5):null}),source:Object(o.e)(window.lmd,"applicationVars.analyticsSource",null)})},{once:!1,defer:!1,fresh:!0}),window.lmd.addWebviewStateListener("active",!0,()=>{const t=Object(o.e)(window.lmd,"analyticsProviders.checkReading",[]);t.length>0&&s("#check_reading",()=>Object(r.a)("core.trackEvent",{tags:a(t)}));const e=Object(o.e)(window.lmd,"analyticsProviders.checkEndArticle",[]);e.length>0&&s("#check_end_article",()=>Object(r.a)("core.trackEvent",{tags:a(e)}));const n=Object(o.e)(window.lmd,"analyticsProviders.displayTeaser",[]);n.length>0&&s("#bloc_paywall",()=>Object(r.a)("core.trackEvent",{tags:a(n)}));const i=Object(o.e)(window.lmd,"analyticsProviders.clickTeaser",[]);i.length>0&&c("#click_paywall",()=>Object(r.a)("core.trackEvent",{tags:a(i)}));const l=Object(o.e)(window.lmd,"analyticsProviders.clickSeeAlso",[]);l.length>0&&c(".see-also-container a",()=>Object(r.a)("core.trackEvent",{tags:a(l)}))},{once:!0,defer:!1,fresh:!1})})()}]);
//# sourceMappingURL=common_article_analytics.69d00467ebcf7e4e7674.js.map