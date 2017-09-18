import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';

@Injectable()
export class AnonymGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.authService.getUser()
      .then((user) => {
        if (user) {
          this.router.navigate(['/center']);
          return false;
        } else {
          return true;
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }
}
