import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandTimersEditorDialogComponent } from './command-timers-editor-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoadmaskService } from '../../../shared/components/loadmask/loadmask.service';
import { CommandsEditorService } from '../../commands-editor/commands-editor.service';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatOptionModule,
  MatListModule,
  MatFormFieldModule,
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

describe('CommandTimersEditorDialogComponent', () => {
  let component: CommandTimersEditorDialogComponent;
  let fixture: ComponentFixture<CommandTimersEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        MatOptionModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: LoadmaskService, useValue: {
          start: () => Promise.resolve()
        } },
        { provide: CommandsEditorService, useValue: {
          getCommands: () => {}
        } },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      declarations: [ CommandTimersEditorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandTimersEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
