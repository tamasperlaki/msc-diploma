import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedHomeComponent } from './authenticated-home.component';

xdescribe('AuthenticatedHomeComponent', () => {
  let component: AuthenticatedHomeComponent;
  let fixture: ComponentFixture<AuthenticatedHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatedHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
