import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { ActionType } from "../utils/types";

@Injectable({
  providedIn: 'root'
})
export class BpmnNavigationService {
  private subject = new Subject<ActionType>();
  private currentRequest = this.subject.asObservable();

  requestDiagramFit() {
    this.subject.next('fit');
  }

  subscribe(type: ActionType, actionable: () => void): void {
    this.currentRequest.subscribe(actionType => {
      actionType == type && actionable();
    });
  }
}
