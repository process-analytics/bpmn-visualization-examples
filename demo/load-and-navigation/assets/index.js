import{m,d as f,s as p,w as g,h as v,g as y,l as r,u as s,f as c,Z as h,z as S,a as b,b as E}from"./main.js";import"./mxgraph.js";const L="0.45.0",O=()=>({lib:L,dependencies:new Map([["mxGraph",m.VERSION]])});let o=!0,t={};function C(){const e=document.querySelector("#fitOnLoad");e.addEventListener("change",n=>{o=n.target.checked,r("Fit on load updated!",o),s(o?t:{})}),e.checked=o}function i(e){r("Updating fit config",e),t.margin=e.margin??t.margin,e.type&&(t.type=e.type),r("Fit config updated!",t),o&&s(t)}function T(){const e=document.querySelector("#fitType-selected");e.addEventListener("change",n=>{i({type:n.target.value}),c(t)}),t.type?e.value=t.type:i({type:e.value})}function q(){const e=document.querySelector("#fit-margin");e.addEventListener("change",n=>{i({margin:Number(n.target.value)}),c(t)}),t.margin?e.value=String(t.margin):i({margin:Number(e.value)})}function F(){for(const e of Object.values(h))document.querySelector(`#zoom-${e}`).addEventListener("click",()=>S(e));document.querySelector("#zoom-reset").addEventListener("click",()=>c(t))}function w(){const e=document.querySelector("#theme-selected");e.addEventListener("change",a=>{b(a.target.value)});const n=E();n&&(e.value=n)}function z(){const e=O(),n=`bpmn-visualization@${e.lib}`,a=[...e.dependencies].map(([d,l])=>`${d}@${l}`).join("/"),u=document.querySelector("#footer-content");u.textContent=`${n} with ${a}`}function $(){document.addEventListener("wheel",e=>{e.ctrlKey&&e.preventDefault()},{passive:!1,capture:!0})}function k(){$(),p({globalOptions:{container:"bpmn-container",navigation:{enabled:!0}},statusKoNotifier:g}),document.querySelector("#bpmn-file").addEventListener("change",v,!1),t=y().fit,T(),q(),C(),F(),w(),z()}f(k);
