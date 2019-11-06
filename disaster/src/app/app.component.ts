import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'disaster';

  constructor(private route:Router){  
    this.token = localStorage.getItem('token')
  }

  Logout(){
this.route.navigateByUrl("/")
localStorage.removeItem("token")
  }
  public token:string;
}