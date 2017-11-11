import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ICommand } from '../../../../models/command';
import { CommandsEditorService } from './../commands-editor/commands-editor.service';
import { CommandEditorDialogComponent as CommandEditorDialog } from './command-editor-dialog/command-editor-dialog.component';
import { CommandDataSource } from './commandDataSource';
import { CommandCommunicatorService } from './../command-communicator.service';

import { LoadmaskService } from '../../shared/components/loadmask/loadmask.service';
import { DeleteDialogComponent as DeleteDialog } from '../../shared/components/delete-dialog/delete-dialog.component';
import { AlertDialogService } from '../../shared/components/alert-dialog/alert-dialog.service';

@Component({
  selector: 'app-commands-editor',
  templateUrl: './commands-editor.component.html',
  styleUrls: ['./commands-editor.component.scss']
})
export class CommandsEditorComponent implements OnInit {

  @ViewChild('commandForm') commandForm: NgForm;

  commandsDataSource: CommandDataSource;
  newCommand: ICommand;
  displayedColumns = ['name', 'text', 'enabled', 'actions'];

  constructor(
      private activatedRouter: ActivatedRoute,
      private CommandEditorService: CommandsEditorService,
      private dialog: MatDialog,
      private loadmask: LoadmaskService,
      private alertDialogService: AlertDialogService,
      private CommandCommunicatorService: CommandCommunicatorService) {
    this.newCommand = <ICommand>{};
  }

  ngOnInit() {
    this.activatedRouter.data.subscribe((data: { commands: ICommand[] }) => {
      this.commandsDataSource = new CommandDataSource(data.commands);
    });
  }

  onSubmit() {
    this.loadmask.start();
    this.CommandEditorService.createCommand(this.newCommand)
      .then(command => {
        this.newCommand = <ICommand>{};
        this.commandForm.reset();

        return this.CommandEditorService.getCommands();
      })
      .then(
        commands => this.commandsDataSource.commands = commands,
        reason => this.alertDialogService.open('Error', reason)
      )
      .then(() => this.CommandCommunicatorService.onCommandListChanged())
      .then(() => this.loadmask.stop())
      .catch(error => this.alertDialogService.open('Error', error));
  }

  onEnabledChanged(command: ICommand, checked: boolean) {
    command.enabled = checked;
    this.loadmask.start(this.CommandEditorService.updateCommand(command))
      .catch(error => this.alertDialogService.open('Error', error));
  }

  onCommandEdit(command: ICommand) {
    const dialogRef = this.dialog.open(CommandEditorDialog, {
      data: {
        name: command.name,
        text: command.text
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || result === command.text) {
        return;
      }

      const request = <ICommand>{
        ...command
      };
      request.text = result;

      this.loadmask.start(this.CommandEditorService.updateCommand(request))
        .then(response => command.text = response.text, reason => this.alertDialogService.open('Error', reason))
        .catch(error => this.alertDialogService.open('Error', error));
    });
  }

  onCommandDelete(command: ICommand) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: {
        name: command.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.loadmask.start();
      this.CommandEditorService.deleteCommand(command._id)
        .then(() => this.CommandEditorService.getCommands())
        .then(commands => this.commandsDataSource.commands = commands)
        .then(() => this.CommandCommunicatorService.onCommandDeleted())
        .then(() => this.CommandCommunicatorService.onCommandListChanged())
        .then(() => this.loadmask.stop())
        .catch(error => {
          console.error(error);
          this.alertDialogService.open('Error', error);
        });
    });
  }

}
