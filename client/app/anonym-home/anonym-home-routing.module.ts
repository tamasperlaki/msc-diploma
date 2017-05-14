import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AnonymHomeComponent } from "./anonym-home.component";

const routes: Routes = [
  { path: 'welcome', component: AnonymHomeComponent }
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AnonymHomeRoutingModule { }

