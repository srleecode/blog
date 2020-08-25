import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PostCard } from '@srlee/blog/posts/util';

@Component({
  selector: 'srlee-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  blogPostRoutes$: Observable<PostCard[]>;

  constructor(
    private scullyRoutesService: ScullyRoutesService,
    private router: Router
  ) {}

  goToRoute(card: PostCard): void {
    this.router.navigate([card.route]);
  }
  ngOnInit() {
    this.blogPostRoutes$ = this.scullyRoutesService.available$.pipe(
      map((routeList: PostCard[]) =>
        routeList.filter((route: PostCard) =>
          route.route.startsWith(`/${this.getRouteType()}/`)
        )
      )
    );
  }

  private getRouteType(): string {
    const lastSegmentIndex = this.router.url.lastIndexOf('/') + 1;
    return this.router.url.substring(lastSegmentIndex);
  }
}
