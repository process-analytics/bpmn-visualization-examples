import './customColor.css';

import '../../static/css/spectre.min.css';
import '../../static/css/icons.min.css';
import '../../static/css/main.css';

import { getCustomColorsBpmnDiagram } from '../../static/js/diagram/bpmn-diagrams';
import { StyleIdentifiers } from "../../static/js/style-identifiers";

import { BpmnVisualization, ShapeBpmnElementKind } from 'bpmn-visualization';


class BpmnVisualizationCustomizedColors extends BpmnVisualization {
  constructor(containerId) {
    super({ container: containerId });
    this.configureStyle();
  }

  configureStyle() {
    const styleSheet = this.graph.getStylesheet();

    const startEventStyle = styleSheet.styles[ShapeBpmnElementKind.EVENT_START];
    startEventStyle[StyleIdentifiers.STYLE_FILLCOLOR] = '#d6eea5';
    startEventStyle[StyleIdentifiers.STYLE_STROKECOLOR] = '#8dc125';

    [ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH, ShapeBpmnElementKind.EVENT_INTERMEDIATE_THROW].forEach(kind => {
      const intermediateEventStyle = styleSheet.styles[kind];
      intermediateEventStyle[StyleIdentifiers.STYLE_STROKECOLOR] = '#7307df';
      intermediateEventStyle[StyleIdentifiers.STYLE_FILLCOLOR] = 'white'; // ensure reset if the style is redefined before
    })

    const boundaryEventStyle = styleSheet.styles[ShapeBpmnElementKind.EVENT_BOUNDARY];
    boundaryEventStyle[StyleIdentifiers.STYLE_FILLCOLOR] = 'LightGoldenrodYellow';
    boundaryEventStyle[StyleIdentifiers.STYLE_STROKECOLOR] = 'DarkOrange';

    const endEventStyle = styleSheet.styles[ShapeBpmnElementKind.EVENT_END];
    endEventStyle[StyleIdentifiers.STYLE_FILLCOLOR] = 'Pink';
    endEventStyle[StyleIdentifiers.STYLE_STROKECOLOR] = 'FireBrick';
  }
}

function createElementsInDOM() {
  const container = document.createElement('div');
  container.id = "bpmn-container";
  container.className = "col-12 mb-2";
  return container;
}

export const createCustomColorForBPMNEvents = () => {
  const container = createElementsInDOM();

  const bpmnVisualization = new BpmnVisualizationCustomizedColors({ container });
  bpmnVisualization.load(getCustomColorsBpmnDiagram());

  return container;
};
