import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  public jobs: Array<any>;
  constructor(private _data: JobsService) { }

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
  }

}
