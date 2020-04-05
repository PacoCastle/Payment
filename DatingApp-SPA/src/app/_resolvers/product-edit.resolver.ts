import { Injectable } from '@angular/core';
import { Product } from '../_models/product';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { ProductService } from '../_services/product.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class ProductEditResolver implements Resolve<Product> {
  constructor(
    private productService: ProductService,
    private router: Router,
    private alertify: AlertifyService    
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    return this.productService.getProduct(route.params[`id`])
    .pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving your data');
        this.router.navigate(['/products']);
        return of(null);
      })
    );
  }
}