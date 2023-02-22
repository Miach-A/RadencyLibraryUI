import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditBookStateService {

  public title:string;
  
  constructor() {
    this.title = "Add Book";
  }
}
