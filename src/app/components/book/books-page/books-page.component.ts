import { Component, OnInit } from '@angular/core';
import { BookListDataType } from 'src/app/common/enums/BookListDataType';
import { BookListStateService } from 'src/app/services/book-list-state.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
})
export class BooksPageComponent implements OnInit {

  constructor(
    private bookListStateService : BookListStateService
  ) {}

  ngOnInit(): void {}

  public SetBookListDataType(event: BookListDataType) {
    this.bookListStateService.BookListDataType = event;

  }
}
