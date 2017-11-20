import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardPollOpenDialogComponent } from './dashboard-poll-open-dialog/dashboard-poll-open-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { isArray, map } from 'lodash';

import { LoadmaskService } from '../../shared/components/loadmask/loadmask.service';
import { AlertDialogService } from '../../shared/components/alert-dialog/alert-dialog.service';
import { DashboardPollService } from './dashboard-poll.service';

@Component({
  selector: 'app-dashboard-poll',
  templateUrl: './dashboard-poll.component.html',
  styleUrls: ['./dashboard-poll.component.scss']
})
export class DashboardPollComponent implements OnInit {
  isPollOpen: boolean;
  pollResults: any[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private dialog: MatDialog,
    private loadmask: LoadmaskService,
    private dashboardPollService: DashboardPollService,
    private alertDialog: AlertDialogService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.activatedRouter.data.subscribe((data: { pollData: {isOpen: boolean, pollResults: any[]} }) => {
      this.isPollOpen = data.pollData.isOpen;
      this.setPollResults(data.pollData.pollResults);
    });
  }

  openPoll() {
    const dialogRef = this.dialog.open(DashboardPollOpenDialogComponent, {
      width: '25vw'
    });

    dialogRef.afterClosed().subscribe((result: string[]) => {
      if (!isArray(result)) {
        return;
      } else if (result.length < 2) {
        return this.snackBar.open('Please provide at least two options!', 'OK', {
          duration: 2000
        });
      }

      this.loadmask.start(this.dashboardPollService.openPoll(result))
        .then(this.setPollResults)
        .then(() => this.isPollOpen = true)
        .then(() => this.snackBar.open('Poll opened!', 'OK', {
          duration: 2000
        }))
        .catch(error => this.alertDialog.open('Error', error));
    });
  }

  refreshPollResults() {
    this.loadmask.start(this.dashboardPollService.getPollResults())
      .then(this.setPollResults)
      .catch(error => this.alertDialog.open('Error', error));
  }

  resetPoll() {}

  closePoll() {
    this.isPollOpen = false;
  }

  private setPollResults = (rawPollResults) => {
    this.pollResults = map(rawPollResults, (value, key) => ({
      'name': key,
      'value': value
    }));
  }

}
