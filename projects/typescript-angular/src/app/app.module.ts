import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BpmnExamplesComponent } from './bpmn-examples/bpmn-examples.component';
import { BpmnVisualizationComponent } from './bpmn-visualization/bpmn-visualization.component';
import { NotificationZoneComponent } from "./bpmn-examples/notification-zone.component";

@NgModule({
  declarations: [
    AppComponent,
    BpmnExamplesComponent,
    BpmnVisualizationComponent,
    NotificationZoneComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
