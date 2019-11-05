import { Component, OnInit,  } from '@angular/core';
import {FormGroup,FormsModule,FormBuilder, Validators} from '@angular/forms'
import { UsersService } from '../users.service';
import {UserModel} from '../UserModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _data:UsersService, private fp:FormBuilder) { }

public loginInfo:FormGroup;


  ngOnInit() {
    this.loginInfo = this.fp.group({
      username:["",[Validators.required]],
      Password:["",[Validators.required]]
    })
  }

  onSubmit(){
    console.log("onSubmit clicked")
    this._data.Login(this.loginInfo.value.username,this.loginInfo.value.Password).subscribe(data => {
      console.log(data)
      localStorage.setItem("token",data.JWT)
    },
    err => console.log(err),
    ()=>console.log("Complete"))
  }

}
