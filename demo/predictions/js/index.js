// Initialize UseCases
const predictedLateUseCase = new PredicatedLateUseCase('late');
predictedLateUseCase.displayVersionInfoInFooter(); // call only need on one use-case as the bpmn-visualization info are the same in all use-cases
const onTimeUseCase = new PredictedOnTimeUseCase('onTime');

const state = {
    useCase: predictedLateUseCase,
}

// Update state of radio buttons
document.getElementById('btn-late').checked = true;

document.addEventListener('DOMContentLoaded', function () {
    // Waiting for the displayed page before to load diagram & display data
    state.useCase.display(state.dataType);
})

document.getElementById('choose-use-case-panel').onchange = () => {
    const useCaseType = document.querySelector("input[type='radio'][name='use-case-type']:checked").value;
    state.useCase = useCaseType === 'onTime' ? onTimeUseCase : predictedLateUseCase;

    state.useCase.display(state.dataType);
}
