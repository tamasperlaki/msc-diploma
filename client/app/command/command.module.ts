import { NgModule } from '@angular/core';

import { SharedModule } from "../shared/shared.module";
import { CommandComponent } from './command.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [CommandComponent]
})
export class CommandModule { }
