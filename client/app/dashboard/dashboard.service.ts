import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ICommand } from '../../../models/command';
import { IEvent } from '../../../models/event';

@Injectable()
export class DashboardService {

  private commandsUrl = '/api/commands/commands';
  private eventsUrl = '/api/events';

  constructor(private http: Http) { }

  runCommand = (commandId: any) => {
    return this.http
      .post(`${this.commandsUrl}/run/${commandId}`, {})
        .toPromise()
        .catch(error => {
          console.log(error);
          return null;
        });
  }

  getEvents = () : Promise<IEvent[]> => {
    return this.http
      .get(`${this.eventsUrl}`)
        .toPromise()
        .then(response => response.json() as IEvent[])
        .catch(error => {
          console.log(error);
          return null;
        });
  }
}
