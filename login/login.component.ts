import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceClientService } from '../services/serviceclient.service';
import { SnackBarAlertService } from '../services/snack-bar-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private client: ServiceClientService, private router: Router, private alert: SnackBarAlertService) { }

  request: any = {};

  ngOnInit(): void {
    this.request.email = 'noufil.namare@gmail.com';
    this.request.password = 'pass@2022';
  }

  submit() : void {
    this.client.postBodyRequest('Login/Token', this.request).subscribe(response => {
      if(response.errorObj[0].code == 0) {
        localStorage.setItem('accessToken', response.responseObj.tokenObj.accessToken);
        localStorage.setItem('refreshToken', response.responseObj.tokenObj.refreshToken);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.alert.showMessage(response.errorObj[0].message);
      }
    });
  }

}
