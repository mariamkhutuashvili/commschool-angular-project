import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  activeLink = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (
            event.urlAfterRedirects.includes('/posts') ||
            event.url.startsWith('/editposts/')
          ) {
            this.activeLink = 'posts';
          } else if (event.url.includes('/albums')) {
            this.activeLink = 'albums';
          } else if (event.url.includes('/todos')) {
            this.activeLink = 'todos';
          } else {
            this.activeLink = '';
          }
        }
      });
  }
}
