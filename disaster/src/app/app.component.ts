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
  constructor(private route:Router){}
  Logout(){
    this.loggedin = false;
    this.route.navigateByUrl("/");
    localStorage.removeItem('token');
  }
}