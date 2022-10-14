import { Component } from '@angular/core';
import { BpmnDiagramService } from './services/bpmn-diagram.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bpmn-visualization-app';

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
