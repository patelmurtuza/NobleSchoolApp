import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceClientService } from '../../services/serviceclient.service';

@Component({
  selector: 'app-view-fee',
  templateUrl: './view-fee.component.html',
  styleUrls: ['./view-fee.component.scss']
})
export class ViewFeeComponent implements OnInit {

  constructor(private client: ServiceClientService, private activatedroute: ActivatedRoute) { }

  numbers = Array(2).fill(0).map((x, i) => i);
  payment: any = {};
  fee: any[] = [];
  
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      this.client.getRequest('Fee/FeeReciept', { feeCollectionId: params.get('id') }).subscribe(response => {
        this.payment = response.responseObj.feeCollectionObj;
        this.fee = response.responseObj.standardFeeObj;
      });
    });
  }

}
