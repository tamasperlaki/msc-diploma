import { TestBed, async, inject } from '@angular/core/testing';

import { DashboardService} from './dashboard.service';
import { EventsResolverGuard } from './events-resolver.guard';

describe('EventsResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DashboardService, useValue: {} },
        EventsResolverGuard
      ]
    });
  });

  it('should ...', inject([EventsResolverGuard], (guard: EventsResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
