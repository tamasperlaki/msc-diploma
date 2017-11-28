import { TestBed, async, inject } from '@angular/core/testing';

import { DashboardPollService } from './dashboard-poll/dashboard-poll.service';
import { PollResolverGuard } from './poll-resolver.guard';

describe('PollResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DashboardPollService, useValue: {} },
        PollResolverGuard
      ]
    });
  });

  it('should ...', inject([PollResolverGuard], (guard: PollResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
