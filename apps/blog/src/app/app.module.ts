import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogHeaderFeatureModule } from '@srlee/blog/header/feature';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [AppComponent, ContentComponent, FooterComponent],
  imports: [
    BrowserModule,
    ScullyLibModule,
    BlogHeaderFeatureModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      {
        path: 'posts',
        loadChildren: () =>
          import('@srlee/blog/posts/shell').then((m) => m.BlogPostsShellModule),
      },
      {
        path: 'code-review-checklist',
        loadChildren: () =>
          import('@srlee/blog/posts/shell').then((m) => m.BlogPostsShellModule),
      },
      {
        path: 'concepts',
        loadChildren: () =>
          import('@srlee/blog/posts/shell').then((m) => m.BlogPostsShellModule),
      },
      {
        path: 'ideals',
        loadChildren: () =>
          import('@srlee/blog/posts/shell').then((m) => m.BlogPostsShellModule),
      },
      {
        path: 'post',
        loadChildren: () =>
          import('@srlee/blog/post/shell').then((m) => m.BlogPostShellModule),
      },
    ]),
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
