import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {TimeCardModel} from './TimeCardModel';


@Injectable()
export class TimeCardsService {

  private _url = "http://localhost:3000/timecards";


  constructor(private http:HttpClient) { }

  getTimeCards(): Observable<any>{
    var data = this.http.get(this._url).pipe(catchError(this.catcher))
    return data ;
  }
  getOneTimeCard(id): Observable<any>{
    var data = this.http.get<any>(this._url +  "/" + id).pipe(catchError(this.catcher))
    return data;
  }

  addTimeCard(TimeCard): Observable<any>{
    var data = this.http.post<TimeCardModel>(this._url,TimeCard).pipe(catchError(this.catcher))
    return data;
  }
  ApproveTimeCard(TimeCard,ID): Observable<any>{
    var data = this.http.put<TimeCardModel>(this._url +"/"+ ID,TimeCard).pipe(catchError(this.catcher))
    return data;
  }
  deleteTimeCard(ID): Observable<any>{
    var data = this.http.delete<TimeCardModel>(this._url + "/" + ID).pipe(catchError(this.catcher))
    console.log("Data:" + JSON.stringify(data))
    return data
  }

  catcher(error: HttpErrorResponse){
     return throwError(error.message || "Service Error")
  }
}
