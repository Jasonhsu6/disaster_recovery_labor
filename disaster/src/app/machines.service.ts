import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {MachineModel} from './MachineModel';


@Injectable()
export class MachinesService {

  private _url = "http://localhost:3000/machines";


  constructor(private http:HttpClient) { }

  getMachines(): Observable<any>{
    var data = this.http.get(this._url).pipe(catchError(this.catcher))
    return data ;
  }
  getOneMachine(id): Observable<any>{
    var data = this.http.get<any>(this._url +  "/" + id).pipe(catchError(this.catcher))
    return data;
  }

  addJob(Machine): Observable<any>{
    var data = this.http.post<MachineModel>(this._url,Machine).pipe(catchError(this.catcher))
    return data;
  }
  editJob(Machine,ID): Observable<any>{
    var data = this.http.put<MachineModel>(this._url +"/"+ ID,Machine).pipe(catchError(this.catcher))
    return data;
  }
  deleteJob(ID): Observable<any>{
    var data = this.http.delete<MachineModel>(this._url + "/" + ID).pipe(catchError(this.catcher))
    console.log("Data:" + JSON.stringify(data))
    return data
  }

  catcher(error: HttpErrorResponse){
     return throwError(error.message || "Service Error")
  }
}