var g=Object.defineProperty,S=Object.defineProperties;var b=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var R=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var p=(o,e,t)=>e in o?g(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,u=(o,e)=>{for(var t in e||(e={}))R.call(e,t)&&p(o,t,e[t]);if(d)for(var t of d(e))j.call(e,t)&&p(o,t,e[t]);return o},f=(o,e)=>S(o,b(e));import{r as i,j as h,E as C,H as L,S as O,R as P,a as m,b as w}from"./vendor.7931310a.js";const $=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}};$();const A="modulepreload",y={},_="/dist/",F=function(e,t){return!t||t.length===0?e():Promise.all(t.map(s=>{if(s=`${_}${s}`,s in y)return;y[s]=!0;const r=s.endsWith(".css"),n=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${n}`))return;const a=document.createElement("link");if(a.rel=r?"stylesheet":A,r||(a.as="script",a.crossOrigin=""),a.href=s,document.head.appendChild(a),r)return new Promise((v,E)=>{a.addEventListener("load",v),a.addEventListener("error",E)})})).then(()=>e())},I=i.exports.createContext({}),x={showDetail:!1,detailActiveTab:"custom",requestId:"",proxySwitch:!0,filterType:"url",filterString:"",ready:!1,disableCache:!1,clean:()=>{}},N=(o=x,e)=>{const t={};return Object.keys(o).forEach(s=>{let r=s.slice(0,1).toUpperCase()+s.slice(1);r=`set${r}`,t[r]||(t[r]=()=>f(u({},o),{[s]:e[s]}))}),t[e.type]?t[e.type]():o};const c=h.exports.jsx,k=h.exports.jsxs;function T(o){const{error:e}=o;return k("div",{role:"alert",children:[c("h4",{children:"\u51FA\u9519\u4E86\uFF01"}),c("pre",{children:e.message}),e.stack?c("pre",{children:e.stack}):null]})}const H=o=>c(C,{FallbackComponent:T,onReset:()=>{},children:o.children});const l={};function q(o,e){const t=`${e}-router`;return l[t]||(l[t]=m.memo(s=>c(i.exports.Suspense,{fallback:c("div",{}),children:c(o,u({},s))}))),l[t]}const D=[{name:"Home",path:"./pages/home",Component:i.exports.lazy(()=>F(()=>import("./index.0ab717b2.js"),["assets/index.0ab717b2.js","assets/index.2faf7b3f.css","assets/vendor.7931310a.js"])),routerPath:"/"}];var M=()=>{const[o,e]=i.exports.useReducer(N,x),t=i.exports.useRef(0);return i.exports.useEffect(()=>{const s=window.localStorage.getItem("context-data");if(s)try{const r=JSON.parse(s);Object.keys(r).forEach(n=>{Promise.resolve().then(()=>{const a=n.slice(0,1).toUpperCase()+n.slice(1);e({type:`set${a}`,[n]:r[n]})})})}catch{}e({type:"setReady",ready:!0})},[]),i.exports.useEffect(()=>{o.ready&&(t.current&&clearTimeout(t.current),t.current=setTimeout(()=>{window.localStorage.setItem("context-data",JSON.stringify(o))},500))},[o]),c("div",{className:"app",id:"app",children:c(I.Provider,{value:{state:o,dispatch:e},children:c(H,{children:c(L,{children:c(O,{children:D.map(s=>c(P,{exact:!0,path:s.routerPath,component:q(s.Component,s.name)},s.path))})})})})})};w.render(c(m.StrictMode,{children:c(M,{})}),document.getElementById("root"));export{I as C,k as a,c as j};
