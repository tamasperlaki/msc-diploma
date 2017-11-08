import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandEditorDialogComponent } from './command-editor-dialog.component';

describe('CommandEditorDialogComponent', () => {
  let component: CommandEditorDialogComponent;
  let fixture: ComponentFixture<CommandEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
