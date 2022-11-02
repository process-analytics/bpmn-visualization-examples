import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmnVisualizationComponent } from './bpmn-visualization.component';

describe('BpmnVisualizationComponent', () => {
  let component: BpmnVisualizationComponent;
  let fixture: ComponentFixture<BpmnVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpmnVisualizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpmnVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
