import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BpmnDiagramService } from './services/bpmn-diagram.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bpmn-visualization-app';

  bpmnDiagram: Observable<string>;

  constructor(private bpmnDiagramService: BpmnDiagramService) {
    this.bpmnDiagram = this.bpmnDiagramService.getDiagram();
  }
}
