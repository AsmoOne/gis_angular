import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { HttpClientModule } from '@angular/common/http';
import { GuiGridModule } from '@generic-ui/ngx-grid';
import { DriversComponent } from './drivers/drivers.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    DriversComponent
  ],
  imports: [
    BrowserModule,
    GuiGridModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    //provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
