import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-student-family',
  templateUrl: './student-family.component.html',
  styleUrls: ['./student-family.component.scss']
})
export class StudentFamilyComponent implements OnInit {

  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private activatedroute: ActivatedRoute) { }

  request: any = {};
  table: any = { rows: [], columns: [
    { columnDef: 'fullName', header: 'Full Name' },
    { columnDef: 'relation', header: 'Relation' },
    { columnDef: 'qualification', header: 'Qualification' },
    { columnDef: 'occupation', header: 'Occupation' },
    { columnDef: 'designation', header: 'Designation' },
    { columnDef: 'mobileNo', header: 'MobileNo' },
    { columnDef: 'emailAddress', header: 'Email Address' },
    { columnDef: 'monthlyIncome', header: 'Monthly Income' },
    { columnDef: 'officeAddress', header: 'Office Address' },
    { columnDef: 'edit', header: '', edit: true, pk: 'studentFamilyId' },
    { columnDef: 'delete', header: '', delete: true, pk: 'studentFamilyId' }
  ] };

  ngOnInit(): void {
    this.request.relation = 'Father';
    this.activatedroute.paramMap.subscribe(params => { 
       this.request.studentId = params.get('id');
       if(this.request.studentId > 0) {
        this.client.getRequest('Student/StudentFamily', { studentId: this.request.studentId }).subscribe(response => {
          if(response.errorObj[0].code == 0) {
            this.table.rows = response.responseObj.studentFamilyObj;
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
    this.client.postBodyRequest('Student/StudentFamily', this.request, this.request.studentFamilyId).subscribe(response => {
      this.table.rows = response.responseObj.studentFamilyObj;
      this.table = {... this.table};
      form.resetForm();
      this.request.studentFamilyId = 0;
      this.alert.showMessage(response.errorObj[0].message);
    });
  }

  editItem(item: any): void {
    this.request = item;
  }

  deleteItem(item: any): void {
    item.active = !item.active;
    this.client.patchBodyRequest('Student/StudentFamily', item, item.studentFamilyId).subscribe(response => {
      this.table.rows = response.responseObj.studentFamilyObj;
      this.table = {... this.table};
      this.alert.showMessage(response.errorObj[0].message);
    });
  }

}
