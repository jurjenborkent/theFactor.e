import { TestBed } from '@angular/core/testing';

import { JsonshareService } from './jsonshare.service';

describe('JsonshareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonshareService = TestBed.get(JsonshareService);
    expect(service).toBeTruthy();
  });
});
