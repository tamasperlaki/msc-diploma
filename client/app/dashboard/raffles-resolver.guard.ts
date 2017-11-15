import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DashboardRaffleService } from './dashboard-raffle/dashboard-raffle.service';

@Injectable()
export class RafflesResolverGuard implements Resolve<boolean> {

  constructor(private DashboardRaffleService: DashboardRaffleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.DashboardRaffleService.isOpen();
  }
}
