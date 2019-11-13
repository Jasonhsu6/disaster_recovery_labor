import { Component, OnInit, Input } from '@angular/core';
import { TimeCardsService } from '../time-cards.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-time-card-list',
  templateUrl: './time-card-list.component.html',
  styleUrls: ['./time-card-list.component.css']
})
export class TimeCardListComponent implements OnInit {
  @Input('isAdmin') isAdmin: boolean;
  public timecards: Array<any>;
  public addTimecard:FormGroup
  constructor(private _data: TimeCardsService,private router:Router,private fp:FormBuilder, private _data2:JobsService) { }
  public jobCodes:Array<any>;
  ngOnInit() {
    console.log(this.isAdmin)
    this.addTimecard = this.fp.group({
      SiteCode:["",[Validators.required]],
      Contractor:["",[Validators.required]],
      JobCode:["",[Validators.required]],
      TotalHours:["",[Validators.required]],
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
    if(this.isAdmin===true){
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
      this.addTimecard.value.TotalHours,this.addTimecard.value.JobCode,false)
    .subscribe(data => {this.userCheck(data); console.log("Timecard Added: " + this.addTimecard.value);} )
   }

  id : ""
  contractor:""
  site_code:""
  job_code:""
  total_hours:number = 1
  total_amount:number = 1;


   popTime(ID){
   this._data.getOneTimeCard(ID).subscribe( data => {
     console.log(data)
     this.id = data._id
     this.contractor = data.contractor,
     this.site_code = data.site_code,
     this.total_hours= data.total_hours,
     this.job_code = data.job_code
     this.popTime2(data.job_code,data.total_hours)
    } )
    console.log("Pop running")
   }

   popTime2(job_code,total_hours){
     this._data2.getJobs().subscribe(data => {
       data.forEach(element => {
         if(element.job_code === job_code){
            this.total_amount = element.hourly_rate * total_hours;
         }
       });
       
     })
   }

 async  popJobs(){
    this._data2.getJobs().subscribe( data => {
      this.jobCodes = [];
     data.forEach(element => {
     this.jobCodes.push(element.job_code)
     console.log(element.job_code)
     console.log(this.jobCodes)
    })
  })
}

   approveTimecard(){
     console.log({id:this.id,contractor:this.contractor,site_code:this.site_code,total_hours:this.total_hours,total_amounts:this.job_code})
     this._data.ApproveTimeCard(this.site_code,this.contractor,this.total_hours,this.job_code,true,this.id).subscribe(data => {this.userCheck(data); console.log(data)})
   }

   deleTime(timeID){
     this._data.deleteTimeCard(timeID).subscribe(data=>{this.userCheck(data);console.log(data)})
     this.refresh()
   }

}
