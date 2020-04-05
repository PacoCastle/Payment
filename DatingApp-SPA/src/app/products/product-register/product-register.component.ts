import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { ProductService } from '../../_services/product.service';
import { AlertifyService } from '../../_services/alertify.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Product } from '../../_models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  product: Product;
  registerForm: FormGroup;  

  constructor(
    private authService: AuthService,
    private productService: ProductService,
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
        status:['1'],
        name: ['', Validators.required],
        description: ['', Validators.required]        
      }
    );
  }
  register() {
    if (this.registerForm.valid) {
      this.product = Object.assign({}, this.registerForm.value);
      this.productService.register(this.product).subscribe(
        () => {
          this.alertify.success('Registration succesful');
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
  cancel() {
    this.router.navigate(['/products']);
  }
}
