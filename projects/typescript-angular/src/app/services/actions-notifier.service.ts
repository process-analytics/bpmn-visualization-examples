import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { ActionStatus } from "../utils/types";

@Injectable({
  providedIn: 'root'
})
export class ActionsNotifierService {

  private subject = new Subject<ActionStatus>();
  private currentRequest = this.subject.asObservable();

  post(value: ActionStatus) {
    this.subject.next(value);
  }

  subscribe(next: (value: ActionStatus) => void): void {
    this.currentRequest.subscribe(next);
  }
}
