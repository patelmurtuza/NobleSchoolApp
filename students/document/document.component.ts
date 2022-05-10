import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { ServiceClientService } from '../../services/serviceclient.service';
import { SnackBarAlertService } from '../../services/snack-bar-alert.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private activatedroute: ActivatedRoute, private master: MasterService) { }

  request: any = {};
  form: FormData = new FormData();
  fileName: string = '';
  document: string[] = [];
  table: any = { rows: [], columns: [
    { columnDef: 'documentType', header: 'Document Type' },
    { columnDef: 'comments', header: 'Comments' },
    { columnDef: 'documentPath', header: 'Document', file: true },
    { columnDef: 'edit', header: '', edit: true, url: 'student', route: 'studentId' }
  ] };

  ngOnInit(): void {
    this.document = this.master.getStudentDocument();
    this.activatedroute.paramMap.subscribe(params => { 
      this.request.studentId = params.get('id');
      if(this.request.studentId > 0) {
        this.client.getRequest('Student/Document', { studentId: this.request.studentId }).subscribe(response => {
          if(response.errorObj[0].code == 0) {
            this.table.rows = response.responseObj.documentObj;
            this.table = {... this.table};
          }
        });
      }
      else{
        this.alert.showMessage('First save student information');
      }
    });
  }

  register(form: NgForm): void {
    this.client.postFormRequest('Student/Document', this.form, this.request, this.request.studentDocumentId).subscribe(response => {
      this.table.rows = response.responseObj.documentObj;
      this.table = {... this.table};
      this.request.studentDocumentId = 0;
      form.resetForm();
      this.form = new FormData();
      this.fileName = '';
      this.alert.showMessage(response.errorObj[0].message);
    });
  }

  onFileSelected(event: any) {
    this.fileName = event.srcElement.files[0].name;
    for (const item of event.srcElement.files) {
      this.form.append('files', item);
    }
  }

  editItem(item: any): void {
    this.request = item;
  }

}
