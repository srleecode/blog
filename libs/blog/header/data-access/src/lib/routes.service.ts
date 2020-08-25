import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RouteGroup, RouteType } from '@srlee/blog/header/util';
import { PostCard } from '@srlee/blog/posts/util';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  constructor(private scullyRoutesService: ScullyRoutesService) {}

  getRoutes$(): Observable<RouteGroup[]> {
    return this.getScullyRoutes$().pipe(
      map((routeGroups) =>
        routeGroups.map((routeGroup) => ({
          ...routeGroup,
          routes: routeGroup.routes.filter((route) => !!route.published),
        }))
      )
    );
  }

  private getScullyRoutes$(): Observable<RouteGroup[]> {
    return this.scullyRoutesService.available$.pipe(
      map((routeList: PostCard[]) => {
        const postRoutes = routeList.filter((route: PostCard) =>
          route.route.startsWith(`/posts/`)
        );
        const conceptsRoutes = routeList.filter((route: PostCard) =>
          route.route.startsWith(`/concepts/`)
        );
        const idealsRoutes = routeList.filter((route: PostCard) =>
          route.route.startsWith(`/ideals/`)
        );
        const codeReviewRoutes = routeList.filter((route: PostCard) =>
          route.route.startsWith(`/code-review-checklist/`)
        );
        return [
          {
            type: RouteType.CodeReview,
            routes: this.getSortedRoutes(codeReviewRoutes),
          },
          {
            type: RouteType.Concept,
            routes: this.getSortedRoutes(conceptsRoutes),
          },
          {
            type: RouteType.Ideal,
            routes: this.getSortedRoutes(idealsRoutes),
          },
          { type: RouteType.Post, routes: this.getSortedRoutes(postRoutes) },
        ];
      })
    );
  }

  private getSortedRoutes(routes: PostCard[]): PostCard[] {
    return (routes || []).sort((a, b) =>
      (a.title || '').localeCompare(b.title, undefined, {
        sensitivity: 'base',
        ignorePunctuation: true,
      })
    );
  }
}
