import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-student-grade',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.scss']
})
export class StudentGradeComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  constructor(private client: ServiceClientService, private alert: SnackBarAlertService) { }

  isDisabled: boolean = true;
  checkedAll: boolean = false;
  request: any = {};
  response: any[] = [];
  dataSource = new MatTableDataSource<any>();
  dataSourceGrade = new MatTableDataSource<any>();
  cols = [ 'Checked', 'StudentName' ];
  colsGrade = [ 'StudentName', 'RollNo', 'GradeDescription', 'AcademicYear' ];

  ngOnInit(): void {
    this.request.academicYear = "2022 - 2023";
    this.client.getRequest('Student/StudentGrade', {}).subscribe(response => {
      this.dataSourceGrade = new MatTableDataSource(response.responseObj.studentGradeObj);
      this.dataSourceGrade.sort = this.sort;
      this.dataSourceGrade.paginator = this.paginator;
    });
  }

  search(): void {
    this.client.getRequest('Student/StudentGrade', { academicYear: this.request.academicYear, gradeDescription: this.request.gradeDescription }).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.response = response.responseObj.studentGradeObj;
        this.response.forEach(function(part, index, theArray) {
          theArray[index].checked = true;
        });
        this.checkedAll = this.response.length > 0;
        this.isDisabled = this.response.length == 0;
        this.dataSource = new MatTableDataSource(this.response);
      }
      else {
        this.alert.showMessage(response.errorObj[0].message);
      }
    });
  }

  register(form: NgForm): void {
    const grade = this.response.filter(x => x.checked).sort((a, b) => (a.studentName < b.studentName ? -1 : 1));
    this.request.studentGrades = grade.map(x => x.studentGradeId);
    this.client.postBodyRequest('Student/StudentGrade', this.request).subscribe(response => {
      this.dataSourceGrade = new MatTableDataSource(response.responseObj.studentGradeObj);
      this.dataSourceGrade.sort = this.sort;
      this.dataSourceGrade.paginator = this.paginator;
      this.alert.showMessage(response.errorObj[0].message);
      this.response = [];
      this.dataSource = new MatTableDataSource(this.response);
      this.isDisabled = true;
      this.checkedAll = false;
      form.resetForm();
    });
  }

  clear(form: NgForm): void {
    this.isDisabled = true;
    this.checkedAll = false;
    form.resetForm();
    this.response = [];
    this.dataSource = new MatTableDataSource(this.response);
  }

  onCheckedAll(ob: MatCheckboxChange) {
    this.response.forEach(function(part, index, theArray) {
      theArray[index].checked = ob.checked;
    });
    this.isDisabled = this.response.filter(x => x.checked).length == 0;
  }

  onChecked(ob: MatCheckboxChange, index: number) {
    this.response[index].checked = ob.checked;
    this.checkedAll = this.response.filter(x => x.checked).length == this.response.length;
    this.isDisabled = this.response.filter(x => x.checked).length == 0;
  }

  applyFilter(event: Event) {
    this.dataSourceGrade.filter = (event.target as HTMLInputElement).value;
  }

}
