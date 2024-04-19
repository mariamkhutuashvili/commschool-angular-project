import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/post.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss'],
})
export class AddpostComponent {
  newPost: Post = { userId: 0, id: 0, title: '', body: '' };
  newUserName: string = '';
  showError: boolean = false;

  @Output() postAdded = new EventEmitter<void>();

  constructor(private apiService: ApiService, private router: Router) {}

  validateInputs(): boolean {
    return (
      this.newUserName.trim().length > 0 &&
      this.newPost.title.trim().length > 0 &&
      this.newPost.body.trim().length > 0
    );
  }

  addPost(): void {
    if (this.validateInputs()) {
      const newUser: User = { id: 0, name: this.newUserName.trim() };
      this.apiService.addUser(newUser).subscribe({
        next: (user) => {
          const newPost: Post = {
            userId: user.id,
            id: 0,
            title: this.newPost.title.trim(),
            body: this.newPost.body.trim(),
          };
          this.apiService.addPost(newPost).subscribe({
            next: () => {
              this.postAdded.emit();
              this.newUserName = '';
              this.newPost.title = '';
              this.newPost.body = '';
            },
            error: (error) => console.error('Error adding post:', error),
          });
        },
        error: (error) => console.error('Error adding user:', error),
      });
    } else {
      this.showError = true;
    }
  }
}
