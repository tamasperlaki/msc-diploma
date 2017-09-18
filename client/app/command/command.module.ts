import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CommandComponent } from './command.component';
import { CommandService } from './command.service';
import { CommandsResolverGuard } from './commands-resolver.guard';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [CommandComponent],
  providers: [CommandService, CommandsResolverGuard]
})
export class CommandModule { }
