import { EventEmitter, Injectable } from '@angular/core';
import { BookListDataType } from '../common/enums/BookListDataType';

@Injectable({
  providedIn: 'root',
})
export class BookListStateService {

  private _bookListDataTypeEvent: EventEmitter<BookListDataType> =
    new EventEmitter();
  private _bookListDataType: BookListDataType;

  constructor() {
    this._bookListDataType = BookListDataType.All;
  }

  public GetBookListDataTypeEmitter() {
    return this._bookListDataTypeEvent;
  }
  private EmitBookListDataTypeEvent() {
    this._bookListDataTypeEvent.emit();
  }

  public set BookListDataType(dataType: BookListDataType) {
    console.log("emit data type change")
    this._bookListDataType = dataType;
    this.EmitBookListDataTypeEvent();
  }

  public get BookListDataType(){
    console.log("get")
    return this._bookListDataType;
  }
}
