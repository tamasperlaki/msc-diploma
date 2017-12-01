import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { MatIconModule, MatCardModule, MatSnackBarModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { DashboardRaffleService } from './dashboard-raffle.service';
import { LoadmaskService } from '../../shared/components/loadmask/loadmask.service';
import { AlertDialogService } from '../../shared/components/alert-dialog/alert-dialog.service';

import { DashboardRaffleComponent } from './dashboard-raffle.component';

describe('DashboardRaffleComponent', () => {
  let component: DashboardRaffleComponent;
  let fixture: ComponentFixture<DashboardRaffleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          data: Observable.of({})
        } },
        { provide: DashboardRaffleService, useValue: {} },
        { provide: LoadmaskService, useValue: {} },
        { provide: AlertDialogService, useValue: {} }
      ],
      declarations: [
        DashboardRaffleComponent
      ]
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
