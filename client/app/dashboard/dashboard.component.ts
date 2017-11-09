import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { DashboardService } from './dashboard.service';

import { IUser } from '../../../models/user';
import { ICommand } from '../../../models/command';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chatSource: SafeUrl;
  user: IUser;
  commandCtrl: FormControl;
  commands: ICommand[];
  filteredCommands: Observable<ICommand[]>;

  constructor(private activatedRouter: ActivatedRoute, private domSanitizer: DomSanitizer, private dashboardService: DashboardService) {
    this.commandCtrl = new FormControl();
    this.filteredCommands = this.commandCtrl.valueChanges
        .startWith(null)
        .map(commandName => typeof commandName === "string" ? this.filterCommands(commandName) : this.commands.slice());
  }

  ngOnInit() {
      this.activatedRouter.data.subscribe((data: { user: IUser, commands: ICommand[] }) => {
        this.chatSource = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.twitch.tv/${data.user.name}/chat`);
        this.user = data.user;
        this.commands = data.commands.filter(command => command.enabled);
      });
  }

  filterCommands(name: string) {
    return this.commands.filter(command =>
      -1 < command.name.toLowerCase().indexOf(name.toLowerCase()));
  }

  onCommandSelected(command: ICommand) {
    this.commandCtrl.setValue("");
    this.dashboardService.runCommand(command._id);
  }
}
