import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { VideoJSRecordComponent } from './videojs.record.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    VideoJSRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [VideoJSRecordComponent]
})
export class AppModule { }
