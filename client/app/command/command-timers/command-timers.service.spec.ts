import { TestBed, inject } from '@angular/core/testing';

import { CommandTimersService } from './command-timers.service';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('CommandTimersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        CommandTimersService
      ]
    });
  });

  it('should be created', inject([CommandTimersService], (service: CommandTimersService) => {
    expect(service).toBeTruthy();
  }));
});
