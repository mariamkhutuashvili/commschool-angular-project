import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment.interface';
import { Commentservice } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number;
  comments!: Comment[];
  newCommentName: string = '';
  newCommentBody: string = '';
  showError: boolean = false;

  constructor(private Commentservice: Commentservice) {}

  validateInputs(): boolean {
    return (
      this.newCommentName.trim().length > 0 &&
      this.newCommentBody.trim().length > 0
    );
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      this.comments = JSON.parse(storedComments);
    } else {
      this.Commentservice.getComments().subscribe((comments) => {
        this.comments = comments;
        this.updateLocalStorage();
      });
    }
  }

  updateLocalStorage() {
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }

  addComment(): void {
    if (this.validateInputs()) {
      const newComment: Comment = {
        id:
          this.comments.length > 0
            ? this.comments[this.comments.length - 1].id + 1
            : 1,
        name: this.newCommentName.trim(),
        body: this.newCommentBody.trim(),
      };

      this.Commentservice.addComment(newComment).subscribe({
        next: (addedComment) => {
          this.comments.push(addedComment);
          this.updateLocalStorage();
          this.resetInputFields();
        },
        error: (error) => {
          console.error('Failed to add comment:', error);
          this.showError = true;
        },
      });
    } else {
      this.showError = true;
    }
  }

  resetInputFields() {
    this.newCommentName = '';
    this.newCommentBody = '';
    this.showError = false;
  }
}
