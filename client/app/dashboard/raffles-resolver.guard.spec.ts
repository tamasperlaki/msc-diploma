import { TestBed, async, inject } from '@angular/core/testing';

import { DashboardRaffleService } from './dashboard-raffle/dashboard-raffle.service';
import { RafflesResolverGuard } from './raffles-resolver.guard';

describe('RafflesResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DashboardRaffleService, useValue: {} },
        RafflesResolverGuard
      ]
    });
  });

  it('should ...', inject([RafflesResolverGuard], (guard: RafflesResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
