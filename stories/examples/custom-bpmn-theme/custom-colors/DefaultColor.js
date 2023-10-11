import './customColor.css';

import '../../static/css/spectre.min.css';
import '../../static/css/icons.min.css';
import '../../static/css/main.css';

import { getCustomColorsBpmnDiagram } from '../../static/js/diagram/bpmn-diagrams';

import { BpmnVisualization } from 'bpmn-visualization';


function createElementsInDOM() {
  const container = document.createElement('div');
  container.id = "bpmn-container";
  container.className = "col-12 mb-2";
  return container;
}

export const createDefaultColor = () => {
  const container = createElementsInDOM();

  const bpmnVisualization = new BpmnVisualization({ container });
  bpmnVisualization.load(getCustomColorsBpmnDiagram());

  return container;
};
