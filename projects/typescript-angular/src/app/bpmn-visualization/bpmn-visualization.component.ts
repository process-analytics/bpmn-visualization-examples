import {
  type AfterContentInit,
  type AfterViewInit,
  Component,
  type ElementRef,
  Input,
  type OnChanges,
  type SimpleChanges,
  ViewChild,
} from '@angular/core';
import {BpmnVisualization, type FitOptions, FitType} from 'bpmn-visualization';

@Component({
  selector: 'app-bpmn-visualization',
  templateUrl: './bpmn-visualization.component.html',
  styleUrls: ['./bpmn-visualization.component.css'],
})
export class BpmnVisualizationComponent implements OnChanges, AfterViewInit {
  @Input()
  diagram?: string;

  @Input()
  fitType?: FitType;

  @ViewChild('bpmnContainer', { static: true })
  private bpmnContainer: ElementRef<HTMLDivElement> | undefined;

  private bpmnVisualization: BpmnVisualization | undefined;

  ngAfterViewInit(): void {
    if (!this.bpmnVisualization) {
      // initialize BpmnVisualization instance with the component DOM element
      this.bpmnVisualization = new BpmnVisualization({
        container: this.bpmnContainer!.nativeElement,
        navigation: { enabled: true },
      });
    }
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (_changes['diagram'] && _changes['diagram'].currentValue) {
      this.loadDiagram();
    } else if (_changes['fitType'] && _changes['fitType'].currentValue && this.diagram) {
      // only fit when a diagram has been loaded
      this.fit();
    }
  }

  private loadDiagram(): void {
    if (this.diagram) { // check to make TS happy, be we call load diagram only when the diagram is set
      this.bpmnVisualization?.load(this.diagram, {
        fit: fitOptions(this.fitType),
      });
    }
  }

  private fit(): void {
    this.bpmnVisualization?.navigation.fit(fitOptions(this.fitType));
  }
}

const fitOptions = (type: FitType | undefined): FitOptions => {
  return {type: type, margin: type != FitType.None? 20: 0};
}
