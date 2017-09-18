import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.authService.getUser()
      .then((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/welcome']);
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }
}
