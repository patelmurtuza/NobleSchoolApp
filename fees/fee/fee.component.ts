import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceClientService } from '../../services/serviceclient.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  
  constructor(private client: ServiceClientService, private activatedroute: ActivatedRoute, private router: Router) { }

  request: any = { feeCollections: [] };
  paid: number = 0;
  pending: number = 0;
  term: boolean = false;
  response: any[] = [];
  dataSource = new MatTableDataSource<any>();
  cols = [ 'StudentName', 'AcademicYear', 'GradeDescription', 'PaymentType', 'RecieptAmt', 'PaymentDate', 'CardRefNo', 'ChequeNo', 'ChequeDate', 'BankName' ];
  options: string[] = ['Axis Bank Ltd', 'Bandhan Bank Ltd', 'HDFC Bank Ltd', 'ICICI Bank Ltd', 'YES Bank Ltd', 'IDBI Bank Limited', 'State Bank of India', '	Union Bank of India'];

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      this.request.studentId = params.get('id');
      this.client.getRequest('Fee/StudentFee', { studentId: this.request.studentId }).subscribe(response => {
        this.response = response.responseObj.studentFeeObj;
        this.paid = this.response.filter(x => x.isPaid).reduce((sum, current) => sum + current.amount, 0);
        this.pending = 0;
        this.request.studentGradeId = this.response[0].studentGradeId;
        this.dataSource = new MatTableDataSource(response.responseObj.studentFeeCollectionObj);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  feePayment(): void {
    const terms = this.response.filter(x => !x.isPaid);
    for (let i = 0; i < this.request.feeCollections.length; i++) {
      this.request.feeCollections[i].recieptAmt = terms[i].amount;
    }
    this.client.postBodyRequest('Fee/StudentFeeCollection', this.request).subscribe(response => {
      this.response = response.responseObj.studentFeeObj;
      this.paid = this.response.filter(x => x.isPaid).reduce((sum, current) => sum + current.amount, 0);
      this.request.studentGradeId = this.response[0].studentGradeId;
      this.dataSource = new MatTableDataSource(response.responseObj.studentFeeCollectionObj);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.request.feeCollections = [];
      this.term = false;
      this.router.navigate([]).then(result => {  window.open('view-fee', '_blank'); });
    });
  }

  termChange(event: MatRadioChange) {
    this.request.feeCollections = [];
    this.pending = this.response.slice(0, event.value).reduce((sum, current) => sum + current.amount, 0) - this.paid;
    const rows = event.value - this.response.filter(x => x.isPaid).length;
    for (let i = 0; i < rows; i++) {
      this.request.feeCollections[i] = { paymentType: 'Cash' };
    }
  }

}
