import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CommandService } from './command.service';

@Injectable()
export class CommandsResolverGuard implements Resolve<any> {

  constructor(private commandService: CommandService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.commandService.getCommands();
  }
}
