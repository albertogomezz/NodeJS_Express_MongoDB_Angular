import { Component,Input } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-list-products-on-profile',
  templateUrl: './list-products-on-profile.component.html',
  styleUrls: ['./list-products-on-profile.component.css']
})
export class ListProductsOnProfileComponent {
  
  @Input() products: Product = {} as Product;

  constructor() { }

  ngOnInit(): void {  
    
    console.log(this.products);
    
  }  
}
