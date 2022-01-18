class LibraryComparator {
    #loadedBpmnXmlContent = null;
    #loadedResourceName;
    #isBpmnVisualizationAlreadyLoaded = false;
    _isOtherLibAlreadyLoaded = false;
    _otherLibIdentifier;
    _state;

    #bpmnVisualization;

    constructor(bpmnVisualizationContainerId, state) {
        this.#bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: bpmnVisualizationContainerId, navigation: { enabled: true } });
        this._state = state;
    }

    loadNewBpmn(xml, resourceName) {
        this._resetLoadStatus();
        return this._performLoadBpmn(xml, resourceName)
            .then(() => {
                this.#loadedBpmnXmlContent = xml;
                this.#loadedResourceName = resourceName;
            });
    }

    _resetLoadStatus() {
        this.#isBpmnVisualizationAlreadyLoaded = false;
        this._isOtherLibAlreadyLoaded = false;
    }

    async _performLoadBpmn(xml, resourceName) {
        logMain(`Ready to load BPMN with fitView: ${this._state.fitView}`);
        if (this._state.isUseBpmnVisualization) {
            if (this.#isBpmnVisualizationAlreadyLoaded) {
                this._logBpmnVisualization('Diagram already loaded, skipping new load');
                return;
            }
            await new Promise((resolve, reject) => {
                try {
                    this._logBpmnVisualization('Start loading diagram')
                    this.#bpmnVisualization.load(xml, {fit: this._computeBpmnVisualizationFitOptions()});
                    this._logBpmnVisualization('Diagram loaded');
                    this.#isBpmnVisualizationAlreadyLoaded = true;
                    return resolve();
                } catch (err) {
                    return reject({libId: 'bpmn-visualization', cause: err});
                }
                });
        } else {
            if (this._isOtherLibAlreadyLoaded) {
                this._logOtherLib('Diagram already loaded, skipping new load');
                return;
            }
            await new Promise((resolve, reject) => {
                this._logOtherLib('Start loading diagram');
                this._loadWithOtherLib(xml, resourceName)
                    .then(() => {
                        this._logOtherLib('Diagram loaded');
                        this._setZoomLevelOtherLib();
                        this._isOtherLibAlreadyLoaded = true;
                        return resolve();
                    })
                    .catch(err => {
                        return reject({libId: this._otherLibIdentifier, cause: err});
                    })
                ;
            });
        }
    }

    loadExistingBpmn() {
        logMain('Loading an existing BPMN diagram');
        if (!this.#loadedBpmnXmlContent) {
            logMain('No loaded BPMN content, nothing to do');
            return;
        }
        this._performLoadBpmn(this.#loadedBpmnXmlContent, this.#loadedResourceName);
    }

    _computeBpmnVisualizationFitOptions() {
        const fitType = this._state.fitView ? bpmnvisu.FitType.Center: bpmnvisu.FitType.None;
        return { type: fitType, margin: 10 };
    }

    async _loadWithOtherLib(xml, resourceName) {
        // implement in subclass
    }

    changeZoomLevel() {
        logMain('Zoom level switch detected');
        if (!this.#loadedBpmnXmlContent) {
            logMain('No loaded BPMN content, nothing to do');
            return;
        }
        logMain(`Changing zoom level with fitView: ${this._state.fitView}`);
        if (this._state.isUseBpmnVisualization) {
            this._setZoomLevelBpmnVisualization();
        } else {
            this._setZoomLevelOtherLib();
        }
    }

    _setZoomLevelBpmnVisualization() {
        this.#bpmnVisualization.fit(this._computeBpmnVisualizationFitOptions());
        this._logBpmnVisualization(`Zoom level set, fitView ${this._state.fitView}`);
    }

    _setZoomLevelOtherLib() {
        // implement in subclass
    }

    _logBpmnVisualization(msg) {
        log('bpmn-visualization', msg)
    }

    _logOtherLib(msg) {
        log(this._otherLibIdentifier, msg);
    }
}

class UIController {
    _state;
    #libraryComparator;
    #bpmnLibraryRadioButtons;
    _bpmnVisualizationContainerId;
    _otherLibContainerId;

    constructor(state, libraryComparator, bpmnVisualizationContainerId, otherLibContainerId) {
        this._state = state;
        this.#libraryComparator = libraryComparator;
        this._bpmnVisualizationContainerId = bpmnVisualizationContainerId;
        this._otherLibContainerId = otherLibContainerId;
    }

    configure() {
        document.getElementById('btn-open-file').addEventListener('change', this._handleFileSelect.bind(this), false);
        this.#bpmnLibraryRadioButtons = document.getElementsByName('bpmnLibrary');
        this._configureBpmnLibraryRadioButtons();
        this._configureFitViewButton();
    }

    _configureFitViewButton() {
        const fitViewElt = document.getElementById('fitView');

        this._state.fitView = fitViewElt.checked;
        logMain(`Initial fitView: ${this._state.fitView}`);

        fitViewElt.addEventListener('change', event => {
            this._state.fitView = event.target.checked;
            this.#libraryComparator.changeZoomLevel();
        });
    }

    _configureBpmnLibraryRadioButtons() {
        this._state.isUseBpmnVisualization = this._isUseBpmnVisualization();
        logMain(`Initial used library is BpmnVisualization: ${this._state.isUseBpmnVisualization}`);

        for (let i = 0, length = this.#bpmnLibraryRadioButtons.length; i < length; i++) {
            this.#bpmnLibraryRadioButtons[i].addEventListener('change', () => {
                this._state.isUseBpmnVisualization = this._isUseBpmnVisualization();
                this._updateUIBasedOnState();
                this.#libraryComparator.loadExistingBpmn();
            });
        }
    }

    _isUseBpmnVisualization() {
        let bpmnLibrary;
        for (let i = 0, length = this.#bpmnLibraryRadioButtons.length; i < length; i++) {
            if (this.#bpmnLibraryRadioButtons[i].checked) {
                bpmnLibrary = this.#bpmnLibraryRadioButtons[i].value;
                break;
            }
        }
        bpmnLibrary = bpmnLibrary ?? 'bpmn-visualization';
        logMain(`Selected lib: ${bpmnLibrary}`)
        return bpmnLibrary === 'bpmn-visualization';
    }

    _handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const file = evt.target.files[0];

        const resourceName = file.name;
        logMain(`New file selected for load: ${resourceName}`);
        const reader = new FileReader();
        reader.onload = () => {
            this.#libraryComparator.loadNewBpmn(reader.result, resourceName)
                .then(() => {
                    document.getElementById('loading-info').classList.remove('hidden');
                    document.querySelector('#loading-info > span').innerHTML = `<code>${resourceName}</code>`;
                })
                .catch(err => {
                    console.error(`[${err.libId}] Unable to load the BPMN diagram.`, err.cause);
                    // TODO remove when bpmn-visualization will stop opening an alert on error
                    if (err.libId !== 'bpmn-visualization') {
                        window.alert(`[${err.libId}] Unable to load the BPMN diagram. \n\n${err.cause.message}`);
                    }
                })
            ;
        };
        reader.readAsText(file);
    }

    _updateUIBasedOnState() {
        const bpmnVisualizationContainerElt = document.getElementById(this._bpmnVisualizationContainerId);
        const bpmnOtherLibContainerElt = document.getElementById(this._otherLibContainerId);

        if (this._state.isUseBpmnVisualization) {
            bpmnVisualizationContainerElt.classList.remove('hidden');
            bpmnOtherLibContainerElt.classList.add('hidden');
        } else {
            bpmnOtherLibContainerElt.classList.remove('hidden');
            bpmnVisualizationContainerElt.classList.add('hidden');
        }
    }
}

function log(header, msg) {
    console.info(`[${header}] ${msg}`);
}

function logMain(msg) {
    log('main', msg)
}
