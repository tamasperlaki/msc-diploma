import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ITimer } from '../../../../models/timer';
import { ICommand } from '../../../../models/command';

import { TimerDataSource } from './timerDataSource';
import { LoadmaskService } from '../../shared/components/loadmask/loadmask.service';
import { CommandTimersService } from './command-timers.service';
import { CommandTimersEditorDialogComponent } from './command-timers-editor-dialog/command-timers-editor-dialog.component';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';
import { AlertDialogService } from '../../shared/components/alert-dialog/alert-dialog.service';

@Component({
  selector: 'app-command-timers',
  templateUrl: './command-timers.component.html',
  styleUrls: ['./command-timers.component.scss']
})
export class CommandTimersComponent implements OnInit {
  timerForm: FormGroup;
  timerDataSource: TimerDataSource;
  displayedColumns = ['name', 'time', 'commands', 'enabled', 'actions'];
  commands: ICommand[];

  constructor(
    private formBuilder: FormBuilder,
    private loadmask: LoadmaskService,
    private CommandTimersService : CommandTimersService,
    private activatedRouter: ActivatedRoute,
    private alertDialogService: AlertDialogService,
    private dialog: MatDialog) {

    this.createForm();
  }

  ngOnInit() {
    this.activatedRouter.data.subscribe((data: { timers: ITimer[], commands: ICommand[] }) => {
      this.timerDataSource = new TimerDataSource(data.timers);
      this.commands = data.commands;
    });
  }

  createForm() {
    this.timerForm = this.formBuilder.group({
      name: ['', Validators.required],
      time: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(120)]
      ]
    });
  }

  onSubmit() {
    const newTimer = <ITimer>this.timerForm.value;

    this.loadmask.start();
    this.CommandTimersService.createTimer(newTimer)
      .then(command => {
        this.timerForm.reset();

        return this.CommandTimersService.getTimers();
      })
      .then(
        timers => this.timerDataSource.timers = timers,
        reason => this.alertDialogService.open('Error', reason)
      )
      .then(() => this.loadmask.stop())
      .catch(error => console.error(error));
  }

  onEnabledChanged(timer: ITimer, checked: boolean) {
    timer.enabled = checked;
    this.loadmask.start(this.CommandTimersService.updateCommand(timer))
      .catch(error => this.alertDialogService.open('Error', error));
  }

  onTimerEdit(timer: ITimer) {
    const dialogRef = this.dialog.open(CommandTimersEditorDialogComponent, {
      data: {
        timer: timer,
        commands: this.commands
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      const request = <ITimer>{
        ...timer
      };
      request.timeInMinutes = result.timeInMinutes;
      //request.commands = result.commands;

      this.loadmask.start();
      this.CommandTimersService.updateCommand(request)
        .then(() => this.CommandTimersService.getTimers())
        .then(
          timers => this.timerDataSource.timers = timers,
          reason => this.alertDialogService.open('Error', reason)
        )
        .then(() => this.loadmask.stop())
        .catch(error => this.alertDialogService.open('Error', error));
    });
  }

  onTimerDelete(timer: ITimer) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: timer.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.loadmask.start();
      this.CommandTimersService.deleteTimer(timer._id)
        .then(() => this.CommandTimersService.getTimers())
        .then(
          timers => this.timerDataSource.timers = timers,
          reason => this.alertDialogService.open('Error', reason)
        )
        .then(() => this.loadmask.stop())
        .catch(error => {
          console.error(error);
          this.alertDialogService.open('Error', error);
        });
    });
  }

}
