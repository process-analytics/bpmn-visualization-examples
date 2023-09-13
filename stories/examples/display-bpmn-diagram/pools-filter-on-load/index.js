const bpmnVisualization = new bpmnvisu.BpmnVisualization({container: 'bpmn-container'})

function loadDiagram(filteredPools) {
  bpmnVisualization.load(getPoolsFilterDiagram(), {
    fit: {type: 'Center', margin: 20},
    modelFilter: {pools: filteredPools}
  });
}

document.getElementById('btn-reload').onclick = () => {
  const filteredPools = [];
  document.getElementsByName("pools-filter").forEach((checkbox) => {
    if (checkbox.checked) {
      filteredPools.push({id: checkbox.value})
    }
  });
  loadDiagram(filteredPools);
}

loadDiagram([]);

