import {
  type AfterContentInit,
  type AfterViewInit,
  Component,
  type ElementRef,
  Input,
  type OnChanges,
  type OnInit,
  type SimpleChanges,
  ViewChild,
} from '@angular/core';
import {BpmnVisualization, type FitOptions, FitType} from 'bpmn-visualization';

@Component({
  selector: 'app-bpmn-visualization',
  templateUrl: './bpmn-visualization.component.html',
  styleUrls: ['./bpmn-visualization.component.css'],
})
export class BpmnVisualizationComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit {
  @Input()
  // diagram!: string | null;
  diagram?: string;

  @Input()
  fitType?: FitType;

  @ViewChild('bpmnContainer', { static: true })
  private bpmnContainer: ElementRef<HTMLDivElement> | undefined;

  private bpmnVisualization: BpmnVisualization | undefined;

  constructor() {
    console.info('calling constructor')
    console.info('bpmnContainer', this.bpmnContainer);
  }

  ngOnInit(): void {
    this.logLifeCycleStep('ngOnInit')
  }

  // TODO need to hook to init bpmn-visu AfterContentInit
  // --> switch to AfterViewInit ngAfterViewInit?
  ngAfterContentInit(): void {
    this.logLifeCycleStep('ngAfterContentInit')
    if (!this.bpmnVisualization) {
      console.info('Init the BpmnVisualization instance')
      // initialize BpmnVisualization instance with the component DOM element
      this.bpmnVisualization = new BpmnVisualization({
        container: this.bpmnContainer!.nativeElement,
        navigation: { enabled: true },
      });
    }
  }

  ngAfterViewInit(): void {
    this.logLifeCycleStep('ngAfterViewInit')
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.logLifeCycleStep('ngOnChanges')
    console.info('changes', _changes);
    if (_changes['diagram'] && _changes['diagram'].currentValue) {
      console.info('detected diagram changes, call loadDiagram');
      this.loadDiagram();
    } else if (_changes['fitType'] && _changes['fitType'].currentValue && this.diagram) {
      // only fit when a diagram has been loaded
      console.info('detected fit changes');
      this.fit();
    }
  }

  private logLifeCycleStep(step: string): void {
    console.info('calling', step)
    console.info('bpmnContainer', this.bpmnContainer);
  }

  private loadDiagram(): void {
    if (this.diagram) { // check to make TS happy, be we call load diagram only when the diagram is set
      loadCall++;
      console.info('@@load diagram', loadCall);
      this.bpmnVisualization?.load(this.diagram, {
        fit: fitOptions(this.fitType),
      });
    }
  }

  private fit(): void {
    fitCall++;
    console.info('call fit', fitCall);
    this.bpmnVisualization?.navigation.fit(fitOptions(this.fitType));
  }
}

const fitOptions = (type: FitType | undefined): FitOptions => {
  return {type: type, margin: type != FitType.None? 20: 0};
}

let loadCall = 0;
let fitCall = 0;
