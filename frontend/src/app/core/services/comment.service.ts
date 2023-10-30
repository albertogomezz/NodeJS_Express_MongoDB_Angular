import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment } from '../models/comment.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor (
    private apiService: ApiService
  ) {}

  add(slug: any, payload: any): Observable<Comment> {
    return this.apiService
    .post(
        `/${slug}/comments`,{ comment: { body: payload } }
    ).pipe(map(data => data.comment));
    }

  getAll(slug: any): Observable<Comment[]> {
    return this.apiService.get(`/${slug}/comments`)
      .pipe(map(data => data.comments));
  }

  destroy(commentId: any, articleSlug: any) {
    return this.apiService.delete(
        `/${articleSlug}/comments/${commentId}`
        );
  }

}