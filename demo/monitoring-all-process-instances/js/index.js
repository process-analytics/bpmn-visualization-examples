// Initialize UseCases
const timeUseCase = new MonitoringUseCase('time', getHardwareRetailerDiagram, new TimeExecutionData());
const frequencyUseCase = new MonitoringUseCase('frequency', getHardwareRetailerDiagram, new FrequencyExecutionData());

/**
 * @param {string} useCaseType
 * @returns {MonitoringUseCase}
 */
const detectActualUseCase = useCaseType => useCaseType === 'frequency' ? frequencyUseCase : timeUseCase

// Initialize the state and the radio buttons
const parameters = new URLSearchParams(window.location.search);
const useCaseType = ['frequency', 'time'].includes(parameters.get('useCase')) ? parameters.get('useCase') : 'time';
const state = {
    useCase: detectActualUseCase(useCaseType),
    dataType: ['both', 'overlays', 'paths'].includes(parameters.get('dataType')) ? parameters.get('dataType') : 'both'
}
document.getElementById(`btn-${useCaseType}`).checked = true;
document.getElementById(`btn-${state.dataType}`).checked = true;

document.addEventListener('DOMContentLoaded', function () {
    // Waiting for the displayed page before to load diagram & display data
    state.useCase.display(state.dataType);
})

document.getElementById('choose-use-case-panel').onchange = () => {
    const useCaseType = document.querySelector("input[type='radio'][name='use-case-type']:checked").value;
    state.useCase = detectActualUseCase(useCaseType);

    state.useCase.display(state.dataType);
}

document.getElementById('choose-data-panel').onchange = () => {
    state.dataType = document.querySelector("input[type='radio'][name='data-type']:checked").value;

    state.useCase.displayData(state.dataType);
}
