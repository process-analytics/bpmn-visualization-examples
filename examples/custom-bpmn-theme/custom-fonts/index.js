const bpmn = getCustomFontsBpmnDiagram();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// default colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-default' });
bpmnVisualization.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom default font
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
bpmnvisu.StyleDefault.DEFAULT_FONT_SIZE = '12';
bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY = 'Courier New,serif';

class BpmnVisualizationCustomDefaultFont extends bpmnvisu.BpmnVisualization {

    constructor(containerId) {
        super({ container: containerId });
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        const defaultVertexStyle = styleSheet.getDefaultVertexStyle();
        defaultVertexStyle[StyleIdentifiers.STYLE_FONTSTYLE] = FontStyle.FONT_ITALIC;

        const defaultEdgeStyle = styleSheet.getDefaultEdgeStyle();
        defaultEdgeStyle[StyleIdentifiers.STYLE_FONTSTYLE] = FontStyle.FONT_ITALIC;
    }

}

const bpmnVisualizationCustomDefaultFont = new BpmnVisualizationCustomDefaultFont('bpmn-container-custom-default-font');
bpmnVisualizationCustomDefaultFont.load(bpmn);
resetStyleDefault();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom font depending on BPMN elements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class BpmnVisualizationCustomFonts extends bpmnvisu.BpmnVisualization {

    constructor(containerId) {
        super({ container: containerId });
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        const userTaskStyle = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.TASK_USER];
        userTaskStyle[StyleIdentifiers.STYLE_FONTFAMILY] = 'Courier New,serif';
        userTaskStyle[StyleIdentifiers.STYLE_FONTSIZE] = '14';
        userTaskStyle[StyleIdentifiers.STYLE_FONTSTYLE] = FontStyle.FONT_BOLD + FontStyle.FONT_ITALIC;

        const poolStyle = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.POOL];
        poolStyle[StyleIdentifiers.STYLE_FONTFAMILY] = 'MS Gothic,Courier New,serif';
        poolStyle[StyleIdentifiers.STYLE_FONTSIZE] = '20';
        poolStyle[StyleIdentifiers.STYLE_FONTSTYLE] = FontStyle.FONT_BOLD;
    }

}

const bpmnVisualizationCustomFonts = new BpmnVisualizationCustomFonts('bpmn-container-custom-fonts');
bpmnVisualizationCustomFonts.load(bpmn);
