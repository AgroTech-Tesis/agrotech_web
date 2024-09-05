// arduino-iot.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, retry, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArduinoIotService {
  private clientId = 'DgZ8FqyyPjr9h4CYANBXOu0JN8MllvgL';
  private clientSecret = 'gWYMB050hygyivthByHsBjhNQJLrJHMxusT3EpNM9elm7NFHd4KijGRp7oteL8Mx';
  private tokenUrl = '/iot/v1/clients/token';
  private dashboardsUrl = '/iot/v2/dashboards';
  constructor(private http: HttpClient) {}

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
  getToken(): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('audience', 'https://api2.arduino.cc/iot');

    return this.http.post<any>(this.tokenUrl, body, { headers })
      .pipe(
        map(response => response.access_token),
        catchError(error => {
          console.error('Failed getting an access token: ', error);
          throw error;
        })
      );
  }

  getDashboards(token: string | null){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.dashboardsUrl, {headers}).pipe(retry(2), catchError(this.handleError))
  }
}
