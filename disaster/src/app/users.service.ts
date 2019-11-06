import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {UserModel} from './UserModel';


@Injectable()
export class UsersService {

  private _url = "http://localhost:3000/users";


  constructor(private http:HttpClient) { }

  Login(Username,Password): Observable<any>{
    var data = this.http.post<any>(this._url + "/Login",{Username:Username,Password:Password}).pipe(catchError(this.catcher))
    return data;
  }
  Signup(Username,Password): Observable<any>{
    var data = this.http.post<any>(this._url +"/Signup",{Username,Password}).pipe(catchError(this.catcher))
    return data;
  }
  catcher(error: HttpErrorResponse){
     return throwError(error.message || "Service Error")
  }
}
