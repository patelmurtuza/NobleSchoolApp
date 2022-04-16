import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private activatedroute: ActivatedRoute) { }

  request: any = {};
  form: FormData = new FormData();
  fileName: string = '';
  viewCols = [ 'FullName', 'Family', 'PreviousEnrollment', 'Admission', 'Document', 'Address' ];

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      this.request.studentId = params.get('id');
      if(this.request.studentId > 0) {
        this.client.getRequest('Student/Student', { studentId: this.request.studentId }).subscribe(response => {
          this.request = response.responseObj.studentObj[0];
        });
      }
      else {
        this.request.studentId = 0;
        this.request.religion = 'Muslim';
        this.request.caste = 'General';
        this.request.motherTongue = 'Urdu';
        this.request.nationality = 'Indian';
        this.request.nativePlace = 'Taloja, Navi Mumbai';
      }
    });
  }

  register(): void {
    const prop: string[] = [ "dob" ];
    this.client.postFormRequest('Student/Student', this.form, this.request, this.request.studentId, prop).subscribe(response => {
      this.request.studentId = response.responseObj.studentObj[0].studentId;
      this.fileName = '';
      this.alert.redirectWithMessage(response.errorObj[0].message, 'student', this.request.studentId);
    });
  }

  onFileSelected(event: any){
    this.fileName = event.srcElement.files[0].name;
    this.form.append('file', event.srcElement.files[0]);
  }

}
