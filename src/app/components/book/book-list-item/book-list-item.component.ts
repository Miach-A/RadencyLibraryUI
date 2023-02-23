import { Component, Input, OnInit } from '@angular/core';
import { BookDto } from 'src/app/common/cqrs/books/dto/BookDto';
import { BookListStateService } from 'src/app/services/book-list-state.service';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss'],
})
export class BookListItemComponent implements OnInit {
  constructor() {}

  @Input() book?: BookDto;

  ngOnInit(): void {
    if (this.book != null) {
      this.book.rating = Math.round(this.book.rating * 100) / 100;
    }
  }

  ShortTitle(): string {
    if (this.book != null) {
      return this.book.title.substring(0, 42);
    }
    return '';
  }
}
