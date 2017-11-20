import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';
import { PieChartModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { EventsResolverGuard } from './events-resolver.guard';
import { RafflesResolverGuard } from './raffles-resolver.guard';
import { PollResolverGuard } from './poll-resolver.guard';
import { DashboardChatComponent } from './dashboard-chat/dashboard-chat.component';
import { DashboardEventsComponent } from './dashboard-events/dashboard-events.component';
import { DashboardRaffleComponent } from './dashboard-raffle/dashboard-raffle.component';
import { DashboardRaffleService } from './dashboard-raffle/dashboard-raffle.service';
import { DashboardPollService } from './dashboard-poll/dashboard-poll.service';
import { DashboardPollComponent } from './dashboard-poll/dashboard-poll.component';
import { DashboardPollOpenDialogComponent } from './dashboard-poll/dashboard-poll-open-dialog/dashboard-poll-open-dialog.component';

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
    MatSnackBarModule,
    MatDialogModule,
    PieChartModule
  ],
  declarations: [
    DashboardComponent,
    DashboardChatComponent,
    DashboardEventsComponent,
    DashboardRaffleComponent,
    DashboardPollComponent,
    DashboardPollOpenDialogComponent
  ],
  providers: [
    DashboardService,
    DashboardRaffleService,
    DashboardPollService,
    EventsResolverGuard,
    RafflesResolverGuard,
    PollResolverGuard
  ],
  entryComponents: [
    DashboardPollOpenDialogComponent
  ]
})
export class DashboardModule { }
