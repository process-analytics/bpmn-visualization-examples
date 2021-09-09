document.getElementById('btn-time').checked = true;
document.getElementById('btn-both').checked = true;

// Initialize BpmnVisualization for Time Data
const timeUseCase = new UseCase('time', new TimeExecutionData());
document.addEventListener('DOMContentLoaded', function () {
    const dataType = document.querySelector("input[type='radio'][name='data-type']:checked").value;
    timeUseCase.display(dataType);
})

let frequencyUseCase;
let frequencyUseCaseIsAlreadyLoad = false;

document.getElementById('choose-use-case-panel').onclick = () => {
    const useCaseType = document.querySelector("input[type='radio'][name='use-case-type']:checked").value;
    const dataType = document.querySelector("input[type='radio'][name='data-type']:checked").value;

    const useCase = useCaseType === 'frequency' ? getFrequencyUseCase() : timeUseCase;
    useCase.display(dataType);
}

document.getElementById('choose-data-panel').onclick = () => {
    const useCaseType = document.querySelector("input[type='radio'][name='use-case-type']:checked").value;
    const dataType = document.querySelector("input[type='radio'][name='data-type']:checked").value;

    const useCase = useCaseType === 'frequency' ? frequencyUseCase : timeUseCase;
    useCase.displayData(dataType);
}

function getFrequencyUseCase() {
    if (!frequencyUseCaseIsAlreadyLoad) {
        // Initialize use case for Frequency Data, if it's not already done
        frequencyUseCase = new UseCase('frequency', new FrequencyExecutionData());
        frequencyUseCaseIsAlreadyLoad = true;
    }
    return frequencyUseCase;
}