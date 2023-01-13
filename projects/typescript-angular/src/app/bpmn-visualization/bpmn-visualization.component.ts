import {
  AfterContentInit,
  type AfterViewInit,
  Component,
  type ElementRef,
  Input,
  type OnChanges,
  type SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BpmnVisualization, type FitOptions, FitType } from 'bpmn-visualization';
import { BpmnNavigationService } from "../services/bpmn-navigation.service";
import { ActionStatus } from "../utils/types";
import { ActionsNotifierService } from "../services/actions-notifier.service";

@Component({
  selector: 'app-bpmn-visualization',
  templateUrl: './bpmn-visualization.component.html',
  styleUrls: ['./bpmn-visualization.component.css'],
})
export class BpmnVisualizationComponent implements OnChanges, AfterViewInit, AfterContentInit {
  @Input() diagram?: string;
  @Input() fitType?: FitType;

  @ViewChild('bpmnContainer', { static: true })
  private bpmnContainer: ElementRef<HTMLDivElement> | undefined;

  private bpmnVisualization: BpmnVisualization | undefined;

  constructor(private actionsNotifierService: ActionsNotifierService, private bpmnNavigationService: BpmnNavigationService) {
    this.bpmnNavigationService.subscribe('fit', () => this.fit());
  }

  ngAfterViewInit(): void {
    if (!this.bpmnVisualization) {
      // initialize BpmnVisualization instance with the component DOM element
      this.bpmnVisualization = new BpmnVisualization({
        container: this.bpmnContainer!.nativeElement,
        navigation: { enabled: true },
      });
      // TODO fix error generated in dev mode https://angular.io/errors/NG0100
      // this.versionInitialized.emit(this.bpmnVisualization.getVersion().lib);
    }
  }

  ngAfterContentInit(): void {
    console.info("ngAfterContentInit")
    // if (this.bpmnVisualization) {
    //         this.versionInitialized.emit(this.bpmnVisualization.getVersion().lib);
    // }
    // this.bpmnVisualization && this.versionInitialized.emit(this.bpmnVisualization.getVersion().lib);
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (_changes['diagram'] && _changes['diagram'].currentValue) {
      this.loadDiagram();
    } else if (_changes['fitType'] && _changes['fitType'].currentValue) {
      this.fit();
    }
  }

  private loadDiagram(): void {
    const action: ActionStatus = {type: 'load', status: 'in-progress', id: loadCalls};
    this.actionsNotifierService.post(action)
    const duration = timed(() => this.bpmnVisualization?.load(this.diagram!, {
        fit: fitOptions(this.fitType),
      })
    );
    this.actionsNotifierService.post({...action, status: 'done', duration})
    loadCalls++;
  }

  fit(): void {
    if (this.diagram) {
      const action: ActionStatus = {type: 'fit', subType: this.fitType!, status: 'in-progress', id: fitCalls};
      this.actionsNotifierService.post(action)
      const duration = timed(() => this.bpmnVisualization?.navigation.fit(fitOptions(this.fitType)));
      this.actionsNotifierService.post({...action, status: 'done', duration});
      fitCalls++;
    }
  }
}

function timed(func: () => void): number {
  const start = performance.now();
  func();
  return performance.now() - start;
}

const fitOptions = (type: FitType | undefined): FitOptions => {
  return {type: type, margin: type != FitType.None? 20: 0};
}

let loadCalls = 0;
let fitCalls = 0;

