import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { IUser } from '../../../../models/user';

@Component({
  selector: 'app-dashboard-chat',
  templateUrl: './dashboard-chat.component.html',
  styleUrls: ['./dashboard-chat.component.scss']
})
export class DashboardChatComponent implements OnInit {
  chatSource: SafeUrl;

  constructor(private activatedRouter: ActivatedRoute, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.activatedRouter.parent.data.subscribe((data: { user: IUser }) => {
      this.chatSource = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.twitch.tv/${data.user.name}/chat`);
    });
  }
}
