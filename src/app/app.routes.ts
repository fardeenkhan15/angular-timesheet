import { Routes } from '@angular/router';
import { TimesheetDashboardComponent } from './Timesheets/timesheet-dashboard/timesheet-dashboard.component';
import { TimesheetDetailComponent } from './Timesheets/timesheet-detail/timesheet-detail.component';
import { InvoiceHomeComponent } from './Invoices/invoice-home/invoice-home.component';

export const routes: Routes = [

  {
    path:"",
    component: TimesheetDashboardComponent
  },
  {
    path: "timesheet/:id",
    component:TimesheetDetailComponent
  },
  {
    path: "invoices",
    component : InvoiceHomeComponent
  }


];
