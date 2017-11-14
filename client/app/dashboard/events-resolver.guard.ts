import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IEvent } from '../../../models/event';
import { DashboardService} from './dashboard.service';

@Injectable()
export class EventsResolverGuard implements Resolve<IEvent[]> {

    constructor(private DashboardService: DashboardService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.DashboardService.getEvents();
    }
}
