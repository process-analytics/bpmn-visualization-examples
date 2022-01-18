// the rest of the code is in shared.js (shared with the kie-editors-standalone comparison example)

class BpmnJSLibraryComparator extends LibraryComparator {
  #bpmnJsViewer;

  constructor(bpmnVisualizationContainerId, otherLibContainerId, state) {
    super(bpmnVisualizationContainerId, state);
    this._otherLibIdentifier = 'bpmn-js';
    this.#bpmnJsViewer = new BpmnJS({ container: `#${otherLibContainerId}` });
  }

  async _loadWithOtherLib(xml) {
    return this.#bpmnJsViewer.importXML(xml);
  }

  _setZoomLevelOtherLib() {
    const canvas = this.#bpmnJsViewer.get('canvas');
    if (this._state.fitView) {
      // 'auto' to zoom into mid
      canvas.zoom('fit-viewport', 'auto');
    } else {
      // pass null to ensure the position of the diagram is taken from the BPMN xml
      canvas.zoom(1, null);
    }
    this._logOtherLib(`Zoom level set, fitView ${this._state.fitView}`);
  }
}


const state = {
  fitView: false,
  isUseBpmnVisualization: true,
}

const libraryComparator = new BpmnJSLibraryComparator('container-bpmn-visualization', 'container-bpmn-js', state);

const uiController = new UIController(state, libraryComparator, 'container-bpmn-visualization', 'container-bpmn-js');
uiController.configure();
