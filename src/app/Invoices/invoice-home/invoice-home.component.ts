import { Component } from '@angular/core';
import { InvoiceDashboardComponent } from '../invoice-dashboard/invoice-dashboard.component';

@Component({
  selector: 'app-invoice-home',
  standalone: true,
  imports: [
    InvoiceDashboardComponent
  ],
  templateUrl: './invoice-home.component.html',
  styleUrl: './invoice-home.component.css'
})
export class InvoiceHomeComponent {

  toggleGenerateInvoice(){
    console.log("invoice-home");
  }
}
