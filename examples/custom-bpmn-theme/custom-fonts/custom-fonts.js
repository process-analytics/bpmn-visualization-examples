const bpmn = getCustomFontsBpmnDiagram();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// default colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-default' });
bpmnVisualization.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom default font
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const originalDefaultFontFamily = bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY;
const originalDefaultFontSize = bpmnvisu.StyleDefault.DEFAULT_FONT_SIZE;
bpmnvisu.StyleDefault.DEFAULT_FONT_SIZE = '12';
bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY = 'Courier New,serif';

const originalConfigureCommonDefaultStyle = bpmnvisu.StyleConfigurator.prototype.configureCommonDefaultStyle;
bpmnvisu.StyleConfigurator.prototype.configureCommonDefaultStyle = function (style) {
    originalConfigureCommonDefaultStyle(style);
    style[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_ITALIC;
}

const bpmnVisualizationCustomDefaultFont = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-custom-default-font' });
bpmnVisualizationCustomDefaultFont.load(bpmn);

bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY = originalDefaultFontFamily;
bpmnvisu.StyleDefault.DEFAULT_FONT_SIZE = originalDefaultFontSize;
// restore StyleConfigurator defaults
bpmnvisu.StyleConfigurator.prototype.configureCommonDefaultStyle = originalConfigureCommonDefaultStyle;


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
        userTaskStyle[mxConstants.STYLE_FONTFAMILY] = 'Courier New,serif';
        userTaskStyle[mxConstants.STYLE_FONTSIZE] = '14';
        userTaskStyle[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_BOLD + mxConstants.FONT_ITALIC;

        const poolStyle = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.POOL];
        poolStyle[mxConstants.STYLE_FONTFAMILY] = 'MS Gothic,Courier New,serif';
        poolStyle[mxConstants.STYLE_FONTSIZE] = '20';
        poolStyle[mxConstants.STYLE_FONTSTYLE] = mxConstants.FONT_BOLD;
    }

}

const bpmnVisualizationCustomFonts = new BpmnVisualizationCustomFonts('bpmn-container-custom-fonts');
bpmnVisualizationCustomFonts.load(bpmn);

