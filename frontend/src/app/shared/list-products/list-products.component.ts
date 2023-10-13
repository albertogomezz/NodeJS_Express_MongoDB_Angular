import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/cateogry.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})

export class ListProductsComponent implements OnInit {

  //Declaracions
  products: Product[] = [];
  slug_Category!: string | null;
  offset = 0;
  limit = 10;


  listCategories: Category[] = [];

  constructor(private productService: ProductService, private ActivatedRoute: ActivatedRoute, private CategoryService: CategoryService){}

  //Lo que inicia
  ngOnInit(): void {
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');
    // this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    this.get_products();
    this.getListForCategory();
  }

  //Agarrar productes
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
          // console.log(this.products[0].images);
      });
    }
  }

  //Agarrar les categories pa els filtros
  getListForCategory() {
    const params = this.getRequestParams(this.offset, this.limit);
    
    this.CategoryService.all_categories(params).subscribe(
      (data: any) => {
        this.listCategories = data.categories;
        console.log(this.listCategories);
      }
    );
  }

  //FER FUNCIO SENSE OFFSET I LIMIT
  //FER FUNCIO SENSE OFFSET I LIMIT
  //FER FUNCIO SENSE OFFSET I LIMIT
  //FER FUNCIO SENSE OFFSET I LIMIT
  //FER FUNCIO SENSE OFFSET I LIMIT
  

  getRequestParams(offset: number,limit: number): any{

    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }
}

