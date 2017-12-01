import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { DashboardPollService } from './dashboard-poll.service';

describe('DashboardPollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        DashboardPollService
      ]
    });
  });

  it('should be created', inject([DashboardPollService], (service: DashboardPollService) => {
    expect(service).toBeTruthy();
  }));
});
