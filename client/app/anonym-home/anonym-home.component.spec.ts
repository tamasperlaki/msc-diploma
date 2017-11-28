import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material';

import { AnonymHomeComponent } from './anonym-home.component';

describe('AnonymHomeComponent', () => {
  let component: AnonymHomeComponent;
  let fixture: ComponentFixture<AnonymHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatToolbarModule ],
      declarations: [ AnonymHomeComponent ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AnonymHomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
