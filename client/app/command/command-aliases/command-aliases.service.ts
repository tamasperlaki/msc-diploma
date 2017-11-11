import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { IAlias } from '../../../../models/alias';

@Injectable()
export class CommandAliasesService {

  private aliasesUrl = '/api/commands/aliases';

  constructor(private http: Http) { }

  getAliases = () : Promise<IAlias[]> => {
    return this.http
      .get(`${this.aliasesUrl}`)
        .toPromise()
        .then(response => response.json() as IAlias[])
        .catch(error => {
          console.log(error);
          return null;
        });
  }

  createAlias = (newAlias: IAlias): Promise<IAlias> => {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.aliasesUrl}`, newAlias)
          .toPromise()
          .then(response => response.json() as IAlias)
          .then(alias => resolve(alias))
          .catch(error => {
            console.log(error);
            reject(error._body);
          });
    });
  }

  deleteAlias = (id: any): Promise<IAlias> => {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${this.aliasesUrl}/${id}`,)
          .toPromise()
          .then(response => response.json() as IAlias)
          .then(alias => resolve(alias))
          .catch(error => {
            console.log(error);
            reject(error._body);
          });
    });
  }

}
