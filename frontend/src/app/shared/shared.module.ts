import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



//CATEGORIAS
import { ListCategoriesComponent } from '../shared/list-categories/list-categories.component';
import { CardCategoryComponent } from '../shared/card-category/card-category.component';

//PRODUCTOS
import { ListProductsComponent } from '../shared/list-products/list-products.component';
import { CardProductComponent } from '../shared/card-product/card-product.component';
import { CarouselItemsComponent } from './carousel-items/carousel-items.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CarouselComponent } from './carousel/carousel.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        NgbModule,
        InfiniteScrollModule
    ],
    declarations: [
        ListCategoriesComponent,
        CardCategoryComponent,
        ListProductsComponent,
        CardProductComponent,
        CarouselItemsComponent,
        CarouselComponent,
        
    ],
    exports: [
        ListCategoriesComponent,
        ListProductsComponent,
        FormsModule,
        ReactiveFormsModule,
        CardProductComponent,
        CardCategoryComponent,
        CarouselItemsComponent,
        CarouselComponent
    ],
})

export class SharedModule { }