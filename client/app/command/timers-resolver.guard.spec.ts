import { TestBed, async, inject } from '@angular/core/testing';

import { TimersResolverGuard } from './timers-resolver.guard';

describe('TimersResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimersResolverGuard]
    });
  });

  it('should ...', inject([TimersResolverGuard], (guard: TimersResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
