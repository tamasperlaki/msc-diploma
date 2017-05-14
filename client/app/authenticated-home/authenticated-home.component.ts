import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticated-home',
  templateUrl: './authenticated-home.component.html',
  styleUrls: ['./authenticated-home.component.scss']
})
export class AuthenticatedHomeComponent implements OnInit {
  title = 'Welcome to Tankika Bot!';

  routeLinks = [
    {label: 'Dashboard', link: ''},
    {label: 'Command', link: 'command'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
