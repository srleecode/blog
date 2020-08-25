import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './components/posts/posts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  imports: [CommonModule, MatCardModule, MatPaginatorModule, RouterModule],
  exports: [PostsComponent],
  declarations: [DashboardComponent, PostsComponent],
})
export class BlogPostsFeatureModule {}
