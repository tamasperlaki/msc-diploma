import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { AlertDialogComponent } from './alert-dialog.component';

@Injectable()
export class AlertDialogService {

  constructor(private dialog: MatDialog) { }

  open = (header: String, message: String) => {
    this.dialog.closeAll();

    const subscription = this.dialog.afterAllClosed.subscribe(() => {
      subscription.unsubscribe();
      this.dialog.open(AlertDialogComponent, {
        data: {
          header: header,
          message: message
        }
      });
    });
  }

}
