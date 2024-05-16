import { Injectable } from "@angular/core";
import { userNameInterface } from "../models/interface";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn:'root',
})
export class EventService
{
    baseURL: string = "http://localhost:3000/";
    constructor( public http:HttpClient)
    {

    }
    
    testDataSave(testSave:userNameInterface) :Observable<userNameInterface>{
        return this.http.post<userNameInterface>(this.baseURL +'eventsData',testSave,{'headers': this.getCommonHeaders()})
      }

      testDataUpdate(testSave:userNameInterface, id:string) :Observable<userNameInterface>{
        return this.http.put<userNameInterface>(this.baseURL +'eventsData/'+id,testSave,{'headers': this.getCommonHeaders()})
      }

      testDataGet() :Observable<userNameInterface>{
        return this.http.get<userNameInterface>(this.baseURL +'eventsData',{'headers': this.getCommonHeaders()})
      }

      testDataDelete( id:string) :Observable<userNameInterface>{
        return this.http.delete<userNameInterface>(this.baseURL +'eventsData/'+id,{'headers': this.getCommonHeaders()})
      }

    
      private getCommonHeaders(){
        let headers = new HttpHeaders();
        headers.append('Content-Type','application/json');
        return headers;
      }

      simpleDateFormat(Incomingdate:any)
      {
        const date = new Date(Incomingdate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`
      }

}