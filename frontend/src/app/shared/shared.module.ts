import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


//CATEGORIAS
import { ListCategoriesComponent } from '../shared/list-categories/list-categories.component';

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
        ListProductsComponent,
        CardProductComponent,
    ],
    exports: [
        ListCategoriesComponent,
        ListProductsComponent,
        FormsModule,
        ReactiveFormsModule,
        CardProductComponent,
    ],
})

export class SharedModule { }