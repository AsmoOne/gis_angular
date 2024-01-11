import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DriversService {

  url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<number[]>(this.url + '/api/drivers');
  }

  calculateDriversTime(driversList: number[])
  {
      return this.http.post<any[]>(this.url + '/api/calculate', driversList);
  }
}
