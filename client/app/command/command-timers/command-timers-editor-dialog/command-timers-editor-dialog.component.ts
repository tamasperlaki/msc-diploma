import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ICommand } from '../../../../../models/command';

@Component({
  selector: 'app-command-timers-editor-dialog',
  templateUrl: './command-timers-editor-dialog.component.html',
  styleUrls: ['./command-timers-editor-dialog.component.scss']
})
export class CommandTimersEditorDialogComponent {
  timerForm: FormGroup;
  addedCommands: ICommand[];
  commands: ICommand[];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CommandTimersEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.addedCommands = data.timer.commands;
      this.commands = data.commands;
      this.createForm();
  }

  createForm() {
    this.timerForm = this.formBuilder.group({
      name: {value: this.data.timer.name, disabled: true},
      timeInMinutes: [this.data.timer.timeInMinutes, [
        Validators.required,
        Validators.min(1),
        Validators.max(120)]
      ],
      commands: ''
    });
  }

  onSubmit() {
    this.dialogRef.close({
      timeInMinutes: this.timerForm.value.timeInMinutes,
      commands: this.timerForm.value.commands
    });
  }

  onSelectCommand(command: ICommand) {
    if(-1 < this.addedCommands.indexOf(command)) {
      return;
    }

    this.addedCommands.push(command);
    this.timerForm.controls.commands.reset();
  }

}
