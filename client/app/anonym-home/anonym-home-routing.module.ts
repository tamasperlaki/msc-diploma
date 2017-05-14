import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AnonymHomeComponent } from "./anonym-home.component";
import { AnonymGuard } from "./anonym.guard";

const routes: Routes = [
  {
    path: 'welcome',
    component: AnonymHomeComponent,
    canActivate: [AnonymGuard]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [AnonymGuard]
})
export class AnonymHomeRoutingModule { }

