import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-daily-expense',
  templateUrl: './daily-expense.component.html',
  styleUrls: ['./daily-expense.component.scss']
})
export class DailyExpenseComponent implements OnInit {

  constructor(private client: ServiceClientService, private alert: SnackBarAlertService) { }

  request: any = {};
  table: any = { rows: [], columns: [
    { columnDef: 'fullName', header: 'Full Name' },
    { columnDef: 'paymentType', header: 'Payment Type' },
    { columnDef: 'paymentDate', header: 'Payment Date', datePipe: true },
    { columnDef: 'recieptAmt', header: 'Amount' },
    { columnDef: 'mobileNo', header: 'Mobile No' },
    { columnDef: 'paymentBy', header: 'Payment By' },
    { columnDef: 'remarks', header: 'Remarks' },
    { columnDef: 'edit', header: '', edit: true, pk: 'dailyExpenseId' }
  ] };

  ngOnInit(): void {
    this.client.getRequest('Master/DailyExpense', { }).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.table.rows = response.responseObj.dailyExpenseObj;
        this.table = {... this.table};
      }
    });
  }

  register(form: NgForm): void {
    this.client.postBodyRequest('Master/DailyExpense', this.request, this.request.dailyExpenseId).subscribe(response => {
      this.table.rows = response.responseObj.dailyExpenseObj;
      this.table = {... this.table};
      form.resetForm();
      this.request.studentFamilyId = 0;
      this.alert.showMessage(response.errorObj[0].message);
    });
  }

  editItem(item: any): void {
    this.request = item;
  }

}
