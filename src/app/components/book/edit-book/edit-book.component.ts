import { Component, OnInit } from '@angular/core';
import { EditBookStateService } from 'src/app/services/edit-book-state.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  constructor(
    public editBookStateService : EditBookStateService
  ) { }

  ngOnInit(): void {
  }

}
