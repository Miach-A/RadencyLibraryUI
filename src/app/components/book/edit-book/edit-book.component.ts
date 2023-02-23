import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { EditBookStateService } from 'src/app/services/edit-book-state.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  public editForm!:FormGroup;
  private _subscription:Subscription = new Subscription();

  constructor(
    public editBookStateService : EditBookStateService,
    private backendService:BackendService
  ) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      title: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(128)]),
      Cover: new FormControl('',[Validators.required]),
      Genre: new FormControl('',[Validators.required]),
      Author: new FormControl('',[Validators.required]),
      Content: new FormControl('',[Validators.required])
    });
  }

  public Submit(){
    this._subscription.unsubscribe();
    this._subscription = this.backendService.put('user',this.editForm.value).subscribe();
  }

}
