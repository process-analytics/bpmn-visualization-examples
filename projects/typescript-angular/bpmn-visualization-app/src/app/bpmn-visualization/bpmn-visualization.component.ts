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

  @Input()
  fitType?: FitType;

  @ViewChild('bpmnContainer', { static: true })
  private bpmnContainer: ElementRef<HTMLDivElement> | undefined;

  private bpmnVisualization: BpmnVisualization | undefined;

  constructor() {}

  ngOnInit(): void {
    this.bpmnVisualization = new BpmnVisualization({
      container: this.bpmnContainer!.nativeElement,
      navigation: { enabled: true },
    });

    this.loadDiagram();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.loadDiagram();
  }

  private loadDiagram(): void {
    if (this.diagram) {
      this.bpmnVisualization?.load(this.diagram, {
        fit: { type: this.fitType },
      });
    }
  }
}
