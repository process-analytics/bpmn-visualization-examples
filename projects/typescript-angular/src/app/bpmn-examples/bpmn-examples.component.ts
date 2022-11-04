import { Component } from '@angular/core';
import { FitType } from 'bpmn-visualization';
import { BpmnDiagramService } from '../services/bpmn-diagram.service';
import { BpmnNavigationService } from "../services/bpmn-navigation.service";
import { ActionStatus } from "../utils/types";

@Component({
  selector: 'app-bpmn-examples',
  templateUrl: './bpmn-examples.component.html',
  styleUrls: ['./bpmn-examples.component.css'],
})
export class BpmnExamplesComponent {
  bpmnDiagram?: string;

  loading = false;

  FitType = FitType; // makes the enum available in the template
  fitTypeValue?: FitType;

  constructor(private bpmnDiagramService: BpmnDiagramService, private bpmnNavigationService: BpmnNavigationService) {}

  loadDiagram(diagramIdx: number) {
    this.loading = true;
    this.bpmnDiagramService
      .getDiagram(diagramIdx)
      .subscribe((diagram: string) => {
        this.bpmnDiagram = diagram;
        this.loading = false;
      });
  }

  fitDiagram() {
    this.bpmnNavigationService.requestDiagramFit();
  }
}
