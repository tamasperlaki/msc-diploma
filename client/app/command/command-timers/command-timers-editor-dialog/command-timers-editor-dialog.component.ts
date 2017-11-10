import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { find, remove } from 'lodash';

import { ICommand } from '../../../../../models/command';

import { LoadmaskService } from '../../../shared/components/loadmask/loadmask.service';
import { CommandsEditorService } from '../../commands-editor/commands-editor.service';

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
    private loadmask: LoadmaskService,
    private CommandsEditorService: CommandsEditorService,
    public dialogRef: MatDialogRef<CommandTimersEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.addedCommands = data.commands;
      this.createForm();
      this.loadmask.start(CommandsEditorService.getCommands())
        .then(commands => {
          this.commands = commands;
        });
  }

  createForm() {
    this.timerForm = this.formBuilder.group({
      name: {value: this.data.name, disabled: true},
      timeInMinutes: [this.data.timeInMinutes, [
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
      commands: this.addedCommands
    });
  }

  onSelectCommand(command: ICommand) {
    if (!find(this.addedCommands, {_id: command._id})) {
      this.addedCommands.push(command);
    }

    this.timerForm.controls.commands.reset();
  }

  onCommandDelete(command: ICommand) {
    remove(this.addedCommands, {_id: command._id});
  }

}
