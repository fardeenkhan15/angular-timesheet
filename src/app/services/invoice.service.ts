import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private httpClient : HttpClient
  ) {}

  getAllInvoices(skip:number, take:number){
    const allInvoices = `http://127.0.0.1:8000/api/invoice?skip=${skip}&take=${take}`;

    return this.httpClient.get<any>(allInvoices);
  }

  editInvoice(id:number, invoiceData:any[]){

    const editInvoice = `http://127.0.0.1:8000/api/invoice/edit?id=${id}&data=${invoiceData}`

    return this.httpClient.get<any>(editInvoice);
  }


  deleteInvoice(id:any){
    const removeInvoice = `http://127.0.0.1:8000/api/invoice/delete?invoiceId=${id}`

    return this.httpClient.get<any>(removeInvoice);
  }


  generatePdf(id: any){
    const generatePdf = `http://127.0.0.1:8000/api/invoice/generate-pdf?id=${id}`;

    return this.httpClient.get<any>(generatePdf);

  }

  viewPdf(id: any) {
    const viewPdf = `http://127.0.0.1:8000/api/invoice/view-pdf?id=${id}`;

    const headers = new HttpHeaders();

    return this.httpClient.get<Blob>(viewPdf, {headers: headers, responseType: 'blob' as 'json'});

  }

  downloadPdf(id: any) {
    const downloadPdf = `http://127.0.0.1:8000/api/invoice/download-pdf?id=${id}`;

    return this.httpClient.get<any>(downloadPdf, {responseType: 'blob' as 'json'});
  }

  deletePdf(id: any) {
    const deletePdf = `http://127.0.0.1:8000/api/invoice/delete-pdf?id=${id}`;

    return this.httpClient.get<any>(deletePdf);
  }


  createInvoice(invoiceData:any){
    
    // const createInvoice = `http://127.0.0.1:8000/api/invoice/create?id=${id}&data=${invoiceData}`

    return this.httpClient.post<any>('http://127.0.0.1:8000/api/invoices/create', { data:invoiceData});
  }

  sendMail(id: any) {
    const sendMail = `http://127.0.0.1:8000/api/email-invoice?id=${id}`;

    return this.httpClient.get<any>(sendMail);
  }

}
