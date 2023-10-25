import { Component, OnInit, Input, } from '@angular/core';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})

export class CardProductComponent implements OnInit {

  @Input() products: Product = {} as Product;

  constructor() { }

  ngOnInit(): void {  

  }

  onToggleFavorite(favorited: boolean) {
    this.products.favorited = favorited;

    if (favorited) {
      this.products.favoritesCount++;
    } else {
      this.products.favoritesCount--;
    }
  }

}
