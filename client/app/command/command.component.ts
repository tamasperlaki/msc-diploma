import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Command } from './command';
import { CommandService } from './command.service';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {

  commands: Command[];
  command: Command;

  constructor(private activatedRouter: ActivatedRoute, private commandService: CommandService) {
    this.command = new Command();
  }

  ngOnInit() {
      this.activatedRouter.data.subscribe((data: { commands: Command[] }) => {
        this.commands = data.commands;
      });
  }

  onCommandFormSubmit() {
    this.commandService.createCommand(this.command)
      .then((command) => {
        this.commands.push(command);
      })
      .catch((error) => {
        alert(error);
      });
  }

}
