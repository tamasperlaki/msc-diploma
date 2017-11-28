import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        DashboardService
      ]
    });
  });

  it('should be created', inject([DashboardService], (service: DashboardService) => {
    expect(service).toBeTruthy();
  }));
});
