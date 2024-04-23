import { Component, inject } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, GroupDescriptor, GroupResult, SortDescriptor, filterBy, groupBy, orderBy, process } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { DataServiceRouteService } from '../../services/data-service-route.service';
import { filter } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { timesheetDetail } from '../../models/timesheet-detail';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-timesheet-detail',
  standalone: true,
  imports: [GridModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './timesheet-detail.component.html',
  styleUrl: './timesheet-detail.component.css'
})
export class TimesheetDetailComponent {
  groups:GroupDescriptor[] = [];
  timesheetDetail:any[] = []
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
      data: orderBy(this.timesheetDetail,this.sort),
      total: this.total
    }
  }

  filterItem(){
    console.log(filter)
    this.grid = {
      data: filterBy(this.timesheetDetail, this.filter),
      total: this.total
    }
    console.log(this.grid)
  }

  groupItem(){
    if(this.groups.length == 0){
      this.loadItem();
    }
    this.grid = groupBy(this.timesheetDetail, this.groups);
  }
  activatedRoute = inject(ActivatedRoute);

  loadItem(){
    let timesheetId = this.activatedRoute.snapshot.params['id'];
    this.gridloading = true;
    this.dataService.getTimesheetById(timesheetId).subscribe((response)=>{
      console.log(response)
      this.timesheetDetail = response.timesheet_detail;
      this.user = response.user;
      this.total = response.total;
      console.log(this.timesheetDetail);

      this.grid = {
        data: this.timesheetDetail,
        total: this.total
      }
      console.log(this.grid)
      this.gridloading = false;
    })

  }
  addRow(){
      
  }
  timesheetName: string = '';
  csvFlag: number = 0;

  showAddRowForm: boolean = false;
  addRowForm: FormGroup;

  // private modalService = inject(NgbModal);
  private fb = inject(FormBuilder);

  constructor() {
    this.addRowForm = this.fb.group({
      worker_name: ['', Validators.required],
      worker_id: ['', Validators.required],
      timesheet_detail_date: ['', Validators.required],
      organisation: ['', Validators.required],
      hourly_pay: ['', Validators.required],
      hours_worked: ['', Validators.required]
    });
  }

  toggleAddRowForm() {
    this.showAddRowForm = !this.showAddRowForm;
    if (!this.showAddRowForm) {
      this.addRowForm.reset();
    }
  }

  onAddRow() {
    if (this.addRowForm.valid) {
      this.dataService
    }
  }

  onEditTimesheet(timesheetDetailId: number) {
    // Navigate to the edit timesheet route
  }

  onFinalizeTimesheet(timesheetDetailId: number) {
    // Finalize the timesheet entry
  }

//   openDeleteModal(content: any, timesheetDetailId: number) {
//     this.modalService.open(content, { ariaLabelledBy: 'deleteModalLabel' }).result.then(
//       (result) => {
//         if (result === 'Yes') {
//           // Delete the timesheet entry
//         }
//       },
//       (reason) => {
//         // Dismiss the modal
//       }
//     );
//   }
 }