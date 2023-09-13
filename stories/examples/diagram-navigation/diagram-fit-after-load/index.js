let fitType = bpmnvisu.FitType.None;
let fitMargin = 10;
const fitMarginValueElt = document.getElementById('fit-margin-value');
fitMarginValueElt.innerHTML = `<code>${fitMargin}</code>`;

const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container' });
loadDiagram();

function loadDiagram(diagramName) {
  fitType = undefined;
  if (diagramName?.includes('vertical')) {
    bpmnVisualization.load(getVerticalBpmnDiagram());
  } else {
    bpmnVisualization.load(getHorizontalBpmnDiagram());
  }
}

document.getElementById('btn-fit-none').onclick = function() {
  performFit(bpmnvisu.FitType.None);
};
document.getElementById('btn-fit-horizontally').onclick = function() {
  performFit(bpmnvisu.FitType.Horizontal);
};
document.getElementById('btn-fit-vertically').onclick = function() {
  performFit(bpmnvisu.FitType.Vertical);
};
document.getElementById('btn-fit-all').onclick = function() {
  performFit(bpmnvisu.FitType.HorizontalVertical);
};
document.getElementById('btn-fit-center').onclick = function() {
  performFit(bpmnvisu.FitType.Center);
};


function performFit(type) {
  if (type !== undefined) {
    fitType = type;
  }

  // `type` and `margin` are optional. Moreover, `margin` is only considered when FitType is not None.
  bpmnVisualization.navigation.fit({type: fitType, margin: fitMargin});
}

// 'Fit Margin' dropdown list
const fitMarginValues = [0, 5, 10, 20, 50];
const dropdownFitMarginElt = document.querySelector('#dropdown-fit-margin');
dropdownFitMarginElt.innerHTML = fitMarginValues.map(fitMargin => {
  return `<li><a href="#" class="btn btn-link">${fitMargin}</a></li>`
}).join('\n');

dropdownFitMarginElt.querySelectorAll('li a')
.forEach(function (anchor)  {
  anchor.onclick = function (e) {
    e.preventDefault();
    // get li value
    fitMargin = anchor.parentElement.innerText;
    fitMarginValueElt.innerHTML = `<code>${fitMargin}</code>`;
    dropdownFitMarginElt.classList.add('hidden');
    performFit();

    return false;
  };
});
document.getElementById('toggle-dropdown-fit-margin').onclick = function (){
  dropdownFitMarginElt.classList.remove('hidden');
}

// 'BPMN Diagram' dropdown list
const dropdownDiagramChoiceElt = document.querySelector('#dropdown-diagram-choice');
dropdownDiagramChoiceElt.querySelectorAll('li a')
.forEach(function (anchor)  {
  anchor.onclick = function (e) {
    e.preventDefault();
    // get li value
    const diagramName = anchor.parentElement.innerText;
    dropdownDiagramChoiceElt.classList.add('hidden');
    loadDiagram(diagramName)

    return false;
  };
});
document.getElementById('toggle-dropdown-diagram-choice').onclick = function (){
  dropdownDiagramChoiceElt.classList.remove('hidden');
}
