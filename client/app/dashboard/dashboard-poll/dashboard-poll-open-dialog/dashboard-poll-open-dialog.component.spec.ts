import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPollOpenDialogComponent } from './dashboard-poll-open-dialog.component';

describe('PollOpenDialogComponent', () => {
  let component: DashboardPollOpenDialogComponent;
  let fixture: ComponentFixture<DashboardPollOpenDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
