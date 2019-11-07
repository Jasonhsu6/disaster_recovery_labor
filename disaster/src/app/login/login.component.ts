import { Component, OnInit, Output,  } from '@angular/core';
import {FormGroup,FormsModule,FormBuilder, Validators} from '@angular/forms'
import { UsersService } from '../users.service';
import {UserModel} from '../UserModel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _data:UsersService, private fp:FormBuilder,private router:Router) { }

  public loginInfo:FormGroup;
  @Output() loggedin: boolean;


  ngOnInit() {
    this.loginInfo = this.fp.group({
      username:["",[Validators.required]],
      Password:["",[Validators.required]]
    })
  }
  
  onSubmit(){
    console.log("onSubmit clicked")
    this._data.Login(this.loginInfo.value.username,this.loginInfo.value.Password).subscribe(data => {
      console.log(data);
      this.loggedin = true;
      if(data.Result === "No User Found"){
        console.log("No User Found");
      }
      else{
        localStorage.setItem("token",data.JWT);
        localStorage.setItem("isAdmin", data.isAdmin);
        if(data.isAdmin){
          this.router.navigateByUrl("/admin");
        }
        else{
          this.router.navigateByUrl("/contractor");
        }

      }
    },
    err => console.log(err),
    ()=>console.log("Complete"))
  }
  back(){
    this.router.navigateByUrl("/")
  }

}
