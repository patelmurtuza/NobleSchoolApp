import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-previous-enrollment',
  templateUrl: './previous-enrollment.component.html',
  styleUrls: ['./previous-enrollment.component.scss']
})
export class PreviousEnrollmentComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private activatedroute: ActivatedRoute) { }

  response: any[] = [];
  request: any = {};
  dataSource = new MatTableDataSource<any>();
  cols = [ 'InstituteName', 'ExaminationPass', 'Percentage', 'LeavingDate', 'Comments', 'Edit' ];

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      this.request.studentId = params.get('id');
      if(this.request.studentId > 0) {
        this.client.getRequest('Student/PreviousEnrollment', { studentId: this.request.studentId }).subscribe(response => {
          if(response.errorObj[0].code == 0) {
            this.response = response.responseObj.previousEnrollmentObj;
            this.dataSource = new MatTableDataSource(this.response);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
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
      this.response = response.responseObj.previousEnrollmentObj;
      this.dataSource = new MatTableDataSource(this.response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.request.previousEnrollmentId = 0;
      form.resetForm();      
      this.alert.showMessage(response.errorObj[0].message);
    });
  }

  onEdit(id: number): void {
    this.request = this.response.find(x => x.previousEnrollmentId == id);
  }

}
