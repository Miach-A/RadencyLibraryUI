import { Injectable } from '@angular/core';
import { EditBookAction } from '../common/enums/EditBookAction';




@Injectable({
  providedIn: 'root'
})
export class EditBookStateService {

  public title:string;
  public action:EditBookAction;

  constructor() {
    this.title = "Add Book";
    this.action = EditBookAction.Add;
  }
}

