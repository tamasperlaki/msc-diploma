import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Command } from './command';
import { CommandService } from './command.service';
import { CommandDataSource } from './commandDataSource';

import { LoadmaskService } from '../shared/components/loadmask/loadmask.service';
import { DeleteDialogComponent as DeleteDialog } from '../shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {

  commandsDataSource: CommandDataSource;
  newCommand: Command;
  displayedColumns = ['name', 'text', 'enabled', 'actions'];

  constructor(private activatedRouter: ActivatedRoute, private commandService: CommandService, private dialog: MatDialog, private loadmask: LoadmaskService) {
    this.newCommand = new Command();
  }

  ngOnInit() {
    this.activatedRouter.data.subscribe((data: { commands: Command[] }) => {
      this.commandsDataSource = new CommandDataSource(data.commands);
    });
  }

  onCommandFormSubmit() {
    this.loadmask.start(this.commandService.createCommand(this.newCommand))
      .then(command => {
        this.newCommand = new Command();

        return this.commandService.getCommands();
      })
      .then(commands => this.commandsDataSource.commands = commands)
      .catch(error => {
        console.error(error);
      });
  }

  onCommandDelete(command: Command) {
    let dialogRef = this.dialog.open(DeleteDialog, {
      data: {
        name: command.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.commandService.deleteCommand(command._id)
        .then(command => this.commandService.getCommands())
        .then(commands => this.commandsDataSource.commands = commands)
        .catch(error => {
          console.error(error);
        });
    });
  }
}
