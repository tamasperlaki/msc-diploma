import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: {} },
        { provide: Router, useValue: {} },
        AuthGuard
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
