import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { CommandComponent } from './command.component';
import { CommandService } from './command.service';
import { CommandsResolverGuard } from './commands-resolver.guard';
import { CommandEditorDialogComponent } from './command-editor-dialog/command-editor-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: [
    CommandComponent,
    CommandEditorDialogComponent
  ],
  entryComponents: [
    CommandEditorDialogComponent
  ],
  providers: [
    CommandService,
    CommandsResolverGuard
  ]
})
export class CommandModule { }
