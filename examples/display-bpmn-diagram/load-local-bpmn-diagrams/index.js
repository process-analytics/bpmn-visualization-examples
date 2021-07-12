document.getElementById('btn-open-file').addEventListener('change', handleFileSelect, false);

const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container' });

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  const file = evt.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    bpmnVisualization.load(reader.result);
    document.getElementById('loading-info').classList.remove('hidden');
    // TODO we probably don't need it, just select span child
    document.getElementById('loaded-file-name').innerHTML = `<code>${file.name}</code>`;
  };
  reader.readAsText(file);
}
