import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { Filters } from 'src/app/core/models/filters.model';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})

export class ListProductsComponent implements OnInit {

  //Declaracions
  routeFilters!: string | null;
  products: Product[] = [];
  slug_Category!: string | null;
  offset = 0;
  limit = 10;
  totalPages: Array<number> = [];
  listCategories: Category[] = [];
  filters!: Filters;

  constructor(private productService: ProductService, private ActivatedRoute: ActivatedRoute, private CategoryService: CategoryService){}

  //Lo que inicia
  ngOnInit(): void {
    console.log()
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    this.get_products();
    this.getListForCategory();
  }
  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }
  //Agarrar productes
  get_products(): void {
    const params = this.getRequestParams(this.offset, this.limit);
    if (this.slug_Category !== null) { 
      this.productService.getProductsByCategory(this.slug_Category, params).subscribe(
        (data : any) => {
          console.log(data);
          if (this.slug_Category) {
            this.filters.category = this.slug_Category;
          }
          this.products = data.products;
          // this.totalPages = Array.from(new Array(Math.ceil(data.product_count/this.limit)), (val, index) => index + 1);
          // console.log(this.products[0].images);
        });
    } else if (this.routeFilters !== null) {
      this.refresRouteFilter();
      this.get_list_filtered(this.filters);
    } else {
      this.get_list_filtered(this.filters);
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
  


  get_list_filtered(filters: Filters) {
    this.filters = filters;
    // console.log(this.filters);
    this.productService.get_products(this.filters).subscribe(
      (data: any) => {
        console.log(data);
        // this.products = data.products;
        // console.log(this.products);
        // this.totalPages = Array.from(new Array(Math.ceil(data.product_count/this.limit)), (val, index) => index + 1);
      }
    );
  }
  

  refresRouteFilter() {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    if(typeof(this.routeFilters) == "string" ){
      this.filters = JSON.parse(atob(this.routeFilters));
    }else{
      this.filters = new Filters();
    }
  }
}

