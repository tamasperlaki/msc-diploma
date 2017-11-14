import { TestBed, inject } from '@angular/core/testing';

import { DashboardRaffleService } from './dashboard-raffle.service';

describe('DashboardRaffleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardRaffleService]
    });
  });

  it('should be created', inject([DashboardRaffleService], (service: DashboardRaffleService) => {
    expect(service).toBeTruthy();
  }));
});
