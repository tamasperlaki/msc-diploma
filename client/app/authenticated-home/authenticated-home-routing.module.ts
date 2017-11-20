import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedHomeComponent } from './authenticated-home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommandComponent } from '../command/command.component';

import { AuthGuard } from './auth.guard';
import { UserResolverGuard } from './user-resolver.guard';
import { CommandsResolverGuard } from '../command/commands-resolver.guard';
import { TimersResolverGuard } from '../command/timers-resolver.guard';
import { AliasesResolverGuard } from '../command/aliases-resolver.guard';
import { EventsResolverGuard } from '../dashboard/events-resolver.guard';
import { RafflesResolverGuard } from '../dashboard/raffles-resolver.guard';
import { PollResolverGuard } from '../dashboard/poll-resolver.guard';

const routes: Routes = [
  {
    path: 'center',
    component: AuthenticatedHomeComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolverGuard
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        resolve: {
          commands: CommandsResolverGuard,
          events: EventsResolverGuard,
          isRaffleOpen: RafflesResolverGuard,
          pollData: PollResolverGuard
        }
      },
      {
        path: 'command',
        component: CommandComponent,
        resolve: {
          commands: CommandsResolverGuard,
          timers: TimersResolverGuard,
          aliases: AliasesResolverGuard
        }
      }
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard, UserResolverGuard ]
})
export class AuthenticatedHomeRoutingModule { }
