import{d as m,s as f,w as g,h as p,g as v,l as r,u as s,f as c,Z as y,z as h,a as S,b as L,c as E}from"./main.js";import"./mxgraph.js";let o=!0,t={};function b(){const e=document.querySelector("#fitOnLoad");e.addEventListener("change",n=>{o=n.target.checked,r("Fit on load updated!",o),s(o?t:{})}),e.checked=o}function i(e){r("Updating fit config",e),t.margin=e.margin??t.margin,e.type&&(t.type=e.type),r("Fit config updated!",t),o&&s(t)}function O(){const e=document.querySelector("#fitType-selected");e.addEventListener("change",n=>{i({type:n.target.value}),c(t)}),t.type?e.value=t.type:i({type:e.value})}function T(){const e=document.querySelector("#fit-margin");e.addEventListener("change",n=>{i({margin:Number(n.target.value)}),c(t)}),t.margin?e.value=String(t.margin):i({margin:Number(e.value)})}function q(){for(const e of Object.values(y))document.querySelector(`#zoom-${e}`).addEventListener("click",()=>h(e));document.querySelector("#zoom-reset").addEventListener("click",()=>c(t))}function C(){const e=document.querySelector("#theme-selected");e.addEventListener("change",a=>{S(a.target.value)});const n=E();n&&(e.value=n)}function F(){const e=L(),n=`bpmn-visualization@${e.lib}`,a=[...e.dependencies].map(([d,l])=>`${d}@${l}`).join("/"),u=document.querySelector("#footer-content");u.textContent=`${n} with ${a}`}function z(){document.addEventListener("wheel",e=>{e.ctrlKey&&e.preventDefault()},{passive:!1,capture:!0})}function w(){z(),f({globalOptions:{container:"bpmn-container",navigation:{enabled:!0}},statusKoNotifier:g}),document.querySelector("#bpmn-file").addEventListener("change",p,!1),t=v().fit,O(),T(),b(),q(),C(),F()}m(w);
