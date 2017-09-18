import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Command } from './command';

@Injectable()
export class CommandService {

  private commandsUrl = '/api/commands';

  constructor(private http: Http) { }

  getCommands(): Promise<Command[]> {
    return this.http
      .get(`${this.commandsUrl}/commands/currentUser`)
        .toPromise()
        .then(response => response.json() as Command[])
        .catch(error => {
          console.error(error);
          return null;
        });
  }

  createCommand(command: Command): Promise<Command> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.commandsUrl}/commands`, command)
          .toPromise()
          .then(response => response.json() as Command)
          .catch(error => {
            console.error(error);
            reject(error._body);
          });
    });
  }

}
