import { TestBed, async, inject } from '@angular/core/testing';

import { AnonymGuard } from './anonym.guard';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';

describe('AnonymGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: {} },
        { provide: Router, useValue: {} },
        AnonymGuard
      ]
    });
  });

  it('should ...', inject([AnonymGuard], (guard: AnonymGuard) => {
    expect(guard).toBeTruthy();
  }));
});
