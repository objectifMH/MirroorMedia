import { TestBed } from '@angular/core/testing';

import { InOutService } from './in-out.service';

describe('InOutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InOutService = TestBed.get(InOutService);
    expect(service).toBeTruthy();
  });
});
