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

}
