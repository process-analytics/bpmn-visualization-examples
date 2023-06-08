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

const originalConfigureCommonDefaultStyle = bpmnvisu.StyleConfigurator.configureCommonDefaultStyle;
console.warn("### define code for 'custom default fill and stroke colors'")
bpmnvisu.StyleConfigurator.configureCommonDefaultStyle = function (style) {
    console.warn('@@@Custom StyleConfigurator')
    originalConfigureCommonDefaultStyle(style);
    style[StyleIdentifiers.STYLE_FONTSTYLE] = FontStyle.FONT_ITALIC;
}

const bpmnVisualizationCustomDefaultFont = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-custom-default-font' });
bpmnVisualizationCustomDefaultFont.load(bpmn);

bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY = originalDefaultFontFamily;
bpmnvisu.StyleDefault.DEFAULT_FONT_SIZE = originalDefaultFontSize;
// restore StyleConfigurator defaults
bpmnvisu.StyleConfigurator.configureCommonDefaultStyle = originalConfigureCommonDefaultStyle;


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

