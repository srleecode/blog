import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { BlogPostsFeatureModule } from '@srlee/blog/posts/feature';

@NgModule({
  imports: [CommonModule, BlogPostsFeatureModule, PostsRoutingModule],
  exports: [PostsRoutingModule, BlogPostsFeatureModule],
})
export class BlogPostsShellModule {}
