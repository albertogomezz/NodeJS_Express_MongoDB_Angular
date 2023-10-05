import { Component, OnInit, Input} from '@angular/core';
import { CarouselHome } from 'src/app/core/models/carousel.model';
import { Category } from 'src/app/core/models/category.model';
import { CarouselService } from 'src/app/core/services/carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {

  items_carousel!: CarouselHome[];
  //  @Input() page!: String;

  constructor(private CarouselService: CarouselService) {}

  ngOnInit(): void {
    this.carousel_categories();
  }

  carousel_categories(): void {
    this.CarouselService.getCarouselHome().subscribe(((data : any) => {
      console.log(data);
      this.items_carousel = data.categories;
  })) 
  }

}