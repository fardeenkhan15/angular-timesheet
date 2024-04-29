import { Routes } from '@angular/router';
import { TimesheetDashboardComponent } from './Timesheets/timesheet-dashboard/timesheet-dashboard.component';
import { TimesheetDetailComponent } from './Timesheets/timesheet-detail/timesheet-detail.component';
import { InvoiceHomeComponent } from './Invoices/invoice-home/invoice-home.component';
import { CheckCsvComponent } from './Timesheets/check-csv/check-csv.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { SetPasswordComponent } from './components/users/set-password/set-password.component';

export const routes: Routes = [

  { path: '', redirectTo: "register", pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'set-password/:token', component: SetPasswordComponent },
  {
    path: "timesheet",
    component:TimesheetDashboardComponent
  },
  {
    path: "timesheet/:id",
    component:TimesheetDetailComponent
  },
  {
    path: "invoices",
    component : InvoiceHomeComponent
  },
  {
    path: "timesheet/check-csv/:fileId/:timesheetId/:noOfRows",
    component : CheckCsvComponent
  },
  { path: '**', component: RegisterComponent }


];
