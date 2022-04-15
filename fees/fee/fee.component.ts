import { Component, OnInit } from '@angular/core';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {

  constructor(private client: ServiceClientService, private alert: SnackBarAlertService) { }

  response: any[] = [];

  ngOnInit(): void {
    this.client.getRequest('Fee/StudentFee', {studentGradeId: 1}).subscribe(response => {
      this.response = response.responseObj.studentFeeObj;
    });
  }

}
