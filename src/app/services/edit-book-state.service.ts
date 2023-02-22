import { Injectable } from '@angular/core';

enum Action{
  Add = "Add",
  Edit = "Edit"
}

@Injectable({
  providedIn: 'root'
})
export class EditBookStateService {

  public title:string;
  public action:Action;

  constructor() {
    this.title = "Add Book";
    this.action = Action.Add;
  }
}

