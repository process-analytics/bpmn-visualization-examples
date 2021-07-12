const bpmnVisualizationContainerId = 'container-bpmn-visualization';
const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: bpmnVisualizationContainerId, navigation: { enabled: true } });

const bpmnJsContainerId = 'container-bpmn-js';
const bpmnJsViewer = new BpmnJS({ container: `#${bpmnJsContainerId}` });

let loadedXml;
let fitView = false;
let isBpmnVisualizationAlreadyLoaded = false;
let isBpmnJsAlreadyLoaded = false;

// Configure custom html elements
document.getElementById('btn-open-file').addEventListener('change', handleFileSelect, false);
const bpmnLibraryRadioButtons = document.getElementsByName('bpmnLibrary');
configureBpmnLibraryRadioButtons();
configureFitViewButton();


function loadWithBpmnVisualization(xml) {
  if (isBpmnVisualizationAlreadyLoaded) {
    logBpmnVisu('Diagram already loaded, skipping new load');
    return;
  }
  logBpmnVisu('Start loading diagram');
  bpmnVisualization.load(xml, { fit: computeBpmnVisualizationFitOptions() });
  logBpmnVisu('Diagram loaded');
  isBpmnVisualizationAlreadyLoaded = true;
}

async function loadWithBpmnJs(xml) {
  if (isBpmnJsAlreadyLoaded) {
    logBpmnJs('Diagram already loaded, skipping new load');
    return;
  }
  logBpmnJs('Starting import XML')
  await bpmnJsViewer.importXML(xml);
  logBpmnJs('Import XML done')
  setZoomLevelBpmnJs();
  isBpmnJsAlreadyLoaded = true;
}

function setZoomLevelBpmnJs() {
  const canvas = bpmnJsViewer.get('canvas');
  if (fitView) {
    // 'auto' to zoom into mid
    canvas.zoom('fit-viewport', 'auto');
  } else {
    // pass null to ensure the position of the diagram is taken from the BPMN xml
    canvas.zoom(1, null);
  }
  logBpmnJs(`Zoom level set, fitView ${fitView}`);
}

function setZoomLevelBpmnVisualization() {
  bpmnVisualization.fit(computeBpmnVisualizationFitOptions());
  logBpmnVisu(`Zoom level set, fitView ${fitView}`);
}

function computeBpmnVisualizationFitOptions() {
  const fitType = fitView ? bpmnvisu.FitType.Center: bpmnvisu.FitType.None;
  return { type: fitType, margin: 10 };
}

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  const file = evt.target.files[0];
  logMain(`New file selected for load: ${file.name}`);
  const reader = new FileReader();
  reader.onload = () => {
    isBpmnVisualizationAlreadyLoaded = false;
    isBpmnJsAlreadyLoaded = false;
    loadBpmn(reader.result);

    document.getElementById('loading-info').classList.remove('hidden');
    document.querySelector('#loading-info > span').innerHTML = `<code>${file.name}</code>`;
  };
  reader.readAsText(file);
}

function loadBpmn(xml) {
  const useBpmnVisualization = isUseBpmnVisualization();
  displayBpmnContainer(useBpmnVisualization);

  // effective load
  try {
    logMain(`Ready to load BPMN with fitView: ${fitView}`);
    if (useBpmnVisualization) {
      loadWithBpmnVisualization(xml);
    } else {
      loadWithBpmnJs(xml);
    }
    loadedXml = xml;
  } catch (err) {
    console.error('[main] Unable to load BPMN diagram', err);
  }
}

function reloadAfterBpmnLibrarySwitch() {
  logMain('BPMN Library switch detected');
  if (!loadedXml) {
    return;
  }
  logMain('Reloading the BPMN diagram');
  loadBpmn(loadedXml);
}


function configureFitViewButton() {
  const fitViewElt = document.getElementById('fitView');

  fitView = fitViewElt.checked;
  logMain(`Initial fitView: ${fitView}`);

  fitViewElt.addEventListener('change', function(event) {
    fitView = event.target.checked;
    changeZoomLevel();
  });
}

function changeZoomLevel() {
  logMain('Zoom level switch detected');
  if (!loadedXml) {
    return;
  }
  logMain(`Changing zoom level with fitView: ${fitView}`);
  if (isUseBpmnVisualization()) {
    setZoomLevelBpmnVisualization();
  } else {
    setZoomLevelBpmnJs();
  }
}

function configureBpmnLibraryRadioButtons() {
  for (let i = 0, length = bpmnLibraryRadioButtons.length; i < length; i++) {
    bpmnLibraryRadioButtons[i].addEventListener('change', reloadAfterBpmnLibrarySwitch);
  }
}

function isUseBpmnVisualization() {
  return getSelectedBpmnLibrary() === 'bpmn-visualization';
}

function getSelectedBpmnLibrary() {
  let bpmnLibrary;
  for (let i = 0, length = bpmnLibraryRadioButtons.length; i < length; i++) {
    if (bpmnLibraryRadioButtons[i].checked) {
      bpmnLibrary = bpmnLibraryRadioButtons[i].value;
      break;
    }
  }
  bpmnLibrary = bpmnLibrary ?? 'bpmn-visualization';
  logMain(`Selected lib: ${bpmnLibrary}`)
  return bpmnLibrary;
}


function displayBpmnContainer(useBpmnVisualization) {
  const bpmnVisualizationContainerElt = document.getElementById(bpmnVisualizationContainerId);
  const bpmnJsContainerElt = document.getElementById(bpmnJsContainerId);

  if (useBpmnVisualization) {
    bpmnVisualizationContainerElt.classList.remove('hidden');
    bpmnJsContainerElt.classList.add('hidden');
  } else {
    bpmnJsContainerElt.classList.remove('hidden');
    bpmnVisualizationContainerElt.classList.add('hidden');
  }
}

function log(header, msg) {
  console.info(`[${header}] ${msg}`);
}

function logBpmnJs(msg) {
  log('bpmn-js', msg)
}

function logBpmnVisu(msg) {
  log('bpmn-visualization', msg)
}

function logMain(msg) {
  log('main', msg)
}
