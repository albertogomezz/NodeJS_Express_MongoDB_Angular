import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { NgxMultiselectModule } from '@ngx-lib/multiselect';

//CATEGORIAS
import { ListCategoriesComponent } from '../shared/list-categories/list-categories.component';
import { CardCategoryComponent } from '../shared/card-category/card-category.component';

//PRODUCTOS
import { ListProductsComponent } from '../shared/list-products/list-products.component';
import { CardProductComponent } from '../shared/card-product/card-product.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
    ],
    declarations: [
        ListCategoriesComponent,
        CardCategoryComponent,
        ListProductsComponent,
        CardProductComponent,
    ],
    exports: [
        ListCategoriesComponent,
        ListProductsComponent,
        FormsModule,
        ReactiveFormsModule,
        CardProductComponent,
        CardCategoryComponent
    ],
})

export class SharedModule { }