import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  public jobs: any[] = [];
  constructor(private _data: JobsService) { }

  ngOnInit() {
    this._data.getJobs().subscribe(data => this.jobs = data, 
      () => console.log("Finished"))
  }

}
