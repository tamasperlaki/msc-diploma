import { TestBed, async, inject } from '@angular/core/testing';

import { EventsResolverGuard } from './events-resolver.guard';

describe('EventsResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsResolverGuard]
    });
  });

  it('should ...', inject([EventsResolverGuard], (guard: EventsResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
