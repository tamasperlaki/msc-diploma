import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { LoadmaskComponent } from './loadmask.component';

@Injectable()
export class LoadmaskService {

  dialogRef: MatDialogRef<LoadmaskComponent>;

  constructor(private dialog: MatDialog) { }

  start = <T>(promise?: Promise<T>) => {
    this.dialogRef = this.dialog.open(LoadmaskComponent, {
      disableClose: true,
      panelClass: 'tankika-loadmask',
      backdropClass: 'tankika-loadmask-backdrop'
    });

    if (promise) {
      promise
        .then(this.stop, this.stop)
        .catch(this.stop);
    }

    return promise;
  }

  stop = () => {
    this.dialogRef.close();
  }

}
