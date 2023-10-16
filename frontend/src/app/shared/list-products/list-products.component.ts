import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { Filters } from 'src/app/core/models/filters.model';
import { Location } from '@angular/common';

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
  listCategories: Category[] = [];
  filters = new Filters();
  offset: number = 0;
  limit: number = 3;
  totalPages: Array<number> = [];
  currentPage: number = 1;


  constructor(private productService: ProductService, private ActivatedRoute: ActivatedRoute, private CategoryService: CategoryService, private Location: Location){}

  //Lo que inicia
  ngOnInit(): void {
    console.log()
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');


    this.getListForCategory();    
  
      if(this.slug_Category !== null) {
        this.get_products_by_cat();
      }else{
        this.get_all_products();
      }
  }
  
  //Agarrar productes
  get_products_by_cat(): void {

    if (this.slug_Category !== null) {
      this.productService.getProductsByCategory(this.slug_Category).subscribe(
        (data: any) => {
          this.products = data.products;
          this.totalPages = Array.from(new Array(Math.ceil(data.product_count/this.limit)), (val, index) => index + 1);
          // console.log(data.products);
        });
      }
    }

  get_list_filtered(filters: Filters) {
    this.filters = filters;
      this.productService.get_products_filter(filters).subscribe(
        (data: any) => {
          this.products = data.products;
          this.totalPages = Array.from(new Array(Math.ceil(data.product_count/this.limit)), (val, index) => index + 1);
          console.log(this.products);
      });
  }

  get_all_products() {
    this.productService.get_products().subscribe(
      (data: any) => {
        this.products = data.products;
        this.totalPages = Array.from(new Array(Math.ceil(data.product_count/this.limit)), (val, index) => index + 1);
        console.log(this.products);
      });
  }
  
  //Agarrar les categories pa els filtros
  getListForCategory() {    
    this.CategoryService.all_categories_select().subscribe(
      (data: any) => {
        this.listCategories = data.categories;
      }
    );
  }

  setPageTo(pageNumber: number) {

    this.currentPage = pageNumber;

    // if (typeof this.routeFilters === 'string') {
    //   this.refresRouteFilter();
    // }

    if (this.limit) {
      this.filters.limit = this.limit;
      this.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
    this.get_list_filtered(this.filters);
  }
}

