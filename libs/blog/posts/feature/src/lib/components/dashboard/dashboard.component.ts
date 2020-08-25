import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { PostCard } from '@srlee/blog/posts/util';
import { PaginatedDataSourceService } from '@srlee/blog/posts/data-access';

@Component({
  selector: 'srlee-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [PaginatedDataSourceService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnChanges, OnDestroy {
  @Input() cards: PostCard[];
  @Output() cardClick = new EventEmitter<PostCard>();
  paginatedCards$: Observable<PostCard[]>;

  constructor(public dataSource: PaginatedDataSourceService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.cards && changes.cards.currentValue) {
      if (this.dataSource.isConnected) {
        this.dataSource.disconnect();
      }
      this.dataSource.loadContent(changes.cards.currentValue);
      this.paginatedCards$ = this.dataSource.connect();
    }
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }
}
