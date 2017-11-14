import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
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

  connectToEventSocket = () : Observable<IEvent> => {
    const socket = io(environment.deployURi);

    Observable.fromEvent(socket, 'connect').subscribe(() => {
      console.log('Connected to websocket!');
    });
    Observable.fromEvent(socket, 'error', error => {
      console.error(error);
    });
    Observable.fromEvent(socket, 'disconnect', reason => {
      console.log(reason);
    });

    return Observable.fromEvent(socket, 'event');
  }
}
