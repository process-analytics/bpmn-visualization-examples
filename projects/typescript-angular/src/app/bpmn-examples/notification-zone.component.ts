import { Component, type ElementRef, ViewChild } from '@angular/core';
import { ActionStatus } from "../utils/types";
import { ActionsNotifierService } from "../services/actions-notifier.service";

@Component({
  selector: 'app-notification-zone',
  template: '<textArea #notification readonly></textArea>',
  styles: [
    `
      textArea {
        resize: none;
        width: 100%;
        height: 95%;
        /*from the .card CSS rule*/
        border-radius: 4px;
        border: 1px solid #eee;
        background-color: #fafafa;
      }
    `
  ],
})
export class NotificationZoneComponent {
  @ViewChild('notification', { static: true })
  private textAreaRef: ElementRef<HTMLTextAreaElement> | undefined;

  constructor(private actionsNotifierService: ActionsNotifierService) {
    this.actionsNotifierService.subscribe(value => this.updateTextArea(value));
  }

  private updateTextArea(actionStatus: ActionStatus) {
    const messageParts = [`${actionStatus.type}`];
    actionStatus.subType && messageParts.push(`(${actionStatus.subType})`);
    messageParts.push(`#${actionStatus.id}: ${actionStatus.status}`);
    actionStatus.duration != undefined && messageParts.push(`in ${actionStatus.duration}ms`);

    let textArea = this.textAreaRef!.nativeElement;
    textArea.value += messageParts.join('\u0020') + '\n';
    textArea.scrollTop = textArea.scrollHeight;
  }
}
