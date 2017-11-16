import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DashboardPollService {

  private pollsUrl = '/api/polls';

  constructor(private http: Http) { }

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
      .toPromise();
  }

}
