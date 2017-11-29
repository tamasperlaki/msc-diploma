import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandEditorDialogComponent } from './command-editor-dialog.component';
import {
  MatFormFieldModule,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatInputModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CommandEditorDialogComponent', () => {
  let component: CommandEditorDialogComponent;
  let fixture: ComponentFixture<CommandEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      declarations: [ CommandEditorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
