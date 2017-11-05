import { TestBed, inject } from '@angular/core/testing';

import { LoadmaskService } from './loadmask.service';

describe('LoadmaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadmaskService]
    });
  });

  it('should be created', inject([LoadmaskService], (service: LoadmaskService) => {
    expect(service).toBeTruthy();
  }));
});
