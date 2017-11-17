import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DashboardPollService } from './dashboard-poll/dashboard-poll.service';

@Injectable()
export class IsPollOpenResolverGuard implements Resolve<boolean> {

    constructor(private dashboardPollService: DashboardPollService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.dashboardPollService.isOpen();
    }
}
