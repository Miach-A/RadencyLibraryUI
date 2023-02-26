import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subscription, switchMap, take } from 'rxjs';
import { BookDto } from '../common/cqrs/books/dto/BookDto';
import { BookEditDto } from '../common/cqrs/books/dto/BookEditDto';
import { EditBookAction } from '../common/enums/EditBookAction';
import { SaveResult } from '../common/models/SaveResult';
import { BackendService } from './backend.service';
import { BookListStateService } from './book-list-state.service';

@Injectable({
  providedIn: 'root',
})
export class EditBookStateService {
  private _changeBookEmitter: EventEmitter<BookEditDto | undefined> =
    new EventEmitter();

  private _bookGetSubscription:Subscription = new Subscription();
  private _bookSaveSubscription:Subscription = new Subscription();

  public action: EditBookAction;
  public book?: BookEditDto;

  constructor(
    private _backendService: BackendService,
    private _bookListStateService: BookListStateService
  ) {
    this.action = EditBookAction.Add;
  }

  public ClearState() {
    this.action = EditBookAction.Add;
    this.book = undefined;
    this.EmitChangeBook();
  }

  public EditBook(book: BookDto) {
    this.action = EditBookAction.Edit;

    //this._bookGetSubscription.unsubscribe();
    this._bookGetSubscription.add(
      (
        this._backendService.get(
          `books/${book.id}/edit`
        ) as Observable<BookEditDto>
      )
        .pipe(take(1))
        .subscribe({
          next: (book: BookEditDto) => {
            this.book = book;
            this.EmitChangeBook();
          },
          error: (response) => {
            response.error.forEach((element: any) => {
              alert(element.errorMessage);
            });
          },
        })
    );
  }

  public GetChangeBookEmitter() {
    return this._changeBookEmitter;
  }

  private EmitChangeBook() {
    if (this.book == undefined) {
      this._changeBookEmitter.emit();
    } else {
      this._changeBookEmitter.emit(this.book);
    }
  }

  public SaveBook(book: BookEditDto) {
    if (this.book !== undefined) {
      book.id = this.book.id;
    }

    //this._bookSaveSubscription.unsubscribe();
    this._bookSaveSubscription.add(
      (this._backendService.post('books/save', book) as Observable<SaveResult>)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.ClearState();
            this._bookListStateService.EmitRefreshBookListEvent();
          },
          error: (response) => {
            response.error.forEach((element: any) => {
              alert(element.errorMessage);
            });
          },
        })
    );
  }

  ngOnDestroy(): void {
    this._bookGetSubscription.unsubscribe();
    this._bookSaveSubscription.unsubscribe();
  }
}
