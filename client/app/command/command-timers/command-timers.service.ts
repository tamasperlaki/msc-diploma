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

}
