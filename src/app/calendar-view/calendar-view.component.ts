import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { userNameInterface } from '../models/interface';
import { EventService } from '../services/event.service';
import { AppSettings } from '../setting/setting';


@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
  standalone:true,
  imports:[MatTableModule, FormsModule, CommonModule, MatDialogModule, DragDropModule]
})
export class CalendarViewComponent implements OnInit {
  timeLine:any
  selectedTime:any;
  @Input() createdEventsList:any
  @Input() selectedDate:any
  constructor(public dialog: MatDialog,public eventService:EventService) {}

 

  ngOnInit(): void {
   this.fetchDate()
  this.timeLine = AppSettings.timeLine;
  }

  // Open event list of the page 
  openEventLists(event:any)
  {
         const dialogRef = this.dialog.open(EventDialogComponent, {
           data: {
            dialogType: 'listEvent',
            eventData:event,
           },
         });
         dialogRef.afterClosed().subscribe((result) => {
           if (result?.event == 'Ok') {
                this.fetchDate()
           }  
         });
       }

       // drop the event list 
  drop(event: any) {
    for(let targetEvents of this.createdEventsList)
      {
        if(targetEvents.startTimeControl == this.timeLine[event.previousIndex])
          {
            this.updateDragDrop(targetEvents, this.timeLine[event.currentIndex])
          }
      }
   
  }

  //It will run when use update dragand dop and will also update data base 

  updateDragDrop(targetEvent:any, newTime:any)
  {
    let value:userNameInterface = {
      eventName:targetEvent.eventName,
      startTimeControl:newTime,
      endTimeControl:targetEvent.endTimeControl,
      selectedDate:targetEvent.selectedDate
    }

    { this.eventService.testDataUpdate(value, targetEvent.id).subscribe((response) =>{
      if(response)
        {
          this.fetchDate()
        }
    })};

  }


  // fetch data from database

  fetchDate()
  {
    this.eventService.testDataGet().subscribe((response) =>{
      this.createdEventsList = response
      this.createdEventsList= this.createdEventsList.filter((value:any)=>{
      const dateGetting = this.eventService.simpleDateFormat(value.selectedDate);
      const selectedDate = this.eventService.simpleDateFormat(this.selectedDate);
      console.log(dateGetting,selectedDate,'356')
          if(dateGetting == selectedDate)
            return value;
    })
    })
  }

  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  conditionOfDate(dates:any, time:any)
  {
    let count = 0
    for(let date of dates )
      {
        if(count > 1)
          return true
        if ( date.startTimeControl == time)
          {
            count = count +1
          }
      }
    return false
  }

 
  
  
}
