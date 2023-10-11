import './applyCssClasses.css';

import '../../static/css/spectre.min.css';
import '../../static/css/icons.min.css';
import '../../static/css/main.css';

import { getC_1_1_BpmnDiagram } from '../../static/js/diagram/bpmn-diagram-miwg-test-suite-c_1_1';

import { BpmnVisualization, FitType } from 'bpmn-visualization';

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
const pathHighlightClassName = 'highlight-path';

let usePathHighLightingStepByStep = false;
let pathGroupStep = 'none';
let pathEltCount = 0;

function configurePathHighlightType(bpmnVisualization, container) {
  const checkPathByStepElt = container.querySelector('#chk-path-step');

  usePathHighLightingStepByStep = checkPathByStepElt.checked;
  console.info(`Initial pathHighLightingStepByStep: ${usePathHighLightingStepByStep}`);

  checkPathByStepElt.addEventListener('change', function(event) {
    usePathHighLightingStepByStep = event.target.checked;
    clearHighlightPath(bpmnVisualization);
  });
}

function pathHighLightingByGroup(bpmnVisualization) {
  switch (pathGroupStep) {
    case 'none':
      addHighlightPath(bpmnVisualization, pathEdgeElements);
      pathGroupStep = 'step1';
      break;
    case 'step1':
      addHighlightPath(bpmnVisualization, pathShapeElements);
      bpmnVisualization.bpmnElementsRegistry.addCssClasses([pathLastShape], 'highlight-in-progress');
      pathGroupStep = 'step2';
      break;
    case 'step2':
      removeHighlightPath(bpmnVisualization, pathEdgeElements);
      pathGroupStep = 'step3';
      break;
    case 'step3':
      removeHighlightPath(bpmnVisualization, pathShapeElements);
      bpmnVisualization.bpmnElementsRegistry.removeCssClasses( [pathLastShape], 'highlight-in-progress');
      pathGroupStep = 'step4';
      break;
    case 'step4':
      addHighlightPath(bpmnVisualization, pathEdgeElements);
      addHighlightPath(bpmnVisualization,pathShapeElements);
      bpmnVisualization.bpmnElementsRegistry.addCssClasses([pathLastShape], 'highlight-in-progress');
      pathGroupStep = 'step5';
      break;
    default:
      clearHighlightPath(bpmnVisualization);
  }
}
function pathHighLightingStepByStep(bpmnVisualization) {
  if (pathEltCount >= orderedPathElements.length) {
    clearHighlightPath(bpmnVisualization);
    return;
  }

  const pathElement = orderedPathElements[pathEltCount];
  addHighlightPath(bpmnVisualization,pathElement.name);
  pathEltCount++;
  // last element
  if (pathEltCount >= orderedPathElements.length) {
    bpmnVisualization.bpmnElementsRegistry.addCssClasses([pathElement.name], 'highlight-in-progress');
  }
}

function applyInitialStyles(bpmnVisualization) {
  bpmnVisualization.bpmnElementsRegistry.addCssClasses(['assignApprover'], 'highlight-info');
  bpmnVisualization.bpmnElementsRegistry.addCssClasses(['reviewSuccessful_gw', 'invoice_approved'], 'highlight-warning');
}
function clearAllStyles(bpmnVisualization) {
  bpmnVisualization.bpmnElementsRegistry.removeAllCssClasses();
  clearHighlightPath(bpmnVisualization);
}

function addHighlightPath(bpmnVisualization, elements) {
  bpmnVisualization.bpmnElementsRegistry.addCssClasses(elements, pathHighlightClassName);
}
function removeHighlightPath(bpmnVisualization, elements) {
  bpmnVisualization.bpmnElementsRegistry.removeCssClasses(elements, pathHighlightClassName);
}
function clearHighlightPath(bpmnVisualization) {
  bpmnVisualization.bpmnElementsRegistry.removeCssClasses(pathEdgeElements.concat(pathShapeElements), pathHighlightClassName, 'highlight-in-progress');
  pathGroupStep = 'none';
  pathEltCount = 0;
}

function createElementsInDOM() {
  const container = document.createElement('div');
  container.innerHTML = `
        <section class="container col-10 flex-centered mt-2">
        <section class="col-12 mt-2">
            <div class="col-12 mb-2">
                <h2>Apply css classes</h2>
                Highlight elements and paths on demand on the <a href="https://github.com/bpmn-miwg/bpmn-miwg-test-suite/blob/master/Reference/C.1.1.bpmn" target="_blank">miwg-test-suite C.1.1</a> BPMN diagram.
            </div>
            <div id="controls" style="margin-top: 25px">
                <div id="btn-group-general" class="col-2 float-left">
                    <button id="btn-reset" title="Reset applied styles" class="bg-dark btn btn-primary has-icon-right">
                        <span>Reset </span><span class="icon icon-refresh mb-1"></span>
                    </button>
                    <button id="btn-clear" title="Clear all applied styles" class="bg-dark btn btn-primary has-icon-right">
                        <span>Clear </span><span class="icon icon-delete mb-1"></span>
                    </button>
                </div>
                <div id="btn-group-styles" class="col-5 float-left">
                    <button id="btn-info" title="Toggle info styles" class="btn btn-primary has-icon-right">
                        <span>Info </span><span class="icon icon-message mb-1"></span>
                    </button>
                    <button id="btn-success" title="Add success styles" class="bg-success btn btn-primary has-icon-right">
                        <span>Success </span><span class="icon icon-check mb-1"></span>
                    </button>
                    <button id="btn-warning" title="Remove warning styles" class="bg-warning btn btn-primary has-icon-right">
                        <span>Warning </span><span class="icon icon-flag mb-1"></span>
                    </button>
                    <button id="btn-error" title="Add error styles" class="bg-error btn btn-primary has-icon-right">
                        <span>Error </span><span class="icon icon-stop mb-1"></span>
                    </button>
                </div>
                <div id="btn-group-paths" class="col-4 float-left">
                    <button id="btn-path" title="Toggle path highlighting " class="btn btn-primary has-icon-right">
                        <span>Highlight path/trace </span><span class="icon icon-message mb-1"></span>
                    </button>
                    <label class="ml-2" title="If checked, highlight the path step by step from the start to the in-progress activity"><input type="checkbox" id="chk-path-step" name="chk-path-step"> Step-by-step highlight</label>
                </div>
            </div>
        </section>
    </section>
    <section class="col-11 mt-2 relative">
        <div id="bpmn-container"></div>
    </section>`;

  return container;
}

export const createApplyCssClasses = () => {
  const container = createElementsInDOM();

  const bpmnVisualization = new BpmnVisualization({ container: container.querySelector('#bpmn-container'), navigation: { enabled: true} });
  configurePathHighlightType(bpmnVisualization, container);
  bpmnVisualization.load(getC_1_1_BpmnDiagram(), { fit: { type: FitType.Center, margin: 20 } });

  applyInitialStyles(bpmnVisualization);

  container.querySelector('#btn-reset').onclick = function() {
    clearAllStyles(bpmnVisualization);
    applyInitialStyles(bpmnVisualization);

    ['btn-success', 'btn-warning', 'btn-error']
        .forEach(id => container.querySelector(`#${id}`).disabled = false);
  };
  container.querySelector('#btn-clear').onclick = function() {
    clearAllStyles(bpmnVisualization);
  };
  container.querySelector('#btn-info').onclick = function() {
    bpmnVisualization.bpmnElementsRegistry.toggleCssClasses(['assignApprover', 'prepareBankTransfer'], 'highlight-info');
  };
  container.querySelector('#btn-success').onclick = function() {
    bpmnVisualization.bpmnElementsRegistry.addCssClasses(['approveInvoice'], 'highlight-success');
    this.disabled = true;
  };
  container.querySelector('#btn-warning').onclick = function() {
    bpmnVisualization.bpmnElementsRegistry.removeCssClasses( ['reviewSuccessful_gw', 'invoice_approved'], 'highlight-warning');
    this.disabled = true;
  };
  container.querySelector('#btn-error').onclick = function() {
    bpmnVisualization.bpmnElementsRegistry.addCssClasses(['reviewInvoice'], 'highlight-error');
    this.disabled = true;
  };
  container.querySelector('#btn-path').onclick = function() {
    if (usePathHighLightingStepByStep) {
      pathHighLightingStepByStep(bpmnVisualization);
    } else {
      pathHighLightingByGroup(bpmnVisualization);
    }
  };

  return container;
};
