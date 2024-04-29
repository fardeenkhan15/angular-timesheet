import { Component, ViewChild } from '@angular/core';
import { InvoiceDashboardComponent } from '../invoice-dashboard/invoice-dashboard.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-invoice-home',
  standalone: true,
  imports: [
    InvoiceDashboardComponent,
    InvoiceHomeComponent,
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent
  ],
  templateUrl: './invoice-home.component.html',
  styleUrl: './invoice-home.component.css'
})
export class InvoiceHomeComponent {

  isCollapsed : boolean = false;
  newInvoiceForm !: FormGroup;

  @ViewChild('invoiceDashboard') invoiceDashboard !: InvoiceDashboardComponent;

  constructor(
    private formBuilder : FormBuilder,
  ){
    this.newInvoiceForm = this.formBuilder.group({
      workerName: ['', Validators.required],
      workerId: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      totalAmount: ['', Validators.required],
      organisation: ['', Validators.required],
      timesheet_id: [0],
    });  
  }

  toggleGenerateInvoice(){
    console.log("invoice-home");
    this.isCollapsed = !this.isCollapsed;
  }

  addNewInvoice(){
    // this.gridLoading = true;
    // this.invoiceDashboard.gridLoading = true;
    console.log(this.newInvoiceForm.value.workerName);
    this.invoiceDashboard.gridLoading = true;

  }


}
