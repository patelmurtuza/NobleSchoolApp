import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private activatedroute: ActivatedRoute, private master: MasterService) { }

  response: any[] = [];
  request: any = {};
  form: FormData = new FormData();
  fileName: string = '';
  dataSource = new MatTableDataSource<any>();
  cols = [ 'DocumentType', 'DocumentPath', 'Comments', 'Edit' ];
  document: string[] = [];

  ngOnInit(): void {
    this.document = this.master.getStudentDocument();
    this.activatedroute.paramMap.subscribe(params => { 
      this.request.studentId = params.get('id');
      if(this.request.studentId > 0) {
        this.client.getRequest('Student/Document', { studentId: this.request.studentId }).subscribe(response => {
          if(response.errorObj[0].code == 0) {
            this.response = response.responseObj.documentObj;
            this.dataSource = new MatTableDataSource(this.response);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
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
      this.response = response.responseObj.documentObj;
      this.dataSource = new MatTableDataSource(this.response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.request.studentDocumentId = 0;
      form.resetForm();
      this.form = new FormData();
      this.fileName = '';
      this.alert.showMessage(response.errorObj[0].message);
    });
  }

  onFileSelected(event: any) {
    this.fileName = event.srcElement.files[0].name;
    for (var item of event.srcElement.files) {
      this.form.append('files', item);
    }
  }

  onEdit(id: number): void {
    this.request = this.response.find(x => x.studentDocumentId == id);
  }

}
