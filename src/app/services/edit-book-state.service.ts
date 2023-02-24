import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
import { BookDto } from '../common/cqrs/books/dto/BookDto';
import { BookEditDto } from '../common/cqrs/books/dto/BookEditDto';
import { EditBookAction } from '../common/enums/EditBookAction';
import { SaveResult } from '../common/models/SaveResult';
import { BackendService } from './backend.service';
import { BookListStateService } from './book-list-state.service';


@Injectable({
  providedIn: 'root'
})
export class EditBookStateService {

  private _changeBookEmitter: EventEmitter<BookEditDto|undefined> =
  new EventEmitter();
  private _saveBookSubscription:Subscription = new Subscription();

  public action:EditBookAction;
  public book?:BookEditDto;

  constructor(
    private backendService:BackendService,
    private bookListStateService:BookListStateService
  ) {
    this.action = EditBookAction.Add;
  }

  public ClearState(){
    this.action = EditBookAction.Add;
    this.book = undefined;
    this.EmitChangeBook();
  }

  public EditBook(book:BookDto){
    this.action = EditBookAction.Edit;
    (this.backendService.get(`books/${book.id}/edit`) as Observable<BookEditDto>)
    .pipe(take(1))
    .subscribe({
      next: (book:BookEditDto) => {
        this.book = book;
        this.EmitChangeBook();
      },
      error: (error) => console.log(error)
    })


  }

  public GetChangeBookEmitter() {
    return this._changeBookEmitter;
  }

  private EmitChangeBook() {
    if (this.book == undefined)
    {
      this._changeBookEmitter.emit();
    }
    else
    {
      this._changeBookEmitter.emit(this.book);
    }
  }

  public SaveBook(book:BookEditDto){
    if(this.book !== undefined){
       book.id = this.book.id;
    };

    (this.backendService.post("books/save",book) as Observable<SaveResult>)
    .pipe(take(1)) //auto unsubscribe afret emit 1 result?
    .subscribe({
      next: (result) => {
        this.ClearState()
        this.bookListStateService.EmitRefreshBookListEvent();
      },
      error: (error) => console.log(error),
    });
  }
}

