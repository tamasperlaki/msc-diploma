import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  usersUrl = "/api/user/user";

  constructor(private http: Http) { }

  getUser(): Promise<any> {
    return this.http.get(this.usersUrl)
                  .toPromise()
                  .then(response => {
                    var user = response.json() as Object;

                    return user !== undefined ? user : {};
                  })
                  .catch(error => {
                    if(error.status !== 404) {
                      console.error(error);
                    }
                    return {};
                  });
  }
}
