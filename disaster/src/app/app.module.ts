import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {JobsService} from './jobs.service';
import {MachinesService} from './machines.service';
import {TimeCardsService} from './time-cards.service';
import {UsersService} from './users.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobListComponent } from './job-list/job-list.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    JobListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [JobsService,MachinesService,TimeCardsService,UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
