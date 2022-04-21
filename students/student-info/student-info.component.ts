import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceClientService } from '../../services/serviceclient.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  
  constructor(private client: ServiceClientService) { }

  dataSource = new MatTableDataSource<any>();
  cols = [ 'FirstName', 'MiddleName', 'LastName', 'DOB', 'Gender', 'BirthPlace', 'Religion', 'Caste', 'MotherTongue', 'NativePlace', 'Nationality', 'MobileNo', 'EmailAddress', 'ProfilePhotoPath', 'View' ];

  ngOnInit(): void {
    this.client.getRequest('Student/Student', null).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.dataSource = new MatTableDataSource(response.responseObj.studentObj);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value;
  }

}
