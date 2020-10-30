import { BpmnVisualization } from "../demo/0.5.1-alpha/index.es.js";

export function newBpmnVisualization(container) {
    return new BpmnVisualization(window.document.getElementById(container));
}