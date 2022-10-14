import { TestBed } from '@angular/core/testing';

import { BpmnDiagramService } from './bpmn-diagram.service';

describe('BpmnDiagramService', () => {
  let service: BpmnDiagramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BpmnDiagramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
