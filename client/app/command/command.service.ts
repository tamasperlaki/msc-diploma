import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ICommand } from '../../../models/command';

@Injectable()
export class CommandService {

  private commandsUrl = '/api/commands';

  constructor(private http: Http) { }

  getCommands = () : Promise<ICommand[]> => {
    return this.http
      .get(`${this.commandsUrl}/commands/currentUser`)
        .toPromise()
        .then(response => response.json() as ICommand[])
        .catch(error => {
          console.log(error);
          return null;
        });
  }

  createCommand = (newCommand: ICommand): Promise<ICommand> => {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.commandsUrl}/commands`, newCommand)
          .toPromise()
          .then(response => response.json() as ICommand)
          .then(command => resolve(command))
          .catch(error => {
            console.log(error);
            reject(error._body);
          });
    });
  }

  deleteCommand = (id: String): Promise<ICommand> => {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${this.commandsUrl}/commands?id=${id}`)
          .toPromise()
          .then(response => response.json() as ICommand)
          .then(command => resolve(command))
          .catch(error => {
            console.log(error);
            reject(error._body);
          });
    });
  }
}
