import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ICommand } from '../../../models/command';

@Injectable()
export class DashboardService {

  private commandsUrl = '/api/commands';

  constructor(private http: Http) { }

  runCommand = (commandId: any) => {
    return this.http
      .post(`${this.commandsUrl}/commands/run/${commandId}`, {})
        .toPromise()
        .catch(error => {
          console.log(error);
          return null;
        });
  }

}
