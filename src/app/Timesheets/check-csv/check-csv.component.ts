import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataToCsvService } from '../../services/data-to-csv.service';
import { GridModule } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-check-csv',
  standalone: true,
  imports: [
    GridModule,
  ],
  templateUrl: './check-csv.component.html',
  styleUrl: './check-csv.component.css'
})
export class CheckCsvComponent {
  activatedRoute = inject(ActivatedRoute);
  dataFrom = inject(DataToCsvService);
  timesheetDatas:any;
  timesheetId:any;
  fileId:any;
  noOfRows:any;

  ngOnInit(): void {
    this.dataFrom.data.subscribe((data)=>{
      this.timesheetDatas = data.csv_data;
      this.timesheetId = data.timesheet_id;
      this.fileId = data.file_id;
      this.noOfRows = data.no_of_rows;
      console.log(this.timesheetDatas);
    })
  }
}
