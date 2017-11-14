import { NgModule } from '@angular/core';

import {
  MatCardModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule
} from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { EventsResolverGuard } from './events-resolver.guard';
import { RafflesResolverGuard } from './raffles-resolver.guard';
import { DashboardChatComponent } from './dashboard-chat/dashboard-chat.component';
import { DashboardEventsComponent } from './dashboard-events/dashboard-events.component';
import { DashboardRaffleComponent } from './dashboard-raffle/dashboard-raffle.component';
import { DashboardRaffleService } from './dashboard-raffle/dashboard-raffle.service';

@NgModule({
  imports: [
    SharedModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  declarations: [
    DashboardComponent,
    DashboardChatComponent,
    DashboardEventsComponent,
    DashboardRaffleComponent
  ],
  providers: [
    DashboardService,
    DashboardRaffleService,
    EventsResolverGuard,
    RafflesResolverGuard
  ]
})
export class DashboardModule { }
