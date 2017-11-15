import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPollComponent } from './dashboard-poll.component';

describe('DashboardPollComponent', () => {
  let component: DashboardPollComponent;
  let fixture: ComponentFixture<DashboardPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPollComponent ]
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
