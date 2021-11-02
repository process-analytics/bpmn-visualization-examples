const bpmnVisualizationContainerId = 'container-bpmn-visualization';
const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: bpmnVisualizationContainerId, navigation: { enabled: true } });

const kieBpmnEditorContainerId = 'container-kie-editors-standalone';
const kieBpmnEditor = BpmnEditor.open({
  container: document.getElementById(kieBpmnEditorContainerId),
  readOnly: true, // available as of 0.9.0 (https://blog.kie.org/2021/04/design-tools-highlights-on-kogito-and-business-central-april-2021.html)
  onError: () => { logKieBpmn('Error occurs (probably while setting content)') }, // seems to be called only when the first error occurs, never again
});
kieBpmnEditor.subscribeToContentChanges((isDirty) => { logKieBpmn(`Content change detected, isDirty?${isDirty}`)})

let loadedXml;
let fitView = true;
let isBpmnVisualizationAlreadyLoaded = false;
let isKieBpmnAlreadyLoaded = false;

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

async function loadWithKieBpmn(xml) {
  if (isKieBpmnAlreadyLoaded) {
    logKieBpmn('Diagram already loaded, skipping new load');
    return;
  }
  logKieBpmn('Starting setting content')
  kieBpmnEditor.setContent("from-local-content", xml)
      .then(() => {
        logKieBpmn('Content set successfully!');
        setZoomLevelKieBpmn();
        isKieBpmnAlreadyLoaded = true;
      })
      .catch(() => logKieBpmn('Error while setting content'));
}

function setZoomLevelKieBpmn() {
  // TODO see if we have something for kie-editors-standalone
  logKieBpmn('no zoom settings for now');
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
    isKieBpmnAlreadyLoaded = false;
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
      loadWithKieBpmn(xml);
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
  document.getElementById('btn-fit-view').addEventListener('click', function(event) {
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
    setZoomLevelKieBpmn();
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
  const kieBpmnContainerElt = document.getElementById(kieBpmnEditorContainerId);

  if (useBpmnVisualization) {
    bpmnVisualizationContainerElt.classList.remove('hidden');
    kieBpmnContainerElt.classList.add('hidden');
  } else {
    kieBpmnContainerElt.classList.remove('hidden');
    bpmnVisualizationContainerElt.classList.add('hidden');
  }
  setButtonState('btn-fit-view', !useBpmnVisualization);
}

function log(header, msg) {
  console.info(`[${header}] ${msg}`);
}

function logKieBpmn(msg) {
  log('kie-editors-standalone', msg)
}

function logBpmnVisu(msg) {
  log('bpmn-visualization', msg)
}

function logMain(msg) {
  log('main', msg)
}
