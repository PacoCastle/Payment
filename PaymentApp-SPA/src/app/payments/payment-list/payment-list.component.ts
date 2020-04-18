import { Component, OnInit } from '@angular/core';
import { Payment } from '../../_models/payment';
import { PaymentService } from '../../_services/payment.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  registerMode = false;
  payments: Payment[];  
  pagination: Pagination;

  constructor(
    private paymentService: PaymentService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.payments = data['payments'].result;
      this.pagination = data['payments'].pagination;
    });    
  }

  loadPayments() {
    this.paymentService
      .getPayments(
        this.pagination.currentPage,
        this.pagination.itemsPerPage        
      )
      .subscribe(
        (res: PaginatedResult<Payment[]>) => {
          this.payments = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPayments();
  }
  deletePayment(id: number) {
    this.alertify.confirm(
      'Are you Sure you want to delete this pay?',
      () => {
        this.paymentService
          .deletePayment(id)
          .subscribe(
            () => {
              this.payments.splice(
                this.payments.findIndex(m => m.id === id),
                1
              );
              this.alertify.success('Pay has been deleted');
            },
            error => {
              this.alertify.error('Failed to delete the Pay');
            }
          );
      }
    );
  }
}
