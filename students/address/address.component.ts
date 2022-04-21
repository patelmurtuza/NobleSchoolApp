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
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private activatedroute: ActivatedRoute, private master: MasterService) { }

  response: any[] = [];
  request: any = {};
  dataSource = new MatTableDataSource<any>();
  cols = [ 'IsPrimary', 'Street1', 'Street2', 'City', 'State', 'ZipCode', 'Edit' ];
  city: string[] = [];
  state: string[] = [];

  ngOnInit(): void {
    this.city = this.master.getCity();
    this.state = this.master.getState();
    this.request.isPrimary = true;
    this.request.city = 'Navi Mumbai';
    this.request.state = 'Maharashtra';
    this.request.zipCode = 410208;
    this.activatedroute.paramMap.subscribe(params => { 
      this.request.studentId = params.get('id');
      if(this.request.studentId > 0) {
        this.client.getRequest('Student/Address', { studentId: this.request.studentId }).subscribe(response => {
          if(response.errorObj[0].code == 0) {
            this.response = response.responseObj.addressObj;
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
    this.client.postBodyRequest('Student/Address', this.request, this.request.addressId).subscribe(response => {
      this.response = response.responseObj.addressObj;
      this.dataSource = new MatTableDataSource(this.response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.request.addressId = 0;
      form.resetForm();
      this.alert.showMessage(response.errorObj[0].message);
    });
  }

  onEdit(id: number): void {
    this.request = this.response.find(x => x.addressId == id);
  }

}
