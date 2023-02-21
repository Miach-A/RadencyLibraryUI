import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPageComponent } from './book/books-page/books-page.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookListItemComponent } from './book/book-list-item/book-list-item.component';
import { EditBookComponent } from './book/edit-book/edit-book.component';
import { ViewBookComponent } from './book/view-book/view-book.component';



@NgModule({
  declarations: [
    BooksPageComponent,
    BookListComponent,
    BookListItemComponent,
    EditBookComponent,
    ViewBookComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BookModule { }
