import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.scss']
})
export class FeeStructureComponent implements OnInit {

  constructor(private client: ServiceClientService, private master: MasterService, private alert: SnackBarAlertService) { }

  request: any = { feeStructures: [] };
  grade: string[] = [];
  academicYear: string[] = [];

  ngOnInit(): void {
    this.grade = this.master.getGrade();
    this.academicYear = this.master.getAcademicYear();
    this.request.academicYear = this.academicYear[0];
  }

  search(form: NgForm): void {
    if(form.valid) {
      this.client.getRequest('Master/StandardFee', { academicYear: this.request.academicYear, gradeDescription: this.request.gradeDescription }).subscribe(response => {
        if(response.errorObj[0].code == 0) {
          this.request.feeStructures = response.responseObj.standardFeeObj;
        }
        else {
          this.request.feeStructures = [];
          this.request.feeStructures[0] = {};
        }
      });
    }
  }

  clear(form: NgForm): void {
    form.resetForm();
    this.request.feeStructures = [];
  }

  register(): void {
    this.client.postBodyRequest('Master/StandardFee', this.request).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        this.request.feeStructures = response.responseObj.standardFeeObj;
      }
      this.alert.showMessage(response.errorObj[0].message);
    });
  }

  onAddRow(): void {
    const val = this.request.feeStructures[this.request.feeStructures.length - 1];
    if(val.feeTypeDescription != undefined && val.amount != undefined) {
      this.request.feeStructures.push({});
    }
  }

}
