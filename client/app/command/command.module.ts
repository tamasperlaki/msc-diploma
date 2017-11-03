import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MatCardModule, MatTableModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatIconModule } from '@angular/material';
import { CommandComponent } from './command.component';
import { CommandService } from './command.service';
import { CommandsResolverGuard } from './commands-resolver.guard';

@NgModule({
  imports: [
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  declarations: [CommandComponent],
  providers: [CommandService, CommandsResolverGuard]
})
export class CommandModule { }
