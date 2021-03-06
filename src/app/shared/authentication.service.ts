import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private api:string = 'http://bookstore20.s1710456022.student.kwmhgb.at/api/auth';

  constructor(private http:HttpClient) { }

  login(email:string, password:string){
    return this.http.post(`${this.api}/login`, {'email':email, 'password':password});
  }

  public getCurrentUserId(){
    return Number.parseInt(localStorage.getItem('userId'));
  }

  public setLocalStorage(token:string){
    const decodedToken = decode(token);
    console.log(decodedToken);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', decodedToken.user.id);
  }

  logout(){
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }

  public isLoggedIn(){
    if(localStorage.getItem("token")){
      let token : string = localStorage.getItem("token");
      const decodedToken = decode(token);
      let expirationDate:Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()){
        //time expired
        localStorage.removeItem(("token"));
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}
