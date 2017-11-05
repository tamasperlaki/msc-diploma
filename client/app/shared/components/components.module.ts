import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { LoadmaskComponent } from './loadmask/loadmask.component';
import { LoadmaskService } from './loadmask/loadmask.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [LoadmaskService],
  declarations: [
    DeleteDialogComponent,
    LoadmaskComponent
  ],
  exports: [
    DeleteDialogComponent
  ],
  entryComponents: [
    DeleteDialogComponent,
    LoadmaskComponent
  ]
})
export class ComponentsModule { }
