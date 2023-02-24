import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookDto } from 'src/app/common/cqrs/books/dto/BookDto';
import { BookEditDto } from 'src/app/common/cqrs/books/dto/BookEditDto';
import { EditBookAction } from 'src/app/common/enums/EditBookAction';
import { BackendService } from 'src/app/services/backend.service';
import { EditBookStateService } from 'src/app/services/edit-book-state.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit {
  public editForm!: FormGroup;
  public fileName:string = "";
  public base64img:string = "";
  public uploadProgress:number = 0;
  private _subscriptions: Subscription[] = [];

  constructor(public editBookStateService: EditBookStateService) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128),
      ]),
      cover: new FormControl('', [Validators.required]),
      genre: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });

    this._subscriptions.push(
      this.editBookStateService.GetChangeBookEmitter().subscribe({
        next: (book: BookEditDto | undefined) => {
          if (book !== undefined) {
            this.editForm.patchValue(book);
          } else {
            this.editForm.reset();
          }
        },
      })
    );
  }

  public ClearEditBookState() {
    this.editBookStateService.ClearState();
    this.editForm.reset();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result != undefined){
          this.editForm.patchValue({cover:reader.result.toString()});
        }
        else
        {
          this.base64img = "";
        }
      };
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public Submit() {
    this.editBookStateService.SaveBook(this.editForm.value);
  }
}
