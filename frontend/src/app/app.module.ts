import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FooterComponent, HeaderComponent } from './shared/layout/index';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
// import { NgModule } from '@ng-bootstrap/ng-bootstrap';


// Toastr
// import { ToastrModule } from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    // CoreModule,
    BrowserModule,
    // BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }