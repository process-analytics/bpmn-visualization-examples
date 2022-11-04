import { TestBed } from '@angular/core/testing';

import { ActionsNotifierService } from './actions-notifier.service';

describe('ActionsNotifierService', () => {
  let service: ActionsNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionsNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
