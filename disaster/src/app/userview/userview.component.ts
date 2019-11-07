import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  isAdmin: Boolean;
  constructor() { }

  ngOnInit() {
    this.isAdmin = false;
  }

}
