import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-previous-enrollment',
  templateUrl: './previous-enrollment.component.html',
  styleUrls: ['./previous-enrollment.component.scss']
})
export class PreviousEnrollmentComponent implements OnInit {

  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private activatedroute: ActivatedRoute) { }

  request: any = {};
  table: any = { rows: [], columns: [
    { columnDef: 'instituteName', header: 'Institute Name' },
    { columnDef: 'examinationPass', header: 'Examination Pass' },
    { columnDef: 'percentage', header: 'Percentage' },
    { columnDef: 'leavingDate', header: 'Leaving Date', datePipe: true },
    { columnDef: 'comments', header: 'Comments' },
    { columnDef: 'edit', header: '', edit: true, pk: 'previousEnrollmentId' }
  ] };

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      this.request.studentId = params.get('id');
      if(this.request.studentId > 0) {
        this.client.getRequest('Student/PreviousEnrollment', { studentId: this.request.studentId }).subscribe(response => {
          if(response.errorObj[0].code == 0) {
            this.table.rows = response.responseObj.previousEnrollmentObj;
            this.table = {... this.table};
          }
        });
      }
      else{
        this.alert.showMessage('First save student information');
      }
    });
  }

  register(form: NgForm): void {
    this.client.postBodyRequest('Student/PreviousEnrollment', this.request, this.request.previousEnrollmentId).subscribe(response => {
      this.table.rows = response.responseObj.previousEnrollmentObj;
      this.table = {... this.table};
      this.request.previousEnrollmentId = 0;
      form.resetForm();      
      this.alert.showMessage(response.errorObj[0].message);
    });
  }

  editItem(item: any): void {
    this.request = item;
  }

}
