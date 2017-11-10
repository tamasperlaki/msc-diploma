import { Component, OnInit } from '@angular/core';
import { CommandCommunicatorService } from './command-communicator.service';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
  providers: [CommandCommunicatorService]
})
export class CommandComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
}
