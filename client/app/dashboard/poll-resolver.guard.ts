import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DashboardPollService } from './dashboard-poll/dashboard-poll.service';

@Injectable()
export class PollResolverGuard implements Resolve<any> {

    constructor(private dashboardPollService: DashboardPollService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return new Promise<any>((resolve, reject) => {
        Promise.all([
          this.dashboardPollService.isOpen(),
          this.dashboardPollService.getPollResults()
        ])
        .then(results => {
          resolve({
            isOpen: results[0],
            pollResults: results[1]
          });
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
      });
    }
}
