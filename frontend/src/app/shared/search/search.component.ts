import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Filters } from 'src/app/core/models/filters.model';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/product.model';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchEvent: EventEmitter<Filters> = new EventEmitter();

  search_value: string | undefined = '';
  listProducts: Product[] = [];
  filters: Filters = new Filters();
  routeFilters: string | null;
  search: any;


  constructor(
    private ProductService: ProductService,
    private Router: Router,
    private ActivatedRoute: ActivatedRoute,
    private Location: Location
  ) {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
  }

  ngOnInit(): void {
    this.filters_route();
    this.search_value = this.filters.name || undefined;
  }

  public filters_route() {
    if (this.routeFilters !== null) {
      this.filters = JSON.parse(atob(this.routeFilters));
      this.checkTime(this.filters);
    }
  }

  public type_event(writtingValue: any): void {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters'); 
    this.search = writtingValue;
    console.log(this.search);
    this.searchEvent.emit(this.search);
    this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
    // console.log(writtingValue);
    // this.checkTime(writtingValue);
  }


  getList() {
    this.ProductService.find_product_name(this.search).subscribe(
      (data : any) => {
        console.log(data);
        this.listProducts = data;
        console.log(this.listProducts);
    }); 
  }


  private checkTime(writtingValue: any) {

    let isShop: string = this.Router.url.split('/')[1];

    setTimeout(() => {
      if (writtingValue === this.search) {
        if (isShop === 'shop') {
          // this.notNamefilters();
          this.searchEvent.emit(this.filters);
          this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
        }
        if (this.search.length != 0)  this.getList();
      }
    }, 200);
  }


  public notNamefilters() {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    console.log(this.routeFilters);
    if (this.routeFilters !== null) {
      this.filters = JSON.parse(atob(this.routeFilters));
    }
    this.filters.name = this.search;
    this.filters.offset = 0;
    console.log('Not name: ' + this.filters.name);
    
  }

  public search_event(data: any): void {
    if (typeof data.search_value === 'string') {
      this.filters.name = data.search_value;
      this.filters.offset = 0;
      this.Router.navigate(['/shop/' + btoa(JSON.stringify(this.filters))]);
    }
  }

  onItemClickFired(item: any) {
    console.log(item.name);
  }

}