import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { RouteGroup } from '@srlee/blog/header/util';
import { PostCard } from '@srlee/blog/posts/util';
import { RoutesService } from '@srlee/blog/header/data-access';

@Component({
  selector: 'srlee-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup = this.formBuilder.group({
    routeGroup: '',
  });
  routeGroups$: Observable<RouteGroup[]>;
  @ViewChild('autoCompleteInput') autoCompleteInput: ElementRef;

  constructor(
    private routesService: RoutesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeGroups$ = this.getFilteredRouteGroups$();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  private getFilteredRouteGroups$(): Observable<RouteGroup[]> {
    return combineLatest([
      this.routesService.getRoutes$(),
      this.searchForm.get('routeGroup').valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([routeGroups, search]: [RouteGroup[], string]) =>
        routeGroups.map((routeGroup) => ({
          ...routeGroup,
          routes: this.getRoutesWithTitle(routeGroup.routes, search),
        }))
      )
    );
  }

  goToRoute(event: MatAutocompleteSelectedEvent): void {
    const route: string = event.option.value;
    this.router.navigate([route], { replaceUrl: true });
    this.router.navigated = false;
    this.searchForm.get('routeGroup').setValue('');
    this.autoCompleteInput.nativeElement.blur();
  }

  private getRoutesWithTitle(routes: PostCard[], title: string): PostCard[] {
    const trimmedTitle = (title || '').trim();
    return routes.filter(
      (route) =>
        !trimmedTitle ||
        route.title.toLowerCase().includes(trimmedTitle.toLowerCase())
    );
  }
}
