import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { timesheet } from '../models/timesheet';
import { timesheetDetail } from '../models/timesheet-detail';

@Injectable({
  providedIn: 'root'
})
export class DataServiceRouteService {

  constructor(private httpClient: HttpClient) { }

  apiUrl:string ="http://127.0.0.1:8000/api";

  fetchDataTimesheet(skip: number, take: number){
    return this.httpClient.get<timesheet>(this.apiUrl+"/dashboard?skip="+skip+"&take="+take);
  }

  storeManualTimesheet(timesheet: timesheet){
    return this.httpClient.post<{timesheet_id:any}>(this.apiUrl+"/timesheets", timesheet);
  }

  getTimesheetById(id: any) {
    return this.httpClient.get<timesheetDetail>(this.apiUrl+"/dashboard/"+id);
  }

  addManualRow(id:number ,timesheetDetail: timesheetDetail){
    return this.httpClient.post<timesheetDetail>(this.apiUrl+"/dashboard/"+id, timesheetDetail)
  }

  editTimesheet(timesheet_id:any, timesheet_detail_id:any, timesheet_detail: any){
    console.log(timesheet_id,timesheet_detail_id,timesheet_detail)
   
    const baseUrl = this.apiUrl+"/dashboard/"+timesheet_id+"/edittimesheet/"+timesheet_detail_id+"/update";
    console.log(baseUrl);
    return this.httpClient.put<timesheetDetail>(baseUrl,timesheet_detail)
  }

  fetchDataTimesheetDetails(){

  }

  fetchCsvDatas(fileId:any, timesheetId:any, no_of_rows:any){
    return this.httpClient.get<timesheetDetail>(this.apiUrl+"/dashboard/"+fileId+"/"+timesheetId+"/"+no_of_rows);
  }

  storeCsvTimesheet(data: any){
    return this.httpClient.post<{file_id:number, csv_data:any[], timesheet_id:number, no_of_rows:number}>(this.apiUrl+"/dashboard/upload-csv", data);
  }


}
