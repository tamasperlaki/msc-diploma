import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DashboardRaffleService {

  private rafflesUrl = '/api/raffles';

  constructor(private http: Http) { }

  isOpen = () => {
    return this.http
    .get(`${this.rafflesUrl}/isopen`)
      .toPromise()
      .then(response => response.json() as boolean);
  }

  openRaffle = () => {
    return this.http.post(`${this.rafflesUrl}/open`, {})
      .toPromise();
  }

  drawRaffler = () => {
    return this.http.get(`${this.rafflesUrl}/draw`)
      .toPromise()
      .then(response => response.json());
  }

  drawImmediately = () => {
    return this.http.get(`${this.rafflesUrl}/drawImmediately`)
      .toPromise()
      .then(response => response.json());
  }

  resetRaffle = () => {
    return this.http.delete(`${this.rafflesUrl}/reset`)
      .toPromise();
  }

  closeRaffle = () => {
    return this.http.delete(`${this.rafflesUrl}/close`)
      .toPromise();
  }

  announceRaffleWinner = (name: string) => {
    return this.http.put(`${this.rafflesUrl}/announce/${name}`, {})
      .toPromise();
  }

}
