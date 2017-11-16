import { TestBed, inject } from '@angular/core/testing';

import { DashboardPollService } from './dashboard-poll.service';

describe('DashboardPollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardPollService]
    });
  });

  it('should be created', inject([DashboardPollService], (service: DashboardPollService) => {
    expect(service).toBeTruthy();
  }));
});
