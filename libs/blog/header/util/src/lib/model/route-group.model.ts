import { RouteType } from './route-type.enum';
import { PostCard } from '@srlee/blog/posts/util';

export interface RouteGroup {
  type: RouteType;
  routes: PostCard[];
}
