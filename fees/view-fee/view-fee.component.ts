import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ServiceClientService } from '../../services/serviceclient.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-fee',
  templateUrl: './view-fee.component.html',
  styleUrls: ['./view-fee.component.scss']
})
export class ViewFeeComponent implements OnInit {

  @ViewChild('html') html!: ElementRef;

  constructor(private client: ServiceClientService, @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
  }

  payment: any = {};
  fee: any[] = [];
  id: number = 0;
  
  ngOnInit(): void {
    this.client.getRequest('Fee/FeeReciept', { recieptNo: this.id }).subscribe(response => {
      this.payment = response.responseObj.feeCollectionObj;
      this.fee = response.responseObj.standardFeeObj;
    });
  }

  printPage() {
    const windowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    windowPrt.document.write(this.html.nativeElement.innerHTML);
    windowPrt.document.write('<br /><br /><br /><br /><br />');
    windowPrt.document.write(this.html.nativeElement.innerHTML);
    windowPrt.document.close();
    windowPrt.focus();
    windowPrt.print();
    windowPrt.close();
  }

  printAsPDF(): void {
    html2canvas(this.html.nativeElement).then(canvas => {
      const pdf = new jsPDF();
      pdf.setProperties({
        title: 'Fee Reciept'
      });
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 190, canvas.height * 210 / canvas.width);
      window.open(pdf.output('bloburl'));
    });
  }

}
