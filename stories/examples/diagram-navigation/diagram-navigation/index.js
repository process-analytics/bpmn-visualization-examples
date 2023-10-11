const bpmnContainer = document.getElementById('bpmn-container');
const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: bpmnContainer, navigation: { enabled: true } });
bpmnVisualization.load(getNavigationBpmnDiagram());

let displayScrollBars = false;
document.getElementById('btn-reset').onclick = function () {
  bpmnVisualization.navigation.fit({ type: bpmnvisu.FitType.None });

  // reset scrollbars position
  displayScrollBars && bpmnContainer.scrollTo(0, 0);
};

document.getElementById('btn-toggle-scrollbars').onclick = function () {
  displayScrollBars = !displayScrollBars;

  bpmnContainer.style.overflow = displayScrollBars ? 'auto' : 'hidden';

  // ensure that all diagram positions are recomputed (mainly for no scrollbars)
  bpmnVisualization.load(getNavigationBpmnDiagram());
};


