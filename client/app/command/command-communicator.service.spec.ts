import { TestBed, inject } from '@angular/core/testing';

import { CommandCommunicatorService } from './command-communicator.service';

describe('CommandCommunicatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandCommunicatorService]
    });
  });

  it('should be created', inject([CommandCommunicatorService], (service: CommandCommunicatorService) => {
    expect(service).toBeTruthy();
  }));
});
