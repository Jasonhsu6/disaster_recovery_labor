import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

isUser = false

  constructor(private router:Router) { }

  ngOnInit() {
  }

  Logout(){
    this.router.navigateByUrl("/");
  }

}
