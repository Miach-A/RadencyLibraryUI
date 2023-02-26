import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BookDetailsDto } from 'src/app/common/cqrs/books/dto/BookDetailsDto';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewBookComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,
    private _backendService:BackendService) { }

    public book$?:Observable<BookDetailsDto>;

  ngOnInit(): void {
    this.book$ = this._backendService.get(`books/${this.id}`) as Observable<BookDetailsDto>;
  }

  public RoundTo2(num:number):number{
    return Math.round(num * 100) / 100
  }
}
