import { Component, inject } from '@angular/core';
import { DataServiceRouteService } from '../../../services/data-service-route.service';
import { timesheet } from '../../../models/timesheet';
import { GridModule } from '@progress/kendo-angular-grid';
import { GridData } from '../../../models/griddata';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, GroupDescriptor, GroupResult, SortDescriptor, filterBy, orderBy, process } from '@progress/kendo-data-query';
import { groupBy } from '@progress/kendo-data-query';
import { and } from '@progress/kendo-angular-grid/utils';
import { filter } from '@progress/kendo-data-query/dist/npm/transducers';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ViewChild, NgZone, AfterViewInit } from "@angular/core";
import { take } from 'rxjs';

@Component({
  selector: 'app-timesheet-grid',
  standalone: true,
  imports: [
    GridModule, ReactiveFormsModule, NgClass
  ],
  templateUrl: './timesheet-grid.component.html',
  styleUrl: './timesheet-grid.component.css'
})
export class TimesheetGridComponent {
  manualTimesheetForm: FormGroup;
  uploadCsvForm: FormGroup;
  showManualCreation = false;
  showUploadCSV = false;
  groups:GroupDescriptor[] = [];
  timesheets:any[] = []
  gridData:any = {data:[], total: 0};
  user:string = "";
  gridloading = false;

  grid: any|GridDataResult = {
    data: [],
    total: 0
  };

  filter: CompositeFilterDescriptor = {
    logic: "and",
    filters: [],
  }

  sort: SortDescriptor[] = [];

  dataService = inject(DataServiceRouteService)
  pageSize = 10;
  skip = 0;

  total = 0;
  ngZone: any;

  ngOnInit(){
    this.loadItem();
  }

  pageChange(event: any){
    this.skip = event.skip;
    this.pageSize = event.take;
    this.loadItem();
  }

  groupChange(groups: any){
    this.groups = groups;
    this.groupItem();
  }

  filterChange(filter: CompositeFilterDescriptor){
    this.filter={
      logic:filter.logic,
      filters:filter.filters
    }
    this.filterItem();
  }

  sortChange(sort: any){
    this.sort = sort;
    this.sortItem();
  }
  sortItem(){
    this.grid = {
      data: orderBy(this.timesheets,this.sort),
      total: this.total
    }
  }

  filterItem(){
    console.log(filter)
    this.grid = {
      data: filterBy(this.timesheets, this.filter),
      total: this.total
    }
    console.log(this.grid)
  }

  groupItem(){
    if(this.groups.length == 0){
      this.loadItem();
    }
    this.grid = groupBy(this.timesheets, this.groups);
  }

  loadItem(){
    this.gridloading = true;
    this.dataService.fetchDataTimesheet(this.skip, this.pageSize).subscribe((response)=>{
      this.timesheets = response.timesheets;
      this.user = response.user;
      this.total = response.total;
      console.log(this.timesheets);

      this.grid = {
        data: this.timesheets,
        total: this.total
      }
      console.log(this.grid)
      this.gridloading = false;
    })

  }
  private fb = inject(FormBuilder);
 
  constructor() {
    this.manualTimesheetForm = this.fb.group({
      timesheet_name: ['', Validators.required],
      timesheet_date: ['', Validators.required]
    });
 
    this.uploadCsvForm = this.fb.group({
      timesheet_name: ['', Validators.required],
      timesheet_date: ['', Validators.required],
      file_upload: [null, Validators.required]
    });
  }
 
  toggleManualCreation() {
    this.showManualCreation = !this.showManualCreation;
    this.showUploadCSV = false;
  }
 
  toggleUploadCSV() {
    this.showUploadCSV = !this.showUploadCSV;
    this.showManualCreation = false;
  }
 
  onManualTimesheetSubmit() {
    if (this.manualTimesheetForm.valid) {
      // Handle manual timesheet submission
      console.log(this.manualTimesheetForm.value);
    }
  }
 
  onUploadCSVSubmit() {
    if (this.uploadCsvForm.valid) {
      // Handle CSV upload submission
      console.log(this.uploadCsvForm.value);
    }
  }
 
  viewTimesheet(timesheetId: number) {
    // Handle timesheet detail view
    console.log(`View timesheet with ID: ${timesheetId}`);
  }
  
}

