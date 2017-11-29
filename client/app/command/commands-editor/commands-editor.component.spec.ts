import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsEditorComponent } from './commands-editor.component';
import {
  MatCardModule,
  MatFormFieldModule,
  MatTableModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommandsEditorService } from './commands-editor.service';
import { LoadmaskService } from '../../shared/components/loadmask/loadmask.service';
import { AlertDialogService } from '../../shared/components/alert-dialog/alert-dialog.service';
import { CommandCommunicatorService } from '../command-communicator.service';
import { Observable } from 'rxjs/Observable';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CommandsEditorComponent', () => {
  let component: CommandsEditorComponent;
  let fixture: ComponentFixture<CommandsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatTableModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          data: Observable.of({})
        } },
        { provide: CommandsEditorService, useValue: {} },
        { provide: LoadmaskService, useValue: {} },
        { provide: AlertDialogService, useValue: {} },
        { provide: CommandCommunicatorService, useValue: {} },
      ],
      declarations: [ CommandsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
