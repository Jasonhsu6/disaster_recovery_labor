import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Disaster Recovery';
  public loggedin: Boolean;
  constructor(private route:Router){
    setInterval(()=> this.token = localStorage.getItem('token'),50)
  }
  Logout(){
    this.loggedin = false;
    localStorage.removeItem('token');
    this.token = "";
    this.route.navigateByUrl("/");
  }
  public token:string;
}