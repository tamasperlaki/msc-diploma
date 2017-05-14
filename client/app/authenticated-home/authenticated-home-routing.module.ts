import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedHomeComponent } from "./authenticated-home.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { CommandComponent } from "../command/command.component";

import { AuthGuard } from "./auth.guard";
import { UserResolverGuard } from "./user-resolver.guard";
import { CommandsResolverGuard } from "../command/commands-resolver.guard";

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
        component: DashboardComponent
      },
      {
        path: 'command',
        component: CommandComponent,
        resolve: {
          commands: CommandsResolverGuard
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
