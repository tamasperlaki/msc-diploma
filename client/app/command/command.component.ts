import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Command } from './command';
import { CommandService } from './command.service';
import { CommandDataSource } from './commandDataSource';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {

  commandsDataSource: CommandDataSource;
  newCommand: Command;
  displayedColumns = ['name', 'text', 'enabled', 'actions'];

  constructor(private activatedRouter: ActivatedRoute, private commandService: CommandService) {
    this.newCommand = new Command();
  }

  ngOnInit() {
    this.activatedRouter.data.subscribe((data: { commands: Command[] }) => {
      this.commandsDataSource = new CommandDataSource(data.commands);
    });
  }

  onCommandFormSubmit() {
    /*this.commandService.createCommand(this.newCommand)
      .then((command) => {
        this.commands.push(command);
      })
      .catch((error) => {
        alert(error);
      });*/
  }
}
