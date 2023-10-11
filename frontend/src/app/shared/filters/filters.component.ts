import { Component, Input } from '@angular/core';
import { Filters } from '../../core/models/filters.model';
import { Product } from '../../core/models/product.model';
// import { Category } from '../../core/models/category.model';
import { Category, CategoryService } from '../../core/services/cateogry.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent {

  // @Input() all_categories!: Category[];

  ngOnInit(): void {
    // console.log(this.all_categories);
  }
}
