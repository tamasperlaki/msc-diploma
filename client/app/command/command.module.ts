import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatListModule
} from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { CommandComponent } from './command.component';
import { CommandEditorDialogComponent } from './commands-editor/command-editor-dialog/command-editor-dialog.component';
import { CommandsEditorService } from './commands-editor/commands-editor.service';
import { CommandsEditorComponent } from './commands-editor/commands-editor.component';
import { CommandTimersService } from './command-timers/command-timers.service';
import { CommandTimersComponent } from './command-timers/command-timers.component';
import { CommandAliasesService } from './command-aliases/command-aliases.service';
import { CommandsResolverGuard } from './commands-resolver.guard';
import { TimersResolverGuard } from './timers-resolver.guard';
import { AliasesResolverGuard } from './aliases-resolver.guard';
import { CommandTimersEditorDialogComponent } from './command-timers/command-timers-editor-dialog/command-timers-editor-dialog.component';
import { CommandAliasesComponent } from './command-aliases/command-aliases.component';

@NgModule({
  imports: [
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule
  ],
  declarations: [
    CommandComponent,
    CommandEditorDialogComponent,
    CommandsEditorComponent,
    CommandTimersComponent,
    CommandTimersEditorDialogComponent,
    CommandAliasesComponent
  ],
  entryComponents: [
    CommandEditorDialogComponent,
    CommandTimersEditorDialogComponent
  ],
  providers: [
    CommandsEditorService,
    CommandTimersService,
    CommandAliasesService,
    CommandsResolverGuard,
    TimersResolverGuard,
    AliasesResolverGuard
  ]
})
export class CommandModule {}
