import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    MatCardModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
