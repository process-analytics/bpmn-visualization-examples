const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container', navigation: { enabled: true } });
bpmnVisualization.load(getNavigationBpmnDiagram());

document.getElementById('btn-reset').onclick = function() {
  bpmnVisualization.fit({type: bpmnvisu.FitType.None});
};

function resetZoomLevel() {
  bpmnVisualization.fit({type: bpmnvisu.FitType.None});
}

// function loadInNewInstance() {
//   const instance = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container', navigation: { enabled: true } });
// instance.load(getNavigationBpmnDiagram());
// return instance;
// }

let displayScrollBars = false;
document.getElementById('btn-toggle-scrollbars').onclick = function() {
  displayScrollBars = !displayScrollBars;

  document.getElementById('bpmn-container').style.overflow = displayScrollBars ? 'auto' : 'hidden';
  // If default (true) value is used, the regular panning is not used, so
  // if previous panning occured this can prevent to see the diagram
  // bpmnVisualization.graph.useScrollbarsForPanning = false;
  
  // resetZoomLevel();

  // ensure that all diagram positions are recomputed
  bpmnVisualization.load(getNavigationBpmnDiagram());


  //bpmnVisualization = loadInNewInstance();
};


