const popoverForeignObjectClass = 'chartreuse';

const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container' });
bpmnVisualization.load(getHorizontalBpmnDiagram(), {fit: {type: 'Center', margin: 50}});

const searchElt = document.getElementById('search-id');

// Handle the availability to attach popover based on current element state
// This example allows only one popover at a time
document.getElementById('search-id').oninput = function (e) {
  const htmlElement = getHtmlElementFromDiagram(e.target.value);
  if (!htmlElement) {
    return;
  }
  if (htmlElement.classList.contains(popoverForeignObjectClass)) {
    disablePopoverAttachment();
  } else {
    enablePopoverAttachment();
  }
}

function getHtmlElementFromDiagram(id) {
  const bpmnElements = bpmnVisualization.bpmnElementsRegistry.getElementsByIds(searchElt.value);
  if (bpmnElements?.length > 0) {
    return bpmnElements[0].htmlElement;
  }
  return undefined;
}

// Attach popover for an element found by id from search input
document.getElementById('attach-popover').onclick = function () {
  const shapeElt = getHtmlElementFromDiagram(searchElt.value);
  if (!shapeElt) {
    return;
  }
  shapeElt.classList.add(popoverForeignObjectClass);
  const foreignObjectWrapperElt = createForeignObjectContainer(shapeElt);
  const popoverDivElt = createPopoverDiv();
  foreignObjectWrapperElt.prepend(popoverDivElt);
  shapeElt.append(foreignObjectWrapperElt);
  setPopoverStyle(popoverDivElt);
  foreignObjectWrapperElt.setAttribute('style', 'overflow: visible;');
  disablePopoverAttachment();
}

// Detach popover for an element found by id from search input if it exists
document.getElementById('detach-popover').onclick = function () {
  const shapeElt = getHtmlElementFromDiagram(searchElt.value);
  if (!shapeElt) {
    return;
  }
  if (shapeElt.classList.contains(popoverForeignObjectClass)) {
    shapeElt.classList.remove(popoverForeignObjectClass);
    shapeElt.removeChild(shapeElt.lastChild);
    enablePopoverAttachment();
  }
}

function createPopoverDiv() {
  const popoverDivElt = document.createElement('div');
  const popoverContent = document.getElementById('popover-content');
  popoverDivElt.innerHTML = popoverContent.value;
  return popoverDivElt;
}

function createForeignObjectContainer(shapeElt) {
  const rectElt = shapeElt.getElementsByTagName('rect')[0];
  const foreignObjectElt = document.createElementNS('http://www.w3.org/2000/svg', "foreignObject");
  foreignObjectElt.setAttribute('width', '100%');
  foreignObjectElt.setAttribute('height', '100%');
  foreignObjectElt.setAttribute('x', rectElt.getAttribute('x'));
  foreignObjectElt.setAttribute('y', rectElt.getAttribute('y'));
  foreignObjectElt.setAttribute('width', rectElt.getAttribute('width'));
  foreignObjectElt.setAttribute('height', rectElt.getAttribute('height'));
  foreignObjectElt.classList.add('bpmn-popover-foreign');
  return foreignObjectElt;
}

function setPopoverStyle(popoverContainer) {
  popoverContainer.classList.add('hidden');
  popoverContainer.classList.add('bpmn-popover');
  popoverContainer.setAttribute('style', 'position: absolute;');
  const boundingRect = popoverContainer.getBoundingClientRect();
  const popoverHeight = boundingRect.height;
  // speech bubble indicator height is 21
  const style = `position: absolute; top: -${popoverHeight + 21}px`;
  popoverContainer.setAttribute('style', style);
  popoverContainer.classList.remove('hidden');
}

function disablePopoverAttachment() {
  setButtonState('attach-popover', true);
  setButtonState('detach-popover', false);
}

function enablePopoverAttachment() {
  setButtonState('attach-popover', false);
  setButtonState('detach-popover', true);
}
