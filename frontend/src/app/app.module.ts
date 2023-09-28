import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ShopModule} from './shop/shop.module'
import {HomeModule} from './home/home.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShopModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
