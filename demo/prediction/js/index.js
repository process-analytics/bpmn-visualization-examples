function buildUseCase(type) {
    switch (type) {
        case 'late':
            return new PredicatedLateUseCase('Predicted Late');
        case 'onTime':
        default:
            return new PredictedOnTimeUseCase('Predicted on Time');
    }
}

function changeUseCase() {
    state.useCase = buildUseCase(state.dataType);
    state.useCase.display(state.dataType);
}

const state = {
    useCase: undefined,
    dataType: 'late'
}

// Update state of radio buttons
document.getElementById(`btn-${state.dataType}`).checked = true;

document.addEventListener('DOMContentLoaded', function () {
    // Waiting for the displayed page before to load diagram & display data
    changeUseCase();
})

document.getElementById('choose-use-case-panel').onchange = () => {
    state.dataType = document.querySelector("input[type='radio'][name='use-case-type']:checked").value;
    changeUseCase();
}
