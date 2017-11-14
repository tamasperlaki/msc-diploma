import { TestBed, async, inject } from '@angular/core/testing';

import { RafflesResolverGuard } from './raffles-resolver.guard';

describe('RafflesResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RafflesResolverGuard]
    });
  });

  it('should ...', inject([RafflesResolverGuard], (guard: RafflesResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
