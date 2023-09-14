import './customColor.css';

import '../../static/css/spectre.min.css';
import '../../static/css/icons.min.css';
import '../../static/css/main.css';

import { getCustomColorsBpmnDiagram } from '../../static/js/diagram/bpmn-diagrams';
import {Directions, FontStyle, StyleIdentifiers} from "../../static/js/style-identifiers";

import { BpmnVisualization, ShapeUtil, ShapeBpmnElementKind } from 'bpmn-visualization';

class BpmnVisualizationCustomizedColors extends BpmnVisualization {
  constructor(containerId) {
    super({ container: containerId });
    this.configureStyle();
  }

  configureStyle() {
    const styleSheet = this.graph.getStylesheet();

    ShapeUtil.eventKinds().forEach(kind => {
      const style = styleSheet.styles[kind];
      style[StyleIdentifiers.STYLE_FILLCOLOR] = 'Pink';
      style[StyleIdentifiers.STYLE_STROKECOLOR] = 'FireBrick';
    });

    ShapeUtil.taskKinds().forEach(kind => {
      const style = styleSheet.styles[kind];
      style[StyleIdentifiers.STYLE_GRADIENT_DIRECTION] = Directions.DIRECTION_EAST;
      style[StyleIdentifiers.STYLE_GRADIENTCOLOR] = 'White';
      style[StyleIdentifiers.STYLE_FILLCOLOR] = 'Lavender';
      style[StyleIdentifiers.STYLE_STROKECOLOR] = 'DarkBlue';
    });

    ShapeUtil.gatewayKinds().forEach(kind => {
      const style = styleSheet.styles[kind];
      style[StyleIdentifiers.STYLE_FILLCOLOR] = 'LightGoldenrodYellow';
      style[StyleIdentifiers.STYLE_STROKECOLOR] = 'DarkOrange';
    });

    const poolStyle = styleSheet.styles[ShapeBpmnElementKind.POOL];
    poolStyle[StyleIdentifiers.STYLE_FILLCOLOR] = '#303742';
    poolStyle[StyleIdentifiers.STYLE_GRADIENT_DIRECTION] = Directions.DIRECTION_SOUTH;
    poolStyle[StyleIdentifiers.STYLE_GRADIENTCOLOR] = '#6b7cb4';
    // for more details about font, see the custom-fonts example
    poolStyle[StyleIdentifiers.STYLE_FONTCOLOR] = 'White';
    poolStyle[StyleIdentifiers.STYLE_FONTSTYLE] = FontStyle.FONT_BOLD + FontStyle.FONT_ITALIC;
  }
}

function createElementsInDOM() {
  const container = document.createElement('div');
  container.id = "bpmn-container";
  container.className = "col-12 mb-2";
  return container;
}

export const createCustomColorForBPMNKind = () => {
  const container = createElementsInDOM();

  const bpmnVisualization = new BpmnVisualizationCustomizedColors({ container });
  bpmnVisualization.load(getCustomColorsBpmnDiagram());

  return container;
};
