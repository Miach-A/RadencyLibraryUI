import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDto } from '../common/cqrs/books/dto/BookDto';
import { GetAllBookQuery } from '../common/cqrs/books/queries/GetAllBookQuery';
import { GetRecommendedBookQuery } from '../common/cqrs/books/queries/GetRecommendedBookQuery';
import { BookListDataType } from '../common/enums/BookListDataType';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class BookListStateService {
  private _bookListDataTypeEvent: EventEmitter<BookListDataType> =
    new EventEmitter();
  private _bookListDataType: BookListDataType;

  constructor(private _backendService: BackendService) {
    this._bookListDataType = BookListDataType.All;
  }

  public GetRefreshBookListEmitter() {
    return this._bookListDataTypeEvent;
  }
  public EmitRefreshBookListEvent() {
    this._bookListDataTypeEvent.emit();
  }

  public set BookListDataType(dataType: BookListDataType) {
    this._bookListDataType = dataType;
    this.EmitRefreshBookListEvent();
  }

  public get BookListDataType() {
    return this._bookListDataType;
  }

  public GetBooks(): Observable<BookDto[]> {
    var query: GetAllBookQuery | GetRecommendedBookQuery;
    var uriPath: string = 'books';
    if (this.BookListDataType == BookListDataType.All) {
      query = {
        order: null,
      };
    } else {
      uriPath = 'recommended';
      query = {
        genre: null,
      };
    }

    return this._backendService.get(uriPath, query) as Observable<BookDto[]>;
  }
}
