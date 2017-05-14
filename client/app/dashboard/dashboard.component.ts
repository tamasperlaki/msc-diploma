import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tankika-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chatSource: SafeUrl;
  user: Object;

  constructor(private activatedRouter : ActivatedRoute, private domSanitizer : DomSanitizer) { }

  ngOnInit() {
      this.activatedRouter.data.subscribe((data: { user: any }) => {
        this.chatSource = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://www.twitch.tv/${data.user.name}/chat`);
        this.user = data.user;
      });
  }

}
