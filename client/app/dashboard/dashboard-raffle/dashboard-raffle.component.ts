import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material';

import { DashboardRaffleService } from './dashboard-raffle.service';
import { LoadmaskService } from '../../shared/components/loadmask/loadmask.service';
import { AlertDialogService } from '../../shared/components/alert-dialog/alert-dialog.service';

@Component({
  selector: 'app-dashboard-raffle',
  templateUrl: './dashboard-raffle.component.html',
  styleUrls: ['./dashboard-raffle.component.scss']
})
export class DashboardRaffleComponent implements OnInit {
  isRaffleOpen: boolean;

  constructor(
    private activatedRouter: ActivatedRoute,
    private DashboardRaffleService: DashboardRaffleService,
    private loadmask: LoadmaskService,
    private alertDialog: AlertDialogService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.activatedRouter.data.subscribe((data: { isRaffleOpen: boolean }) => {
      this.isRaffleOpen = data.isRaffleOpen;
    });
  }

  openRaffle() {
    this.loadmask.start(this.DashboardRaffleService.openRaffle())
      .then(() => this.isRaffleOpen = true)
      .then(() => this.snackBar.open('Raffle opened!', 'OK', {
        duration: 2000
      }))
      .catch(error => this.alertDialog.open('Error', error));
  }

  drawRaffler() {
    this.loadmask.start(this.DashboardRaffleService.drawRaffler())
      .then(console.log)
      .catch(error => this.alertDialog.open('Error', error));
  }

  resetRaffle() {
    this.loadmask.start(this.DashboardRaffleService.resetRaffle())
      .then(() => this.snackBar.open('Raffle reset!', 'OK', {
        duration: 2000
      }))
      .catch(error => this.alertDialog.open('Error', error));
  }

  closeRaffle() {
    this.loadmask.start(this.DashboardRaffleService.closeRaffle())
      .then(() => this.isRaffleOpen = false)
      .then(() => this.snackBar.open('Raffle closed!', 'OK', {
        duration: 2000
      }))
      .catch(error => this.alertDialog.open('Error', error));
  }

}
