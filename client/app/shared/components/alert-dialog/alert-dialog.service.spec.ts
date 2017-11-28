import { TestBed, inject } from '@angular/core/testing';
import { MatDialog } from '@angular/material';

import { AlertDialogService } from './alert-dialog.service';

describe('AlertDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: {} },
        AlertDialogService
      ]
    });
  });

  it('should be created', inject([AlertDialogService], (service: AlertDialogService) => {
    expect(service).toBeTruthy();
  }));
});
