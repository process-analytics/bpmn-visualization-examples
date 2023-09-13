const bpmn = getGettingStartedBpmnDiagram();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// default colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-default' });
bpmnVisualization.load(bpmn);
bpmnVisualization.bpmnElementsRegistry.addOverlays('Activity_1potg3p', { position: 'bottom-center', label: 'OK 👌' });
bpmnVisualization.bpmnElementsRegistry.addOverlays('Flow_1wkfbb0', { position: 'middle', label: '763' });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom default font color
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bpmnvisu.StyleDefault.DEFAULT_OVERLAY_FONT_COLOR = 'LimeGreen';
bpmnvisu.StyleDefault.DEFAULT_OVERLAY_FONT_SIZE = 22;
const bpmnVisualizationOverlayCustomDefaultFont = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-custom-default-font' });
bpmnVisualizationOverlayCustomDefaultFont.load(bpmn);
bpmnVisualizationOverlayCustomDefaultFont.bpmnElementsRegistry.addOverlays('Activity_1potg3p', { position: 'bottom-center', label: 'OK 👌' });
bpmnVisualizationOverlayCustomDefaultFont.bpmnElementsRegistry.addOverlays('Flow_1wkfbb0', { position: 'middle', label: '763' });
resetStyleDefault();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom default fill and stroke colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bpmnvisu.StyleDefault.DEFAULT_OVERLAY_FILL_COLOR = 'LightBlue';
const bpmnVisualizationOverlayCustomDefaultFill = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-custom-default-fill' });
bpmnVisualizationOverlayCustomDefaultFill.load(bpmn);
bpmnVisualizationOverlayCustomDefaultFill.bpmnElementsRegistry.addOverlays('Activity_1potg3p', { position: 'bottom-center', label: 'OK 👌' });
bpmnVisualizationOverlayCustomDefaultFill.bpmnElementsRegistry.addOverlays('Flow_1wkfbb0', { position: 'middle', label: '763' });
resetStyleDefault();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom fill and stroke colors depending on BPMN elements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bpmnvisu.StyleDefault.DEFAULT_OVERLAY_STROKE_COLOR = 'Red';
const bpmnVisualizationOverlayCustomDefaultStroke = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-custom-default-stroke' });
bpmnVisualizationOverlayCustomDefaultStroke.load(bpmn);
bpmnVisualizationOverlayCustomDefaultStroke.bpmnElementsRegistry.addOverlays('Activity_1potg3p', { position: 'bottom-center', label: 'OK 👌' });
bpmnVisualizationOverlayCustomDefaultStroke.bpmnElementsRegistry.addOverlays('Flow_1wkfbb0', { position: 'middle', label: '763' });
