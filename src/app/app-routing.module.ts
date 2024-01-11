import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriversComponent } from './drivers/drivers.component';
import { TripsComponent } from './trips/trips.component';

const routes: Routes = [
  {path: '', redirectTo: '/trips', pathMatch: 'full'},
  {path: 'trips', component: TripsComponent},
  {path: 'drivers', component: DriversComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
