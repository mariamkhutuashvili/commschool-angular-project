import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/post.service';
import { Post } from 'src/app/interfaces/post.interface';

@Component({
  selector: 'app-editposts',
  templateUrl: './editposts.component.html',
  styleUrls: ['./editposts.component.scss'],
})
export class EditpostsComponent implements OnInit {
  originalPost: Post = { id: 0, title: '', body: '', userId: 0 };
  post: Post = { id: 0, title: '', body: '', userId: 0 };
  isEditMode = false;
  showError = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const postId = +params['id'];
      this.apiService.getPostById(postId).subscribe((post: Post) => {
        this.post = post;
        this.originalPost = { ...post };
      });
    });
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
  }

  cancelEdit(): void {
    this.post = { ...this.originalPost };
    this.isEditMode = false;
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

  validateInputs(): boolean {
    return (
      this.post.title.trim().length > 0 && this.post.body.trim().length > 0
    );
  }

  updatePost(): void {
    if (this.validateInputs()) {
      this.apiService.updatePost(this.post).subscribe(() => {
        this.isEditMode = false;
        this.goBack();
      });
    } else {
      this.showError = true;
    }
  }
}
