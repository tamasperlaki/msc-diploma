import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandAliasesComponent } from './command-aliases.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatOptionModule,
  MatTableModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { LoadmaskService } from '../../shared/components/loadmask/loadmask.service';
import { AlertDialogService } from '../../shared/components/alert-dialog/alert-dialog.service';
import { CommandAliasesService } from './command-aliases.service';
import { CommandsEditorService } from '../commands-editor/commands-editor.service';
import { CommandCommunicatorService } from '../command-communicator.service';
import { Observable } from 'rxjs/Observable';

describe('CommandAliasesComponent', () => {
  let component: CommandAliasesComponent;
  let fixture: ComponentFixture<CommandAliasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatOptionModule,
        MatTableModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          data: Observable.never()
        } },
        { provide: LoadmaskService, useValue: {} },
        { provide: AlertDialogService, useValue: {} },
        { provide: CommandAliasesService, useValue: {} },
        { provide: CommandsEditorService, useValue: {} },
        { provide: CommandCommunicatorService, useValue: {
          commandListChanged$: Observable.never()
        } }
      ],
      declarations: [ CommandAliasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandAliasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
