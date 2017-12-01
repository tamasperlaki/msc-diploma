import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChatComponent } from './dashboard-chat.component';
import { MatCardModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

xdescribe('DashboardChatComponent', () => {
  let component: DashboardChatComponent;
  let fixture: ComponentFixture<DashboardChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          parent: {
            data: Observable.of({
              user: {}
            })
          }
        } },
        { provide: DomSanitizer, useValue: {
          bypassSecurityTrustResourceUrl: () => {}
        } },
      ],
      declarations: [ DashboardChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
