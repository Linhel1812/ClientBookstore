import { Component } from '@angular/core';
import {Book} from './shared/book';
import {AuthenticationService} from "./shared/authentication.service";
@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  constructor(private authService:AuthenticationService){

  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else{
      return "Login";
    }
  }

  listOn = true;
  detailsOn = false;

  book: Book;

  showList(){
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(book : Book){
    this.book = book;
    this.listOn = false;
    this.detailsOn = true;
  }
}

