import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { IUser } from '../../../../models/user';

@Injectable()
export class AuthService {

  private user: IUser;

  usersUrl = '/api/users';

  constructor(private http: Http) { }

  getUser = () : Promise<IUser> => {
    if (this.user) {
      return Promise.resolve(this.user);
    } else {
      return this.http
        .get(`${this.usersUrl}/authenticate`)
          .toPromise()
          .then(response => response.json() as IUser)
          .catch(error => {
            if (error.status !== 404) {
              console.error(error);
            }
            return null;
          });
    }
  }
}
