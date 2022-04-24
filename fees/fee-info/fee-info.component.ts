import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ServiceClientService } from '../../services/serviceclient.service';

@Component({
  selector: 'app-fee-info',
  templateUrl: './fee-info.component.html',
  styleUrls: ['./fee-info.component.scss']
})
export class FeeInfoComponent implements OnInit {

  constructor(private client: ServiceClientService, private master: MasterService) { }

  table: any = { rows: [], columns: [
    { columnDef: 'studentName', header: 'Student Name' },
    { columnDef: 'rollNo', header: 'Roll No' },
    { columnDef: 'gradeDescription', header: 'Grade Description' },
    { columnDef: 'section', header: 'Section' },
    { columnDef: 'academicYear', header: 'Academic Year' },
    { columnDef: 'view', header: '', view: true, url: 'fee', route: 'studentId' }
  ] };
  academicYear: string[] = [];

  ngOnInit(): void {
    this.academicYear = this.master.getAcademicYear();
    this.client.getRequest('Student/StudentGrade', { academicYear: this.academicYear[0] }).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.table.rows = response.responseObj.studentGradeObj;
        this.table = {... this.table};
      }
    });
  }

}
