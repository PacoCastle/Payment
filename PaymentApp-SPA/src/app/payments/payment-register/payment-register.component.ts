import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { PaymentService } from '../../_services/payment.service';
import { AlertifyService } from '../../_services/alertify.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Payment } from '../../_models/payment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-register',
  templateUrl: './payment-register.component.html',
  styleUrls: ['./payment-register.component.css']
})
export class PaymentRegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  payment: Payment;
  registerForm: FormGroup;  

  constructor(
    private authService: AuthService,
    private paymentService: PaymentService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
        amount: ['', Validators.required]
      }
    );
  }
  register() {
    if (this.registerForm.valid) {
      this.payment = Object.assign({}, this.registerForm.value);
      this.paymentService.register(this.payment).subscribe(
        () => {
          this.alertify.success('Registration succesful');
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
  cancel() {
    this.router.navigate(['/payments']);
  }
}
