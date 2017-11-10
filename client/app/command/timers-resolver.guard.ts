import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommandTimersService } from './command-timers/command-timers.service';
import { ITimer } from '../../../models/timer';

@Injectable()
export class TimersResolverGuard implements Resolve<ITimer[]> {

  constructor(private commandTimersService: CommandTimersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.commandTimersService.getTimers();
  }
}
