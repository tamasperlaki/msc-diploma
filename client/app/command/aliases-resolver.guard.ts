import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommandAliasesService } from './command-aliases/command-aliases.service';
import { IAlias } from '../../../models/alias';

@Injectable()
export class AliasesResolverGuard implements Resolve<IAlias[]> {

  constructor(private commandAliasesService: CommandAliasesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.commandAliasesService.getAliases();
  }
}
