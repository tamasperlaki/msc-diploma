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
      .then(response => response.json() as boolean)
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  openRaffle = () => {
    return this.http.post(`${this.rafflesUrl}/open`, {})
      .toPromise()
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  drawRaffler = () => {
    return this.http.get(`${this.rafflesUrl}/draw`)
      .toPromise()
      .then(response => response.json())
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  resetRaffle = () => {
    return this.http.delete(`${this.rafflesUrl}/reset`)
      .toPromise()
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  closeRaffle = () => {
    return this.http.delete(`${this.rafflesUrl}/close`)
      .toPromise()
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  announceRaffleWinner = (name: string) => {
    return this.http.put(`${this.rafflesUrl}/announce/${name}`, {})
      .toPromise()
      .catch(error => {
        console.log(error);
        return error;
      });
  }

}
