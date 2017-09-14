import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anonym-home',
  templateUrl: './anonym-home.component.html',
  styleUrls: ['./anonym-home.component.scss']
})
export class AnonymHomeComponent implements OnInit {
  title = 'Welcome to Tankika Bot!';
  
  constructor() { }

  ngOnInit() {
  }

  attemptSignIn = function() {
    window.location.href = "https://api.twitch.tv/kraken/oauth2/authorize?client_id=vavdv2xlcwtdolf46py3yi3dskvdp3&redirect_uri=http://localhost:4200/api/twitchAuth/callback&response_type=code&scope=user_read";
  }

}
