import { Component, OnInit } from '@angular/core';
import { TimeCardsService } from '../time-cards.service';

@Component({
  selector: 'app-time-card-list',
  templateUrl: './time-card-list.component.html',
  styleUrls: ['./time-card-list.component.css']
})
export class TimeCardListComponent implements OnInit {
  public timecards: Array<any>;
  constructor(private _data: TimeCardsService) { }

  ngOnInit() {
    this._data.getTimeCards().subscribe(data => this.timecards = data, 
      () => console.log("Finished"));
  }

}
