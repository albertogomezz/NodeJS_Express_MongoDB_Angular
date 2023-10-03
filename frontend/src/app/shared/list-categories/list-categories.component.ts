import { Component } from '@angular/core';
import { CategoryService } from '../../core/services/cateogry.service'
import { Category } from 'src/app/core/models/category.model';
import { offset } from '@popperjs/core';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent {
  
  offset = 0;
  limit = 3
  categories: Category[] = [];

  constructor(private CategoryService: CategoryService) { }

  //INICIA 

  ngOnInit(): void {
    this.getCategories();
  }

  // TOTES LES CATEGORIES
  getCategories() {
    const params = this.getRequestParams(this.offset, this.limit);
    // console.log(params);
    
    this.CategoryService.all_categories(params).subscribe(
      (data: any) => {
        this.categories = data.categories.concat(data);
        this.limit = this.limit + 3;
        console.log(this.categories);        
      }
    );
  }

  getRequestParams(offset: number,limit: number): any{
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }

  scroll() {
    this.getCategories();
  }
}