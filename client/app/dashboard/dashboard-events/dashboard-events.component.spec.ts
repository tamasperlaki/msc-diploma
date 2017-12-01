import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';

import { DashboardEventsComponent } from './dashboard-events.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/never';
import {
  MatDialogModule,
  MatOptionModule,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatAutocompleteModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardEventsComponent', () => {
  let component: DashboardEventsComponent;
  let fixture: ComponentFixture<DashboardEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatOptionModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          data: Observable.of({
            commands: [],
            events: []
          })
        } },
        { provide: DashboardService, useValue: {
          connectToEventSocket: () => Observable.never()
        } }
      ],
      declarations: [ DashboardEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
