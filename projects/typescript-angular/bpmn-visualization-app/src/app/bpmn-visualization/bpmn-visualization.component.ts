import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BpmnVisualization, FitType } from 'bpmn-visualization';

@Component({
  selector: 'app-bpmn-visualization',
  templateUrl: './bpmn-visualization.component.html',
  styleUrls: ['./bpmn-visualization.component.css'],
})
export class BpmnVisualizationComponent implements OnInit, OnChanges {
  @Input()
  diagram!: string | null;

  @ViewChild('bpmnContainer', { static: true })
  private bpmnContainer: ElementRef<HTMLDivElement> | undefined;

  private bpmnVisualization: BpmnVisualization | undefined;

  constructor() {}

  ngOnInit(): void {
    this.bpmnVisualization = new BpmnVisualization({
      container: this.bpmnContainer!.nativeElement,
      navigation: { enabled: true },
    });

    this.loadDiagram(this.diagram);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadDiagram(changes['diagram'].currentValue);
  }

  private loadDiagram(diagram?: string | null) {
    if (diagram) {
      this.bpmnVisualization?.load(diagram, {
        fit: { type: FitType.Center },
      });
    }
  }
}
