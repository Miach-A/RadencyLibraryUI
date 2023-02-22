import { Injectable } from '@angular/core';
import { BookListDataType } from '../common/enums/BookListDataType';



@Injectable({
  providedIn: 'root'
})
export class BookListStateService {

  public bookListDataType:BookListDataType;
  constructor(  ) {
    this.bookListDataType = BookListDataType.All;
   }
}
