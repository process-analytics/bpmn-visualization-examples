let usePathHighLightingStepByStep = false;
configurePathHighlightType();

const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container', navigation: { enabled: true} });
bpmnVisualization.load(getC_1_1_BpmnDiagram(), { fit: { type: bpmnvisu.FitType.Center, margin: 20 } });

const styledElements = [
  // tasks
  'assignApprover', 'approveInvoice', 'reviewInvoice', 'prepareBankTransfer',
  // gateways
  'reviewSuccessful_gw', 'invoice_approved'
];

const pathEdgeElements = ['SequenceFlow_1', 'sequenceFlow_178', 'sequenceFlow_180', 'invoiceApproved'];
const pathLastShape = 'prepareBankTransfer';
const pathShapeElements= ['StartEvent_1', 'assignApprover','approveInvoice', 'invoice_approved', pathLastShape];
const orderedPathElements = [
  {name: 'StartEvent_1', type: 'shape'},
  {name: 'SequenceFlow_1', type: 'edge'},
  {name: 'assignApprover', type: 'shape'},
  {name: 'sequenceFlow_178', type: 'edge'},
  {name: 'approveInvoice', type: 'shape'},
  {name: 'sequenceFlow_180', type: 'edge'},
  {name: 'invoice_approved', type: 'shape'},
  {name: 'invoiceApproved', type: 'edge'},
  {name: pathLastShape, type: 'shape'},
];


applyInitialStyles();

document.getElementById('btn-reset').onclick = function() {
  clearAllStyles();
  applyInitialStyles();

  ['btn-success', 'btn-warning', 'btn-error']
  .forEach(id => document.getElementById(id).disabled = false);
};

document.getElementById('btn-clear').onclick = function() {
  clearAllStyles();
};

document.getElementById('btn-info').onclick = function() {
  toggleCssClass(['assignApprover', 'prepareBankTransfer'], 'bpmn-activity-info');
};
document.getElementById('btn-success').onclick = function() {
  addCssClass(['approveInvoice'], 'bpmn-activity-success');
  this.disabled = true;
};
document.getElementById('btn-warning').onclick = function() {
  removeCssClass(['reviewSuccessful_gw', 'invoice_approved'], 'bpmn-gateway-warning');
  this.disabled = true;
};
document.getElementById('btn-error').onclick = function() {
  addCssClass(['reviewInvoice'], 'bpmn-activity-error');
  this.disabled = true;
};

function configurePathHighlightType() {
  const checkPathByStepElt = document.getElementById('chk-path-step');

  usePathHighLightingStepByStep = checkPathByStepElt.checked;
  console.info(`Initial pathHighLightingStepByStep: ${usePathHighLightingStepByStep}`);

  checkPathByStepElt.addEventListener('change', function(event) {
    usePathHighLightingStepByStep = event.target.checked;
    clearHighlightPath();
  });
}

document.getElementById('btn-path').onclick = function() {
  if (usePathHighLightingStepByStep) {
    pathHighLightingStepByStep();
  } else {
    pathHighLightingByGroup();
  }
};

let pathGroupStep = 'none';
function pathHighLightingByGroup() {
  switch (pathGroupStep) {
    case 'none':
      addHighlightPath(pathEdgeElements);
      pathGroupStep = 'step1';
      break;
    case 'step1':
      addHighlightPath(pathShapeElements, true);
      addCssClass([pathLastShape], 'bpmn-activity-in-progress');
      pathGroupStep = 'step2';
      break;
    case 'step2':
      removeHighlightPath(pathEdgeElements);
      pathGroupStep = 'step3';
      break;
    case 'step3':
      removeHighlightPath(pathShapeElements, true);
      removeCssClass([pathLastShape], 'bpmn-activity-in-progress');
      pathGroupStep = 'step4';
      break;
    case 'step4':
      addHighlightPath(pathEdgeElements);
      addHighlightPath(pathShapeElements, true);
      addCssClass([pathLastShape], 'bpmn-activity-in-progress');
      pathGroupStep = 'step5';
      break;
    default:
      clearHighlightPath();
  }
}

let pathEltCount = 0;
function pathHighLightingStepByStep() {
  if (pathEltCount >= orderedPathElements.length) {
    clearHighlightPath();
    return;
  }

  const pathElement = orderedPathElements[pathEltCount];
  addHighlightPath(pathElement.name, pathElement.type === 'shape');
  pathEltCount++;
  // last element
  if (pathEltCount >= orderedPathElements.length) {
    addCssClass([pathElement.name], 'bpmn-activity-in-progress');
  }
}

function applyInitialStyles() {
  addCssClass(['assignApprover'], 'bpmn-activity-info');
  addCssClass(['reviewSuccessful_gw', 'invoice_approved'], 'bpmn-gateway-warning');
}

function clearAllStyles() {
  removeCssClass(styledElements, 'bpmn-activity-info', 'bpmn-activity-success', 'bpmn-activity-error', 'bpmn-gateway-warning')
  clearHighlightPath();
}


function addHighlightPath(elements, isShape) {
  addCssClass(elements, getPathHighlightClassName(isShape));
}
function getPathHighlightClassName(isShape) {
  return isShape ? 'bpmn-shape-path-highlight' : 'bpmn-edge-path-highlight';
}
function removeHighlightPath(elements, isShape) {
  removeCssClass(elements, getPathHighlightClassName(isShape));
}
function clearHighlightPath() {
  removeCssClass(pathEdgeElements.concat(pathShapeElements), 'bpmn-edge-path-highlight', 'bpmn-shape-path-highlight', 'bpmn-activity-in-progress');
  pathGroupStep = 'none';
  pathEltCount = 0;
}

function addCssClass(elements, ...classNames) {
  bpmnVisualization.bpmnElementsRegistry.addCssClasses(elements, classNames);
}
function removeCssClass(elements, ...classNames) {
  bpmnVisualization.bpmnElementsRegistry.removeCssClasses(elements, classNames);
}
function toggleCssClass(elements, classNames) {
  bpmnVisualization.bpmnElementsRegistry.toggleCssClasses(elements, classNames);
}
