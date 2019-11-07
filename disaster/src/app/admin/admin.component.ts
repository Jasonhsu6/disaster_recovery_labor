import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isAdmin: Boolean;

  constructor(private router:Router) { }

  ngOnInit() {
    this.isAdmin = localStorage.getItem("isAdmin") == "true";
    if(!this.isAdmin) {
      this.router.navigateByUrl("login");
    }
  }

  Logout(){
    this.router.navigateByUrl("/");
  }

}
