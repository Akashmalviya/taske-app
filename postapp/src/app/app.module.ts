import { SharedProvidersModule } from './shared/shared.providers.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,

      ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

     SharedProvidersModule.forRoot(),
     HttpClientModule,
     ToastrModule.forRoot()


  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
