import { Component, Input, OnInit } from '@angular/core';
import { CarouselHome } from 'src/app/core/models/carousel.model';
import { Category } from '../../core/models/category.model'


@Component({
  selector: 'app-carousel-items',
  templateUrl: './carousel-items.component.html',
  styleUrls: ['./carousel-items.component.css']
})

export class CarouselItemsComponent implements OnInit {

  @Input() category: CarouselHome[] = [];



  selectIndex = 0;
  selectIndex_product_img = 0;

  constructor(){}
  ngOnInit(): void {
    console.log('hola ngon init del xikito');
  }






  // autoSlideImages(): void {
  //   setInterval(()=>{
  //     this.Next();
  //   }, this.slideInterval);
  // }

  // selectImage(index: number): void {
  //   this.selectIndex = index;
  //   this.selectIndex_product_img = index;
  // }

  // Prev(): void {
  //   if (this.selectIndex === 0) {
  //     this.selectIndex = this.category.length - 1;
  //   } else {
  //     this.selectIndex--;
  //   }

  //   if (this.selectIndex_product_img === 0) {
  //     this.selectIndex_product_img = this.images_product.length - 1;
  //   } else {
  //     this.selectIndex_product_img--;
  //   }
  // }

  // Next(): void {
  //   if (this.selectIndex === this.category.length - 1) {
  //     this.selectIndex = 0;
  //   } else {
  //     this.selectIndex++;
  //   }

  //   if (this.selectIndex_product_img === this.images_product.length - 1) {
  //     this.selectIndex_product_img = 0;
  //   } else {
  //     this.selectIndex_product_img++;
  //   }
  // }
}