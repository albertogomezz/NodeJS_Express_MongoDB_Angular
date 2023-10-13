import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filters } from '../../core/models/filters.model';
import { Product } from '../../core/models/product.model';
import { Category } from '../../core/models/category.model';
// import { Category } from '../../core/services/cateogry.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent {

  constructor ( private ActivatedRoute: ActivatedRoute, private Router: Router) {}

  @Input() listCategories!: Category[];

  ngOnInit(): void {
  }
}
