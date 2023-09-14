import './poolFilterOnLoad.css';

import '../../static/css/spectre.min.css';
import '../../static/css/icons.min.css';
import '../../static/css/main.css';

import { getPoolsFilterDiagram } from '../../static/js/diagram/bpmn-diagram-pools-filter';

import { BpmnVisualization } from 'bpmn-visualization';

function loadDiagram(bpmnVisualization, filteredPools) {
  bpmnVisualization.load(getPoolsFilterDiagram(), {
    fit: {type: 'Center', margin: 20},
    modelFilter: {pools: filteredPools}
  });
}


function createElementsInDOM() {
  const container = document.createElement('section');
  container.className = 'container';
  container.style = "margin-top: 3rem";

  container.innerHTML = `
            <div class="col-11 col-mx-auto">
                <h2>Filter pools</h2>
                <p>Select the pools you want to filter and reload the BPMN diagram.
                </p>

                <div class="columns" style="margin-top: 2.5rem">
                    <div id="controls" class="column col-2 p-centered">
                        <h5>Pools Filtering</h5>
                        <div class="form-group">
                            <label class="form-checkbox"><input type="checkbox" name="pools-filter" value="Participant_1"><i class="form-icon"></i> Pool 1</label>
                            <label class="form-checkbox"><input type="checkbox" name="pools-filter" value="Participant_4"><i class="form-icon"></i> Pool 2</label>
                            <label class="form-checkbox"><input type="checkbox" name="pools-filter" value="Participant_3"><i class="form-icon"></i> Pool 3</label>
                        </div>

                        <div style="margin-top: 1.5rem">
                            <button id="btn-reload" title="Reload the diagram with the pools filtering configuration" class="bg-dark btn btn-primary has-icon-right">
                                <span>Reload </span><span class="icon icon-refresh mb-1"></span>
                            </button>
                        </div>
                    </div>
                    <div id="bpmn-container" class="column col-10 col-mx-auto bpmn-container"/>
                </div>
            </div>`;

  return container;
}

export const createPoolFilterOnLoad = () => {
  const container = createElementsInDOM();

  const bpmnVisualization = new BpmnVisualization({ container: container.querySelector('#bpmn-container'),})

  container.querySelector('#btn-reload').onclick = () => {
    const filteredPools = [];
    container.querySelectorAll('[name="pools-filter"]').forEach((checkbox) => {
      if (checkbox.checked) {
        filteredPools.push({id: checkbox.value})
      }
    });
    loadDiagram(bpmnVisualization,filteredPools);
  }

  loadDiagram(bpmnVisualization,[]);


  return container;
};
