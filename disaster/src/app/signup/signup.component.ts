import { Component, OnInit,  } from '@angular/core';
import {FormGroup,FormsModule,FormBuilder, Validators} from '@angular/forms'
import { UsersService } from '../users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _data:UsersService, private fp:FormBuilder) { }

  public signupInfo:FormGroup;
  
  
    ngOnInit() {
      this.signupInfo = this.fp.group({
        username:["",[Validators.required]],
        Password:["",[Validators.required]]
      })
    }
  
    onSubmit(){
      console.log("onSubmit clicked")
      this._data.Signup(this.signupInfo.value.username,this.signupInfo.value.Password).subscribe(data => {
        console.log(data)
        localStorage.setItem("token",data.JWT)
      },
      err => console.log(err),
      ()=>console.log("Complete"))
    }
  
  }
  