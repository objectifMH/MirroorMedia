import { TestBed } from '@angular/core/testing';

import { SpbService } from './spb.service';

describe('SpbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpbService = TestBed.get(SpbService);
    expect(service).toBeTruthy();
  });
});
