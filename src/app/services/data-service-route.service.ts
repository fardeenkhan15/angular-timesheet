import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  storeManualTimesheet(timesheet: any){
    return this.httpClient.post<any>(this.apiUrl+"/timesheets", timesheet);
  }

  getTimesheetById(id: number) {
    return this.httpClient.get<timesheetDetail>(this.apiUrl+"/dashboard/"+id);
  }

  addManualRow(){

  }

  fetchDataTimesheetDetails(){

  }

  storeCsvTimesheet(){
    
  }

}
