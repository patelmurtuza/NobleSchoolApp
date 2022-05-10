import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MasterService } from '../../services/master.service';
import { ServiceClientService } from '../../services/serviceclient.service';

@Component({
  selector: 'app-fee-details',
  templateUrl: './fee-details.component.html',
  styleUrls: ['./fee-details.component.scss']
})
export class FeeDetailsComponent implements OnInit {

  constructor(private client: ServiceClientService, private master: MasterService) { }

  academicYear: string[] = [];
  grade: string[] = [];
  response: any[] = [];
  tabArray: string[] = [];
  tabName: string = 'Nursery';
  tabIndex: number = 0;
  table: any = { rows: [], columns: [
    { columnDef: 'studentName', header: 'Student Name' },
    { columnDef: 'paymentType', header: 'Payment Type' },
    { columnDef: 'recieptAmt', header: 'Reciept Amount' },
    { columnDef: 'paymentDate', header: 'Payment Date', datePipe: true },
    { columnDef: 'transactionalID', header: 'Transactional ID' },
    { columnDef: 'chequeNo', header: 'Cheque No' },
    { columnDef: 'chequeDate', header: 'Cheque Date', datePipe: true },
    { columnDef: 'bankName', header: 'Bank Name' },
    { columnDef: 'termPeriod', header: 'Term Period' },
    { columnDef: 'discount', header: 'Discount %' }
  ] };

  ngOnInit(): void {
    this.academicYear = this.master.getAcademicYear();
    this.grade = this.master.getGrade();
    for (let i = 0; i < this.academicYear.length; i++) {
      this.tabArray.push('Nursery');
    }
    this.client.getRequest('Fee/FeeCollection', { academicYear: this.academicYear[0] }).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.response = response.responseObj.feeCollectionObj;
        this.table.rows = this.response.filter(x => x.gradeDescription == this.tabName);
        this.table = {... this.table};
      }
    });
  }

  tabYear(tab: MatTabChangeEvent) {
    this.tabIndex = tab.index;
    this.tabName = this.tabArray[this.tabIndex];
    this.client.getRequest('Fee/FeeCollection', { academicYear: tab.tab.textLabel }).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.response = response.responseObj.feeCollectionObj;
      }
      else {
        this.response = [];
      }
      this.table.rows = this.response.filter(x => x.gradeDescription == this.tabName);
      this.table = {... this.table};
    });
  }

  tabGrade(tab: MatTabChangeEvent) {
    this.tabName = this.tabArray[this.tabIndex] = tab.tab.textLabel;
    this.table.rows = this.response.filter(x => x.gradeDescription == this.tabName);
    this.table = {... this.table};
  }

}
