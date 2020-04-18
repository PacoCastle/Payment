import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/_models/payment';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { PaymentService } from 'src/app/_services/payment.service';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.css']
})
export class PaymentEditComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  payment: Payment;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private paymentService: PaymentService,
    private router: Router    
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      params['id'];
    });

    this.route.data.subscribe(data => {
      this.payment = data[`payment`];
    });
    
  } 

  updatePayment() {
    this.paymentService
      .updatePayment(this.payment.id,this.payment)
      .subscribe(
        next => {
          this.alertify.success('Payment updated successfully');
          this.editForm.reset(this.payment);
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.paymentService.getPayments(this.payment).subscribe(() => {
            this.router.navigate(['/payments']);
          });
        }
      );
  }
}