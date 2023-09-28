import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ListProductsComponent } from '../shared/list-products/list-products.component';
import { ShopRoutingModule } from './shop-routing.module';
import { CardProductComponent } from '../shared/card-product/card-product.component';



@NgModule({
  declarations: [
    ShopComponent,
    ListProductsComponent,
    CardProductComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
