import { Component } from '@angular/core';
import { BpmnDiagramService } from '../services/bpmn-diagram.service';

@Component({
  selector: 'app-bpmn-examples',
  templateUrl: './bpmn-examples.component.html',
  styleUrls: ['./bpmn-examples.component.css'],
})
export class BpmnExamplesComponent {
  bpmnDiagram?: string | null;

  loading: boolean = false;

  constructor(private bpmnDiagramService: BpmnDiagramService) {}

  loadDiagram(diagramIdx: number) {
    this.bpmnDiagram = null;
    this.loading = true;
    this.bpmnDiagramService
      .getDiagram(diagramIdx)
      .subscribe((diagram: string) => {
        this.bpmnDiagram = diagram;
        this.loading = false;
      });
  }
}
