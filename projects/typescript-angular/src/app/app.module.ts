import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BpmnExamplesComponent } from './bpmn-examples/bpmn-examples.component';
import { BpmnVisualizationComponent } from './bpmn-visualization/bpmn-visualization.component';

@NgModule({
  declarations: [
    AppComponent,
    BpmnExamplesComponent,
    BpmnVisualizationComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
