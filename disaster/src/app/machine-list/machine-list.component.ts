import { Component, OnInit } from '@angular/core';
import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {
  public machines: Array<any>;
  constructor(private _data: MachinesService) { }

  ngOnInit() {
    this._data.getMachines().subscribe(data => this.machines = data, 
      () => console.log("Finished"));
  }

}
