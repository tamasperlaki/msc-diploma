import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
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
  private eventsChanged = false;

  constructor(private activatedRouter: ActivatedRoute, private dashboardService: DashboardService) {
    this.commandCtrl = new FormControl();
    this.filteredCommands = this.commandCtrl.valueChanges
        .startWith(null)
        .map(commandName => typeof commandName === 'string' ? this.filterCommands(commandName) : this.commands.slice());

    this.dashboardService.connectToEventSocket().subscribe(event => {
      if (50 <= this.events.length) {
        this.events.shift();
      }

      this.events.push(event);
      this.eventsChanged = true;
    });
  }

  ngOnInit() {
    this.activatedRouter.data.subscribe((data: { commands: ICommand[], events: IEvent[] }) => {
      this.commands = data.commands.filter(command => command.enabled);
      this.events = data.events;
      this.eventsChanged = true;
    });
  }

  ngAfterViewChecked() {
    if (this.eventsChanged
      && this.eventContainer.nativeElement.scrollTop !== this.eventContainer.nativeElement.scrollHeight) {

      this.eventContainer.nativeElement.scrollTop = this.eventContainer.nativeElement.scrollHeight;
      this.eventsChanged = false;
    }
  }

  isToday(timestamp: string)  {
    return moment(timestamp).isSame(moment(), 'day');
  }

  getEventLabel(level: string) {
    switch (level) {
      case 'error': return 'label-danger';
      case 'warn': return 'label-warning';
      case 'info': return 'label-success';
      default: return '';
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
