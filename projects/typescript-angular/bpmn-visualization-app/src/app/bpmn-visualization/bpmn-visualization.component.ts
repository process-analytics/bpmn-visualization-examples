import {Component, type ElementRef, Input, type OnChanges, type OnInit, type SimpleChanges, ViewChild,} from '@angular/core';
import {BpmnVisualization, type FitOptions, FitType} from 'bpmn-visualization';

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
    console.info('calling ngOnInit')
    this.bpmnVisualization = new BpmnVisualization({
      container: this.bpmnContainer!.nativeElement,
      navigation: { enabled: true },
    });

    // TODO why do we need to call this here? if not the first display is not done
    console.info('calling loadDiagram from ngOnInit')
    this.loadDiagram();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    // console.info('changes', _changes);
    if (_changes['diagram']) {
      console.info('detected diagram changes, call loadDiagram');
      this.loadDiagram();
    } else if (_changes['fitType']) {
      console.info('detected fit changes');
      this.fit();
    }
  }

  private loadDiagram(): void {
    if (this.diagram) {
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
