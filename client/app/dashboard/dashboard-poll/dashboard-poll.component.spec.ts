import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';
import { PieChartModule } from '@swimlane/ngx-charts';
import {
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DashboardPollOpenDialogComponent } from './dashboard-poll-open-dialog/dashboard-poll-open-dialog.component';

import { LoadmaskService } from '../../shared/components/loadmask/loadmask.service';
import { AlertDialogService } from '../../shared/components/alert-dialog/alert-dialog.service';
import { DashboardPollService } from './dashboard-poll.service';

import { DashboardPollComponent } from './dashboard-poll.component';

describe('DashboardPollComponent', () => {
  let component: DashboardPollComponent;
  let fixture: ComponentFixture<DashboardPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        PieChartModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          data: Observable.of({
            pollData: {}
          })
        } },
        { provide: DashboardPollService, useValue: {} },
        { provide: LoadmaskService, useValue: {} },
        { provide: AlertDialogService, useValue: {} },
        { provide: APP_BASE_HREF, useValue : '/' }
      ],
      declarations: [
        DashboardPollComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
