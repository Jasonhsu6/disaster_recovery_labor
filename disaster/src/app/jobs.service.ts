import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {JobModel} from './JobModel'


@Injectable()
export class JobsService {

  private _url = "http://localhost:3000/jobs";


  constructor(private http:HttpClient) { }

  getJobs(): Observable<any>{
    var data = this.http.get(this._url).pipe(catchError(this.catcher))
    return data;
  }
  getOneJob(id): Observable<any>{
    var data = this.http.get<any>(this._url +  "/" + id).pipe(catchError(this.catcher))
    return data;
  }

  addJob(Job): Observable<any>{
    var data = this.http.post<JobModel>(this._url,Job).pipe(catchError(this.catcher))
    return data;
  }
  editJob(Job,ID): Observable<any>{
    var data = this.http.put<JobModel>(this._url +"/"+ ID,Job).pipe(catchError(this.catcher))
    return data;
  }
  deleteJob(ID): Observable<any>{
    var data = this.http.delete<JobModel>(this._url + "/" + ID).pipe(catchError(this.catcher))
    console.log("Data:" + JSON.stringify(data))
    return data
  }

  catcher(error: HttpErrorResponse){
     return throwError(error.message || "Service Error")
  }
}
