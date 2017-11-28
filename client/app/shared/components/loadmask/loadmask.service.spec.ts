import { TestBed, inject } from '@angular/core/testing';
import { MatDialog } from '@angular/material';

import { LoadmaskService } from './loadmask.service';

describe('LoadmaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: {} },
        LoadmaskService
      ]
    });
  });

  it('should be created', inject([LoadmaskService], (service: LoadmaskService) => {
    expect(service).toBeTruthy();
  }));
});
