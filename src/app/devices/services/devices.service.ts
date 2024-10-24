import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Device} from "../model/device";
import {BaseService} from "../../shared/components/base-form";
import { catchError, Observable, retry } from 'rxjs';
import { HOST } from '../../../../environments/enviroment.conts';

@Injectable({
  providedIn: 'root'
})
export class DevicesService extends BaseService<Device>{
  constructor(http: HttpClient) {
    super(http, "/devices");
  }
  private baseUrl: string = `${HOST.local}`;
  getAllDeviceByRiceCropsId(riceCropsId: number): Observable<any> {
  
    return this.http.get<any>(this.baseUrl + "/devices/" + riceCropsId)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
