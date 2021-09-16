const inputProjectName = document.getElementById('project-name-input');
inputProjectName.oninput = function (event) {
    state.projectName = event.target.value;

    getUseCase().updateCellsLabel(state.projectName);
};

const selectThemeYear = document.getElementById('theme-year-select');
selectThemeYear.oninput = function (event) {
    state.themeYear = event.target.value;

    getUseCase().display();
};

// Initialize state
const state = {
    projectName: inputProjectName.value,
    useCaseType: 'dark',
    themeYear: selectThemeYear.value
}

// Update state of radio buttons
document.getElementById(`btn-${state.useCaseType}`).checked = true;

// Initialize UseCases
const useCases = {
    light: new Map(),
    dark: new Map(),
    default: new HacktoberfestUseCase('default', state.projectName)
};
Array.from(themes.keys()).forEach(year => {
    useCases.light.set(year, new LightUseCase(state.projectName, year));
    useCases.dark.set(year, new DarkUseCase(state.projectName, year));
})


document.addEventListener('DOMContentLoaded', function () {
    // Waiting for the displayed page before to load diagram & display data
    getUseCase().display();
})


function getUseCase() {
    switch (state.useCaseType) {
        case 'light':
            return useCases.light.get(state.themeYear);
        case 'dark':
            return useCases.dark.get(state.themeYear);
        case 'default':
        default:
            return useCases.default;
    }
}

document.getElementById('choose-use-case-panel').onchange = () => {
    state.useCaseType = document.querySelector("input[type='radio'][name='use-case-type']:checked").value;

    const useCase = getUseCase();
    useCase.display();
    useCase.updateCellsLabel(state.projectName);
}
