import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-command-editor-dialog',
  templateUrl: './command-editor-dialog.component.html',
  styleUrls: ['./command-editor-dialog.component.scss']
})
export class CommandEditorDialogComponent {

    constructor(public dialogRef: MatDialogRef<CommandEditorDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

    onSubmit() {
      this.dialogRef.close(this.data.text);
    }

}
