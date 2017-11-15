import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRaffleComponent } from './dashboard-raffle.component';

describe('DashboardRaffleComponent', () => {
  let component: DashboardRaffleComponent;
  let fixture: ComponentFixture<DashboardRaffleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardRaffleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRaffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
