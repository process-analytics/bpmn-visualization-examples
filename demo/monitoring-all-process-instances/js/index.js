document.getElementById('btn-time').checked = true;
document.getElementById('btn-both').checked = true;

// Initialize UseCases
const timeUseCase = new UseCase('time', new TimeExecutionData());
const frequencyUseCase = new UseCase('frequency', new FrequencyExecutionData());

document.addEventListener('DOMContentLoaded', function () {
    // Waiting for the displayed page before to load diagram & display data
    const dataType = document.querySelector("input[type='radio'][name='data-type']:checked").value;
    timeUseCase.display(dataType);
})

updateDisplayedPanel = () => {
    const useCaseType = document.querySelector("input[type='radio'][name='use-case-type']:checked").value;
    const dataType = document.querySelector("input[type='radio'][name='data-type']:checked").value;

    const useCase = useCaseType === 'frequency' ? frequencyUseCase : timeUseCase;
    useCase.display(dataType);
}

// FIXME the function is called twice on click
document.getElementById('choose-use-case-panel').onclick = updateDisplayedPanel;
document.getElementById('choose-data-panel').onclick = updateDisplayedPanel;
