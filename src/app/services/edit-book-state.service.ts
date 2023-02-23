import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDto } from '../common/cqrs/books/dto/BookDto';
import { EditBookAction } from '../common/enums/EditBookAction';
import { SaveResult } from '../common/models/SaveResult';
import { BackendService } from './backend.service';


@Injectable({
  providedIn: 'root'
})
export class EditBookStateService {

  private _changeBookEmitter: EventEmitter<BookDto> =
  new EventEmitter();

  public action:EditBookAction;
  public book?:BookDto;

  constructor(
    private backendService:BackendService,
  ) {
    this.action = EditBookAction.Add;
  }

  public ClearState(){
    this.action = EditBookAction.Add;
    this.book = undefined;
  }

  public GetChangeBookEmitter() {
    return this._changeBookEmitter;
  }

  private EmitChangeBook() {
    this._changeBookEmitter.emit(this.book);
  }

  public SaveBook(book:BookDto):Observable<SaveResult>{
    if(this.book !== undefined){
       book.id = this.book.id;
    }

    return this.backendService.put('books/save',book);
  }

}

