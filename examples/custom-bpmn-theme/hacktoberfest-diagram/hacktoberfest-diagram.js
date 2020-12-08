let inputProjectName = document.getElementById('input-project-name');
let bpmn = getHacktoberfestBpmnDiagram(inputProjectName.value);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// default colors
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const bpmnVisualization = new bpmnvisu.BpmnVisualization(window.document.getElementById('bpmn-container-default'));
bpmnVisualization.load(bpmn);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom font + custom fill and stroke colors depending on BPMN elements for Hacktoberfest Light theme
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const blueSuperLight = '#F1F7FA';
const blueLight = '#93C2DB';
const blueMedium = '#183d5d';
const blueDark = '#072540';

const pinkSuperLight = '#ffe9fa';
const pinkLight = '#FF8AE2';
const pinkDark = '#9C4668';

bpmnvisu.StyleDefault.DEFAULT_STROKE_COLOR = blueDark;
bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR = blueMedium;
bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY = 'Inter, Helvetica, sans-serif';

class BpmnVisualizationHacktoberfestLightTheme extends bpmnvisu.BpmnVisualization {

    constructor(containerId) {
        super(window.document.getElementById(containerId));
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        // START EVENT
        let style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_START];
        style[mxConstants.STYLE_STROKECOLOR] = pinkLight;

        // END EVENT
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_END];
        style[mxConstants.STYLE_STROKECOLOR] = pinkDark;
        style[mxConstants.STYLE_FILLCOLOR] = pinkLight;
        style[mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_WEST;
        style[mxConstants.STYLE_GRADIENTCOLOR] = 'White';

        // USER TASK
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.TASK_USER];
        style[mxConstants.STYLE_FILLCOLOR] = blueSuperLight;

        // CALL ACTIVITY
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.CALL_ACTIVITY];
        style[mxConstants.STYLE_FILLCOLOR] = blueMedium;
        style[mxConstants.STYLE_FONTCOLOR] = blueLight;

        // POOL
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.POOL];
        style[mxConstants.STYLE_FILLCOLOR] = blueSuperLight;
        style[mxConstants.STYLE_FONTSIZE] = 16;
    }

}

class HacktoberfestLightThemeIconPainter extends bpmnvisu.IconPainter {
    // START TIMER
    paintClockIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        c.setStrokeColor(pinkDark);
        super.paintClockIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };

    // EXCLUSIVE GATEWAY
    paintXCrossIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        icon.strokeColor = blueLight;
        c.setStrokeColor(blueMedium);
        super.paintXCrossIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };

    // USER TASK
    paintPersonIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        icon.strokeColor = blueMedium;
        super.paintPersonIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };

    // CALL ACTIVITY
    paintExpandIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        c.setStrokeColor(blueSuperLight);
        super.paintExpandIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };
}

bpmnvisu.IconPainterProvider.set(new HacktoberfestLightThemeIconPainter());


const bpmnVisualizationHacktoberfestLightTheme = new BpmnVisualizationHacktoberfestLightTheme('bpmn-container-hacktoberfest-light-theme');
bpmnVisualizationHacktoberfestLightTheme.load(bpmn);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// custom font + custom fill and stroke colors depending on BPMN elements for Hacktoberfest Dark theme
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

bpmnvisu.StyleDefault.DEFAULT_FILL_COLOR = blueDark;
bpmnvisu.StyleDefault.DEFAULT_STROKE_COLOR = blueLight;
bpmnvisu.StyleDefault.DEFAULT_FONT_COLOR = blueSuperLight;
bpmnvisu.StyleDefault.DEFAULT_FONT_FAMILY = 'Inter, Helvetica, sans-serif';

class BpmnVisualizationHacktoberfestDarkTheme extends bpmnvisu.BpmnVisualization {

    constructor(containerId) {
        super(window.document.getElementById(containerId));
        this.configureStyle();
    }

    configureStyle() {
        const styleSheet = this.graph.getStylesheet(); // mxStylesheet

        // START EVENT
        let style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_START];
        style[mxConstants.STYLE_STROKECOLOR] = pinkLight;
        style[mxConstants.STYLE_FILLCOLOR] = pinkSuperLight;

        // END EVENT
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.EVENT_END];
        style[mxConstants.STYLE_STROKECOLOR] = pinkDark;
        style[mxConstants.STYLE_FILLCOLOR] = pinkSuperLight;

        // EXCLUSIVE GATEWAY
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.GATEWAY_EXCLUSIVE];
        style[mxConstants.STYLE_FILLCOLOR] = blueMedium;

        // USER TASK
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.TASK_USER];
        style[mxConstants.STYLE_FILLCOLOR] = '#355571';

        // CALL ACTIVITY
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.CALL_ACTIVITY];
        style[mxConstants.STYLE_FILLCOLOR] = blueSuperLight;
        style[mxConstants.STYLE_FONTCOLOR] = blueMedium;

        // POOL
        style = styleSheet.styles[bpmnvisu.ShapeBpmnElementKind.POOL];
        style[mxConstants.STYLE_SWIMLANE_FILLCOLOR] = blueDark;
        style[mxConstants.STYLE_FILLCOLOR] = blueMedium;
        style[mxConstants.STYLE_FONTSIZE] = 16;
    }

}

class HacktoberfestDarkThemeIconPainter extends bpmnvisu.IconPainter {
    // START TIMER
    paintClockIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        c.setStrokeColor(pinkDark);
        super.paintClockIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };

    // EXCLUSIVE GATEWAY
    paintXCrossIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        icon.strokeColor = blueSuperLight;
        super.paintXCrossIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };

    // USER TASK
    paintPersonIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        icon.strokeColor = blueSuperLight;
        super.paintPersonIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };

    // CALL ACTIVITY
    paintExpandIcon({ c, ratioFromParent, setIconOrigin, shape, icon }) {
        c.setStrokeColor(blueDark);
        super.paintExpandIcon({ c, ratioFromParent, setIconOrigin, shape, icon });
    };
}

bpmnvisu.IconPainterProvider.set(new HacktoberfestDarkThemeIconPainter());


const bpmnVisualizationHacktoberfestDarkTheme = new BpmnVisualizationHacktoberfestDarkTheme('bpmn-container-hacktoberfest-dark-theme');
bpmnVisualizationHacktoberfestDarkTheme.graph.getDefaultParent().setStyle(`${mxConstants.STYLE_FILLCOLOR} = ${blueDark}`) ;
bpmnVisualizationHacktoberfestDarkTheme.load(bpmn);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Update cells with new project name
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateCellLabel(bpmnVisualization, cellId, value) {
    const cell = bpmnVisualization.graph.model.getCell(cellId);
    bpmnVisualization.graph.model.setValue(cell, value);
}

function updateCellsLabel(cellId, value) {
    updateCellLabel(bpmnVisualization, cellId, value);
    updateCellLabel(bpmnVisualizationHacktoberfestLightTheme, cellId, value);
    updateCellLabel(bpmnVisualizationHacktoberfestDarkTheme, cellId, value);
}

inputProjectName.oninput = function(event) {
    let projectName = event.target.value;

    updateCellsLabel("call_activity", `Contribute to ${projectName} 🔧`);
    updateCellsLabel( "user_task_5", `Tweet how it was fun to contribute to ${projectName} 😃`);
};
