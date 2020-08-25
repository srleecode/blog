import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { BlogPostUiModule } from '@srlee/blog/post/ui';

@NgModule({
  imports: [CommonModule, BlogPostUiModule, PostRoutingModule],
  exports: [PostRoutingModule],
})
export class BlogPostShellModule {}
