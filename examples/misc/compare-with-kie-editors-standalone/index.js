// the rest of the code is in '../compare-with-bpmn-js/shared.js'

// TODO pass the filename to kie editor (must be available in LibraryComparator)

class KieBpmnEditorLibraryComparator extends LibraryComparator {
  #kieBpmnEditor;

  constructor(bpmnVisualizationContainerId, otherLibContainerId, state) {
    super(bpmnVisualizationContainerId, state);
    this._otherLibIdentifier = 'kie-editors-standalone';
    this.#kieBpmnEditor = BpmnEditor.open({
      container: document.getElementById(otherLibContainerId),
      readOnly: true, // available as of 0.9.0 (https://blog.kie.org/2021/04/design-tools-highlights-on-kogito-and-business-central-april-2021.html)
      onError: () => { console.error(`[${this._otherLibIdentifier}] Error occurs (probably while setting content)`) }, // seems to be called only when the first error occurs, never again
    });
    this.#kieBpmnEditor.subscribeToContentChanges((isDirty) => { this._logOtherLib(`Content change detected, isDirty?${isDirty}`)})
  }

  async _loadWithOtherLib(xml) {
    return this.#kieBpmnEditor.setContent("from-local-content", xml);
  }

  _setZoomLevelOtherLib() {
    this._logOtherLib('No zoom settings for now, so do nothing');
  }
}

class CustomUIController extends UIController {
  _configureFitViewButton() {
    const buttonElt = document.getElementById('btn-fit-view');
    const buttonTextFit = buttonElt.innerText;
    const buttonTitleFit = buttonElt.title;
    const buttonTextNoFit = 'No Fit View '; // trailing space must be kept

    setButtonState('btn-fit-view', !this._state.isUseBpmnVisualization);

    buttonElt.addEventListener('click', () => {
      this._state.fitView = !this._state.fitView;
      // TODO use the '_libraryComparator' property instead
      libraryComparator.changeZoomLevel();

      // The text is in a span
      buttonElt.firstElementChild.innerText = this._state.fitView ? buttonTextNoFit : buttonTextFit;
      buttonElt.title = this._state.fitView ? 'Restore the default zoom level' : buttonTitleFit;
    });
  }

  _updateUIBasedOnState() {
    super._updateUIBasedOnState();
    setButtonState('btn-fit-view', !this._state.isUseBpmnVisualization);
  }
}

const state = {
  fitView: false,
  isUseBpmnVisualization: true,
}

const libraryComparator = new KieBpmnEditorLibraryComparator('container-bpmn-visualization', 'container-kie-editors-standalone', state);

const uiController = new CustomUIController(state, libraryComparator, 'container-bpmn-visualization', 'container-kie-editors-standalone');
uiController.configure();
