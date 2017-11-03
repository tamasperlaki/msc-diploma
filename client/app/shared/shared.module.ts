import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AuthService } from './auth/auth.service';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  declarations: [PageNotFoundComponent],
  exports: [
    PageNotFoundComponent,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule {
}
