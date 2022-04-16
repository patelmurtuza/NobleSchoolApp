import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ServiceClientService } from '../../services/serviceclient.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  
  constructor(private client: ServiceClientService, private activatedroute: ActivatedRoute) { }

  paid: number = 0;
  pending: number = 0;
  term: boolean = false;
  response: any[] = [];
  dataSource = new MatTableDataSource<any>();
  cols = [ 'AcademicYear', 'GradeDescription', 'PaymentType', 'RecieptAmt', 'PaymentDate' ];

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      this.client.getRequest('Fee/StudentFee', { studentId: params.get('id') }).subscribe(response => {
        this.response = response.responseObj.studentFeeObj;
        this.paid = this.response.filter(x => x.isPaid).reduce((sum, current) => sum + current.amount, 0);
      });
      this.client.getRequest('Fee/StudentFeeCollection', { studentId: params.get('id') }).subscribe(response => {
        this.dataSource = new MatTableDataSource(response.responseObj.studentFeeCollectionObj);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
      this.dataSource = new MatTableDataSource(this.response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  feePayment(): void {
    
  }

  termChange(event: MatRadioChange) {
    this.pending = this.response.slice(0, event.value).reduce((sum, current) => sum + current.amount, 0) - this.paid;
}

}
