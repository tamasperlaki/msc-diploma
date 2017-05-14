import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedHomeComponent } from "./authenticated-home.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { CommandComponent } from "../command/command.component";

import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path: 'center',
    component: AuthenticatedHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'command',
        component: CommandComponent
      }
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class AuthenticatedHomeRoutingModule { }
