import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookEditDto } from 'src/app/common/cqrs/books/dto/BookEditDto';
import { EditBookStateService } from 'src/app/services/edit-book-state.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit {
  public editForm!: FormGroup;
  public fileName: string = '';
  public base64img: string = '';
  public uploadProgress: number = 0;
  private _subscription:Subscription = new Subscription();

  constructor(public _editBookStateService: EditBookStateService) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      cover: new FormControl(''),
      genre: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });

    this._subscription.add(
      this._editBookStateService.GetChangeBookEmitter().subscribe({
        next: (book: BookEditDto | undefined) => {
          if (book !== undefined) {
            this.editForm.patchValue(book);
          } else {
            this.editForm.reset({
              cover:""
            });
          }
          this.fileName = '';
        },
      })
    );
  }

  public ClearEditBookState() {
    this._editBookStateService.ClearState();
    this.editForm.reset({
      cover:""
    });
  }

  public OnFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result != undefined) {
          this.editForm.patchValue({cover: reader.result.toString() });
        } else {
          this.base64img = '';
        }
      };
    }
  }

  public Submit() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this._editBookStateService.SaveBook(this.editForm.value);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
