import { Component, inject } from '@angular/core';
import { GridComponent, GridModule, PageChangeEvent, GridDataResult, CancelEvent, EditEvent,RemoveEvent, SaveEvent, AddEvent, } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, GroupDescriptor, GroupResult, SortDescriptor, filterBy, groupBy, orderBy, process, State } from '@progress/kendo-data-query';
import { DataServiceRouteService } from '../../services/data-service-route.service';
import { filter, take } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { timesheetDetail } from '../../models/timesheet-detail';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-timesheet-detail',
  standalone: true,
  imports: [GridModule, FormsModule, CommonModule, ReactiveFormsModule,InputsModule],
  templateUrl: './timesheet-detail.component.html',
  styleUrl: './timesheet-detail.component.css',
})
export class TimesheetDetailComponent {
  groups: GroupDescriptor[] = [];
  timesheetDetail: any[] = [];
  gridData: any = { data: [], total: 0 };
  user: string = '';
  gridloading = false;
  timesheetId: number = 0;
  router = inject(Router);
  public formGroup : any;
  private editedRowIndex ?: number;
  formData:FormData = new FormData();

  getTimesheetDetail : any;

  grid: any | GridDataResult = {
    data: [],
    total: 0,
  };

  filter: CompositeFilterDescriptor = {
    logic: 'and',
    filters: [],
  };

  sort: SortDescriptor[] = [];

  dataService = inject(DataServiceRouteService);
  pageSize = 10;
  skip = 0;

  total = 0;

  ngOnInit() {
    this.loadItem();
  }

  pageChange(event: any) {
    this.skip = event.skip;
    this.pageSize = event.take;
    this.loadItem();
  }

  groupChange(groups: any) {
    this.groups = groups;
    this.groupItem();
  }

  filterChange(filter: CompositeFilterDescriptor) {
    this.filter = {
      logic: filter.logic,
      filters: filter.filters,
    };
    this.filterItem();
  }

  sortChange(sort: any) {
    this.sort = sort;
    this.sortItem();
  }

  sortItem() {
    this.grid = {
      data: orderBy(this.timesheetDetail, this.sort),
      total: this.total,
    };
  }

  filterItem() {
    console.log(filter);
    this.grid = {
      data: filterBy(this.timesheetDetail, this.filter),
      total: this.total,
    };
    console.log(this.grid);
  }

  groupItem() {
    if (this.groups.length == 0) {
      this.loadItem();
    }
    this.grid = groupBy(this.timesheetDetail, this.groups);
  }
  activatedRoute = inject(ActivatedRoute);

  loadItem() {
    this.timesheetId = this.activatedRoute.snapshot.params['id'];
    console.log(this.timesheetId);
    this.gridloading = true;
    this.dataService
      .getTimesheetById(this.skip, this.pageSize, this.timesheetId)
      .subscribe({
        next:(result)=>{
          this.getTimesheetDetail = result;
          console.log(this.getTimesheetDetail.csv_flag);
            this.timesheetDetail = result.timesheet_detail;
            this.user = result.user;
            this.total = result.total;
            console.log(this.timesheetDetail);

            this.grid = {
              data: this.timesheetDetail,
              total: this.total,
            };
            console.log(this.grid);
            this.gridloading = false;
        },
        error:(msg)=>{
          console.log(msg);
          this.gridloading = false;
          this.router.navigate(['']);
        }
      }
    )

      // .subscribe((response) => {
      //   console.log(response);
      //   this.timesheetDetail = response.timesheet_detail;
      //   this.user = response.user;
      //   this.total = response.total;
      //   console.log(this.timesheetDetail);

      //   this.grid = {
      //     data: this.timesheetDetail,
      //     total: this.total,
      //   };
      //   console.log(this.grid);
      //   this.gridloading = false;
      // });
  }
  timesheets_name: string = '';
  csv_flag: number = 1;

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
      hours_worked: ['', Validators.required],
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
      console.log('row added', this.addRowForm.value);
      console.log('timesheet', this.timesheetId);
      this.gridloading = true;
      this.skip = 0;
      this.dataService
        .addManualRow(this.timesheetId, this.addRowForm.value)
        .subscribe((result : any) => {
          // this.timesheetDetail = result?.details_data ? result.details_data : [];
          // this.gridloading = false;
          this.loadItem();
        });
        this.showAddRowForm = !this.showAddRowForm;
        this.addRowForm.reset();
    }
  }

  public editHandler(args: EditEvent){

    // Starts an Inline Edit Form
    const { dataItem } = args;
    this.closeEditor(args.sender);

    console.log(this.timesheetId  )

    this.formGroup = new FormGroup({
      id: new FormControl(dataItem.id, Validators.required),
      timesheet_id: new FormControl(dataItem.timesheet_id, Validators.required),
      worker_name: new FormControl(dataItem.worker_name, Validators.required),
      worker_id: new FormControl(dataItem.worker_id, Validators.required),
      organisation: new FormControl(dataItem.organisation, Validators.required),
      hourly_pay: new FormControl(dataItem.hourly_pay, Validators.required),
      hours_worked: new FormControl(dataItem.hours_worked, Validators.required),
    })

    this.editedRowIndex = args.rowIndex;
    args.sender.editRow(args.rowIndex, this.formGroup);

  }

  public saveHandler(args: SaveEvent){
    if(args.isNew === false){
      const updatedData = {
        id: this.formGroup.value.id,
        timesheet_id: this.formGroup.value.timesheet_id,
        worker_name: this.formGroup.value.worker_name,
        worker_id: this.formGroup.value.worker_id,
        organisation: this.formGroup.value.organisation,
        hourly_pay: this.formGroup.value.hourly_pay,
        hours_worked: this.formGroup.value.hours_worked,
        timesheet_detail_date: this.formGroup.value.timesheet_detail_date
      };
      console.log("formData",updatedData);
      this.dataService
          .editTimesheet(args.dataItem.timesheet_id,args.dataItem.id,updatedData)
          .subscribe((result)=>{
            console.log(result);
            this.closeEditor(args.sender);
            this.loadItem();
          })
    }
  }
  public removeHandler(event: RemoveEvent) {
    // remove the current dataItem from the current data source
    // in this example, the dataItem is `editService`
    // this.dataService.remove(args.dataItem);
    console.log("delete");
    this.dataService.deleteTimesheet( event.dataItem.timesheet_id,event.dataItem.id).subscribe((result) => {
      console.log(result);
      this.loadItem();
    })
  }


  public cancelHandler(args: CancelEvent): void {
    this.closeEditor(args.sender, args.rowIndex);
  }


  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    // close the editor
    grid.closeRow(rowIndex);
    // reset the helpers
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

}
