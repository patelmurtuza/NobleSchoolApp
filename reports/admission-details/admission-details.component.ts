import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MasterService } from '../../services/master.service';
import { ServiceClientService } from '../../services/serviceclient.service';

@Component({
  selector: 'app-admission-details',
  templateUrl: './admission-details.component.html',
  styleUrls: ['./admission-details.component.scss']
})
export class AdmissionDetailsComponent implements OnInit {

  constructor(private client: ServiceClientService, private master: MasterService) { }

  academicYear: string[] = [];
  table: any = { rows: [], columns: [
    { columnDef: 'studentName', header: 'Student Name' },
    { columnDef: 'mobileNo', header: 'Mobile No' },
    { columnDef: 'emailAddress', header: 'Email Address' },
    { columnDef: 'admissionDate', header: 'Admission Date', datePipe: true },
    { columnDef: 'admissionNo', header: 'Admission No' },
    { columnDef: 'grNo', header: 'GR No' },
    { columnDef: 'formNo', header: 'Form No' },
    { columnDef: 'gradeDescription', header: 'Grade Description' }
  ] };

  ngOnInit(): void {
    this.academicYear = this.master.getAcademicYear();
    this.client.getRequest('Student/StudentAdmission', { academicYear: this.academicYear[0] }).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.table.rows = response.responseObj.studentAdmissionObj;
        this.table = {... this.table};
      }
    });
  }

  tabYear(tab: MatTabChangeEvent) {
    this.client.getRequest('Student/StudentAdmission', { academicYear: tab.tab.textLabel }).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.table.rows = response.responseObj.studentAdmissionObj;
        this.table = {... this.table};
      }
    });
  }

}
