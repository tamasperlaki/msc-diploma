import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AnonymHomeRoutingModule } from './anonym-home-routing.module';
import { AnonymHomeComponent } from './anonym-home.component';

@NgModule({
  imports: [
    SharedModule,
    AnonymHomeRoutingModule
  ],
  declarations: [AnonymHomeComponent]
})
export class AnonymHomeModule {
}
