import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AnonymHomeModule } from './anonym-home/anonym-home.module';
import { AuthenticatedHomeModule } from './authenticated-home/authenticated-home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    AnonymHomeModule,
    AuthenticatedHomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
