import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandAliasesComponent } from './command-aliases.component';

describe('CommandAliasesComponent', () => {
  let component: CommandAliasesComponent;
  let fixture: ComponentFixture<CommandAliasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
