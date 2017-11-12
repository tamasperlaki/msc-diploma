import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { DashboardService } from '../dashboard.service';

import { ICommand } from '../../../../models/command';
import { IEvent } from '../../../../models/event';

@Component({
  selector: 'app-dashboard-events',
  templateUrl: './dashboard-events.component.html',
  styleUrls: ['./dashboard-events.component.scss']
})
export class DashboardEventsComponent implements OnInit, AfterViewChecked {
  commandCtrl: FormControl;
  commands: ICommand[];
  events: IEvent[];
  filteredCommands: Observable<ICommand[]>;

  @ViewChild('eventContainer') private eventContainer: ElementRef;
  private prevCommandsLength = 0;

  constructor(private activatedRouter: ActivatedRoute, private dashboardService: DashboardService) {
    this.commandCtrl = new FormControl();
    this.filteredCommands = this.commandCtrl.valueChanges
        .startWith(null)
        .map(commandName => typeof commandName === 'string' ? this.filterCommands(commandName) : this.commands.slice());
  }

  ngOnInit() {
    this.activatedRouter.data.subscribe((data: { commands: ICommand[], events: IEvent[] }) => {
      this.commands = data.commands.filter(command => command.enabled);
      this.events = data.events;
    });
  }

  ngAfterViewChecked() {
    if(this.commands.length !== this.prevCommandsLength) {
      this.eventContainer.nativeElement.scrollTop = this.eventContainer.nativeElement.scrollHeight;
      this.prevCommandsLength = this.commands.length;
    }
  }

  filterCommands(name: string) {
    return this.commands.filter(command =>
      -1 < command.name.toLowerCase().indexOf(name.toLowerCase()));
  }

  onCommandSelected(command: ICommand) {
    this.commandCtrl.setValue('');
    this.dashboardService.runCommand(command._id);
  }
}
