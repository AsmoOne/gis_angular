import { Component, OnInit } from '@angular/core';
import { TripService } from '../services/trip.service';
import { Trip } from '../trip';
import {GuiColumn, GuiDataType, GuiPaging, GuiPagingDisplay, GuiSorting } from '@generic-ui/ngx-grid';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit {

  loading: boolean = true;

  columns: Array<GuiColumn> = [
    {
      header: 'ID',
      field: 'id',
      sorting: true,
      type: GuiDataType.NUMBER
    },
    {
      header: 'Driver ID',
      field: 'driver_id',
      sorting: true,
      type: GuiDataType.NUMBER
    },
    {
      header: 'Pickup',
      field: 'pickup',
      sorting: true,
      type: GuiDataType.DATE,
      view: (date) =>{ return date.toLocaleString()},

    },
    {
      header: 'Dropoff',
      field: 'dropoff',
      sorting: true,
      view: (date) =>{ return date.toLocaleString()},
    }
  ]

  sorting: GuiSorting = {
    enabled: true,
  }

  pagination: GuiPaging = {
    page: 1,
    pageSize: 10,
    pageSizes: [10, 25, 50],
    pagerTop: false,
    display: GuiPagingDisplay.ADVANCED
  }

  service: TripService;
  trips: Trip[] = [];

  constructor(tripService: TripService) {
    this.service = tripService;
  }

  ngOnInit(): void {
    this.showTrips();
  }

  showTrips() {
    this.service.listTrips().subscribe(tr => {
      this.trips = tr;
      this.loading = false;
    });
  }

  // source: Array<any> = [
  //   {
  //     id: 1,
  //     driver_id: 2,
  //     pickup: '020-11-20T08:17:00.000000Z',
  //     dropoff: '2020-11-20T08:57:01.000000Z',
  //   }
  // ]
}
