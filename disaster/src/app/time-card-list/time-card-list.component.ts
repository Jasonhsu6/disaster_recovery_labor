import { Component, OnInit, Input } from '@angular/core';
import { TimeCardsService } from '../time-cards.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-time-card-list',
  templateUrl: './time-card-list.component.html',
  styleUrls: ['./time-card-list.component.css']
})
export class TimeCardListComponent implements OnInit {
  @Input('isUser') isUser: boolean;
  public timecards: Array<any>;
  public addTimecard:FormGroup
  constructor(private _data: TimeCardsService,private router:Router,private fp:FormBuilder) { }

  ngOnInit() {

    this.addTimecard = this.fp.group({
      SiteCode:["",[Validators.required]],
      Contractor:["",[Validators.required]],
      TotalHours:["",[Validators.required]],
      TotalAmount:["",[Validators.required]]
    })

    this._data.getTimeCards().subscribe(data => {
      if (data.Result === "Not a user") {
        console.log("Not a user, replace this with a redirect after the routes are made")
      }
      else {
        this.timecards = data
      }
    },
      () => console.log("Finished"));
  }

  refresh(){
    if(this.isUser===false){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin']);
      })
    }
    else{
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/contractor']);
    })
    
  }
}

  userCheck(data){
    if(data.Result === "Not a user"){
      this.router.navigateByUrl("/")
    }
    else{}
  }

  addTime(){
    console.log(this.addTimecard.value)
    this._data.addTimeCard(this.addTimecard.value.SiteCode,this.addTimecard.value.Contractor,
      this.addTimecard.value.TotalHours,this.addTimecard.value.TotalAmount,false)
    .subscribe(data => {this.userCheck(data); console.log("Timecard Added: " + this.addTimecard.value);} )
   }

  id : ""
  contractor:""
  site_code:""
  total_hours:1
  total_amounts:1


   popTime(ID){
   this._data.getOneTimeCard(ID).subscribe( data => {
     console.log(data)
     this.id = data._id
     this.contractor = data.contractor,
     this.site_code = data.site_code,
     this.total_hours= data.total_hours,
     this.total_amounts = data.total_amounts
    } )
    console.log("Pop running")
   }

   approveTimecard(){
     console.log({id:this.id,contractor:this.contractor,site_code:this.site_code,total_hours:this.total_hours,total_amounts:this.total_amounts})
     this._data.ApproveTimeCard(this.site_code,this.contractor,this.total_hours,this.total_amounts,true,this.id).subscribe(data => {this.userCheck(data); console.log(data)})
   }

   deleTime(timeID){
     this._data.deleteTimeCard(timeID).subscribe(data=>{this.userCheck(data);console.log(data)})
     this.refresh()
   }

}
