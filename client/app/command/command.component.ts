import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ICommand } from '../../../models/command';
import { CommandService } from './command.service';
import { CommandDataSource } from './commandDataSource';

import { LoadmaskService } from '../shared/components/loadmask/loadmask.service';
import { DeleteDialogComponent as DeleteDialog } from '../shared/components/delete-dialog/delete-dialog.component';
import { AlertDialogService } from '../shared/components/alert-dialog/alert-dialog.service';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {

  commandsDataSource: CommandDataSource;
  newCommand: ICommand;
  displayedColumns = ['name', 'text', 'enabled', 'actions'];

  constructor(
      private activatedRouter: ActivatedRoute,
      private commandService: CommandService,
      private dialog: MatDialog,
      private loadmask: LoadmaskService,
      private alertDialogService: AlertDialogService) {
    this.newCommand = <ICommand>{};
  }

  ngOnInit() {
    this.activatedRouter.data.subscribe((data: { commands: ICommand[] }) => {
      this.commandsDataSource = new CommandDataSource(data.commands);
    });
  }

  onCommandFormSubmit() {
    this.loadmask.start();
    this.commandService.createCommand(this.newCommand)
      .then(command => {
        this.newCommand = <ICommand>{};

        return this.commandService.getCommands();
      })
      .then(
        commands => this.commandsDataSource.commands = commands,
        reason => this.alertDialogService.open('Error', reason)
      )
      .then(() => this.loadmask.stop())
      .catch(error => console.error(error));
  }

  onEnabledChanged(command: ICommand, checked: boolean) {
    command.enabled = checked;
    this.loadmask.start(this.commandService.updateCommand(command))
      .catch(error => console.error(error));
  }

  onCommandDelete(command: ICommand) {
    let dialogRef = this.dialog.open(DeleteDialog, {
      data: {
        name: command.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.loadmask.start();
      this.commandService.deleteCommand(command._id)
        .then(command => this.commandService.getCommands())
        .then(commands => this.commandsDataSource.commands = commands)
        .then(() => this.loadmask.stop())
        .catch(error => {
          console.error(error);
          this.alertDialogService.open('Error', error);
        });
    });
  }
}
