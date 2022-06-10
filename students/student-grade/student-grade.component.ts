import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from '../../services/master.service';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-student-grade',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.scss']
})
export class StudentGradeComponent implements OnInit {

  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private master: MasterService) { }

  isDisabled: boolean = true;
  checkedAll: boolean = false;
  request: any = {};
  response: any[] = [];
  dataSource = new MatTableDataSource<any>();
  cols = [ 'checked', 'studentName', 'gradeDescription', 'section', 'academicYear' ];
  academicYear: string[] = [];
  grade: string[] = [];

  ngOnInit(): void {
    this.academicYear = this.master.getAcademicYear();
    this.grade = this.master.getGrade();
    this.request.academicYear = this.academicYear[0];
  }

  search(): void {
    this.client.getRequest('Student/StudentGrade', { academicYear: this.request.academicYear, gradeDescription: this.request.gradeDescription, section: 'N/A' }).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.response = response.responseObj.studentGradeObj.sort((a, b) => (a.studentName < b.studentName ? -1 : 1));
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
    const grade = this.response.filter(x => x.checked);
    this.request.studentGrades = grade.map(x => x.studentGradeId);
    this.request.inTake = 24;
    this.client.postBodyRequest('Student/StudentGrade', this.request).subscribe(response => {
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

}
