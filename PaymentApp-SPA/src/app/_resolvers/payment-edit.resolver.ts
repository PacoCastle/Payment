import { Injectable } from '@angular/core';
import { Payment } from '../_models/payment';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { PaymentService } from '../_services/payment.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class PaymentEditResolver implements Resolve<Payment> {
  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private alertify: AlertifyService    
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Payment> {
    return this.paymentService.getPayment(route.params[`id`])
    .pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving your data');
        this.router.navigate(['/payments']);
        return of(null);
      })
    );
  }
}