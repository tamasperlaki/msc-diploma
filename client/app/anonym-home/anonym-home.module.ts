import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MatToolbarModule, MatSidenavModule, MatButtonModule } from '@angular/material';
import { AnonymHomeRoutingModule } from './anonym-home-routing.module';
import { AnonymHomeComponent } from './anonym-home.component';

@NgModule({
  imports: [
    SharedModule,
    AnonymHomeRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule
  ],
  declarations: [AnonymHomeComponent]
})
export class AnonymHomeModule {
}
