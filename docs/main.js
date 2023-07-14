(()=>{"use strict";var e={426:(e,n,t)=>{t.d(n,{Z:()=>p});var o=t(81),r=t.n(o),a=t(645),i=t.n(a),s=t(667),c=t.n(s),l=new URL(t(273),t.b),d=i()(r()),u=c()(l);d.push([e.id,`html {\n  height: 100%;\n}\nbody {\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n  margin: 0;\n  background-color: #e9f6f8;\n}\nbody > section {\n  flex: 1;\n  padding: 15px;\n}\n\nheader {\n  background-image: url(${u});\n  text-shadow: 1px 1px 2px #000000;\n}\n\n#header-wrapper {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  background-color: rgba(red, green, blue, alpha);\n  background: linear-gradient(45deg, #0798abfa, transparent);\n}\n\nheader img {\n  background-color: #ffffff90;\n  border: 2px solid white;\n  border-radius: 50%;\n  margin: 5px;\n}\n\nh1,\nh2 {\n  margin: 5px;\n  color: white;\n}\n\n.tbar {\n  display: flex;\n  margin-bottom: 10px;\n  align-items: stretch;\n}\n\n.tfill {\n  flex: 1;\n}\n\n#teamsTable {\n  border-collapse: collapse;\n  width: 100%;\n  table-layout: fixed;\n}\n\n#teamsTable th,\ntd {\n  border: 1px solid black;\n  padding: 5px;\n  line-height: 23px;\n  /* word-break: break-all; */\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n#teamsTable th {\n  background-color: #0798ab;\n  color: white;\n}\n\n#teamsTable tr:nth-child(even) {\n  background-color: #f2f2f2;\n}\n\n#teamsTable input:not([type="checkbox"]) {\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.table-actions {\n  width: 85px;\n}\n\n.action-btn {\n  min-width: 35px;\n  cursor: pointer;\n}\n\nfooter {\n  background: #057988;\n  color: white;\n  text-align: center;\n  padding: 5px;\n}\n\n.delete-btn,\n.edit-btn {\n  color: #0096d6;\n  cursor: pointer;\n  display: none;\n  min-width: 35px;\n}\n\n#teamsTable tr:hover .edit-btn {\n  display: inline-block;\n}\n\n#teamsTable tr:hover .delete-btn {\n  display: inline-block;\n}\n\n.delete-btn {\n  color: #b90303;\n}\n.edit-btn {\n  color: #039903;\n}\n`,""]);const p=d},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",o=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),o&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),o&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,o,r,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(o)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var l=0;l<e.length;l++){var d=[].concat(e[l]);o&&i[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),n.push(d))}},n}},667:e=>{e.exports=function(e,n){return n||(n={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]|(%20)/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var n=[];function t(e){for(var t=-1,o=0;o<n.length;o++)if(n[o].identifier===e){t=o;break}return t}function o(e,o){for(var a={},i=[],s=0;s<e.length;s++){var c=e[s],l=o.base?c[0]+o.base:c[0],d=a[l]||0,u="".concat(l," ").concat(d);a[l]=d+1;var p=t(u),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)n[p].references++,n[p].updater(f);else{var m=r(f,o);o.byIndex=s,n.splice(s,0,{identifier:u,updater:m,references:1})}i.push(u)}return i}function r(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,r){var a=o(e=e||[],r=r||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var s=t(a[i]);n[s].references--}for(var c=o(e,r),l=0;l<a.length;l++){var d=t(a[l]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}a=c}}},569:e=>{var n={};e.exports=function(e,t){var o=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(o,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}},273:(e,n,t)=>{e.exports=t.p+"b65bb854f1ff13c46e6c.jpeg"}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var a=n[o]={id:o,exports:{}};return e[o](a,a.exports,t),a.exports}t.m=e,t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.p="",t.b=document.baseURI||self.location.href,t.nc=void 0,(()=>{var e=t(379),n=t.n(e),o=t(795),r=t.n(o),a=t(569),i=t.n(a),s=t(565),c=t.n(s),l=t(216),d=t.n(l),u=t(589),p=t.n(u),f=t(426),m={};m.styleTagTransform=p(),m.setAttributes=c(),m.insert=i().bind(null,"head"),m.domAPI=r(),m.insertStyleElement=d(),n()(f.Z,m),f.Z&&f.Z.locals&&f.Z.locals;let b,h=[];function v(e){return document.querySelector(e)}let y=[];function g(e,n){if(!n&&e===y)return void console.warn("same teams already rendered");y=e;const t=e.map((e=>e.id===n?function(e){return`<tr>\n    <td>\n      <input value="${e.promotion}" type="text" name="promotion" placeholder="Enter Promotion" />\n    </td>\n    <td>\n      <input value="${e.members}" type="text" name="members" placeholder="Enter Members" />\n    </td>\n    <td>\n      <input value="${e.name}" type="text" name="name" placeholder="Enter Project Name" />\n    </td>\n    <td>\n      <input value="${e.url}" type="text" name="url" placeholder="Enter Project URL" />\n    </td>\n    <td>\n      <button type="submit" class="action-btn" title="Save">💾</button>\n      <button type="reset" class="action-btn" title="Cancel">❌</button>\n    </td>\n  </tr>`}(e):function(e){const n=e.url.startsWith("https://github.com/")?e.url.substring(19):e.url;return`<tr>\n    <td>${e.promotion}</td>\n    <td>${e.members}</td>\n    <td>${e.name}</td>\n    <td>\n    <a href="${e.url}" target='_blank'>${n}</a>\n    </td>\n\n    <td>\n    <button type="button" title="Edit" data-id="${e.id}" class="action-btn edit-btn"> &#9998; </button>\n    <button type="button" title="Delete" data-id="${e.id}" class="action-btn delete-btn"> ✖ </button>\n    </td>\n  </tr>`}(e)));v("#teamsTable tbody").innerHTML=t.join(""),document.querySelectorAll("#teamsTable td").forEach((e=>{e.title=e.offsetWidth<e.scrollWidth?e.textContent:""}))}function x(){let e="http://localhost:3000/teams-json";"aimoldovan.github.io"===window.location.host&&(e="data/teams.json",console.info("displaying mock data %o",e)),fetch(e).then((e=>e.json())).then((e=>{h=e,g(e)}))}function w(e){document.querySelectorAll("tfoot input").forEach((n=>{n.disabled=e}))}x(),v("#search").addEventListener("input",(e=>{const n=e.target.value,t=function(e,n){return n=n.toLowerCase(),e.filter((e=>e.promotion.toLowerCase().includes(n)||e.members.toLowerCase().includes(n)||e.name.toLowerCase().includes(n)||e.url.toLowerCase().includes(n)))}(h,n);g(t)})),v("#teamsForm").addEventListener("submit",(function(e){e.preventDefault();const n={promotion:v((t=b?"tbody":"tfoot")+" input[name=promotion]").value,members:v(`${t} input[name=members]`).value,name:v(`${t} input[name=name]`).value,url:v(`${t} input[name=url]`).value};var t;console.warn("update or create?",b),console.warn(n),b?(n.id=b,console.warn("update...",n),function(e){return fetch("http://localhost:3000/teams-json/update",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>e.json()))}(n).then((e=>{console.warn("updated",e),e.success&&(x(),w(!1),b="")}))):function(e){return fetch("http://localhost:3000/teams-json/create",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>e.json()))}(n).then((e=>{console.warn("created",e),e.success&&(n.id=e.id,h=[...h,n],g(h),v("#teamsForm").reset())}))})),v("#teamsForm").addEventListener("reset",(e=>{console.info("reset",b),b&&(h=[...h],g(h),w(!1),b="")})),v("#teamsTable tbody").addEventListener("click",(e=>{var n;e.target.matches("button.delete-btn")?function(e,n){fetch("http://localhost:3000/teams-json/delete",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e})}).then((e=>e.json())).then((e=>(n(e),e)))}(e.target.dataset.id,(e=>{console.info("delete callback %o",e),e.success&&x()})):e.target.matches("button.edit-btn")&&(n=e.target.dataset.id,b=n,console.warn("edit... %o",n),g(h,n),console.info(h),w(!0))}))})()})();