import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmnExamplesComponent } from './bpmn-examples.component';

describe('BpmnExamplesComponent', () => {
  let component: BpmnExamplesComponent;
  let fixture: ComponentFixture<BpmnExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpmnExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpmnExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
