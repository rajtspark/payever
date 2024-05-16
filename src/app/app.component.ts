import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { EventService } from './services/event.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'assignment-payever';
  createdEvents:any;
  selected = new Date();
  constructor(public dialog: MatDialog, public eventService:EventService) {}


  ngOnInit(): void {
    this.fetchDate()
  }

  addEvent()
  {
        const dialogRef = this.dialog.open(EventDialogComponent, {
          data: {
            dialogType: 'addEvent',
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result.event == 'Ok') {
               this.fetchDate()
          }  
        });
  }


  fetchDate()
  {
    console.log(this.createdEvents)
    this.eventService.testDataGet().subscribe((response) =>{
      this.createdEvents = response
      this.createdEvents= this.createdEvents.filter((value:any)=>{
      const dateGetting = this.eventService.simpleDateFormat(value.selectedDate);
      const selectedDate = this.eventService.simpleDateFormat(this.selected);
          if(dateGetting == selectedDate)
            return value;
    })
    })
  }

  viewDateChange(event:any)
  {
    this.selected= new Date(event)
    this.fetchDate()
  }
}
