import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service'
import { Product } from '../../core/models/product.model'


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService){}
  ngOnInit(): void {
    this.get_products();
  }


  get_products(): void {
    this.productService.get_products().subscribe(
      (data : any) => {
        console.log(data);
        this.products = data.products;
    });
  }
}

