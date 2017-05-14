import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private user: Object;

  usersUrl = "/api/users";

  constructor(private http: Http) { }

  getUser(): Promise<any> {
    if(this.user) {
      return Promise.resolve(this.user);
    } else {
      return this.http
        .get(`${this.usersUrl}/authenticate`)
          .toPromise()
          .then(response => {
            var user = response.json() as Object;

            return user;
          })
          .catch(error => {
            if(error.status !== 404) {
              console.error(error);
            }
            return null;
          });
    }
  }
}
