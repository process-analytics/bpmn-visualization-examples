const inputProjectName = document.getElementById('project-name-input');
inputProjectName.oninput = function (event) {
    state.projectName = event.target.value;

    state.useCase.updateCellsLabel(state.projectName);
};

const selectThemeYear = document.getElementById('theme-year-select');
selectThemeYear.oninput = function (event) {
    state.themeYear = event.target.value;

    state.useCase = buildUseCase(state.useCaseType, state.themeYear, state.projectName);
    state.useCase.display();
};

document.getElementById('choose-use-case-panel').onchange = () => {
    state.useCaseType = document.querySelector("input[type='radio'][name='use-case-type']:checked").value;

    state.useCase = buildUseCase(state.useCaseType, state.themeYear, state.projectName);
    state.useCase.display();
}

// Initialize state
const state = {
    projectName: inputProjectName.value,
    useCaseType: 'dark',
    themeYear: selectThemeYear.value,
    useCase: undefined
}

// Update state of radio buttons
document.getElementById(`btn-${state.useCaseType}`).checked = true;


document.addEventListener('DOMContentLoaded', function () {
    // Waiting for the displayed page before to load diagram & display data
    state.useCase = buildUseCase(state.useCaseType, state.themeYear, state.projectName);
    state.useCase.display();
})

function buildUseCase(type, year, projectName) {
    switch (type) {
        case 'light':
            return new LightUseCase( projectName, year);
        case 'dark':
            return new DarkUseCase( projectName, year);
        case 'default':
        default:
            return new HacktoberfestUseCase('default',  projectName);
    }
}


