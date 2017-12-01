import { TestBed, async, inject } from '@angular/core/testing';

import { TimersResolverGuard } from './timers-resolver.guard';
import { CommandTimersService } from './command-timers/command-timers.service';

describe('TimersResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CommandTimersService, useValue: {} },
        TimersResolverGuard
      ]
    });
  });

  it('should ...', inject([TimersResolverGuard], (guard: TimersResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
