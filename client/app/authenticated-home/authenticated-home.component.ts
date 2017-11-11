import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser } from '../../../models/user';

@Component({
  selector: 'app-authenticated-home',
  templateUrl: './authenticated-home.component.html',
  styleUrls: ['./authenticated-home.component.scss']
})
export class AuthenticatedHomeComponent implements OnInit {
  title = 'Welcome to Tankika Bot!';
  user: IUser;

  routeLinks = [
    {label: 'Dashboard', link: 'dashboard'},
    {label: 'Command', link: 'command'}
  ];

  constructor(private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.data.subscribe((data: { user: IUser }) => {
      this.title = `Welcome ${data.user.display_name}!`;
      this.user = data.user;
    });
  }

}
