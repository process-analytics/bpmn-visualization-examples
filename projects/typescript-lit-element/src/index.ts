import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { BpmnVisualization, FitType } from "bpmn-visualization";
// The BPMN diagram, loaded as string. The '?.raw' extension support is provided by Vite.
// for other load methods, see https://github.com/process-analytics/bpmn-visualization-examples
import diagram from './diagram.bpmn?raw';
import "./style.css";

@customElement("bpmn-diag")
export class BPMN extends LitElement {
  firstUpdated(): void {
    const bpmnVisualization = new BpmnVisualization({
      container: <HTMLElement>this.renderRoot.querySelector("#bpmn-container"),
    });
    bpmnVisualization.load(diagram, {
      fit: { type: FitType.Center, margin: 10 },
    });
  }

  render() {
    return html`<div id="bpmn-container"></div>`;
  }
}
