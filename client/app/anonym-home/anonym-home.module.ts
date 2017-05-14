import { NgModule } from '@angular/core';

import { SharedModule } from "../shared/shared.module";
import { AnonymHomeRoutingModule } from "./anonym-home-routing.module";
import { AnonymHomeComponent } from './anonym-home.component';

@NgModule({
  imports: [
    SharedModule,
    AnonymHomeRoutingModule
  ],
  declarations: [AnonymHomeComponent]
})
export class AnonymHomeModule {
  title = 'Welcome to Tankika Bot!';

  attemptSignIn = function() {
    window.location.href = "https://api.twitch.tv/kraken/oauth2/authorize?client_id=vavdv2xlcwtdolf46py3yi3dskvdp3&redirect_uri=http://localhost:3000/api/twitchAuth/callback&response_type=code&scope=user_read";
  }
 }
