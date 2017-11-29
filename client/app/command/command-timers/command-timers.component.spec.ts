import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandTimersComponent } from './command-timers.component';
import {
  MatTableModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadmaskService } from '../../shared/components/loadmask/loadmask.service';
import { CommandTimersService } from './command-timers.service';
import { ActivatedRoute } from '@angular/router';
import { AlertDialogService } from '../../shared/components/alert-dialog/alert-dialog.service';
import { CommandCommunicatorService } from '../command-communicator.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/never';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CommandTimersComponent', () => {
  let component: CommandTimersComponent;
  let fixture: ComponentFixture<CommandTimersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSlideToggleModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: LoadmaskService, useValue: {} },
        { provide: CommandTimersService, useValue: {} },
        { provide: AlertDialogService, useValue: {} },
        { provide: ActivatedRoute, useValue: {
          data: Observable.never()
        } },
        { provide: CommandCommunicatorService, useValue: {
          commandDeleted$: Observable.never()
        } },
      ],
      declarations: [ CommandTimersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandTimersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
