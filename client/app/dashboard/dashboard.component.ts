import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { IUser } from '../../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chatSource: SafeUrl;
  user: IUser;

  constructor(private activatedRouter: ActivatedRoute, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
      this.activatedRouter.data.subscribe((data: { user: IUser }) => {
        this.chatSource = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.twitch.tv/${data.user.name}/chat`);
        this.user = data.user;
      });
  }

}
