import { Component, OnInit } from '@angular/core';
import { Product } from '../../_models/product';
import { ProductService } from '../../_services/product.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  registerMode = false;
  products: Product[];  
  pagination: Pagination;

  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.products = data['products'].result;
      this.pagination = data['products'].pagination;
    });    
  }

  loadProducts() {
    this.productService
      .getProducts(
        this.pagination.currentPage,
        this.pagination.itemsPerPage        
      )
      .subscribe(
        (res: PaginatedResult<Product[]>) => {
          this.products = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadProducts();
  }
}
