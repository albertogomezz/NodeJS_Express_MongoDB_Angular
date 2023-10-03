import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];
  slug_Category!: string | null;

  constructor(private productService: ProductService, private ActivatedRoute: ActivatedRoute,){}
  ngOnInit(): void {
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');
    // this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
        this.get_products();
  }


  get_products(): void {

    if (this.slug_Category != null){
      this.productService.getProductsByCategory(this.slug_Category).subscribe(
        (data : any) => {
          // console.log(data);
          this.products = data.products;
      })
    }
    
    else{
      this.productService.get_products().subscribe(
        (data : any) => {
          // console.log(data);
          this.products = data.products;
          console.log(this.products[0].images);
      });
    }
  }
}

