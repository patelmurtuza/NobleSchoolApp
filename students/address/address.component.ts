import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private client: ServiceClientService, private alert: SnackBarAlertService, private activatedroute: ActivatedRoute, private master: MasterService) { }

  request: any = {};
  city: string[] = [];
  state: string[] = [];
  table: any = { rows: [], columns: [
    { columnDef: 'primary', header: 'Is Primary' },
    { columnDef: 'street1', header: 'Street 1' },
    { columnDef: 'street2', header: 'Street 2' },
    { columnDef: 'city', header: 'City' },
    { columnDef: 'state', header: 'State' },
    { columnDef: 'zipCode', header: 'Zip Code' },
    { columnDef: 'edit', header: '', edit: true, pk: 'addressId' },
    { columnDef: 'delete', header: '', delete: true, pk: 'addressId' }
  ] };

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
            this.table.rows = response.responseObj.addressObj;
            this.table.rows.forEach(function(part:any, index:number, theArray: any) {
              theArray[index].primary = theArray[index].isPrimary ? 'Primary' : 'Non Primary';
            });
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
    this.client.postBodyRequest('Student/Address', this.request, this.request.addressId).subscribe(response => {
      this.table.rows = response.responseObj.addressObj;
      this.table.rows.forEach(function(part:any, index:number, theArray:any) {
        theArray[index].primary = theArray[index].isPrimary ? 'Primary' : 'Non Primary';
      });
      this.table = {... this.table};
      this.request.addressId = 0;
      form.resetForm();
      this.alert.showMessage(response.errorObj[0].message);
    });
  }

  editItem(item: any): void {
    this.request = item;
  }

  deleteItem(item: any): void {
    item.active = !item.active;
    this.client.patchBodyRequest('Student/Address', item, item.addressId).subscribe(response => {
      this.table.rows = response.responseObj.addressObj;
      this.table.rows.forEach(function(part:any, index:number, theArray:any) {
        theArray[index].primary = theArray[index].isPrimary ? 'Primary' : 'Non Primary';
      });
      this.table = {... this.table};
      this.alert.showMessage(response.errorObj[0].message);
    });
  }

}
