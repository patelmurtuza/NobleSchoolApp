import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
    constructor(private router: Router) {

    }
    
    handleError(error: Error) {
        if(environment.production) {
            return this.router.navigate(['error']);
        }
        return error;
    }
}