import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../shared/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.userService.getUser()
      .then((user) => {
        if(user.token) {
          console.log(user);
          return true;
        } else {
          this.router.navigate(['/welcome']);
          return true;
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }
}
