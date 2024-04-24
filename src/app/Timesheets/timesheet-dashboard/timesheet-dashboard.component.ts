import { Component, inject } from '@angular/core';
import { DataServiceRouteService } from '../../services/data-service-route.service';
import { timesheet } from '../../models/timesheet';
import { TimesheetGridComponent } from './timesheet-grid/timesheet-grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { DataToCsvService } from '../../services/data-to-csv.service';

@Component({
  selector: 'app-timesheet-dashboard',
  standalone: true,
  imports: [
    GridModule,
    TimesheetGridComponent,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './timesheet-dashboard.component.html',
  styleUrl: './timesheet-dashboard.component.css'
})
export class TimesheetDashboardComponent {
  manualTimesheetForm: FormGroup;
  uploadCsvForm: FormGroup;
  showManualCreation = false;
  showUploadCSV = false;
  router = inject(Router)
  dataToSend = inject(DataToCsvService)
  dataFromFile:any;
  timesheets:any[] = []
  user:string = ""
  dataService = inject(DataServiceRouteService)
  timesheetId:any;
  formData:FormData = new FormData();
  file:any;

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
      this.manualTimesheetForm.value['created_by'] = "0";
      this.manualTimesheetForm.value['upload_type_csv'] = "0";
      this.dataService.storeManualTimesheet(this.manualTimesheetForm.value).subscribe(result => {
        this.timesheetId = result.timesheet_id;
        console.log(result.timesheet_id)
        this.router.navigateByUrl("timesheet/"+this.timesheetId);
      })
    }
  }

  onUploadCSVSubmit() {
    if (this.uploadCsvForm.valid) {
      // this.formData.append('file_upload', file, file.name);
      // Handle CSV upload submission
      // this.uploadCsvForm.value['created_by'] = "1";
      // this.uploadCsvForm.value['upload_type_csv'] = "0";
      // this.uploadCsvForm.value['file_upload'] = this.file;

      // this.formData.append('created_by',"1");
      // this.formData.append('upload_type_csv',"1");
      // this.formData.append('timesheet_name',this.uploadCsvForm.value['timesheet_name']);
      // this.formData.append('timesheet_date',this.uploadCsvForm.value['timesheet_date']);

      console.log(this.uploadCsvForm.value);

      this.formData.append('file_upload',this.file, this.file.name)
      this.formData.append('timesheet_name',this.uploadCsvForm.value['timesheet_name'])
      this.formData.append('timesheet_date',this.uploadCsvForm.value['timesheet_date'])
      this.formData.append('created_by',"1")
      this.formData.append('upload_type_csv',"1")

      this.dataService.storeCsvTimesheet(this.formData).subscribe((result:any) => {
        this.dataFromFile = result;
        this.dataToSend.setData(this.dataFromFile);
        this.router.navigateByUrl("timesheet/check-csv/"+result.file_id);
      })

    }
  }

  onFileDropped(event:any){
    this.file = event.target.files[0];
    console.log(this.file);
  }

}
