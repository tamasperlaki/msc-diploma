import { NgModule } from '@angular/core';

import {
  MatCardModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { EventsResolverGuard } from './events-resolver.guard';
import { DashboardChatComponent } from './dashboard-chat/dashboard-chat.component';
import { DashboardEventsComponent } from './dashboard-events/dashboard-events.component';
import { DashboardRaffleComponent } from './dashboard-raffle/dashboard-raffle.component';

@NgModule({
  imports: [
    SharedModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    DashboardComponent,
    DashboardChatComponent,
    DashboardEventsComponent,
    DashboardRaffleComponent
  ],
  providers: [
    DashboardService,
    EventsResolverGuard
  ]
})
export class DashboardModule { }
