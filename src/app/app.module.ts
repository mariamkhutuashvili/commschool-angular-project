import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { PostsComponent } from './posts/posts.component';
import { AddpostComponent } from './posts/addpost/addpost.component';
import { EditpostsComponent } from './posts/editposts/editposts.component';
import { CommentsComponent } from './posts/comments/comments.component';
import { AlbumsComponent } from './albums/albums.component';
import { PhotosComponent } from './albums/photos/photos.component';
import { TodosComponent } from './todos/todos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    CommentsComponent,
    PostsComponent,
    AddpostComponent,
    EditpostsComponent,
    AlbumsComponent,
    PhotosComponent,
    TodosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
