import './customColor.css';

import '../../static/css/spectre.min.css';
import '../../static/css/icons.min.css';
import '../../static/css/main.css';

import { getCustomColorsBpmnDiagram } from '../../static/js/diagram/bpmn-diagrams';
import { StyleIdentifiers } from "../../static/js/style-identifiers";

import { BpmnVisualization } from 'bpmn-visualization';



class BpmnVisualizationCustomizedColors extends BpmnVisualization {
  constructor(container) {
    super({ container });
    this.configureStyle();
  }

  configureStyle() {
    const styleSheet = this.graph.getStylesheet(); // mxStylesheet parameter
    const defaultFontColor = 'DeepPink';
    // edge
    styleSheet.getDefaultEdgeStyle()[StyleIdentifiers.STYLE_FONTCOLOR] = defaultFontColor;
    // vertex
    styleSheet.getDefaultVertexStyle()[StyleIdentifiers.STYLE_FONTCOLOR] = defaultFontColor;
  }
}

function createElementsInDOM() {
  const container = document.createElement('section');
  container.classList.add(['col-12', 'mt-2', 'relative']);
  container.innerHTML = `<div id="bpmn-container" class="mb-2"></div>`;
  return container;
}

export const createCustomDefaultFontColor = () => {
  const container = createElementsInDOM();

  const bpmnVisualization = new BpmnVisualizationCustomizedColors({ container: container.querySelector('#bpmn-container') });
  bpmnVisualization.load(getCustomColorsBpmnDiagram());

  return container;
};
