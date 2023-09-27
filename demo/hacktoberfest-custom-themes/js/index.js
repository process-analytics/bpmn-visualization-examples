function buildUseCase(type, year, projectName) {
    switch (type) {
        case 'light':
            return new ThemeUseCase( projectName, { year, mode: type }, `Light Hacktoberfest ${year} Theme`);
        case 'dark':
            return new ThemeUseCase( projectName, { year, mode: type }, `Dark Hacktoberfest ${year} Theme`);
        case 'default':
        default:
            return new HacktoberfestUseCase(  projectName, `Default Theme`);
    }
}

function changeUseCase() {
    state.useCase = buildUseCase(state.useCaseType, state.themeYear, state.projectName);
    state.useCase.display();
}

const inputProjectName = document.getElementById('project-name-input');
inputProjectName.oninput = function (event) {
    state.projectName = event.target.value;

    state.useCase.updateCellsLabel(state.projectName);
};

const selectThemeYear = document.getElementById('theme-year-select');
selectThemeYear.oninput = function (event) {
    state.themeYear = event.target.value;
    changeUseCase();
};

document.getElementById('choose-use-case-panel').onchange = () => {
    state.useCaseType = document.querySelector("input[type='radio'][name='use-case-type']:checked").value;
    changeUseCase();
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
    changeUseCase();
})




