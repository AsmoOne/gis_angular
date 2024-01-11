import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../trip';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TripService {

  url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  listTrips() {
    return this.http.get<Trip[]>(this.url + '/api/trips').pipe(
      map(trip => trip.map(t => {
        t.pickup = new Date(t.pickup);
        t.dropoff = new Date(t.dropoff);
        return t;
      })))
  }

}
