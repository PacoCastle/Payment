import { Injectable } from '@angular/core';
import { Payment } from '../_models/payment';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { PaymentService } from '../_services/payment.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PaymentListResolver implements Resolve<Payment[]> { 
  pageNumber = 1;
  pageSize = 5; 

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Payment[]> {
    return this.paymentService
    .getPayments
    (this.pageNumber, 
      this.pageSize
      )
    .pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}