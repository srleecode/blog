import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  imports: [CommonModule, ScullyLibModule],
  declarations: [PostComponent],
  exports: [PostComponent],
})
export class BlogPostUiModule {}
