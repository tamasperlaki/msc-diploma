import { TestBed, inject } from '@angular/core/testing';

import { CommandTimersService } from './command-timers.service';

describe('CommandTimersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandTimersService]
    });
  });

  it('should be created', inject([CommandTimersService], (service: CommandTimersService) => {
    expect(service).toBeTruthy();
  }));
});
