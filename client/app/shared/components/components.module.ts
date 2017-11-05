import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { LoadmaskComponent } from './loadmask/loadmask.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

import { LoadmaskService } from './loadmask/loadmask.service';
import { AlertDialogService } from './alert-dialog/alert-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [
    LoadmaskService,
    AlertDialogService
  ],
  declarations: [
    DeleteDialogComponent,
    LoadmaskComponent,
    AlertDialogComponent
  ],
  exports: [
    DeleteDialogComponent
  ],
  entryComponents: [
    DeleteDialogComponent,
    LoadmaskComponent,
    AlertDialogComponent
  ]
})
export class ComponentsModule { }
