import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { PageEvent } from '@angular/material/paginator';
import parse from 'date-fns/parse';
import { PostCard } from '@srlee/blog/posts/util';

@Injectable()
export class PaginatedDataSourceService implements DataSource<PostCard> {
  length: number;
  pageSize: number;
  pageIndex: number;
  pageSizeOptions: number[] = [10, 25, 100];
  isConnected = false;

  private content$: BehaviorSubject<PostCard[]>;
  private content: PostCard[];

  connect(): Observable<PostCard[]> {
    this.isConnected = true;
    return this.content$.asObservable();
  }

  private getPublishedDate(date: string): Date {
    if (!date) {
      return undefined;
    }
    return parse(date, 'dd/MM/yyyy', new Date());
  }

  loadContent(content: PostCard[]): void {
    const processedContent = content
      .filter((card) => !!card.published)
      .sort(
        (a, b) =>
          this.getPublishedDate(b.publishedDate).getTime() -
          this.getPublishedDate(a.publishedDate).getTime()
      );
    let pageSize = processedContent.length;
    if (pageSize > 10) {
      pageSize = 10;
    }
    this.pageSize = pageSize;
    this.pageIndex = 0;
    this.content = processedContent;
    this.length = this.content.length;
    this.content$ = new BehaviorSubject<PostCard[]>(this.getPagesContent());
  }

  updatePage(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.content$.next(this.getPagesContent());
  }

  private getPagesContent(): PostCard[] {
    return this.content.slice(
      this.pageIndex * this.pageSize,
      (this.pageIndex + 1) * this.pageSize
    );
  }
  disconnect(): void {
    this.content = [];
    if (!!this.content$) {
      this.content$.complete();
    }
    this.isConnected = false;
  }
}
