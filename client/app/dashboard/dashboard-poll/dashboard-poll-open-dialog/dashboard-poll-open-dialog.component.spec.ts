import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  MatListModule,
  MatFormFieldModule,
  MatDialogRef,
  MatIconModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations/src/module';

import { DashboardPollOpenDialogComponent } from './dashboard-poll-open-dialog.component';

fdescribe('PollOpenDialogComponent', () => {
  let component: DashboardPollOpenDialogComponent;
  let fixture: ComponentFixture<DashboardPollOpenDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatFormFieldModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        FormBuilder
      ],
      declarations: [ DashboardPollOpenDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPollOpenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
