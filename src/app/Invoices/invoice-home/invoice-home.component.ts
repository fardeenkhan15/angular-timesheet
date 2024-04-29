import { Component, ViewChild } from '@angular/core';
import { InvoiceDashboardComponent } from '../invoice-dashboard/invoice-dashboard.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { InvoiceService } from '../../services/invoice.service';

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
    private invoiceService: InvoiceService
  ){
    this.newInvoiceForm = this.formBuilder.group({
      worker_name: ['', Validators.required],
      worker_id: ['', Validators.required],
      invoice_date: ['', Validators.required],
      total_amount: ['', Validators.required],
      organisation: ['', Validators.required],
      timesheet_id: [0],
    });  
  }

  toggleGenerateInvoice(){
    console.log("invoice-home");
    this.isCollapsed = !this.isCollapsed;
  }

  addNewInvoice(){
    this.invoiceDashboard.gridLoading= true;
    console.log(this.newInvoiceForm.value)
    this.invoiceService.createInvoice(this.newInvoiceForm.value).subscribe({
      next:(response)=>{
        this.invoiceDashboard.loadInvoices(this.invoiceDashboard.skip, this.invoiceDashboard.take);
        this.isCollapsed = !this.isCollapsed;
        this.invoiceDashboard.gridLoading=false;
      }
    })
    // this.gridLoading = true;
    // this.invoiceDashboard.gridLoading = true;
    // console.log(this.newInvoiceForm.value.workerName);
    // this.invoiceDashboard.gridLoading = true;

  }


}
