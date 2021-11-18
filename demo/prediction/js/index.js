console.info('@@PREDICTION DEMO!!!')

// Initialize UseCases
const timeUseCase = new PredictionUseCase('time');
const frequencyUseCase = new PredictionUseCase('frequency');


// const inputProjectName = document.getElementById('project-name-input');
// inputProjectName.oninput = function (event) {
//     state.projectName = event.target.value;
//
//     getUseCase().updateCellsLabel(state.projectName);
// };

// const selectThemeYear = document.getElementById('theme-year-select');
// selectThemeYear.oninput = function (event) {
//     state.themeYear = event.target.value;
//
//     getUseCase().display();
// };

// Initialize state
// const state = {
//     // projectName: inputProjectName.value,
//     useCaseType: 'time',
//     // themeYear: selectThemeYear.value
// }
const state = {
    useCase: timeUseCase,
    dataType: 'both'
}

// Update state of radio buttons
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
