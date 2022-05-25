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
    const gradeDescription = this.master.getGrade();
    this.client.getRequest('Dashboard/Dashboard', { academicYear: '2022 - 2023' }).subscribe(response => {
      let feeData:any[] = [{type: 'stackedColumn', name: 'Term', dataPoints: []}, {type: 'stackedColumn', name: 'Uniform', dataPoints: []}, {type: 'stackedColumn', name: 'Book', dataPoints: []}];
      if(response.errorObj[0].code == 0) {
        let i = 1;
        gradeDescription.forEach(function (value: string) {
          feeData.forEach(function (fee: any) {
            fee.dataPoints.push({y: response.responseObj.feeCollectionObj.filter((x: any) => x.gradeDescription == value && x.recieptType.includes(fee.name)).reduce((sum: number, current: any) => sum + current.recieptAmt, 0), x: i, name: fee.name, xValueFormatString: value});
          });
          i++;
        });
      }
      
      let feeChart = new CanvasJS.Chart("feeChart", {
        animationEnabled: true,
        title: {
          text: `Fee Collection - ${response.responseObj.feeCollectionObj.reduce((sum: number, current: any) => sum + current.recieptAmt, 0)}`
        },
        toolTip: {
          shared: true
        },
        axisX: {
          labelFormatter: function(e){
            return gradeDescription[e.value - 1];
          }
        },
        data: feeData
      });
      feeChart.render();

      const feeType = [... new Set(response.responseObj.feeCollectionObj.map(x => x.recieptType))];
      let paymentData:any[] = [{type: 'stackedColumn', name: 'Cash', dataPoints: []}, {type: 'stackedColumn', name: 'Card', dataPoints: []}, {type: 'stackedColumn', name: 'Cheque', dataPoints: []}];
      let i = 1;
      feeType.forEach(function (value: any) {
        paymentData.forEach(function (fee: any) {
          fee.dataPoints.push({y: response.responseObj.feeCollectionObj.filter((x: any) => x.recieptType == value && x.paymentType == fee.name).reduce((sum: number, current: any) => sum + current.recieptAmt, 0), x: i, name: fee.name, xValueFormatString: value});
        });
        i++;
      });
      
      let paymentChart = new CanvasJS.Chart("paymentChart", {
        animationEnabled: true,
        title: {
          text: `Cash - ${response.responseObj.feeCollectionObj.filter(x => x.paymentType == 'Cash').reduce((sum: number, current: any) => sum + current.recieptAmt, 0)}, ` + 
                `Card - ${response.responseObj.feeCollectionObj.filter(x => x.paymentType == 'Card').reduce((sum: number, current: any) => sum + current.recieptAmt, 0)}, ` + 
                `Cheque - ${response.responseObj.feeCollectionObj.filter(x => x.paymentType == 'Cheque').reduce((sum: number, current: any) => sum + current.recieptAmt, 0)}`
        },
        toolTip: {
          shared: true
        },
        axisX: {
          labelFormatter: function(e){
            return feeType[e.value - 1];
          }
        },
        data: paymentData
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
