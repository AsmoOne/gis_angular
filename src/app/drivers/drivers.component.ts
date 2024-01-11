import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { GuiColumn, GuiDataType, GuiGridComponent, GuiPaging, GuiPagingDisplay, GuiRowSelection, GuiRowSelectionMode, GuiRowSelectionType, GuiSelectedRow, GuiSorting } from '@generic-ui/ngx-grid';
import { DriversService } from '../services/drivers.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css',
})
export class DriversComponent implements OnInit, AfterViewInit {

  service: DriversService;

  drivers: any[] = [];
  loading: boolean = false;

  columns: Array<GuiColumn> = [
    {
      header: 'Driver ID',
      field: 'driver_id',
      sorting: true,
      type: GuiDataType.NUMBER
    },
    {
      header: 'Payed time',
      field: 'total_minutes_with_passenger',
      // field: (id) => {
      //   return 'test';
      // },
      sorting: true,
      type: GuiDataType.NUMBER,
      formatter: (v) => v.toFixed(2),
    },
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

  rowSelection: boolean | GuiRowSelection = {
    enabled: true,
    type: GuiRowSelectionType.CHECKBOX,
    mode: GuiRowSelectionMode.MULTIPLE,
  };

  @ViewChild('grid', { static: false })
  gridComponent!: GuiGridComponent;

  constructor(service: DriversService) {
    this.service = service;
  }

  csvlink: string = environment.API_URL + '/csv';

  ngAfterViewInit(): void {

  }

  // onSelectRow(ev: GuiSelectedRow[]){
  //   console.log(ev);
  //  this.drivers[0].total_minutes_with_passenger = 4;
  // }

  ngOnInit(): void {

    this.loading = true;

    this.service.list().subscribe(drivers => {
      let arrDrivers: any[] = [];
      drivers.forEach((driver) => {
        arrDrivers.push({
          driver_id: driver,
          total_minutes_with_passenger: 0,
        });
      });

      this.drivers = arrDrivers;
      this.loading = false;
    })
  }

  onEditSource(obj: any) {
    console.log(obj);
  }

  onClickCalculate(ev: any) {
    this.loading = true;
    const selectedRows = this.gridComponent.api.getSelectedRows();

    const selectedDrivers: number[] = [];
    selectedRows.forEach((item: GuiSelectedRow) => {
      selectedDrivers.push(item.source.driver_id);
    });


    this.service.calculateDriversTime(selectedDrivers).subscribe(response => {
      response.forEach(element => {
        const driver = this.drivers.find(driver => driver.driver_id == element.driver_id);
        driver.total_minutes_with_passenger = element.total_minutes_with_passenger;
      });

      this.gridComponent.api.setSource(this.drivers);
      this.loading = false;
    });
  }

}
