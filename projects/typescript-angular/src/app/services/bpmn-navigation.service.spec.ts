import { TestBed } from '@angular/core/testing';

import { BpmnNavigationService } from './bpmn-navigation.service';

describe('BpmnNavigationServiceService', () => {
  let service: BpmnNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BpmnNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
