import { Component } from '@angular/core';
import { FitType } from 'bpmn-visualization';
import { delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BpmnDiagramService } from '../services/bpmn-diagram.service';

@Component({
  selector: 'app-bpmn-examples',
  templateUrl: './bpmn-examples.component.html',
  styleUrls: ['./bpmn-examples.component.css'],
})
export class BpmnExamplesComponent {
  bpmnDiagram?: string | null;

  loading: boolean = false;

  FitType = FitType; // makes the enum available in the template
  fitTypeValue?: FitType;

  constructor(private bpmnDiagramService: BpmnDiagramService) {}

  loadDiagram(diagramIdx: number) {
    this.bpmnDiagram = null;
    this.loading = true;
    this.bpmnDiagramService
      .getDiagram(diagramIdx)
      // use delay to simulate diagram loading
      .pipe(delay(environment.delayDuration))
      .subscribe((diagram: string) => {
        this.bpmnDiagram = diagram;
        this.loading = false;
      });
  }
}
