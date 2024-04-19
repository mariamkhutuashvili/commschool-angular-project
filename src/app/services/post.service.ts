import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  posts: Post[] = [];
  users: User[] = [];
  private userIdCounter: number = 0;
  private postIdCounter: number = 0;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    if (this.users.length !== 0) {
      return new Observable<User[]>((observer) => {
        observer.next(this.users);
        observer.complete();
      });
    } else {
      return this.http
        .get<User[]>('https://jsonplaceholder.typicode.com/Users')
        .pipe(
          map((users) => {
            this.users = users;
            this.userIdCounter = users.length;
            return users;
          })
        );
    }
  }

  getPosts(): Observable<Post[]> {
    if (this.posts.length !== 0) {
      return new Observable<Post[]>((observer) => {
        observer.next(this.posts);
        observer.complete();
      });
    } else {
      return this.http
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
        .pipe(
          map((posts) => {
            this.posts = posts;
            this.postIdCounter = posts.length;
            return posts;
          })
        );
    }
  }

  addUser(user: User): Observable<User> {
    user.id = ++this.userIdCounter;
    return this.http
      .post<User>('https://jsonplaceholder.typicode.com/users', user)
      .pipe(
        map((addedUser) => {
          addedUser.id = user.id;
          this.users.push(addedUser);
          return addedUser;
        })
      );
  }

  addPost(post: Post): Observable<Post> {
    post.id = ++this.postIdCounter;
    return this.http
      .post<Post>('https://jsonplaceholder.typicode.com/posts', post)
      .pipe(
        map((addedPost) => {
          addedPost.id = post.id;
          this.posts.unshift(addedPost);
          return addedPost;
        })
      );
  }

  getPostById(id: number): Observable<Post> {
    const foundPost = this.posts?.find((p) => p.id === id);
    if (foundPost) {
      return new Observable<Post>((observer) => {
        observer.next(foundPost);
        observer.complete();
      });
    } else {
      return this.http.get<Post>(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
    }
  }

  updatePost(post: Post): Observable<Post> {
    if (post.id > 100) {
      return new Observable<Post>((observer) => {
        observer.next(post);
        observer.complete();
      });
    } else {
      return this.http.put<Post>(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        post
      );
    }
  }
}
