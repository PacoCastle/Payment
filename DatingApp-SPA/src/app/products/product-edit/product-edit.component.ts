import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  product: Product;
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
    private productService: ProductService,
    private router: Router    
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      params['id'];
    });

    this.route.data.subscribe(data => {
      this.product = data[`product`];
    });
    
  } 

  updateUser() {
    this.productService
      .updateProduct(this.product.id,this.product)
      .subscribe(
        next => {
          this.alertify.success('Product updated successfully');
          this.editForm.reset(this.product);
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.productService.getProducts(this.product).subscribe(() => {
            this.router.navigate(['/products']);
          });
        }
      );
  }
}