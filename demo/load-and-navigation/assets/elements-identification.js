import{d as E,s as q,w as I,u as L,F as P,r as p,e as S,l as c,i as w,j as A,k as O,m as x,n as C,S as v,o as u,p as i,q as T,t as g,v as F,x as D}from"./main.js";import"./mxgraph.js";let s=[],f=[],y=[];const a="detection";let d=!0,r=!0;function N(t){const e={font:{},fill:{},stroke:{}};if(F(t)){switch(t){case"messageFlow":case"sequenceFlow":case"association":{e.font.color="Chocolate",e.stroke.color="Chocolate",e.stroke.width=4;break}}return e}if(i.isTask(t))e.font.color="Indigo",e.fill.color="gold",e.font.size=14,e.fill.opacity=20;else if(i.isEvent(t))i.isBoundaryEvent(t)?(e.font.color="inherit",e.fill.color="inherit",e.stroke.color="inherit"):(e.font.color="MediumTurquoise",e.stroke.color="MediumTurquoise");else if(i.isGateway(t))e.font.color="CadetBlue",e.font.opacity=85,e.stroke.color="OrangeRed",e.stroke.width=4;else if(i.isPoolOrLane(t))e.font.color="white !important",e.fill.color="deeppink",e.stroke.opacity=80;else if(i.isCallActivity(t))e.font.color="white",e.font.family="Times New Roman",e.font.isItalic=!0,e.font.isStrikeThrough=!0,e.fill.color={startColor:"LightYellow",endColor:"LimeGreen",direction:"left-to-right"};else if(i.isSubProcess(t))e.font.color="white",e.font.size=14,e.font.family="Dialog",e.font.isBold=!0,e.font.isItalic=!0,e.font.isUnderline=!0,e.font.isStrikeThrough=!0,e.fill.color="MidnightBlue",e.opacity=60;else switch(t){case"group":case"textAnnotation":{e.font.color="Crimson",e.font.size=18,e.font.family="Verdana",e.font.isBold=!0,e.font.isUnderline=!0,e.stroke.color="Chartreuse",e.stroke.width=6;break}}return e}function B(t,e){const o=t.filter(n=>x(n)),l=t.filter(n=>!o.includes(n));o.length>0&&(y=C([v.POOL,v.LANE]).map(n=>n.id),u(y,{opacity:5,font:{color:"blue",opacity:5},fill:{color:"pink"},stroke:{color:"green"}})),u(o,{fill:{color:"swimlane"},stroke:{color:"swimlane"},font:{color:"swimlane"}}),i.isBoundaryEvent(e)&&(f=T(l),u(f,{opacity:5,font:{color:"green",opacity:5},fill:{color:"gold"},stroke:{color:"red"}}));const h=N(e);u(l,h)}function b(t){p(s,a),w(t,a)}function z(t,e){k(),B(t,e)}function k(){g(s),g(f),f=[],g(y),y=[]}function M(t,e){for(const o of s)S(o);if(d)for(const o of t)D(o,G(e));else c("Do not display overlays")}function m(t){c(`Searching for Bpmn elements of '${t}' kind`);const e=C(t);R(e,t);const o=e.map(l=>l.id);r?b(o):z(o,t),M(o,t),s=o}function R(t,e){const o=document.querySelector("#elements-result"),l=`Found ${t.length} ${e}(s)`;c(l);const h=t.map(n=>`  - ${n.id}: '${n.name}'`).join(`
`);o.value+=[l,h].join(`
`)+`
`,o.scrollTop=o.scrollHeight}function U(){const t=document.querySelector("#elements-result");t.value=""}function $(){const t=document.querySelector("#bpmn-kinds-select");t.addEventListener("change",l=>m(l.target.value)),document.addEventListener("diagramLoaded",()=>m(t.value),!1),document.querySelector("#clear-btn").addEventListener("click",function(){U(),r?p(s,a):k();for(const l of s)S(l);s=[]});const e=document.querySelector("#checkbox-display-overlays");e.addEventListener("change",function(){d=this.checked,c("Request overlays display:",d),m(t.value)}),e.checked=d;const o=document.querySelector("#checkbox-css-style");o.addEventListener("change",function(){r=this.checked,c("Request CSS style feature:",r),r?(k(),w(s,a)):(p(s,a),B(s,t.value))}),o.checked=r}function G(t){return i.isActivity(t)?{position:"top-right",label:"30",style:{font:{color:"Chartreuse",size:20},fill:{color:"DimGray"}}}:t.includes("Gateway")?{position:"top-left",label:"3",style:{stroke:{color:"HotPink",width:4}}}:t.includes("Event")?{position:"bottom-left",label:"15"}:t.includes("lane")||t.includes("pool")?{position:"bottom-right",label:"100"}:t.includes("Flow")?{position:"middle",label:"999",style:{fill:{color:"PaleTurquoise",opacity:25}}}:{position:"top-left",label:"40"}}function j(){document.querySelector("#btn-dl-svg").addEventListener("click",A,!1),document.querySelector("#btn-dl-png").addEventListener("click",O,!1)}E(()=>{q({globalOptions:{container:document.querySelector(".bpmn-container"),navigation:{enabled:!0}},statusKoNotifier:I}),L({type:P.Center,margin:20}),$(),j()});
