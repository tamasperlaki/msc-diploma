import { TestBed, async, inject } from '@angular/core/testing';

import { UserResolverGuard } from './user-resolver.guard';
import { AuthService } from '../shared/auth/auth.service';

describe('UserResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: {} },
        UserResolverGuard
      ]
    });
  });

  it('should ...', inject([UserResolverGuard], (guard: UserResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
