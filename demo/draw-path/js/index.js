// Initialize UseCase
const useCase = new PathUseCase(getHardwareRetailerDiagram);

document.addEventListener('DOMContentLoaded', function () {
    // Waiting for the displayed page before to load diagram & display data
    useCase.display();
})

