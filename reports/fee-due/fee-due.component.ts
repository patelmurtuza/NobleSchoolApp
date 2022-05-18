import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MasterService } from '../../services/master.service';
import { ServiceClientService } from '../../services/serviceclient.service';

@Component({
  selector: 'app-fee-due',
  templateUrl: './fee-due.component.html',
  styleUrls: ['./fee-due.component.scss']
})
export class FeeDueComponent implements OnInit {

  constructor(private client: ServiceClientService, private master: MasterService) { }

  academicYear: string[] = [];
  grade: string[] = [];
  response: any[] = [];
  tabArray: string[] = [];
  tabName: string = 'Nursery';
  tabIndex: number = 0;
  table: any = { rows: [], columns: [
    { columnDef: 'studentName', header: 'Student Name' },
    { columnDef: 'rollNo', header: 'Roll No' },
    { columnDef: 'section', header: 'Section' },
    { columnDef: 'emailAddress', header: 'Email Address' },
    { columnDef: 'mobileNo', header: 'Mobile No' },
    { columnDef: 'recieptAmt', header: 'Reciept Amount' },
    { columnDef: 'recieptType', header: 'Reciept Type' },
  ] };
  total: number = 0;

  ngOnInit(): void {
    this.academicYear = this.master.getAcademicYear();
    this.grade = this.master.getGrade();
    for (let i = 0; i < this.academicYear.length; i++) {
      this.tabArray.push('Nursery');
    }
    this.client.getRequest('Fee/StudentDueFee', { academicYear: this.academicYear[0] }).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.response = response.responseObj.studentDueFeeObj;
        this.table.rows = this.response.filter(x => x.gradeDescription == this.tabName);
        this.table = {... this.table};
        this.total = this.table.rows.reduce((sum:number, current:any) => sum + current.recieptAmt, 0);
      }
    });
  }

  tabYear(tab: MatTabChangeEvent) {
    this.tabIndex = tab.index;
    this.tabName = this.tabArray[this.tabIndex];
    this.client.getRequest('Fee/StudentDueFee', { academicYear: tab.tab.textLabel }).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.response = response.responseObj.studentDueFeeObj;
      }
      else {
        this.response = [];
      }
      this.table.rows = this.response.filter(x => x.gradeDescription == this.tabName);
      this.table = {... this.table};
      this.total = this.table.rows.reduce((sum:number, current:any) => sum + current.recieptAmt, 0);
    });
  }

  tabGrade(tab: MatTabChangeEvent) {
    this.tabName = this.tabArray[this.tabIndex] = tab.tab.textLabel;
    this.table.rows = this.response.filter(x => x.gradeDescription == this.tabName);
    this.table = {... this.table};
    this.total = this.table.rows.reduce((sum:number, current:any) => sum + current.recieptAmt, 0);
  }

}
