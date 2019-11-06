import { Component, OnInit } from '@angular/core';
import { MachinesService } from '../machines.service';
import {MachineModel} from '../MachineModel'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {
  public machines: Array<any>;
  public machine: MachineModel;
  public ID:number;
  constructor(private _data: MachinesService,private fp:FormBuilder, private route: ActivatedRoute, private router:Router) { }

addMachine:FormGroup
editMachine:FormGroup

  ngOnInit() {
  this.addMachine = this.fp.group({
    MachineCode:["",[Validators.required]],
    Description:["",[Validators.required]],
    Hourly_Rate:["",[Validators.required]],
    Mhpd:["",[Validators.required]]
  })
  this.editMachine = this.fp.group({
    MachineCode:["",[Validators.required]],
    Description:["",[Validators.required]],
    Hourly_Rate:["",[Validators.required]],
    Mhpd:["",[Validators.required]]
  })
  

    this._data.getMachines().subscribe(data => {
      if (data.Result === "Not a user") {
        console.log("Not a user, replace this with a redirect after the routes are made")
      }
      else {
        this.machines = data
      }
    },
      () => console.log("Finished"));
  }

userCheck(data){
  if(data.Result === "Not a user"){
    this.router.navigateByUrl("/")
  }
  else{}
}

editMachID(id){
  this.ID = id
}

  addMach(){
    console.log(this.addMachine.value)
    this._data.addMachine(this.addMachine.value.MachineCode,this.addMachine.value.Description,
       this.addMachine.value.Hourly_Rate,this.addMachine.value.Mhpd)
    .subscribe(data => {this.userCheck(data); console.log("Machine Added: " + this.addMachine.value);})
  }
  editMach(id){
    console.log("ID: "+ id)
    console.log("Edit Mach Value: " + this.editMachine.value)
    this._data.editMachine(this.editMachine.value.MachineCode,this.editMachine.value.Description,
      this.editMachine.value.Hourly_Rate,this.editMachine.value.Mhpd,id)
    .subscribe(data => console.log("Machine Edited: " + this.editMachine.value))
  }

  deleteMach(id){
    this._data.deleteMachine(id).subscribe(data=>console.log("Machine Deleted: " + id))
  }

}
