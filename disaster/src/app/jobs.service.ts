import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {throwError, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {JobModel} from './JobModel'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'token': localStorage.getItem('token')
  })
};


@Injectable()
export class JobsService {

  private _url = "http://localhost:3000/jobs";


  constructor(private http:HttpClient) { }

  getJobs(): Observable<any>{
    var data = this.http.get(this._url,httpOptions).pipe(catchError(this.catcher));
    return data;
  }
  getOneJob(id): Observable<any>{
    var data = this.http.get<any>(this._url +  "/" + id,httpOptions).pipe(catchError(this.catcher))
    return data;
  }
  addJob(job_code,description,hourly_rate,mhpd): Observable<any>{
    var data = this.http.post<JobModel>(this._url + "/add",{job_code,description,hourly_rate,mhpd},httpOptions).pipe(catchError(this.catcher))
    return data;
  }
  editJob(job_code,description,hourly_rate,mhpd,ID): Observable<any>{
    console.log({job_code, description, hourly_rate, mhpd, ID});
    var data = this.http.put<JobModel>(this._url +"/"+ ID,{job_code,description,hourly_rate,mhpd},httpOptions).pipe(catchError(this.catcher))
    return data;
  }
  deleteJob(ID): Observable<any>{
    var data = this.http.delete<JobModel>(this._url + "/delete/" + ID,httpOptions).pipe(catchError(this.catcher))
    return data
  }

  catcher(error: HttpErrorResponse){
     return throwError(error.message || "Service Error")
  }
}
