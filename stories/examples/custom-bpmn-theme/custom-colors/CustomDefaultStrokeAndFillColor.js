import './customColor.css';

import '../../static/css/spectre.min.css';
import '../../static/css/icons.min.css';
import '../../static/css/main.css';

import { getCustomColorsBpmnDiagram } from '../../static/js/diagram/bpmn-diagrams';
import { StyleIdentifiers } from "../../static/js/style-identifiers";

import { BpmnVisualization } from 'bpmn-visualization';


class BpmnVisualizationCustomizedColors extends BpmnVisualization {
  constructor(options) {
    super(options);
    this.configureStyle();
  }

  configureStyle() {
    const styleSheet = this.graph.getStylesheet(); // mxStylesheet parameter
    // edge
    styleSheet.getDefaultEdgeStyle()[StyleIdentifiers.STYLE_STROKECOLOR] = 'Orange';
    // vertex
    const defaultVertexStyle = styleSheet.getDefaultVertexStyle();
    defaultVertexStyle[StyleIdentifiers.STYLE_FILLCOLOR] = 'LemonChiffon';
    defaultVertexStyle[StyleIdentifiers.STYLE_STROKECOLOR] = 'Orange';
  }
}

function createElementsInDOM() {
  const container = document.createElement('div');
  container.id = "bpmn-container";
  container.className = "col-12 mb-2";
  return container;
}

export const createCustomDefaultStrokeAndFillColor = () => {
  const container = createElementsInDOM();

  const bpmnVisualization = new BpmnVisualizationCustomizedColors({ container });
  bpmnVisualization.load(getCustomColorsBpmnDiagram());

  return container;
};
