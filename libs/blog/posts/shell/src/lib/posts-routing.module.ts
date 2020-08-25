import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from '@srlee/blog/posts/feature';
import { PostComponent } from '@srlee/blog/post/ui';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: ':slug',
    component: PostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
