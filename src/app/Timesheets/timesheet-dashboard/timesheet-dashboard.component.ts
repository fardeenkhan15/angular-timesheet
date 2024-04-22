import { Component, inject } from '@angular/core';
import { DataServiceRouteService } from '../../services/data-service-route.service';
import { timesheet } from '../../models/timesheet';
import { TimesheetGridComponent } from './timesheet-grid/timesheet-grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheet-dashboard',
  standalone: true,
  imports: [
    GridModule, TimesheetGridComponent, ReactiveFormsModule, NgClass],
  templateUrl: './timesheet-dashboard.component.html',
  styleUrl: './timesheet-dashboard.component.css'
})
export class TimesheetDashboardComponent {
  manualTimesheetForm: FormGroup;
  uploadCsvForm: FormGroup;
  showManualCreation = false;
  showUploadCSV = false;
  router = inject(Router)
  timesheets:any[] = []
  user:string = ""
  dataService = inject(DataServiceRouteService)

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
        this.router.navigateByUrl("/")
      })
    }
  }
 
  onUploadCSVSubmit() {
    if (this.uploadCsvForm.valid) {
      // Handle CSV upload submission
      this.manualTimesheetForm.value['created_by'] = "1";
      this.manualTimesheetForm.value['upload_type_csv'] = "0";
      console.log(this.uploadCsvForm.value);
      
    }
  }
 
  viewTimesheet(timesheetId: number) {
    // Handle timesheet detail view
    console.log(`View timesheet with ID: ${timesheetId}`);
  }

}
