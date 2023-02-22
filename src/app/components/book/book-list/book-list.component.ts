import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDto } from 'src/app/common/cqrs/books/dto/BookDto';
import { GetAllBookQuery } from 'src/app/common/cqrs/books/queries/GetAllBookQuery';
import { GetRecommendedBookQuery } from 'src/app/common/cqrs/books/queries/GetRecommendedBookQuery';
import { BookListDataType } from 'src/app/common/enums/BookListDataType';
import { BackendService } from 'src/app/services/backend.service';
import { BookListStateService } from 'src/app/services/book-list-state.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  constructor(
    public bookListStateService:BookListStateService,
    private backendService:BackendService
  ) { }

  ngOnInit(): void {
  }

  GetBooks():Observable<BookDto[]>{
    var query:GetAllBookQuery|GetRecommendedBookQuery;
    if(this.bookListStateService.bookListDataType = BookListDataType.All){
      query = {
        order:null
      };
    }
    else{
      query = {
        genre:null
      };
    }

    return this.backendService.get("books",undefined,query) as Observable<BookDto[]>;
  }

}
