import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EventService } from '../services/event.service';
import { AppSettings } from '../setting/setting';


@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css'],
  standalone:true,
  imports:[MatDialogModule,CommonModule, MatFormFieldModule, MatOptionModule,MatSelectModule,FormsModule,ReactiveFormsModule, MatInputModule,MatDatepickerModule, MatButtonModule]
})
export class EventDialogComponent implements OnInit {
  name!: string;
  events = [1,2]
  timeLine:string[]=[]
  startTime:any;
  baseURL: string = "http://localhost:3000/";
  endTime:any
  eventId:any;
  eventForm!: FormGroup ;
  editMode = false;
  minDate = new Date()

   constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder, public http:HttpClient, public eventService:EventService, private dialogRef: MatDialogRef<EventDialogComponent>) {
   }

  ngOnInit(): void {
    this.timeLine = AppSettings.timeLine;
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      startTimeControl: ['', Validators.required],
      endTimeControl: ['', Validators.required],
      selectedDate: [this.data.date, Validators.required]
    });

  
  }
  
  createEventSubmit(){
   this.eventForm.get('selectedDate')?.setValue(this.eventService.simpleDateFormat(this.eventForm.get('selectedDate')?.value))
   
    if(!this.editMode)
   { this.eventService.testDataSave(this.eventForm.value).subscribe((response) =>{
    this.dialogRef.close(
      {
        event:'Ok'
      }
    );

    })}
    else if (this.editMode)
      { this.eventService.testDataUpdate(this.eventForm.value, this.eventId).subscribe((response) =>{
        this.dialogRef.close(
          {
            event:'Ok'
          }
        );
      })}
  }

  deleteEvent(event:any)
  {
    this.eventService.testDataDelete(event.id).subscribe((response) =>{

      this.dialogRef.close(
        {
          event:"Ok"
        }
      );
    })
  }

  close()
  {
    this.dialogRef.close();
  }

  editEvent(event:any)
  {
    this.editMode = true;
    this.eventId = event.id
    this.data.dialogType='addEvent';
    this.eventForm = this.fb.group({
      eventName: [event.eventName, Validators.required],
      startTimeControl: [event.startTimeControl, Validators.required],
      endTimeControl: [event.endTimeControl, Validators.required],
      selectedDate: [event.selectedDate, Validators.required]
    });
  }

  pickDateEvent()
  {
    this.eventForm.get('startTimeControl')?.setValue(null)
    this.eventForm.get('endTimeControl')?.setValue(null)
  }
  

  trimTimeLine(type:any)
  {
    if(type=='start')
    {
      const d = new Date();
      const hours = d.getHours();
      const selectedDate = new Date(this.eventForm.get('selectedDate')?.value)
      if(d.getDate()== selectedDate.getDate())
        {
            return this.timeLine.slice(hours)
        }
        else 
        {
          return this.timeLine
        }
    }
    else 
    {
      return this.timeLine
    }
  }

  selectionStartTime()
  {
    let modifiedValue = parseInt(this.eventForm.get('startTimeControl')?.value)+1;
    let modifiedValueString = modifiedValue<10 ? '0'+modifiedValue.toString() : modifiedValue.toString()
    this.eventForm.get('endTimeControl')?.setValue(modifiedValueString)
  }



}
