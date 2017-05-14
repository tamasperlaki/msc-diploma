import { NgModule } from '@angular/core';

import { SharedModule } from "../shared/shared.module";
import { AuthenticatedHomeRoutingModule } from "./authenticated-home-routing.module";
import { DashboardModule } from '../dashboard/dashboard.module';
import { CommandModule } from '../command/command.module';

import { AuthenticatedHomeComponent } from './authenticated-home.component';

@NgModule({
  imports: [
    SharedModule,
    AuthenticatedHomeRoutingModule,
    DashboardModule,
    CommandModule
  ],
  declarations: [AuthenticatedHomeComponent]
})
export class AuthenticatedHomeModule {
}
