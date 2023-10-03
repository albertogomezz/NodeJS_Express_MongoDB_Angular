import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

const URL = 'http://127.0.0.1:3000/categories';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) { }

  all_categories(params: any): Observable<Category[]> {
    return this.http.get<Category[]>(URL , {params});
  }

  // get_category(id: String): Observable<Category> {
  //   return this.http.get<Category>(`${URL}/${id}`);
  // }

  // create_category(category: Category): Observable<Category[]> {
  //   return this.http.post<Category[]>(URL, category);
  // }

  // delete_category(id: String): Observable<Category[]> {
  //   return this.http.delete<Category[]>(`${URL}/${id}`);
  // }
  
  // delete_all_categories(): Observable<Category[]> {
  //   return this.http.delete<Category[]>(`${URL}`);
  // }
}