const bpmn = getCustomUserTaskIconBpmnDiagram();

const bpmnVisualization = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-default' });
bpmnVisualization.load(bpmn);

// demonstrate how to hard code the color for a specific icon
const userTaskIconColor = 'orange';

class CustomIconPainter extends bpmnvisu.IconPainter {
    // adapted from https://github.com/primer/octicons/blob/638c6683c96ec4b357576c7897be8f19c933c052/icons/person.svg
    // use mxgraph-svg2shape to generate the code from the svg
    paintPersonIcon(paintParameter) {
        const canvas = this.newBpmnCanvas(paintParameter, {height: 13, width: 12});
        // this way of doing subject to change in the future (probably by setting the fillColor in the icon style configuration)
        paintParameter.canvas.setFillColor(userTaskIconColor);

        canvas.begin();
        canvas.moveTo(12, 13);
        canvas.arcTo(1, 1, 0, 0, 1, 11, 14);
        canvas.lineTo(1, 14);
        canvas.arcTo(1, 1, 0, 0, 1, 0, 13);
        canvas.lineTo(0, 12);
        canvas.curveTo(0, 9.37, 4, 8, 4, 8);
        canvas.curveTo(4, 8, 4.23, 8, 4, 8);
        canvas.curveTo(3.16, 6.38, 3.06, 5.41, 3, 3);
        canvas.curveTo(3.17, 0.59, 4.87, 0, 6, 0);
        canvas.curveTo(7.13, 0, 8.83, 0.59, 9, 3);
        canvas.curveTo(8.94, 5.41, 8.84, 6.38, 8, 8);
        canvas.curveTo(8, 8, 12, 9.37, 12, 12);
        canvas.lineTo(12, 13);
        canvas.close();
        canvas.fill();
    };
}

bpmnvisu.IconPainterProvider.set(new CustomIconPainter());

const bpmnVisualizationCustomerUserTask = new bpmnvisu.BpmnVisualization({ container: 'bpmn-container-custom-user-task' });
bpmnVisualizationCustomerUserTask.load(bpmn);
