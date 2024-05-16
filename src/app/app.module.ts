import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarViewComponent } from "./calendar-view/calendar-view.component";
import { EventService } from './services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [EventService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        CalendarViewComponent,
        HttpClientModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        DatePipe
    ]
})
export class AppModule { }
