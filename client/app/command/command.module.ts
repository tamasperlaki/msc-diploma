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
import { CommandsResolverGuard } from './commands-resolver.guard';
import { TimersResolverGuard } from './timers-resolver.guard';
import { CommandTimersEditorDialogComponent } from './command-timers/command-timers-editor-dialog/command-timers-editor-dialog.component';

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
    CommandTimersEditorDialogComponent
  ],
  entryComponents: [
    CommandEditorDialogComponent,
    CommandTimersEditorDialogComponent
  ],
  providers: [
    CommandsEditorService,
    CommandTimersService,
    CommandsResolverGuard,
    TimersResolverGuard
  ]
})
export class CommandModule {}
