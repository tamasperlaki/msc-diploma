import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CommandsEditorService } from './commands-editor/commands-editor.service';
import { ICommand } from '../../../models/command';

@Injectable()
export class CommandsResolverGuard implements Resolve<ICommand[]> {

  constructor(private commandEditorService: CommandsEditorService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.commandEditorService.getCommands();
  }
}
