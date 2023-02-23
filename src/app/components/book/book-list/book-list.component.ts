import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { BookDto } from 'src/app/common/cqrs/books/dto/BookDto';
import { GetAllBookQuery } from 'src/app/common/cqrs/books/queries/GetAllBookQuery';
import { GetRecommendedBookQuery } from 'src/app/common/cqrs/books/queries/GetRecommendedBookQuery';
import { BookListDataType } from 'src/app/common/enums/BookListDataType';
import { BackendService } from 'src/app/services/backend.service';
import { BookListStateService } from 'src/app/services/book-list-state.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription[] = [];

  constructor(
    private bookListStateService: BookListStateService,
    private backendService: BackendService,
    private changeDetector: ChangeDetectorRef
  ) {}

  public books$:Observable<BookDto[]> = new Observable();

  ngOnInit(): void {

    this.books$ = this.bookListStateService.GetBooks();
    this._subscriptions.push(
      this.bookListStateService.GetRefreshBookListEmitter().subscribe({
        next: () => {
          this.books$ = this.bookListStateService.GetBooks();
          this.changeDetector.markForCheck();
        },
      })
    );

  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
