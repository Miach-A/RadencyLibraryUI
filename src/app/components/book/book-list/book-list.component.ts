import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { BookDto } from 'src/app/common/cqrs/books/dto/BookDto';
import { BackendService } from 'src/app/services/backend.service';
import { BookListStateService } from 'src/app/services/book-list-state.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  constructor(
    private _bookListStateService: BookListStateService,
    private _changeDetector: ChangeDetectorRef
  ) {}

  public books$: Observable<BookDto[]> = new Observable();

  ngOnInit(): void {
    this.books$ = this._bookListStateService.GetBooks();
    this._subscription.add(
      this._bookListStateService.GetRefreshBookListEmitter().subscribe({
        next: () => {
          this.books$ = this._bookListStateService.GetBooks();
          this._changeDetector.markForCheck();
        },
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
