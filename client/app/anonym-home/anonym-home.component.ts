import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-anonym-home',
  templateUrl: './anonym-home.component.html',
  styleUrls: ['./anonym-home.component.scss']
})
export class AnonymHomeComponent implements OnInit {
  title = 'Welcome to Tankika Bot!';
  description = 'In order to use the site, please sign in using your Twitch credentials.';

  constructor() { }

  ngOnInit() {
  }

  attemptSignIn = function() {
    window.location.href =
      'https://api.twitch.tv/kraken/oauth2/authorize'
        + `?client_id=${environment.clientId}`
        + `&redirect_uri=${environment.twitchRedirectUri}`
        + '&response_type=code'
        + '&scope=user_read';
  };

}
