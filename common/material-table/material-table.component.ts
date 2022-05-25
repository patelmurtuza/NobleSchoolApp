import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewFeeComponent } from '../../fees/view-fee/view-fee.component';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit, OnChanges {

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Input() table: any = {};
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  constructor(private dialog: MatDialog) { }

  search: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.table.rows);
    this.dataSource.filter = this.search;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  columns: any[] = [];
  
  ngOnInit(): void {
    this.columns = this.table.columns;
    this.displayedColumns = this.columns.map(x => x.columnDef);
    this.dataSource = new MatTableDataSource(this.table.rows);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(): void {
    this.dataSource.filter = this.search;
  }

  clearSearch(): void {
    this.search = '';
    this.dataSource.filter = this.search;
  }

  onEdit(id: number, pk: string): void {
    this.editItem.emit(this.table.rows[this.table.rows.findIndex((x: any) => x[pk] == id)]);
  }

  onDelete(id: number, pk: string): void {
    this.deleteItem.emit(this.table.rows[this.table.rows.findIndex((x: any) => x[pk] == id)]);
  }

  openDialog(id: number, component: any): void {
    this.dialog.open(component, {
      width: '75%',
      data: {id: id},
    });
  }

}
