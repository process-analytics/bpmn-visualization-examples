import{d as m,s as g,w as f,h as p,g as y,l as c,u as s,f as r,Z as h,z as v,a as E,b,c as B}from"./main.js";import"./mxgraph.js";let o=!0,t={};function I(){const e=document.getElementById("fitOnLoad");e.onchange=n=>{o=n.target.checked,c("Fit on load updated!",o),s(o?t:{})},e.checked=o}function i(e){c("Updating fit config",e),t.margin=e.margin??t.margin,e.type&&(t.type=e.type),c("Fit config updated!",t),o&&s(t)}function O(){const e=document.getElementById("fitType-selected");e.onchange=n=>{i({type:n.target.value}),r(t)},t.type?e.value=t.type:i({type:e.value})}function S(){const e=document.getElementById("fit-margin");e.onchange=n=>{i({margin:Number(n.target.value)}),r(t)},t.margin?e.value=String(t.margin):i({margin:Number(e.value)})}function F(){Object.values(h).forEach(e=>{document.getElementById(`zoom-${e}`).onclick=()=>v(e)}),document.getElementById("zoom-reset").onclick=()=>r(t)}function L(){const e=document.getElementById("theme-selected");e.onchange=a=>{E(a.target.value)};const n=B();n&&(e.value=n)}function T(){const e=b(),n=`bpmn-visualization@${e.lib}`,a=[...e.dependencies].map(([u,d])=>`${u}@${d}`).join("/"),l=document.getElementById("footer-content");l.innerText=`${n} with ${a}`}function C(){document.addEventListener("wheel",e=>{e.ctrlKey&&e.preventDefault()},{passive:!1,capture:!0})}function w(){C(),g({globalOptions:{container:"bpmn-container",navigation:{enabled:!0}},statusKoNotifier:f}),document.getElementById("bpmn-file").addEventListener("change",p,!1),t=y().fit,O(),S(),I(),F(),L(),T()}m(w);
