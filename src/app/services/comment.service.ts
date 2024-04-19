import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Comment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class Commentservice {
  comments: Comment[] = [];

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      'https://jsonplaceholder.typicode.com/posts/1/comments'
    );
  }

  addComment(comment: Comment): Observable<Comment> {
    // user.id = ++this.userIdCounter;
    return this.http.post<Comment>(
      'https://jsonplaceholder.typicode.com/posts/1/comments',
      comment
    );
  }
}
