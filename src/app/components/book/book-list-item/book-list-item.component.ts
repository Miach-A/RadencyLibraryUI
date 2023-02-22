import { Component, OnInit } from '@angular/core';
import { BookListStateService } from 'src/app/services/book-list-state.service';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss']
})
export class BookListItemComponent implements OnInit {

  constructor(  ) { }

  ngOnInit(): void {
  }

}
