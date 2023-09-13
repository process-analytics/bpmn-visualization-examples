function getSelectedFitType() {
    const radios = document.getElementsByName('fitType');

    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

function loadDiagram(bpmnVisualization, diagramName) {
    const fitType = getSelectedFitType();
    const diagram = diagramName?.includes('vertical') ? getVerticalBpmnDiagram() : getHorizontalBpmnDiagram();

    // `type` is optional
    bpmnVisualization.load(diagram, { fit: {type: fitType} });
}

const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container' })

// 'BPMN Diagram' dropdown list
const dropdownDiagramChoiceElt = document.querySelector('#dropdown-diagram-choice');
dropdownDiagramChoiceElt.querySelectorAll('li a')
    .forEach(function (anchor)  {
        anchor.onclick = function (e) {
            e.preventDefault();
            // get li value
            const diagramName = anchor.parentElement.innerText;
            dropdownDiagramChoiceElt.classList.add('hidden');
            loadDiagram(bpmnVisualization, diagramName)

            return false;
        };
    });
document.getElementById('toggle-dropdown-diagram-choice').onclick = function (){
    dropdownDiagramChoiceElt.classList.remove('hidden');
}
