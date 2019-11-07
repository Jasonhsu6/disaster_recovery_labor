import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
<<<<<<< HEAD
  title = 'Disaster Recovery';
  public loggedin: Boolean;
  constructor(private route:Router){}
  Logout(){
    this.loggedin = false;
    this.route.navigateByUrl("/");
    localStorage.removeItem('token');
=======
  title = 'disaster';

  constructor(private route:Router){  
    this.token = localStorage.getItem('token')
  }

  Logout(){
this.route.navigateByUrl("/")
localStorage.removeItem("token")
>>>>>>> 96eb2d85c107cfdabe185af3532592c897ade13a
  }
  public token:string;
}