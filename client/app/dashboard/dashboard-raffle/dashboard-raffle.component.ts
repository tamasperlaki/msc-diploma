import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { isEmpty } from 'lodash';

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
  isWinnerAnnounced: boolean;
  raffleWinner: any;

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
      .then(() => this.raffleWinner = null)
      .then(() => this.isRaffleOpen = true)
      .then(() => this.snackBar.open('Raffle opened!', 'OK', {
        duration: 2000
      }))
      .catch(error => this.alertDialog.open('Error', error));
  }

  drawRaffler() {
    this.drawCore(this.DashboardRaffleService.drawRaffler, 'Could not draw, no more rafflers!');
  }

  drawImmediately() {
    this.drawCore(this.DashboardRaffleService.drawImmediately, 'Could not draw, there are no viewers!');
  }

  resetRaffle() {
    this.raffleWinner = null;
    this.loadmask.start(this.DashboardRaffleService.resetRaffle())
      .then(() => this.snackBar.open('Raffle reset!', 'OK', {
        duration: 2000
      }))
      .catch(error => this.alertDialog.open('Error', error));
  }

  closeRaffle() {
    this.raffleWinner = null;
    this.loadmask.start(this.DashboardRaffleService.closeRaffle())
      .then(() => this.isRaffleOpen = false)
      .then(() => this.snackBar.open('Raffle closed!', 'OK', {
        duration: 2000
      }))
      .catch(error => this.alertDialog.open('Error', error));
  }

  announceRaffleWinner(userName: string) {
    if (this.isWinnerAnnounced) {
      return;
    }

    this.DashboardRaffleService.announceRaffleWinner(userName)
      .then(() => this.isWinnerAnnounced = true)
      .catch(error => this.alertDialog.open('Error', error));
  }

  writePrivateToWinner(userName: string) {
    window.open(`https://www.twitch.tv/message/compose?to=${userName}`, '_blank');
  }

  private drawCore(serviceMethod: () => Promise<any>, cantDrawMessage: string) {
    this.loadmask.start(serviceMethod())
      .then(raffleWinner => {
        if (!isEmpty(raffleWinner)) {
          this.raffleWinner = raffleWinner;
          this.isWinnerAnnounced = false;
        } else {
          this.snackBar.open(cantDrawMessage, 'OK', {
            duration: 2000
          });
        }
      })
      .catch(error => this.alertDialog.open('Error', error));
  }

}
