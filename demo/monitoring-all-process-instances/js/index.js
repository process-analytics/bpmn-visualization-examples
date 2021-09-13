// Initialize UseCases
const timeUseCase = new UseCase('time', new TimeExecutionData());
const frequencyUseCase = new UseCase('frequency', new FrequencyExecutionData());

// Initialize state of radio buttons
const state = {
    useCase : timeUseCase,
    dataType : 'both'
}
document.getElementById('btn-time').checked = true;
document.getElementById(`btn-${state.dataType}`).checked = true;

document.addEventListener('DOMContentLoaded', function () {
    // Waiting for the displayed page before to load diagram & display data
    state.useCase.display(state.dataType);
})

document.getElementById('choose-use-case-panel').onchange = () => {
    const useCaseType = document.querySelector("input[type='radio'][name='use-case-type']:checked").value;
    state.useCase = useCaseType === 'frequency' ? frequencyUseCase : timeUseCase;

    state.useCase.display(state.dataType);
}

document.getElementById('choose-data-panel').onchange = () => {
    state.dataType = document.querySelector("input[type='radio'][name='data-type']:checked").value;

    state.useCase.displayData(state.dataType);
}
