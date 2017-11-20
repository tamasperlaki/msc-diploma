import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DashboardPollService {

  private pollsUrl = '/api/polls';

  constructor(private http: Http) { }

  getPollResults = () => {
    return this.http
    .get(`${this.pollsUrl}/`)
      .toPromise()
      .then(response => response.json());
  }

  isOpen = () => {
    return this.http
    .get(`${this.pollsUrl}/isopen`)
      .toPromise()
      .then(response => response.json() as boolean);
  }

  openPoll = (options: string[]) => {
    return this.http.post(`${this.pollsUrl}/open`, {
      options: options
    })
      .toPromise()
      .then(response => response.json());
  }

}
