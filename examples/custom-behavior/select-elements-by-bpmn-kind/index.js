const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container' });
const diagrams = new Map([
  ['A.4.1', getA_4_1_BpmnDiagram], // vertical diagram
  ['C.1.0', getC_1_0_BpmnDiagram],
  ['C.1.1', getC_1_1_BpmnDiagram], // no pool
  ['C.2.0', getC_2_0_BpmnDiagram],
]);
let lastLoadedDiagram;
let lastSelectedPool;

const notyf = configureToast();
configureBpmnDiagramsDropdown();
configurePoolSelectionButtons();
loadDiagram('C.2.0');


function loadDiagram(diagramName) {
  console.info('Loading diagram', diagramName);
  const diagram = diagrams.get(diagramName).call();
  bpmnVisualization.load(diagram, { fit: { type: bpmnvisu.FitType.Center, margin: 20 } });
  console.info('Diagram loaded');
  lastLoadedDiagram = diagramName;
  lastSelectedPool = '';

  registerBpmnElements();
}

function configureBpmnDiagramsDropdown() {
  document.getElementById('dropdown-diagram-choice').innerHTML = [...diagrams].map(([diagramName, ]) => {
    return `<li><a href="#" class="btn btn-link">${diagramName}</a></li>`
  }).join('\n');

  document.getElementById('dropdown-diagram-choice').querySelectorAll('li a')
  .forEach(function (anchor)  {
    anchor.onclick = function (e) {
      e.preventDefault();

      hide('dropdown-diagram-choice');
      const diagramName = anchor.parentElement.innerText;
      loadDiagram(diagramName)

      return false;
    };
  });
  // TODO duplicated with configurePoolSelectionDropdown
  document.getElementById('dropdown-toggle-diagram-choice').onclick = function () {
    show('dropdown-diagram-choice');
  }
}


function registerBpmnElements() {
  console.info('Registering Bpmn Elements...');

  const bpmnElements = bpmnVisualization.bpmnElementsRegistry.getElementsByKinds([bpmnvisu.ShapeBpmnElementKind.EVENT_END, bpmnvisu.ShapeBpmnElementKind.POOL]);
  console.info('Found Bpmn Elements:', bpmnElements.length);

  bpmnElements
  .filter(elt => elt.bpmnSemantic.kind !== bpmnvisu.ShapeBpmnElementKind.POOL)
  .forEach(elt => {
        const bpmnSemantic = elt.bpmnSemantic;
        elt.htmlElement.addEventListener('click', function (event) {
          const name = linearizeName(bpmnSemantic);
          const toastMsg = name ? `<b>name</b>: ${name}` : `<b>id</b>: ${bpmnSemantic.id}`
          toast(toastMsg);
        });
      }
  );
  console.info('Non Pools registered');

  const pools = bpmnElements
  .map(elt => elt.bpmnSemantic)
  .filter(bpmnSemantic => bpmnSemantic.kind === bpmnvisu.ShapeBpmnElementKind.POOL);
  configurePoolsSelection(pools);
  console.info('All Bpmn Elements registered');
}

// Some BPMN element names have break line, so remove them
function linearizeName(bpmnSemantic) {
  return bpmnSemantic.name
      // replace all 3 types of line breaks with a space
      ?.replace(/(\r\n|\n|\r)/gm,' ')
      // replace all double white spaces with single spaces
      .replace(/\s+/g," ");
}

// argument: array of pools bpmn semantic
function configurePoolsSelection(pools) {
  hide('btn-group-pools-selection');
  hide('pool-selection-info');
  hide('group-pools-selection-reset');

  console.info('Detected pools:', pools.length);
  if (!pools.length) {
    return;
  }

  // Drop down list
  document.querySelector('#dropdown-select-pool').innerHTML = pools.map(pool => {
    return `<li><a href="#" class="btn btn-link" data-bpmn-id="${pool.id}">${linearizeName(pool)}</a></li>`
  }).join('\n');

  document.querySelectorAll('#dropdown-select-pool li a')
  .forEach(function (anchor)  {
    anchor.onclick = function (e) {
      e.preventDefault();

      changePoolsVisibility(pools, anchor.getAttribute('data-bpmn-id'));

      const lastSelectedPool = anchor.parentElement.innerText;
      document.getElementById('last-selected-pool-name').innerHTML = `<code>${lastSelectedPool}</code>`;
      show('pool-selection-info');
      show('group-pools-selection-reset');

      hide('dropdown-select-pool');
      return false;
    };
  });

  show('btn-group-pools-selection');
}

function changePoolsVisibility(pools, poolIdToHighlight) {
  console.info('Updating model, pool to highlight:', poolIdToHighlight);
  const model = bpmnVisualization.graph.getModel();

  const poolSelectionMethod = getRadioGroupValue('poolSelectionMethod');
  console.info('Selection method:', poolSelectionMethod);
  const hideOthers = poolSelectionMethod === 'hide';
  const modelChangeFunction = hideOthers ?
      // only keep a single visible pool
      (cell => {
        model.setVisible(cell, cell.id === poolIdToHighlight);
        model.setCollapsed(cell, false);
      }) :
      // collapse other pools
      (cell => {
        model.setCollapsed(cell, cell.id !== poolIdToHighlight)
        model.setVisible(cell, true);
      });

  model.beginUpdate();
  try {
    pools.map(pool => model.getCell(pool.id))
    .forEach(modelChangeFunction);
  } finally {
    model.endUpdate();
  }

  console.info('Model updated');
}

function configurePoolSelectionButtons() {
  document.getElementById('dropdown-toggle-select-pool').onclick = function (){
    show('dropdown-select-pool');
  }

  document.getElementById('btn-pools-selection-reset').onclick = function (){
    loadDiagram(lastLoadedDiagram);
  }
}

function show(elementId) {
  document.getElementById(elementId).classList.remove('hidden');
}
function hide(elementId) {
  document.getElementById(elementId).classList.add('hidden');
}

// TODO extract in helper to avoid duplication with diagram-fit-on-load getSelectedFitType
function getRadioGroupValue(elementId) {
  const radios = document.getElementsByName(elementId);
  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
}

function configureToast() {
  return new Notyf({
    position: {
      x: 'right',
      y: 'top',
    },
    types: [
      {
        type: 'success',
        duration: 2500,
      }
    ]
  });
}

function toast(htmlMessage) {
  notyf.success(htmlMessage);
}
