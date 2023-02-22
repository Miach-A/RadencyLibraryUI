import { Component, OnInit } from '@angular/core';
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

  GetBooks(){

  }

}
