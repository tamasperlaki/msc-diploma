import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authenticated-home',
  templateUrl: './authenticated-home.component.html',
  styleUrls: ['./authenticated-home.component.scss']
})
export class AuthenticatedHomeComponent implements OnInit {
  title = 'Welcome to Tankika Bot!';
  user: Object;

  routeLinks = [
    {label: 'Dashboard', link: ''},
    {label: 'Command', link: 'command'}
  ];

  constructor(private activatedRouter : ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.data.subscribe((data: { user: any }) => {
      this.title = `Welcome ${data.user.display_name}!`;
      this.user = data.user;
    });
  }

}
