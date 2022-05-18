import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss']
})
export class AdmissionComponent implements OnInit {

  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private activatedroute: ActivatedRoute, private master: MasterService) { }

  request: any = {};
  grade: string[] = [];
  academicYear: string[] = [];
  table: any = { rows: [], columns: [
    { columnDef: 'admissionNo', header: 'Admission No' },
    { columnDef: 'admissionDate', header: 'Admission Date', datePipe: true },
    { columnDef: 'grNo', header: 'GR No' },
    { columnDef: 'formNo', header: 'Form No' },
    { columnDef: 'academicYear', header: 'Academic Year' },
    { columnDef: 'gradeDescription', header: 'Grade Description' },
    { columnDef: 'comments', header: 'Comments' },
    { columnDef: 'edit', header: '', edit: true, pk: 'admissionId' }
  ] };

  ngOnInit(): void {
    this.grade = this.master.getGrade();
    this.academicYear = this.master.getAcademicYear();
    this.request.academicYear = this.academicYear[0];
    this.activatedroute.paramMap.subscribe(params => { 
      this.request.studentId = params.get('id');
      if(this.request.studentId > 0) {
        this.client.getRequest('Student/Admission', { studentId: this.request.studentId }).subscribe(response => {
          if(response.errorObj[0].code == 0) {
            this.table.rows = response.responseObj.admissionObj;
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
    this.client.postBodyRequest('Student/Admission', this.request, this.request.admissionId).subscribe(response => {
      this.table.rows = response.responseObj.admissionObj;
      this.table = {... this.table};
      this.request.admissionId = 0;
      form.resetForm();
      this.alert.showMessage(response.errorObj[0].message);
    });
  }

  editItem(item: any): void {
    this.request = item;
  }

}
