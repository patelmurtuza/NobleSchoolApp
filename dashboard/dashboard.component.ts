import { Component, OnInit } from '@angular/core';
import { MasterService } from '../services/master.service';
import { ServiceClientService } from '../services/serviceclient.service';
declare const CanvasJS: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private client: ServiceClientService, private master: MasterService) { }

  ngOnInit(): void {
    let feeData:any[] = [];
    const gradeDescription = this.master.getGrade();
    this.client.getRequest('Dashboard/Dashboard', { academicYear: '2022 - 2023' }).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        gradeDescription.forEach(function (value: string) {
          feeData.push({y: response.responseObj.feeCollectionObj.filter((x: any) => x.gradeDescription == value).reduce((sum: number, current: any) => sum + current.recieptAmt, 0), label: value});
        });
      }

      let feeChart = new CanvasJS.Chart("feeChart", {
        animationEnabled: true,
        title: {
          text: `Fee Collection - ${response.responseObj.feeCollectionObj.reduce((sum: number, current: any) => sum + current.recieptAmt, 0)}`
        },
        data: [{
          type: "column",
          dataPoints: feeData
        }]
      });
      feeChart.render();

      const paymentType = ['Cash', 'Card', 'Cheque'];
      let paymentData: any[] = [];
      paymentType.forEach(function (value: string) {
        paymentData.push({y: response.responseObj.feeCollectionObj.filter((x: any) => x.paymentType == value).reduce((sum: number, current: any) => sum + current.recieptAmt, 0), label: value});
      });

      let paymentChart = new CanvasJS.Chart("paymentChart", {
        animationEnabled: true,
        title: {
          text: "Payment Type"
        },
        data: [{
          type: "column",
          dataPoints: paymentData
        }]
      });
      paymentChart.render();

      let admissionData:any[] = [];
      gradeDescription.forEach(function (value: string) {
        admissionData.push({y: response.responseObj.studentAdmissionObj.filter((x: any) => x.gradeDescription == value).length, label: value});
      });

      let admissionChart = new CanvasJS.Chart("admissionChart", {
        animationEnabled: true,
        title: {
          text: `Admission - ${response.responseObj.studentAdmissionObj.length}`
        },
        data: [{
          type: "column",
          dataPoints: admissionData
        }]
      });
      admissionChart.render();

    });

  }

}
