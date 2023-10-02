function buildUseCase(type) {
    switch (type) {
        case 'time':
            return  new MonitoringUseCase(  getHardwareRetailerDiagram, new TimeExecutionData(), "Average run time");
        case 'frequency':
        default:
            return new MonitoringUseCase(  getHardwareRetailerDiagram, new FrequencyExecutionData(), "Number of execution");
    }
}

function changeUseCase() {
    state.useCase = buildUseCase(state.useCaseType);
    state.useCase.display(state.dataType);
}

// Initialize the state and the radio buttons
const parameters = new URLSearchParams(window.location.search);
const state = {
    useCase: undefined,
    useCaseType: ['frequency', 'time'].includes(parameters.get('useCase')) ? parameters.get('useCase') : 'time',
    dataType: ['both', 'overlays', 'paths'].includes(parameters.get('dataType')) ? parameters.get('dataType') : 'both'
}
document.getElementById(`btn-${state.useCaseType}`).checked = true;
document.getElementById(`btn-${state.dataType}`).checked = true;

document.addEventListener('DOMContentLoaded', function () {
    // Waiting for the displayed page before to load diagram & display data
    changeUseCase();
})

document.getElementById('choose-use-case-panel').onchange = () => {
    state.useCaseType = document.querySelector("input[type='radio'][name='use-case-type']:checked").value;
    changeUseCase();
}

document.getElementById('choose-data-panel').onchange = () => {
    state.dataType = document.querySelector("input[type='radio'][name='data-type']:checked").value;
    changeUseCase();
}
