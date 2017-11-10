import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ITimer } from '../../../../models/timer';

@Injectable()
export class CommandTimersService {

  private timersUrl = '/api/commands/timers';

  constructor(private http: Http) { }

  createTimer = (newTimer: ITimer): Promise<ITimer> => {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.timersUrl}`, newTimer)
          .toPromise()
          .then(response => response.json() as ITimer)
          .then(timer => resolve(timer))
          .catch(error => {
            console.log(error);
            reject(error._body);
          });
    });
  }

  getTimers = () : Promise<ITimer[]> => {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.timersUrl}`)
          .toPromise()
          .then(response => response.json() as ITimer[])
          .then(timers => resolve(timers))
          .catch(error => {
            console.log(error);
            reject(error._body);
          });
    });
  }

  deleteTimer = (timerId: any) : Promise<ITimer> => {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${this.timersUrl}/${timerId}`)
          .toPromise()
          .then(response => response.json() as ITimer)
          .then(timer => resolve(timer))
          .catch(error => {
            console.log(error);
            reject(error._body);
          });
    });
  }

  updateCommand = (timer: ITimer) : Promise<ITimer> => {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.timersUrl}/${timer._id}`, timer)
          .toPromise()
          .then(response => response.json() as ITimer)
          .then(returnedTimer => resolve(returnedTimer))
          .catch(error => {
            console.log(error);
            reject(error._body);
          });
    });
  }

}
