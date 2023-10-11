import './customColor.css';

import '../../static/css/spectre.min.css';
import '../../static/css/icons.min.css';
import '../../static/css/main.css';

import { getCustomColorsBpmnDiagram } from '../../static/js/diagram/bpmn-diagrams';
import { StyleIdentifiers } from "../../static/js/style-identifiers";

import { BpmnVisualization, ShapeBpmnElementKind } from 'bpmn-visualization';


class BpmnVisualizationCustomizedColors extends BpmnVisualization {
  constructor(options) {
    super(options);
    this.configureStyle();
  }

  configureStyle() {
    const styleSheet = this.graph.getStylesheet(); // mxStylesheet parameter
    const style = styleSheet.styles[ShapeBpmnElementKind.TASK_USER];
    style[StyleIdentifiers.STYLE_FILLCOLOR] = '#adadec';
    style[StyleIdentifiers.STYLE_STROKECOLOR] = 'DarkBlue';
  }
}

function createElementsInDOM() {
  const container = document.createElement('div');
  container.id = "bpmn-container";
  container.className = "col-12 mb-2";
  return container;
}

export const createCustomColorForUserTask = () => {
  const container = createElementsInDOM();

  const bpmnVisualization = new BpmnVisualizationCustomizedColors({ container });
  bpmnVisualization.load(getCustomColorsBpmnDiagram());

  return container;
};
