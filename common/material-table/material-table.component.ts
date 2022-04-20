import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @Input() columns: string[] = [];
  @Input() response: any[] = [];

  constructor() { }

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  
  ngOnInit(): void {
    this.displayedColumns = this.columns;
    this.dataSource = new MatTableDataSource<any>(this.response);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
