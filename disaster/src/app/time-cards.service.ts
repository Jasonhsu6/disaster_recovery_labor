import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {throwError, Observable} from "rxjs";
import {catchError} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'token': localStorage.getItem('token')
  })
};

@Injectable()
export class TimeCardsService {

  private _url = "http://localhost:3000/timecards";


  constructor(private http:HttpClient) { }

  getTimeCards(): Observable<any>{
    var data = this.http.get(this._url,httpOptions).pipe(catchError(this.catcher))
    return data ;
  }
  getOneTimeCard(id): Observable<any>{
    var data = this.http.get<any>(this._url +  "/" + id,httpOptions).pipe(catchError(this.catcher))
    return data;
  }
  addTimeCard(site_code,contractor,total_hours,total_amounts,is_approved): Observable<any>{
    var data = this.http.post<any>(this._url + "/add",{site_code,contractor,total_hours,total_amounts,is_approved},httpOptions).pipe(catchError(this.catcher))
    return data;
  }
  ApproveTimeCard(site_code,contractor,total_hours,total_amounts,is_approved,ID): Observable<any>{
    var data = this.http.put<any>(this._url +"/"+ ID,{site_code,contractor,total_hours,total_amounts,is_approved},httpOptions).pipe(catchError(this.catcher))
    return data;
  }
  deleteTimeCard(ID): Observable<any>{
    var data = this.http.delete<any>(this._url + "/delete/" + ID,httpOptions).pipe(catchError(this.catcher))
    return data
  }

  catcher(error: HttpErrorResponse){
     return throwError(error.message || "Service Error")
  }
}
