import { Component, OnInit } from '@angular/core';
import { ServiceClientService } from '../../services/serviceclient.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  constructor(private client: ServiceClientService) { }

  table: any = { rows: [], columns: [
    { columnDef: 'firstName', header: 'First Name' },
    { columnDef: 'middleName', header: 'Middle Name' },
    { columnDef: 'lastName', header: 'Last Name' },
    { columnDef: 'gradeDescription', header: 'Grade Description' },
    { columnDef: 'dob', header: 'Date of Birth', datePipe: true },
    { columnDef: 'gender', header: 'Gender' },
    { columnDef: 'mobileNo', header: 'Mobile No' },
    { columnDef: 'emailAddress', header: 'Email Address' },
    { columnDef: 'profilePhotoPath', header: 'Profile Photo', file: true },
    { columnDef: 'view', header: '', view: true, url: 'student', route: 'studentId' }
  ] };

  ngOnInit(): void {
    this.client.getRequest('Student/Student', null).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.table.rows = response.responseObj.studentObj;
        this.table = {... this.table};
      }
    });
  }

}
