import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsEditorComponent } from './commands-editor.component';

describe('CommandsEditorComponent', () => {
  let component: CommandsEditorComponent;
  let fixture: ComponentFixture<CommandsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
