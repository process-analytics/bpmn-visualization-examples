console.info('je suis la')

const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container', navigation: { enabled: true } });
bpmnVisualization.load(getNavigationBpmnDiagram());

document.getElementById('btn-reset').onclick = function() {
  bpmnVisualization.fit({type: bpmnvisu.FitType.None});
};
