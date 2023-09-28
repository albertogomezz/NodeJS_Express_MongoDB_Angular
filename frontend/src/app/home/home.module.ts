import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ListCategoriesComponent } from '../shared/list-categories/list-categories.component';



@NgModule({
  declarations: [
    HomeComponent,
    ListCategoriesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
