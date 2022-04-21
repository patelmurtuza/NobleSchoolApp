import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-fee-info',
  templateUrl: './fee-info.component.html',
  styleUrls: ['./fee-info.component.scss']
})
export class FeeInfoComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  
  constructor(private client: ServiceClientService) { }

  dataSource = new MatTableDataSource<any>();
  cols = [ 'StudentName', 'RollNo', 'GradeDescription', 'Section', 'AcademicYear', 'Fee' ];

  ngOnInit(): void {
    this.client.getRequest('Student/StudentGrade', { academicYear: '2022 - 2023' }).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.dataSource = new MatTableDataSource(response.responseObj.studentGradeObj);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value;
  }

}
