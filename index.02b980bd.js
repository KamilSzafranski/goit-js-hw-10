function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};const n=t=>{const e=t.toLowerCase(),n=((...t)=>t.map((t=>`${t}`)).join(","))("name","capital","population","flags","languages");return fetch(`https://restcountries.com/v2/name/${e}?fields=${n}`).then((t=>{if(!t.ok)throw new Error(t.status);return t.json()}))};var o,r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,f=/^0o[0-7]+$/i,a=parseInt,c="object"==typeof e&&e&&e.Object===Object&&e,s="object"==typeof self&&self&&self.Object===Object&&self,l=c||s||Function("return this")(),d=Object.prototype.toString,p=Math.max,v=Math.min,y=function(){return l.Date.now()};function m(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function b(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==d.call(t)}(t))return NaN;if(m(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=m(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(r,"");var n=u.test(t);return n||f.test(t)?a(t.slice(2),n?2:8):i.test(t)?NaN:+t}o=function(t,e,n){var o,r,i,u,f,a,c=0,s=!1,l=!1,d=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function g(e){var n=o,i=r;return o=r=void 0,c=e,u=t.apply(i,n)}function j(t){return c=t,f=setTimeout(w,e),s?g(t):u}function h(t){var n=t-a;return void 0===a||n>=e||n<0||l&&t-c>=i}function w(){var t=y();if(h(t))return T(t);f=setTimeout(w,function(t){var n=e-(t-a);return l?v(n,i-(t-c)):n}(t))}function T(t){return f=void 0,d&&o?g(t):(o=r=void 0,u)}function $(){var t=y(),n=h(t);if(o=arguments,r=this,a=t,n){if(void 0===f)return j(a);if(l)return f=setTimeout(w,e),g(a)}return void 0===f&&(f=setTimeout(w,e)),u}return e=b(e)||0,m(n)&&(s=!!n.leading,i=(l="maxWait"in n)?p(b(n.maxWait)||0,e):i,d="trailing"in n?!!n.trailing:d),$.cancel=function(){void 0!==f&&clearTimeout(f),c=0,o=a=r=f=void 0},$.flush=function(){return void 0===f?u:T(y())},$};const g=document.querySelector("input"),j=document.querySelector("ul.country-list");document.querySelector("div.country-info");clearList=()=>j.innerHTML="",renderList=t=>{clearList();const e=t.map((t=>`<li><p data-flag=${t.flags.svg}>${t.name}</p></li>`)).join("");j.insertAdjacentHTML("beforeend",e)};const h=t(o)((t=>{n(`${t.target.value}`).then((t=>renderList(t)))}),300);g.addEventListener("input",h);
//# sourceMappingURL=index.02b980bd.js.map
