import { BpmnVisualization } from "../demo/0.6.0/index.es.js";

export function newBpmnVisualization(container) {
    return new BpmnVisualization(window.document.getElementById(container));
}