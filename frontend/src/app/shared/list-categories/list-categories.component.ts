import { Component } from '@angular/core';
import { CategoryService } from '../../core/services/cateogry.service'
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent {
  
  categories: Category[] = [];

  constructor(private CategoryService: CategoryService) { }

  //INICIA 

  ngOnInit(): void {
    this.getCategories();
  }

  // TOTES LES CATEGORIES
  getCategories() {
    // const params = this.getRequestParams(this.offset, 3);
    this.CategoryService.all_categories().subscribe(
      (data: any) => {
        this.categories = data.categories;
        console.log(this.categories);        
      }
    );
  }
  scroll(){
    this.getCategories();
  }
}