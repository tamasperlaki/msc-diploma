import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandTimersComponent } from './command-timers.component';

describe('CommandTimersComponent', () => {
  let component: CommandTimersComponent;
  let fixture: ComponentFixture<CommandTimersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
