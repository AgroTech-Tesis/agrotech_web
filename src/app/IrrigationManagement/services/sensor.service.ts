import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Device} from "../model/Device";
import {HOST} from "../../../../environments/enviroment.conts";

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  // basePath = `${HOST.local}/device`;
  dataRecordPath =   `${HOST.local}/sensor-data-record/pagination`
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default Error Handling
      console.log(`An error occurred ${error.status}, body was: ${error.error}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later.'));
  }

  // Get all data recorded by the sensors
  getSensorDataRecord(startDate: any, endDate: any, zoneId: any): Observable<any>{
    let params = new HttpParams();


    // Agregar parámetros solo si están presentes
    if (startDate){
      params = params.set('startDate', startDate)
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    if (zoneId) {
      params = params.set('zoneId', zoneId);
    }

    console.log(params)
    return this.http.get<any>(this.dataRecordPath, {params, ...this.httpOptions})
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
