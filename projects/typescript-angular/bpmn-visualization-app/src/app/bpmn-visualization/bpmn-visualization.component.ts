import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BpmnVisualization, FitType } from 'bpmn-visualization';

@Component({
  selector: 'app-bpmn-visualization',
  templateUrl: './bpmn-visualization.component.html',
  styleUrls: ['./bpmn-visualization.component.css'],
})
export class BpmnVisualizationComponent implements OnInit {
  @Input()
  diagram?: string | null;

  @ViewChild('bpmnContainer', { static: true })
  private bpmnContainer: ElementRef<HTMLDivElement> | undefined;

  private bpmnVisualization: BpmnVisualization | undefined;

  constructor() {}

  ngOnInit(): void {
    this.bpmnVisualization = new BpmnVisualization({
      container: this.bpmnContainer!.nativeElement,
      navigation: { enabled: true },
    });

    this.bpmnVisualization.load(this.diagram!, {
      fit: { type: FitType.Center },
    });
  }
}
