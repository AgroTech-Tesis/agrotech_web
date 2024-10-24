import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {HOST} from "../../../../environments/enviroment.conts";

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  dataRecordPath = `${HOST.local2}/farmer`
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred ${error.status}, body was: ${error.error}`);
    } else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try again later.'));
  }

  getFarmerByAccountId(accountId: number): Observable<any> {  
    return this.http.get<any>(this.dataRecordPath + "/account/" + accountId)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
