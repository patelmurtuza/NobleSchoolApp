import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';
import { ViewFeeComponent } from '../view-fee/view-fee.component';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {

  constructor(private client: ServiceClientService, private activatedroute: ActivatedRoute, private alert: SnackBarAlertService) { }

  request: any = { feeCollections: [] };
  amount: number = 0;
  response: any[] = [];
  table: any = { rows: [], columns: [
    { columnDef: 'studentName', header: 'Student Name' },
    { columnDef: 'academicYear', header: 'Academic Year' },
    { columnDef: 'gradeDescription', header: 'Grade Description' },
    { columnDef: 'recieptNo', header: 'Reciept No' },
    { columnDef: 'paymentType', header: 'Payment Type' },
    { columnDef: 'recieptAmt', header: 'Reciept Amount' },
    { columnDef: 'paymentDate', header: 'Payment Date', datePipe: true },
    { columnDef: 'transactionalID', header: 'Transactional ID' },
    { columnDef: 'chequeNo', header: 'Cheque No' },
    { columnDef: 'chequeDate', header: 'Cheque Date', datePipe: true },
    { columnDef: 'bankName', header: 'Bank Name' },
    { columnDef: 'recieptType', header: 'Reciept Type' },
    { columnDef: 'discount', header: 'Discount %' },
    { columnDef: 'view', header: '', model: true, component: ViewFeeComponent, route: 'recieptNo' }
  ] };
  isBacklog: boolean = false;
  terms: any[] = [{value: 1, text: 'First Term'}, {value: 2, text: 'Second Term'}, {value: 3, text: 'Third Term'} ];
  otherFee: any[] = [];
  
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      this.request.studentId = params.get('id');
      this.client.getRequest('Fee/StudentFee', { studentId: this.request.studentId }).subscribe(response => {
        this.otherFee = response.responseObj.otherStudentFeeObj;
        this.response = response.responseObj.studentFeeObj;
        const result = this.response.filter(x => x.isPaid);
        this.terms = this.terms.slice(result.length);
        this.request.studentGradeId = this.response[0].studentGradeId;
        this.table.rows = response.responseObj.feeCollectionObj;
        this.table = {... this.table};
        this.isBacklog = response.responseObj.isBacklog;
        if(this.isBacklog) {
          this.alert.showAlert('Blacklog fee is pending for previous academic years');
        }
      });
    });
  }

  feePayment(): void {
    const term = this.request.feeCollections.filter((x:any) => x.recieptType.includes('Term'));
      if(term.length == 3) {
        for (let i = 0; i < 3; i++) {
          const obj = this.request.feeCollections.filter((x:any) => x.recieptType == 'Term ' + (i + 1))[0];
          obj.recieptAmt *= 0.9;
          obj.discount = 10;
        }
      }
      this.client.postBodyRequest('Fee/FeeCollection', this.request).subscribe(response => {
      this.otherFee = response.responseObj.otherStudentFeeObj;
      this.response = response.responseObj.studentFeeObj;
      this.amount = 0;
      this.terms = this.terms.slice(term.length);
      this.request.studentGradeId = this.response[0].studentGradeId;
      this.table.rows = response.responseObj.feeCollectionObj;
      this.table = {... this.table};
      this.request.feeCollections = [];
      this.alert.showMessage(response.errorObj[0].message);
    });
  }

  termChange(value: number) {
    const fee = this.request.feeCollections.filter((x:any) => x.recieptType.includes('Term'));
    let diff = 0;
    if(value == undefined) {
      diff = -Math.abs(fee.length);
    }
    else {
      diff = value - this.response.filter(x => x.isPaid).length - fee.length;
    }
    if(diff > 0) {
      for (let i = 0; i < diff; i++) {
        const obj = { recieptType: 'Term ' + (this.response.filter(x => x.isPaid).length + this.request.feeCollections.filter((x:any) => x.recieptType.includes('Term')).length  + 1), paymentType: 'Cash', recieptAmt: 0 };
        obj.recieptAmt = this.response.find(x => x.termPeriod == obj.recieptType).amount;
        this.request.feeCollections.push(obj);
      }
    }
    else {
      for (let i = diff; i < 0; i++) {
        const recieptType = this.request.feeCollections.filter((x:any) => x.recieptType.includes('Term')).at(-1).recieptType;
        this.request.feeCollections.splice(this.request.feeCollections.findIndex((x: any) => x.recieptType == recieptType), 1);
      }
    }
    this.totalAmount();
  }

  otherFees(value: number, type: string): void {
    const obj = this.otherFee.find(x => x.feeTypeDescription.startsWith(type));
    const val = obj == undefined ? 0 : obj.amount;
    const fee = this.request.feeCollections.filter((x:any) => x.recieptType.startsWith(type));
    let diff = 0;
    if(value == undefined) {
      diff = -Math.abs(fee.length);
    }
    else {
      diff = value - fee.length;
    }
    if(diff > 0) {
      for (let i = 0; i < diff; i++) {
        this.request.feeCollections.push({ recieptType: type, paymentType: 'Cash', recieptAmt: val });
      }
    }
    else {
      for (let i = diff; i < 0; i++) {
        const recieptType = this.request.feeCollections.filter((x:any) => x.recieptType.startsWith(type)).at(-1).recieptType;
        this.request.feeCollections.splice(this.request.feeCollections.findIndex((x: any) => x.recieptType == recieptType), 1);
      }
    }
    this.totalAmount();
  }

  totalAmount(): void {
    const amt = this.request.feeCollections.filter((x:any) => x.recieptType.includes('Term'));
    this.amount = amt.reduce((sum:number, current:any) => sum + current.recieptAmt, 0);
    if(amt.length == 3) {
      this.amount *= .9; 
    }
    this.amount += this.request.feeCollections.filter((x:any) => !x.recieptType.includes('Term')).reduce((sum:number, current:any) => sum + current.recieptAmt, 0);
  }

}
