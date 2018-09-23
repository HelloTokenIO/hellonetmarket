import { TestBed } from '@angular/core/testing';

import { GetclientService } from './getclient.service';

describe('GetclientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetclientService = TestBed.get(GetclientService);
    expect(service).toBeTruthy();
  });
});
