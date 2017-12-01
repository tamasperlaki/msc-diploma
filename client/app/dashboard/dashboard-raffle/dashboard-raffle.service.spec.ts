import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { DashboardRaffleService } from './dashboard-raffle.service';

describe('DashboardRaffleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        DashboardRaffleService
      ]
    });
  });

  it('should be created', inject([DashboardRaffleService], (service: DashboardRaffleService) => {
    expect(service).toBeTruthy();
  }));
});
