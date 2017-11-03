import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CommandService } from './command.service';
import { Command } from './command';

@Injectable()
export class CommandsResolverGuard implements Resolve<Command[]> {

  constructor(private commandService: CommandService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.commandService.getCommands();
  }
}
