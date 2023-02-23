import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
import { BookDto } from '../common/cqrs/books/dto/BookDto';
import { EditBookAction } from '../common/enums/EditBookAction';
import { SaveResult } from '../common/models/SaveResult';
import { BackendService } from './backend.service';
import { BookListStateService } from './book-list-state.service';


@Injectable({
  providedIn: 'root'
})
export class EditBookStateService {

  private _changeBookEmitter: EventEmitter<BookDto|undefined> =
  new EventEmitter(); //<BookDto|undefined>
  private _saveBookSubscription:Subscription = new Subscription();

  public action:EditBookAction;
  public book?:BookDto;

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
    this.book = book;
    this.EmitChangeBook();
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

  public SaveBook(book:BookDto){
    if(this.book !== undefined){
       book.id = this.book.id;
    }
    console.log(book);
    this._saveBookSubscription = (this.backendService.post('books/save',book) as Observable<SaveResult>)
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

