import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandTimersEditorDialogComponent } from './command-timers-editor-dialog.component';

describe('CommandTimersEditorDialogComponent', () => {
  let component: CommandTimersEditorDialogComponent;
  let fixture: ComponentFixture<CommandTimersEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
