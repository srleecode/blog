import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  AfterViewChecked,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { HighlightService } from '@srlee/blog/post/data-access';

declare var ng: any;

@Component({
  selector: 'srlee-blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class PostComponent implements OnInit, OnDestroy, AfterViewChecked {
  private subscriptions$ = new Subscription();
  constructor(
    private scullyRoutesService: ScullyRoutesService,
    private highlightService: HighlightService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.subscriptions$.add(
      this.route.params.pipe(skip(1)).subscribe((params) => {
        this.scullyRoutesService.reload();
      })
    );
  }
  /**
   * Highlight blog post when it's ready
   */
  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
