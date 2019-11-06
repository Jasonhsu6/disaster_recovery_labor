import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { JobModel } from '../JobModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  public jobs: Array<any>;
  public job: JobModel;
  public id: number;

  constructor(private _data: JobsService, private fb: FormBuilder, 
    private route: ActivatedRoute, private router: Router) { }
  
  addJob: FormGroup;
  editJob: FormGroup;


  ngOnInit() {
    this._data.getJobs().subscribe(data => {
      if(data.Result === "Not a user"){
        console.log("Not a user, replace this with a redirect after the routes are made")
      }
      else{
        console.log(this.jobs)
        this.jobs = data
      }
    }, 
      () => console.log("Finished"));

    this.addJob = this.fb.group({
      JobCode: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Hourly_Rate: ["", [Validators.required]],
      Mhpd:["", [Validators.required,Validators.max(24)]]
    })

    this.editJob = this.fb.group({
      JobCode: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Hourly_Rate: ["", [Validators.required]],
      Mhpd:["", [Validators.required,Validators.max(24)]]
    })

  }  


  userCheck(data){
    if(data.Result === "Not a user"){
      this.router.navigateByUrl("/");
    } else {

    };
  }

  editJobID(id){
    this.id = id
  }
  
  refresh(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin']);
    })
  }
  
  add(){
    this._data.addJob(this.addJob.value.JobCode, this.addJob.value.Description, 
      this.addJob.value.Hourly_Rate, this.addJob.value.Mhpd).subscribe
      (data => {this.userCheck(data)} )
  }
  
  edit(id){
    console.log(this.editJob.value);
    this._data.editJob(this.editJob.value.JobCode, this.editJob.value.Description,
      this.editJob.value.Hourly_Rate, this.editJob.value.Mhpd, id).subscribe
      (data => console.log("Jobs Edited: " + this.editJob.value))
  }
  
  delete(id){
    this._data.deleteJob(id).subscribe(data=>console.log("Jobs Deleted: " + id))
  }  
    
}
