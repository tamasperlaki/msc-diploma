import { Component, OnInit } from '@angular/core';
import { DashboardPollOpenDialogComponent } from './dashboard-poll-open-dialog/dashboard-poll-open-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard-poll',
  templateUrl: './dashboard-poll.component.html',
  styleUrls: ['./dashboard-poll.component.scss']
})
export class DashboardPollComponent implements OnInit {
  isPollOpen: boolean;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isPollOpen = false;
  }

  openPoll() {
    this.isPollOpen = true;

    this.dialog.open(DashboardPollOpenDialogComponent, {
      width: '25vw'
    });
  }

  refreshPollResults() {}

  resetPoll() {}

  closePoll() {
    this.isPollOpen = false;
  }

}
