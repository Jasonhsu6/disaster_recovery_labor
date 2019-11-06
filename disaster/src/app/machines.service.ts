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
    var data = this.http.post(this._url,{token:localStorage.getItem("token")}).pipe(catchError(this.catcher))
    return data ;
  }
  getOneMachine(id): Observable<any>{
    var data = this.http.post<any>(this._url +  "/" + id,{token:localStorage.getItem("token")}).pipe(catchError(this.catcher))
    return data;
  }

  addMachine(machine_code,description,hourly_rate,mhpd): Observable<any>{
    console.log("Event is getting started")
    var data = this.http.post<any>(this._url+ "/add",{machine_code,description,hourly_rate,mhpd,token:localStorage.getItem("token")}).pipe(catchError(this.catcher))
    console.log({
      machine_code,
      description,
      hourly_rate,
      mhpd,
      token:localStorage.getItem("token")
    })
    return data;
  }
  editMachine(machine_code,description,hourly_rate,mhpd,ID): Observable<any>{
    var token = localStorage.getItem("token")
    console.log({machine_code,description,hourly_rate,mhpd,ID})
    var data = this.http.put<any>(this._url +"/"+ ID,{machine_code,description,hourly_rate,mhpd,token}).pipe(catchError(this.catcher))
    return data;
  }
  deleteMachine(ID): Observable<any>{
    var data = this.http.post<MachineModel>(this._url + "/delete/" + ID,{token:localStorage.getItem("token")}).pipe(catchError(this.catcher))
    console.log("Data:" + JSON.stringify(data))
    return data
  }

  catcher(error: HttpErrorResponse){
     return throwError(error.message || "Service Error")
  }
}
