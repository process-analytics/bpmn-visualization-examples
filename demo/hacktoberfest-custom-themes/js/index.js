const inputProjectName = document.getElementById('input-project-name');
inputProjectName.oninput = function (event) {
    state.useCase.updateCellsLabel(event.target.value);
};
const projectName = inputProjectName.value;

// Initialize UseCases

const lightUseCase = new LightUseCase(projectName);
const darkUseCase = new DarkUseCase(projectName);
const defaultUseCase = new HacktoberfestUseCase('default', projectName);

// Initialize state of radio buttons
const state = {
    useCase: darkUseCase,
}
document.getElementById('btn-dark').checked = true;

document.addEventListener('DOMContentLoaded', function () {
    // Waiting for the displayed page before to load diagram & display data
    state.useCase.display();
})


function getUseCase(useCaseType) {
    switch (useCaseType) {
        case 'light':
            return lightUseCase;
        case 'dark':
            return darkUseCase;
        case 'default':
        default:
            return defaultUseCase;
    }
}

document.getElementById('choose-use-case-panel').onchange = () => {
    const useCaseType = document.querySelector("input[type='radio'][name='use-case-type']:checked").value;
    state.useCase = getUseCase(useCaseType);

    state.useCase.display();
}
