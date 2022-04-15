import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  
  constructor(private client: ServiceClientService, private alert: SnackBarAlertService) { }

  response: any[] = [];
  request: any = {};
  form: FormData = new FormData();
  fileName: string = '';
  dataSource = new MatTableDataSource<any>();
  cols = [ 'FirstName', 'MiddleName', 'LastName', 'DOB', 'Gender', 'BirthPlace', 'Religion', 'Caste', 'MotherTongue', 'NativePlace', 'Nationality', 'MobileNo', 'EmailAddress', 'ProfilePhotoPath', 'Info' ];
  viewCols = [ 'FullName', 'Family', 'PreviousEnrollment', 'Admission', 'Document', 'Address' ];

  ngOnInit(): void {
    this.request.religion = 'Muslim';
    this.request.caste = 'General';
    this.request.motherTongue = 'Urdu';
    this.request.nationality = 'Indian';
    this.request.nativePlace = 'Taloja, Navi Mumbai';
    this.client.getRequest('Student/Student', null).subscribe(response => {
      this.response = response.responseObj.studentObj;
      this.dataSource = new MatTableDataSource(this.response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  register(form: NgForm): void {
    this.request.dob = (new Date(this.request.dob)).toUTCString();
    this.client.postFormRequest('Student/Student', this.form, this.request, this.request.studentId).subscribe(response => {
      this.response = response.responseObj.studentObj;
      this.dataSource = new MatTableDataSource(this.response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      form.resetForm();
      this.request.studentId = 0;
      this.alert.openSnackBar(response.errorObj[0].message);
    });
  }

  onEdit(id: number): void {
    this.request = this.response.find(x => x.studentId == id);
  }

  onFileSelected(event: any){
    this.fileName = event.srcElement.files[0].name;
    this.form.append('file', event.srcElement.files[0]);
  }

  applyFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value;
  }

  getFileName(fileName: string) {
    if(fileName) {
      const path = fileName.split("/");
      return path[path.length - 1];
    }
    return '';
  }

}
