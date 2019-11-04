import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {UserModel} from './UserModel';


@Injectable()
export class UsersService {

  private _url = "http://localhost:3000/users";


  constructor(private http:HttpClient) { }

  Login(User): Observable<any>{
    var data = this.http.post<UserModel>(this._url + "/Login",User).pipe(catchError(this.catcher))
    return data;
  }
  Signup(User): Observable<any>{
    var data = this.http.post<UserModel>(this._url +"/Signup",User).pipe(catchError(this.catcher))
    return data;
  }
  catcher(error: HttpErrorResponse){
     return throwError(error.message || "Service Error")
  }
}
