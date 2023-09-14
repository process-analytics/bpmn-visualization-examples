import './loadLocalBpmnDiagram.css';

import '../../static/css/spectre.min.css';
import '../../static/css/icons.min.css';
import '../../static/css/main.css';

import { BpmnVisualization } from 'bpmn-visualization';

const bpmnVisualization = new BpmnVisualization({ container: 'bpmn-container' });

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  const file = evt.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    try {
      console.log(reader.result);
      bpmnVisualization.load(reader.result);
      document.getElementById('loading-info').classList.remove('hidden');
      // TODO we probably don't need it, just select span child
      document.getElementById('loaded-file-name').innerHTML = `<code>${file.name}</code>`;
    } catch (error) {
      console.error('Unable to load the BPMN diagram.', error);
      window.alert(`Unable to load the BPMN diagram. \n\n${error.message}`);
    }
  };
  reader.readAsText(file);
}

function createElementsInDOM() {
  const container = document.createElement('div');
  container.innerHTML = `
    <section class="container col-10 flex-centered mt-2">
        <section class="col-12 mt-2 relative">
            <h2>Load local BPMN diagrams</h2>
            <div id="file-selector">
                <input type="file" id="btn-open-file" name="btn-open-file" class="hidden"/>
                <label for="btn-open-file" class="btn btn-primary has-icon-right"><span>Choose a local file </span><span class="icon icon-upload mb-1"></span></label>
            </div>
            <div id="loading-info" class="hidden">
                <b>Last loaded file:</b> <span id="loaded-file-name"></span>
            </div>
        </section>
    </section>
    <section class="col-12 mt-2 relative">
        <div class="bpmn-container-absolute">
            <div id="bpmn-container" class="mb-2"></div>
        </div>
    </section>`;

  return container;
}

export const createLoadLocalBpmnDiagram = () => {
  const container = createElementsInDOM();
  container.querySelector('#btn-open-file').addEventListener('change', handleFileSelect, false);
  return container;
};
