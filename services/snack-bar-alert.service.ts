import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SnackBarAlertService {

  constructor(private snackBar: MatSnackBar, private route: Router) { }

  showMessage(message: string) {
    this.snackBar.open(message, 'x', { duration: 5000 });
  }

  redirectWithMessage(message: string, url: string, route: any) {
    let snack = this.snackBar.open(message, 'x', { duration: 3000 });
      snack.afterDismissed().subscribe(() => {
        this.route.navigate([url, route]);
      });
  }
}
